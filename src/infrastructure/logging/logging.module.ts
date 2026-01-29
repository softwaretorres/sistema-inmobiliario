import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggingService } from './logging.service';

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, context, trace, ...meta }) => {
  let log = `${timestamp} [${level}]`;
  if (context) {
    log += ` [${context}]`;
  }
  log += `: ${message}`;

  if (Object.keys(meta).length > 0) {
    log += ` ${JSON.stringify(meta)}`;
  }

  if (trace) {
    log += `\n${trace}`;
  }

  return log;
});

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const nodeEnv = configService.get('app.nodeEnv', 'development');
        const logLevel = configService.get('logging.level', 'info');
        const logFormat = configService.get('logging.format', 'json');

        const transports: winston.transport[] = [];

        // Console transport
        if (nodeEnv === 'development') {
          transports.push(
            new winston.transports.Console({
              format: combine(
                colorize({ all: true }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                errors({ stack: true }),
                consoleFormat,
              ),
            }),
          );
        } else {
          // Production: JSON format for log aggregators
          transports.push(
            new winston.transports.Console({
              format: combine(
                timestamp(),
                errors({ stack: true }),
                json(),
              ),
            }),
          );
        }

        // File transport for errors (optional)
        if (nodeEnv === 'production') {
          transports.push(
            new winston.transports.File({
              filename: 'logs/error.log',
              level: 'error',
              format: combine(timestamp(), errors({ stack: true }), json()),
              maxsize: 5242880, // 5MB
              maxFiles: 5,
            }),
          );

          transports.push(
            new winston.transports.File({
              filename: 'logs/combined.log',
              format: combine(timestamp(), errors({ stack: true }), json()),
              maxsize: 5242880,
              maxFiles: 5,
            }),
          );
        }

        return {
          level: logLevel,
          transports,
          defaultMeta: {
            service: 'inmobiliaria-api',
            environment: nodeEnv,
          },
          exceptionHandlers: [
            new winston.transports.Console({
              format: combine(timestamp(), errors({ stack: true }), json()),
            }),
          ],
          rejectionHandlers: [
            new winston.transports.Console({
              format: combine(timestamp(), errors({ stack: true }), json()),
            }),
          ],
        };
      },
    }),
  ],
  providers: [LoggingService],
  exports: [WinstonModule, LoggingService],
})
export class LoggingModule {}
