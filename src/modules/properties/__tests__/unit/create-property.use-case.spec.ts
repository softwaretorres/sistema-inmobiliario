import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreatePropertyUseCase } from '../../application/use-cases/create-property.use-case';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
} from '../../application/interfaces/property.repository.interface';
import { PropertyMapper } from '../../application/mappers/property.mapper';
import { CreatePropertyDto, AddressDto, CharacteristicsDto } from '../../application/dto';
import { Property, PropertyType, OperationType } from '@core/domain/entities/property.entity';

describe('CreatePropertyUseCase', () => {
  let useCase: CreatePropertyUseCase;
  let propertyRepository: jest.Mocked<IPropertyRepository>;
  let propertyMapper: PropertyMapper;

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

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePropertyUseCase,
        PropertyMapper,
        {
          provide: PROPERTY_REPOSITORY,
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreatePropertyUseCase>(CreatePropertyUseCase);
    propertyRepository = module.get(PROPERTY_REPOSITORY);
    propertyMapper = module.get<PropertyMapper>(PropertyMapper);
  });

  const createValidDto = (): CreatePropertyDto => {
    const address: AddressDto = {
      street: 'Av. Reforma 123',
      neighborhood: 'Polanco',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'MX',
      zipCode: '11550',
    };

    const characteristics: CharacteristicsDto = {
      bedrooms: 3,
      bathrooms: 2.5,
      parkingSpaces: 2,
      totalArea: 250,
      builtArea: 200,
    };

    return {
      code: 'PROP-2024-001',
      title: 'Hermoso departamento en Polanco',
      description: 'Amplio departamento con vista al parque...',
      type: PropertyType.APARTMENT,
      operationType: OperationType.SALE,
      address,
      salePrice: 5000000,
      currency: 'MXN',
      characteristics,
      amenities: { pool: true, gym: true },
      features: { airConditioning: true },
      ownerId: '123e4567-e89b-12d3-a456-426614174000',
      agentId: '123e4567-e89b-12d3-a456-426614174001',
    };
  };

  describe('execute', () => {
    it('should create a property successfully', async () => {
      const dto = createValidDto();

      mockPropertyRepository.codeExists.mockResolvedValue(false);
      mockPropertyRepository.create.mockImplementation(async (property: Property) => property);

      const result = await useCase.execute(dto);

      expect(mockPropertyRepository.codeExists).toHaveBeenCalledWith(dto.code);
      expect(mockPropertyRepository.create).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.code).toBe(dto.code);
      expect(result.title).toBe(dto.title);
      expect(result.type).toBe(dto.type);
      expect(result.operationType).toBe(dto.operationType);
    });

    it('should throw ConflictException if code already exists', async () => {
      const dto = createValidDto();

      mockPropertyRepository.codeExists.mockResolvedValue(true);

      await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
      await expect(useCase.execute(dto)).rejects.toThrow(
        `Property with code ${dto.code} already exists`,
      );
      expect(mockPropertyRepository.create).not.toHaveBeenCalled();
    });

    it('should create property with RENT operation type', async () => {
      const dto = createValidDto();
      dto.operationType = OperationType.RENT;
      dto.salePrice = undefined;
      dto.rentPrice = 25000;

      mockPropertyRepository.codeExists.mockResolvedValue(false);
      mockPropertyRepository.create.mockImplementation(async (property: Property) => property);

      const result = await useCase.execute(dto);

      expect(result.operationType).toBe(OperationType.RENT);
      expect(result.rentPrice).toBeDefined();
      expect(result.rentPrice?.amount).toBe(25000);
    });

    it('should create property with BOTH operation type', async () => {
      const dto = createValidDto();
      dto.operationType = OperationType.BOTH;
      dto.rentPrice = 25000;

      mockPropertyRepository.codeExists.mockResolvedValue(false);
      mockPropertyRepository.create.mockImplementation(async (property: Property) => property);

      const result = await useCase.execute(dto);

      expect(result.operationType).toBe(OperationType.BOTH);
      expect(result.salePrice).toBeDefined();
      expect(result.rentPrice).toBeDefined();
    });

    it('should create property with minimal data', async () => {
      const dto: CreatePropertyDto = {
        code: 'PROP-MIN-001',
        title: 'Propiedad mínima para testing',
        type: PropertyType.LAND,
        operationType: OperationType.SALE,
        address: {
          street: 'Calle 1',
          city: 'Monterrey',
          state: 'Nuevo León',
          country: 'MX',
        },
        salePrice: 1000000,
        currency: 'MXN',
        ownerId: '123e4567-e89b-12d3-a456-426614174000',
        agentId: '123e4567-e89b-12d3-a456-426614174001',
      };

      mockPropertyRepository.codeExists.mockResolvedValue(false);
      mockPropertyRepository.create.mockImplementation(async (property: Property) => property);

      const result = await useCase.execute(dto);

      expect(result.code).toBe(dto.code);
      expect(result.type).toBe(PropertyType.LAND);
    });
  });
});
