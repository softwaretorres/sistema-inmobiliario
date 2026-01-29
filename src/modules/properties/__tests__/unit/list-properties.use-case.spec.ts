import { Test, TestingModule } from '@nestjs/testing';
import { ListPropertiesUseCase } from '../../application/use-cases/list-properties.use-case';
import {
  IPropertyRepository,
  PROPERTY_REPOSITORY,
  IPaginatedResult,
} from '../../application/interfaces/property.repository.interface';
import { PropertyMapper } from '../../application/mappers/property.mapper';
import { PropertyQueryDto } from '../../application/dto';
import {
  Property,
  PropertyType,
  PropertyStatus,
  OperationType,
} from '@core/domain/entities/property.entity';

describe('ListPropertiesUseCase', () => {
  let useCase: ListPropertiesUseCase;
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

  const createMockProperties = (count: number): Property[] => {
    return Array.from({ length: count }, (_, i) =>
      Property.create({
        id: `123e4567-e89b-12d3-a456-42661417400${i}`,
        code: `PROP-2024-00${i + 1}`,
        title: `Test Property ${i + 1}`,
        type: PropertyType.APARTMENT,
        operationType: OperationType.SALE,
        address: {
          street: `Test Street ${i + 1}`,
          city: 'Ciudad de México',
          state: 'CDMX',
          country: 'MX',
        },
        salePrice: 5000000 + i * 100000,
        currency: 'MXN',
        ownerId: '123e4567-e89b-12d3-a456-426614174001',
        agentId: '123e4567-e89b-12d3-a456-426614174002',
      }),
    );
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListPropertiesUseCase,
        PropertyMapper,
        {
          provide: PROPERTY_REPOSITORY,
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListPropertiesUseCase>(ListPropertiesUseCase);
    propertyRepository = module.get(PROPERTY_REPOSITORY);
  });

  describe('execute', () => {
    it('should return paginated properties with default pagination', async () => {
      const mockProperties = createMockProperties(5);
      const mockResult: IPaginatedResult<Property> = {
        data: mockProperties,
        meta: {
          total: 5,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockPropertyRepository.findAll.mockResolvedValue(mockResult);

      const query: PropertyQueryDto = {};
      const result = await useCase.execute(query);

      expect(mockPropertyRepository.findAll).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          page: 1,
          limit: 10,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        }),
      );
      expect(result.data).toHaveLength(5);
      expect(result.meta.total).toBe(5);
    });

    it('should filter properties by status', async () => {
      const mockProperties = createMockProperties(3);
      const mockResult: IPaginatedResult<Property> = {
        data: mockProperties,
        meta: {
          total: 3,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockPropertyRepository.findAll.mockResolvedValue(mockResult);

      const query: PropertyQueryDto = {
        status: PropertyStatus.AVAILABLE,
      };
      const result = await useCase.execute(query);

      expect(mockPropertyRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ status: PropertyStatus.AVAILABLE }),
        expect.any(Object),
      );
      expect(result.data).toHaveLength(3);
    });

    it('should filter properties by city', async () => {
      const mockProperties = createMockProperties(2);
      const mockResult: IPaginatedResult<Property> = {
        data: mockProperties,
        meta: {
          total: 2,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockPropertyRepository.findAll.mockResolvedValue(mockResult);

      const query: PropertyQueryDto = {
        city: 'Ciudad de México',
      };
      const result = await useCase.execute(query);

      expect(mockPropertyRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({ city: 'Ciudad de México' }),
        expect.any(Object),
      );
      expect(result.data).toHaveLength(2);
    });

    it('should filter properties by price range', async () => {
      const mockProperties = createMockProperties(4);
      const mockResult: IPaginatedResult<Property> = {
        data: mockProperties,
        meta: {
          total: 4,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockPropertyRepository.findAll.mockResolvedValue(mockResult);

      const query: PropertyQueryDto = {
        minPrice: 1000000,
        maxPrice: 10000000,
      };
      const result = await useCase.execute(query);

      expect(mockPropertyRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          minPrice: 1000000,
          maxPrice: 10000000,
        }),
        expect.any(Object),
      );
      expect(result.data).toHaveLength(4);
    });

    it('should apply custom pagination', async () => {
      const mockProperties = createMockProperties(5);
      const mockResult: IPaginatedResult<Property> = {
        data: mockProperties,
        meta: {
          total: 25,
          page: 2,
          limit: 5,
          totalPages: 5,
          hasNextPage: true,
          hasPreviousPage: true,
        },
      };

      mockPropertyRepository.findAll.mockResolvedValue(mockResult);

      const query: PropertyQueryDto = {
        page: 2,
        limit: 5,
      };
      const result = await useCase.execute(query);

      expect(mockPropertyRepository.findAll).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          page: 2,
          limit: 5,
        }),
      );
      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(5);
      expect(result.meta.hasNextPage).toBe(true);
      expect(result.meta.hasPreviousPage).toBe(true);
    });

    it('should apply custom sorting', async () => {
      const mockProperties = createMockProperties(3);
      const mockResult: IPaginatedResult<Property> = {
        data: mockProperties,
        meta: {
          total: 3,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockPropertyRepository.findAll.mockResolvedValue(mockResult);

      const query: PropertyQueryDto = {
        sortBy: 'salePrice',
        sortOrder: 'asc',
      };
      const result = await useCase.execute(query);

      expect(mockPropertyRepository.findAll).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          sortBy: 'salePrice',
          sortOrder: 'asc',
        }),
      );
    });

    it('should return empty result when no properties match', async () => {
      const mockResult: IPaginatedResult<Property> = {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockPropertyRepository.findAll.mockResolvedValue(mockResult);

      const query: PropertyQueryDto = {
        search: 'nonexistent property',
      };
      const result = await useCase.execute(query);

      expect(result.data).toHaveLength(0);
      expect(result.meta.total).toBe(0);
    });
  });
});
