import { Property } from '@core/domain/entities/property.entity';

export interface IPropertyFilters {
  status?: string;
  type?: string;
  operationType?: string;
  city?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  ownerId?: string;
  agentId?: string;
  search?: string;
}

export interface IPaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface IPropertyRepository {
  /**
   * Create a new property
   */
  create(property: Property): Promise<Property>;

  /**
   * Update an existing property
   */
  update(property: Property): Promise<Property>;

  /**
   * Find property by ID
   */
  findById(id: string): Promise<Property | null>;

  /**
   * Find property by code
   */
  findByCode(code: string): Promise<Property | null>;

  /**
   * Find property by slug
   */
  findBySlug(slug: string): Promise<Property | null>;

  /**
   * Find all properties with filters and pagination
   */
  findAll(
    filters: IPropertyFilters,
    pagination: IPaginationOptions,
  ): Promise<IPaginatedResult<Property>>;

  /**
   * Find properties by owner
   */
  findByOwner(ownerId: string): Promise<Property[]>;

  /**
   * Find properties by agent
   */
  findByAgent(agentId: string): Promise<Property[]>;

  /**
   * Delete property by ID
   */
  delete(id: string): Promise<void>;

  /**
   * Check if code exists
   */
  codeExists(code: string, excludeId?: string): Promise<boolean>;

  /**
   * Check if slug exists
   */
  slugExists(slug: string, excludeId?: string): Promise<boolean>;

  /**
   * Count properties by status
   */
  countByStatus(): Promise<Record<string, number>>;

  /**
   * Get property with all relations
   */
  findByIdWithRelations(id: string): Promise<Property | null>;
}

export const PROPERTY_REPOSITORY = Symbol('PROPERTY_REPOSITORY');
