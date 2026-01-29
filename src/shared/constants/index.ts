// API Constants
export const API_PREFIX = 'api';
export const API_VERSION = '1';

// Pagination defaults
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

// Cache TTL (milliseconds)
export const CACHE_TTL = {
  SHORT: 60 * 1000,        // 1 minute
  MEDIUM: 5 * 60 * 1000,   // 5 minutes
  LONG: 30 * 60 * 1000,    // 30 minutes
  HOUR: 60 * 60 * 1000,    // 1 hour
  DAY: 24 * 60 * 60 * 1000, // 1 day
};

// Date formats
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_DATETIME: 'DD/MM/YYYY HH:mm',
};

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
};

// Currency defaults
export const CURRENCIES = {
  MXN: 'MXN',
  USD: 'USD',
  EUR: 'EUR',
} as const;

export const DEFAULT_CURRENCY = CURRENCIES.MXN;

// Status colors (for frontend)
export const STATUS_COLORS = {
  // Property status
  DRAFT: 'gray',
  AVAILABLE: 'green',
  RESERVED: 'yellow',
  IN_NEGOTIATION: 'blue',
  SOLD: 'purple',
  RENTED: 'purple',
  INACTIVE: 'gray',
  ARCHIVED: 'gray',

  // Client status
  NEW: 'blue',
  CONTACTED: 'cyan',
  QUALIFIED: 'green',
  SHOWING: 'orange',
  NEGOTIATING: 'yellow',
  CLOSED_WON: 'green',
  CLOSED_LOST: 'red',

  // Transaction status
  PENDING: 'yellow',
  IN_CONTRACT: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',

  // User status
  ACTIVE: 'green',
  SUSPENDED: 'red',
};

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_MX: /^\+?52?\d{10}$/,
  RFC: /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/i,
  CLABE: /^\d{18}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
};
