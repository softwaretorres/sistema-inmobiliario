import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
import { AppModule } from './app.module';
import { IConfig } from '@config/configuration';
import { HttpExceptionFilter } from '@presentation/filters/http-exception.filter';
import { TransformInterceptor } from '@presentation/interceptors/transform.interceptor';
import { LoggingInterceptor } from '@presentation/interceptors/logging.interceptor';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService<IConfig>);
  const appConfig = configService.get('app');
  const corsConfig = configService.get('cors');

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: corsConfig?.origins || ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID'],
    credentials: true,
  });

  // API Versioning
  app.setGlobalPrefix(appConfig?.apiPrefix || 'api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: appConfig?.apiVersion || '1',
  });

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Interceptors
  app.useGlobalInterceptors(new TransformInterceptor(), new LoggingInterceptor());

  // Swagger Documentation
  if (appConfig?.nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Sistema Inmobiliario API')
      .setDescription(
        `
        API REST para el Sistema Inmobiliario Multi-tenant.

        ## Autenticación
        La API utiliza JWT Bearer tokens para autenticación.
        Incluye el header \`Authorization: Bearer <token>\` en cada request.

        ## Multi-tenancy
        Incluye el header \`X-Tenant-ID\` con el slug del tenant para acceder a los datos específicos de cada inmobiliaria.

        ## Rate Limiting
        La API tiene un límite de 100 requests por minuto por IP.
      `,
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .addApiKey(
        {
          type: 'apiKey',
          name: 'X-Tenant-ID',
          in: 'header',
          description: 'Tenant identifier (slug)',
        },
        'tenant-id',
      )
      .addTag('Auth', 'Authentication endpoints')
      .addTag('Properties', 'Property management endpoints')
      .addTag('Owners', 'Property owner management endpoints')
      .addTag('Clients', 'Client/Lead management endpoints')
      .addTag('Transactions', 'Transaction management endpoints')
      .addTag('Users', 'User management endpoints')
      .addTag('Health', 'Health check endpoints')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    });

    logger.log(`Swagger documentation available at /api/docs`);
  }

  // Start server
  const port = appConfig?.port || 3000;
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Environment: ${appConfig?.nodeEnv}`);
  logger.log(`API Prefix: /${appConfig?.apiPrefix}/v${appConfig?.apiVersion}`);
}

bootstrap();
