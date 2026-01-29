import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  Max,
  IsUUID,
  IsObject,
  ValidateNested,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PropertyType,
  OperationType,
} from '@core/domain/entities/property.entity';

export class AddressDto {
  @ApiProperty({ example: 'Av. Reforma 123' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  street: string;

  @ApiPropertyOptional({ example: 'Polanco' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  neighborhood?: string;

  @ApiProperty({ example: 'Ciudad de México' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty({ example: 'CDMX' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  state: string;

  @ApiProperty({ example: 'MX', default: 'MX' })
  @IsString()
  @IsOptional()
  @MaxLength(3)
  country?: string = 'MX';

  @ApiPropertyOptional({ example: '11550' })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  zipCode?: string;

  @ApiPropertyOptional({ example: 19.4326 })
  @IsNumber()
  @IsOptional()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({ example: -99.1332 })
  @IsNumber()
  @IsOptional()
  @Min(-180)
  @Max(180)
  longitude?: number;
}

export class CharacteristicsDto {
  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(50)
  bedrooms?: number;

  @ApiPropertyOptional({ example: 2.5 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(50)
  bathrooms?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(20)
  halfBathrooms?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  parkingSpaces?: number;

  @ApiPropertyOptional({ example: 250.5 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  totalArea?: number;

  @ApiPropertyOptional({ example: 200 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  builtArea?: number;

  @ApiPropertyOptional({ example: 300 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  lotArea?: number;

  @ApiPropertyOptional({ example: 2020 })
  @IsNumber()
  @IsOptional()
  @Min(1800)
  @Max(2100)
  yearBuilt?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(200)
  floors?: number;
}

export class CreatePropertyDto {
  @ApiProperty({ example: 'PROP-2024-001' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  code: string;

  @ApiProperty({ example: 'Hermoso departamento en Polanco' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    example: 'Amplio departamento con vista al parque...',
  })
  @IsString()
  @IsOptional()
  @MaxLength(5000)
  description?: string;

  @ApiProperty({ enum: PropertyType, example: PropertyType.APARTMENT })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty({ enum: OperationType, example: OperationType.SALE })
  @IsEnum(OperationType)
  operationType: OperationType;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiPropertyOptional({ example: 5000000 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  salePrice?: number;

  @ApiPropertyOptional({ example: 25000 })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  rentPrice?: number;

  @ApiProperty({ example: 'MXN', default: 'MXN' })
  @IsString()
  @IsOptional()
  @MaxLength(3)
  currency?: string = 'MXN';

  @ApiPropertyOptional({ type: CharacteristicsDto })
  @ValidateNested()
  @Type(() => CharacteristicsDto)
  @IsOptional()
  characteristics?: CharacteristicsDto;

  @ApiPropertyOptional({
    example: { pool: true, gym: true, security: true },
  })
  @IsObject()
  @IsOptional()
  amenities?: Record<string, boolean>;

  @ApiPropertyOptional({
    example: { airConditioning: true, heating: false },
  })
  @IsObject()
  @IsOptional()
  features?: Record<string, boolean>;

  @ApiProperty({ example: 'uuid-owner-id' })
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ example: 'uuid-agent-id' })
  @IsUUID()
  @IsNotEmpty()
  agentId: string;

  @ApiPropertyOptional({ example: 'https://example.com/virtual-tour' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  virtualTourUrl?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/watch?v=xxx' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  videoUrl?: string;
}
