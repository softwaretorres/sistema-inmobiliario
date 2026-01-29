import { BaseEntity } from './base.entity';
import { Money } from '../value-objects/money.vo';
import { Address, IAddressProps } from '../value-objects/address.vo';
import { DomainException } from '../exceptions/domain.exception';

export enum PropertyType {
  HOUSE = 'HOUSE',
  APARTMENT = 'APARTMENT',
  CONDO = 'CONDO',
  LAND = 'LAND',
  COMMERCIAL = 'COMMERCIAL',
  OFFICE = 'OFFICE',
  WAREHOUSE = 'WAREHOUSE',
  INDUSTRIAL = 'INDUSTRIAL',
  MIXED_USE = 'MIXED_USE',
  OTHER = 'OTHER',
}

export enum PropertyStatus {
  DRAFT = 'DRAFT',
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  IN_NEGOTIATION = 'IN_NEGOTIATION',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export enum OperationType {
  SALE = 'SALE',
  RENT = 'RENT',
  BOTH = 'BOTH',
}

export interface IPropertyCharacteristics {
  bedrooms?: number;
  bathrooms?: number;
  halfBathrooms?: number;
  parkingSpaces?: number;
  totalArea?: number;
  builtArea?: number;
  lotArea?: number;
  yearBuilt?: number;
  floors?: number;
}

export interface IPropertyImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  isPrimary: boolean;
  order: number;
}

export interface ICreatePropertyProps {
  id?: string;
  code: string;
  title: string;
  description?: string;
  type: PropertyType;
  operationType: OperationType;
  address: IAddressProps;
  salePrice?: number;
  rentPrice?: number;
  currency?: string;
  characteristics?: IPropertyCharacteristics;
  amenities?: Record<string, boolean>;
  features?: Record<string, boolean>;
  ownerId: string;
  agentId: string;
}

export class Property extends BaseEntity<Property> {
  private _code: string;
  private _title: string;
  private _description: string | undefined;
  private _type: PropertyType;
  private _status: PropertyStatus;
  private _operationType: OperationType;
  private _salePrice: Money | undefined;
  private _rentPrice: Money | undefined;
  private _address: Address;
  private _characteristics: IPropertyCharacteristics;
  private _amenities: Record<string, boolean>;
  private _features: Record<string, boolean>;
  private _images: IPropertyImage[];
  private _ownerId: string;
  private _agentId: string;
  private _publishedAt: Date | undefined;
  private _slug: string | undefined;

  private constructor(props: ICreatePropertyProps) {
    super(props.id);

    this._code = props.code;
    this._title = props.title;
    this._description = props.description;
    this._type = props.type;
    this._status = PropertyStatus.DRAFT;
    this._operationType = props.operationType;
    this._address = Address.create(props.address);
    this._characteristics = props.characteristics || {};
    this._amenities = props.amenities || {};
    this._features = props.features || {};
    this._images = [];
    this._ownerId = props.ownerId;
    this._agentId = props.agentId;

    if (props.salePrice !== undefined) {
      this._salePrice = Money.create(props.salePrice, props.currency);
    }

    if (props.rentPrice !== undefined) {
      this._rentPrice = Money.create(props.rentPrice, props.currency);
    }
  }

  // Getters
  get code(): string {
    return this._code;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get type(): PropertyType {
    return this._type;
  }

  get status(): PropertyStatus {
    return this._status;
  }

  get operationType(): OperationType {
    return this._operationType;
  }

  get salePrice(): Money | undefined {
    return this._salePrice;
  }

  get rentPrice(): Money | undefined {
    return this._rentPrice;
  }

  get address(): Address {
    return this._address;
  }

  get characteristics(): IPropertyCharacteristics {
    return { ...this._characteristics };
  }

  get amenities(): Record<string, boolean> {
    return { ...this._amenities };
  }

  get features(): Record<string, boolean> {
    return { ...this._features };
  }

  get images(): IPropertyImage[] {
    return [...this._images];
  }

  get primaryImage(): IPropertyImage | undefined {
    return this._images.find((img) => img.isPrimary) || this._images[0];
  }

  get ownerId(): string {
    return this._ownerId;
  }

  get agentId(): string {
    return this._agentId;
  }

  get publishedAt(): Date | undefined {
    return this._publishedAt;
  }

  get slug(): string | undefined {
    return this._slug;
  }

  get isPublished(): boolean {
    return this._publishedAt !== undefined && this._status === PropertyStatus.AVAILABLE;
  }

  // Factory method
  static create(props: ICreatePropertyProps): Property {
    Property.validateCreateProps(props);
    const property = new Property(props);

    property.addDomainEvent('PropertyCreated', {
      propertyId: property.id,
      code: property.code,
      title: property.title,
      type: property.type,
      operationType: property.operationType,
      ownerId: property.ownerId,
      agentId: property.agentId,
    });

    return property;
  }

  private static validateCreateProps(props: ICreatePropertyProps): void {
    if (!props.code?.trim()) {
      throw DomainException.validationError('Property code is required');
    }

    if (!props.title?.trim()) {
      throw DomainException.validationError('Property title is required');
    }

    if (!props.ownerId) {
      throw DomainException.validationError('Owner ID is required');
    }

    if (!props.agentId) {
      throw DomainException.validationError('Agent ID is required');
    }

    // Validate pricing based on operation type
    if (props.operationType === OperationType.SALE && !props.salePrice) {
      throw DomainException.validationError('Sale price is required for sale properties');
    }

    if (props.operationType === OperationType.RENT && !props.rentPrice) {
      throw DomainException.validationError('Rent price is required for rental properties');
    }

    if (props.operationType === OperationType.BOTH && !props.salePrice && !props.rentPrice) {
      throw DomainException.validationError(
        'At least one price is required for sale/rent properties',
      );
    }
  }

  // Business methods
  updateDetails(props: {
    title?: string;
    description?: string;
    type?: PropertyType;
    operationType?: OperationType;
    salePrice?: number;
    rentPrice?: number;
    currency?: string;
    characteristics?: IPropertyCharacteristics;
    amenities?: Record<string, boolean>;
    features?: Record<string, boolean>;
  }): void {
    if (props.title !== undefined) {
      if (!props.title.trim()) {
        throw DomainException.validationError('Title cannot be empty');
      }
      this._title = props.title;
    }

    if (props.description !== undefined) {
      this._description = props.description;
    }

    if (props.type !== undefined) {
      this._type = props.type;
    }

    if (props.operationType !== undefined) {
      this._operationType = props.operationType;
    }

    if (props.salePrice !== undefined) {
      this._salePrice = Money.create(props.salePrice, props.currency || this._salePrice?.currency);
    }

    if (props.rentPrice !== undefined) {
      this._rentPrice = Money.create(props.rentPrice, props.currency || this._rentPrice?.currency);
    }

    if (props.characteristics !== undefined) {
      this._characteristics = { ...this._characteristics, ...props.characteristics };
    }

    if (props.amenities !== undefined) {
      this._amenities = { ...this._amenities, ...props.amenities };
    }

    if (props.features !== undefined) {
      this._features = { ...this._features, ...props.features };
    }

    this.markAsUpdated();
    this.addDomainEvent('PropertyUpdated', { propertyId: this.id });
  }

  updateAddress(address: IAddressProps): void {
    this._address = Address.create(address);
    this.markAsUpdated();
  }

  addImage(image: Omit<IPropertyImage, 'order'>): void {
    const order = this._images.length;

    // If this is the first image, make it primary
    const isPrimary = this._images.length === 0 ? true : image.isPrimary;

    // If setting as primary, remove primary from others
    if (isPrimary) {
      this._images = this._images.map((img) => ({ ...img, isPrimary: false }));
    }

    this._images.push({ ...image, isPrimary, order });
    this.markAsUpdated();
  }

  removeImage(imageId: string): void {
    const index = this._images.findIndex((img) => img.id === imageId);
    if (index === -1) {
      throw DomainException.notFound('Image', imageId);
    }

    const wasImagePrimary = this._images[index].isPrimary;
    this._images.splice(index, 1);

    // Reorder remaining images
    this._images = this._images.map((img, i) => ({ ...img, order: i }));

    // If removed image was primary, make first image primary
    if (wasImagePrimary && this._images.length > 0) {
      this._images[0].isPrimary = true;
    }

    this.markAsUpdated();
  }

  setPrimaryImage(imageId: string): void {
    const image = this._images.find((img) => img.id === imageId);
    if (!image) {
      throw DomainException.notFound('Image', imageId);
    }

    this._images = this._images.map((img) => ({
      ...img,
      isPrimary: img.id === imageId,
    }));
    this.markAsUpdated();
  }

  publish(slug?: string): void {
    if (this._status === PropertyStatus.SOLD || this._status === PropertyStatus.RENTED) {
      throw DomainException.businessRuleViolation('Cannot publish a sold or rented property');
    }

    if (this._images.length === 0) {
      throw DomainException.businessRuleViolation('Property must have at least one image');
    }

    this._status = PropertyStatus.AVAILABLE;
    this._publishedAt = new Date();
    this._slug = slug || this.generateSlug();
    this.markAsUpdated();

    this.addDomainEvent('PropertyPublished', {
      propertyId: this.id,
      slug: this._slug,
      publishedAt: this._publishedAt,
    });
  }

  unpublish(): void {
    this._status = PropertyStatus.INACTIVE;
    this.markAsUpdated();

    this.addDomainEvent('PropertyUnpublished', { propertyId: this.id });
  }

  reserve(): void {
    if (this._status !== PropertyStatus.AVAILABLE) {
      throw DomainException.businessRuleViolation('Only available properties can be reserved');
    }

    this._status = PropertyStatus.RESERVED;
    this.markAsUpdated();

    this.addDomainEvent('PropertyReserved', { propertyId: this.id });
  }

  markAsSold(): void {
    if (
      this._status !== PropertyStatus.RESERVED &&
      this._status !== PropertyStatus.IN_NEGOTIATION
    ) {
      throw DomainException.businessRuleViolation(
        'Only reserved or negotiating properties can be marked as sold',
      );
    }

    if (
      this._operationType !== OperationType.SALE &&
      this._operationType !== OperationType.BOTH
    ) {
      throw DomainException.businessRuleViolation('This property is not for sale');
    }

    this._status = PropertyStatus.SOLD;
    this.markAsUpdated();

    this.addDomainEvent('PropertySold', { propertyId: this.id });
  }

  markAsRented(): void {
    if (
      this._status !== PropertyStatus.RESERVED &&
      this._status !== PropertyStatus.IN_NEGOTIATION
    ) {
      throw DomainException.businessRuleViolation(
        'Only reserved or negotiating properties can be marked as rented',
      );
    }

    if (
      this._operationType !== OperationType.RENT &&
      this._operationType !== OperationType.BOTH
    ) {
      throw DomainException.businessRuleViolation('This property is not for rent');
    }

    this._status = PropertyStatus.RENTED;
    this.markAsUpdated();

    this.addDomainEvent('PropertyRented', { propertyId: this.id });
  }

  assignAgent(agentId: string): void {
    if (!agentId) {
      throw DomainException.validationError('Agent ID is required');
    }

    const previousAgentId = this._agentId;
    this._agentId = agentId;
    this.markAsUpdated();

    this.addDomainEvent('PropertyAgentChanged', {
      propertyId: this.id,
      previousAgentId,
      newAgentId: agentId,
    });
  }

  private generateSlug(): string {
    const base = `${this._title}-${this._address.city}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    return `${base}-${this.id.slice(0, 8)}`;
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      code: this._code,
      title: this._title,
      description: this._description,
      type: this._type,
      status: this._status,
      operationType: this._operationType,
      salePrice: this._salePrice?.toJSON(),
      rentPrice: this._rentPrice?.toJSON(),
      address: this._address.toJSON(),
      characteristics: this._characteristics,
      amenities: this._amenities,
      features: this._features,
      images: this._images,
      ownerId: this._ownerId,
      agentId: this._agentId,
      publishedAt: this._publishedAt,
      slug: this._slug,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
