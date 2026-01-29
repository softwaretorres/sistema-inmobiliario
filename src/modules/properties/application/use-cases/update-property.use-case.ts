import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../interfaces/property.repository.interface';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PropertyResponseDto } from '../dto/property-response.dto';
import { PropertyMapper } from '../mappers/property.mapper';
import { IAddressProps } from '@core/domain/value-objects/address.vo';

export interface IUpdatePropertyUseCase {
  execute(id: string, dto: UpdatePropertyDto): Promise<PropertyResponseDto>;
}

@Injectable()
export class UpdatePropertyUseCase implements IUpdatePropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  async execute(id: string, dto: UpdatePropertyDto): Promise<PropertyResponseDto> {
    // Find existing property
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Check slug uniqueness if updating
    if (dto.slug && dto.slug !== property.slug) {
      const slugExists = await this.propertyRepository.slugExists(dto.slug, id);
      if (slugExists) {
        throw new ConflictException(`Property with slug ${dto.slug} already exists`);
      }
    }

    // Update details
    property.updateDetails({
      title: dto.title,
      description: dto.description,
      type: dto.type,
      operationType: dto.operationType,
      salePrice: dto.salePrice,
      rentPrice: dto.rentPrice,
      currency: dto.currency,
      characteristics: dto.characteristics,
      amenities: dto.amenities,
      features: dto.features,
    });

    // Update address if provided
    if (dto.address) {
      const addressProps: IAddressProps = {
        street: dto.address.street || property.address.street,
        neighborhood: dto.address.neighborhood ?? property.address.neighborhood,
        city: dto.address.city || property.address.city,
        state: dto.address.state || property.address.state,
        country: dto.address.country || property.address.country,
        zipCode: dto.address.zipCode ?? property.address.zipCode,
        latitude: dto.address.latitude ?? property.address.latitude,
        longitude: dto.address.longitude ?? property.address.longitude,
      };
      property.updateAddress(addressProps);
    }

    // Update agent if provided
    if (dto.agentId && dto.agentId !== property.agentId) {
      property.assignAgent(dto.agentId);
    }

    // Persist
    const updatedProperty = await this.propertyRepository.update(property);

    return this.propertyMapper.toResponseDto(updatedProperty);
  }
}
