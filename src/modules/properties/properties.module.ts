import { Module } from '@nestjs/common';
import { TenantModule } from '@infrastructure/multi-tenancy/tenant.module';

// Interfaces
import { PROPERTY_REPOSITORY } from './application/interfaces/property.repository.interface';

// Use Cases
import { CreatePropertyUseCase } from './application/use-cases/create-property.use-case';
import { GetPropertyUseCase } from './application/use-cases/get-property.use-case';
import { ListPropertiesUseCase } from './application/use-cases/list-properties.use-case';
import { UpdatePropertyUseCase } from './application/use-cases/update-property.use-case';
import { DeletePropertyUseCase } from './application/use-cases/delete-property.use-case';
import {
  PublishPropertyUseCase,
  UnpublishPropertyUseCase,
} from './application/use-cases/publish-property.use-case';

// Mappers
import { PropertyMapper } from './application/mappers/property.mapper';

// Repositories
import { PropertyRepository } from './infrastructure/repositories/property.repository';

// Controllers
import { PropertiesController } from './presentation/controllers/properties.controller';

const useCases = [
  CreatePropertyUseCase,
  GetPropertyUseCase,
  ListPropertiesUseCase,
  UpdatePropertyUseCase,
  DeletePropertyUseCase,
  PublishPropertyUseCase,
  UnpublishPropertyUseCase,
];

const mappers = [PropertyMapper];

@Module({
  imports: [TenantModule],
  controllers: [PropertiesController],
  providers: [
    // Mappers
    ...mappers,

    // Use Cases
    ...useCases,

    // Repository injection
    {
      provide: PROPERTY_REPOSITORY,
      useClass: PropertyRepository,
    },
  ],
  exports: [
    PROPERTY_REPOSITORY,
    PropertyMapper,
    ...useCases,
  ],
})
export class PropertiesModule {}
