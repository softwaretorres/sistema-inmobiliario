import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import {
  OWNER_REPOSITORY,
  IOwnerRepository,
} from '../interfaces/owner.repository.interface';
import { OwnerMapper } from '../mappers/owner.mapper';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { OwnerResponseDto } from '../dto/owner-response.dto';

@Injectable()
export class UpdateOwnerUseCase {
  constructor(
    @Inject(OWNER_REPOSITORY)
    private readonly ownerRepository: IOwnerRepository,
    private readonly ownerMapper: OwnerMapper,
  ) {}

  async execute(id: string, dto: UpdateOwnerDto): Promise<OwnerResponseDto> {
    // Check if owner exists
    const existingOwner = await this.ownerRepository.findById(id);
    if (!existingOwner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    // Check email uniqueness if changing
    if (dto.email && dto.email !== existingOwner.email) {
      const emailExists = await this.ownerRepository.emailExists(dto.email, id);
      if (emailExists) {
        throw new ConflictException('An owner with this email already exists');
      }
    }

    // Check tax ID uniqueness if changing
    if (dto.taxId && dto.taxId !== existingOwner.taxId) {
      const taxIdExists = await this.ownerRepository.taxIdExists(dto.taxId, id);
      if (taxIdExists) {
        throw new ConflictException('An owner with this tax ID already exists');
      }
    }

    const updatedOwner = await this.ownerRepository.update(id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      companyName: dto.companyName,
      legalName: dto.legalName,
      taxId: dto.taxId,
      email: dto.email,
      phone: dto.phone,
      alternatePhone: dto.alternatePhone,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      country: dto.country,
      zipCode: dto.zipCode,
      bankName: dto.bankName,
      bankAccount: dto.bankAccount,
      clabe: dto.clabe,
      notes: dto.notes,
    });

    return this.ownerMapper.toResponse(updatedOwner);
  }
}
