export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserFilters {
  status?: string;
  roleId?: string;
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

export interface IUserRole {
  id: string;
  name: string;
  displayName: string;
}

export interface IUserData {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatar?: string | null;
  status: string;
  roleId: string;
  role?: IUserRole;
  language: string;
  timezone: string;
  lastLoginAt?: Date | null;
  failedAttempts: number;
  lockedUntil?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRepository {
  create(data: Omit<IUserData, 'id' | 'createdAt' | 'updatedAt' | 'role' | 'failedAttempts' | 'lockedUntil' | 'lastLoginAt'>): Promise<IUserData>;
  update(id: string, data: Partial<IUserData>): Promise<IUserData>;
  findById(id: string): Promise<IUserData | null>;
  findByEmail(email: string): Promise<IUserData | null>;
  findAll(filters: IUserFilters, pagination: IPaginationOptions): Promise<IPaginatedResult<IUserData>>;
  delete(id: string): Promise<void>;
  emailExists(email: string, excludeId?: string): Promise<boolean>;
  updatePassword(id: string, hashedPassword: string): Promise<void>;
  updateLastLogin(id: string): Promise<void>;
  incrementFailedAttempts(id: string): Promise<number>;
  resetFailedAttempts(id: string): Promise<void>;
  lockUser(id: string, until: Date): Promise<void>;
}
