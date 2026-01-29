import { Module } from '@nestjs/common';
import { TenantModule } from '@infrastructure/multi-tenancy/tenant.module';

import { TRANSACTION_REPOSITORY } from './application/interfaces/transaction.repository.interface';
import { CreateTransactionUseCase } from './application/use-cases/create-transaction.use-case';
import { GetTransactionUseCase } from './application/use-cases/get-transaction.use-case';
import { ListTransactionsUseCase } from './application/use-cases/list-transactions.use-case';
import { UpdateTransactionUseCase } from './application/use-cases/update-transaction.use-case';
import { TransactionMapper } from './application/mappers/transaction.mapper';
import { TransactionRepository } from './infrastructure/repositories/transaction.repository';
import { TransactionsController } from './presentation/controllers/transactions.controller';

const useCases = [
  CreateTransactionUseCase,
  GetTransactionUseCase,
  ListTransactionsUseCase,
  UpdateTransactionUseCase,
];

@Module({
  imports: [TenantModule],
  controllers: [TransactionsController],
  providers: [
    TransactionMapper,
    ...useCases,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TransactionRepository,
    },
  ],
  exports: [TRANSACTION_REPOSITORY, TransactionMapper, ...useCases],
})
export class TransactionsModule {}
