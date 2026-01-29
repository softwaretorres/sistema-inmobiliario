import { Injectable, Inject } from '@nestjs/common';
import {
  OWNER_REPOSITORY,
  IOwnerRepository,
} from '../interfaces/owner.repository.interface';
import { OwnerMapper } from '../mappers/owner.mapper';
import { OwnerQueryDto } from '../dto/owner-query.dto';
import { PaginatedOwnerResponseDto } from '../dto/owner-response.dto';

@Injectable()
export class ListOwnersUseCase {
  constructor(
    @Inject(OWNER_REPOSITORY)
    private readonly ownerRepository: IOwnerRepository,
    private readonly ownerMapper: OwnerMapper,
  ) {}

  async execute(query: OwnerQueryDto): Promise<PaginatedOwnerResponseDto> {
    const filters = {
      type: query.type,
      city: query.city,
      state: query.state,
      search: query.search,
    };

    const pagination = {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy ?? 'createdAt',
      sortOrder: query.sortOrder ?? 'desc',
    };

    const result = await this.ownerRepository.findAll(filters, pagination);

    return {
      data: result.data.map((owner) => this.ownerMapper.toListItem(owner)),
      meta: result.meta,
    };
  }
}
