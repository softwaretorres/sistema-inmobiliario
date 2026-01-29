import { ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreatePropertyDto } from './create-property.dto';
import { PropertyStatus } from '@core/domain/entities/property.entity';

export class UpdatePropertyDto extends PartialType(
  OmitType(CreatePropertyDto, ['code', 'ownerId'] as const),
) {
  @ApiPropertyOptional({ enum: PropertyStatus })
  @IsEnum(PropertyStatus)
  @IsOptional()
  status?: PropertyStatus;

  @ApiPropertyOptional({ example: 'hermoso-departamento-polanco-abc123' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  slug?: string;

  @ApiPropertyOptional({ example: 'Departamento en venta en Polanco' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  metaTitle?: string;

  @ApiPropertyOptional({
    example: 'Hermoso departamento de 3 recámaras...',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  metaDescription?: string;
}
