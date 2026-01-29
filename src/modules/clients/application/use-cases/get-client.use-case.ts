import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../interfaces/client.repository.interface';
import { ClientMapper } from '../mappers/client.mapper';
import { ClientResponseDto } from '../dto/client-response.dto';

@Injectable()
export class GetClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(id: string): Promise<ClientResponseDto> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return this.clientMapper.toResponse(client);
  }
}
