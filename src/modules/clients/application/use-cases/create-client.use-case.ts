import { Injectable, Inject, ConflictException } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../interfaces/client.repository.interface';
import { ClientMapper } from '../mappers/client.mapper';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientResponseDto } from '../dto/client-response.dto';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
    private readonly clientMapper: ClientMapper,
  ) {}

  async execute(dto: CreateClientDto): Promise<ClientResponseDto> {
    // Check if email already exists
    const emailExists = await this.clientRepository.emailExists(dto.email);
    if (emailExists) {
      throw new ConflictException('A client with this email already exists');
    }

    const client = await this.clientRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phone: dto.phone,
      alternatePhone: dto.alternatePhone,
      source: dto.source,
      sourceDetail: dto.sourceDetail,
      status: dto.status ?? 'NEW',
      budget: dto.budget,
      preferences: dto.preferences,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      notes: dto.notes,
      nextFollowUp: dto.nextFollowUp ? new Date(dto.nextFollowUp) : undefined,
      assignedToId: dto.assignedToId,
    });

    return this.clientMapper.toResponse(client);
  }
}
