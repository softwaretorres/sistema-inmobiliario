import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '@core/domain/exceptions/domain.exception';
import { IErrorResponse } from './http-exception.filter';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: DomainException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const correlationId = request.headers['x-correlation-id'] as string;

    // Map domain exception codes to HTTP status codes
    const statusCodeMap: Record<string, HttpStatus> = {
      NOT_FOUND: HttpStatus.NOT_FOUND,
      VALIDATION_ERROR: HttpStatus.BAD_REQUEST,
      BUSINESS_RULE_VIOLATION: HttpStatus.UNPROCESSABLE_ENTITY,
      UNAUTHORIZED: HttpStatus.UNAUTHORIZED,
      FORBIDDEN: HttpStatus.FORBIDDEN,
      CONFLICT: HttpStatus.CONFLICT,
    };

    const status = statusCodeMap[exception.code] || HttpStatus.BAD_REQUEST;

    const errorResponse: IErrorResponse = {
      statusCode: status,
      message: exception.message,
      error: exception.code,
      timestamp: new Date().toISOString(),
      path: request.url,
      correlationId,
    };

    this.logger.warn(`Domain exception: ${exception.code} - ${exception.message}`, correlationId);

    response.status(status).json(errorResponse);
  }
}
