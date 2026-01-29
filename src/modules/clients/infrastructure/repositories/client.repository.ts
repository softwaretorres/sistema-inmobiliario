import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@infrastructure/database/prisma/generated/tenant';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';
import {
  IClientRepository,
  IClientFilters,
  IPaginationOptions,
  IPaginatedResult,
  IClientData,
} from '../../application/interfaces/client.repository.interface';

@Injectable()
export class ClientRepository implements IClientRepository {
  private readonly logger = new Logger(ClientRepository.name);

  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  async create(data: Omit<IClientData, 'id' | 'createdAt' | 'updatedAt' | '_count'>): Promise<IClientData> {
    const client = await this.tenantPrisma.getClient();

    const created = await client.client.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        alternatePhone: data.alternatePhone,
        source: data.source,
        sourceDetail: data.sourceDetail,
        status: data.status as any,
        budget: data.budget,
        preferences: data.preferences as any,
        address: data.address,
        city: data.city,
        state: data.state,
        notes: data.notes,
        nextFollowUp: data.nextFollowUp,
        assignedToId: data.assignedToId,
      },
      include: {
        _count: {
          select: { interactions: true, visits: true },
        },
      },
    });

    this.logger.debug(`Client created: ${created.id}`);
    return this.mapToClientData(created);
  }

  async update(id: string, data: Partial<IClientData>): Promise<IClientData> {
    const client = await this.tenantPrisma.getClient();

    const updateData: Prisma.ClientUpdateInput = {};

    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.alternatePhone !== undefined) updateData.alternatePhone = data.alternatePhone;
    if (data.source !== undefined) updateData.source = data.source;
    if (data.sourceDetail !== undefined) updateData.sourceDetail = data.sourceDetail;
    if (data.status !== undefined) updateData.status = data.status as any;
    if (data.budget !== undefined) updateData.budget = data.budget;
    if (data.preferences !== undefined) updateData.preferences = data.preferences as any;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.city !== undefined) updateData.city = data.city;
    if (data.state !== undefined) updateData.state = data.state;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.nextFollowUp !== undefined) updateData.nextFollowUp = data.nextFollowUp;
    if (data.assignedToId !== undefined) updateData.assignedToId = data.assignedToId;

    const updated = await client.client.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: { interactions: true, visits: true },
        },
      },
    });

    this.logger.debug(`Client updated: ${updated.id}`);
    return this.mapToClientData(updated);
  }

  async findById(id: string): Promise<IClientData | null> {
    const client = await this.tenantPrisma.getClient();

    const found = await client.client.findUnique({
      where: { id },
      include: {
        _count: {
          select: { interactions: true, visits: true },
        },
      },
    });

    if (!found) return null;
    return this.mapToClientData(found);
  }

  async findByEmail(email: string): Promise<IClientData | null> {
    const client = await this.tenantPrisma.getClient();

    const found = await client.client.findFirst({
      where: { email },
      include: {
        _count: {
          select: { interactions: true, visits: true },
        },
      },
    });

    if (!found) return null;
    return this.mapToClientData(found);
  }

  async findAll(
    filters: IClientFilters,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<IClientData>> {
    const client = await this.tenantPrisma.getClient();

    const where = this.buildWhereClause(filters);
    const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);

    const [clients, total] = await Promise.all([
      client.client.findMany({
        where,
        orderBy,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        include: {
          _count: {
            select: { interactions: true, visits: true },
          },
        },
      }),
      client.client.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      data: clients.map((c) => this.mapToClientData(c)),
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
    await client.client.delete({ where: { id } });
    this.logger.debug(`Client deleted: ${id}`);
  }

  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    const client = await this.tenantPrisma.getClient();
    const count = await client.client.count({
      where: {
        email,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });
    return count > 0;
  }

  async countByStatus(): Promise<Record<string, number>> {
    const client = await this.tenantPrisma.getClient();
    const result = await client.client.groupBy({
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

  async findByAssignedAgent(agentId: string): Promise<IClientData[]> {
    const client = await this.tenantPrisma.getClient();
    const clients = await client.client.findMany({
      where: { assignedToId: agentId },
      include: {
        _count: {
          select: { interactions: true, visits: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return clients.map((c) => this.mapToClientData(c));
  }

  private buildWhereClause(filters: IClientFilters): Prisma.ClientWhereInput {
    const where: Prisma.ClientWhereInput = {};

    if (filters.status) where.status = filters.status as any;
    if (filters.source) where.source = { contains: filters.source, mode: 'insensitive' };
    if (filters.assignedToId) where.assignedToId = filters.assignedToId;

    if (filters.search) {
      where.OR = [
        { firstName: { contains: filters.search, mode: 'insensitive' } },
        { lastName: { contains: filters.search, mode: 'insensitive' } },
        { email: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private buildOrderBy(
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ): Prisma.ClientOrderByWithRelationInput {
    const order = sortOrder || 'desc';
    switch (sortBy) {
      case 'firstName': return { firstName: order };
      case 'lastName': return { lastName: order };
      case 'email': return { email: order };
      case 'status': return { status: order };
      case 'nextFollowUp': return { nextFollowUp: order };
      default: return { createdAt: order };
    }
  }

  private mapToClientData(client: any): IClientData {
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
      alternatePhone: client.alternatePhone,
      source: client.source,
      sourceDetail: client.sourceDetail,
      status: client.status,
      budget: client.budget ? Number(client.budget) : null,
      preferences: client.preferences as Record<string, any> | null,
      address: client.address,
      city: client.city,
      state: client.state,
      notes: client.notes,
      nextFollowUp: client.nextFollowUp,
      assignedToId: client.assignedToId,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      _count: client._count,
    };
  }
}
