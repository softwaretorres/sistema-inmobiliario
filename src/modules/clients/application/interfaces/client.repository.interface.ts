export const CLIENT_REPOSITORY = Symbol('CLIENT_REPOSITORY');

export interface IClientFilters {
  status?: string;
  source?: string;
  assignedToId?: string;
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

export interface IClientData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string | null;
  source?: string | null;
  sourceDetail?: string | null;
  status: string;
  budget?: number | null;
  preferences?: Record<string, any> | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  notes?: string | null;
  nextFollowUp?: Date | null;
  assignedToId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    interactions: number;
    visits: number;
  };
}

export interface IClientRepository {
  create(data: Omit<IClientData, 'id' | 'createdAt' | 'updatedAt' | '_count'>): Promise<IClientData>;
  update(id: string, data: Partial<IClientData>): Promise<IClientData>;
  findById(id: string): Promise<IClientData | null>;
  findByEmail(email: string): Promise<IClientData | null>;
  findAll(filters: IClientFilters, pagination: IPaginationOptions): Promise<IPaginatedResult<IClientData>>;
  delete(id: string): Promise<void>;
  emailExists(email: string, excludeId?: string): Promise<boolean>;
  countByStatus(): Promise<Record<string, number>>;
  findByAssignedAgent(agentId: string): Promise<IClientData[]>;
}
