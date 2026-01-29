import { Injectable, Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  IUserRepository,
} from '../interfaces/user.repository.interface';
import { UserMapper } from '../mappers/user.mapper';
import { UserQueryDto } from '../dto/user-query.dto';
import { PaginatedUserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(query: UserQueryDto): Promise<PaginatedUserResponseDto> {
    const filters = {
      status: query.status,
      roleId: query.roleId,
      search: query.search,
    };

    const pagination = {
      page: query.page ?? 1,
      limit: query.limit ?? 10,
      sortBy: query.sortBy ?? 'createdAt',
      sortOrder: query.sortOrder ?? 'desc',
    };

    const result = await this.userRepository.findAll(filters, pagination);

    return {
      data: result.data.map((user) => this.userMapper.toListItem(user)),
      meta: result.meta,
    };
  }
}
