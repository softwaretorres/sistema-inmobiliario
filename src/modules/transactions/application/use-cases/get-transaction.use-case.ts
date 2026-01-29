import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  ITransactionRepository,
} from '../interfaces/transaction.repository.interface';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@Injectable()
export class GetTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  async execute(id: string): Promise<TransactionResponseDto> {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return this.transactionMapper.toResponse(transaction);
  }

  async executeByCode(code: string): Promise<TransactionResponseDto> {
    const transaction = await this.transactionRepository.findByCode(code);

    if (!transaction) {
      throw new NotFoundException(`Transaction with code ${code} not found`);
    }

    return this.transactionMapper.toResponse(transaction);
  }
}
