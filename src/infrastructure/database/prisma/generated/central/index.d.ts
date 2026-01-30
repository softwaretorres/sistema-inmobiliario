
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model SuperAdmin
 * 
 */
export type SuperAdmin = $Result.DefaultSelection<Prisma.$SuperAdminPayload>
/**
 * Model TenantSuperAdmin
 * 
 */
export type TenantSuperAdmin = $Result.DefaultSelection<Prisma.$TenantSuperAdminPayload>
/**
 * Model SystemAuditLog
 * 
 */
export type SystemAuditLog = $Result.DefaultSelection<Prisma.$SystemAuditLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TenantStatus: {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING'
};

export type TenantStatus = (typeof TenantStatus)[keyof typeof TenantStatus]


export const PlanType: {
  BASIC: 'BASIC',
  PROFESSIONAL: 'PROFESSIONAL',
  ENTERPRISE: 'ENTERPRISE',
  CUSTOM: 'CUSTOM'
};

export type PlanType = (typeof PlanType)[keyof typeof PlanType]


export const SuperAdminStatus: {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
};

export type SuperAdminStatus = (typeof SuperAdminStatus)[keyof typeof SuperAdminStatus]

}

export type TenantStatus = $Enums.TenantStatus

export const TenantStatus: typeof $Enums.TenantStatus

export type PlanType = $Enums.PlanType

export const PlanType: typeof $Enums.PlanType

export type SuperAdminStatus = $Enums.SuperAdminStatus

export const SuperAdminStatus: typeof $Enums.SuperAdminStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tenants
 * const tenants = await prisma.tenant.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tenants
   * const tenants = await prisma.tenant.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs>;

  /**
   * `prisma.superAdmin`: Exposes CRUD operations for the **SuperAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SuperAdmins
    * const superAdmins = await prisma.superAdmin.findMany()
    * ```
    */
  get superAdmin(): Prisma.SuperAdminDelegate<ExtArgs>;

  /**
   * `prisma.tenantSuperAdmin`: Exposes CRUD operations for the **TenantSuperAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantSuperAdmins
    * const tenantSuperAdmins = await prisma.tenantSuperAdmin.findMany()
    * ```
    */
  get tenantSuperAdmin(): Prisma.TenantSuperAdminDelegate<ExtArgs>;

  /**
   * `prisma.systemAuditLog`: Exposes CRUD operations for the **SystemAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemAuditLogs
    * const systemAuditLogs = await prisma.systemAuditLog.findMany()
    * ```
    */
  get systemAuditLog(): Prisma.SystemAuditLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Tenant: 'Tenant',
    SuperAdmin: 'SuperAdmin',
    TenantSuperAdmin: 'TenantSuperAdmin',
    SystemAuditLog: 'SystemAuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "tenant" | "superAdmin" | "tenantSuperAdmin" | "systemAuditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      SuperAdmin: {
        payload: Prisma.$SuperAdminPayload<ExtArgs>
        fields: Prisma.SuperAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuperAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuperAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>
          }
          findFirst: {
            args: Prisma.SuperAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuperAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>
          }
          findMany: {
            args: Prisma.SuperAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>[]
          }
          create: {
            args: Prisma.SuperAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>
          }
          createMany: {
            args: Prisma.SuperAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuperAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>[]
          }
          delete: {
            args: Prisma.SuperAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>
          }
          update: {
            args: Prisma.SuperAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>
          }
          deleteMany: {
            args: Prisma.SuperAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuperAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SuperAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuperAdminPayload>
          }
          aggregate: {
            args: Prisma.SuperAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuperAdmin>
          }
          groupBy: {
            args: Prisma.SuperAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuperAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuperAdminCountArgs<ExtArgs>
            result: $Utils.Optional<SuperAdminCountAggregateOutputType> | number
          }
        }
      }
      TenantSuperAdmin: {
        payload: Prisma.$TenantSuperAdminPayload<ExtArgs>
        fields: Prisma.TenantSuperAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantSuperAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantSuperAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>
          }
          findFirst: {
            args: Prisma.TenantSuperAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantSuperAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>
          }
          findMany: {
            args: Prisma.TenantSuperAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>[]
          }
          create: {
            args: Prisma.TenantSuperAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>
          }
          createMany: {
            args: Prisma.TenantSuperAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantSuperAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>[]
          }
          delete: {
            args: Prisma.TenantSuperAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>
          }
          update: {
            args: Prisma.TenantSuperAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>
          }
          deleteMany: {
            args: Prisma.TenantSuperAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantSuperAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TenantSuperAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantSuperAdminPayload>
          }
          aggregate: {
            args: Prisma.TenantSuperAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantSuperAdmin>
          }
          groupBy: {
            args: Prisma.TenantSuperAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantSuperAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantSuperAdminCountArgs<ExtArgs>
            result: $Utils.Optional<TenantSuperAdminCountAggregateOutputType> | number
          }
        }
      }
      SystemAuditLog: {
        payload: Prisma.$SystemAuditLogPayload<ExtArgs>
        fields: Prisma.SystemAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>
          }
          findFirst: {
            args: Prisma.SystemAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>
          }
          findMany: {
            args: Prisma.SystemAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>[]
          }
          create: {
            args: Prisma.SystemAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>
          }
          createMany: {
            args: Prisma.SystemAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>[]
          }
          delete: {
            args: Prisma.SystemAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>
          }
          update: {
            args: Prisma.SystemAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.SystemAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemAuditLogPayload>
          }
          aggregate: {
            args: Prisma.SystemAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemAuditLog>
          }
          groupBy: {
            args: Prisma.SystemAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<SystemAuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    superAdmins: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    superAdmins?: boolean | TenantCountOutputTypeCountSuperAdminsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountSuperAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantSuperAdminWhereInput
  }


  /**
   * Count Type SuperAdminCountOutputType
   */

  export type SuperAdminCountOutputType = {
    tenants: number
  }

  export type SuperAdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenants?: boolean | SuperAdminCountOutputTypeCountTenantsArgs
  }

  // Custom InputTypes
  /**
   * SuperAdminCountOutputType without action
   */
  export type SuperAdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdminCountOutputType
     */
    select?: SuperAdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SuperAdminCountOutputType without action
   */
  export type SuperAdminCountOutputTypeCountTenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantSuperAdminWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantAvgAggregateOutputType = {
    maxUsers: number | null
    maxProperties: number | null
  }

  export type TenantSumAggregateOutputType = {
    maxUsers: number | null
    maxProperties: number | null
  }

  export type TenantMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    databaseName: string | null
    databaseHost: string | null
    status: $Enums.TenantStatus | null
    plan: $Enums.PlanType | null
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    logo: string | null
    primaryColor: string | null
    maxUsers: number | null
    maxProperties: number | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    databaseName: string | null
    databaseHost: string | null
    status: $Enums.TenantStatus | null
    plan: $Enums.PlanType | null
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    logo: string | null
    primaryColor: string | null
    maxUsers: number | null
    maxProperties: number | null
    trialEndsAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    databaseName: number
    databaseHost: number
    status: number
    plan: number
    email: number
    phone: number
    address: number
    city: number
    state: number
    country: number
    logo: number
    primaryColor: number
    settings: number
    maxUsers: number
    maxProperties: number
    trialEndsAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TenantAvgAggregateInputType = {
    maxUsers?: true
    maxProperties?: true
  }

  export type TenantSumAggregateInputType = {
    maxUsers?: true
    maxProperties?: true
  }

  export type TenantMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    databaseName?: true
    databaseHost?: true
    status?: true
    plan?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    state?: true
    country?: true
    logo?: true
    primaryColor?: true
    maxUsers?: true
    maxProperties?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    databaseName?: true
    databaseHost?: true
    status?: true
    plan?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    state?: true
    country?: true
    logo?: true
    primaryColor?: true
    maxUsers?: true
    maxProperties?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    databaseName?: true
    databaseHost?: true
    status?: true
    plan?: true
    email?: true
    phone?: true
    address?: true
    city?: true
    state?: true
    country?: true
    logo?: true
    primaryColor?: true
    settings?: true
    maxUsers?: true
    maxProperties?: true
    trialEndsAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _avg?: TenantAvgAggregateInputType
    _sum?: TenantSumAggregateInputType
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: string
    name: string
    slug: string
    databaseName: string
    databaseHost: string
    status: $Enums.TenantStatus
    plan: $Enums.PlanType
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    logo: string | null
    primaryColor: string | null
    settings: JsonValue | null
    maxUsers: number
    maxProperties: number
    trialEndsAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    databaseName?: boolean
    databaseHost?: boolean
    status?: boolean
    plan?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    logo?: boolean
    primaryColor?: boolean
    settings?: boolean
    maxUsers?: boolean
    maxProperties?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    superAdmins?: boolean | Tenant$superAdminsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    databaseName?: boolean
    databaseHost?: boolean
    status?: boolean
    plan?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    logo?: boolean
    primaryColor?: boolean
    settings?: boolean
    maxUsers?: boolean
    maxProperties?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    databaseName?: boolean
    databaseHost?: boolean
    status?: boolean
    plan?: boolean
    email?: boolean
    phone?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    logo?: boolean
    primaryColor?: boolean
    settings?: boolean
    maxUsers?: boolean
    maxProperties?: boolean
    trialEndsAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    superAdmins?: boolean | Tenant$superAdminsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      superAdmins: Prisma.$TenantSuperAdminPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      databaseName: string
      databaseHost: string
      status: $Enums.TenantStatus
      plan: $Enums.PlanType
      email: string | null
      phone: string | null
      address: string | null
      city: string | null
      state: string | null
      country: string | null
      logo: string | null
      primaryColor: string | null
      settings: Prisma.JsonValue | null
      maxUsers: number
      maxProperties: number
      trialEndsAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    superAdmins<T extends Tenant$superAdminsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$superAdminsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */ 
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly slug: FieldRef<"Tenant", 'String'>
    readonly databaseName: FieldRef<"Tenant", 'String'>
    readonly databaseHost: FieldRef<"Tenant", 'String'>
    readonly status: FieldRef<"Tenant", 'TenantStatus'>
    readonly plan: FieldRef<"Tenant", 'PlanType'>
    readonly email: FieldRef<"Tenant", 'String'>
    readonly phone: FieldRef<"Tenant", 'String'>
    readonly address: FieldRef<"Tenant", 'String'>
    readonly city: FieldRef<"Tenant", 'String'>
    readonly state: FieldRef<"Tenant", 'String'>
    readonly country: FieldRef<"Tenant", 'String'>
    readonly logo: FieldRef<"Tenant", 'String'>
    readonly primaryColor: FieldRef<"Tenant", 'String'>
    readonly settings: FieldRef<"Tenant", 'Json'>
    readonly maxUsers: FieldRef<"Tenant", 'Int'>
    readonly maxProperties: FieldRef<"Tenant", 'Int'>
    readonly trialEndsAt: FieldRef<"Tenant", 'DateTime'>
    readonly createdAt: FieldRef<"Tenant", 'DateTime'>
    readonly updatedAt: FieldRef<"Tenant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
  }

  /**
   * Tenant.superAdmins
   */
  export type Tenant$superAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    where?: TenantSuperAdminWhereInput
    orderBy?: TenantSuperAdminOrderByWithRelationInput | TenantSuperAdminOrderByWithRelationInput[]
    cursor?: TenantSuperAdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantSuperAdminScalarFieldEnum | TenantSuperAdminScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model SuperAdmin
   */

  export type AggregateSuperAdmin = {
    _count: SuperAdminCountAggregateOutputType | null
    _avg: SuperAdminAvgAggregateOutputType | null
    _sum: SuperAdminSumAggregateOutputType | null
    _min: SuperAdminMinAggregateOutputType | null
    _max: SuperAdminMaxAggregateOutputType | null
  }

  export type SuperAdminAvgAggregateOutputType = {
    failedAttempts: number | null
  }

  export type SuperAdminSumAggregateOutputType = {
    failedAttempts: number | null
  }

  export type SuperAdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    status: $Enums.SuperAdminStatus | null
    lastLoginAt: Date | null
    failedAttempts: number | null
    lockedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuperAdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    status: $Enums.SuperAdminStatus | null
    lastLoginAt: Date | null
    failedAttempts: number | null
    lockedUntil: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuperAdminCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    status: number
    lastLoginAt: number
    failedAttempts: number
    lockedUntil: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SuperAdminAvgAggregateInputType = {
    failedAttempts?: true
  }

  export type SuperAdminSumAggregateInputType = {
    failedAttempts?: true
  }

  export type SuperAdminMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    status?: true
    lastLoginAt?: true
    failedAttempts?: true
    lockedUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuperAdminMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    status?: true
    lastLoginAt?: true
    failedAttempts?: true
    lockedUntil?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuperAdminCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    status?: true
    lastLoginAt?: true
    failedAttempts?: true
    lockedUntil?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SuperAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuperAdmin to aggregate.
     */
    where?: SuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdmins to fetch.
     */
    orderBy?: SuperAdminOrderByWithRelationInput | SuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SuperAdmins
    **/
    _count?: true | SuperAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SuperAdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SuperAdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuperAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuperAdminMaxAggregateInputType
  }

  export type GetSuperAdminAggregateType<T extends SuperAdminAggregateArgs> = {
        [P in keyof T & keyof AggregateSuperAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuperAdmin[P]>
      : GetScalarType<T[P], AggregateSuperAdmin[P]>
  }




  export type SuperAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuperAdminWhereInput
    orderBy?: SuperAdminOrderByWithAggregationInput | SuperAdminOrderByWithAggregationInput[]
    by: SuperAdminScalarFieldEnum[] | SuperAdminScalarFieldEnum
    having?: SuperAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuperAdminCountAggregateInputType | true
    _avg?: SuperAdminAvgAggregateInputType
    _sum?: SuperAdminSumAggregateInputType
    _min?: SuperAdminMinAggregateInputType
    _max?: SuperAdminMaxAggregateInputType
  }

  export type SuperAdminGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    status: $Enums.SuperAdminStatus
    lastLoginAt: Date | null
    failedAttempts: number
    lockedUntil: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SuperAdminCountAggregateOutputType | null
    _avg: SuperAdminAvgAggregateOutputType | null
    _sum: SuperAdminSumAggregateOutputType | null
    _min: SuperAdminMinAggregateOutputType | null
    _max: SuperAdminMaxAggregateOutputType | null
  }

  type GetSuperAdminGroupByPayload<T extends SuperAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuperAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuperAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuperAdminGroupByOutputType[P]>
            : GetScalarType<T[P], SuperAdminGroupByOutputType[P]>
        }
      >
    >


  export type SuperAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    status?: boolean
    lastLoginAt?: boolean
    failedAttempts?: boolean
    lockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tenants?: boolean | SuperAdmin$tenantsArgs<ExtArgs>
    _count?: boolean | SuperAdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["superAdmin"]>

  export type SuperAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    status?: boolean
    lastLoginAt?: boolean
    failedAttempts?: boolean
    lockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["superAdmin"]>

  export type SuperAdminSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    status?: boolean
    lastLoginAt?: boolean
    failedAttempts?: boolean
    lockedUntil?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SuperAdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenants?: boolean | SuperAdmin$tenantsArgs<ExtArgs>
    _count?: boolean | SuperAdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SuperAdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SuperAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SuperAdmin"
    objects: {
      tenants: Prisma.$TenantSuperAdminPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      status: $Enums.SuperAdminStatus
      lastLoginAt: Date | null
      failedAttempts: number
      lockedUntil: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["superAdmin"]>
    composites: {}
  }

  type SuperAdminGetPayload<S extends boolean | null | undefined | SuperAdminDefaultArgs> = $Result.GetResult<Prisma.$SuperAdminPayload, S>

  type SuperAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SuperAdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SuperAdminCountAggregateInputType | true
    }

  export interface SuperAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SuperAdmin'], meta: { name: 'SuperAdmin' } }
    /**
     * Find zero or one SuperAdmin that matches the filter.
     * @param {SuperAdminFindUniqueArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuperAdminFindUniqueArgs>(args: SelectSubset<T, SuperAdminFindUniqueArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SuperAdmin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SuperAdminFindUniqueOrThrowArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuperAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, SuperAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SuperAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminFindFirstArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuperAdminFindFirstArgs>(args?: SelectSubset<T, SuperAdminFindFirstArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SuperAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminFindFirstOrThrowArgs} args - Arguments to find a SuperAdmin
     * @example
     * // Get one SuperAdmin
     * const superAdmin = await prisma.superAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuperAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, SuperAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SuperAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SuperAdmins
     * const superAdmins = await prisma.superAdmin.findMany()
     * 
     * // Get first 10 SuperAdmins
     * const superAdmins = await prisma.superAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const superAdminWithIdOnly = await prisma.superAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuperAdminFindManyArgs>(args?: SelectSubset<T, SuperAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SuperAdmin.
     * @param {SuperAdminCreateArgs} args - Arguments to create a SuperAdmin.
     * @example
     * // Create one SuperAdmin
     * const SuperAdmin = await prisma.superAdmin.create({
     *   data: {
     *     // ... data to create a SuperAdmin
     *   }
     * })
     * 
     */
    create<T extends SuperAdminCreateArgs>(args: SelectSubset<T, SuperAdminCreateArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SuperAdmins.
     * @param {SuperAdminCreateManyArgs} args - Arguments to create many SuperAdmins.
     * @example
     * // Create many SuperAdmins
     * const superAdmin = await prisma.superAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuperAdminCreateManyArgs>(args?: SelectSubset<T, SuperAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SuperAdmins and returns the data saved in the database.
     * @param {SuperAdminCreateManyAndReturnArgs} args - Arguments to create many SuperAdmins.
     * @example
     * // Create many SuperAdmins
     * const superAdmin = await prisma.superAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SuperAdmins and only return the `id`
     * const superAdminWithIdOnly = await prisma.superAdmin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuperAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, SuperAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SuperAdmin.
     * @param {SuperAdminDeleteArgs} args - Arguments to delete one SuperAdmin.
     * @example
     * // Delete one SuperAdmin
     * const SuperAdmin = await prisma.superAdmin.delete({
     *   where: {
     *     // ... filter to delete one SuperAdmin
     *   }
     * })
     * 
     */
    delete<T extends SuperAdminDeleteArgs>(args: SelectSubset<T, SuperAdminDeleteArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SuperAdmin.
     * @param {SuperAdminUpdateArgs} args - Arguments to update one SuperAdmin.
     * @example
     * // Update one SuperAdmin
     * const superAdmin = await prisma.superAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuperAdminUpdateArgs>(args: SelectSubset<T, SuperAdminUpdateArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SuperAdmins.
     * @param {SuperAdminDeleteManyArgs} args - Arguments to filter SuperAdmins to delete.
     * @example
     * // Delete a few SuperAdmins
     * const { count } = await prisma.superAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuperAdminDeleteManyArgs>(args?: SelectSubset<T, SuperAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SuperAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SuperAdmins
     * const superAdmin = await prisma.superAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuperAdminUpdateManyArgs>(args: SelectSubset<T, SuperAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SuperAdmin.
     * @param {SuperAdminUpsertArgs} args - Arguments to update or create a SuperAdmin.
     * @example
     * // Update or create a SuperAdmin
     * const superAdmin = await prisma.superAdmin.upsert({
     *   create: {
     *     // ... data to create a SuperAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SuperAdmin we want to update
     *   }
     * })
     */
    upsert<T extends SuperAdminUpsertArgs>(args: SelectSubset<T, SuperAdminUpsertArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SuperAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminCountArgs} args - Arguments to filter SuperAdmins to count.
     * @example
     * // Count the number of SuperAdmins
     * const count = await prisma.superAdmin.count({
     *   where: {
     *     // ... the filter for the SuperAdmins we want to count
     *   }
     * })
    **/
    count<T extends SuperAdminCountArgs>(
      args?: Subset<T, SuperAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuperAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SuperAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SuperAdminAggregateArgs>(args: Subset<T, SuperAdminAggregateArgs>): Prisma.PrismaPromise<GetSuperAdminAggregateType<T>>

    /**
     * Group by SuperAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuperAdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SuperAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuperAdminGroupByArgs['orderBy'] }
        : { orderBy?: SuperAdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SuperAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuperAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SuperAdmin model
   */
  readonly fields: SuperAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SuperAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuperAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenants<T extends SuperAdmin$tenantsArgs<ExtArgs> = {}>(args?: Subset<T, SuperAdmin$tenantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SuperAdmin model
   */ 
  interface SuperAdminFieldRefs {
    readonly id: FieldRef<"SuperAdmin", 'String'>
    readonly email: FieldRef<"SuperAdmin", 'String'>
    readonly password: FieldRef<"SuperAdmin", 'String'>
    readonly firstName: FieldRef<"SuperAdmin", 'String'>
    readonly lastName: FieldRef<"SuperAdmin", 'String'>
    readonly status: FieldRef<"SuperAdmin", 'SuperAdminStatus'>
    readonly lastLoginAt: FieldRef<"SuperAdmin", 'DateTime'>
    readonly failedAttempts: FieldRef<"SuperAdmin", 'Int'>
    readonly lockedUntil: FieldRef<"SuperAdmin", 'DateTime'>
    readonly createdAt: FieldRef<"SuperAdmin", 'DateTime'>
    readonly updatedAt: FieldRef<"SuperAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SuperAdmin findUnique
   */
  export type SuperAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which SuperAdmin to fetch.
     */
    where: SuperAdminWhereUniqueInput
  }

  /**
   * SuperAdmin findUniqueOrThrow
   */
  export type SuperAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which SuperAdmin to fetch.
     */
    where: SuperAdminWhereUniqueInput
  }

  /**
   * SuperAdmin findFirst
   */
  export type SuperAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which SuperAdmin to fetch.
     */
    where?: SuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdmins to fetch.
     */
    orderBy?: SuperAdminOrderByWithRelationInput | SuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuperAdmins.
     */
    cursor?: SuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuperAdmins.
     */
    distinct?: SuperAdminScalarFieldEnum | SuperAdminScalarFieldEnum[]
  }

  /**
   * SuperAdmin findFirstOrThrow
   */
  export type SuperAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which SuperAdmin to fetch.
     */
    where?: SuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdmins to fetch.
     */
    orderBy?: SuperAdminOrderByWithRelationInput | SuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SuperAdmins.
     */
    cursor?: SuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SuperAdmins.
     */
    distinct?: SuperAdminScalarFieldEnum | SuperAdminScalarFieldEnum[]
  }

  /**
   * SuperAdmin findMany
   */
  export type SuperAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which SuperAdmins to fetch.
     */
    where?: SuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SuperAdmins to fetch.
     */
    orderBy?: SuperAdminOrderByWithRelationInput | SuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SuperAdmins.
     */
    cursor?: SuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SuperAdmins.
     */
    skip?: number
    distinct?: SuperAdminScalarFieldEnum | SuperAdminScalarFieldEnum[]
  }

  /**
   * SuperAdmin create
   */
  export type SuperAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * The data needed to create a SuperAdmin.
     */
    data: XOR<SuperAdminCreateInput, SuperAdminUncheckedCreateInput>
  }

  /**
   * SuperAdmin createMany
   */
  export type SuperAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SuperAdmins.
     */
    data: SuperAdminCreateManyInput | SuperAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuperAdmin createManyAndReturn
   */
  export type SuperAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SuperAdmins.
     */
    data: SuperAdminCreateManyInput | SuperAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SuperAdmin update
   */
  export type SuperAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * The data needed to update a SuperAdmin.
     */
    data: XOR<SuperAdminUpdateInput, SuperAdminUncheckedUpdateInput>
    /**
     * Choose, which SuperAdmin to update.
     */
    where: SuperAdminWhereUniqueInput
  }

  /**
   * SuperAdmin updateMany
   */
  export type SuperAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SuperAdmins.
     */
    data: XOR<SuperAdminUpdateManyMutationInput, SuperAdminUncheckedUpdateManyInput>
    /**
     * Filter which SuperAdmins to update
     */
    where?: SuperAdminWhereInput
  }

  /**
   * SuperAdmin upsert
   */
  export type SuperAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * The filter to search for the SuperAdmin to update in case it exists.
     */
    where: SuperAdminWhereUniqueInput
    /**
     * In case the SuperAdmin found by the `where` argument doesn't exist, create a new SuperAdmin with this data.
     */
    create: XOR<SuperAdminCreateInput, SuperAdminUncheckedCreateInput>
    /**
     * In case the SuperAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuperAdminUpdateInput, SuperAdminUncheckedUpdateInput>
  }

  /**
   * SuperAdmin delete
   */
  export type SuperAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
    /**
     * Filter which SuperAdmin to delete.
     */
    where: SuperAdminWhereUniqueInput
  }

  /**
   * SuperAdmin deleteMany
   */
  export type SuperAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SuperAdmins to delete
     */
    where?: SuperAdminWhereInput
  }

  /**
   * SuperAdmin.tenants
   */
  export type SuperAdmin$tenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    where?: TenantSuperAdminWhereInput
    orderBy?: TenantSuperAdminOrderByWithRelationInput | TenantSuperAdminOrderByWithRelationInput[]
    cursor?: TenantSuperAdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantSuperAdminScalarFieldEnum | TenantSuperAdminScalarFieldEnum[]
  }

  /**
   * SuperAdmin without action
   */
  export type SuperAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SuperAdmin
     */
    select?: SuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuperAdminInclude<ExtArgs> | null
  }


  /**
   * Model TenantSuperAdmin
   */

  export type AggregateTenantSuperAdmin = {
    _count: TenantSuperAdminCountAggregateOutputType | null
    _min: TenantSuperAdminMinAggregateOutputType | null
    _max: TenantSuperAdminMaxAggregateOutputType | null
  }

  export type TenantSuperAdminMinAggregateOutputType = {
    id: string | null
    tenantId: string | null
    superAdminId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type TenantSuperAdminMaxAggregateOutputType = {
    id: string | null
    tenantId: string | null
    superAdminId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type TenantSuperAdminCountAggregateOutputType = {
    id: number
    tenantId: number
    superAdminId: number
    role: number
    createdAt: number
    _all: number
  }


  export type TenantSuperAdminMinAggregateInputType = {
    id?: true
    tenantId?: true
    superAdminId?: true
    role?: true
    createdAt?: true
  }

  export type TenantSuperAdminMaxAggregateInputType = {
    id?: true
    tenantId?: true
    superAdminId?: true
    role?: true
    createdAt?: true
  }

  export type TenantSuperAdminCountAggregateInputType = {
    id?: true
    tenantId?: true
    superAdminId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type TenantSuperAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantSuperAdmin to aggregate.
     */
    where?: TenantSuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSuperAdmins to fetch.
     */
    orderBy?: TenantSuperAdminOrderByWithRelationInput | TenantSuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantSuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSuperAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantSuperAdmins
    **/
    _count?: true | TenantSuperAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantSuperAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantSuperAdminMaxAggregateInputType
  }

  export type GetTenantSuperAdminAggregateType<T extends TenantSuperAdminAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantSuperAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantSuperAdmin[P]>
      : GetScalarType<T[P], AggregateTenantSuperAdmin[P]>
  }




  export type TenantSuperAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantSuperAdminWhereInput
    orderBy?: TenantSuperAdminOrderByWithAggregationInput | TenantSuperAdminOrderByWithAggregationInput[]
    by: TenantSuperAdminScalarFieldEnum[] | TenantSuperAdminScalarFieldEnum
    having?: TenantSuperAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantSuperAdminCountAggregateInputType | true
    _min?: TenantSuperAdminMinAggregateInputType
    _max?: TenantSuperAdminMaxAggregateInputType
  }

  export type TenantSuperAdminGroupByOutputType = {
    id: string
    tenantId: string
    superAdminId: string
    role: string
    createdAt: Date
    _count: TenantSuperAdminCountAggregateOutputType | null
    _min: TenantSuperAdminMinAggregateOutputType | null
    _max: TenantSuperAdminMaxAggregateOutputType | null
  }

  type GetTenantSuperAdminGroupByPayload<T extends TenantSuperAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantSuperAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantSuperAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantSuperAdminGroupByOutputType[P]>
            : GetScalarType<T[P], TenantSuperAdminGroupByOutputType[P]>
        }
      >
    >


  export type TenantSuperAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    superAdminId?: boolean
    role?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    superAdmin?: boolean | SuperAdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantSuperAdmin"]>

  export type TenantSuperAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenantId?: boolean
    superAdminId?: boolean
    role?: boolean
    createdAt?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    superAdmin?: boolean | SuperAdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantSuperAdmin"]>

  export type TenantSuperAdminSelectScalar = {
    id?: boolean
    tenantId?: boolean
    superAdminId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type TenantSuperAdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    superAdmin?: boolean | SuperAdminDefaultArgs<ExtArgs>
  }
  export type TenantSuperAdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    superAdmin?: boolean | SuperAdminDefaultArgs<ExtArgs>
  }

  export type $TenantSuperAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantSuperAdmin"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      superAdmin: Prisma.$SuperAdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenantId: string
      superAdminId: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["tenantSuperAdmin"]>
    composites: {}
  }

  type TenantSuperAdminGetPayload<S extends boolean | null | undefined | TenantSuperAdminDefaultArgs> = $Result.GetResult<Prisma.$TenantSuperAdminPayload, S>

  type TenantSuperAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TenantSuperAdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TenantSuperAdminCountAggregateInputType | true
    }

  export interface TenantSuperAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantSuperAdmin'], meta: { name: 'TenantSuperAdmin' } }
    /**
     * Find zero or one TenantSuperAdmin that matches the filter.
     * @param {TenantSuperAdminFindUniqueArgs} args - Arguments to find a TenantSuperAdmin
     * @example
     * // Get one TenantSuperAdmin
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantSuperAdminFindUniqueArgs>(args: SelectSubset<T, TenantSuperAdminFindUniqueArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one TenantSuperAdmin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TenantSuperAdminFindUniqueOrThrowArgs} args - Arguments to find a TenantSuperAdmin
     * @example
     * // Get one TenantSuperAdmin
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantSuperAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantSuperAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first TenantSuperAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSuperAdminFindFirstArgs} args - Arguments to find a TenantSuperAdmin
     * @example
     * // Get one TenantSuperAdmin
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantSuperAdminFindFirstArgs>(args?: SelectSubset<T, TenantSuperAdminFindFirstArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first TenantSuperAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSuperAdminFindFirstOrThrowArgs} args - Arguments to find a TenantSuperAdmin
     * @example
     * // Get one TenantSuperAdmin
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantSuperAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantSuperAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more TenantSuperAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSuperAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantSuperAdmins
     * const tenantSuperAdmins = await prisma.tenantSuperAdmin.findMany()
     * 
     * // Get first 10 TenantSuperAdmins
     * const tenantSuperAdmins = await prisma.tenantSuperAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantSuperAdminWithIdOnly = await prisma.tenantSuperAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantSuperAdminFindManyArgs>(args?: SelectSubset<T, TenantSuperAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a TenantSuperAdmin.
     * @param {TenantSuperAdminCreateArgs} args - Arguments to create a TenantSuperAdmin.
     * @example
     * // Create one TenantSuperAdmin
     * const TenantSuperAdmin = await prisma.tenantSuperAdmin.create({
     *   data: {
     *     // ... data to create a TenantSuperAdmin
     *   }
     * })
     * 
     */
    create<T extends TenantSuperAdminCreateArgs>(args: SelectSubset<T, TenantSuperAdminCreateArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many TenantSuperAdmins.
     * @param {TenantSuperAdminCreateManyArgs} args - Arguments to create many TenantSuperAdmins.
     * @example
     * // Create many TenantSuperAdmins
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantSuperAdminCreateManyArgs>(args?: SelectSubset<T, TenantSuperAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantSuperAdmins and returns the data saved in the database.
     * @param {TenantSuperAdminCreateManyAndReturnArgs} args - Arguments to create many TenantSuperAdmins.
     * @example
     * // Create many TenantSuperAdmins
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantSuperAdmins and only return the `id`
     * const tenantSuperAdminWithIdOnly = await prisma.tenantSuperAdmin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantSuperAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantSuperAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a TenantSuperAdmin.
     * @param {TenantSuperAdminDeleteArgs} args - Arguments to delete one TenantSuperAdmin.
     * @example
     * // Delete one TenantSuperAdmin
     * const TenantSuperAdmin = await prisma.tenantSuperAdmin.delete({
     *   where: {
     *     // ... filter to delete one TenantSuperAdmin
     *   }
     * })
     * 
     */
    delete<T extends TenantSuperAdminDeleteArgs>(args: SelectSubset<T, TenantSuperAdminDeleteArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one TenantSuperAdmin.
     * @param {TenantSuperAdminUpdateArgs} args - Arguments to update one TenantSuperAdmin.
     * @example
     * // Update one TenantSuperAdmin
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantSuperAdminUpdateArgs>(args: SelectSubset<T, TenantSuperAdminUpdateArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more TenantSuperAdmins.
     * @param {TenantSuperAdminDeleteManyArgs} args - Arguments to filter TenantSuperAdmins to delete.
     * @example
     * // Delete a few TenantSuperAdmins
     * const { count } = await prisma.tenantSuperAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantSuperAdminDeleteManyArgs>(args?: SelectSubset<T, TenantSuperAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantSuperAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSuperAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantSuperAdmins
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantSuperAdminUpdateManyArgs>(args: SelectSubset<T, TenantSuperAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TenantSuperAdmin.
     * @param {TenantSuperAdminUpsertArgs} args - Arguments to update or create a TenantSuperAdmin.
     * @example
     * // Update or create a TenantSuperAdmin
     * const tenantSuperAdmin = await prisma.tenantSuperAdmin.upsert({
     *   create: {
     *     // ... data to create a TenantSuperAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantSuperAdmin we want to update
     *   }
     * })
     */
    upsert<T extends TenantSuperAdminUpsertArgs>(args: SelectSubset<T, TenantSuperAdminUpsertArgs<ExtArgs>>): Prisma__TenantSuperAdminClient<$Result.GetResult<Prisma.$TenantSuperAdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of TenantSuperAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSuperAdminCountArgs} args - Arguments to filter TenantSuperAdmins to count.
     * @example
     * // Count the number of TenantSuperAdmins
     * const count = await prisma.tenantSuperAdmin.count({
     *   where: {
     *     // ... the filter for the TenantSuperAdmins we want to count
     *   }
     * })
    **/
    count<T extends TenantSuperAdminCountArgs>(
      args?: Subset<T, TenantSuperAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantSuperAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantSuperAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSuperAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantSuperAdminAggregateArgs>(args: Subset<T, TenantSuperAdminAggregateArgs>): Prisma.PrismaPromise<GetTenantSuperAdminAggregateType<T>>

    /**
     * Group by TenantSuperAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantSuperAdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantSuperAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantSuperAdminGroupByArgs['orderBy'] }
        : { orderBy?: TenantSuperAdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantSuperAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantSuperAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantSuperAdmin model
   */
  readonly fields: TenantSuperAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantSuperAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantSuperAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    superAdmin<T extends SuperAdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SuperAdminDefaultArgs<ExtArgs>>): Prisma__SuperAdminClient<$Result.GetResult<Prisma.$SuperAdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantSuperAdmin model
   */ 
  interface TenantSuperAdminFieldRefs {
    readonly id: FieldRef<"TenantSuperAdmin", 'String'>
    readonly tenantId: FieldRef<"TenantSuperAdmin", 'String'>
    readonly superAdminId: FieldRef<"TenantSuperAdmin", 'String'>
    readonly role: FieldRef<"TenantSuperAdmin", 'String'>
    readonly createdAt: FieldRef<"TenantSuperAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TenantSuperAdmin findUnique
   */
  export type TenantSuperAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which TenantSuperAdmin to fetch.
     */
    where: TenantSuperAdminWhereUniqueInput
  }

  /**
   * TenantSuperAdmin findUniqueOrThrow
   */
  export type TenantSuperAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which TenantSuperAdmin to fetch.
     */
    where: TenantSuperAdminWhereUniqueInput
  }

  /**
   * TenantSuperAdmin findFirst
   */
  export type TenantSuperAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which TenantSuperAdmin to fetch.
     */
    where?: TenantSuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSuperAdmins to fetch.
     */
    orderBy?: TenantSuperAdminOrderByWithRelationInput | TenantSuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantSuperAdmins.
     */
    cursor?: TenantSuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSuperAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantSuperAdmins.
     */
    distinct?: TenantSuperAdminScalarFieldEnum | TenantSuperAdminScalarFieldEnum[]
  }

  /**
   * TenantSuperAdmin findFirstOrThrow
   */
  export type TenantSuperAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which TenantSuperAdmin to fetch.
     */
    where?: TenantSuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSuperAdmins to fetch.
     */
    orderBy?: TenantSuperAdminOrderByWithRelationInput | TenantSuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantSuperAdmins.
     */
    cursor?: TenantSuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSuperAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantSuperAdmins.
     */
    distinct?: TenantSuperAdminScalarFieldEnum | TenantSuperAdminScalarFieldEnum[]
  }

  /**
   * TenantSuperAdmin findMany
   */
  export type TenantSuperAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * Filter, which TenantSuperAdmins to fetch.
     */
    where?: TenantSuperAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantSuperAdmins to fetch.
     */
    orderBy?: TenantSuperAdminOrderByWithRelationInput | TenantSuperAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantSuperAdmins.
     */
    cursor?: TenantSuperAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantSuperAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantSuperAdmins.
     */
    skip?: number
    distinct?: TenantSuperAdminScalarFieldEnum | TenantSuperAdminScalarFieldEnum[]
  }

  /**
   * TenantSuperAdmin create
   */
  export type TenantSuperAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * The data needed to create a TenantSuperAdmin.
     */
    data: XOR<TenantSuperAdminCreateInput, TenantSuperAdminUncheckedCreateInput>
  }

  /**
   * TenantSuperAdmin createMany
   */
  export type TenantSuperAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantSuperAdmins.
     */
    data: TenantSuperAdminCreateManyInput | TenantSuperAdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantSuperAdmin createManyAndReturn
   */
  export type TenantSuperAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many TenantSuperAdmins.
     */
    data: TenantSuperAdminCreateManyInput | TenantSuperAdminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantSuperAdmin update
   */
  export type TenantSuperAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * The data needed to update a TenantSuperAdmin.
     */
    data: XOR<TenantSuperAdminUpdateInput, TenantSuperAdminUncheckedUpdateInput>
    /**
     * Choose, which TenantSuperAdmin to update.
     */
    where: TenantSuperAdminWhereUniqueInput
  }

  /**
   * TenantSuperAdmin updateMany
   */
  export type TenantSuperAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantSuperAdmins.
     */
    data: XOR<TenantSuperAdminUpdateManyMutationInput, TenantSuperAdminUncheckedUpdateManyInput>
    /**
     * Filter which TenantSuperAdmins to update
     */
    where?: TenantSuperAdminWhereInput
  }

  /**
   * TenantSuperAdmin upsert
   */
  export type TenantSuperAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * The filter to search for the TenantSuperAdmin to update in case it exists.
     */
    where: TenantSuperAdminWhereUniqueInput
    /**
     * In case the TenantSuperAdmin found by the `where` argument doesn't exist, create a new TenantSuperAdmin with this data.
     */
    create: XOR<TenantSuperAdminCreateInput, TenantSuperAdminUncheckedCreateInput>
    /**
     * In case the TenantSuperAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantSuperAdminUpdateInput, TenantSuperAdminUncheckedUpdateInput>
  }

  /**
   * TenantSuperAdmin delete
   */
  export type TenantSuperAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
    /**
     * Filter which TenantSuperAdmin to delete.
     */
    where: TenantSuperAdminWhereUniqueInput
  }

  /**
   * TenantSuperAdmin deleteMany
   */
  export type TenantSuperAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantSuperAdmins to delete
     */
    where?: TenantSuperAdminWhereInput
  }

  /**
   * TenantSuperAdmin without action
   */
  export type TenantSuperAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantSuperAdmin
     */
    select?: TenantSuperAdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantSuperAdminInclude<ExtArgs> | null
  }


  /**
   * Model SystemAuditLog
   */

  export type AggregateSystemAuditLog = {
    _count: SystemAuditLogCountAggregateOutputType | null
    _min: SystemAuditLogMinAggregateOutputType | null
    _max: SystemAuditLogMaxAggregateOutputType | null
  }

  export type SystemAuditLogMinAggregateOutputType = {
    id: string | null
    superAdminId: string | null
    tenantId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SystemAuditLogMaxAggregateOutputType = {
    id: string | null
    superAdminId: string | null
    tenantId: string | null
    action: string | null
    entity: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SystemAuditLogCountAggregateOutputType = {
    id: number
    superAdminId: number
    tenantId: number
    action: number
    entity: number
    entityId: number
    details: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type SystemAuditLogMinAggregateInputType = {
    id?: true
    superAdminId?: true
    tenantId?: true
    action?: true
    entity?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SystemAuditLogMaxAggregateInputType = {
    id?: true
    superAdminId?: true
    tenantId?: true
    action?: true
    entity?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SystemAuditLogCountAggregateInputType = {
    id?: true
    superAdminId?: true
    tenantId?: true
    action?: true
    entity?: true
    entityId?: true
    details?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type SystemAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemAuditLog to aggregate.
     */
    where?: SystemAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemAuditLogs to fetch.
     */
    orderBy?: SystemAuditLogOrderByWithRelationInput | SystemAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemAuditLogs
    **/
    _count?: true | SystemAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemAuditLogMaxAggregateInputType
  }

  export type GetSystemAuditLogAggregateType<T extends SystemAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemAuditLog[P]>
      : GetScalarType<T[P], AggregateSystemAuditLog[P]>
  }




  export type SystemAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemAuditLogWhereInput
    orderBy?: SystemAuditLogOrderByWithAggregationInput | SystemAuditLogOrderByWithAggregationInput[]
    by: SystemAuditLogScalarFieldEnum[] | SystemAuditLogScalarFieldEnum
    having?: SystemAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemAuditLogCountAggregateInputType | true
    _min?: SystemAuditLogMinAggregateInputType
    _max?: SystemAuditLogMaxAggregateInputType
  }

  export type SystemAuditLogGroupByOutputType = {
    id: string
    superAdminId: string | null
    tenantId: string | null
    action: string
    entity: string
    entityId: string | null
    details: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: SystemAuditLogCountAggregateOutputType | null
    _min: SystemAuditLogMinAggregateOutputType | null
    _max: SystemAuditLogMaxAggregateOutputType | null
  }

  type GetSystemAuditLogGroupByPayload<T extends SystemAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], SystemAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type SystemAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    superAdminId?: boolean
    tenantId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemAuditLog"]>

  export type SystemAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    superAdminId?: boolean
    tenantId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["systemAuditLog"]>

  export type SystemAuditLogSelectScalar = {
    id?: boolean
    superAdminId?: boolean
    tenantId?: boolean
    action?: boolean
    entity?: boolean
    entityId?: boolean
    details?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }


  export type $SystemAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemAuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      superAdminId: string | null
      tenantId: string | null
      action: string
      entity: string
      entityId: string | null
      details: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["systemAuditLog"]>
    composites: {}
  }

  type SystemAuditLogGetPayload<S extends boolean | null | undefined | SystemAuditLogDefaultArgs> = $Result.GetResult<Prisma.$SystemAuditLogPayload, S>

  type SystemAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemAuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemAuditLogCountAggregateInputType | true
    }

  export interface SystemAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemAuditLog'], meta: { name: 'SystemAuditLog' } }
    /**
     * Find zero or one SystemAuditLog that matches the filter.
     * @param {SystemAuditLogFindUniqueArgs} args - Arguments to find a SystemAuditLog
     * @example
     * // Get one SystemAuditLog
     * const systemAuditLog = await prisma.systemAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemAuditLogFindUniqueArgs>(args: SelectSubset<T, SystemAuditLogFindUniqueArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SystemAuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SystemAuditLogFindUniqueOrThrowArgs} args - Arguments to find a SystemAuditLog
     * @example
     * // Get one SystemAuditLog
     * const systemAuditLog = await prisma.systemAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SystemAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemAuditLogFindFirstArgs} args - Arguments to find a SystemAuditLog
     * @example
     * // Get one SystemAuditLog
     * const systemAuditLog = await prisma.systemAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemAuditLogFindFirstArgs>(args?: SelectSubset<T, SystemAuditLogFindFirstArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SystemAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemAuditLogFindFirstOrThrowArgs} args - Arguments to find a SystemAuditLog
     * @example
     * // Get one SystemAuditLog
     * const systemAuditLog = await prisma.systemAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SystemAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemAuditLogs
     * const systemAuditLogs = await prisma.systemAuditLog.findMany()
     * 
     * // Get first 10 SystemAuditLogs
     * const systemAuditLogs = await prisma.systemAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemAuditLogWithIdOnly = await prisma.systemAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemAuditLogFindManyArgs>(args?: SelectSubset<T, SystemAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SystemAuditLog.
     * @param {SystemAuditLogCreateArgs} args - Arguments to create a SystemAuditLog.
     * @example
     * // Create one SystemAuditLog
     * const SystemAuditLog = await prisma.systemAuditLog.create({
     *   data: {
     *     // ... data to create a SystemAuditLog
     *   }
     * })
     * 
     */
    create<T extends SystemAuditLogCreateArgs>(args: SelectSubset<T, SystemAuditLogCreateArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SystemAuditLogs.
     * @param {SystemAuditLogCreateManyArgs} args - Arguments to create many SystemAuditLogs.
     * @example
     * // Create many SystemAuditLogs
     * const systemAuditLog = await prisma.systemAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemAuditLogCreateManyArgs>(args?: SelectSubset<T, SystemAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemAuditLogs and returns the data saved in the database.
     * @param {SystemAuditLogCreateManyAndReturnArgs} args - Arguments to create many SystemAuditLogs.
     * @example
     * // Create many SystemAuditLogs
     * const systemAuditLog = await prisma.systemAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemAuditLogs and only return the `id`
     * const systemAuditLogWithIdOnly = await prisma.systemAuditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SystemAuditLog.
     * @param {SystemAuditLogDeleteArgs} args - Arguments to delete one SystemAuditLog.
     * @example
     * // Delete one SystemAuditLog
     * const SystemAuditLog = await prisma.systemAuditLog.delete({
     *   where: {
     *     // ... filter to delete one SystemAuditLog
     *   }
     * })
     * 
     */
    delete<T extends SystemAuditLogDeleteArgs>(args: SelectSubset<T, SystemAuditLogDeleteArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SystemAuditLog.
     * @param {SystemAuditLogUpdateArgs} args - Arguments to update one SystemAuditLog.
     * @example
     * // Update one SystemAuditLog
     * const systemAuditLog = await prisma.systemAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemAuditLogUpdateArgs>(args: SelectSubset<T, SystemAuditLogUpdateArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SystemAuditLogs.
     * @param {SystemAuditLogDeleteManyArgs} args - Arguments to filter SystemAuditLogs to delete.
     * @example
     * // Delete a few SystemAuditLogs
     * const { count } = await prisma.systemAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemAuditLogDeleteManyArgs>(args?: SelectSubset<T, SystemAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemAuditLogs
     * const systemAuditLog = await prisma.systemAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemAuditLogUpdateManyArgs>(args: SelectSubset<T, SystemAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemAuditLog.
     * @param {SystemAuditLogUpsertArgs} args - Arguments to update or create a SystemAuditLog.
     * @example
     * // Update or create a SystemAuditLog
     * const systemAuditLog = await prisma.systemAuditLog.upsert({
     *   create: {
     *     // ... data to create a SystemAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends SystemAuditLogUpsertArgs>(args: SelectSubset<T, SystemAuditLogUpsertArgs<ExtArgs>>): Prisma__SystemAuditLogClient<$Result.GetResult<Prisma.$SystemAuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SystemAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemAuditLogCountArgs} args - Arguments to filter SystemAuditLogs to count.
     * @example
     * // Count the number of SystemAuditLogs
     * const count = await prisma.systemAuditLog.count({
     *   where: {
     *     // ... the filter for the SystemAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends SystemAuditLogCountArgs>(
      args?: Subset<T, SystemAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemAuditLogAggregateArgs>(args: Subset<T, SystemAuditLogAggregateArgs>): Prisma.PrismaPromise<GetSystemAuditLogAggregateType<T>>

    /**
     * Group by SystemAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemAuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: SystemAuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemAuditLog model
   */
  readonly fields: SystemAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemAuditLog model
   */ 
  interface SystemAuditLogFieldRefs {
    readonly id: FieldRef<"SystemAuditLog", 'String'>
    readonly superAdminId: FieldRef<"SystemAuditLog", 'String'>
    readonly tenantId: FieldRef<"SystemAuditLog", 'String'>
    readonly action: FieldRef<"SystemAuditLog", 'String'>
    readonly entity: FieldRef<"SystemAuditLog", 'String'>
    readonly entityId: FieldRef<"SystemAuditLog", 'String'>
    readonly details: FieldRef<"SystemAuditLog", 'Json'>
    readonly ipAddress: FieldRef<"SystemAuditLog", 'String'>
    readonly userAgent: FieldRef<"SystemAuditLog", 'String'>
    readonly createdAt: FieldRef<"SystemAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemAuditLog findUnique
   */
  export type SystemAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemAuditLog to fetch.
     */
    where: SystemAuditLogWhereUniqueInput
  }

  /**
   * SystemAuditLog findUniqueOrThrow
   */
  export type SystemAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemAuditLog to fetch.
     */
    where: SystemAuditLogWhereUniqueInput
  }

  /**
   * SystemAuditLog findFirst
   */
  export type SystemAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemAuditLog to fetch.
     */
    where?: SystemAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemAuditLogs to fetch.
     */
    orderBy?: SystemAuditLogOrderByWithRelationInput | SystemAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemAuditLogs.
     */
    cursor?: SystemAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemAuditLogs.
     */
    distinct?: SystemAuditLogScalarFieldEnum | SystemAuditLogScalarFieldEnum[]
  }

  /**
   * SystemAuditLog findFirstOrThrow
   */
  export type SystemAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemAuditLog to fetch.
     */
    where?: SystemAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemAuditLogs to fetch.
     */
    orderBy?: SystemAuditLogOrderByWithRelationInput | SystemAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemAuditLogs.
     */
    cursor?: SystemAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemAuditLogs.
     */
    distinct?: SystemAuditLogScalarFieldEnum | SystemAuditLogScalarFieldEnum[]
  }

  /**
   * SystemAuditLog findMany
   */
  export type SystemAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which SystemAuditLogs to fetch.
     */
    where?: SystemAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemAuditLogs to fetch.
     */
    orderBy?: SystemAuditLogOrderByWithRelationInput | SystemAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemAuditLogs.
     */
    cursor?: SystemAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemAuditLogs.
     */
    skip?: number
    distinct?: SystemAuditLogScalarFieldEnum | SystemAuditLogScalarFieldEnum[]
  }

  /**
   * SystemAuditLog create
   */
  export type SystemAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemAuditLog.
     */
    data: XOR<SystemAuditLogCreateInput, SystemAuditLogUncheckedCreateInput>
  }

  /**
   * SystemAuditLog createMany
   */
  export type SystemAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemAuditLogs.
     */
    data: SystemAuditLogCreateManyInput | SystemAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemAuditLog createManyAndReturn
   */
  export type SystemAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SystemAuditLogs.
     */
    data: SystemAuditLogCreateManyInput | SystemAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemAuditLog update
   */
  export type SystemAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemAuditLog.
     */
    data: XOR<SystemAuditLogUpdateInput, SystemAuditLogUncheckedUpdateInput>
    /**
     * Choose, which SystemAuditLog to update.
     */
    where: SystemAuditLogWhereUniqueInput
  }

  /**
   * SystemAuditLog updateMany
   */
  export type SystemAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemAuditLogs.
     */
    data: XOR<SystemAuditLogUpdateManyMutationInput, SystemAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which SystemAuditLogs to update
     */
    where?: SystemAuditLogWhereInput
  }

  /**
   * SystemAuditLog upsert
   */
  export type SystemAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemAuditLog to update in case it exists.
     */
    where: SystemAuditLogWhereUniqueInput
    /**
     * In case the SystemAuditLog found by the `where` argument doesn't exist, create a new SystemAuditLog with this data.
     */
    create: XOR<SystemAuditLogCreateInput, SystemAuditLogUncheckedCreateInput>
    /**
     * In case the SystemAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemAuditLogUpdateInput, SystemAuditLogUncheckedUpdateInput>
  }

  /**
   * SystemAuditLog delete
   */
  export type SystemAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
    /**
     * Filter which SystemAuditLog to delete.
     */
    where: SystemAuditLogWhereUniqueInput
  }

  /**
   * SystemAuditLog deleteMany
   */
  export type SystemAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemAuditLogs to delete
     */
    where?: SystemAuditLogWhereInput
  }

  /**
   * SystemAuditLog without action
   */
  export type SystemAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemAuditLog
     */
    select?: SystemAuditLogSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TenantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    databaseName: 'databaseName',
    databaseHost: 'databaseHost',
    status: 'status',
    plan: 'plan',
    email: 'email',
    phone: 'phone',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    logo: 'logo',
    primaryColor: 'primaryColor',
    settings: 'settings',
    maxUsers: 'maxUsers',
    maxProperties: 'maxProperties',
    trialEndsAt: 'trialEndsAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const SuperAdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    status: 'status',
    lastLoginAt: 'lastLoginAt',
    failedAttempts: 'failedAttempts',
    lockedUntil: 'lockedUntil',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SuperAdminScalarFieldEnum = (typeof SuperAdminScalarFieldEnum)[keyof typeof SuperAdminScalarFieldEnum]


  export const TenantSuperAdminScalarFieldEnum: {
    id: 'id',
    tenantId: 'tenantId',
    superAdminId: 'superAdminId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type TenantSuperAdminScalarFieldEnum = (typeof TenantSuperAdminScalarFieldEnum)[keyof typeof TenantSuperAdminScalarFieldEnum]


  export const SystemAuditLogScalarFieldEnum: {
    id: 'id',
    superAdminId: 'superAdminId',
    tenantId: 'tenantId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    details: 'details',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type SystemAuditLogScalarFieldEnum = (typeof SystemAuditLogScalarFieldEnum)[keyof typeof SystemAuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'TenantStatus'
   */
  export type EnumTenantStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantStatus'>
    


  /**
   * Reference to a field of type 'TenantStatus[]'
   */
  export type ListEnumTenantStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TenantStatus[]'>
    


  /**
   * Reference to a field of type 'PlanType'
   */
  export type EnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType'>
    


  /**
   * Reference to a field of type 'PlanType[]'
   */
  export type ListEnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'SuperAdminStatus'
   */
  export type EnumSuperAdminStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuperAdminStatus'>
    


  /**
   * Reference to a field of type 'SuperAdminStatus[]'
   */
  export type ListEnumSuperAdminStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SuperAdminStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    slug?: StringFilter<"Tenant"> | string
    databaseName?: StringFilter<"Tenant"> | string
    databaseHost?: StringFilter<"Tenant"> | string
    status?: EnumTenantStatusFilter<"Tenant"> | $Enums.TenantStatus
    plan?: EnumPlanTypeFilter<"Tenant"> | $Enums.PlanType
    email?: StringNullableFilter<"Tenant"> | string | null
    phone?: StringNullableFilter<"Tenant"> | string | null
    address?: StringNullableFilter<"Tenant"> | string | null
    city?: StringNullableFilter<"Tenant"> | string | null
    state?: StringNullableFilter<"Tenant"> | string | null
    country?: StringNullableFilter<"Tenant"> | string | null
    logo?: StringNullableFilter<"Tenant"> | string | null
    primaryColor?: StringNullableFilter<"Tenant"> | string | null
    settings?: JsonNullableFilter<"Tenant">
    maxUsers?: IntFilter<"Tenant"> | number
    maxProperties?: IntFilter<"Tenant"> | number
    trialEndsAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    superAdmins?: TenantSuperAdminListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    databaseName?: SortOrder
    databaseHost?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    maxUsers?: SortOrder
    maxProperties?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    superAdmins?: TenantSuperAdminOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    databaseName?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    databaseHost?: StringFilter<"Tenant"> | string
    status?: EnumTenantStatusFilter<"Tenant"> | $Enums.TenantStatus
    plan?: EnumPlanTypeFilter<"Tenant"> | $Enums.PlanType
    email?: StringNullableFilter<"Tenant"> | string | null
    phone?: StringNullableFilter<"Tenant"> | string | null
    address?: StringNullableFilter<"Tenant"> | string | null
    city?: StringNullableFilter<"Tenant"> | string | null
    state?: StringNullableFilter<"Tenant"> | string | null
    country?: StringNullableFilter<"Tenant"> | string | null
    logo?: StringNullableFilter<"Tenant"> | string | null
    primaryColor?: StringNullableFilter<"Tenant"> | string | null
    settings?: JsonNullableFilter<"Tenant">
    maxUsers?: IntFilter<"Tenant"> | number
    maxProperties?: IntFilter<"Tenant"> | number
    trialEndsAt?: DateTimeNullableFilter<"Tenant"> | Date | string | null
    createdAt?: DateTimeFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeFilter<"Tenant"> | Date | string
    superAdmins?: TenantSuperAdminListRelationFilter
  }, "id" | "slug" | "databaseName">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    databaseName?: SortOrder
    databaseHost?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    settings?: SortOrderInput | SortOrder
    maxUsers?: SortOrder
    maxProperties?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _avg?: TenantAvgOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
    _sum?: TenantSumOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    slug?: StringWithAggregatesFilter<"Tenant"> | string
    databaseName?: StringWithAggregatesFilter<"Tenant"> | string
    databaseHost?: StringWithAggregatesFilter<"Tenant"> | string
    status?: EnumTenantStatusWithAggregatesFilter<"Tenant"> | $Enums.TenantStatus
    plan?: EnumPlanTypeWithAggregatesFilter<"Tenant"> | $Enums.PlanType
    email?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    address?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    city?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    state?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    country?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    logo?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    primaryColor?: StringNullableWithAggregatesFilter<"Tenant"> | string | null
    settings?: JsonNullableWithAggregatesFilter<"Tenant">
    maxUsers?: IntWithAggregatesFilter<"Tenant"> | number
    maxProperties?: IntWithAggregatesFilter<"Tenant"> | number
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"Tenant"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tenant"> | Date | string
  }

  export type SuperAdminWhereInput = {
    AND?: SuperAdminWhereInput | SuperAdminWhereInput[]
    OR?: SuperAdminWhereInput[]
    NOT?: SuperAdminWhereInput | SuperAdminWhereInput[]
    id?: StringFilter<"SuperAdmin"> | string
    email?: StringFilter<"SuperAdmin"> | string
    password?: StringFilter<"SuperAdmin"> | string
    firstName?: StringFilter<"SuperAdmin"> | string
    lastName?: StringFilter<"SuperAdmin"> | string
    status?: EnumSuperAdminStatusFilter<"SuperAdmin"> | $Enums.SuperAdminStatus
    lastLoginAt?: DateTimeNullableFilter<"SuperAdmin"> | Date | string | null
    failedAttempts?: IntFilter<"SuperAdmin"> | number
    lockedUntil?: DateTimeNullableFilter<"SuperAdmin"> | Date | string | null
    createdAt?: DateTimeFilter<"SuperAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"SuperAdmin"> | Date | string
    tenants?: TenantSuperAdminListRelationFilter
  }

  export type SuperAdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    failedAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tenants?: TenantSuperAdminOrderByRelationAggregateInput
  }

  export type SuperAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: SuperAdminWhereInput | SuperAdminWhereInput[]
    OR?: SuperAdminWhereInput[]
    NOT?: SuperAdminWhereInput | SuperAdminWhereInput[]
    password?: StringFilter<"SuperAdmin"> | string
    firstName?: StringFilter<"SuperAdmin"> | string
    lastName?: StringFilter<"SuperAdmin"> | string
    status?: EnumSuperAdminStatusFilter<"SuperAdmin"> | $Enums.SuperAdminStatus
    lastLoginAt?: DateTimeNullableFilter<"SuperAdmin"> | Date | string | null
    failedAttempts?: IntFilter<"SuperAdmin"> | number
    lockedUntil?: DateTimeNullableFilter<"SuperAdmin"> | Date | string | null
    createdAt?: DateTimeFilter<"SuperAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"SuperAdmin"> | Date | string
    tenants?: TenantSuperAdminListRelationFilter
  }, "id" | "email">

  export type SuperAdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    failedAttempts?: SortOrder
    lockedUntil?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SuperAdminCountOrderByAggregateInput
    _avg?: SuperAdminAvgOrderByAggregateInput
    _max?: SuperAdminMaxOrderByAggregateInput
    _min?: SuperAdminMinOrderByAggregateInput
    _sum?: SuperAdminSumOrderByAggregateInput
  }

  export type SuperAdminScalarWhereWithAggregatesInput = {
    AND?: SuperAdminScalarWhereWithAggregatesInput | SuperAdminScalarWhereWithAggregatesInput[]
    OR?: SuperAdminScalarWhereWithAggregatesInput[]
    NOT?: SuperAdminScalarWhereWithAggregatesInput | SuperAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SuperAdmin"> | string
    email?: StringWithAggregatesFilter<"SuperAdmin"> | string
    password?: StringWithAggregatesFilter<"SuperAdmin"> | string
    firstName?: StringWithAggregatesFilter<"SuperAdmin"> | string
    lastName?: StringWithAggregatesFilter<"SuperAdmin"> | string
    status?: EnumSuperAdminStatusWithAggregatesFilter<"SuperAdmin"> | $Enums.SuperAdminStatus
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"SuperAdmin"> | Date | string | null
    failedAttempts?: IntWithAggregatesFilter<"SuperAdmin"> | number
    lockedUntil?: DateTimeNullableWithAggregatesFilter<"SuperAdmin"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SuperAdmin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SuperAdmin"> | Date | string
  }

  export type TenantSuperAdminWhereInput = {
    AND?: TenantSuperAdminWhereInput | TenantSuperAdminWhereInput[]
    OR?: TenantSuperAdminWhereInput[]
    NOT?: TenantSuperAdminWhereInput | TenantSuperAdminWhereInput[]
    id?: StringFilter<"TenantSuperAdmin"> | string
    tenantId?: StringFilter<"TenantSuperAdmin"> | string
    superAdminId?: StringFilter<"TenantSuperAdmin"> | string
    role?: StringFilter<"TenantSuperAdmin"> | string
    createdAt?: DateTimeFilter<"TenantSuperAdmin"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
    superAdmin?: XOR<SuperAdminRelationFilter, SuperAdminWhereInput>
  }

  export type TenantSuperAdminOrderByWithRelationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    superAdminId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    superAdmin?: SuperAdminOrderByWithRelationInput
  }

  export type TenantSuperAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tenantId_superAdminId?: TenantSuperAdminTenantIdSuperAdminIdCompoundUniqueInput
    AND?: TenantSuperAdminWhereInput | TenantSuperAdminWhereInput[]
    OR?: TenantSuperAdminWhereInput[]
    NOT?: TenantSuperAdminWhereInput | TenantSuperAdminWhereInput[]
    tenantId?: StringFilter<"TenantSuperAdmin"> | string
    superAdminId?: StringFilter<"TenantSuperAdmin"> | string
    role?: StringFilter<"TenantSuperAdmin"> | string
    createdAt?: DateTimeFilter<"TenantSuperAdmin"> | Date | string
    tenant?: XOR<TenantRelationFilter, TenantWhereInput>
    superAdmin?: XOR<SuperAdminRelationFilter, SuperAdminWhereInput>
  }, "id" | "tenantId_superAdminId">

  export type TenantSuperAdminOrderByWithAggregationInput = {
    id?: SortOrder
    tenantId?: SortOrder
    superAdminId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: TenantSuperAdminCountOrderByAggregateInput
    _max?: TenantSuperAdminMaxOrderByAggregateInput
    _min?: TenantSuperAdminMinOrderByAggregateInput
  }

  export type TenantSuperAdminScalarWhereWithAggregatesInput = {
    AND?: TenantSuperAdminScalarWhereWithAggregatesInput | TenantSuperAdminScalarWhereWithAggregatesInput[]
    OR?: TenantSuperAdminScalarWhereWithAggregatesInput[]
    NOT?: TenantSuperAdminScalarWhereWithAggregatesInput | TenantSuperAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TenantSuperAdmin"> | string
    tenantId?: StringWithAggregatesFilter<"TenantSuperAdmin"> | string
    superAdminId?: StringWithAggregatesFilter<"TenantSuperAdmin"> | string
    role?: StringWithAggregatesFilter<"TenantSuperAdmin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TenantSuperAdmin"> | Date | string
  }

  export type SystemAuditLogWhereInput = {
    AND?: SystemAuditLogWhereInput | SystemAuditLogWhereInput[]
    OR?: SystemAuditLogWhereInput[]
    NOT?: SystemAuditLogWhereInput | SystemAuditLogWhereInput[]
    id?: StringFilter<"SystemAuditLog"> | string
    superAdminId?: StringNullableFilter<"SystemAuditLog"> | string | null
    tenantId?: StringNullableFilter<"SystemAuditLog"> | string | null
    action?: StringFilter<"SystemAuditLog"> | string
    entity?: StringFilter<"SystemAuditLog"> | string
    entityId?: StringNullableFilter<"SystemAuditLog"> | string | null
    details?: JsonNullableFilter<"SystemAuditLog">
    ipAddress?: StringNullableFilter<"SystemAuditLog"> | string | null
    userAgent?: StringNullableFilter<"SystemAuditLog"> | string | null
    createdAt?: DateTimeFilter<"SystemAuditLog"> | Date | string
  }

  export type SystemAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    superAdminId?: SortOrderInput | SortOrder
    tenantId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SystemAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SystemAuditLogWhereInput | SystemAuditLogWhereInput[]
    OR?: SystemAuditLogWhereInput[]
    NOT?: SystemAuditLogWhereInput | SystemAuditLogWhereInput[]
    superAdminId?: StringNullableFilter<"SystemAuditLog"> | string | null
    tenantId?: StringNullableFilter<"SystemAuditLog"> | string | null
    action?: StringFilter<"SystemAuditLog"> | string
    entity?: StringFilter<"SystemAuditLog"> | string
    entityId?: StringNullableFilter<"SystemAuditLog"> | string | null
    details?: JsonNullableFilter<"SystemAuditLog">
    ipAddress?: StringNullableFilter<"SystemAuditLog"> | string | null
    userAgent?: StringNullableFilter<"SystemAuditLog"> | string | null
    createdAt?: DateTimeFilter<"SystemAuditLog"> | Date | string
  }, "id">

  export type SystemAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    superAdminId?: SortOrderInput | SortOrder
    tenantId?: SortOrderInput | SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SystemAuditLogCountOrderByAggregateInput
    _max?: SystemAuditLogMaxOrderByAggregateInput
    _min?: SystemAuditLogMinOrderByAggregateInput
  }

  export type SystemAuditLogScalarWhereWithAggregatesInput = {
    AND?: SystemAuditLogScalarWhereWithAggregatesInput | SystemAuditLogScalarWhereWithAggregatesInput[]
    OR?: SystemAuditLogScalarWhereWithAggregatesInput[]
    NOT?: SystemAuditLogScalarWhereWithAggregatesInput | SystemAuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SystemAuditLog"> | string
    superAdminId?: StringNullableWithAggregatesFilter<"SystemAuditLog"> | string | null
    tenantId?: StringNullableWithAggregatesFilter<"SystemAuditLog"> | string | null
    action?: StringWithAggregatesFilter<"SystemAuditLog"> | string
    entity?: StringWithAggregatesFilter<"SystemAuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"SystemAuditLog"> | string | null
    details?: JsonNullableWithAggregatesFilter<"SystemAuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"SystemAuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"SystemAuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SystemAuditLog"> | Date | string
  }

  export type TenantCreateInput = {
    id?: string
    name: string
    slug: string
    databaseName: string
    databaseHost?: string
    status?: $Enums.TenantStatus
    plan?: $Enums.PlanType
    email?: string | null
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    logo?: string | null
    primaryColor?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: number
    maxProperties?: number
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    superAdmins?: TenantSuperAdminCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    databaseName: string
    databaseHost?: string
    status?: $Enums.TenantStatus
    plan?: $Enums.PlanType
    email?: string | null
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    logo?: string | null
    primaryColor?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: number
    maxProperties?: number
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    superAdmins?: TenantSuperAdminUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseHost?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    plan?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: IntFieldUpdateOperationsInput | number
    maxProperties?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    superAdmins?: TenantSuperAdminUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseHost?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    plan?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: IntFieldUpdateOperationsInput | number
    maxProperties?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    superAdmins?: TenantSuperAdminUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: string
    name: string
    slug: string
    databaseName: string
    databaseHost?: string
    status?: $Enums.TenantStatus
    plan?: $Enums.PlanType
    email?: string | null
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    logo?: string | null
    primaryColor?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: number
    maxProperties?: number
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseHost?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    plan?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: IntFieldUpdateOperationsInput | number
    maxProperties?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseHost?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    plan?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: IntFieldUpdateOperationsInput | number
    maxProperties?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    status?: $Enums.SuperAdminStatus
    lastLoginAt?: Date | string | null
    failedAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenants?: TenantSuperAdminCreateNestedManyWithoutSuperAdminInput
  }

  export type SuperAdminUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    status?: $Enums.SuperAdminStatus
    lastLoginAt?: Date | string | null
    failedAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tenants?: TenantSuperAdminUncheckedCreateNestedManyWithoutSuperAdminInput
  }

  export type SuperAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    status?: EnumSuperAdminStatusFieldUpdateOperationsInput | $Enums.SuperAdminStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenants?: TenantSuperAdminUpdateManyWithoutSuperAdminNestedInput
  }

  export type SuperAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    status?: EnumSuperAdminStatusFieldUpdateOperationsInput | $Enums.SuperAdminStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenants?: TenantSuperAdminUncheckedUpdateManyWithoutSuperAdminNestedInput
  }

  export type SuperAdminCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    status?: $Enums.SuperAdminStatus
    lastLoginAt?: Date | string | null
    failedAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuperAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    status?: EnumSuperAdminStatusFieldUpdateOperationsInput | $Enums.SuperAdminStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    status?: EnumSuperAdminStatusFieldUpdateOperationsInput | $Enums.SuperAdminStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSuperAdminCreateInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutSuperAdminsInput
    superAdmin: SuperAdminCreateNestedOneWithoutTenantsInput
  }

  export type TenantSuperAdminUncheckedCreateInput = {
    id?: string
    tenantId: string
    superAdminId: string
    role?: string
    createdAt?: Date | string
  }

  export type TenantSuperAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutSuperAdminsNestedInput
    superAdmin?: SuperAdminUpdateOneRequiredWithoutTenantsNestedInput
  }

  export type TenantSuperAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    superAdminId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSuperAdminCreateManyInput = {
    id?: string
    tenantId: string
    superAdminId: string
    role?: string
    createdAt?: Date | string
  }

  export type TenantSuperAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSuperAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    superAdminId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemAuditLogCreateInput = {
    id?: string
    superAdminId?: string | null
    tenantId?: string | null
    action: string
    entity: string
    entityId?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SystemAuditLogUncheckedCreateInput = {
    id?: string
    superAdminId?: string | null
    tenantId?: string | null
    action: string
    entity: string
    entityId?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SystemAuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    superAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemAuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    superAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemAuditLogCreateManyInput = {
    id?: string
    superAdminId?: string | null
    tenantId?: string | null
    action: string
    entity: string
    entityId?: string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SystemAuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    superAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemAuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    superAdminId?: NullableStringFieldUpdateOperationsInput | string | null
    tenantId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entity?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumTenantStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusFilter<$PrismaModel> | $Enums.TenantStatus
  }

  export type EnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TenantSuperAdminListRelationFilter = {
    every?: TenantSuperAdminWhereInput
    some?: TenantSuperAdminWhereInput
    none?: TenantSuperAdminWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TenantSuperAdminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    databaseName?: SortOrder
    databaseHost?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    logo?: SortOrder
    primaryColor?: SortOrder
    settings?: SortOrder
    maxUsers?: SortOrder
    maxProperties?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantAvgOrderByAggregateInput = {
    maxUsers?: SortOrder
    maxProperties?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    databaseName?: SortOrder
    databaseHost?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    logo?: SortOrder
    primaryColor?: SortOrder
    maxUsers?: SortOrder
    maxProperties?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    databaseName?: SortOrder
    databaseHost?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    logo?: SortOrder
    primaryColor?: SortOrder
    maxUsers?: SortOrder
    maxProperties?: SortOrder
    trialEndsAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TenantSumOrderByAggregateInput = {
    maxUsers?: SortOrder
    maxProperties?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumTenantStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel> | $Enums.TenantStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantStatusFilter<$PrismaModel>
    _max?: NestedEnumTenantStatusFilter<$PrismaModel>
  }

  export type EnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumSuperAdminStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminStatus | EnumSuperAdminStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminStatusFilter<$PrismaModel> | $Enums.SuperAdminStatus
  }

  export type SuperAdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrder
    failedAttempts?: SortOrder
    lockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuperAdminAvgOrderByAggregateInput = {
    failedAttempts?: SortOrder
  }

  export type SuperAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrder
    failedAttempts?: SortOrder
    lockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuperAdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    status?: SortOrder
    lastLoginAt?: SortOrder
    failedAttempts?: SortOrder
    lockedUntil?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuperAdminSumOrderByAggregateInput = {
    failedAttempts?: SortOrder
  }

  export type EnumSuperAdminStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminStatus | EnumSuperAdminStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminStatusWithAggregatesFilter<$PrismaModel> | $Enums.SuperAdminStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSuperAdminStatusFilter<$PrismaModel>
    _max?: NestedEnumSuperAdminStatusFilter<$PrismaModel>
  }

  export type TenantRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type SuperAdminRelationFilter = {
    is?: SuperAdminWhereInput
    isNot?: SuperAdminWhereInput
  }

  export type TenantSuperAdminTenantIdSuperAdminIdCompoundUniqueInput = {
    tenantId: string
    superAdminId: string
  }

  export type TenantSuperAdminCountOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    superAdminId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantSuperAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    superAdminId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantSuperAdminMinOrderByAggregateInput = {
    id?: SortOrder
    tenantId?: SortOrder
    superAdminId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    superAdminId?: SortOrder
    tenantId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    superAdminId?: SortOrder
    tenantId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SystemAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    superAdminId?: SortOrder
    tenantId?: SortOrder
    action?: SortOrder
    entity?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type TenantSuperAdminCreateNestedManyWithoutTenantInput = {
    create?: XOR<TenantSuperAdminCreateWithoutTenantInput, TenantSuperAdminUncheckedCreateWithoutTenantInput> | TenantSuperAdminCreateWithoutTenantInput[] | TenantSuperAdminUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutTenantInput | TenantSuperAdminCreateOrConnectWithoutTenantInput[]
    createMany?: TenantSuperAdminCreateManyTenantInputEnvelope
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
  }

  export type TenantSuperAdminUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<TenantSuperAdminCreateWithoutTenantInput, TenantSuperAdminUncheckedCreateWithoutTenantInput> | TenantSuperAdminCreateWithoutTenantInput[] | TenantSuperAdminUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutTenantInput | TenantSuperAdminCreateOrConnectWithoutTenantInput[]
    createMany?: TenantSuperAdminCreateManyTenantInputEnvelope
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumTenantStatusFieldUpdateOperationsInput = {
    set?: $Enums.TenantStatus
  }

  export type EnumPlanTypeFieldUpdateOperationsInput = {
    set?: $Enums.PlanType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TenantSuperAdminUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TenantSuperAdminCreateWithoutTenantInput, TenantSuperAdminUncheckedCreateWithoutTenantInput> | TenantSuperAdminCreateWithoutTenantInput[] | TenantSuperAdminUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutTenantInput | TenantSuperAdminCreateOrConnectWithoutTenantInput[]
    upsert?: TenantSuperAdminUpsertWithWhereUniqueWithoutTenantInput | TenantSuperAdminUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TenantSuperAdminCreateManyTenantInputEnvelope
    set?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    disconnect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    delete?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    update?: TenantSuperAdminUpdateWithWhereUniqueWithoutTenantInput | TenantSuperAdminUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TenantSuperAdminUpdateManyWithWhereWithoutTenantInput | TenantSuperAdminUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TenantSuperAdminScalarWhereInput | TenantSuperAdminScalarWhereInput[]
  }

  export type TenantSuperAdminUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<TenantSuperAdminCreateWithoutTenantInput, TenantSuperAdminUncheckedCreateWithoutTenantInput> | TenantSuperAdminCreateWithoutTenantInput[] | TenantSuperAdminUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutTenantInput | TenantSuperAdminCreateOrConnectWithoutTenantInput[]
    upsert?: TenantSuperAdminUpsertWithWhereUniqueWithoutTenantInput | TenantSuperAdminUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: TenantSuperAdminCreateManyTenantInputEnvelope
    set?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    disconnect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    delete?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    update?: TenantSuperAdminUpdateWithWhereUniqueWithoutTenantInput | TenantSuperAdminUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: TenantSuperAdminUpdateManyWithWhereWithoutTenantInput | TenantSuperAdminUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: TenantSuperAdminScalarWhereInput | TenantSuperAdminScalarWhereInput[]
  }

  export type TenantSuperAdminCreateNestedManyWithoutSuperAdminInput = {
    create?: XOR<TenantSuperAdminCreateWithoutSuperAdminInput, TenantSuperAdminUncheckedCreateWithoutSuperAdminInput> | TenantSuperAdminCreateWithoutSuperAdminInput[] | TenantSuperAdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutSuperAdminInput | TenantSuperAdminCreateOrConnectWithoutSuperAdminInput[]
    createMany?: TenantSuperAdminCreateManySuperAdminInputEnvelope
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
  }

  export type TenantSuperAdminUncheckedCreateNestedManyWithoutSuperAdminInput = {
    create?: XOR<TenantSuperAdminCreateWithoutSuperAdminInput, TenantSuperAdminUncheckedCreateWithoutSuperAdminInput> | TenantSuperAdminCreateWithoutSuperAdminInput[] | TenantSuperAdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutSuperAdminInput | TenantSuperAdminCreateOrConnectWithoutSuperAdminInput[]
    createMany?: TenantSuperAdminCreateManySuperAdminInputEnvelope
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
  }

  export type EnumSuperAdminStatusFieldUpdateOperationsInput = {
    set?: $Enums.SuperAdminStatus
  }

  export type TenantSuperAdminUpdateManyWithoutSuperAdminNestedInput = {
    create?: XOR<TenantSuperAdminCreateWithoutSuperAdminInput, TenantSuperAdminUncheckedCreateWithoutSuperAdminInput> | TenantSuperAdminCreateWithoutSuperAdminInput[] | TenantSuperAdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutSuperAdminInput | TenantSuperAdminCreateOrConnectWithoutSuperAdminInput[]
    upsert?: TenantSuperAdminUpsertWithWhereUniqueWithoutSuperAdminInput | TenantSuperAdminUpsertWithWhereUniqueWithoutSuperAdminInput[]
    createMany?: TenantSuperAdminCreateManySuperAdminInputEnvelope
    set?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    disconnect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    delete?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    update?: TenantSuperAdminUpdateWithWhereUniqueWithoutSuperAdminInput | TenantSuperAdminUpdateWithWhereUniqueWithoutSuperAdminInput[]
    updateMany?: TenantSuperAdminUpdateManyWithWhereWithoutSuperAdminInput | TenantSuperAdminUpdateManyWithWhereWithoutSuperAdminInput[]
    deleteMany?: TenantSuperAdminScalarWhereInput | TenantSuperAdminScalarWhereInput[]
  }

  export type TenantSuperAdminUncheckedUpdateManyWithoutSuperAdminNestedInput = {
    create?: XOR<TenantSuperAdminCreateWithoutSuperAdminInput, TenantSuperAdminUncheckedCreateWithoutSuperAdminInput> | TenantSuperAdminCreateWithoutSuperAdminInput[] | TenantSuperAdminUncheckedCreateWithoutSuperAdminInput[]
    connectOrCreate?: TenantSuperAdminCreateOrConnectWithoutSuperAdminInput | TenantSuperAdminCreateOrConnectWithoutSuperAdminInput[]
    upsert?: TenantSuperAdminUpsertWithWhereUniqueWithoutSuperAdminInput | TenantSuperAdminUpsertWithWhereUniqueWithoutSuperAdminInput[]
    createMany?: TenantSuperAdminCreateManySuperAdminInputEnvelope
    set?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    disconnect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    delete?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    connect?: TenantSuperAdminWhereUniqueInput | TenantSuperAdminWhereUniqueInput[]
    update?: TenantSuperAdminUpdateWithWhereUniqueWithoutSuperAdminInput | TenantSuperAdminUpdateWithWhereUniqueWithoutSuperAdminInput[]
    updateMany?: TenantSuperAdminUpdateManyWithWhereWithoutSuperAdminInput | TenantSuperAdminUpdateManyWithWhereWithoutSuperAdminInput[]
    deleteMany?: TenantSuperAdminScalarWhereInput | TenantSuperAdminScalarWhereInput[]
  }

  export type TenantCreateNestedOneWithoutSuperAdminsInput = {
    create?: XOR<TenantCreateWithoutSuperAdminsInput, TenantUncheckedCreateWithoutSuperAdminsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutSuperAdminsInput
    connect?: TenantWhereUniqueInput
  }

  export type SuperAdminCreateNestedOneWithoutTenantsInput = {
    create?: XOR<SuperAdminCreateWithoutTenantsInput, SuperAdminUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: SuperAdminCreateOrConnectWithoutTenantsInput
    connect?: SuperAdminWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutSuperAdminsNestedInput = {
    create?: XOR<TenantCreateWithoutSuperAdminsInput, TenantUncheckedCreateWithoutSuperAdminsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutSuperAdminsInput
    upsert?: TenantUpsertWithoutSuperAdminsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutSuperAdminsInput, TenantUpdateWithoutSuperAdminsInput>, TenantUncheckedUpdateWithoutSuperAdminsInput>
  }

  export type SuperAdminUpdateOneRequiredWithoutTenantsNestedInput = {
    create?: XOR<SuperAdminCreateWithoutTenantsInput, SuperAdminUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: SuperAdminCreateOrConnectWithoutTenantsInput
    upsert?: SuperAdminUpsertWithoutTenantsInput
    connect?: SuperAdminWhereUniqueInput
    update?: XOR<XOR<SuperAdminUpdateToOneWithWhereWithoutTenantsInput, SuperAdminUpdateWithoutTenantsInput>, SuperAdminUncheckedUpdateWithoutTenantsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumTenantStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusFilter<$PrismaModel> | $Enums.TenantStatus
  }

  export type NestedEnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TenantStatus | EnumTenantStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TenantStatus[] | ListEnumTenantStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTenantStatusWithAggregatesFilter<$PrismaModel> | $Enums.TenantStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTenantStatusFilter<$PrismaModel>
    _max?: NestedEnumTenantStatusFilter<$PrismaModel>
  }

  export type NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumSuperAdminStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminStatus | EnumSuperAdminStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminStatusFilter<$PrismaModel> | $Enums.SuperAdminStatus
  }

  export type NestedEnumSuperAdminStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SuperAdminStatus | EnumSuperAdminStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SuperAdminStatus[] | ListEnumSuperAdminStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSuperAdminStatusWithAggregatesFilter<$PrismaModel> | $Enums.SuperAdminStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSuperAdminStatusFilter<$PrismaModel>
    _max?: NestedEnumSuperAdminStatusFilter<$PrismaModel>
  }

  export type TenantSuperAdminCreateWithoutTenantInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    superAdmin: SuperAdminCreateNestedOneWithoutTenantsInput
  }

  export type TenantSuperAdminUncheckedCreateWithoutTenantInput = {
    id?: string
    superAdminId: string
    role?: string
    createdAt?: Date | string
  }

  export type TenantSuperAdminCreateOrConnectWithoutTenantInput = {
    where: TenantSuperAdminWhereUniqueInput
    create: XOR<TenantSuperAdminCreateWithoutTenantInput, TenantSuperAdminUncheckedCreateWithoutTenantInput>
  }

  export type TenantSuperAdminCreateManyTenantInputEnvelope = {
    data: TenantSuperAdminCreateManyTenantInput | TenantSuperAdminCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type TenantSuperAdminUpsertWithWhereUniqueWithoutTenantInput = {
    where: TenantSuperAdminWhereUniqueInput
    update: XOR<TenantSuperAdminUpdateWithoutTenantInput, TenantSuperAdminUncheckedUpdateWithoutTenantInput>
    create: XOR<TenantSuperAdminCreateWithoutTenantInput, TenantSuperAdminUncheckedCreateWithoutTenantInput>
  }

  export type TenantSuperAdminUpdateWithWhereUniqueWithoutTenantInput = {
    where: TenantSuperAdminWhereUniqueInput
    data: XOR<TenantSuperAdminUpdateWithoutTenantInput, TenantSuperAdminUncheckedUpdateWithoutTenantInput>
  }

  export type TenantSuperAdminUpdateManyWithWhereWithoutTenantInput = {
    where: TenantSuperAdminScalarWhereInput
    data: XOR<TenantSuperAdminUpdateManyMutationInput, TenantSuperAdminUncheckedUpdateManyWithoutTenantInput>
  }

  export type TenantSuperAdminScalarWhereInput = {
    AND?: TenantSuperAdminScalarWhereInput | TenantSuperAdminScalarWhereInput[]
    OR?: TenantSuperAdminScalarWhereInput[]
    NOT?: TenantSuperAdminScalarWhereInput | TenantSuperAdminScalarWhereInput[]
    id?: StringFilter<"TenantSuperAdmin"> | string
    tenantId?: StringFilter<"TenantSuperAdmin"> | string
    superAdminId?: StringFilter<"TenantSuperAdmin"> | string
    role?: StringFilter<"TenantSuperAdmin"> | string
    createdAt?: DateTimeFilter<"TenantSuperAdmin"> | Date | string
  }

  export type TenantSuperAdminCreateWithoutSuperAdminInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutSuperAdminsInput
  }

  export type TenantSuperAdminUncheckedCreateWithoutSuperAdminInput = {
    id?: string
    tenantId: string
    role?: string
    createdAt?: Date | string
  }

  export type TenantSuperAdminCreateOrConnectWithoutSuperAdminInput = {
    where: TenantSuperAdminWhereUniqueInput
    create: XOR<TenantSuperAdminCreateWithoutSuperAdminInput, TenantSuperAdminUncheckedCreateWithoutSuperAdminInput>
  }

  export type TenantSuperAdminCreateManySuperAdminInputEnvelope = {
    data: TenantSuperAdminCreateManySuperAdminInput | TenantSuperAdminCreateManySuperAdminInput[]
    skipDuplicates?: boolean
  }

  export type TenantSuperAdminUpsertWithWhereUniqueWithoutSuperAdminInput = {
    where: TenantSuperAdminWhereUniqueInput
    update: XOR<TenantSuperAdminUpdateWithoutSuperAdminInput, TenantSuperAdminUncheckedUpdateWithoutSuperAdminInput>
    create: XOR<TenantSuperAdminCreateWithoutSuperAdminInput, TenantSuperAdminUncheckedCreateWithoutSuperAdminInput>
  }

  export type TenantSuperAdminUpdateWithWhereUniqueWithoutSuperAdminInput = {
    where: TenantSuperAdminWhereUniqueInput
    data: XOR<TenantSuperAdminUpdateWithoutSuperAdminInput, TenantSuperAdminUncheckedUpdateWithoutSuperAdminInput>
  }

  export type TenantSuperAdminUpdateManyWithWhereWithoutSuperAdminInput = {
    where: TenantSuperAdminScalarWhereInput
    data: XOR<TenantSuperAdminUpdateManyMutationInput, TenantSuperAdminUncheckedUpdateManyWithoutSuperAdminInput>
  }

  export type TenantCreateWithoutSuperAdminsInput = {
    id?: string
    name: string
    slug: string
    databaseName: string
    databaseHost?: string
    status?: $Enums.TenantStatus
    plan?: $Enums.PlanType
    email?: string | null
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    logo?: string | null
    primaryColor?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: number
    maxProperties?: number
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantUncheckedCreateWithoutSuperAdminsInput = {
    id?: string
    name: string
    slug: string
    databaseName: string
    databaseHost?: string
    status?: $Enums.TenantStatus
    plan?: $Enums.PlanType
    email?: string | null
    phone?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    logo?: string | null
    primaryColor?: string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: number
    maxProperties?: number
    trialEndsAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TenantCreateOrConnectWithoutSuperAdminsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutSuperAdminsInput, TenantUncheckedCreateWithoutSuperAdminsInput>
  }

  export type SuperAdminCreateWithoutTenantsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    status?: $Enums.SuperAdminStatus
    lastLoginAt?: Date | string | null
    failedAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuperAdminUncheckedCreateWithoutTenantsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    status?: $Enums.SuperAdminStatus
    lastLoginAt?: Date | string | null
    failedAttempts?: number
    lockedUntil?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuperAdminCreateOrConnectWithoutTenantsInput = {
    where: SuperAdminWhereUniqueInput
    create: XOR<SuperAdminCreateWithoutTenantsInput, SuperAdminUncheckedCreateWithoutTenantsInput>
  }

  export type TenantUpsertWithoutSuperAdminsInput = {
    update: XOR<TenantUpdateWithoutSuperAdminsInput, TenantUncheckedUpdateWithoutSuperAdminsInput>
    create: XOR<TenantCreateWithoutSuperAdminsInput, TenantUncheckedCreateWithoutSuperAdminsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutSuperAdminsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutSuperAdminsInput, TenantUncheckedUpdateWithoutSuperAdminsInput>
  }

  export type TenantUpdateWithoutSuperAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseHost?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    plan?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: IntFieldUpdateOperationsInput | number
    maxProperties?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantUncheckedUpdateWithoutSuperAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    databaseName?: StringFieldUpdateOperationsInput | string
    databaseHost?: StringFieldUpdateOperationsInput | string
    status?: EnumTenantStatusFieldUpdateOperationsInput | $Enums.TenantStatus
    plan?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    settings?: NullableJsonNullValueInput | InputJsonValue
    maxUsers?: IntFieldUpdateOperationsInput | number
    maxProperties?: IntFieldUpdateOperationsInput | number
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminUpsertWithoutTenantsInput = {
    update: XOR<SuperAdminUpdateWithoutTenantsInput, SuperAdminUncheckedUpdateWithoutTenantsInput>
    create: XOR<SuperAdminCreateWithoutTenantsInput, SuperAdminUncheckedCreateWithoutTenantsInput>
    where?: SuperAdminWhereInput
  }

  export type SuperAdminUpdateToOneWithWhereWithoutTenantsInput = {
    where?: SuperAdminWhereInput
    data: XOR<SuperAdminUpdateWithoutTenantsInput, SuperAdminUncheckedUpdateWithoutTenantsInput>
  }

  export type SuperAdminUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    status?: EnumSuperAdminStatusFieldUpdateOperationsInput | $Enums.SuperAdminStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuperAdminUncheckedUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    status?: EnumSuperAdminStatusFieldUpdateOperationsInput | $Enums.SuperAdminStatus
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failedAttempts?: IntFieldUpdateOperationsInput | number
    lockedUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSuperAdminCreateManyTenantInput = {
    id?: string
    superAdminId: string
    role?: string
    createdAt?: Date | string
  }

  export type TenantSuperAdminUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    superAdmin?: SuperAdminUpdateOneRequiredWithoutTenantsNestedInput
  }

  export type TenantSuperAdminUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    superAdminId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSuperAdminUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    superAdminId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSuperAdminCreateManySuperAdminInput = {
    id?: string
    tenantId: string
    role?: string
    createdAt?: Date | string
  }

  export type TenantSuperAdminUpdateWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutSuperAdminsNestedInput
  }

  export type TenantSuperAdminUncheckedUpdateWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantSuperAdminUncheckedUpdateManyWithoutSuperAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenantId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TenantCountOutputTypeDefaultArgs instead
     */
    export type TenantCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SuperAdminCountOutputTypeDefaultArgs instead
     */
    export type SuperAdminCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SuperAdminCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantDefaultArgs instead
     */
    export type TenantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SuperAdminDefaultArgs instead
     */
    export type SuperAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SuperAdminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TenantSuperAdminDefaultArgs instead
     */
    export type TenantSuperAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TenantSuperAdminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemAuditLogDefaultArgs instead
     */
    export type SystemAuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemAuditLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}