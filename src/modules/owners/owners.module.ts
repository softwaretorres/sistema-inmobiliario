import { Module } from '@nestjs/common';
import { TenantModule } from '@infrastructure/multi-tenancy/tenant.module';

// Interfaces
import { OWNER_REPOSITORY } from './application/interfaces/owner.repository.interface';

// Use Cases
import { CreateOwnerUseCase } from './application/use-cases/create-owner.use-case';
import { GetOwnerUseCase } from './application/use-cases/get-owner.use-case';
import { ListOwnersUseCase } from './application/use-cases/list-owners.use-case';
import { UpdateOwnerUseCase } from './application/use-cases/update-owner.use-case';
import { DeleteOwnerUseCase } from './application/use-cases/delete-owner.use-case';

// Mappers
import { OwnerMapper } from './application/mappers/owner.mapper';

// Repositories
import { OwnerRepository } from './infrastructure/repositories/owner.repository';

// Controllers
import { OwnersController } from './presentation/controllers/owners.controller';

const useCases = [
  CreateOwnerUseCase,
  GetOwnerUseCase,
  ListOwnersUseCase,
  UpdateOwnerUseCase,
  DeleteOwnerUseCase,
];

const mappers = [OwnerMapper];

@Module({
  imports: [TenantModule],
  controllers: [OwnersController],
  providers: [
    // Mappers
    ...mappers,

    // Use Cases
    ...useCases,

    // Repository injection
    {
      provide: OWNER_REPOSITORY,
      useClass: OwnerRepository,
    },
  ],
  exports: [OWNER_REPOSITORY, OwnerMapper, ...useCases],
})
export class OwnersModule {}
