import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../interfaces/property.repository.interface';
import { PropertyResponseDto } from '../dto/property-response.dto';
import { PropertyMapper } from '../mappers/property.mapper';

export interface IPublishPropertyUseCase {
  execute(id: string, slug?: string): Promise<PropertyResponseDto>;
}

export interface IUnpublishPropertyUseCase {
  execute(id: string): Promise<PropertyResponseDto>;
}

@Injectable()
export class PublishPropertyUseCase implements IPublishPropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  async execute(id: string, slug?: string): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Check slug uniqueness if provided
    if (slug) {
      const slugExists = await this.propertyRepository.slugExists(slug, id);
      if (slugExists) {
        throw new ConflictException(`Property with slug ${slug} already exists`);
      }
    }

    // Publish the property (domain method handles business rules)
    property.publish(slug);

    // Persist
    const updatedProperty = await this.propertyRepository.update(property);

    return this.propertyMapper.toResponseDto(updatedProperty);
  }
}

@Injectable()
export class UnpublishPropertyUseCase implements IUnpublishPropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  async execute(id: string): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    property.unpublish();

    const updatedProperty = await this.propertyRepository.update(property);

    return this.propertyMapper.toResponseDto(updatedProperty);
  }
}
