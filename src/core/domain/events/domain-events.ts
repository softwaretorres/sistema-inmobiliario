import { IDomainEvent } from '../entities/base.entity';

export type DomainEventHandler = (event: IDomainEvent) => Promise<void>;

class DomainEventDispatcher {
  private handlers: Map<string, DomainEventHandler[]> = new Map();

  register(eventName: string, handler: DomainEventHandler): void {
    const existingHandlers = this.handlers.get(eventName) || [];
    this.handlers.set(eventName, [...existingHandlers, handler]);
  }

  unregister(eventName: string, handler: DomainEventHandler): void {
    const existingHandlers = this.handlers.get(eventName) || [];
    this.handlers.set(
      eventName,
      existingHandlers.filter((h) => h !== handler),
    );
  }

  async dispatch(event: IDomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName) || [];

    for (const handler of handlers) {
      try {
        await handler(event);
      } catch (error) {
        console.error(`Error handling event ${event.eventName}:`, error);
        // Continue processing other handlers
      }
    }
  }

  async dispatchAll(events: IDomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.dispatch(event);
    }
  }
}

// Singleton instance
export const domainEventDispatcher = new DomainEventDispatcher();

// Domain event types
export const PropertyEvents = {
  CREATED: 'PropertyCreated',
  UPDATED: 'PropertyUpdated',
  PUBLISHED: 'PropertyPublished',
  UNPUBLISHED: 'PropertyUnpublished',
  RESERVED: 'PropertyReserved',
  SOLD: 'PropertySold',
  RENTED: 'PropertyRented',
  AGENT_CHANGED: 'PropertyAgentChanged',
} as const;

export const TransactionEvents = {
  CREATED: 'TransactionCreated',
  UPDATED: 'TransactionUpdated',
  COMPLETED: 'TransactionCompleted',
  CANCELLED: 'TransactionCancelled',
} as const;

export const ClientEvents = {
  CREATED: 'ClientCreated',
  UPDATED: 'ClientUpdated',
  STATUS_CHANGED: 'ClientStatusChanged',
} as const;
