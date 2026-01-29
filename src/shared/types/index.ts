/**
 * Common types used across the application
 */

// Pagination
export interface IPaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IPaginatedResult<T> {
  data: T[];
  meta: IPaginationMeta;
}

// API Response
export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}

// User context
export interface IRequestUser {
  id: string;
  email: string;
  tenantId: string;
  role: {
    id: string;
    name: string;
    permissions: string[];
  };
}

// Tenant context
export interface ITenantContext {
  id: string;
  slug: string;
  name: string;
  databaseName: string;
  databaseHost?: string;
}

// Audit
export interface IAuditInfo {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

// Address
export interface IAddress {
  street: string;
  neighborhood?: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

// Money
export interface IMoney {
  amount: number;
  currency: string;
}

// Contact info
export interface IContactInfo {
  email: string;
  phone: string;
  alternatePhone?: string;
}

// Filter operators for queries
export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'startsWith'
  | 'endsWith';

export interface IFilterCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

// Sort direction
export type SortDirection = 'asc' | 'desc';

export interface ISortOption {
  field: string;
  direction: SortDirection;
}

// Date range
export interface IDateRange {
  start: Date;
  end: Date;
}

// Status change
export interface IStatusChange<T = string> {
  from: T;
  to: T;
  changedAt: Date;
  changedBy: string;
  reason?: string;
}

// File upload
export interface IUploadedFile {
  id: string;
  url: string;
  thumbnailUrl?: string;
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

// Notification
export interface INotification {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
}

// Event
export interface IDomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  payload: Record<string, any>;
  metadata: {
    userId?: string;
    tenantId?: string;
    correlationId?: string;
    timestamp: Date;
  };
}
