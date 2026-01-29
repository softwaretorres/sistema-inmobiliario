export class DomainException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = 'DomainException';
    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(entity: string, id?: string): DomainException {
    const message = id
      ? `${entity} with id "${id}" was not found`
      : `${entity} was not found`;
    return new DomainException('NOT_FOUND', message, { entity, id });
  }

  static validationError(message: string, details?: Record<string, unknown>): DomainException {
    return new DomainException('VALIDATION_ERROR', message, details);
  }

  static businessRuleViolation(message: string, details?: Record<string, unknown>): DomainException {
    return new DomainException('BUSINESS_RULE_VIOLATION', message, details);
  }

  static unauthorized(message = 'Unauthorized access'): DomainException {
    return new DomainException('UNAUTHORIZED', message);
  }

  static forbidden(message = 'Access forbidden'): DomainException {
    return new DomainException('FORBIDDEN', message);
  }

  static conflict(message: string, details?: Record<string, unknown>): DomainException {
    return new DomainException('CONFLICT', message, details);
  }
}
