import { Module } from '@nestjs/common';
import { TenantModule } from '@infrastructure/multi-tenancy/tenant.module';

import { USER_REPOSITORY } from './application/interfaces/user.repository.interface';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { UserMapper } from './application/mappers/user.mapper';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UsersController } from './presentation/controllers/users.controller';

const useCases = [
  CreateUserUseCase,
  GetUserUseCase,
  ListUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
];

@Module({
  imports: [TenantModule],
  controllers: [UsersController],
  providers: [
    UserMapper,
    ...useCases,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY, UserMapper, ...useCases],
})
export class UsersModule {}
