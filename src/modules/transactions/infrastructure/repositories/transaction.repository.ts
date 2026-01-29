import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@infrastructure/database/prisma/generated/tenant';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';
import {
  ITransactionRepository,
  ITransactionFilters,
  IPaginationOptions,
  IPaginatedResult,
  ITransactionData,
} from '../../application/interfaces/transaction.repository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  private readonly logger = new Logger(TransactionRepository.name);

  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  private getIncludes(): Prisma.TransactionInclude {
    return {
      property: {
        select: { id: true, code: true, title: true, address: true },
      },
      client: {
        select: { id: true, firstName: true, lastName: true, email: true, phone: true },
      },
      agent: {
        select: { id: true, firstName: true, lastName: true, email: true },
      },
    };
  }

  async create(data: Omit<ITransactionData, 'id' | 'createdAt' | 'updatedAt' | 'property' | 'client' | 'agent'>): Promise<ITransactionData> {
    const client = await this.tenantPrisma.getClient();

    const created = await client.transaction.create({
      data: {
        code: data.code,
        type: data.type as any,
        status: data.status as any,
        propertyId: data.propertyId,
        clientId: data.clientId,
        agentId: data.agentId,
        listPrice: data.listPrice,
        agreedPrice: data.agreedPrice,
        currency: data.currency,
        commissionPct: data.commissionPct,
        commissionAmount: data.commissionAmount,
        depositAmount: data.depositAmount,
        monthlyRent: data.monthlyRent,
        leaseStartDate: data.leaseStartDate,
        leaseEndDate: data.leaseEndDate,
        reservationDate: data.reservationDate,
        contractDate: data.contractDate,
        closingDate: data.closingDate,
        notes: data.notes,
      },
      include: this.getIncludes(),
    });

    this.logger.debug(`Transaction created: ${created.id}`);
    return this.mapToTransactionData(created);
  }

  async update(id: string, data: Partial<ITransactionData>): Promise<ITransactionData> {
    const client = await this.tenantPrisma.getClient();

    const updateData: Prisma.TransactionUpdateInput = {};

    if (data.status !== undefined) updateData.status = data.status as any;
    if (data.agentId !== undefined) updateData.agent = { connect: { id: data.agentId } };
    if (data.listPrice !== undefined) updateData.listPrice = data.listPrice;
    if (data.agreedPrice !== undefined) updateData.agreedPrice = data.agreedPrice;
    if (data.currency !== undefined) updateData.currency = data.currency;
    if (data.commissionPct !== undefined) updateData.commissionPct = data.commissionPct;
    if (data.commissionAmount !== undefined) updateData.commissionAmount = data.commissionAmount;
    if (data.depositAmount !== undefined) updateData.depositAmount = data.depositAmount;
    if (data.monthlyRent !== undefined) updateData.monthlyRent = data.monthlyRent;
    if (data.leaseStartDate !== undefined) updateData.leaseStartDate = data.leaseStartDate;
    if (data.leaseEndDate !== undefined) updateData.leaseEndDate = data.leaseEndDate;
    if (data.reservationDate !== undefined) updateData.reservationDate = data.reservationDate;
    if (data.contractDate !== undefined) updateData.contractDate = data.contractDate;
    if (data.closingDate !== undefined) updateData.closingDate = data.closingDate;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const updated = await client.transaction.update({
      where: { id },
      data: updateData,
      include: this.getIncludes(),
    });

    this.logger.debug(`Transaction updated: ${updated.id}`);
    return this.mapToTransactionData(updated);
  }

  async findById(id: string): Promise<ITransactionData | null> {
    const client = await this.tenantPrisma.getClient();
    const found = await client.transaction.findUnique({
      where: { id },
      include: this.getIncludes(),
    });
    if (!found) return null;
    return this.mapToTransactionData(found);
  }

  async findByCode(code: string): Promise<ITransactionData | null> {
    const client = await this.tenantPrisma.getClient();
    const found = await client.transaction.findUnique({
      where: { code },
      include: this.getIncludes(),
    });
    if (!found) return null;
    return this.mapToTransactionData(found);
  }

  async findAll(
    filters: ITransactionFilters,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<ITransactionData>> {
    const client = await this.tenantPrisma.getClient();

    const where = this.buildWhereClause(filters);
    const orderBy = this.buildOrderBy(pagination.sortBy, pagination.sortOrder);

    const [transactions, total] = await Promise.all([
      client.transaction.findMany({
        where,
        orderBy,
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
        include: this.getIncludes(),
      }),
      client.transaction.count({ where }),
    ]);

    const totalPages = Math.ceil(total / pagination.limit);

    return {
      data: transactions.map((t) => this.mapToTransactionData(t)),
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
    await client.transaction.delete({ where: { id } });
    this.logger.debug(`Transaction deleted: ${id}`);
  }

  async codeExists(code: string, excludeId?: string): Promise<boolean> {
    const client = await this.tenantPrisma.getClient();
    const count = await client.transaction.count({
      where: {
        code,
        ...(excludeId && { id: { not: excludeId } }),
      },
    });
    return count > 0;
  }

  async countByStatus(): Promise<Record<string, number>> {
    const client = await this.tenantPrisma.getClient();
    const result = await client.transaction.groupBy({
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

  private buildWhereClause(filters: ITransactionFilters): Prisma.TransactionWhereInput {
    const where: Prisma.TransactionWhereInput = {};
    if (filters.type) where.type = filters.type as any;
    if (filters.status) where.status = filters.status as any;
    if (filters.propertyId) where.propertyId = filters.propertyId;
    if (filters.clientId) where.clientId = filters.clientId;
    if (filters.agentId) where.agentId = filters.agentId;
    return where;
  }

  private buildOrderBy(
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
  ): Prisma.TransactionOrderByWithRelationInput {
    const order = sortOrder || 'desc';
    switch (sortBy) {
      case 'agreedPrice': return { agreedPrice: order };
      case 'closingDate': return { closingDate: order };
      default: return { createdAt: order };
    }
  }

  private mapToTransactionData(transaction: any): ITransactionData {
    return {
      id: transaction.id,
      code: transaction.code,
      type: transaction.type,
      status: transaction.status,
      propertyId: transaction.propertyId,
      clientId: transaction.clientId,
      agentId: transaction.agentId,
      listPrice: Number(transaction.listPrice),
      agreedPrice: Number(transaction.agreedPrice),
      currency: transaction.currency,
      commissionPct: transaction.commissionPct ? Number(transaction.commissionPct) : null,
      commissionAmount: transaction.commissionAmount ? Number(transaction.commissionAmount) : null,
      depositAmount: transaction.depositAmount ? Number(transaction.depositAmount) : null,
      monthlyRent: transaction.monthlyRent ? Number(transaction.monthlyRent) : null,
      leaseStartDate: transaction.leaseStartDate,
      leaseEndDate: transaction.leaseEndDate,
      reservationDate: transaction.reservationDate,
      contractDate: transaction.contractDate,
      closingDate: transaction.closingDate,
      notes: transaction.notes,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
      property: transaction.property,
      client: transaction.client,
      agent: transaction.agent,
    };
  }
}
