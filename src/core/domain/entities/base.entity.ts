import { v4 as uuidv4 } from 'uuid';

export interface IDomainEvent {
  eventName: string;
  occurredAt: Date;
  aggregateId: string;
  payload: Record<string, unknown>;
}

export abstract class BaseEntity<T> {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;
  private _domainEvents: IDomainEvent[] = [];

  constructor(id?: string) {
    this._id = id || uuidv4();
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get domainEvents(): IDomainEvent[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(eventName: string, payload: Record<string, unknown>): void {
    this._domainEvents.push({
      eventName,
      occurredAt: new Date(),
      aggregateId: this._id,
      payload,
    });
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }

  protected markAsUpdated(): void {
    this._updatedAt = new Date();
  }

  equals(other: BaseEntity<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (this === other) {
      return true;
    }

    return this._id === other._id;
  }
}
