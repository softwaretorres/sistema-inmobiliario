import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateClientUseCase } from '../../application/use-cases/create-client.use-case';
import { CLIENT_REPOSITORY } from '../../application/interfaces/client.repository.interface';
import { ClientMapper } from '../../application/mappers/client.mapper';
import { CreateClientDto, ClientStatus } from '../../application/dto/create-client.dto';

describe('CreateClientUseCase', () => {
  let useCase: CreateClientUseCase;
  let mockClientRepository: any;

  const mockClientData = {
    id: 'uuid-123',
    firstName: 'María',
    lastName: 'González',
    email: 'maria@example.com',
    phone: '+525512345678',
    status: 'NEW',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { interactions: 0, visits: 0 },
  };

  beforeEach(async () => {
    mockClientRepository = {
      create: jest.fn().mockResolvedValue(mockClientData),
      emailExists: jest.fn().mockResolvedValue(false),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateClientUseCase,
        ClientMapper,
        {
          provide: CLIENT_REPOSITORY,
          useValue: mockClientRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateClientUseCase>(CreateClientUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const createClientDto: CreateClientDto = {
      firstName: 'María',
      lastName: 'González',
      email: 'maria@example.com',
      phone: '+525512345678',
    };

    it('should create a client successfully', async () => {
      const result = await useCase.execute(createClientDto);

      expect(mockClientRepository.emailExists).toHaveBeenCalledWith('maria@example.com');
      expect(mockClientRepository.create).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.email).toBe('maria@example.com');
      expect(result.fullName).toBe('María González');
    });

    it('should throw ConflictException if email already exists', async () => {
      mockClientRepository.emailExists.mockResolvedValue(true);

      await expect(useCase.execute(createClientDto)).rejects.toThrow(ConflictException);
      expect(mockClientRepository.create).not.toHaveBeenCalled();
    });

    it('should set default status to NEW', async () => {
      await useCase.execute(createClientDto);

      expect(mockClientRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'NEW',
        }),
      );
    });

    it('should allow setting custom status', async () => {
      const dtoWithStatus = { ...createClientDto, status: ClientStatus.CONTACTED };

      await useCase.execute(dtoWithStatus);

      expect(mockClientRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'CONTACTED',
        }),
      );
    });

    it('should handle optional fields', async () => {
      const fullDto: CreateClientDto = {
        ...createClientDto,
        source: 'website',
        budget: 5000000,
        notes: 'Interested in luxury properties',
      };

      await useCase.execute(fullDto);

      expect(mockClientRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'website',
          budget: 5000000,
          notes: 'Interested in luxury properties',
        }),
      );
    });
  });
});
