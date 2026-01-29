import { Injectable, Inject } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../interfaces/client.repository.interface';
import { ClientMapper } from '../mappers/client.mapper';
import { ClientQueryDto } from '../dto/client-query.dto';
import { PaginatedClientResponseDto } from '../dto/client-response.dto';

@Injectable()
export class ListClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(query: ClientQueryDto): Promise<PaginatedClientResponseDto> {
    const filters = {
      status: query.status,
      source: query.source,
      assignedToId: query.assignedToId,
      search: query.search,
    };

    const pagination = {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy ?? 'createdAt',
      sortOrder: query.sortOrder ?? 'desc',
    };

    const result = await this.clientRepository.findAll(filters, pagination);

    return {
      data: result.data.map((client) => this.clientMapper.toListItem(client)),
      meta: result.meta,
    };
  }
}
