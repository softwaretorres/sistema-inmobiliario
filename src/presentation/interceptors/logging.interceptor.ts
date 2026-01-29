import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const { method, url, body } = request;
    const correlationId = request.headers['x-correlation-id'] as string;
    const userAgent = request.headers['user-agent'] || '';
    const ip = request.ip;

    const startTime = Date.now();

    // Log incoming request
    this.logger.log(
      JSON.stringify({
        type: 'request',
        correlationId,
        method,
        url,
        ip,
        userAgent,
        body: this.sanitizeBody(body),
      }),
    );

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(
            JSON.stringify({
              type: 'response',
              correlationId,
              method,
              url,
              statusCode: response.statusCode,
              duration: `${duration}ms`,
            }),
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            JSON.stringify({
              type: 'error',
              correlationId,
              method,
              url,
              statusCode: error.status || 500,
              duration: `${duration}ms`,
              error: error.message,
            }),
          );
        },
      }),
    );
  }

  private sanitizeBody(body: unknown): unknown {
    if (!body || typeof body !== 'object') {
      return body;
    }

    const sanitized = { ...body } as Record<string, unknown>;

    // Remove sensitive fields
    const sensitiveFields = ['password', 'token', 'secret', 'apiKey', 'creditCard'];
    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '[REDACTED]';
      }
    }

    return sanitized;
  }
}
