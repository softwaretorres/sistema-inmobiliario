import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsEmail,
  MaxLength,
  MinLength,
  IsPhoneNumber,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';

export enum OwnerType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
}

export class CreateOwnerDto {
  @ApiProperty({ enum: OwnerType, example: OwnerType.INDIVIDUAL })
  @IsEnum(OwnerType)
  type: OwnerType;

  // Individual fields
  @ApiPropertyOptional({ example: 'Juan' })
  @ValidateIf((o) => o.type === OwnerType.INDIVIDUAL)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Pérez García' })
  @ValidateIf((o) => o.type === OwnerType.INDIVIDUAL)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  lastName?: string;

  // Company fields
  @ApiPropertyOptional({ example: 'Inmuebles del Centro S.A. de C.V.' })
  @ValidateIf((o) => o.type === OwnerType.COMPANY)
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  companyName?: string;

  @ApiPropertyOptional({ example: 'Inmuebles del Centro Sociedad Anónima de Capital Variable' })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  legalName?: string;

  @ApiPropertyOptional({ example: 'IDC850101XXX', description: 'RFC (Tax ID)' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  taxId?: string;

  // Contact
  @ApiProperty({ example: 'juan.perez@email.com' })
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

  // Address
  @ApiPropertyOptional({ example: 'Av. Reforma 123, Col. Juárez' })
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

  @ApiPropertyOptional({ example: 'MX' })
  @IsString()
  @IsOptional()
  @MaxLength(3)
  country?: string;

  @ApiPropertyOptional({ example: '06600' })
  @IsString()
  @IsOptional()
  @MaxLength(10)
  zipCode?: string;

  // Banking info
  @ApiPropertyOptional({ example: 'BBVA' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  bankName?: string;

  @ApiPropertyOptional({ example: '0123456789' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  bankAccount?: string;

  @ApiPropertyOptional({ example: '012345678901234567', description: 'Mexican CLABE' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  clabe?: string;

  // Notes
  @ApiPropertyOptional({ example: 'Propietario recurrente, muy puntual con pagos.' })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  notes?: string;
}
