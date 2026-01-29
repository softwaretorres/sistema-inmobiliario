import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsUUID,
  MaxLength,
  IsPositive,
  IsDateString,
} from 'class-validator';

export enum TransactionType {
  SALE = 'SALE',
  RENT = 'RENT',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  RESERVED = 'RESERVED',
  IN_CONTRACT = 'IN_CONTRACT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateTransactionDto {
  @ApiProperty({ example: 'TXN-2024-001' })
  @IsString()
  @MaxLength(50)
  code: string;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiPropertyOptional({ enum: TransactionStatus, default: TransactionStatus.PENDING })
  @IsEnum(TransactionStatus)
  @IsOptional()
  status?: TransactionStatus;

  @ApiProperty()
  @IsUUID()
  propertyId: string;

  @ApiProperty()
  @IsUUID()
  clientId: string;

  @ApiProperty()
  @IsUUID()
  agentId: string;

  @ApiProperty({ example: 5000000, description: 'List price' })
  @IsNumber()
  @IsPositive()
  listPrice: number;

  @ApiProperty({ example: 4800000, description: 'Agreed price' })
  @IsNumber()
  @IsPositive()
  agreedPrice: number;

  @ApiPropertyOptional({ example: 'MXN', default: 'MXN' })
  @IsString()
  @IsOptional()
  @MaxLength(3)
  currency?: string;

  @ApiPropertyOptional({ example: 5.0, description: 'Commission percentage' })
  @IsNumber()
  @IsOptional()
  commissionPct?: number;

  @ApiPropertyOptional({ example: 240000, description: 'Commission amount' })
  @IsNumber()
  @IsOptional()
  commissionAmount?: number;

  // Rental specific
  @ApiPropertyOptional({ example: 50000, description: 'Deposit amount' })
  @IsNumber()
  @IsOptional()
  depositAmount?: number;

  @ApiPropertyOptional({ example: 25000, description: 'Monthly rent' })
  @IsNumber()
  @IsOptional()
  monthlyRent?: number;

  @ApiPropertyOptional({ example: '2024-03-01' })
  @IsDateString()
  @IsOptional()
  leaseStartDate?: string;

  @ApiPropertyOptional({ example: '2025-02-28' })
  @IsDateString()
  @IsOptional()
  leaseEndDate?: string;

  // Important dates
  @ApiPropertyOptional({ example: '2024-02-15' })
  @IsDateString()
  @IsOptional()
  reservationDate?: string;

  @ApiPropertyOptional({ example: '2024-02-20' })
  @IsDateString()
  @IsOptional()
  contractDate?: string;

  @ApiPropertyOptional({ example: '2024-03-01' })
  @IsDateString()
  @IsOptional()
  closingDate?: string;

  @ApiPropertyOptional({ example: 'Cliente muy interesado...' })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes?: string;
}
