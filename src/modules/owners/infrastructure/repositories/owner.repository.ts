import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@infrastructure/database/prisma/generated/tenant';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';
import {
  IOwnerRepository,
  IOwnerFilters,
  IPaginationOptions,
  IPaginatedResult,
  IOwnerData,
} from '../../application/interfaces/owner.repository.interface';

@Injectable()
export class OwnerRepository implements IOwnerRepository {
  private readonly logger = new Logger(OwnerRepository.name);

  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  async create(data: Omit<IOwnerData, 'id' | 'createdAt' | 'updatedAt' | '_count'>): Promise<IOwnerData> {
    const client = await this.tenantPrisma.getClient();

    const created = await client.owner.create({
      data: {
        type: data.type as any,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        legalName: data.legalName,
        taxId: data.taxId,
        email: data.email,
        phone: data.phone,
        alternatePhone: data.alternatePhone,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        bankName: data.bankName,
        bankAccount: data.bankAccount,
        clabe: data.clabe,
        notes: data.notes,
      },
      include: {
        _count: {
          select: { properties: true },
        },
      },
    });

    this.logger.debug(`Owner created: ${created.id}`);

    return this.mapToOwnerData(created);
  }

  async update(id: string, data: Partial<IOwnerData>): Promise<IOwnerData> {
    const client = await this.tenantPrisma.getClient();

    // Remove undefined values
    const updateData: Prisma.OwnerUpdateInput = {};

    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.companyName !== undefined) updateData.companyName = data.companyName;
    if (data.legalName !== undefined) updateData.legalName = data.legalName;
    if (data.taxId !== undefined) updateData.taxId = data.taxId;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.alternatePhone !== undefined) updateData.alternatePhone = data.alternatePhone;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.state !== undefined) updateData.state = data.state;
    if (data.country !== undefined) updateData.country = data.country;
    if (data.zipCode !== undefined) updateData.zipCode = data.zipCode;
    if (data.bankName !== undefined) updateData.bankName = data.bankName;
    if (data.bankAccount !== undefined) updateData.bankAccount = data.bankAccount;
    if (data.clabe !== undefined) updateData.clabe = data.clabe;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const updated = await client.owner.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: { properties: true },
        },
      },
    });

    this.logger.debug(`Owner updated: ${updated.id}`);

    return this.mapToOwnerData(updated);
  }

  async findById(id: string): Promise<IOwnerData | null> {
    const client = await this.tenantPrisma.getClient();

    const owner = await client.owner.findUnique({
      where: { id },
      include: {
        _count: {
          select: { properties: true },
        },
      },
    });

    if (!owner) {
      return null;
    }

    return this.mapToOwnerData(owner);
  }

  async findByEmail(email: string): Promise<IOwnerData | null> {
    const client = await this.tenantPrisma.getClient();

    const owner = await client.owner.findFirst({
      where: { email },
      include: {
        _count: {
          select: { properties: true },
        },
      },
    });

    if (!owner) {
      return null;
    }

    return this.mapToOwnerData(owner);
  }

  async findAll(
    filters: IOwnerFilters,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<IOwnerData>> {
    const client = await this.tenantPrisma.getClient();

    const where = this.buildWhereClause(filters);
    const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);

    const [owners, total] = await Promise.all([
      client.owner.findMany({
        where,
        orderBy,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        include: {
          _count: {
            select: { properties: true },
          },
        },
      }),
      client.owner.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      data: owners.map((o) => this.mapToOwnerData(o)),
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

    await client.owner.delete({
      where: { id },
    });

    this.logger.debug(`Owner deleted: ${id}`);
  }

  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    const client = await this.tenantPrisma.getClient();

    const count = await client.owner.count({
      where: {
        email,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return count > 0;
  }

  async taxIdExists(taxId: string, excludeId?: string): Promise<boolean> {
    const client = await this.tenantPrisma.getClient();

    const count = await client.owner.count({
      where: {
        taxId,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return count > 0;
  }

  async countProperties(ownerId: string): Promise<number> {
    const client = await this.tenantPrisma.getClient();

    return client.property.count({
      where: { ownerId },
    });
  }

  private buildWhereClause(filters: IOwnerFilters): Prisma.OwnerWhereInput {
    const where: Prisma.OwnerWhereInput = {};

    if (filters.type) {
      where.type = filters.type as any;
    }

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.state) {
      where.state = { contains: filters.state, mode: 'insensitive' };
    }

    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { companyName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search, mode: 'insensitive' } },
        { taxId: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private buildOrderBy(
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ): Prisma.OwnerOrderByWithRelationInput {
    const order = sortOrder || 'desc';

    switch (sortBy) {
      case 'firstName':
        return { firstName: order };
      case 'lastName':
        return { lastName: order };
      case 'companyName':
        return { companyName: order };
      case 'email':
        return { email: order };
      case 'createdAt':
      default:
        return { createdAt: order };
    }
  }

  private mapToOwnerData(owner: any): IOwnerData {
    return {
      id: owner.id,
      type: owner.type,
      firstName: owner.firstName,
      lastName: owner.lastName,
      companyName: owner.companyName,
      legalName: owner.legalName,
      taxId: owner.taxId,
      email: owner.email,
      phone: owner.phone,
      alternatePhone: owner.alternatePhone,
      address: owner.address,
      city: owner.city,
      state: owner.state,
      country: owner.country,
      zipCode: owner.zipCode,
      bankName: owner.bankName,
      bankAccount: owner.bankAccount,
      clabe: owner.clabe,
      notes: owner.notes,
      createdAt: owner.createdAt,
      updatedAt: owner.updatedAt,
      _count: owner._count,
    };
  }
}
