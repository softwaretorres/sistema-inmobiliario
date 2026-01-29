import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
  Min,
  Max,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PropertyType,
  PropertyStatus,
  OperationType,
} from '@core/domain/entities/property.entity';

export class PropertyQueryDto {
  @ApiPropertyOptional({ enum: PropertyStatus })
  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @ApiPropertyOptional({ enum: PropertyType })
  @IsEnum(PropertyType)
  @IsOptional()
  type?: PropertyType;

  @ApiPropertyOptional({ enum: OperationType })
  @IsEnum(OperationType)
  @IsOptional()
  operationType?: OperationType;

  @ApiPropertyOptional({ example: 'Ciudad de México' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'CDMX' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 1000000 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  minPrice?: number;

  @ApiPropertyOptional({ example: 10000000 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  maxPrice?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(50)
  @Type(() => Number)
  bedrooms?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(50)
  @Type(() => Number)
  bathrooms?: number;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  ownerId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  agentId?: string;

  @ApiPropertyOptional({ example: 'departamento polanco' })
  @IsString()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit?: number = 10;

  @ApiPropertyOptional({
    enum: ['createdAt', 'salePrice', 'rentPrice', 'title'],
    default: 'createdAt',
  })
  @IsString()
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
