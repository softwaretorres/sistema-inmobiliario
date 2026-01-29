import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { USER_REPOSITORY } from '../../application/interfaces/user.repository.interface';
import { UserMapper } from '../../application/mappers/user.mapper';
import { CreateUserDto, UserStatus } from '../../application/dto/create-user.dto';

jest.mock('bcrypt');

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let mockUserRepository: any;

  const mockUserData = {
    id: 'uuid-123',
    email: 'user@example.com',
    password: 'hashedPassword',
    firstName: 'Test',
    lastName: 'User',
    status: 'ACTIVE',
    roleId: 'role-uuid',
    role: { id: 'role-uuid', name: 'AGENT', displayName: 'Agent' },
    language: 'es',
    timezone: 'America/Mexico_City',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    mockUserRepository = {
      create: jest.fn().mockResolvedValue(mockUserData),
      emailExists: jest.fn().mockResolvedValue(false),
    };

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        UserMapper,
        {
          provide: USER_REPOSITORY,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const createUserDto: CreateUserDto = {
      email: 'user@example.com',
      password: 'SecureP@ss123',
      firstName: 'Test',
      lastName: 'User',
      roleId: 'role-uuid',
    };

    it('should create a user successfully', async () => {
      const result = await useCase.execute(createUserDto);

      expect(mockUserRepository.emailExists).toHaveBeenCalledWith('user@example.com');
      expect(bcrypt.hash).toHaveBeenCalledWith('SecureP@ss123', 10);
      expect(mockUserRepository.create).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.email).toBe('user@example.com');
    });

    it('should throw ConflictException if email already exists', async () => {
      mockUserRepository.emailExists.mockResolvedValue(true);

      await expect(useCase.execute(createUserDto)).rejects.toThrow(ConflictException);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should hash the password before saving', async () => {
      await useCase.execute(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('SecureP@ss123', 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'hashedPassword',
        }),
      );
    });

    it('should lowercase email before saving', async () => {
      const dtoWithUppercaseEmail = { ...createUserDto, email: 'USER@EXAMPLE.COM' };

      await useCase.execute(dtoWithUppercaseEmail);

      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'user@example.com',
        }),
      );
    });

    it('should set default values for language and timezone', async () => {
      await useCase.execute(createUserDto);

      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          language: 'es',
          timezone: 'America/Mexico_City',
        }),
      );
    });

    it('should set default status to ACTIVE', async () => {
      await useCase.execute(createUserDto);

      expect(mockUserRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'ACTIVE',
        }),
      );
    });
  });
});
