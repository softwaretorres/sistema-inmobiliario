import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@infrastructure/database/prisma/generated/tenant';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';
import {
  IUserRepository,
  IUserFilters,
  IPaginationOptions,
  IPaginatedResult,
  IUserData,
} from '../../application/interfaces/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  private getIncludes(): Prisma.UserInclude {
    return {
      role: {
        select: { id: true, name: true, displayName: true },
      },
    };
  }

  async create(data: Omit<IUserData, 'id' | 'createdAt' | 'updatedAt' | 'role' | 'failedAttempts' | 'lockedUntil' | 'lastLoginAt'>): Promise<IUserData> {
    const client = await this.tenantPrisma.getClient();

    const created = await client.user.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        avatar: data.avatar,
        status: data.status as any,
        roleId: data.roleId,
        language: data.language,
        timezone: data.timezone,
      },
      include: this.getIncludes(),
    });

    this.logger.debug(`User created: ${created.id}`);
    return this.mapToUserData(created);
  }

  async update(id: string, data: Partial<IUserData>): Promise<IUserData> {
    const client = await this.tenantPrisma.getClient();

    const updateData: Prisma.UserUpdateInput = {};

    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.avatar !== undefined) updateData.avatar = data.avatar;
    if (data.status !== undefined) updateData.status = data.status as any;
    if (data.roleId !== undefined) updateData.role = { connect: { id: data.roleId } };
    if (data.language !== undefined) updateData.language = data.language;
    if (data.timezone !== undefined) updateData.timezone = data.timezone;
    if (data.password !== undefined) updateData.password = data.password;

    const updated = await client.user.update({
      where: { id },
      data: updateData,
      include: this.getIncludes(),
    });

    this.logger.debug(`User updated: ${updated.id}`);
    return this.mapToUserData(updated);
  }

  async findById(id: string): Promise<IUserData | null> {
    const client = await this.tenantPrisma.getClient();
    const found = await client.user.findUnique({
      where: { id },
      include: this.getIncludes(),
    });
    if (!found) return null;
    return this.mapToUserData(found);
  }

  async findByEmail(email: string): Promise<IUserData | null> {
    const client = await this.tenantPrisma.getClient();
    const found = await client.user.findUnique({
      where: { email: email.toLowerCase() },
      include: this.getIncludes(),
    });
    if (!found) return null;
    return this.mapToUserData(found);
  }

  async findAll(
    filters: IUserFilters,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<IUserData>> {
    const client = await this.tenantPrisma.getClient();

    const where = this.buildWhereClause(filters);
    const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);

    const [users, total] = await Promise.all([
      client.user.findMany({
        where,
        orderBy,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        include: this.getIncludes(),
      }),
      client.user.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      data: users.map((u) => this.mapToUserData(u)),
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages,
        hasNextPage: pagination.page < totalPages,
        hasPreviousPage: pagination.page > 1,
      },
    };
  }

  async delete(id: string): Promise<void> {
    const client = await this.tenantPrisma.getClient();
    await client.user.delete({ where: { id } });
    this.logger.debug(`User deleted: ${id}`);
  }

  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    const client = await this.tenantPrisma.getClient();
    const count = await client.user.count({
      where: {
        email: email.toLowerCase(),
        ...(excludeId && { id: { not: excludeId } }),
      },
    });
    return count > 0;
  }

  async updatePassword(id: string, hashedPassword: string): Promise<void> {
    const client = await this.tenantPrisma.getClient();
    await client.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
    this.logger.debug(`Password updated for user: ${id}`);
  }

  async updateLastLogin(id: string): Promise<void> {
    const client = await this.tenantPrisma.getClient();
    await client.user.update({
      where: { id },
      data: {
        lastLoginAt: new Date(),
        failedAttempts: 0,
        lockedUntil: null,
      },
    });
  }

  async incrementFailedAttempts(id: string): Promise<number> {
    const client = await this.tenantPrisma.getClient();
    const updated = await client.user.update({
      where: { id },
      data: { failedAttempts: { increment: 1 } },
      select: { failedAttempts: true },
    });
    return updated.failedAttempts;
  }

  async resetFailedAttempts(id: string): Promise<void> {
    const client = await this.tenantPrisma.getClient();
    await client.user.update({
      where: { id },
      data: { failedAttempts: 0, lockedUntil: null },
    });
  }

  async lockUser(id: string, until: Date): Promise<void> {
    const client = await this.tenantPrisma.getClient();
    await client.user.update({
      where: { id },
      data: { lockedUntil: until },
    });
    this.logger.warn(`User locked until ${until.toISOString()}: ${id}`);
  }

  private buildWhereClause(filters: IUserFilters): Prisma.UserWhereInput {
    const where: Prisma.UserWhereInput = {};
    if (filters.status) where.status = filters.status as any;
    if (filters.roleId) where.roleId = filters.roleId;
    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  private buildOrderBy(
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ): Prisma.UserOrderByWithRelationInput {
    const order = sortOrder || 'desc';
    switch (sortBy) {
      case 'firstName': return { firstName: order };
      case 'lastName': return { lastName: order };
      case 'email': return { email: order };
      default: return { createdAt: order };
    }
  }

  private mapToUserData(user: any): IUserData {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      avatar: user.avatar,
      status: user.status,
      roleId: user.roleId,
      role: user.role,
      language: user.language,
      timezone: user.timezone,
      lastLoginAt: user.lastLoginAt,
      failedAttempts: user.failedAttempts,
      lockedUntil: user.lockedUntil,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
