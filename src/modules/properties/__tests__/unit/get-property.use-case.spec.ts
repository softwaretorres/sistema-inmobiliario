import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetPropertyUseCase } from '../../application/use-cases/get-property.use-case';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../../application/interfaces/property.repository.interface';
import { PropertyMapper } from '../../application/mappers/property.mapper';
import { Property, PropertyType, OperationType } from '@core/domain/entities/property.entity';

describe('GetPropertyUseCase', () => {
  let useCase: GetPropertyUseCase;
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

  const createMockProperty = (): Property => {
    return Property.create({
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
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPropertyUseCase,
        PropertyMapper,
        {
          provide: PROPERTY_REPOSITORY,
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetPropertyUseCase>(GetPropertyUseCase);
    propertyRepository = module.get(PROPERTY_REPOSITORY);
  });

  describe('execute (by ID)', () => {
    it('should return property when found by ID', async () => {
      const mockProperty = createMockProperty();
      mockPropertyRepository.findByIdWithRelations.mockResolvedValue(mockProperty);

      const result = await useCase.execute(mockProperty.id);

      expect(mockPropertyRepository.findByIdWithRelations).toHaveBeenCalledWith(mockProperty.id);
      expect(result).toBeDefined();
      expect(result.id).toBe(mockProperty.id);
      expect(result.code).toBe(mockProperty.code);
    });

    it('should throw NotFoundException when property not found by ID', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174999';
      mockPropertyRepository.findByIdWithRelations.mockResolvedValue(null);

      await expect(useCase.execute(nonExistentId)).rejects.toThrow(NotFoundException);
      await expect(useCase.execute(nonExistentId)).rejects.toThrow(
        `Property with ID ${nonExistentId} not found`,
      );
    });
  });

  describe('executeByCode', () => {
    it('should return property when found by code', async () => {
      const mockProperty = createMockProperty();
      mockPropertyRepository.findByCode.mockResolvedValue(mockProperty);

      const result = await useCase.executeByCode(mockProperty.code);

      expect(mockPropertyRepository.findByCode).toHaveBeenCalledWith(mockProperty.code);
      expect(result).toBeDefined();
      expect(result.code).toBe(mockProperty.code);
    });

    it('should throw NotFoundException when property not found by code', async () => {
      const nonExistentCode = 'PROP-NONEXISTENT';
      mockPropertyRepository.findByCode.mockResolvedValue(null);

      await expect(useCase.executeByCode(nonExistentCode)).rejects.toThrow(NotFoundException);
      await expect(useCase.executeByCode(nonExistentCode)).rejects.toThrow(
        `Property with code ${nonExistentCode} not found`,
      );
    });
  });

  describe('executeBySlug', () => {
    it('should return property when found by slug', async () => {
      const mockProperty = createMockProperty();
      mockPropertyRepository.findBySlug.mockResolvedValue(mockProperty);

      const slug = 'test-property-test-city';
      const result = await useCase.executeBySlug(slug);

      expect(mockPropertyRepository.findBySlug).toHaveBeenCalledWith(slug);
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException when property not found by slug', async () => {
      const nonExistentSlug = 'nonexistent-property-slug';
      mockPropertyRepository.findBySlug.mockResolvedValue(null);

      await expect(useCase.executeBySlug(nonExistentSlug)).rejects.toThrow(NotFoundException);
      await expect(useCase.executeBySlug(nonExistentSlug)).rejects.toThrow(
        `Property with slug ${nonExistentSlug} not found`,
      );
    });
  });
});
