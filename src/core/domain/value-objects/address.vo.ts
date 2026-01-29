import { DomainException } from '../exceptions/domain.exception';

export interface IAddressProps {
  street: string;
  neighborhood?: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

export class Address {
  private constructor(
    private readonly _street: string,
    private readonly _neighborhood: string | undefined,
    private readonly _city: string,
    private readonly _state: string,
    private readonly _country: string,
    private readonly _zipCode: string | undefined,
    private readonly _latitude: number | undefined,
    private readonly _longitude: number | undefined,
  ) {}

  get street(): string {
    return this._street;
  }

  get neighborhood(): string | undefined {
    return this._neighborhood;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get country(): string {
    return this._country;
  }

  get zipCode(): string | undefined {
    return this._zipCode;
  }

  get latitude(): number | undefined {
    return this._latitude;
  }

  get longitude(): number | undefined {
    return this._longitude;
  }

  get hasCoordinates(): boolean {
    return this._latitude !== undefined && this._longitude !== undefined;
  }

  static create(props: IAddressProps): Address {
    if (!props.street?.trim()) {
      throw DomainException.validationError('Street is required');
    }

    if (!props.city?.trim()) {
      throw DomainException.validationError('City is required');
    }

    if (!props.state?.trim()) {
      throw DomainException.validationError('State is required');
    }

    if (!props.country?.trim()) {
      throw DomainException.validationError('Country is required');
    }

    // Validate coordinates if provided
    if (props.latitude !== undefined) {
      if (props.latitude < -90 || props.latitude > 90) {
        throw DomainException.validationError('Invalid latitude');
      }
    }

    if (props.longitude !== undefined) {
      if (props.longitude < -180 || props.longitude > 180) {
        throw DomainException.validationError('Invalid longitude');
      }
    }

    return new Address(
      props.street.trim(),
      props.neighborhood?.trim(),
      props.city.trim(),
      props.state.trim(),
      props.country.trim(),
      props.zipCode?.trim(),
      props.latitude,
      props.longitude,
    );
  }

  withCoordinates(latitude: number, longitude: number): Address {
    return Address.create({
      street: this._street,
      neighborhood: this._neighborhood,
      city: this._city,
      state: this._state,
      country: this._country,
      zipCode: this._zipCode,
      latitude,
      longitude,
    });
  }

  getFullAddress(): string {
    const parts = [
      this._street,
      this._neighborhood,
      this._city,
      this._state,
      this._zipCode,
      this._country,
    ].filter(Boolean);

    return parts.join(', ');
  }

  equals(other: Address): boolean {
    return (
      this._street === other._street &&
      this._neighborhood === other._neighborhood &&
      this._city === other._city &&
      this._state === other._state &&
      this._country === other._country &&
      this._zipCode === other._zipCode
    );
  }

  toJSON(): IAddressProps {
    return {
      street: this._street,
      neighborhood: this._neighborhood,
      city: this._city,
      state: this._state,
      country: this._country,
      zipCode: this._zipCode,
      latitude: this._latitude,
      longitude: this._longitude,
    };
  }
}
