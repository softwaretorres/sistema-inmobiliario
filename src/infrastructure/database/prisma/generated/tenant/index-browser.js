
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  firstName: 'firstName',
  lastName: 'lastName',
  phone: 'phone',
  avatar: 'avatar',
  status: 'status',
  roleId: 'roleId',
  lastLoginAt: 'lastLoginAt',
  failedAttempts: 'failedAttempts',
  lockedUntil: 'lockedUntil',
  language: 'language',
  timezone: 'timezone',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  displayName: 'displayName',
  description: 'description',
  isSystem: 'isSystem',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PermissionScalarFieldEnum = {
  id: 'id',
  action: 'action',
  subject: 'subject',
  conditions: 'conditions',
  description: 'description',
  createdAt: 'createdAt'
};

exports.Prisma.RolePermissionScalarFieldEnum = {
  roleId: 'roleId',
  permissionId: 'permissionId'
};

exports.Prisma.PropertyScalarFieldEnum = {
  id: 'id',
  code: 'code',
  title: 'title',
  description: 'description',
  type: 'type',
  status: 'status',
  operationType: 'operationType',
  salePrice: 'salePrice',
  rentPrice: 'rentPrice',
  currency: 'currency',
  pricePerSqm: 'pricePerSqm',
  address: 'address',
  neighborhood: 'neighborhood',
  city: 'city',
  state: 'state',
  country: 'country',
  zipCode: 'zipCode',
  latitude: 'latitude',
  longitude: 'longitude',
  bedrooms: 'bedrooms',
  bathrooms: 'bathrooms',
  halfBathrooms: 'halfBathrooms',
  parkingSpaces: 'parkingSpaces',
  totalArea: 'totalArea',
  builtArea: 'builtArea',
  lotArea: 'lotArea',
  yearBuilt: 'yearBuilt',
  floors: 'floors',
  amenities: 'amenities',
  features: 'features',
  virtualTourUrl: 'virtualTourUrl',
  videoUrl: 'videoUrl',
  ownerId: 'ownerId',
  agentId: 'agentId',
  slug: 'slug',
  metaTitle: 'metaTitle',
  metaDescription: 'metaDescription',
  publishedAt: 'publishedAt',
  featuredUntil: 'featuredUntil',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PropertyImageScalarFieldEnum = {
  id: 'id',
  url: 'url',
  thumbnailUrl: 'thumbnailUrl',
  caption: 'caption',
  altText: 'altText',
  isPrimary: 'isPrimary',
  order: 'order',
  propertyId: 'propertyId',
  createdAt: 'createdAt'
};

exports.Prisma.PropertyDocumentScalarFieldEnum = {
  id: 'id',
  name: 'name',
  type: 'type',
  url: 'url',
  size: 'size',
  propertyId: 'propertyId',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.PropertyVisitScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  clientId: 'clientId',
  scheduledAt: 'scheduledAt',
  status: 'status',
  notes: 'notes',
  feedback: 'feedback',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OwnerScalarFieldEnum = {
  id: 'id',
  type: 'type',
  firstName: 'firstName',
  lastName: 'lastName',
  companyName: 'companyName',
  legalName: 'legalName',
  taxId: 'taxId',
  email: 'email',
  phone: 'phone',
  alternatePhone: 'alternatePhone',
  address: 'address',
  city: 'city',
  state: 'state',
  country: 'country',
  zipCode: 'zipCode',
  bankName: 'bankName',
  bankAccount: 'bankAccount',
  clabe: 'clabe',
  documents: 'documents',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClientScalarFieldEnum = {
  id: 'id',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phone: 'phone',
  alternatePhone: 'alternatePhone',
  source: 'source',
  sourceDetail: 'sourceDetail',
  status: 'status',
  budget: 'budget',
  preferences: 'preferences',
  address: 'address',
  city: 'city',
  state: 'state',
  notes: 'notes',
  nextFollowUp: 'nextFollowUp',
  assignedToId: 'assignedToId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClientInteractionScalarFieldEnum = {
  id: 'id',
  clientId: 'clientId',
  type: 'type',
  subject: 'subject',
  notes: 'notes',
  outcome: 'outcome',
  scheduledAt: 'scheduledAt',
  completedAt: 'completedAt',
  userId: 'userId',
  createdAt: 'createdAt'
};

exports.Prisma.TransactionScalarFieldEnum = {
  id: 'id',
  code: 'code',
  type: 'type',
  status: 'status',
  propertyId: 'propertyId',
  clientId: 'clientId',
  agentId: 'agentId',
  listPrice: 'listPrice',
  agreedPrice: 'agreedPrice',
  currency: 'currency',
  commissionPct: 'commissionPct',
  commissionAmount: 'commissionAmount',
  depositAmount: 'depositAmount',
  monthlyRent: 'monthlyRent',
  leaseStartDate: 'leaseStartDate',
  leaseEndDate: 'leaseEndDate',
  reservationDate: 'reservationDate',
  contractDate: 'contractDate',
  closingDate: 'closingDate',
  documents: 'documents',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  action: 'action',
  entity: 'entity',
  entityId: 'entityId',
  oldValues: 'oldValues',
  newValues: 'newValues',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.SettingScalarFieldEnum = {
  id: 'id',
  key: 'key',
  value: 'value',
  group: 'group',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserStatus = exports.$Enums.UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  PENDING: 'PENDING'
};

exports.PropertyType = exports.$Enums.PropertyType = {
  HOUSE: 'HOUSE',
  APARTMENT: 'APARTMENT',
  CONDO: 'CONDO',
  LAND: 'LAND',
  COMMERCIAL: 'COMMERCIAL',
  OFFICE: 'OFFICE',
  WAREHOUSE: 'WAREHOUSE',
  INDUSTRIAL: 'INDUSTRIAL',
  MIXED_USE: 'MIXED_USE',
  OTHER: 'OTHER'
};

exports.PropertyStatus = exports.$Enums.PropertyStatus = {
  DRAFT: 'DRAFT',
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  IN_NEGOTIATION: 'IN_NEGOTIATION',
  SOLD: 'SOLD',
  RENTED: 'RENTED',
  INACTIVE: 'INACTIVE',
  ARCHIVED: 'ARCHIVED'
};

exports.OperationType = exports.$Enums.OperationType = {
  SALE: 'SALE',
  RENT: 'RENT',
  BOTH: 'BOTH'
};

exports.VisitStatus = exports.$Enums.VisitStatus = {
  SCHEDULED: 'SCHEDULED',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW'
};

exports.OwnerType = exports.$Enums.OwnerType = {
  INDIVIDUAL: 'INDIVIDUAL',
  COMPANY: 'COMPANY'
};

exports.ClientStatus = exports.$Enums.ClientStatus = {
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  SHOWING: 'SHOWING',
  NEGOTIATING: 'NEGOTIATING',
  CLOSED_WON: 'CLOSED_WON',
  CLOSED_LOST: 'CLOSED_LOST',
  INACTIVE: 'INACTIVE'
};

exports.InteractionType = exports.$Enums.InteractionType = {
  CALL: 'CALL',
  EMAIL: 'EMAIL',
  WHATSAPP: 'WHATSAPP',
  VISIT: 'VISIT',
  MEETING: 'MEETING',
  NOTE: 'NOTE',
  FOLLOW_UP: 'FOLLOW_UP'
};

exports.TransactionType = exports.$Enums.TransactionType = {
  SALE: 'SALE',
  RENT: 'RENT'
};

exports.TransactionStatus = exports.$Enums.TransactionStatus = {
  PENDING: 'PENDING',
  RESERVED: 'RESERVED',
  IN_CONTRACT: 'IN_CONTRACT',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

exports.Prisma.ModelName = {
  User: 'User',
  RefreshToken: 'RefreshToken',
  Role: 'Role',
  Permission: 'Permission',
  RolePermission: 'RolePermission',
  Property: 'Property',
  PropertyImage: 'PropertyImage',
  PropertyDocument: 'PropertyDocument',
  PropertyVisit: 'PropertyVisit',
  Owner: 'Owner',
  Client: 'Client',
  ClientInteraction: 'ClientInteraction',
  Transaction: 'Transaction',
  ActivityLog: 'ActivityLog',
  Setting: 'Setting'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
