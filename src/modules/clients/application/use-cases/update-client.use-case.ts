import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../interfaces/client.repository.interface';
import { ClientMapper } from '../mappers/client.mapper';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ClientResponseDto } from '../dto/client-response.dto';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(id: string, dto: UpdateClientDto): Promise<ClientResponseDto> {
    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    // Check email uniqueness if changing
    if (dto.email && dto.email !== existingClient.email) {
      const emailExists = await this.clientRepository.emailExists(dto.email, id);
      if (emailExists) {
        throw new ConflictException('A client with this email already exists');
      }
    }

    const updatedClient = await this.clientRepository.update(id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      alternatePhone: dto.alternatePhone,
      source: dto.source,
      sourceDetail: dto.sourceDetail,
      status: dto.status,
      budget: dto.budget,
      preferences: dto.preferences,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      notes: dto.notes,
      nextFollowUp: dto.nextFollowUp ? new Date(dto.nextFollowUp) : undefined,
      assignedToId: dto.assignedToId,
    });

    return this.clientMapper.toResponse(updatedClient);
  }
}
