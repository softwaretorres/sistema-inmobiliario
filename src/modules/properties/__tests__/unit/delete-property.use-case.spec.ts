import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { DeletePropertyUseCase } from '../../application/use-cases/delete-property.use-case';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../../application/interfaces/property.repository.interface';
import {
  Property,
  PropertyType,
  PropertyStatus,
  OperationType,
} from '@core/domain/entities/property.entity';

describe('DeletePropertyUseCase', () => {
  let useCase: DeletePropertyUseCase;
  let propertyRepository: jest.Mocked<IPropertyRepository>;

  const mockPropertyRepository: jest.Mocked<IPropertyRepository> = {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findByCode: jest.fn(),
    findBySlug: jest.fn(),
    findAll: jest.fn(),
    findByOwner: jest.fn(),
    findByAgent: jest.fn(),
    delete: jest.fn(),
    codeExists: jest.fn(),
    slugExists: jest.fn(),
    countByStatus: jest.fn(),
    findByIdWithRelations: jest.fn(),
  };

  const createMockProperty = (status: PropertyStatus = PropertyStatus.DRAFT): Property => {
    const property = Property.create({
      id: '123e4567-e89b-12d3-a456-426614174000',
      code: 'PROP-2024-001',
      title: 'Test Property',
      type: PropertyType.APARTMENT,
      operationType: OperationType.SALE,
      address: {
        street: 'Test Street 123',
        city: 'Test City',
        state: 'Test State',
        country: 'MX',
      },
      salePrice: 5000000,
      currency: 'MXN',
      ownerId: '123e4567-e89b-12d3-a456-426614174001',
      agentId: '123e4567-e89b-12d3-a456-426614174002',
    });

    // Note: In a real scenario, we'd have a method to set status
    // For testing, we'll use the property as-is (status is DRAFT by default)
    return property;
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePropertyUseCase,
        {
          provide: PROPERTY_REPOSITORY,
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeletePropertyUseCase>(DeletePropertyUseCase);
    propertyRepository = module.get(PROPERTY_REPOSITORY);
  });

  describe('execute', () => {
    it('should delete property successfully when status is DRAFT', async () => {
      const mockProperty = createMockProperty(PropertyStatus.DRAFT);
      mockPropertyRepository.findById.mockResolvedValue(mockProperty);
      mockPropertyRepository.delete.mockResolvedValue(undefined);

      await useCase.execute(mockProperty.id);

      expect(mockPropertyRepository.findById).toHaveBeenCalledWith(mockProperty.id);
      expect(mockPropertyRepository.delete).toHaveBeenCalledWith(mockProperty.id);
    });

    it('should throw NotFoundException when property not found', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174999';
      mockPropertyRepository.findById.mockResolvedValue(null);

      await expect(useCase.execute(nonExistentId)).rejects.toThrow(NotFoundException);
      await expect(useCase.execute(nonExistentId)).rejects.toThrow(
        `Property with ID ${nonExistentId} not found`,
      );
      expect(mockPropertyRepository.delete).not.toHaveBeenCalled();
    });

    // Note: Testing SOLD/RENTED status would require modifying the entity's status
    // In a real implementation, we'd have a method to set this for testing
    // or use a factory that can create properties with any status
  });
});
