import { DomainException } from '../exceptions/domain.exception';

export class Phone {
  private static readonly PHONE_REGEX = /^\+?[1-9]\d{6,14}$/;

  private constructor(private readonly _value: string) {}

  get value(): string {
    return this._value;
  }

  static create(value: string): Phone {
    if (!value?.trim()) {
      throw DomainException.validationError('Phone number is required');
    }

    // Remove spaces, dashes, and parentheses
    const normalizedPhone = value.replace(/[\s\-\(\)]/g, '');

    if (!Phone.PHONE_REGEX.test(normalizedPhone)) {
      throw DomainException.validationError('Invalid phone number format');
    }

    return new Phone(normalizedPhone);
  }

  static createOptional(value?: string): Phone | undefined {
    if (!value?.trim()) {
      return undefined;
    }
    return Phone.create(value);
  }

  format(): string {
    // Simple formatting for Mexican numbers
    if (this._value.length === 10) {
      return `(${this._value.slice(0, 3)}) ${this._value.slice(3, 6)}-${this._value.slice(6)}`;
    }

    if (this._value.startsWith('+52') && this._value.length === 13) {
      const number = this._value.slice(3);
      return `+52 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
    }

    return this._value;
  }

  equals(other: Phone): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }

  toJSON(): string {
    return this._value;
  }
}
