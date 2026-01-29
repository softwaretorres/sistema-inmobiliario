import { Injectable, Inject } from '@nestjs/common';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
  IPropertyFilters,
  IPaginationOptions,
} from '../interfaces/property.repository.interface';
import { PropertyQueryDto } from '../dto/property-query.dto';
import { PaginatedPropertyResponseDto } from '../dto/property-response.dto';
import { PropertyMapper } from '../mappers/property.mapper';

export interface IListPropertiesUseCase {
  execute(query: PropertyQueryDto): Promise<PaginatedPropertyResponseDto>;
}

@Injectable()
export class ListPropertiesUseCase implements IListPropertiesUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
    private readonly propertyMapper: PropertyMapper,
  ) {}

  async execute(query: PropertyQueryDto): Promise<PaginatedPropertyResponseDto> {
    const filters: IPropertyFilters = {
      status: query.status,
      type: query.type,
      operationType: query.operationType,
      city: query.city,
      state: query.state,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      bedrooms: query.bedrooms,
      bathrooms: query.bathrooms,
      ownerId: query.ownerId,
      agentId: query.agentId,
      search: query.search,
    };

    const pagination: IPaginationOptions = {
      page: query.page || 1,
      limit: query.limit || 10,
      sortBy: query.sortBy || 'createdAt',
      sortOrder: query.sortOrder || 'desc',
    };

    const result = await this.propertyRepository.findAll(filters, pagination);

    return {
      data: result.data.map((property) => this.propertyMapper.toListItemDto(property)),
      meta: result.meta,
    };
  }
}
