import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export interface ILogContext {
  tenantId?: string;
  userId?: string;
  correlationId?: string;
  action?: string;
  entity?: string;
  entityId?: string;
  [key: string]: any;
}

@Injectable()
export class LoggingService implements LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  log(message: string, context?: string | ILogContext): void {
    if (typeof context === 'string') {
      this.logger.info(message, { context });
    } else {
      this.logger.info(message, context);
    }
  }

  error(message: string, trace?: string, context?: string | ILogContext): void {
    if (typeof context === 'string') {
      this.logger.error(message, { trace, context });
    } else {
      this.logger.error(message, { trace, ...context });
    }
  }

  warn(message: string, context?: string | ILogContext): void {
    if (typeof context === 'string') {
      this.logger.warn(message, { context });
    } else {
      this.logger.warn(message, context);
    }
  }

  debug(message: string, context?: string | ILogContext): void {
    if (typeof context === 'string') {
      this.logger.debug(message, { context });
    } else {
      this.logger.debug(message, context);
    }
  }

  verbose(message: string, context?: string | ILogContext): void {
    if (typeof context === 'string') {
      this.logger.verbose(message, { context });
    } else {
      this.logger.verbose(message, context);
    }
  }

  // Structured logging methods
  logAction(action: string, details: ILogContext): void {
    this.logger.info(`Action: ${action}`, {
      action,
      ...details,
    });
  }

  logAudit(action: string, entity: string, entityId: string, details: ILogContext): void {
    this.logger.info(`Audit: ${action} on ${entity}`, {
      action,
      entity,
      entityId,
      audit: true,
      ...details,
    });
  }

  logSecurity(event: string, details: ILogContext): void {
    this.logger.warn(`Security: ${event}`, {
      security: true,
      event,
      ...details,
    });
  }

  logPerformance(operation: string, durationMs: number, details?: ILogContext): void {
    this.logger.info(`Performance: ${operation}`, {
      performance: true,
      operation,
      durationMs,
      ...details,
    });
  }

  // Create child logger with preset context
  child(context: ILogContext): ChildLogger {
    return new ChildLogger(this.logger, context);
  }
}

class ChildLogger {
  constructor(
    private readonly logger: Logger,
    private readonly context: ILogContext,
  ) {}

  log(message: string, meta?: Record<string, any>): void {
    this.logger.info(message, { ...this.context, ...meta });
  }

  error(message: string, trace?: string, meta?: Record<string, any>): void {
    this.logger.error(message, { ...this.context, trace, ...meta });
  }

  warn(message: string, meta?: Record<string, any>): void {
    this.logger.warn(message, { ...this.context, ...meta });
  }

  debug(message: string, meta?: Record<string, any>): void {
    this.logger.debug(message, { ...this.context, ...meta });
  }
}
