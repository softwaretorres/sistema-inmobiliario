import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  USER_REPOSITORY,
  IUserRepository,
} from '../interfaces/user.repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Hash password if provided
    let hashedPassword: string | undefined;
    if (dto.password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(dto.password, saltRounds);
    }

    const updated = await this.userRepository.update(id, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      phone: dto.phone,
      avatar: dto.avatar,
      roleId: dto.roleId,
      status: dto.status,
      language: dto.language,
      timezone: dto.timezone,
      ...(hashedPassword && { password: hashedPassword }),
    });

    return this.userMapper.toResponse(updated);
  }
}
