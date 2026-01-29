import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  OWNER_REPOSITORY,
  IOwnerRepository,
} from '../interfaces/owner.repository.interface';
import { OwnerMapper } from '../mappers/owner.mapper';
import { OwnerResponseDto } from '../dto/owner-response.dto';

@Injectable()
export class GetOwnerUseCase {
  constructor(
    @Inject(OWNER_REPOSITORY)
    private readonly ownerRepository: IOwnerRepository,
    private readonly ownerMapper: OwnerMapper,
  ) {}

  async execute(id: string): Promise<OwnerResponseDto> {
    const owner = await this.ownerRepository.findById(id);

    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    return this.ownerMapper.toResponse(owner);
  }

  async executeByEmail(email: string): Promise<OwnerResponseDto> {
    const owner = await this.ownerRepository.findByEmail(email);

    if (!owner) {
      throw new NotFoundException(`Owner with email ${email} not found`);
    }

    return this.ownerMapper.toResponse(owner);
  }
}
