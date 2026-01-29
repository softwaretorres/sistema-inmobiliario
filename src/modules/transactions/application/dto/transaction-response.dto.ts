import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransactionType, TransactionStatus } from './create-transaction.dto';

export class TransactionPropertySummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  address?: string;
}

export class TransactionClientSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}

export class TransactionAgentSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;
}

export class TransactionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty({ enum: TransactionStatus })
  status: TransactionStatus;

  @ApiProperty()
  propertyId: string;

  @ApiPropertyOptional({ type: TransactionPropertySummaryDto })
  property?: TransactionPropertySummaryDto;

  @ApiProperty()
  clientId: string;

  @ApiPropertyOptional({ type: TransactionClientSummaryDto })
  client?: TransactionClientSummaryDto;

  @ApiProperty()
  agentId: string;

  @ApiPropertyOptional({ type: TransactionAgentSummaryDto })
  agent?: TransactionAgentSummaryDto;

  @ApiProperty()
  listPrice: number;

  @ApiProperty()
  agreedPrice: number;

  @ApiProperty()
  currency: string;

  @ApiPropertyOptional()
  commissionPct?: number;

  @ApiPropertyOptional()
  commissionAmount?: number;

  @ApiPropertyOptional()
  depositAmount?: number;

  @ApiPropertyOptional()
  monthlyRent?: number;

  @ApiPropertyOptional()
  leaseStartDate?: Date;

  @ApiPropertyOptional()
  leaseEndDate?: Date;

  @ApiPropertyOptional()
  reservationDate?: Date;

  @ApiPropertyOptional()
  contractDate?: Date;

  @ApiPropertyOptional()
  closingDate?: Date;

  @ApiPropertyOptional()
  notes?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class TransactionListItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ enum: TransactionType })
  type: TransactionType;

  @ApiProperty({ enum: TransactionStatus })
  status: TransactionStatus;

  @ApiProperty()
  propertyTitle: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  agreedPrice: number;

  @ApiProperty()
  currency: string;

  @ApiPropertyOptional()
  closingDate?: Date;

  @ApiProperty()
  createdAt: Date;
}

export class PaginationMetaDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;
}

export class PaginatedTransactionResponseDto {
  @ApiProperty({ type: [TransactionListItemDto] })
  data: TransactionListItemDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
