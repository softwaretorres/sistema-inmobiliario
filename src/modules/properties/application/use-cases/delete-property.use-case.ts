import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { PropertyStatus } from '@core/domain/entities/property.entity';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../interfaces/property.repository.interface';

export interface IDeletePropertyUseCase {
  execute(id: string): Promise<void>;
}

@Injectable()
export class DeletePropertyUseCase implements IDeletePropertyUseCase {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: IPropertyRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    // Business rule: cannot delete sold or rented properties
    if (
      property.status === PropertyStatus.SOLD ||
      property.status === PropertyStatus.RENTED
    ) {
      throw new ConflictException(
        'Cannot delete a property that has been sold or rented. Archive it instead.',
      );
    }

    // Business rule: cannot delete properties with active transactions
    // This would be checked via a transaction repository in a real scenario

    await this.propertyRepository.delete(id);
  }
}
