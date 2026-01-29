import { Injectable } from '@nestjs/common';
import { IUserData } from '../interfaces/user.repository.interface';
import { UserResponseDto, UserListItemDto } from '../dto/user-response.dto';
import { UserStatus } from '../dto/create-user.dto';

@Injectable()
export class UserMapper {
  toResponse(user: IUserData): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      phone: user.phone ?? undefined,
      avatar: user.avatar ?? undefined,
      status: user.status as UserStatus,
      role: user.role ? {
        id: user.role.id,
        name: user.role.name,
        displayName: user.role.displayName,
      } : {
        id: user.roleId,
        name: 'Unknown',
        displayName: 'Unknown',
      },
      language: user.language,
      timezone: user.timezone,
      lastLoginAt: user.lastLoginAt ?? undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  toListItem(user: IUserData): UserListItemDto {
    return {
      id: user.id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
      phone: user.phone ?? undefined,
      avatar: user.avatar ?? undefined,
      status: user.status as UserStatus,
      roleName: user.role?.displayName ?? 'Unknown',
      lastLoginAt: user.lastLoginAt ?? undefined,
      createdAt: user.createdAt,
    };
  }
}
