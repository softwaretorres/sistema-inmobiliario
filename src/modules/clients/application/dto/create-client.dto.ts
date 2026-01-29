import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsEmail,
  IsNumber,
  IsObject,
  IsUUID,
  MaxLength,
  MinLength,
  IsPositive,
  IsDateString,
} from 'class-validator';

export enum ClientStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  SHOWING = 'SHOWING',
  NEGOTIATING = 'NEGOTIATING',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
  INACTIVE = 'INACTIVE',
}

export class CreateClientDto {
  @ApiProperty({ example: 'María' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ example: 'González López' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: 'maria.gonzalez@email.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: '+525512345678' })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  phone: string;

  @ApiPropertyOptional({ example: '+525587654321' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  alternatePhone?: string;

  @ApiPropertyOptional({ example: 'website', description: 'Lead source' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  source?: string;

  @ApiPropertyOptional({ example: 'Facebook Ads Campaign 2024' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  sourceDetail?: string;

  @ApiPropertyOptional({ enum: ClientStatus, default: ClientStatus.NEW })
  @IsEnum(ClientStatus)
  @IsOptional()
  status?: ClientStatus;

  @ApiPropertyOptional({ example: 5000000, description: 'Budget in currency units' })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  budget?: number;

  @ApiPropertyOptional({
    example: { type: 'HOUSE', locations: ['Polanco', 'Condesa'], bedrooms: 3 },
    description: 'Client preferences',
  })
  @IsObject()
  @IsOptional()
  preferences?: Record<string, any>;

  @ApiPropertyOptional({ example: 'Av. Insurgentes 123' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional({ example: 'Ciudad de México' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @ApiPropertyOptional({ example: 'CDMX' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  state?: string;

  @ApiPropertyOptional({ example: 'Interesado en propiedades de lujo en zona sur.' })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes?: string;

  @ApiPropertyOptional({ example: '2024-02-15T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  nextFollowUp?: string;

  @ApiPropertyOptional({ example: 'uuid-of-agent' })
  @IsUUID()
  @IsOptional()
  assignedToId?: string;
}
