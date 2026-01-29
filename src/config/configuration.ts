export interface IAppConfig {
  nodeEnv: string;
  port: number;
  apiPrefix: string;
  apiVersion: string;
}

export interface IDatabaseConfig {
  centralUrl: string;
  host: string;
  port: number;
  user: string;
  password: string;
  namePrefix: string;
}

export interface IRedisConfig {
  host: string;
  port: number;
  password?: string;
  db: number;
}

export interface IAuthConfig {
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
  encryptionKey: string;
}

export interface IThrottleConfig {
  ttl: number;
  limit: number;
}

export interface IConfig {
  app: IAppConfig;
  database: IDatabaseConfig;
  redis: IRedisConfig;
  auth: IAuthConfig;
  throttle: IThrottleConfig;
  cors: {
    origins: string[];
  };
  logging: {
    level: string;
    format: string;
  };
}

export default (): IConfig => ({
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
    apiPrefix: process.env.API_PREFIX || 'api',
    apiVersion: process.env.API_VERSION || 'v1',
  },
  database: {
    centralUrl:
      process.env.CENTRAL_DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/inmobiliaria_central?schema=public',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    namePrefix: process.env.DATABASE_NAME_PREFIX || 'inmobiliaria_tenant_',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'change-me-in-production-refresh',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    encryptionKey: process.env.ENCRYPTION_KEY || 'your-32-character-encryption-key!',
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
    limit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
  },
  cors: {
    origins: (process.env.CORS_ORIGINS || 'http://localhost:3001').split(','),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
    format: process.env.LOG_FORMAT || 'json',
  },
});
