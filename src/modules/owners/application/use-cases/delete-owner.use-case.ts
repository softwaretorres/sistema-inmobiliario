import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import {
  OWNER_REPOSITORY,
  IOwnerRepository,
} from '../interfaces/owner.repository.interface';

@Injectable()
export class DeleteOwnerUseCase {
  constructor(
    @Inject(OWNER_REPOSITORY)
    private readonly ownerRepository: IOwnerRepository,
  ) {}

  async execute(id: string): Promise<void> {
    // Check if owner exists
    const owner = await this.ownerRepository.findById(id);
    if (!owner) {
      throw new NotFoundException(`Owner with ID ${id} not found`);
    }

    // Check if owner has properties
    const propertiesCount = await this.ownerRepository.countProperties(id);
    if (propertiesCount > 0) {
      throw new ConflictException(
        `Cannot delete owner with ${propertiesCount} associated properties. ` +
        'Please reassign or delete the properties first.',
      );
    }

    await this.ownerRepository.delete(id);
  }
}
