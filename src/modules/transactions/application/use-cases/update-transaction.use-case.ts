import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  TRANSACTION_REPOSITORY,
  ITransactionRepository,
} from '../interfaces/transaction.repository.interface';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionResponseDto } from '../dto/transaction-response.dto';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  async execute(id: string, dto: UpdateTransactionDto): Promise<TransactionResponseDto> {
    const existing = await this.transactionRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    const updated = await this.transactionRepository.update(id, {
      status: dto.status,
      agentId: dto.agentId,
      listPrice: dto.listPrice,
      agreedPrice: dto.agreedPrice,
      currency: dto.currency,
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

    return this.transactionMapper.toResponse(updated);
  }
}
