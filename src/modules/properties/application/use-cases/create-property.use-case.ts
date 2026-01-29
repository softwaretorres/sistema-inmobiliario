import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { Property } from '@core/domain/entities/property.entity';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../interfaces/property.repository.interface';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { PropertyResponseDto } from '../dto/property-response.dto';
import { PropertyMapper } from '../mappers/property.mapper';

export interface ICreatePropertyUseCase {
  execute(dto: CreatePropertyDto): Promise<PropertyResponseDto>;
}

@Injectable()
export class CreatePropertyUseCase implements ICreatePropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  async execute(dto: CreatePropertyDto): Promise<PropertyResponseDto> {
    // Check if code already exists
    const codeExists = await this.propertyRepository.codeExists(dto.code);
    if (codeExists) {
      throw new ConflictException(`Property with code ${dto.code} already exists`);
    }

    // Map DTO to domain entity creation props
    const createProps = this.propertyMapper.toDomainCreateProps(dto);

    // Create domain entity
    const property = Property.create(createProps);

    // Persist
    const savedProperty = await this.propertyRepository.create(property);

    // Map to response DTO
    return this.propertyMapper.toResponseDto(savedProperty);
  }
}
