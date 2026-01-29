import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ClientStatus } from './create-client.dto';

export class ClientResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiPropertyOptional()
  alternatePhone?: string;

  @ApiPropertyOptional()
  source?: string;

  @ApiPropertyOptional()
  sourceDetail?: string;

  @ApiProperty({ enum: ClientStatus })
  status: ClientStatus;

  @ApiPropertyOptional()
  budget?: number;

  @ApiPropertyOptional()
  preferences?: Record<string, any>;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  notes?: string;

  @ApiPropertyOptional()
  nextFollowUp?: Date;

  @ApiPropertyOptional()
  assignedToId?: string;

  @ApiProperty()
  interactionsCount: number;

  @ApiProperty()
  visitsCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ClientListItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ enum: ClientStatus })
  status: ClientStatus;

  @ApiPropertyOptional()
  source?: string;

  @ApiPropertyOptional()
  budget?: number;

  @ApiPropertyOptional()
  nextFollowUp?: Date;

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

export class PaginatedClientResponseDto {
  @ApiProperty({ type: [ClientListItemDto] })
  data: ClientListItemDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
