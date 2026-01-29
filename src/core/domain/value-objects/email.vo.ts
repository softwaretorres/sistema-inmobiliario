import { DomainException } from '../exceptions/domain.exception';

export class Email {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  static create(value: string): Email {
    if (!value?.trim()) {
      throw DomainException.validationError('Email is required');
    }

    const normalizedEmail = value.trim().toLowerCase();

    if (!Email.EMAIL_REGEX.test(normalizedEmail)) {
      throw DomainException.validationError('Invalid email format');
    }

    return new Email(normalizedEmail);
  }

  getDomain(): string {
    return this._value.split('@')[1];
  }

  getLocalPart(): string {
    return this._value.split('@')[0];
  }

  equals(other: Email): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  toJSON(): string {
    return this._value;
  }
}
