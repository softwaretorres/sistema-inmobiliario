import { Injectable, UnauthorizedException, Logger, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';
import { TenantContextService } from '@infrastructure/multi-tenancy/tenant-context.service';

export interface ITokenPayload {
  sub: string;
  email: string;
  tenantId: string;
  tenantSlug: string;
  roleId: string;
  roleName: string;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface IAuthenticatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tenantId: string;
  tenantSlug: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly SALT_ROUNDS = 12;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tenantPrisma: TenantPrismaService,
    private readonly tenantContext: TenantContextService,
  ) {}

  async validateUser(email: string, password: string): Promise<IAuthenticatedUser | null> {
    const prisma = await this.tenantPrisma.getClient();

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    // Check if user is active
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User account is not active');
    }

    // Check if user is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('User account is temporarily locked');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Increment failed attempts
      await this.incrementFailedAttempts(user.id);
      return null;
    }

    // Reset failed attempts on successful login
    await this.resetFailedAttempts(user.id);

    const tenant = this.tenantContext.getTenantOrFail();

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tenantId: tenant.id,
      tenantSlug: tenant.slug,
      role: {
        id: user.role.id,
        name: user.role.name,
        permissions: user.role.permissions.map(
          (rp) => `${rp.permission.subject}:${rp.permission.action}`,
        ),
      },
    };
  }

  async login(user: IAuthenticatedUser): Promise<IAuthTokens> {
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      tenantSlug: user.tenantSlug,
      roleId: user.role.id,
      roleName: user.role.name,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(user.id),
    ]);

    // Update last login
    await this.updateLastLogin(user.id);

    // Log activity
    await this.logActivity(user.id, 'LOGIN');

    return {
      accessToken,
      refreshToken,
      expiresIn: this.getExpiresInSeconds(),
    };
  }

  async refreshTokens(refreshToken: string): Promise<IAuthTokens> {
    const prisma = await this.tenantPrisma.getClient();

    // Find the refresh token
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: {
        user: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw new UnauthorizedException('Refresh token has expired');
    }

    const user = storedToken.user;
    const tenant = this.tenantContext.getTenantOrFail();

    // Delete the used refresh token
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });

    // Generate new tokens
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      tenantId: tenant.id,
      tenantSlug: tenant.slug,
      roleId: user.role.id,
      roleName: user.role.name,
    };

    const [newAccessToken, newRefreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(user.id),
    ]);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: this.getExpiresInSeconds(),
    };
  }

  async logout(userId: string, refreshToken?: string): Promise<void> {
    const prisma = await this.tenantPrisma.getClient();

    if (refreshToken) {
      // Delete specific refresh token
      await prisma.refreshToken.deleteMany({
        where: { userId, token: refreshToken },
      });
    } else {
      // Delete all refresh tokens for user (logout from all devices)
      await prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }

    await this.logActivity(userId, 'LOGOUT');
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const prisma = await this.tenantPrisma.getClient();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, this.SALT_ROUNDS);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    // Invalidate all refresh tokens
    await prisma.refreshToken.deleteMany({ where: { userId } });

    await this.logActivity(userId, 'PASSWORD_CHANGED');
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  private async generateAccessToken(payload: ITokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('auth.jwtSecret'),
      expiresIn: this.configService.get('auth.jwtExpiresIn', '15m'),
    });
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const prisma = await this.tenantPrisma.getClient();

    const token = this.jwtService.sign(
      { sub: userId, type: 'refresh' },
      {
        secret: this.configService.get('auth.jwtRefreshSecret'),
        expiresIn: this.configService.get('auth.jwtRefreshExpiresIn', '7d'),
      },
    );

    // Calculate expiration date
    const expiresIn = this.configService.get('auth.jwtRefreshExpiresIn', '7d');
    const expiresAt = this.calculateExpirationDate(expiresIn);

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  private calculateExpirationDate(expiresIn: string): Date {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    return new Date(Date.now() + value * multipliers[unit]);
  }

  private getExpiresInSeconds(): number {
    const expiresIn = this.configService.get('auth.jwtExpiresIn', '15m');
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
      return 900; // Default 15 minutes
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1,
      m: 60,
      h: 3600,
      d: 86400,
    };

    return value * multipliers[unit];
  }

  private async incrementFailedAttempts(userId: string): Promise<void> {
    const prisma = await this.tenantPrisma.getClient();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        failedAttempts: { increment: 1 },
      },
    });

    // Lock account after 5 failed attempts
    if (user.failedAttempts >= 5) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          lockedUntil: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        },
      });
    }
  }

  private async resetFailedAttempts(userId: string): Promise<void> {
    const prisma = await this.tenantPrisma.getClient();

    await prisma.user.update({
      where: { id: userId },
      data: {
        failedAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  private async updateLastLogin(userId: string): Promise<void> {
    const prisma = await this.tenantPrisma.getClient();

    await prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }

  private async logActivity(userId: string, action: string): Promise<void> {
    try {
      const prisma = await this.tenantPrisma.getClient();

      await prisma.activityLog.create({
        data: {
          userId,
          action,
          entity: 'User',
          entityId: userId,
        },
      });
    } catch (error) {
      this.logger.error('Failed to log activity:', error);
    }
  }
}
