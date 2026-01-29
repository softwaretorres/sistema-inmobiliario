import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OwnerType } from './create-owner.dto';

export class OwnerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: OwnerType })
  type: OwnerType;

  @ApiPropertyOptional()
  firstName?: string;

  @ApiPropertyOptional()
  lastName?: string;

  @ApiPropertyOptional()
  companyName?: string;

  @ApiPropertyOptional()
  legalName?: string;

  @ApiPropertyOptional()
  taxId?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional()
  alternatePhone?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  country?: string;

  @ApiPropertyOptional()
  zipCode?: string;

  @ApiPropertyOptional()
  bankName?: string;

  @ApiPropertyOptional({ description: 'Masked bank account' })
  bankAccountMasked?: string;

  @ApiPropertyOptional()
  notes?: string;

  @ApiProperty()
  propertiesCount: number;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class OwnerListItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: OwnerType })
  type: OwnerType;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiProperty()
  propertiesCount: number;

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

export class PaginatedOwnerResponseDto {
  @ApiProperty({ type: [OwnerListItemDto] })
  data: OwnerListItemDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
