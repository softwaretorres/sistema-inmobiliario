import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { CreateOwnerUseCase } from '../../application/use-cases/create-owner.use-case';
import { OWNER_REPOSITORY } from '../../application/interfaces/owner.repository.interface';
import { OwnerMapper } from '../../application/mappers/owner.mapper';
import { CreateOwnerDto, OwnerType } from '../../application/dto/create-owner.dto';

describe('CreateOwnerUseCase', () => {
  let useCase: CreateOwnerUseCase;
  let mockOwnerRepository: any;
  let ownerMapper: OwnerMapper;

  const mockOwnerData = {
    id: 'uuid-123',
    type: 'INDIVIDUAL',
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan@example.com',
    phone: '+525512345678',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: { properties: 0 },
  };

  beforeEach(async () => {
    mockOwnerRepository = {
      create: jest.fn().mockResolvedValue(mockOwnerData),
      emailExists: jest.fn().mockResolvedValue(false),
      taxIdExists: jest.fn().mockResolvedValue(false),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOwnerUseCase,
        OwnerMapper,
        {
          provide: OWNER_REPOSITORY,
          useValue: mockOwnerRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateOwnerUseCase>(CreateOwnerUseCase);
    ownerMapper = module.get<OwnerMapper>(OwnerMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const createOwnerDto: CreateOwnerDto = {
      type: OwnerType.INDIVIDUAL,
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      phone: '+525512345678',
    };

    it('should create an owner successfully', async () => {
      const result = await useCase.execute(createOwnerDto);

      expect(mockOwnerRepository.emailExists).toHaveBeenCalledWith('juan@example.com');
      expect(mockOwnerRepository.create).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.email).toBe('juan@example.com');
    });

    it('should throw ConflictException if email already exists', async () => {
      mockOwnerRepository.emailExists.mockResolvedValue(true);

      await expect(useCase.execute(createOwnerDto)).rejects.toThrow(ConflictException);
      expect(mockOwnerRepository.create).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if tax ID already exists', async () => {
      const dtoWithTaxId = { ...createOwnerDto, taxId: 'RFC123456' };
      mockOwnerRepository.taxIdExists.mockResolvedValue(true);

      await expect(useCase.execute(dtoWithTaxId)).rejects.toThrow(ConflictException);
      expect(mockOwnerRepository.create).not.toHaveBeenCalled();
    });

    it('should create a company owner', async () => {
      const companyDto: CreateOwnerDto = {
        type: OwnerType.COMPANY,
        companyName: 'Inmobiliaria ABC',
        email: 'contact@abc.com',
        phone: '+525512345678',
        taxId: 'IAB850101XXX',
      };

      const companyOwnerData = {
        ...mockOwnerData,
        type: 'COMPANY',
        companyName: 'Inmobiliaria ABC',
        firstName: null,
        lastName: null,
      };

      mockOwnerRepository.create.mockResolvedValue(companyOwnerData);

      const result = await useCase.execute(companyDto);

      expect(result.type).toBe(OwnerType.COMPANY);
    });
  });
});
