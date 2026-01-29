import { Injectable, Inject } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  ITransactionRepository,
} from '../interfaces/transaction.repository.interface';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { TransactionQueryDto } from '../dto/transaction-query.dto';
import { PaginatedTransactionResponseDto } from '../dto/transaction-response.dto';

@Injectable()
export class ListTransactionsUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  async execute(query: TransactionQueryDto): Promise<PaginatedTransactionResponseDto> {
    const filters = {
      type: query.type,
      status: query.status,
      propertyId: query.propertyId,
      clientId: query.clientId,
      agentId: query.agentId,
    };

    const pagination = {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy ?? 'createdAt',
      sortOrder: query.sortOrder ?? 'desc',
    };

    const result = await this.transactionRepository.findAll(filters, pagination);

    return {
      data: result.data.map((t) => this.transactionMapper.toListItem(t)),
      meta: result.meta,
    };
  }
}
