import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get('redis');

        if (redisConfig?.host) {
          return {
            store: await redisStore({
              socket: {
                host: redisConfig.host,
                port: redisConfig.port || 6379,
              },
              password: redisConfig.password,
              database: redisConfig.db || 0,
              ttl: 60 * 1000, // 1 minute default TTL
            }),
          };
        }

        // Fallback to in-memory cache for development
        return {
          ttl: 60 * 1000,
          max: 100,
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [NestCacheModule, CacheService],
})
export class CacheModule {}
