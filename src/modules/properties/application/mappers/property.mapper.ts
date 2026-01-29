import { Injectable } from '@nestjs/common';
import {
  Property,
  IPropertyCharacteristics,
  IPropertyImage,
  PropertyType,
  OperationType,
} from '@core/domain/entities/property.entity';
import { IAddressProps } from '@core/domain/value-objects/address.vo';
import { CreatePropertyDto } from '../dto/create-property.dto';
import {
  PropertyResponseDto,
  PropertyListItemDto,
  MoneyResponseDto,
  AddressResponseDto,
  CharacteristicsResponseDto,
  PropertyImageResponseDto,
} from '../dto/property-response.dto';

@Injectable()
export class PropertyMapper {
  /**
   * Map CreatePropertyDto to domain entity creation props
   */
  toDomainCreateProps(dto: CreatePropertyDto): {
    code: string;
    title: string;
    description?: string;
    type: PropertyType;
    operationType: OperationType;
    address: IAddressProps;
    salePrice?: number;
    rentPrice?: number;
    currency?: string;
    characteristics?: IPropertyCharacteristics;
    amenities?: Record<string, boolean>;
    features?: Record<string, boolean>;
    ownerId: string;
    agentId: string;
  } {
    return {
      code: dto.code,
      title: dto.title,
      description: dto.description,
      type: dto.type,
      operationType: dto.operationType,
      address: {
        street: dto.address.street,
        neighborhood: dto.address.neighborhood,
        city: dto.address.city,
        state: dto.address.state,
        country: dto.address.country || 'MX',
        zipCode: dto.address.zipCode,
        latitude: dto.address.latitude,
        longitude: dto.address.longitude,
      },
      salePrice: dto.salePrice,
      rentPrice: dto.rentPrice,
      currency: dto.currency,
      characteristics: dto.characteristics,
      amenities: dto.amenities,
      features: dto.features,
      ownerId: dto.ownerId,
      agentId: dto.agentId,
    };
  }

  /**
   * Map domain entity to response DTO
   */
  toResponseDto(property: Property): PropertyResponseDto {
    const json = property.toJSON();

    return {
      id: property.id,
      code: property.code,
      title: property.title,
      description: property.description,
      type: property.type,
      status: property.status,
      operationType: property.operationType,
      salePrice: property.salePrice
        ? this.toMoneyResponse(property.salePrice.amount, property.salePrice.currency)
        : undefined,
      rentPrice: property.rentPrice
        ? this.toMoneyResponse(property.rentPrice.amount, property.rentPrice.currency)
        : undefined,
      address: this.toAddressResponse(property.address.toJSON()),
      characteristics: this.toCharacteristicsResponse(property.characteristics),
      amenities: property.amenities,
      features: property.features,
      images: property.images.map((img) => this.toImageResponse(img)),
      primaryImage: property.primaryImage
        ? this.toImageResponse(property.primaryImage)
        : undefined,
      ownerId: property.ownerId,
      agentId: property.agentId,
      slug: property.slug,
      isPublished: property.isPublished,
      publishedAt: property.publishedAt,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };
  }

  /**
   * Map domain entity to list item DTO (lighter response for lists)
   */
  toListItemDto(property: Property): PropertyListItemDto {
    return {
      id: property.id,
      code: property.code,
      title: property.title,
      type: property.type,
      status: property.status,
      operationType: property.operationType,
      salePrice: property.salePrice
        ? this.toMoneyResponse(property.salePrice.amount, property.salePrice.currency)
        : undefined,
      rentPrice: property.rentPrice
        ? this.toMoneyResponse(property.rentPrice.amount, property.rentPrice.currency)
        : undefined,
      city: property.address.city,
      state: property.address.state,
      bedrooms: property.characteristics.bedrooms,
      bathrooms: property.characteristics.bathrooms,
      totalArea: property.characteristics.totalArea,
      primaryImageUrl: property.primaryImage?.url,
      slug: property.slug,
      isPublished: property.isPublished,
      createdAt: property.createdAt,
    };
  }

  /**
   * Map Prisma model to domain entity
   */
  toDomainFromPrisma(prismaProperty: any): Property {
    // We need to reconstruct the domain entity from Prisma data
    // This requires using a reconstitute method on the entity
    // For now, we'll create with all properties

    const createProps = {
      id: prismaProperty.id,
      code: prismaProperty.code,
      title: prismaProperty.title,
      description: prismaProperty.description || undefined,
      type: prismaProperty.type as PropertyType,
      operationType: prismaProperty.operationType as OperationType,
      address: {
        street: prismaProperty.address,
        neighborhood: prismaProperty.neighborhood || undefined,
        city: prismaProperty.city,
        state: prismaProperty.state,
        country: prismaProperty.country,
        zipCode: prismaProperty.zipCode || undefined,
        latitude: prismaProperty.latitude ? Number(prismaProperty.latitude) : undefined,
        longitude: prismaProperty.longitude ? Number(prismaProperty.longitude) : undefined,
      },
      salePrice: prismaProperty.salePrice ? Number(prismaProperty.salePrice) : undefined,
      rentPrice: prismaProperty.rentPrice ? Number(prismaProperty.rentPrice) : undefined,
      currency: prismaProperty.currency,
      characteristics: {
        bedrooms: prismaProperty.bedrooms || undefined,
        bathrooms: prismaProperty.bathrooms ? Number(prismaProperty.bathrooms) : undefined,
        halfBathrooms: prismaProperty.halfBathrooms || undefined,
        parkingSpaces: prismaProperty.parkingSpaces || undefined,
        totalArea: prismaProperty.totalArea ? Number(prismaProperty.totalArea) : undefined,
        builtArea: prismaProperty.builtArea ? Number(prismaProperty.builtArea) : undefined,
        lotArea: prismaProperty.lotArea ? Number(prismaProperty.lotArea) : undefined,
        yearBuilt: prismaProperty.yearBuilt || undefined,
        floors: prismaProperty.floors || undefined,
      },
      amenities: prismaProperty.amenities || {},
      features: prismaProperty.features || {},
      ownerId: prismaProperty.ownerId,
      agentId: prismaProperty.agentId,
    };

    const property = Property.create(createProps);

    // Set additional properties that aren't part of create
    // This would require exposing a reconstitute method in the entity
    // For now we return as-is

    return property;
  }

  /**
   * Map domain entity to Prisma create data
   */
  toPrismaCreate(property: Property): any {
    const address = property.address.toJSON();

    return {
      id: property.id,
      code: property.code,
      title: property.title,
      description: property.description,
      type: property.type,
      status: property.status,
      operationType: property.operationType,
      salePrice: property.salePrice?.amount,
      rentPrice: property.rentPrice?.amount,
      currency: property.salePrice?.currency || property.rentPrice?.currency || 'MXN',
      address: address.street,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
      latitude: address.latitude,
      longitude: address.longitude,
      bedrooms: property.characteristics.bedrooms,
      bathrooms: property.characteristics.bathrooms,
      halfBathrooms: property.characteristics.halfBathrooms,
      parkingSpaces: property.characteristics.parkingSpaces,
      totalArea: property.characteristics.totalArea,
      builtArea: property.characteristics.builtArea,
      lotArea: property.characteristics.lotArea,
      yearBuilt: property.characteristics.yearBuilt,
      floors: property.characteristics.floors,
      amenities: property.amenities,
      features: property.features,
      ownerId: property.ownerId,
      agentId: property.agentId,
      slug: property.slug,
      publishedAt: property.publishedAt,
    };
  }

  /**
   * Map domain entity to Prisma update data
   */
  toPrismaUpdate(property: Property): any {
    const address = property.address.toJSON();

    return {
      title: property.title,
      description: property.description,
      type: property.type,
      status: property.status,
      operationType: property.operationType,
      salePrice: property.salePrice?.amount,
      rentPrice: property.rentPrice?.amount,
      currency: property.salePrice?.currency || property.rentPrice?.currency || 'MXN',
      address: address.street,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
      latitude: address.latitude,
      longitude: address.longitude,
      bedrooms: property.characteristics.bedrooms,
      bathrooms: property.characteristics.bathrooms,
      halfBathrooms: property.characteristics.halfBathrooms,
      parkingSpaces: property.characteristics.parkingSpaces,
      totalArea: property.characteristics.totalArea,
      builtArea: property.characteristics.builtArea,
      lotArea: property.characteristics.lotArea,
      yearBuilt: property.characteristics.yearBuilt,
      floors: property.characteristics.floors,
      amenities: property.amenities,
      features: property.features,
      agentId: property.agentId,
      slug: property.slug,
      publishedAt: property.publishedAt,
    };
  }

  private toMoneyResponse(amount: number, currency: string): MoneyResponseDto {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency,
    });

    return {
      amount,
      currency,
      formatted: formatter.format(amount),
    };
  }

  private toAddressResponse(address: IAddressProps): AddressResponseDto {
    return {
      street: address.street,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      country: address.country,
      zipCode: address.zipCode,
      latitude: address.latitude,
      longitude: address.longitude,
    };
  }

  private toCharacteristicsResponse(
    characteristics: IPropertyCharacteristics,
  ): CharacteristicsResponseDto {
    return {
      bedrooms: characteristics.bedrooms,
      bathrooms: characteristics.bathrooms,
      halfBathrooms: characteristics.halfBathrooms,
      parkingSpaces: characteristics.parkingSpaces,
      totalArea: characteristics.totalArea,
      builtArea: characteristics.builtArea,
      lotArea: characteristics.lotArea,
      yearBuilt: characteristics.yearBuilt,
      floors: characteristics.floors,
    };
  }

  private toImageResponse(image: IPropertyImage): PropertyImageResponseDto {
    return {
      id: image.id,
      url: image.url,
      thumbnailUrl: image.thumbnailUrl,
      caption: image.caption,
      isPrimary: image.isPrimary,
      order: image.order,
    };
  }
}
