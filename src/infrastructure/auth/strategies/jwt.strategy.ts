import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';
import { TenantContextService } from '@infrastructure/multi-tenancy/tenant-context.service';
import { ITokenPayload, IAuthenticatedUser } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly tenantPrisma: TenantPrismaService,
    private readonly tenantContext: TenantContextService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret'),
    });
  }

  async validate(payload: ITokenPayload): Promise<IAuthenticatedUser> {
    // Validate tenant context matches
    const currentTenant = this.tenantContext.getTenant();

    if (currentTenant && currentTenant.slug !== payload.tenantSlug) {
      throw new UnauthorizedException('Token tenant mismatch');
    }

    // If no tenant in context, set it from the token
    if (!currentTenant) {
      const tenant = await this.tenantContext.validateTenant(payload.tenantSlug);
      if (!tenant) {
        throw new UnauthorizedException('Invalid tenant');
      }
      this.tenantContext.setTenant(tenant);
    }

    // Get user from database
    const prisma = await this.tenantPrisma.getClient();

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
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
      throw new UnauthorizedException('User not found');
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User account is not active');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tenantId: payload.tenantId,
      tenantSlug: payload.tenantSlug,
      role: {
        id: user.role.id,
        name: user.role.name,
        permissions: user.role.permissions.map(
          (rp) => `${rp.permission.action}:${rp.permission.subject}`,
        ),
      },
    };
  }
}
