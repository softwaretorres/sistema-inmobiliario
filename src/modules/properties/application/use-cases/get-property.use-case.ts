import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../interfaces/property.repository.interface';
import { PropertyResponseDto } from '../dto/property-response.dto';
import { PropertyMapper } from '../mappers/property.mapper';

export interface IGetPropertyUseCase {
  execute(id: string): Promise<PropertyResponseDto>;
  executeBySlug(slug: string): Promise<PropertyResponseDto>;
  executeByCode(code: string): Promise<PropertyResponseDto>;
}

@Injectable()
export class GetPropertyUseCase implements IGetPropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  async execute(id: string): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findByIdWithRelations(id);

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return this.propertyMapper.toResponseDto(property);
  }

  async executeBySlug(slug: string): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findBySlug(slug);

    if (!property) {
      throw new NotFoundException(`Property with slug ${slug} not found`);
    }

    return this.propertyMapper.toResponseDto(property);
  }

  async executeByCode(code: string): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findByCode(code);

    if (!property) {
      throw new NotFoundException(`Property with code ${code} not found`);
    }

    return this.propertyMapper.toResponseDto(property);
  }
}
