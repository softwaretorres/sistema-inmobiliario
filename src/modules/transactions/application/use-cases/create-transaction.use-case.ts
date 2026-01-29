import { Injectable, Inject, ConflictException } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  ITransactionRepository,
} from '../interfaces/transaction.repository.interface';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  async execute(dto: CreateTransactionDto): Promise<TransactionResponseDto> {
    // Check if code already exists
    const codeExists = await this.transactionRepository.codeExists(dto.code);
    if (codeExists) {
      throw new ConflictException('A transaction with this code already exists');
    }

    const transaction = await this.transactionRepository.create({
      code: dto.code,
      type: dto.type,
      status: dto.status ?? 'PENDING',
      propertyId: dto.propertyId,
      clientId: dto.clientId,
      agentId: dto.agentId,
      listPrice: dto.listPrice,
      agreedPrice: dto.agreedPrice,
      currency: dto.currency ?? 'MXN',
      commissionPct: dto.commissionPct,
      commissionAmount: dto.commissionAmount,
      depositAmount: dto.depositAmount,
      monthlyRent: dto.monthlyRent,
      leaseStartDate: dto.leaseStartDate ? new Date(dto.leaseStartDate) : undefined,
      leaseEndDate: dto.leaseEndDate ? new Date(dto.leaseEndDate) : undefined,
      reservationDate: dto.reservationDate ? new Date(dto.reservationDate) : undefined,
      contractDate: dto.contractDate ? new Date(dto.contractDate) : undefined,
      closingDate: dto.closingDate ? new Date(dto.closingDate) : undefined,
      notes: dto.notes,
    });

    return this.transactionMapper.toResponse(transaction);
  }
}
