import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import configuration from '@config/configuration';

// Infrastructure Modules
import { DatabaseModule } from '@infrastructure/database/database.module';
import { TenantModule } from '@infrastructure/multi-tenancy/tenant.module';
import { AuthModule } from '@infrastructure/auth/auth.module';
import { CacheModule } from '@infrastructure/cache/cache.module';
import { LoggingModule } from '@infrastructure/logging/logging.module';

// Feature Modules
import { PropertiesModule } from '@modules/properties/properties.module';
import { OwnersModule } from '@modules/owners/owners.module';
import { ClientsModule } from '@modules/clients/clients.module';
import { TransactionsModule } from '@modules/transactions/transactions.module';
import { UsersModule } from '@modules/users/users.module';

// Presentation
import { HealthController } from '@presentation/controllers/health.controller';

// Middlewares
import { TenantMiddleware } from '@presentation/middlewares/tenant.middleware';
import { CorrelationIdMiddleware } from '@presentation/middlewares/correlation-id.middleware';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`],
    }),

    // Rate Limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('throttle.ttl', 60) * 1000,
          limit: config.get('throttle.limit', 100),
        },
      ],
    }),

    // Infrastructure
    DatabaseModule,
    TenantModule,
    AuthModule,
    CacheModule,
    LoggingModule,

    // Feature Modules
    PropertiesModule,
    OwnersModule,
    ClientsModule,
    TransactionsModule,
    UsersModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');

    // Apply tenant middleware to all routes except auth and health
    consumer
      .apply(TenantMiddleware)
      .exclude('api/v1/auth/(.*)', 'api/v1/health', 'api/docs(.*)')
      .forRoutes('*');
  }
}
