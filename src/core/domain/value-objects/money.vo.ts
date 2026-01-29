import { DomainException } from '../exceptions/domain.exception';

export class Money {
  private constructor(
    private readonly _amount: number,
    private readonly _currency: string,
  ) {}

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  static create(amount: number, currency = 'MXN'): Money {
    if (amount < 0) {
      throw DomainException.validationError('Amount cannot be negative');
    }

    const validCurrencies = ['MXN', 'USD', 'EUR', 'CAD'];
    if (!validCurrencies.includes(currency)) {
      throw DomainException.validationError(`Invalid currency: ${currency}`);
    }

    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (this._currency !== other._currency) {
      throw DomainException.businessRuleViolation('Cannot add different currencies');
    }
    return new Money(this._amount + other._amount, this._currency);
  }

  subtract(other: Money): Money {
    if (this._currency !== other._currency) {
      throw DomainException.businessRuleViolation('Cannot subtract different currencies');
    }
    return new Money(this._amount - other._amount, this._currency);
  }

  multiply(factor: number): Money {
    return new Money(this._amount * factor, this._currency);
  }

  percentage(percent: number): Money {
    return new Money((this._amount * percent) / 100, this._currency);
  }

  equals(other: Money): boolean {
    return this._amount === other._amount && this._currency === other._currency;
  }

  isGreaterThan(other: Money): boolean {
    if (this._currency !== other._currency) {
      throw DomainException.businessRuleViolation('Cannot compare different currencies');
    }
    return this._amount > other._amount;
  }

  isLessThan(other: Money): boolean {
    if (this._currency !== other._currency) {
      throw DomainException.businessRuleViolation('Cannot compare different currencies');
    }
    return this._amount < other._amount;
  }

  format(): string {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this._currency,
    });
    return formatter.format(this._amount);
  }

  toJSON(): { amount: number; currency: string } {
    return {
      amount: this._amount,
      currency: this._currency,
    };
  }
}
