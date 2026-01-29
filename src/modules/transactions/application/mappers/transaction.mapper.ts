import { Injectable } from '@nestjs/common';
import { ITransactionData } from '../interfaces/transaction.repository.interface';
import { TransactionResponseDto, TransactionListItemDto } from '../dto/transaction-response.dto';
import { TransactionType, TransactionStatus } from '../dto/create-transaction.dto';

@Injectable()
export class TransactionMapper {
  toResponse(transaction: ITransactionData): TransactionResponseDto {
    return {
      id: transaction.id,
      code: transaction.code,
      type: transaction.type as TransactionType,
      status: transaction.status as TransactionStatus,
      propertyId: transaction.propertyId,
      property: transaction.property ? {
        id: transaction.property.id,
        code: transaction.property.code,
        title: transaction.property.title,
        address: transaction.property.address,
      } : undefined,
      clientId: transaction.clientId,
      client: transaction.client ? {
        id: transaction.client.id,
        fullName: `${transaction.client.firstName} ${transaction.client.lastName}`,
        email: transaction.client.email,
        phone: transaction.client.phone,
      } : undefined,
      agentId: transaction.agentId,
      agent: transaction.agent ? {
        id: transaction.agent.id,
        fullName: `${transaction.agent.firstName} ${transaction.agent.lastName}`,
        email: transaction.agent.email,
      } : undefined,
      listPrice: transaction.listPrice,
      agreedPrice: transaction.agreedPrice,
      currency: transaction.currency,
      commissionPct: transaction.commissionPct ?? undefined,
      commissionAmount: transaction.commissionAmount ?? undefined,
      depositAmount: transaction.depositAmount ?? undefined,
      monthlyRent: transaction.monthlyRent ?? undefined,
      leaseStartDate: transaction.leaseStartDate ?? undefined,
      leaseEndDate: transaction.leaseEndDate ?? undefined,
      reservationDate: transaction.reservationDate ?? undefined,
      contractDate: transaction.contractDate ?? undefined,
      closingDate: transaction.closingDate ?? undefined,
      notes: transaction.notes ?? undefined,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }

  toListItem(transaction: ITransactionData): TransactionListItemDto {
    return {
      id: transaction.id,
      code: transaction.code,
      type: transaction.type as TransactionType,
      status: transaction.status as TransactionStatus,
      propertyTitle: transaction.property?.title ?? 'N/A',
      clientName: transaction.client
        ? `${transaction.client.firstName} ${transaction.client.lastName}`
        : 'N/A',
      agreedPrice: transaction.agreedPrice,
      currency: transaction.currency,
      closingDate: transaction.closingDate ?? undefined,
      createdAt: transaction.createdAt,
    };
  }
}
