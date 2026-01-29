import { Module } from '@nestjs/common';
import { TenantModule } from '@infrastructure/multi-tenancy/tenant.module';

// Interfaces
import { CLIENT_REPOSITORY } from './application/interfaces/client.repository.interface';

// Use Cases
import { CreateClientUseCase } from './application/use-cases/create-client.use-case';
import { GetClientUseCase } from './application/use-cases/get-client.use-case';
import { ListClientsUseCase } from './application/use-cases/list-clients.use-case';
import { UpdateClientUseCase } from './application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from './application/use-cases/delete-client.use-case';

// Mappers
import { ClientMapper } from './application/mappers/client.mapper';

// Repositories
import { ClientRepository } from './infrastructure/repositories/client.repository';

// Controllers
import { ClientsController } from './presentation/controllers/clients.controller';

const useCases = [
  CreateClientUseCase,
  GetClientUseCase,
  ListClientsUseCase,
  UpdateClientUseCase,
  DeleteClientUseCase,
];

const mappers = [ClientMapper];

@Module({
  imports: [TenantModule],
  controllers: [ClientsController],
  providers: [
    ...mappers,
    ...useCases,
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientRepository,
    },
  ],
  exports: [CLIENT_REPOSITORY, ClientMapper, ...useCases],
})
export class ClientsModule {}
