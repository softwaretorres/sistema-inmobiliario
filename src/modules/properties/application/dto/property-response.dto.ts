import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  PropertyType,
  PropertyStatus,
  OperationType,
  IPropertyImage,
} from '@core/domain/entities/property.entity';

export class AddressResponseDto {
  @ApiProperty()
  street: string;

  @ApiPropertyOptional()
  neighborhood?: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  country: string;

  @ApiPropertyOptional()
  zipCode?: string;

  @ApiPropertyOptional()
  latitude?: number;

  @ApiPropertyOptional()
  longitude?: number;
}

export class MoneyResponseDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  currency: string;

  @ApiPropertyOptional()
  formatted?: string;
}

export class CharacteristicsResponseDto {
  @ApiPropertyOptional()
  bedrooms?: number;

  @ApiPropertyOptional()
  bathrooms?: number;

  @ApiPropertyOptional()
  halfBathrooms?: number;

  @ApiPropertyOptional()
  parkingSpaces?: number;

  @ApiPropertyOptional()
  totalArea?: number;

  @ApiPropertyOptional()
  builtArea?: number;

  @ApiPropertyOptional()
  lotArea?: number;

  @ApiPropertyOptional()
  yearBuilt?: number;

  @ApiPropertyOptional()
  floors?: number;
}

export class PropertyImageResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  url: string;

  @ApiPropertyOptional()
  thumbnailUrl?: string;

  @ApiPropertyOptional()
  caption?: string;

  @ApiProperty()
  isPrimary: boolean;

  @ApiProperty()
  order: number;
}

export class OwnerSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}

export class AgentSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  avatar?: string;
}

export class PropertyResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ enum: PropertyType })
  type: PropertyType;

  @ApiProperty({ enum: PropertyStatus })
  status: PropertyStatus;

  @ApiProperty({ enum: OperationType })
  operationType: OperationType;

  @ApiPropertyOptional({ type: MoneyResponseDto })
  salePrice?: MoneyResponseDto;

  @ApiPropertyOptional({ type: MoneyResponseDto })
  rentPrice?: MoneyResponseDto;

  @ApiProperty({ type: AddressResponseDto })
  address: AddressResponseDto;

  @ApiProperty({ type: CharacteristicsResponseDto })
  characteristics: CharacteristicsResponseDto;

  @ApiProperty()
  amenities: Record<string, boolean>;

  @ApiProperty()
  features: Record<string, boolean>;

  @ApiProperty({ type: [PropertyImageResponseDto] })
  images: PropertyImageResponseDto[];

  @ApiPropertyOptional({ type: PropertyImageResponseDto })
  primaryImage?: PropertyImageResponseDto;

  @ApiProperty()
  ownerId: string;

  @ApiPropertyOptional({ type: OwnerSummaryDto })
  owner?: OwnerSummaryDto;

  @ApiProperty()
  agentId: string;

  @ApiPropertyOptional({ type: AgentSummaryDto })
  agent?: AgentSummaryDto;

  @ApiPropertyOptional()
  slug?: string;

  @ApiPropertyOptional()
  virtualTourUrl?: string;

  @ApiPropertyOptional()
  videoUrl?: string;

  @ApiPropertyOptional()
  metaTitle?: string;

  @ApiPropertyOptional()
  metaDescription?: string;

  @ApiPropertyOptional()
  publishedAt?: Date;

  @ApiPropertyOptional()
  featuredUntil?: Date;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PropertyListItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ enum: PropertyType })
  type: PropertyType;

  @ApiProperty({ enum: PropertyStatus })
  status: PropertyStatus;

  @ApiProperty({ enum: OperationType })
  operationType: OperationType;

  @ApiPropertyOptional({ type: MoneyResponseDto })
  salePrice?: MoneyResponseDto;

  @ApiPropertyOptional({ type: MoneyResponseDto })
  rentPrice?: MoneyResponseDto;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiPropertyOptional()
  bedrooms?: number;

  @ApiPropertyOptional()
  bathrooms?: number;

  @ApiPropertyOptional()
  totalArea?: number;

  @ApiPropertyOptional()
  primaryImageUrl?: string;

  @ApiPropertyOptional()
  slug?: string;

  @ApiProperty()
  isPublished: boolean;

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

export class PaginatedPropertyResponseDto {
  @ApiProperty({ type: [PropertyListItemDto] })
  data: PropertyListItemDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
