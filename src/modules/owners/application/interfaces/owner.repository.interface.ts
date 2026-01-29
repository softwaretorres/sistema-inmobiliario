export const OWNER_REPOSITORY = Symbol('OWNER_REPOSITORY');

export interface IOwnerFilters {
  type?: string;
  city?: string;
  state?: string;
  search?: string;
}

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

export interface IOwnerData {
  id: string;
  type: string;
  firstName?: string | null;
  lastName?: string | null;
  companyName?: string | null;
  legalName?: string | null;
  taxId?: string | null;
  email: string;
  phone: string;
  alternatePhone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zipCode?: string | null;
  bankName?: string | null;
  bankAccount?: string | null;
  clabe?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    properties: number;
  };
}

export interface IOwnerRepository {
  create(data: Omit<IOwnerData, 'id' | 'createdAt' | 'updatedAt' | '_count'>): Promise<IOwnerData>;
  update(id: string, data: Partial<IOwnerData>): Promise<IOwnerData>;
  findById(id: string): Promise<IOwnerData | null>;
  findByEmail(email: string): Promise<IOwnerData | null>;
  findAll(filters: IOwnerFilters, pagination: IPaginationOptions): Promise<IPaginatedResult<IOwnerData>>;
  delete(id: string): Promise<void>;
  emailExists(email: string, excludeId?: string): Promise<boolean>;
  taxIdExists(taxId: string, excludeId?: string): Promise<boolean>;
  countProperties(ownerId: string): Promise<number>;
}
