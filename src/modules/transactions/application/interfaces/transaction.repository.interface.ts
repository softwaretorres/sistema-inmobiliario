export const TRANSACTION_REPOSITORY = Symbol('TRANSACTION_REPOSITORY');

export interface ITransactionFilters {
  type?: string;
  status?: string;
  propertyId?: string;
  clientId?: string;
  agentId?: string;
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

export interface ITransactionData {
  id: string;
  code: string;
  type: string;
  status: string;
  propertyId: string;
  clientId: string;
  agentId: string;
  listPrice: number;
  agreedPrice: number;
  currency: string;
  commissionPct?: number | null;
  commissionAmount?: number | null;
  depositAmount?: number | null;
  monthlyRent?: number | null;
  leaseStartDate?: Date | null;
  leaseEndDate?: Date | null;
  reservationDate?: Date | null;
  contractDate?: Date | null;
  closingDate?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
  property?: {
    id: string;
    code: string;
    title: string;
    address: string;
  };
  client?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  agent?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface ITransactionRepository {
  create(data: Omit<ITransactionData, 'id' | 'createdAt' | 'updatedAt' | 'property' | 'client' | 'agent'>): Promise<ITransactionData>;
  update(id: string, data: Partial<ITransactionData>): Promise<ITransactionData>;
  findById(id: string): Promise<ITransactionData | null>;
  findByCode(code: string): Promise<ITransactionData | null>;
  findAll(filters: ITransactionFilters, pagination: IPaginationOptions): Promise<IPaginatedResult<ITransactionData>>;
  delete(id: string): Promise<void>;
  codeExists(code: string, excludeId?: string): Promise<boolean>;
  countByStatus(): Promise<Record<string, number>>;
}
