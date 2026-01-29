import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@infrastructure/database/prisma/generated/tenant';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';
import { Property } from '@core/domain/entities/property.entity';
import {
  IPropertyRepository,
  IPropertyFilters,
  IPaginationOptions,
  IPaginatedResult,
} from '../../application/interfaces/property.repository.interface';
import { PropertyMapper } from '../../application/mappers/property.mapper';

@Injectable()
export class PropertyRepository implements IPropertyRepository {
  private readonly logger = new Logger(PropertyRepository.name);

  constructor(
    private readonly tenantPrisma: TenantPrismaService,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  async create(property: Property): Promise<Property> {
    const client = await this.tenantPrisma.getClient();
    const data = this.propertyMapper.toPrismaCreate(property);

    const created = await client.property.create({
      data,
      include: this.getDefaultIncludes(),
    });

    this.logger.debug(`Property created: ${created.id}`);

    return this.propertyMapper.toDomainFromPrisma(created);
  }

  async update(property: Property): Promise<Property> {
    const client = await this.tenantPrisma.getClient();
    const data = this.propertyMapper.toPrismaUpdate(property);

    const updated = await client.property.update({
      where: { id: property.id },
      data,
      include: this.getDefaultIncludes(),
    });

    this.logger.debug(`Property updated: ${updated.id}`);

    return this.propertyMapper.toDomainFromPrisma(updated);
  }

  async findById(id: string): Promise<Property | null> {
    const client = await this.tenantPrisma.getClient();

    const property = await client.property.findUnique({
      where: { id },
      include: this.getDefaultIncludes(),
    });

    if (!property) {
      return null;
    }

    return this.propertyMapper.toDomainFromPrisma(property);
  }

  async findByCode(code: string): Promise<Property | null> {
    const client = await this.tenantPrisma.getClient();

    const property = await client.property.findUnique({
      where: { code },
      include: this.getDefaultIncludes(),
    });

    if (!property) {
      return null;
    }

    return this.propertyMapper.toDomainFromPrisma(property);
  }

  async findBySlug(slug: string): Promise<Property | null> {
    const client = await this.tenantPrisma.getClient();

    const property = await client.property.findUnique({
      where: { slug },
      include: this.getDefaultIncludes(),
    });

    if (!property) {
      return null;
    }

    return this.propertyMapper.toDomainFromPrisma(property);
  }

  async findAll(
    filters: IPropertyFilters,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<Property>> {
    const client = await this.tenantPrisma.getClient();

    const where = this.buildWhereClause(filters);
    const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);

    const [properties, total] = await Promise.all([
      client.property.findMany({
        where,
        orderBy,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        include: this.getDefaultIncludes(),
      }),
      client.property.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      data: properties.map((p) => this.propertyMapper.toDomainFromPrisma(p)),
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

  async findByOwner(ownerId: string): Promise<Property[]> {
    const client = await this.tenantPrisma.getClient();

    const properties = await client.property.findMany({
      where: { ownerId },
      include: this.getDefaultIncludes(),
      orderBy: { createdAt: 'desc' },
    });

    return properties.map((p) => this.propertyMapper.toDomainFromPrisma(p));
  }

  async findByAgent(agentId: string): Promise<Property[]> {
    const client = await this.tenantPrisma.getClient();

    const properties = await client.property.findMany({
      where: { agentId },
      include: this.getDefaultIncludes(),
      orderBy: { createdAt: 'desc' },
    });

    return properties.map((p) => this.propertyMapper.toDomainFromPrisma(p));
  }

  async delete(id: string): Promise<void> {
    const client = await this.tenantPrisma.getClient();

    await client.property.delete({
      where: { id },
    });

    this.logger.debug(`Property deleted: ${id}`);
  }

  async codeExists(code: string, excludeId?: string): Promise<boolean> {
    const client = await this.tenantPrisma.getClient();

    const count = await client.property.count({
      where: {
        code,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return count > 0;
  }

  async slugExists(slug: string, excludeId?: string): Promise<boolean> {
    const client = await this.tenantPrisma.getClient();

    const count = await client.property.count({
      where: {
        slug,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });

    return count > 0;
  }

  async countByStatus(): Promise<Record<string, number>> {
    const client = await this.tenantPrisma.getClient();

    const result = await client.property.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    return result.reduce(
      (acc, item) => {
        acc[item.status] = item._count.status;
        return acc;
      },
      {} as Record<string, number>,
    );
  }

  async findByIdWithRelations(id: string): Promise<Property | null> {
    const client = await this.tenantPrisma.getClient();

    const property = await client.property.findUnique({
      where: { id },
      include: {
        ...this.getDefaultIncludes(),
        owner: true,
        agent: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        visits: {
          where: {
            scheduledAt: { gte: new Date() },
          },
          orderBy: { scheduledAt: 'asc' },
          take: 5,
        },
      },
    });

    if (!property) {
      return null;
    }

    return this.propertyMapper.toDomainFromPrisma(property);
  }

  private getDefaultIncludes(): Prisma.PropertyInclude {
    return {
      images: {
        orderBy: { order: 'asc' },
      },
      documents: true,
    };
  }

  private buildWhereClause(filters: IPropertyFilters): Prisma.PropertyWhereInput {
    const where: Prisma.PropertyWhereInput = {};

    if (filters.status) {
      where.status = filters.status as any;
    }

    if (filters.type) {
      where.type = filters.type as any;
    }

    if (filters.operationType) {
      where.operationType = filters.operationType as any;
    }

    if (filters.city) {
      where.city = { contains: filters.city, mode: 'insensitive' };
    }

    if (filters.state) {
      where.state = { contains: filters.state, mode: 'insensitive' };
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      // Handle price filtering based on operation type
      const priceFilter: Prisma.Decimal[] = [];

      if (filters.minPrice !== undefined) {
        where.OR = [
          {
            salePrice: { gte: filters.minPrice },
          },
          {
            rentPrice: { gte: filters.minPrice },
          },
        ];
      }

      if (filters.maxPrice !== undefined) {
        const maxPriceFilter = [
          { salePrice: { lte: filters.maxPrice } },
          { rentPrice: { lte: filters.maxPrice } },
        ];

        if (where.OR) {
          // Combine with existing OR
          where.AND = [{ OR: where.OR }, { OR: maxPriceFilter }];
          delete where.OR;
        } else {
          where.OR = maxPriceFilter;
        }
      }
    }

    if (filters.bedrooms !== undefined) {
      where.bedrooms = { gte: filters.bedrooms };
    }

    if (filters.bathrooms !== undefined) {
      where.bathrooms = { gte: filters.bathrooms };
    }

    if (filters.ownerId) {
      where.ownerId = filters.ownerId;
    }

    if (filters.agentId) {
      where.agentId = filters.agentId;
    }

    if (filters.search) {
      const searchFilter = {
        OR: [
          { title: { contains: filters.search, mode: 'insensitive' as const } },
          { description: { contains: filters.search, mode: 'insensitive' as const } },
          { code: { contains: filters.search, mode: 'insensitive' as const } },
          { address: { contains: filters.search, mode: 'insensitive' as const } },
          { city: { contains: filters.search, mode: 'insensitive' as const } },
          { neighborhood: { contains: filters.search, mode: 'insensitive' as const } },
        ],
      };

      if (where.AND) {
        (where.AND as Prisma.PropertyWhereInput[]).push(searchFilter);
      } else if (where.OR) {
        where.AND = [{ OR: where.OR }, searchFilter];
        delete where.OR;
      } else {
        where.OR = searchFilter.OR;
      }
    }

    return where;
  }

  private buildOrderBy(
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ): Prisma.PropertyOrderByWithRelationInput {
    const order = sortOrder || 'desc';

    switch (sortBy) {
      case 'salePrice':
        return { salePrice: order };
      case 'rentPrice':
        return { rentPrice: order };
      case 'title':
        return { title: order };
      case 'createdAt':
      default:
        return { createdAt: order };
    }
  }
}
