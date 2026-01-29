import { Injectable, Inject, ConflictException } from '@nestjs/common';
import {
  OWNER_REPOSITORY,
  IOwnerRepository,
} from '../interfaces/owner.repository.interface';
import { OwnerMapper } from '../mappers/owner.mapper';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { OwnerResponseDto } from '../dto/owner-response.dto';

@Injectable()
export class CreateOwnerUseCase {
  constructor(
    @Inject(OWNER_REPOSITORY)
    private readonly ownerRepository: IOwnerRepository,
    private readonly ownerMapper: OwnerMapper,
  ) {}

  async execute(dto: CreateOwnerDto): Promise<OwnerResponseDto> {
    // Check if email already exists
    const emailExists = await this.ownerRepository.emailExists(dto.email);
    if (emailExists) {
      throw new ConflictException('An owner with this email already exists');
    }

    // Check if tax ID already exists (if provided)
    if (dto.taxId) {
      const taxIdExists = await this.ownerRepository.taxIdExists(dto.taxId);
      if (taxIdExists) {
        throw new ConflictException('An owner with this tax ID already exists');
      }
    }

    const owner = await this.ownerRepository.create({
      type: dto.type,
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
      country: dto.country ?? 'MX',
      zipCode: dto.zipCode,
      bankName: dto.bankName,
      bankAccount: dto.bankAccount,
      clabe: dto.clabe,
      notes: dto.notes,
    });

    return this.ownerMapper.toResponse(owner);
  }
}
