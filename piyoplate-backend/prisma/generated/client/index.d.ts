
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
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model recipes
 * 
 */
export type recipes = $Result.DefaultSelection<Prisma.$recipesPayload>
/**
 * Model nutrition_logs
 * 
 */
export type nutrition_logs = $Result.DefaultSelection<Prisma.$nutrition_logsPayload>
/**
 * Model reviews
 * 
 */
export type reviews = $Result.DefaultSelection<Prisma.$reviewsPayload>
/**
 * Model bookmarks
 * 
 */
export type bookmarks = $Result.DefaultSelection<Prisma.$bookmarksPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const users_role: {
  admin: 'admin',
  user: 'user'
};

export type users_role = (typeof users_role)[keyof typeof users_role]

}

export type users_role = $Enums.users_role

export const users_role: typeof $Enums.users_role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recipes`: Exposes CRUD operations for the **recipes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recipes
    * const recipes = await prisma.recipes.findMany()
    * ```
    */
  get recipes(): Prisma.recipesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.nutrition_logs`: Exposes CRUD operations for the **nutrition_logs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nutrition_logs
    * const nutrition_logs = await prisma.nutrition_logs.findMany()
    * ```
    */
  get nutrition_logs(): Prisma.nutrition_logsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reviews`: Exposes CRUD operations for the **reviews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.reviews.findMany()
    * ```
    */
  get reviews(): Prisma.reviewsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookmarks`: Exposes CRUD operations for the **bookmarks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookmarks
    * const bookmarks = await prisma.bookmarks.findMany()
    * ```
    */
  get bookmarks(): Prisma.bookmarksDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    users: 'users',
    recipes: 'recipes',
    nutrition_logs: 'nutrition_logs',
    reviews: 'reviews',
    bookmarks: 'bookmarks'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "recipes" | "nutrition_logs" | "reviews" | "bookmarks"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      recipes: {
        payload: Prisma.$recipesPayload<ExtArgs>
        fields: Prisma.recipesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.recipesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.recipesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>
          }
          findFirst: {
            args: Prisma.recipesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.recipesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>
          }
          findMany: {
            args: Prisma.recipesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>[]
          }
          create: {
            args: Prisma.recipesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>
          }
          createMany: {
            args: Prisma.recipesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.recipesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>[]
          }
          delete: {
            args: Prisma.recipesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>
          }
          update: {
            args: Prisma.recipesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>
          }
          deleteMany: {
            args: Prisma.recipesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.recipesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.recipesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>[]
          }
          upsert: {
            args: Prisma.recipesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$recipesPayload>
          }
          aggregate: {
            args: Prisma.RecipesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecipes>
          }
          groupBy: {
            args: Prisma.recipesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecipesGroupByOutputType>[]
          }
          count: {
            args: Prisma.recipesCountArgs<ExtArgs>
            result: $Utils.Optional<RecipesCountAggregateOutputType> | number
          }
        }
      }
      nutrition_logs: {
        payload: Prisma.$nutrition_logsPayload<ExtArgs>
        fields: Prisma.nutrition_logsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.nutrition_logsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.nutrition_logsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>
          }
          findFirst: {
            args: Prisma.nutrition_logsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.nutrition_logsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>
          }
          findMany: {
            args: Prisma.nutrition_logsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>[]
          }
          create: {
            args: Prisma.nutrition_logsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>
          }
          createMany: {
            args: Prisma.nutrition_logsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.nutrition_logsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>[]
          }
          delete: {
            args: Prisma.nutrition_logsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>
          }
          update: {
            args: Prisma.nutrition_logsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>
          }
          deleteMany: {
            args: Prisma.nutrition_logsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.nutrition_logsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.nutrition_logsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>[]
          }
          upsert: {
            args: Prisma.nutrition_logsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$nutrition_logsPayload>
          }
          aggregate: {
            args: Prisma.Nutrition_logsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNutrition_logs>
          }
          groupBy: {
            args: Prisma.nutrition_logsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Nutrition_logsGroupByOutputType>[]
          }
          count: {
            args: Prisma.nutrition_logsCountArgs<ExtArgs>
            result: $Utils.Optional<Nutrition_logsCountAggregateOutputType> | number
          }
        }
      }
      reviews: {
        payload: Prisma.$reviewsPayload<ExtArgs>
        fields: Prisma.reviewsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reviewsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reviewsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findFirst: {
            args: Prisma.reviewsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reviewsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findMany: {
            args: Prisma.reviewsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          create: {
            args: Prisma.reviewsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          createMany: {
            args: Prisma.reviewsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reviewsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          delete: {
            args: Prisma.reviewsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          update: {
            args: Prisma.reviewsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          deleteMany: {
            args: Prisma.reviewsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reviewsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.reviewsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          upsert: {
            args: Prisma.reviewsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          aggregate: {
            args: Prisma.ReviewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReviews>
          }
          groupBy: {
            args: Prisma.reviewsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.reviewsCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewsCountAggregateOutputType> | number
          }
        }
      }
      bookmarks: {
        payload: Prisma.$bookmarksPayload<ExtArgs>
        fields: Prisma.bookmarksFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bookmarksFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bookmarksFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          findFirst: {
            args: Prisma.bookmarksFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bookmarksFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          findMany: {
            args: Prisma.bookmarksFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>[]
          }
          create: {
            args: Prisma.bookmarksCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          createMany: {
            args: Prisma.bookmarksCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bookmarksCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>[]
          }
          delete: {
            args: Prisma.bookmarksDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          update: {
            args: Prisma.bookmarksUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          deleteMany: {
            args: Prisma.bookmarksDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bookmarksUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bookmarksUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>[]
          }
          upsert: {
            args: Prisma.bookmarksUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookmarksPayload>
          }
          aggregate: {
            args: Prisma.BookmarksAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookmarks>
          }
          groupBy: {
            args: Prisma.bookmarksGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookmarksGroupByOutputType>[]
          }
          count: {
            args: Prisma.bookmarksCountArgs<ExtArgs>
            result: $Utils.Optional<BookmarksCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    recipes?: recipesOmit
    nutrition_logs?: nutrition_logsOmit
    reviews?: reviewsOmit
    bookmarks?: bookmarksOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    recipes: number
    nutrition_logs: number
    reviews: number
    bookmarks: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | UsersCountOutputTypeCountRecipesArgs
    nutrition_logs?: boolean | UsersCountOutputTypeCountNutrition_logsArgs
    reviews?: boolean | UsersCountOutputTypeCountReviewsArgs
    bookmarks?: boolean | UsersCountOutputTypeCountBookmarksArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountRecipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: recipesWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountNutrition_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: nutrition_logsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookmarksWhereInput
  }


  /**
   * Count Type RecipesCountOutputType
   */

  export type RecipesCountOutputType = {
    reviews: number
    bookmarks: number
    nutrition_logs: number
  }

  export type RecipesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | RecipesCountOutputTypeCountReviewsArgs
    bookmarks?: boolean | RecipesCountOutputTypeCountBookmarksArgs
    nutrition_logs?: boolean | RecipesCountOutputTypeCountNutrition_logsArgs
  }

  // Custom InputTypes
  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RecipesCountOutputType
     */
    select?: RecipesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountBookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookmarksWhereInput
  }

  /**
   * RecipesCountOutputType without action
   */
  export type RecipesCountOutputTypeCountNutrition_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: nutrition_logsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
    daily_calorie_goal: number | null
    weight: number | null
    height: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
    daily_calorie_goal: number | null
    weight: number | null
    height: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    full_name: string | null
    profile_picture_url: string | null
    daily_calorie_goal: number | null
    weight: number | null
    height: number | null
    role: $Enums.users_role | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    password: string | null
    full_name: string | null
    profile_picture_url: string | null
    daily_calorie_goal: number | null
    weight: number | null
    height: number | null
    role: $Enums.users_role | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    full_name: number
    profile_picture_url: number
    daily_calorie_goal: number
    weight: number
    height: number
    role: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
    daily_calorie_goal?: true
    weight?: true
    height?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
    daily_calorie_goal?: true
    weight?: true
    height?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    full_name?: true
    profile_picture_url?: true
    daily_calorie_goal?: true
    weight?: true
    height?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    full_name?: true
    profile_picture_url?: true
    daily_calorie_goal?: true
    weight?: true
    height?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    full_name?: true
    profile_picture_url?: true
    daily_calorie_goal?: true
    weight?: true
    height?: true
    role?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    username: string
    email: string
    password: string
    full_name: string | null
    profile_picture_url: string | null
    daily_calorie_goal: number
    weight: number | null
    height: number | null
    role: $Enums.users_role
    created_at: Date
    updated_at: Date
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    daily_calorie_goal?: boolean
    weight?: boolean
    height?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    recipes?: boolean | users$recipesArgs<ExtArgs>
    nutrition_logs?: boolean | users$nutrition_logsArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    bookmarks?: boolean | users$bookmarksArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    daily_calorie_goal?: boolean
    weight?: boolean
    height?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    daily_calorie_goal?: boolean
    weight?: boolean
    height?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    full_name?: boolean
    profile_picture_url?: boolean
    daily_calorie_goal?: boolean
    weight?: boolean
    height?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "full_name" | "profile_picture_url" | "daily_calorie_goal" | "weight" | "height" | "role" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipes?: boolean | users$recipesArgs<ExtArgs>
    nutrition_logs?: boolean | users$nutrition_logsArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    bookmarks?: boolean | users$bookmarksArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      recipes: Prisma.$recipesPayload<ExtArgs>[]
      nutrition_logs: Prisma.$nutrition_logsPayload<ExtArgs>[]
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
      bookmarks: Prisma.$bookmarksPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      password: string
      full_name: string | null
      profile_picture_url: string | null
      daily_calorie_goal: number
      weight: number | null
      height: number | null
      role: $Enums.users_role
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
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
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipes<T extends users$recipesArgs<ExtArgs> = {}>(args?: Subset<T, users$recipesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nutrition_logs<T extends users$nutrition_logsArgs<ExtArgs> = {}>(args?: Subset<T, users$nutrition_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends users$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, users$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends users$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, users$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly username: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly full_name: FieldRef<"users", 'String'>
    readonly profile_picture_url: FieldRef<"users", 'String'>
    readonly daily_calorie_goal: FieldRef<"users", 'Int'>
    readonly weight: FieldRef<"users", 'Float'>
    readonly height: FieldRef<"users", 'Float'>
    readonly role: FieldRef<"users", 'users_role'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.recipes
   */
  export type users$recipesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    where?: recipesWhereInput
    orderBy?: recipesOrderByWithRelationInput | recipesOrderByWithRelationInput[]
    cursor?: recipesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
  }

  /**
   * users.nutrition_logs
   */
  export type users$nutrition_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    where?: nutrition_logsWhereInput
    orderBy?: nutrition_logsOrderByWithRelationInput | nutrition_logsOrderByWithRelationInput[]
    cursor?: nutrition_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Nutrition_logsScalarFieldEnum | Nutrition_logsScalarFieldEnum[]
  }

  /**
   * users.reviews
   */
  export type users$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * users.bookmarks
   */
  export type users$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    where?: bookmarksWhereInput
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    cursor?: bookmarksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model recipes
   */

  export type AggregateRecipes = {
    _count: RecipesCountAggregateOutputType | null
    _avg: RecipesAvgAggregateOutputType | null
    _sum: RecipesSumAggregateOutputType | null
    _min: RecipesMinAggregateOutputType | null
    _max: RecipesMaxAggregateOutputType | null
  }

  export type RecipesAvgAggregateOutputType = {
    id: number | null
    author_id: number | null
    calories_per_serving: number | null
    cook_time_minutes: number | null
  }

  export type RecipesSumAggregateOutputType = {
    id: number | null
    author_id: number | null
    calories_per_serving: number | null
    cook_time_minutes: number | null
  }

  export type RecipesMinAggregateOutputType = {
    id: number | null
    author_id: number | null
    title: string | null
    cuisine_type: string | null
    description: string | null
    calories_per_serving: number | null
    cook_time_minutes: number | null
    ingredients: string | null
    instructions: string | null
    image_url: string | null
    video_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RecipesMaxAggregateOutputType = {
    id: number | null
    author_id: number | null
    title: string | null
    cuisine_type: string | null
    description: string | null
    calories_per_serving: number | null
    cook_time_minutes: number | null
    ingredients: string | null
    instructions: string | null
    image_url: string | null
    video_url: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type RecipesCountAggregateOutputType = {
    id: number
    author_id: number
    title: number
    cuisine_type: number
    description: number
    calories_per_serving: number
    cook_time_minutes: number
    ingredients: number
    instructions: number
    image_url: number
    video_url: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type RecipesAvgAggregateInputType = {
    id?: true
    author_id?: true
    calories_per_serving?: true
    cook_time_minutes?: true
  }

  export type RecipesSumAggregateInputType = {
    id?: true
    author_id?: true
    calories_per_serving?: true
    cook_time_minutes?: true
  }

  export type RecipesMinAggregateInputType = {
    id?: true
    author_id?: true
    title?: true
    cuisine_type?: true
    description?: true
    calories_per_serving?: true
    cook_time_minutes?: true
    ingredients?: true
    instructions?: true
    image_url?: true
    video_url?: true
    created_at?: true
    updated_at?: true
  }

  export type RecipesMaxAggregateInputType = {
    id?: true
    author_id?: true
    title?: true
    cuisine_type?: true
    description?: true
    calories_per_serving?: true
    cook_time_minutes?: true
    ingredients?: true
    instructions?: true
    image_url?: true
    video_url?: true
    created_at?: true
    updated_at?: true
  }

  export type RecipesCountAggregateInputType = {
    id?: true
    author_id?: true
    title?: true
    cuisine_type?: true
    description?: true
    calories_per_serving?: true
    cook_time_minutes?: true
    ingredients?: true
    instructions?: true
    image_url?: true
    video_url?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type RecipesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which recipes to aggregate.
     */
    where?: recipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipes to fetch.
     */
    orderBy?: recipesOrderByWithRelationInput | recipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: recipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned recipes
    **/
    _count?: true | RecipesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RecipesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RecipesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecipesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecipesMaxAggregateInputType
  }

  export type GetRecipesAggregateType<T extends RecipesAggregateArgs> = {
        [P in keyof T & keyof AggregateRecipes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecipes[P]>
      : GetScalarType<T[P], AggregateRecipes[P]>
  }




  export type recipesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: recipesWhereInput
    orderBy?: recipesOrderByWithAggregationInput | recipesOrderByWithAggregationInput[]
    by: RecipesScalarFieldEnum[] | RecipesScalarFieldEnum
    having?: recipesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecipesCountAggregateInputType | true
    _avg?: RecipesAvgAggregateInputType
    _sum?: RecipesSumAggregateInputType
    _min?: RecipesMinAggregateInputType
    _max?: RecipesMaxAggregateInputType
  }

  export type RecipesGroupByOutputType = {
    id: number
    author_id: number
    title: string
    cuisine_type: string | null
    description: string | null
    calories_per_serving: number
    cook_time_minutes: number | null
    ingredients: string
    instructions: string
    image_url: string | null
    video_url: string | null
    created_at: Date
    updated_at: Date
    _count: RecipesCountAggregateOutputType | null
    _avg: RecipesAvgAggregateOutputType | null
    _sum: RecipesSumAggregateOutputType | null
    _min: RecipesMinAggregateOutputType | null
    _max: RecipesMaxAggregateOutputType | null
  }

  type GetRecipesGroupByPayload<T extends recipesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecipesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecipesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecipesGroupByOutputType[P]>
            : GetScalarType<T[P], RecipesGroupByOutputType[P]>
        }
      >
    >


  export type recipesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    title?: boolean
    cuisine_type?: boolean
    description?: boolean
    calories_per_serving?: boolean
    cook_time_minutes?: boolean
    ingredients?: boolean
    instructions?: boolean
    image_url?: boolean
    video_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    author?: boolean | usersDefaultArgs<ExtArgs>
    reviews?: boolean | recipes$reviewsArgs<ExtArgs>
    bookmarks?: boolean | recipes$bookmarksArgs<ExtArgs>
    nutrition_logs?: boolean | recipes$nutrition_logsArgs<ExtArgs>
    _count?: boolean | RecipesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipes"]>

  export type recipesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    title?: boolean
    cuisine_type?: boolean
    description?: boolean
    calories_per_serving?: boolean
    cook_time_minutes?: boolean
    ingredients?: boolean
    instructions?: boolean
    image_url?: boolean
    video_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    author?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipes"]>

  export type recipesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author_id?: boolean
    title?: boolean
    cuisine_type?: boolean
    description?: boolean
    calories_per_serving?: boolean
    cook_time_minutes?: boolean
    ingredients?: boolean
    instructions?: boolean
    image_url?: boolean
    video_url?: boolean
    created_at?: boolean
    updated_at?: boolean
    author?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recipes"]>

  export type recipesSelectScalar = {
    id?: boolean
    author_id?: boolean
    title?: boolean
    cuisine_type?: boolean
    description?: boolean
    calories_per_serving?: boolean
    cook_time_minutes?: boolean
    ingredients?: boolean
    instructions?: boolean
    image_url?: boolean
    video_url?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type recipesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "author_id" | "title" | "cuisine_type" | "description" | "calories_per_serving" | "cook_time_minutes" | "ingredients" | "instructions" | "image_url" | "video_url" | "created_at" | "updated_at", ExtArgs["result"]["recipes"]>
  export type recipesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | usersDefaultArgs<ExtArgs>
    reviews?: boolean | recipes$reviewsArgs<ExtArgs>
    bookmarks?: boolean | recipes$bookmarksArgs<ExtArgs>
    nutrition_logs?: boolean | recipes$nutrition_logsArgs<ExtArgs>
    _count?: boolean | RecipesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type recipesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type recipesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $recipesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "recipes"
    objects: {
      author: Prisma.$usersPayload<ExtArgs>
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
      bookmarks: Prisma.$bookmarksPayload<ExtArgs>[]
      nutrition_logs: Prisma.$nutrition_logsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      author_id: number
      title: string
      cuisine_type: string | null
      description: string | null
      calories_per_serving: number
      cook_time_minutes: number | null
      ingredients: string
      instructions: string
      image_url: string | null
      video_url: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["recipes"]>
    composites: {}
  }

  type recipesGetPayload<S extends boolean | null | undefined | recipesDefaultArgs> = $Result.GetResult<Prisma.$recipesPayload, S>

  type recipesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<recipesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecipesCountAggregateInputType | true
    }

  export interface recipesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['recipes'], meta: { name: 'recipes' } }
    /**
     * Find zero or one Recipes that matches the filter.
     * @param {recipesFindUniqueArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends recipesFindUniqueArgs>(args: SelectSubset<T, recipesFindUniqueArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recipes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {recipesFindUniqueOrThrowArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends recipesFindUniqueOrThrowArgs>(args: SelectSubset<T, recipesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipesFindFirstArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends recipesFindFirstArgs>(args?: SelectSubset<T, recipesFindFirstArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recipes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipesFindFirstOrThrowArgs} args - Arguments to find a Recipes
     * @example
     * // Get one Recipes
     * const recipes = await prisma.recipes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends recipesFindFirstOrThrowArgs>(args?: SelectSubset<T, recipesFindFirstOrThrowArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recipes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recipes
     * const recipes = await prisma.recipes.findMany()
     * 
     * // Get first 10 Recipes
     * const recipes = await prisma.recipes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recipesWithIdOnly = await prisma.recipes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends recipesFindManyArgs>(args?: SelectSubset<T, recipesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recipes.
     * @param {recipesCreateArgs} args - Arguments to create a Recipes.
     * @example
     * // Create one Recipes
     * const Recipes = await prisma.recipes.create({
     *   data: {
     *     // ... data to create a Recipes
     *   }
     * })
     * 
     */
    create<T extends recipesCreateArgs>(args: SelectSubset<T, recipesCreateArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recipes.
     * @param {recipesCreateManyArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipes = await prisma.recipes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends recipesCreateManyArgs>(args?: SelectSubset<T, recipesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recipes and returns the data saved in the database.
     * @param {recipesCreateManyAndReturnArgs} args - Arguments to create many Recipes.
     * @example
     * // Create many Recipes
     * const recipes = await prisma.recipes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recipes and only return the `id`
     * const recipesWithIdOnly = await prisma.recipes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends recipesCreateManyAndReturnArgs>(args?: SelectSubset<T, recipesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recipes.
     * @param {recipesDeleteArgs} args - Arguments to delete one Recipes.
     * @example
     * // Delete one Recipes
     * const Recipes = await prisma.recipes.delete({
     *   where: {
     *     // ... filter to delete one Recipes
     *   }
     * })
     * 
     */
    delete<T extends recipesDeleteArgs>(args: SelectSubset<T, recipesDeleteArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recipes.
     * @param {recipesUpdateArgs} args - Arguments to update one Recipes.
     * @example
     * // Update one Recipes
     * const recipes = await prisma.recipes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends recipesUpdateArgs>(args: SelectSubset<T, recipesUpdateArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recipes.
     * @param {recipesDeleteManyArgs} args - Arguments to filter Recipes to delete.
     * @example
     * // Delete a few Recipes
     * const { count } = await prisma.recipes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends recipesDeleteManyArgs>(args?: SelectSubset<T, recipesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recipes
     * const recipes = await prisma.recipes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends recipesUpdateManyArgs>(args: SelectSubset<T, recipesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recipes and returns the data updated in the database.
     * @param {recipesUpdateManyAndReturnArgs} args - Arguments to update many Recipes.
     * @example
     * // Update many Recipes
     * const recipes = await prisma.recipes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recipes and only return the `id`
     * const recipesWithIdOnly = await prisma.recipes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends recipesUpdateManyAndReturnArgs>(args: SelectSubset<T, recipesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recipes.
     * @param {recipesUpsertArgs} args - Arguments to update or create a Recipes.
     * @example
     * // Update or create a Recipes
     * const recipes = await prisma.recipes.upsert({
     *   create: {
     *     // ... data to create a Recipes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recipes we want to update
     *   }
     * })
     */
    upsert<T extends recipesUpsertArgs>(args: SelectSubset<T, recipesUpsertArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipesCountArgs} args - Arguments to filter Recipes to count.
     * @example
     * // Count the number of Recipes
     * const count = await prisma.recipes.count({
     *   where: {
     *     // ... the filter for the Recipes we want to count
     *   }
     * })
    **/
    count<T extends recipesCountArgs>(
      args?: Subset<T, recipesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecipesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecipesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RecipesAggregateArgs>(args: Subset<T, RecipesAggregateArgs>): Prisma.PrismaPromise<GetRecipesAggregateType<T>>

    /**
     * Group by Recipes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {recipesGroupByArgs} args - Group by arguments.
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
      T extends recipesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: recipesGroupByArgs['orderBy'] }
        : { orderBy?: recipesGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, recipesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecipesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the recipes model
   */
  readonly fields: recipesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for recipes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__recipesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviews<T extends recipes$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, recipes$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    bookmarks<T extends recipes$bookmarksArgs<ExtArgs> = {}>(args?: Subset<T, recipes$bookmarksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    nutrition_logs<T extends recipes$nutrition_logsArgs<ExtArgs> = {}>(args?: Subset<T, recipes$nutrition_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the recipes model
   */
  interface recipesFieldRefs {
    readonly id: FieldRef<"recipes", 'Int'>
    readonly author_id: FieldRef<"recipes", 'Int'>
    readonly title: FieldRef<"recipes", 'String'>
    readonly cuisine_type: FieldRef<"recipes", 'String'>
    readonly description: FieldRef<"recipes", 'String'>
    readonly calories_per_serving: FieldRef<"recipes", 'Int'>
    readonly cook_time_minutes: FieldRef<"recipes", 'Int'>
    readonly ingredients: FieldRef<"recipes", 'String'>
    readonly instructions: FieldRef<"recipes", 'String'>
    readonly image_url: FieldRef<"recipes", 'String'>
    readonly video_url: FieldRef<"recipes", 'String'>
    readonly created_at: FieldRef<"recipes", 'DateTime'>
    readonly updated_at: FieldRef<"recipes", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * recipes findUnique
   */
  export type recipesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * Filter, which recipes to fetch.
     */
    where: recipesWhereUniqueInput
  }

  /**
   * recipes findUniqueOrThrow
   */
  export type recipesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * Filter, which recipes to fetch.
     */
    where: recipesWhereUniqueInput
  }

  /**
   * recipes findFirst
   */
  export type recipesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * Filter, which recipes to fetch.
     */
    where?: recipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipes to fetch.
     */
    orderBy?: recipesOrderByWithRelationInput | recipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for recipes.
     */
    cursor?: recipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of recipes.
     */
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
  }

  /**
   * recipes findFirstOrThrow
   */
  export type recipesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * Filter, which recipes to fetch.
     */
    where?: recipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipes to fetch.
     */
    orderBy?: recipesOrderByWithRelationInput | recipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for recipes.
     */
    cursor?: recipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of recipes.
     */
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
  }

  /**
   * recipes findMany
   */
  export type recipesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * Filter, which recipes to fetch.
     */
    where?: recipesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of recipes to fetch.
     */
    orderBy?: recipesOrderByWithRelationInput | recipesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing recipes.
     */
    cursor?: recipesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` recipes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` recipes.
     */
    skip?: number
    distinct?: RecipesScalarFieldEnum | RecipesScalarFieldEnum[]
  }

  /**
   * recipes create
   */
  export type recipesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * The data needed to create a recipes.
     */
    data: XOR<recipesCreateInput, recipesUncheckedCreateInput>
  }

  /**
   * recipes createMany
   */
  export type recipesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many recipes.
     */
    data: recipesCreateManyInput | recipesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * recipes createManyAndReturn
   */
  export type recipesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * The data used to create many recipes.
     */
    data: recipesCreateManyInput | recipesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * recipes update
   */
  export type recipesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * The data needed to update a recipes.
     */
    data: XOR<recipesUpdateInput, recipesUncheckedUpdateInput>
    /**
     * Choose, which recipes to update.
     */
    where: recipesWhereUniqueInput
  }

  /**
   * recipes updateMany
   */
  export type recipesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update recipes.
     */
    data: XOR<recipesUpdateManyMutationInput, recipesUncheckedUpdateManyInput>
    /**
     * Filter which recipes to update
     */
    where?: recipesWhereInput
    /**
     * Limit how many recipes to update.
     */
    limit?: number
  }

  /**
   * recipes updateManyAndReturn
   */
  export type recipesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * The data used to update recipes.
     */
    data: XOR<recipesUpdateManyMutationInput, recipesUncheckedUpdateManyInput>
    /**
     * Filter which recipes to update
     */
    where?: recipesWhereInput
    /**
     * Limit how many recipes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * recipes upsert
   */
  export type recipesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * The filter to search for the recipes to update in case it exists.
     */
    where: recipesWhereUniqueInput
    /**
     * In case the recipes found by the `where` argument doesn't exist, create a new recipes with this data.
     */
    create: XOR<recipesCreateInput, recipesUncheckedCreateInput>
    /**
     * In case the recipes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<recipesUpdateInput, recipesUncheckedUpdateInput>
  }

  /**
   * recipes delete
   */
  export type recipesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    /**
     * Filter which recipes to delete.
     */
    where: recipesWhereUniqueInput
  }

  /**
   * recipes deleteMany
   */
  export type recipesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which recipes to delete
     */
    where?: recipesWhereInput
    /**
     * Limit how many recipes to delete.
     */
    limit?: number
  }

  /**
   * recipes.reviews
   */
  export type recipes$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * recipes.bookmarks
   */
  export type recipes$bookmarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    where?: bookmarksWhereInput
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    cursor?: bookmarksWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * recipes.nutrition_logs
   */
  export type recipes$nutrition_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    where?: nutrition_logsWhereInput
    orderBy?: nutrition_logsOrderByWithRelationInput | nutrition_logsOrderByWithRelationInput[]
    cursor?: nutrition_logsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Nutrition_logsScalarFieldEnum | Nutrition_logsScalarFieldEnum[]
  }

  /**
   * recipes without action
   */
  export type recipesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
  }


  /**
   * Model nutrition_logs
   */

  export type AggregateNutrition_logs = {
    _count: Nutrition_logsCountAggregateOutputType | null
    _avg: Nutrition_logsAvgAggregateOutputType | null
    _sum: Nutrition_logsSumAggregateOutputType | null
    _min: Nutrition_logsMinAggregateOutputType | null
    _max: Nutrition_logsMaxAggregateOutputType | null
  }

  export type Nutrition_logsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    calories_added: number | null
  }

  export type Nutrition_logsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    calories_added: number | null
  }

  export type Nutrition_logsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    food_name: string | null
    calories_added: number | null
    logged_at: Date | null
  }

  export type Nutrition_logsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    food_name: string | null
    calories_added: number | null
    logged_at: Date | null
  }

  export type Nutrition_logsCountAggregateOutputType = {
    id: number
    user_id: number
    recipe_id: number
    food_name: number
    calories_added: number
    logged_at: number
    _all: number
  }


  export type Nutrition_logsAvgAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    calories_added?: true
  }

  export type Nutrition_logsSumAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    calories_added?: true
  }

  export type Nutrition_logsMinAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    food_name?: true
    calories_added?: true
    logged_at?: true
  }

  export type Nutrition_logsMaxAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    food_name?: true
    calories_added?: true
    logged_at?: true
  }

  export type Nutrition_logsCountAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    food_name?: true
    calories_added?: true
    logged_at?: true
    _all?: true
  }

  export type Nutrition_logsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nutrition_logs to aggregate.
     */
    where?: nutrition_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nutrition_logs to fetch.
     */
    orderBy?: nutrition_logsOrderByWithRelationInput | nutrition_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: nutrition_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nutrition_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nutrition_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned nutrition_logs
    **/
    _count?: true | Nutrition_logsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Nutrition_logsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Nutrition_logsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Nutrition_logsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Nutrition_logsMaxAggregateInputType
  }

  export type GetNutrition_logsAggregateType<T extends Nutrition_logsAggregateArgs> = {
        [P in keyof T & keyof AggregateNutrition_logs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNutrition_logs[P]>
      : GetScalarType<T[P], AggregateNutrition_logs[P]>
  }




  export type nutrition_logsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: nutrition_logsWhereInput
    orderBy?: nutrition_logsOrderByWithAggregationInput | nutrition_logsOrderByWithAggregationInput[]
    by: Nutrition_logsScalarFieldEnum[] | Nutrition_logsScalarFieldEnum
    having?: nutrition_logsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Nutrition_logsCountAggregateInputType | true
    _avg?: Nutrition_logsAvgAggregateInputType
    _sum?: Nutrition_logsSumAggregateInputType
    _min?: Nutrition_logsMinAggregateInputType
    _max?: Nutrition_logsMaxAggregateInputType
  }

  export type Nutrition_logsGroupByOutputType = {
    id: number
    user_id: number
    recipe_id: number | null
    food_name: string | null
    calories_added: number
    logged_at: Date
    _count: Nutrition_logsCountAggregateOutputType | null
    _avg: Nutrition_logsAvgAggregateOutputType | null
    _sum: Nutrition_logsSumAggregateOutputType | null
    _min: Nutrition_logsMinAggregateOutputType | null
    _max: Nutrition_logsMaxAggregateOutputType | null
  }

  type GetNutrition_logsGroupByPayload<T extends nutrition_logsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Nutrition_logsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Nutrition_logsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Nutrition_logsGroupByOutputType[P]>
            : GetScalarType<T[P], Nutrition_logsGroupByOutputType[P]>
        }
      >
    >


  export type nutrition_logsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    food_name?: boolean
    calories_added?: boolean
    logged_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | nutrition_logs$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["nutrition_logs"]>

  export type nutrition_logsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    food_name?: boolean
    calories_added?: boolean
    logged_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | nutrition_logs$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["nutrition_logs"]>

  export type nutrition_logsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    food_name?: boolean
    calories_added?: boolean
    logged_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | nutrition_logs$recipeArgs<ExtArgs>
  }, ExtArgs["result"]["nutrition_logs"]>

  export type nutrition_logsSelectScalar = {
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    food_name?: boolean
    calories_added?: boolean
    logged_at?: boolean
  }

  export type nutrition_logsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "recipe_id" | "food_name" | "calories_added" | "logged_at", ExtArgs["result"]["nutrition_logs"]>
  export type nutrition_logsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | nutrition_logs$recipeArgs<ExtArgs>
  }
  export type nutrition_logsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | nutrition_logs$recipeArgs<ExtArgs>
  }
  export type nutrition_logsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | nutrition_logs$recipeArgs<ExtArgs>
  }

  export type $nutrition_logsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "nutrition_logs"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      recipe: Prisma.$recipesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      recipe_id: number | null
      food_name: string | null
      calories_added: number
      logged_at: Date
    }, ExtArgs["result"]["nutrition_logs"]>
    composites: {}
  }

  type nutrition_logsGetPayload<S extends boolean | null | undefined | nutrition_logsDefaultArgs> = $Result.GetResult<Prisma.$nutrition_logsPayload, S>

  type nutrition_logsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<nutrition_logsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Nutrition_logsCountAggregateInputType | true
    }

  export interface nutrition_logsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['nutrition_logs'], meta: { name: 'nutrition_logs' } }
    /**
     * Find zero or one Nutrition_logs that matches the filter.
     * @param {nutrition_logsFindUniqueArgs} args - Arguments to find a Nutrition_logs
     * @example
     * // Get one Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends nutrition_logsFindUniqueArgs>(args: SelectSubset<T, nutrition_logsFindUniqueArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Nutrition_logs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {nutrition_logsFindUniqueOrThrowArgs} args - Arguments to find a Nutrition_logs
     * @example
     * // Get one Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends nutrition_logsFindUniqueOrThrowArgs>(args: SelectSubset<T, nutrition_logsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nutrition_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nutrition_logsFindFirstArgs} args - Arguments to find a Nutrition_logs
     * @example
     * // Get one Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends nutrition_logsFindFirstArgs>(args?: SelectSubset<T, nutrition_logsFindFirstArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Nutrition_logs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nutrition_logsFindFirstOrThrowArgs} args - Arguments to find a Nutrition_logs
     * @example
     * // Get one Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends nutrition_logsFindFirstOrThrowArgs>(args?: SelectSubset<T, nutrition_logsFindFirstOrThrowArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Nutrition_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nutrition_logsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.findMany()
     * 
     * // Get first 10 Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nutrition_logsWithIdOnly = await prisma.nutrition_logs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends nutrition_logsFindManyArgs>(args?: SelectSubset<T, nutrition_logsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Nutrition_logs.
     * @param {nutrition_logsCreateArgs} args - Arguments to create a Nutrition_logs.
     * @example
     * // Create one Nutrition_logs
     * const Nutrition_logs = await prisma.nutrition_logs.create({
     *   data: {
     *     // ... data to create a Nutrition_logs
     *   }
     * })
     * 
     */
    create<T extends nutrition_logsCreateArgs>(args: SelectSubset<T, nutrition_logsCreateArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Nutrition_logs.
     * @param {nutrition_logsCreateManyArgs} args - Arguments to create many Nutrition_logs.
     * @example
     * // Create many Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends nutrition_logsCreateManyArgs>(args?: SelectSubset<T, nutrition_logsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Nutrition_logs and returns the data saved in the database.
     * @param {nutrition_logsCreateManyAndReturnArgs} args - Arguments to create many Nutrition_logs.
     * @example
     * // Create many Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Nutrition_logs and only return the `id`
     * const nutrition_logsWithIdOnly = await prisma.nutrition_logs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends nutrition_logsCreateManyAndReturnArgs>(args?: SelectSubset<T, nutrition_logsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Nutrition_logs.
     * @param {nutrition_logsDeleteArgs} args - Arguments to delete one Nutrition_logs.
     * @example
     * // Delete one Nutrition_logs
     * const Nutrition_logs = await prisma.nutrition_logs.delete({
     *   where: {
     *     // ... filter to delete one Nutrition_logs
     *   }
     * })
     * 
     */
    delete<T extends nutrition_logsDeleteArgs>(args: SelectSubset<T, nutrition_logsDeleteArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Nutrition_logs.
     * @param {nutrition_logsUpdateArgs} args - Arguments to update one Nutrition_logs.
     * @example
     * // Update one Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends nutrition_logsUpdateArgs>(args: SelectSubset<T, nutrition_logsUpdateArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Nutrition_logs.
     * @param {nutrition_logsDeleteManyArgs} args - Arguments to filter Nutrition_logs to delete.
     * @example
     * // Delete a few Nutrition_logs
     * const { count } = await prisma.nutrition_logs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends nutrition_logsDeleteManyArgs>(args?: SelectSubset<T, nutrition_logsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nutrition_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nutrition_logsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends nutrition_logsUpdateManyArgs>(args: SelectSubset<T, nutrition_logsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nutrition_logs and returns the data updated in the database.
     * @param {nutrition_logsUpdateManyAndReturnArgs} args - Arguments to update many Nutrition_logs.
     * @example
     * // Update many Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Nutrition_logs and only return the `id`
     * const nutrition_logsWithIdOnly = await prisma.nutrition_logs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends nutrition_logsUpdateManyAndReturnArgs>(args: SelectSubset<T, nutrition_logsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Nutrition_logs.
     * @param {nutrition_logsUpsertArgs} args - Arguments to update or create a Nutrition_logs.
     * @example
     * // Update or create a Nutrition_logs
     * const nutrition_logs = await prisma.nutrition_logs.upsert({
     *   create: {
     *     // ... data to create a Nutrition_logs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nutrition_logs we want to update
     *   }
     * })
     */
    upsert<T extends nutrition_logsUpsertArgs>(args: SelectSubset<T, nutrition_logsUpsertArgs<ExtArgs>>): Prisma__nutrition_logsClient<$Result.GetResult<Prisma.$nutrition_logsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Nutrition_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nutrition_logsCountArgs} args - Arguments to filter Nutrition_logs to count.
     * @example
     * // Count the number of Nutrition_logs
     * const count = await prisma.nutrition_logs.count({
     *   where: {
     *     // ... the filter for the Nutrition_logs we want to count
     *   }
     * })
    **/
    count<T extends nutrition_logsCountArgs>(
      args?: Subset<T, nutrition_logsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Nutrition_logsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Nutrition_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Nutrition_logsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Nutrition_logsAggregateArgs>(args: Subset<T, Nutrition_logsAggregateArgs>): Prisma.PrismaPromise<GetNutrition_logsAggregateType<T>>

    /**
     * Group by Nutrition_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nutrition_logsGroupByArgs} args - Group by arguments.
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
      T extends nutrition_logsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: nutrition_logsGroupByArgs['orderBy'] }
        : { orderBy?: nutrition_logsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, nutrition_logsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNutrition_logsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the nutrition_logs model
   */
  readonly fields: nutrition_logsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for nutrition_logs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__nutrition_logsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipe<T extends nutrition_logs$recipeArgs<ExtArgs> = {}>(args?: Subset<T, nutrition_logs$recipeArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the nutrition_logs model
   */
  interface nutrition_logsFieldRefs {
    readonly id: FieldRef<"nutrition_logs", 'Int'>
    readonly user_id: FieldRef<"nutrition_logs", 'Int'>
    readonly recipe_id: FieldRef<"nutrition_logs", 'Int'>
    readonly food_name: FieldRef<"nutrition_logs", 'String'>
    readonly calories_added: FieldRef<"nutrition_logs", 'Int'>
    readonly logged_at: FieldRef<"nutrition_logs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * nutrition_logs findUnique
   */
  export type nutrition_logsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * Filter, which nutrition_logs to fetch.
     */
    where: nutrition_logsWhereUniqueInput
  }

  /**
   * nutrition_logs findUniqueOrThrow
   */
  export type nutrition_logsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * Filter, which nutrition_logs to fetch.
     */
    where: nutrition_logsWhereUniqueInput
  }

  /**
   * nutrition_logs findFirst
   */
  export type nutrition_logsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * Filter, which nutrition_logs to fetch.
     */
    where?: nutrition_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nutrition_logs to fetch.
     */
    orderBy?: nutrition_logsOrderByWithRelationInput | nutrition_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nutrition_logs.
     */
    cursor?: nutrition_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nutrition_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nutrition_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nutrition_logs.
     */
    distinct?: Nutrition_logsScalarFieldEnum | Nutrition_logsScalarFieldEnum[]
  }

  /**
   * nutrition_logs findFirstOrThrow
   */
  export type nutrition_logsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * Filter, which nutrition_logs to fetch.
     */
    where?: nutrition_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nutrition_logs to fetch.
     */
    orderBy?: nutrition_logsOrderByWithRelationInput | nutrition_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for nutrition_logs.
     */
    cursor?: nutrition_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nutrition_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nutrition_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of nutrition_logs.
     */
    distinct?: Nutrition_logsScalarFieldEnum | Nutrition_logsScalarFieldEnum[]
  }

  /**
   * nutrition_logs findMany
   */
  export type nutrition_logsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * Filter, which nutrition_logs to fetch.
     */
    where?: nutrition_logsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of nutrition_logs to fetch.
     */
    orderBy?: nutrition_logsOrderByWithRelationInput | nutrition_logsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing nutrition_logs.
     */
    cursor?: nutrition_logsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` nutrition_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` nutrition_logs.
     */
    skip?: number
    distinct?: Nutrition_logsScalarFieldEnum | Nutrition_logsScalarFieldEnum[]
  }

  /**
   * nutrition_logs create
   */
  export type nutrition_logsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * The data needed to create a nutrition_logs.
     */
    data: XOR<nutrition_logsCreateInput, nutrition_logsUncheckedCreateInput>
  }

  /**
   * nutrition_logs createMany
   */
  export type nutrition_logsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many nutrition_logs.
     */
    data: nutrition_logsCreateManyInput | nutrition_logsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * nutrition_logs createManyAndReturn
   */
  export type nutrition_logsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * The data used to create many nutrition_logs.
     */
    data: nutrition_logsCreateManyInput | nutrition_logsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * nutrition_logs update
   */
  export type nutrition_logsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * The data needed to update a nutrition_logs.
     */
    data: XOR<nutrition_logsUpdateInput, nutrition_logsUncheckedUpdateInput>
    /**
     * Choose, which nutrition_logs to update.
     */
    where: nutrition_logsWhereUniqueInput
  }

  /**
   * nutrition_logs updateMany
   */
  export type nutrition_logsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update nutrition_logs.
     */
    data: XOR<nutrition_logsUpdateManyMutationInput, nutrition_logsUncheckedUpdateManyInput>
    /**
     * Filter which nutrition_logs to update
     */
    where?: nutrition_logsWhereInput
    /**
     * Limit how many nutrition_logs to update.
     */
    limit?: number
  }

  /**
   * nutrition_logs updateManyAndReturn
   */
  export type nutrition_logsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * The data used to update nutrition_logs.
     */
    data: XOR<nutrition_logsUpdateManyMutationInput, nutrition_logsUncheckedUpdateManyInput>
    /**
     * Filter which nutrition_logs to update
     */
    where?: nutrition_logsWhereInput
    /**
     * Limit how many nutrition_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * nutrition_logs upsert
   */
  export type nutrition_logsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * The filter to search for the nutrition_logs to update in case it exists.
     */
    where: nutrition_logsWhereUniqueInput
    /**
     * In case the nutrition_logs found by the `where` argument doesn't exist, create a new nutrition_logs with this data.
     */
    create: XOR<nutrition_logsCreateInput, nutrition_logsUncheckedCreateInput>
    /**
     * In case the nutrition_logs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<nutrition_logsUpdateInput, nutrition_logsUncheckedUpdateInput>
  }

  /**
   * nutrition_logs delete
   */
  export type nutrition_logsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
    /**
     * Filter which nutrition_logs to delete.
     */
    where: nutrition_logsWhereUniqueInput
  }

  /**
   * nutrition_logs deleteMany
   */
  export type nutrition_logsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which nutrition_logs to delete
     */
    where?: nutrition_logsWhereInput
    /**
     * Limit how many nutrition_logs to delete.
     */
    limit?: number
  }

  /**
   * nutrition_logs.recipe
   */
  export type nutrition_logs$recipeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the recipes
     */
    select?: recipesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the recipes
     */
    omit?: recipesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: recipesInclude<ExtArgs> | null
    where?: recipesWhereInput
  }

  /**
   * nutrition_logs without action
   */
  export type nutrition_logsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nutrition_logs
     */
    select?: nutrition_logsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the nutrition_logs
     */
    omit?: nutrition_logsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: nutrition_logsInclude<ExtArgs> | null
  }


  /**
   * Model reviews
   */

  export type AggregateReviews = {
    _count: ReviewsCountAggregateOutputType | null
    _avg: ReviewsAvgAggregateOutputType | null
    _sum: ReviewsSumAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  export type ReviewsAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    rating: number | null
  }

  export type ReviewsSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    rating: number | null
  }

  export type ReviewsMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewsMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
  }

  export type ReviewsCountAggregateOutputType = {
    id: number
    user_id: number
    recipe_id: number
    rating: number
    comment: number
    createdAt: number
    _all: number
  }


  export type ReviewsAvgAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    rating?: true
  }

  export type ReviewsSumAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    rating?: true
  }

  export type ReviewsMinAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewsMaxAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    rating?: true
    comment?: true
    createdAt?: true
  }

  export type ReviewsCountAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    rating?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to aggregate.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reviews
    **/
    _count?: true | ReviewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewsMaxAggregateInputType
  }

  export type GetReviewsAggregateType<T extends ReviewsAggregateArgs> = {
        [P in keyof T & keyof AggregateReviews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviews[P]>
      : GetScalarType<T[P], AggregateReviews[P]>
  }




  export type reviewsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithAggregationInput | reviewsOrderByWithAggregationInput[]
    by: ReviewsScalarFieldEnum[] | ReviewsScalarFieldEnum
    having?: reviewsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewsCountAggregateInputType | true
    _avg?: ReviewsAvgAggregateInputType
    _sum?: ReviewsSumAggregateInputType
    _min?: ReviewsMinAggregateInputType
    _max?: ReviewsMaxAggregateInputType
  }

  export type ReviewsGroupByOutputType = {
    id: number
    user_id: number
    recipe_id: number
    rating: number
    comment: string | null
    createdAt: Date
    _count: ReviewsCountAggregateOutputType | null
    _avg: ReviewsAvgAggregateOutputType | null
    _sum: ReviewsSumAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  type GetReviewsGroupByPayload<T extends reviewsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
        }
      >
    >


  export type reviewsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectScalar = {
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type reviewsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "recipe_id" | "rating" | "comment" | "createdAt", ExtArgs["result"]["reviews"]>
  export type reviewsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }
  export type reviewsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }
  export type reviewsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }

  export type $reviewsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "reviews"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      recipe: Prisma.$recipesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      recipe_id: number
      rating: number
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["reviews"]>
    composites: {}
  }

  type reviewsGetPayload<S extends boolean | null | undefined | reviewsDefaultArgs> = $Result.GetResult<Prisma.$reviewsPayload, S>

  type reviewsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reviewsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewsCountAggregateInputType | true
    }

  export interface reviewsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['reviews'], meta: { name: 'reviews' } }
    /**
     * Find zero or one Reviews that matches the filter.
     * @param {reviewsFindUniqueArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reviewsFindUniqueArgs>(args: SelectSubset<T, reviewsFindUniqueArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reviews that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reviewsFindUniqueOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reviewsFindUniqueOrThrowArgs>(args: SelectSubset<T, reviewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reviewsFindFirstArgs>(args?: SelectSubset<T, reviewsFindFirstArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reviews that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reviewsFindFirstOrThrowArgs>(args?: SelectSubset<T, reviewsFindFirstOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.reviews.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.reviews.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewsWithIdOnly = await prisma.reviews.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends reviewsFindManyArgs>(args?: SelectSubset<T, reviewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reviews.
     * @param {reviewsCreateArgs} args - Arguments to create a Reviews.
     * @example
     * // Create one Reviews
     * const Reviews = await prisma.reviews.create({
     *   data: {
     *     // ... data to create a Reviews
     *   }
     * })
     * 
     */
    create<T extends reviewsCreateArgs>(args: SelectSubset<T, reviewsCreateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {reviewsCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const reviews = await prisma.reviews.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reviewsCreateManyArgs>(args?: SelectSubset<T, reviewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {reviewsCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const reviews = await prisma.reviews.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewsWithIdOnly = await prisma.reviews.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reviewsCreateManyAndReturnArgs>(args?: SelectSubset<T, reviewsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reviews.
     * @param {reviewsDeleteArgs} args - Arguments to delete one Reviews.
     * @example
     * // Delete one Reviews
     * const Reviews = await prisma.reviews.delete({
     *   where: {
     *     // ... filter to delete one Reviews
     *   }
     * })
     * 
     */
    delete<T extends reviewsDeleteArgs>(args: SelectSubset<T, reviewsDeleteArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reviews.
     * @param {reviewsUpdateArgs} args - Arguments to update one Reviews.
     * @example
     * // Update one Reviews
     * const reviews = await prisma.reviews.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reviewsUpdateArgs>(args: SelectSubset<T, reviewsUpdateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {reviewsDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.reviews.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reviewsDeleteManyArgs>(args?: SelectSubset<T, reviewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const reviews = await prisma.reviews.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reviewsUpdateManyArgs>(args: SelectSubset<T, reviewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {reviewsUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const reviews = await prisma.reviews.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewsWithIdOnly = await prisma.reviews.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends reviewsUpdateManyAndReturnArgs>(args: SelectSubset<T, reviewsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reviews.
     * @param {reviewsUpsertArgs} args - Arguments to update or create a Reviews.
     * @example
     * // Update or create a Reviews
     * const reviews = await prisma.reviews.upsert({
     *   create: {
     *     // ... data to create a Reviews
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reviews we want to update
     *   }
     * })
     */
    upsert<T extends reviewsUpsertArgs>(args: SelectSubset<T, reviewsUpsertArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.reviews.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends reviewsCountArgs>(
      args?: Subset<T, reviewsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReviewsAggregateArgs>(args: Subset<T, ReviewsAggregateArgs>): Prisma.PrismaPromise<GetReviewsAggregateType<T>>

    /**
     * Group by Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsGroupByArgs} args - Group by arguments.
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
      T extends reviewsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reviewsGroupByArgs['orderBy'] }
        : { orderBy?: reviewsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, reviewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the reviews model
   */
  readonly fields: reviewsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for reviews.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reviewsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipe<T extends recipesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, recipesDefaultArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the reviews model
   */
  interface reviewsFieldRefs {
    readonly id: FieldRef<"reviews", 'Int'>
    readonly user_id: FieldRef<"reviews", 'Int'>
    readonly recipe_id: FieldRef<"reviews", 'Int'>
    readonly rating: FieldRef<"reviews", 'Int'>
    readonly comment: FieldRef<"reviews", 'String'>
    readonly createdAt: FieldRef<"reviews", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * reviews findUnique
   */
  export type reviewsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findUniqueOrThrow
   */
  export type reviewsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findFirst
   */
  export type reviewsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findFirstOrThrow
   */
  export type reviewsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findMany
   */
  export type reviewsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews create
   */
  export type reviewsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to create a reviews.
     */
    data: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
  }

  /**
   * reviews createMany
   */
  export type reviewsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reviews.
     */
    data: reviewsCreateManyInput | reviewsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * reviews createManyAndReturn
   */
  export type reviewsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * The data used to create many reviews.
     */
    data: reviewsCreateManyInput | reviewsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * reviews update
   */
  export type reviewsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to update a reviews.
     */
    data: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
    /**
     * Choose, which reviews to update.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews updateMany
   */
  export type reviewsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
  }

  /**
   * reviews updateManyAndReturn
   */
  export type reviewsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * reviews upsert
   */
  export type reviewsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The filter to search for the reviews to update in case it exists.
     */
    where: reviewsWhereUniqueInput
    /**
     * In case the reviews found by the `where` argument doesn't exist, create a new reviews with this data.
     */
    create: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
    /**
     * In case the reviews was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
  }

  /**
   * reviews delete
   */
  export type reviewsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter which reviews to delete.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews deleteMany
   */
  export type reviewsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to delete
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to delete.
     */
    limit?: number
  }

  /**
   * reviews without action
   */
  export type reviewsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
  }


  /**
   * Model bookmarks
   */

  export type AggregateBookmarks = {
    _count: BookmarksCountAggregateOutputType | null
    _avg: BookmarksAvgAggregateOutputType | null
    _sum: BookmarksSumAggregateOutputType | null
    _min: BookmarksMinAggregateOutputType | null
    _max: BookmarksMaxAggregateOutputType | null
  }

  export type BookmarksAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
  }

  export type BookmarksSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
  }

  export type BookmarksMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    createdAt: Date | null
  }

  export type BookmarksMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    recipe_id: number | null
    createdAt: Date | null
  }

  export type BookmarksCountAggregateOutputType = {
    id: number
    user_id: number
    recipe_id: number
    createdAt: number
    _all: number
  }


  export type BookmarksAvgAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
  }

  export type BookmarksSumAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
  }

  export type BookmarksMinAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    createdAt?: true
  }

  export type BookmarksMaxAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    createdAt?: true
  }

  export type BookmarksCountAggregateInputType = {
    id?: true
    user_id?: true
    recipe_id?: true
    createdAt?: true
    _all?: true
  }

  export type BookmarksAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookmarks to aggregate.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bookmarks
    **/
    _count?: true | BookmarksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookmarksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookmarksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookmarksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookmarksMaxAggregateInputType
  }

  export type GetBookmarksAggregateType<T extends BookmarksAggregateArgs> = {
        [P in keyof T & keyof AggregateBookmarks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookmarks[P]>
      : GetScalarType<T[P], AggregateBookmarks[P]>
  }




  export type bookmarksGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookmarksWhereInput
    orderBy?: bookmarksOrderByWithAggregationInput | bookmarksOrderByWithAggregationInput[]
    by: BookmarksScalarFieldEnum[] | BookmarksScalarFieldEnum
    having?: bookmarksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookmarksCountAggregateInputType | true
    _avg?: BookmarksAvgAggregateInputType
    _sum?: BookmarksSumAggregateInputType
    _min?: BookmarksMinAggregateInputType
    _max?: BookmarksMaxAggregateInputType
  }

  export type BookmarksGroupByOutputType = {
    id: number
    user_id: number
    recipe_id: number
    createdAt: Date
    _count: BookmarksCountAggregateOutputType | null
    _avg: BookmarksAvgAggregateOutputType | null
    _sum: BookmarksSumAggregateOutputType | null
    _min: BookmarksMinAggregateOutputType | null
    _max: BookmarksMaxAggregateOutputType | null
  }

  type GetBookmarksGroupByPayload<T extends bookmarksGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookmarksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookmarksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookmarksGroupByOutputType[P]>
            : GetScalarType<T[P], BookmarksGroupByOutputType[P]>
        }
      >
    >


  export type bookmarksSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    createdAt?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmarks"]>

  export type bookmarksSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    createdAt?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmarks"]>

  export type bookmarksSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    createdAt?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookmarks"]>

  export type bookmarksSelectScalar = {
    id?: boolean
    user_id?: boolean
    recipe_id?: boolean
    createdAt?: boolean
  }

  export type bookmarksOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "recipe_id" | "createdAt", ExtArgs["result"]["bookmarks"]>
  export type bookmarksInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }
  export type bookmarksIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }
  export type bookmarksIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
    recipe?: boolean | recipesDefaultArgs<ExtArgs>
  }

  export type $bookmarksPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bookmarks"
    objects: {
      user: Prisma.$usersPayload<ExtArgs>
      recipe: Prisma.$recipesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      recipe_id: number
      createdAt: Date
    }, ExtArgs["result"]["bookmarks"]>
    composites: {}
  }

  type bookmarksGetPayload<S extends boolean | null | undefined | bookmarksDefaultArgs> = $Result.GetResult<Prisma.$bookmarksPayload, S>

  type bookmarksCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bookmarksFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookmarksCountAggregateInputType | true
    }

  export interface bookmarksDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bookmarks'], meta: { name: 'bookmarks' } }
    /**
     * Find zero or one Bookmarks that matches the filter.
     * @param {bookmarksFindUniqueArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bookmarksFindUniqueArgs>(args: SelectSubset<T, bookmarksFindUniqueArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookmarks that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bookmarksFindUniqueOrThrowArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bookmarksFindUniqueOrThrowArgs>(args: SelectSubset<T, bookmarksFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksFindFirstArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bookmarksFindFirstArgs>(args?: SelectSubset<T, bookmarksFindFirstArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookmarks that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksFindFirstOrThrowArgs} args - Arguments to find a Bookmarks
     * @example
     * // Get one Bookmarks
     * const bookmarks = await prisma.bookmarks.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bookmarksFindFirstOrThrowArgs>(args?: SelectSubset<T, bookmarksFindFirstOrThrowArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookmarks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookmarks
     * const bookmarks = await prisma.bookmarks.findMany()
     * 
     * // Get first 10 Bookmarks
     * const bookmarks = await prisma.bookmarks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookmarksWithIdOnly = await prisma.bookmarks.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bookmarksFindManyArgs>(args?: SelectSubset<T, bookmarksFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookmarks.
     * @param {bookmarksCreateArgs} args - Arguments to create a Bookmarks.
     * @example
     * // Create one Bookmarks
     * const Bookmarks = await prisma.bookmarks.create({
     *   data: {
     *     // ... data to create a Bookmarks
     *   }
     * })
     * 
     */
    create<T extends bookmarksCreateArgs>(args: SelectSubset<T, bookmarksCreateArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookmarks.
     * @param {bookmarksCreateManyArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmarks = await prisma.bookmarks.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bookmarksCreateManyArgs>(args?: SelectSubset<T, bookmarksCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookmarks and returns the data saved in the database.
     * @param {bookmarksCreateManyAndReturnArgs} args - Arguments to create many Bookmarks.
     * @example
     * // Create many Bookmarks
     * const bookmarks = await prisma.bookmarks.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookmarks and only return the `id`
     * const bookmarksWithIdOnly = await prisma.bookmarks.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bookmarksCreateManyAndReturnArgs>(args?: SelectSubset<T, bookmarksCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookmarks.
     * @param {bookmarksDeleteArgs} args - Arguments to delete one Bookmarks.
     * @example
     * // Delete one Bookmarks
     * const Bookmarks = await prisma.bookmarks.delete({
     *   where: {
     *     // ... filter to delete one Bookmarks
     *   }
     * })
     * 
     */
    delete<T extends bookmarksDeleteArgs>(args: SelectSubset<T, bookmarksDeleteArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookmarks.
     * @param {bookmarksUpdateArgs} args - Arguments to update one Bookmarks.
     * @example
     * // Update one Bookmarks
     * const bookmarks = await prisma.bookmarks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bookmarksUpdateArgs>(args: SelectSubset<T, bookmarksUpdateArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookmarks.
     * @param {bookmarksDeleteManyArgs} args - Arguments to filter Bookmarks to delete.
     * @example
     * // Delete a few Bookmarks
     * const { count } = await prisma.bookmarks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bookmarksDeleteManyArgs>(args?: SelectSubset<T, bookmarksDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookmarks
     * const bookmarks = await prisma.bookmarks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bookmarksUpdateManyArgs>(args: SelectSubset<T, bookmarksUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookmarks and returns the data updated in the database.
     * @param {bookmarksUpdateManyAndReturnArgs} args - Arguments to update many Bookmarks.
     * @example
     * // Update many Bookmarks
     * const bookmarks = await prisma.bookmarks.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookmarks and only return the `id`
     * const bookmarksWithIdOnly = await prisma.bookmarks.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bookmarksUpdateManyAndReturnArgs>(args: SelectSubset<T, bookmarksUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookmarks.
     * @param {bookmarksUpsertArgs} args - Arguments to update or create a Bookmarks.
     * @example
     * // Update or create a Bookmarks
     * const bookmarks = await prisma.bookmarks.upsert({
     *   create: {
     *     // ... data to create a Bookmarks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookmarks we want to update
     *   }
     * })
     */
    upsert<T extends bookmarksUpsertArgs>(args: SelectSubset<T, bookmarksUpsertArgs<ExtArgs>>): Prisma__bookmarksClient<$Result.GetResult<Prisma.$bookmarksPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksCountArgs} args - Arguments to filter Bookmarks to count.
     * @example
     * // Count the number of Bookmarks
     * const count = await prisma.bookmarks.count({
     *   where: {
     *     // ... the filter for the Bookmarks we want to count
     *   }
     * })
    **/
    count<T extends bookmarksCountArgs>(
      args?: Subset<T, bookmarksCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookmarksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookmarksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookmarksAggregateArgs>(args: Subset<T, BookmarksAggregateArgs>): Prisma.PrismaPromise<GetBookmarksAggregateType<T>>

    /**
     * Group by Bookmarks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookmarksGroupByArgs} args - Group by arguments.
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
      T extends bookmarksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bookmarksGroupByArgs['orderBy'] }
        : { orderBy?: bookmarksGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, bookmarksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookmarksGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bookmarks model
   */
  readonly fields: bookmarksFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bookmarks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bookmarksClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    recipe<T extends recipesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, recipesDefaultArgs<ExtArgs>>): Prisma__recipesClient<$Result.GetResult<Prisma.$recipesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the bookmarks model
   */
  interface bookmarksFieldRefs {
    readonly id: FieldRef<"bookmarks", 'Int'>
    readonly user_id: FieldRef<"bookmarks", 'Int'>
    readonly recipe_id: FieldRef<"bookmarks", 'Int'>
    readonly createdAt: FieldRef<"bookmarks", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bookmarks findUnique
   */
  export type bookmarksFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks findUniqueOrThrow
   */
  export type bookmarksFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks findFirst
   */
  export type bookmarksFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookmarks.
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookmarks.
     */
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * bookmarks findFirstOrThrow
   */
  export type bookmarksFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookmarks.
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookmarks.
     */
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * bookmarks findMany
   */
  export type bookmarksFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * Filter, which bookmarks to fetch.
     */
    where?: bookmarksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookmarks to fetch.
     */
    orderBy?: bookmarksOrderByWithRelationInput | bookmarksOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bookmarks.
     */
    cursor?: bookmarksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookmarks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookmarks.
     */
    skip?: number
    distinct?: BookmarksScalarFieldEnum | BookmarksScalarFieldEnum[]
  }

  /**
   * bookmarks create
   */
  export type bookmarksCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * The data needed to create a bookmarks.
     */
    data: XOR<bookmarksCreateInput, bookmarksUncheckedCreateInput>
  }

  /**
   * bookmarks createMany
   */
  export type bookmarksCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bookmarks.
     */
    data: bookmarksCreateManyInput | bookmarksCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookmarks createManyAndReturn
   */
  export type bookmarksCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * The data used to create many bookmarks.
     */
    data: bookmarksCreateManyInput | bookmarksCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * bookmarks update
   */
  export type bookmarksUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * The data needed to update a bookmarks.
     */
    data: XOR<bookmarksUpdateInput, bookmarksUncheckedUpdateInput>
    /**
     * Choose, which bookmarks to update.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks updateMany
   */
  export type bookmarksUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bookmarks.
     */
    data: XOR<bookmarksUpdateManyMutationInput, bookmarksUncheckedUpdateManyInput>
    /**
     * Filter which bookmarks to update
     */
    where?: bookmarksWhereInput
    /**
     * Limit how many bookmarks to update.
     */
    limit?: number
  }

  /**
   * bookmarks updateManyAndReturn
   */
  export type bookmarksUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * The data used to update bookmarks.
     */
    data: XOR<bookmarksUpdateManyMutationInput, bookmarksUncheckedUpdateManyInput>
    /**
     * Filter which bookmarks to update
     */
    where?: bookmarksWhereInput
    /**
     * Limit how many bookmarks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * bookmarks upsert
   */
  export type bookmarksUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * The filter to search for the bookmarks to update in case it exists.
     */
    where: bookmarksWhereUniqueInput
    /**
     * In case the bookmarks found by the `where` argument doesn't exist, create a new bookmarks with this data.
     */
    create: XOR<bookmarksCreateInput, bookmarksUncheckedCreateInput>
    /**
     * In case the bookmarks was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bookmarksUpdateInput, bookmarksUncheckedUpdateInput>
  }

  /**
   * bookmarks delete
   */
  export type bookmarksDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
    /**
     * Filter which bookmarks to delete.
     */
    where: bookmarksWhereUniqueInput
  }

  /**
   * bookmarks deleteMany
   */
  export type bookmarksDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookmarks to delete
     */
    where?: bookmarksWhereInput
    /**
     * Limit how many bookmarks to delete.
     */
    limit?: number
  }

  /**
   * bookmarks without action
   */
  export type bookmarksDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookmarks
     */
    select?: bookmarksSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookmarks
     */
    omit?: bookmarksOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookmarksInclude<ExtArgs> | null
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


  export const UsersScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    full_name: 'full_name',
    profile_picture_url: 'profile_picture_url',
    daily_calorie_goal: 'daily_calorie_goal',
    weight: 'weight',
    height: 'height',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const RecipesScalarFieldEnum: {
    id: 'id',
    author_id: 'author_id',
    title: 'title',
    cuisine_type: 'cuisine_type',
    description: 'description',
    calories_per_serving: 'calories_per_serving',
    cook_time_minutes: 'cook_time_minutes',
    ingredients: 'ingredients',
    instructions: 'instructions',
    image_url: 'image_url',
    video_url: 'video_url',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type RecipesScalarFieldEnum = (typeof RecipesScalarFieldEnum)[keyof typeof RecipesScalarFieldEnum]


  export const Nutrition_logsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    recipe_id: 'recipe_id',
    food_name: 'food_name',
    calories_added: 'calories_added',
    logged_at: 'logged_at'
  };

  export type Nutrition_logsScalarFieldEnum = (typeof Nutrition_logsScalarFieldEnum)[keyof typeof Nutrition_logsScalarFieldEnum]


  export const ReviewsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    recipe_id: 'recipe_id',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type ReviewsScalarFieldEnum = (typeof ReviewsScalarFieldEnum)[keyof typeof ReviewsScalarFieldEnum]


  export const BookmarksScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    recipe_id: 'recipe_id',
    createdAt: 'createdAt'
  };

  export type BookmarksScalarFieldEnum = (typeof BookmarksScalarFieldEnum)[keyof typeof BookmarksScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'users_role'
   */
  export type Enumusers_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_role'>
    


  /**
   * Reference to a field of type 'users_role[]'
   */
  export type ListEnumusers_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    username?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    full_name?: StringNullableFilter<"users"> | string | null
    profile_picture_url?: StringNullableFilter<"users"> | string | null
    daily_calorie_goal?: IntFilter<"users"> | number
    weight?: FloatNullableFilter<"users"> | number | null
    height?: FloatNullableFilter<"users"> | number | null
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    recipes?: RecipesListRelationFilter
    nutrition_logs?: Nutrition_logsListRelationFilter
    reviews?: ReviewsListRelationFilter
    bookmarks?: BookmarksListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrderInput | SortOrder
    profile_picture_url?: SortOrderInput | SortOrder
    daily_calorie_goal?: SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    recipes?: recipesOrderByRelationAggregateInput
    nutrition_logs?: nutrition_logsOrderByRelationAggregateInput
    reviews?: reviewsOrderByRelationAggregateInput
    bookmarks?: bookmarksOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    password?: StringFilter<"users"> | string
    full_name?: StringNullableFilter<"users"> | string | null
    profile_picture_url?: StringNullableFilter<"users"> | string | null
    daily_calorie_goal?: IntFilter<"users"> | number
    weight?: FloatNullableFilter<"users"> | number | null
    height?: FloatNullableFilter<"users"> | number | null
    role?: Enumusers_roleFilter<"users"> | $Enums.users_role
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    recipes?: RecipesListRelationFilter
    nutrition_logs?: Nutrition_logsListRelationFilter
    reviews?: ReviewsListRelationFilter
    bookmarks?: BookmarksListRelationFilter
  }, "id" | "username" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrderInput | SortOrder
    profile_picture_url?: SortOrderInput | SortOrder
    daily_calorie_goal?: SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    username?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    full_name?: StringNullableWithAggregatesFilter<"users"> | string | null
    profile_picture_url?: StringNullableWithAggregatesFilter<"users"> | string | null
    daily_calorie_goal?: IntWithAggregatesFilter<"users"> | number
    weight?: FloatNullableWithAggregatesFilter<"users"> | number | null
    height?: FloatNullableWithAggregatesFilter<"users"> | number | null
    role?: Enumusers_roleWithAggregatesFilter<"users"> | $Enums.users_role
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
  }

  export type recipesWhereInput = {
    AND?: recipesWhereInput | recipesWhereInput[]
    OR?: recipesWhereInput[]
    NOT?: recipesWhereInput | recipesWhereInput[]
    id?: IntFilter<"recipes"> | number
    author_id?: IntFilter<"recipes"> | number
    title?: StringFilter<"recipes"> | string
    cuisine_type?: StringNullableFilter<"recipes"> | string | null
    description?: StringNullableFilter<"recipes"> | string | null
    calories_per_serving?: IntFilter<"recipes"> | number
    cook_time_minutes?: IntNullableFilter<"recipes"> | number | null
    ingredients?: StringFilter<"recipes"> | string
    instructions?: StringFilter<"recipes"> | string
    image_url?: StringNullableFilter<"recipes"> | string | null
    video_url?: StringNullableFilter<"recipes"> | string | null
    created_at?: DateTimeFilter<"recipes"> | Date | string
    updated_at?: DateTimeFilter<"recipes"> | Date | string
    author?: XOR<UsersScalarRelationFilter, usersWhereInput>
    reviews?: ReviewsListRelationFilter
    bookmarks?: BookmarksListRelationFilter
    nutrition_logs?: Nutrition_logsListRelationFilter
  }

  export type recipesOrderByWithRelationInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    cuisine_type?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    calories_per_serving?: SortOrder
    cook_time_minutes?: SortOrderInput | SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    image_url?: SortOrderInput | SortOrder
    video_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    author?: usersOrderByWithRelationInput
    reviews?: reviewsOrderByRelationAggregateInput
    bookmarks?: bookmarksOrderByRelationAggregateInput
    nutrition_logs?: nutrition_logsOrderByRelationAggregateInput
  }

  export type recipesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: recipesWhereInput | recipesWhereInput[]
    OR?: recipesWhereInput[]
    NOT?: recipesWhereInput | recipesWhereInput[]
    author_id?: IntFilter<"recipes"> | number
    title?: StringFilter<"recipes"> | string
    cuisine_type?: StringNullableFilter<"recipes"> | string | null
    description?: StringNullableFilter<"recipes"> | string | null
    calories_per_serving?: IntFilter<"recipes"> | number
    cook_time_minutes?: IntNullableFilter<"recipes"> | number | null
    ingredients?: StringFilter<"recipes"> | string
    instructions?: StringFilter<"recipes"> | string
    image_url?: StringNullableFilter<"recipes"> | string | null
    video_url?: StringNullableFilter<"recipes"> | string | null
    created_at?: DateTimeFilter<"recipes"> | Date | string
    updated_at?: DateTimeFilter<"recipes"> | Date | string
    author?: XOR<UsersScalarRelationFilter, usersWhereInput>
    reviews?: ReviewsListRelationFilter
    bookmarks?: BookmarksListRelationFilter
    nutrition_logs?: Nutrition_logsListRelationFilter
  }, "id">

  export type recipesOrderByWithAggregationInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    cuisine_type?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    calories_per_serving?: SortOrder
    cook_time_minutes?: SortOrderInput | SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    image_url?: SortOrderInput | SortOrder
    video_url?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: recipesCountOrderByAggregateInput
    _avg?: recipesAvgOrderByAggregateInput
    _max?: recipesMaxOrderByAggregateInput
    _min?: recipesMinOrderByAggregateInput
    _sum?: recipesSumOrderByAggregateInput
  }

  export type recipesScalarWhereWithAggregatesInput = {
    AND?: recipesScalarWhereWithAggregatesInput | recipesScalarWhereWithAggregatesInput[]
    OR?: recipesScalarWhereWithAggregatesInput[]
    NOT?: recipesScalarWhereWithAggregatesInput | recipesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"recipes"> | number
    author_id?: IntWithAggregatesFilter<"recipes"> | number
    title?: StringWithAggregatesFilter<"recipes"> | string
    cuisine_type?: StringNullableWithAggregatesFilter<"recipes"> | string | null
    description?: StringNullableWithAggregatesFilter<"recipes"> | string | null
    calories_per_serving?: IntWithAggregatesFilter<"recipes"> | number
    cook_time_minutes?: IntNullableWithAggregatesFilter<"recipes"> | number | null
    ingredients?: StringWithAggregatesFilter<"recipes"> | string
    instructions?: StringWithAggregatesFilter<"recipes"> | string
    image_url?: StringNullableWithAggregatesFilter<"recipes"> | string | null
    video_url?: StringNullableWithAggregatesFilter<"recipes"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"recipes"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"recipes"> | Date | string
  }

  export type nutrition_logsWhereInput = {
    AND?: nutrition_logsWhereInput | nutrition_logsWhereInput[]
    OR?: nutrition_logsWhereInput[]
    NOT?: nutrition_logsWhereInput | nutrition_logsWhereInput[]
    id?: IntFilter<"nutrition_logs"> | number
    user_id?: IntFilter<"nutrition_logs"> | number
    recipe_id?: IntNullableFilter<"nutrition_logs"> | number | null
    food_name?: StringNullableFilter<"nutrition_logs"> | string | null
    calories_added?: IntFilter<"nutrition_logs"> | number
    logged_at?: DateTimeFilter<"nutrition_logs"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    recipe?: XOR<RecipesNullableScalarRelationFilter, recipesWhereInput> | null
  }

  export type nutrition_logsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrderInput | SortOrder
    food_name?: SortOrderInput | SortOrder
    calories_added?: SortOrder
    logged_at?: SortOrder
    user?: usersOrderByWithRelationInput
    recipe?: recipesOrderByWithRelationInput
  }

  export type nutrition_logsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: nutrition_logsWhereInput | nutrition_logsWhereInput[]
    OR?: nutrition_logsWhereInput[]
    NOT?: nutrition_logsWhereInput | nutrition_logsWhereInput[]
    user_id?: IntFilter<"nutrition_logs"> | number
    recipe_id?: IntNullableFilter<"nutrition_logs"> | number | null
    food_name?: StringNullableFilter<"nutrition_logs"> | string | null
    calories_added?: IntFilter<"nutrition_logs"> | number
    logged_at?: DateTimeFilter<"nutrition_logs"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    recipe?: XOR<RecipesNullableScalarRelationFilter, recipesWhereInput> | null
  }, "id">

  export type nutrition_logsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrderInput | SortOrder
    food_name?: SortOrderInput | SortOrder
    calories_added?: SortOrder
    logged_at?: SortOrder
    _count?: nutrition_logsCountOrderByAggregateInput
    _avg?: nutrition_logsAvgOrderByAggregateInput
    _max?: nutrition_logsMaxOrderByAggregateInput
    _min?: nutrition_logsMinOrderByAggregateInput
    _sum?: nutrition_logsSumOrderByAggregateInput
  }

  export type nutrition_logsScalarWhereWithAggregatesInput = {
    AND?: nutrition_logsScalarWhereWithAggregatesInput | nutrition_logsScalarWhereWithAggregatesInput[]
    OR?: nutrition_logsScalarWhereWithAggregatesInput[]
    NOT?: nutrition_logsScalarWhereWithAggregatesInput | nutrition_logsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"nutrition_logs"> | number
    user_id?: IntWithAggregatesFilter<"nutrition_logs"> | number
    recipe_id?: IntNullableWithAggregatesFilter<"nutrition_logs"> | number | null
    food_name?: StringNullableWithAggregatesFilter<"nutrition_logs"> | string | null
    calories_added?: IntWithAggregatesFilter<"nutrition_logs"> | number
    logged_at?: DateTimeWithAggregatesFilter<"nutrition_logs"> | Date | string
  }

  export type reviewsWhereInput = {
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    id?: IntFilter<"reviews"> | number
    user_id?: IntFilter<"reviews"> | number
    recipe_id?: IntFilter<"reviews"> | number
    rating?: IntFilter<"reviews"> | number
    comment?: StringNullableFilter<"reviews"> | string | null
    createdAt?: DateTimeFilter<"reviews"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    recipe?: XOR<RecipesScalarRelationFilter, recipesWhereInput>
  }

  export type reviewsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: usersOrderByWithRelationInput
    recipe?: recipesOrderByWithRelationInput
  }

  export type reviewsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    user_id?: IntFilter<"reviews"> | number
    recipe_id?: IntFilter<"reviews"> | number
    rating?: IntFilter<"reviews"> | number
    comment?: StringNullableFilter<"reviews"> | string | null
    createdAt?: DateTimeFilter<"reviews"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    recipe?: XOR<RecipesScalarRelationFilter, recipesWhereInput>
  }, "id">

  export type reviewsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: reviewsCountOrderByAggregateInput
    _avg?: reviewsAvgOrderByAggregateInput
    _max?: reviewsMaxOrderByAggregateInput
    _min?: reviewsMinOrderByAggregateInput
    _sum?: reviewsSumOrderByAggregateInput
  }

  export type reviewsScalarWhereWithAggregatesInput = {
    AND?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    OR?: reviewsScalarWhereWithAggregatesInput[]
    NOT?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"reviews"> | number
    user_id?: IntWithAggregatesFilter<"reviews"> | number
    recipe_id?: IntWithAggregatesFilter<"reviews"> | number
    rating?: IntWithAggregatesFilter<"reviews"> | number
    comment?: StringNullableWithAggregatesFilter<"reviews"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"reviews"> | Date | string
  }

  export type bookmarksWhereInput = {
    AND?: bookmarksWhereInput | bookmarksWhereInput[]
    OR?: bookmarksWhereInput[]
    NOT?: bookmarksWhereInput | bookmarksWhereInput[]
    id?: IntFilter<"bookmarks"> | number
    user_id?: IntFilter<"bookmarks"> | number
    recipe_id?: IntFilter<"bookmarks"> | number
    createdAt?: DateTimeFilter<"bookmarks"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    recipe?: XOR<RecipesScalarRelationFilter, recipesWhereInput>
  }

  export type bookmarksOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    createdAt?: SortOrder
    user?: usersOrderByWithRelationInput
    recipe?: recipesOrderByWithRelationInput
  }

  export type bookmarksWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_recipe_id?: bookmarksUser_idRecipe_idCompoundUniqueInput
    AND?: bookmarksWhereInput | bookmarksWhereInput[]
    OR?: bookmarksWhereInput[]
    NOT?: bookmarksWhereInput | bookmarksWhereInput[]
    user_id?: IntFilter<"bookmarks"> | number
    recipe_id?: IntFilter<"bookmarks"> | number
    createdAt?: DateTimeFilter<"bookmarks"> | Date | string
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    recipe?: XOR<RecipesScalarRelationFilter, recipesWhereInput>
  }, "id" | "user_id_recipe_id">

  export type bookmarksOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    createdAt?: SortOrder
    _count?: bookmarksCountOrderByAggregateInput
    _avg?: bookmarksAvgOrderByAggregateInput
    _max?: bookmarksMaxOrderByAggregateInput
    _min?: bookmarksMinOrderByAggregateInput
    _sum?: bookmarksSumOrderByAggregateInput
  }

  export type bookmarksScalarWhereWithAggregatesInput = {
    AND?: bookmarksScalarWhereWithAggregatesInput | bookmarksScalarWhereWithAggregatesInput[]
    OR?: bookmarksScalarWhereWithAggregatesInput[]
    NOT?: bookmarksScalarWhereWithAggregatesInput | bookmarksScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"bookmarks"> | number
    user_id?: IntWithAggregatesFilter<"bookmarks"> | number
    recipe_id?: IntWithAggregatesFilter<"bookmarks"> | number
    createdAt?: DateTimeWithAggregatesFilter<"bookmarks"> | Date | string
  }

  export type usersCreateInput = {
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesCreateNestedManyWithoutAuthorInput
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutUserInput
    reviews?: reviewsCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesUncheckedCreateNestedManyWithoutAuthorInput
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutUserInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUpdateManyWithoutAuthorNestedInput
    nutrition_logs?: nutrition_logsUpdateManyWithoutUserNestedInput
    reviews?: reviewsUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUncheckedUpdateManyWithoutAuthorNestedInput
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutUserNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type usersUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type recipesCreateInput = {
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    author: usersCreateNestedOneWithoutRecipesInput
    reviews?: reviewsCreateNestedManyWithoutRecipeInput
    bookmarks?: bookmarksCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutRecipeInput
  }

  export type recipesUncheckedCreateInput = {
    id?: number
    author_id: number
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    reviews?: reviewsUncheckedCreateNestedManyWithoutRecipeInput
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type recipesUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: usersUpdateOneRequiredWithoutRecipesNestedInput
    reviews?: reviewsUpdateManyWithoutRecipeNestedInput
    bookmarks?: bookmarksUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUpdateManyWithoutRecipeNestedInput
  }

  export type recipesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: reviewsUncheckedUpdateManyWithoutRecipeNestedInput
    bookmarks?: bookmarksUncheckedUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type recipesCreateManyInput = {
    id?: number
    author_id: number
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type recipesUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type recipesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nutrition_logsCreateInput = {
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
    user: usersCreateNestedOneWithoutNutrition_logsInput
    recipe?: recipesCreateNestedOneWithoutNutrition_logsInput
  }

  export type nutrition_logsUncheckedCreateInput = {
    id?: number
    user_id: number
    recipe_id?: number | null
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
  }

  export type nutrition_logsUpdateInput = {
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutNutrition_logsNestedInput
    recipe?: recipesUpdateOneWithoutNutrition_logsNestedInput
  }

  export type nutrition_logsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    recipe_id?: NullableIntFieldUpdateOperationsInput | number | null
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nutrition_logsCreateManyInput = {
    id?: number
    user_id: number
    recipe_id?: number | null
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
  }

  export type nutrition_logsUpdateManyMutationInput = {
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nutrition_logsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    recipe_id?: NullableIntFieldUpdateOperationsInput | number | null
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsCreateInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    user: usersCreateNestedOneWithoutReviewsInput
    recipe: recipesCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateInput = {
    id?: number
    user_id: number
    recipe_id: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type reviewsUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutReviewsNestedInput
    recipe?: recipesUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsCreateManyInput = {
    id?: number
    user_id: number
    recipe_id: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type reviewsUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookmarksCreateInput = {
    createdAt?: Date | string
    user: usersCreateNestedOneWithoutBookmarksInput
    recipe: recipesCreateNestedOneWithoutBookmarksInput
  }

  export type bookmarksUncheckedCreateInput = {
    id?: number
    user_id: number
    recipe_id: number
    createdAt?: Date | string
  }

  export type bookmarksUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutBookmarksNestedInput
    recipe?: recipesUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type bookmarksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookmarksCreateManyInput = {
    id?: number
    user_id: number
    recipe_id: number
    createdAt?: Date | string
  }

  export type bookmarksUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookmarksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type Enumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
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

  export type RecipesListRelationFilter = {
    every?: recipesWhereInput
    some?: recipesWhereInput
    none?: recipesWhereInput
  }

  export type Nutrition_logsListRelationFilter = {
    every?: nutrition_logsWhereInput
    some?: nutrition_logsWhereInput
    none?: nutrition_logsWhereInput
  }

  export type ReviewsListRelationFilter = {
    every?: reviewsWhereInput
    some?: reviewsWhereInput
    none?: reviewsWhereInput
  }

  export type BookmarksListRelationFilter = {
    every?: bookmarksWhereInput
    some?: bookmarksWhereInput
    none?: bookmarksWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type recipesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type nutrition_logsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reviewsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type bookmarksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    profile_picture_url?: SortOrder
    daily_calorie_goal?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
    daily_calorie_goal?: SortOrder
    weight?: SortOrder
    height?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    profile_picture_url?: SortOrder
    daily_calorie_goal?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    full_name?: SortOrder
    profile_picture_url?: SortOrder
    daily_calorie_goal?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
    daily_calorie_goal?: SortOrder
    weight?: SortOrder
    height?: SortOrder
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

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type Enumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type recipesCountOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    cuisine_type?: SortOrder
    description?: SortOrder
    calories_per_serving?: SortOrder
    cook_time_minutes?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    image_url?: SortOrder
    video_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type recipesAvgOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    calories_per_serving?: SortOrder
    cook_time_minutes?: SortOrder
  }

  export type recipesMaxOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    cuisine_type?: SortOrder
    description?: SortOrder
    calories_per_serving?: SortOrder
    cook_time_minutes?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    image_url?: SortOrder
    video_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type recipesMinOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    title?: SortOrder
    cuisine_type?: SortOrder
    description?: SortOrder
    calories_per_serving?: SortOrder
    cook_time_minutes?: SortOrder
    ingredients?: SortOrder
    instructions?: SortOrder
    image_url?: SortOrder
    video_url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type recipesSumOrderByAggregateInput = {
    id?: SortOrder
    author_id?: SortOrder
    calories_per_serving?: SortOrder
    cook_time_minutes?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type RecipesNullableScalarRelationFilter = {
    is?: recipesWhereInput | null
    isNot?: recipesWhereInput | null
  }

  export type nutrition_logsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    food_name?: SortOrder
    calories_added?: SortOrder
    logged_at?: SortOrder
  }

  export type nutrition_logsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    calories_added?: SortOrder
  }

  export type nutrition_logsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    food_name?: SortOrder
    calories_added?: SortOrder
    logged_at?: SortOrder
  }

  export type nutrition_logsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    food_name?: SortOrder
    calories_added?: SortOrder
    logged_at?: SortOrder
  }

  export type nutrition_logsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    calories_added?: SortOrder
  }

  export type RecipesScalarRelationFilter = {
    is?: recipesWhereInput
    isNot?: recipesWhereInput
  }

  export type reviewsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type reviewsAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    rating?: SortOrder
  }

  export type reviewsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type reviewsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type reviewsSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    rating?: SortOrder
  }

  export type bookmarksUser_idRecipe_idCompoundUniqueInput = {
    user_id: number
    recipe_id: number
  }

  export type bookmarksCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    createdAt?: SortOrder
  }

  export type bookmarksAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
  }

  export type bookmarksMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    createdAt?: SortOrder
  }

  export type bookmarksMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
    createdAt?: SortOrder
  }

  export type bookmarksSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    recipe_id?: SortOrder
  }

  export type recipesCreateNestedManyWithoutAuthorInput = {
    create?: XOR<recipesCreateWithoutAuthorInput, recipesUncheckedCreateWithoutAuthorInput> | recipesCreateWithoutAuthorInput[] | recipesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: recipesCreateOrConnectWithoutAuthorInput | recipesCreateOrConnectWithoutAuthorInput[]
    createMany?: recipesCreateManyAuthorInputEnvelope
    connect?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
  }

  export type nutrition_logsCreateNestedManyWithoutUserInput = {
    create?: XOR<nutrition_logsCreateWithoutUserInput, nutrition_logsUncheckedCreateWithoutUserInput> | nutrition_logsCreateWithoutUserInput[] | nutrition_logsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutUserInput | nutrition_logsCreateOrConnectWithoutUserInput[]
    createMany?: nutrition_logsCreateManyUserInputEnvelope
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
  }

  export type reviewsCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type bookmarksCreateNestedManyWithoutUserInput = {
    create?: XOR<bookmarksCreateWithoutUserInput, bookmarksUncheckedCreateWithoutUserInput> | bookmarksCreateWithoutUserInput[] | bookmarksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutUserInput | bookmarksCreateOrConnectWithoutUserInput[]
    createMany?: bookmarksCreateManyUserInputEnvelope
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
  }

  export type recipesUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<recipesCreateWithoutAuthorInput, recipesUncheckedCreateWithoutAuthorInput> | recipesCreateWithoutAuthorInput[] | recipesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: recipesCreateOrConnectWithoutAuthorInput | recipesCreateOrConnectWithoutAuthorInput[]
    createMany?: recipesCreateManyAuthorInputEnvelope
    connect?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
  }

  export type nutrition_logsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<nutrition_logsCreateWithoutUserInput, nutrition_logsUncheckedCreateWithoutUserInput> | nutrition_logsCreateWithoutUserInput[] | nutrition_logsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutUserInput | nutrition_logsCreateOrConnectWithoutUserInput[]
    createMany?: nutrition_logsCreateManyUserInputEnvelope
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type bookmarksUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<bookmarksCreateWithoutUserInput, bookmarksUncheckedCreateWithoutUserInput> | bookmarksCreateWithoutUserInput[] | bookmarksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutUserInput | bookmarksCreateOrConnectWithoutUserInput[]
    createMany?: bookmarksCreateManyUserInputEnvelope
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
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

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type Enumusers_roleFieldUpdateOperationsInput = {
    set?: $Enums.users_role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type recipesUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<recipesCreateWithoutAuthorInput, recipesUncheckedCreateWithoutAuthorInput> | recipesCreateWithoutAuthorInput[] | recipesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: recipesCreateOrConnectWithoutAuthorInput | recipesCreateOrConnectWithoutAuthorInput[]
    upsert?: recipesUpsertWithWhereUniqueWithoutAuthorInput | recipesUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: recipesCreateManyAuthorInputEnvelope
    set?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    disconnect?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    delete?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    connect?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    update?: recipesUpdateWithWhereUniqueWithoutAuthorInput | recipesUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: recipesUpdateManyWithWhereWithoutAuthorInput | recipesUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: recipesScalarWhereInput | recipesScalarWhereInput[]
  }

  export type nutrition_logsUpdateManyWithoutUserNestedInput = {
    create?: XOR<nutrition_logsCreateWithoutUserInput, nutrition_logsUncheckedCreateWithoutUserInput> | nutrition_logsCreateWithoutUserInput[] | nutrition_logsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutUserInput | nutrition_logsCreateOrConnectWithoutUserInput[]
    upsert?: nutrition_logsUpsertWithWhereUniqueWithoutUserInput | nutrition_logsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: nutrition_logsCreateManyUserInputEnvelope
    set?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    disconnect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    delete?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    update?: nutrition_logsUpdateWithWhereUniqueWithoutUserInput | nutrition_logsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: nutrition_logsUpdateManyWithWhereWithoutUserInput | nutrition_logsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: nutrition_logsScalarWhereInput | nutrition_logsScalarWhereInput[]
  }

  export type reviewsUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUserInput | reviewsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUserInput | reviewsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUserInput | reviewsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type bookmarksUpdateManyWithoutUserNestedInput = {
    create?: XOR<bookmarksCreateWithoutUserInput, bookmarksUncheckedCreateWithoutUserInput> | bookmarksCreateWithoutUserInput[] | bookmarksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutUserInput | bookmarksCreateOrConnectWithoutUserInput[]
    upsert?: bookmarksUpsertWithWhereUniqueWithoutUserInput | bookmarksUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: bookmarksCreateManyUserInputEnvelope
    set?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    disconnect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    delete?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    update?: bookmarksUpdateWithWhereUniqueWithoutUserInput | bookmarksUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: bookmarksUpdateManyWithWhereWithoutUserInput | bookmarksUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: bookmarksScalarWhereInput | bookmarksScalarWhereInput[]
  }

  export type recipesUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<recipesCreateWithoutAuthorInput, recipesUncheckedCreateWithoutAuthorInput> | recipesCreateWithoutAuthorInput[] | recipesUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: recipesCreateOrConnectWithoutAuthorInput | recipesCreateOrConnectWithoutAuthorInput[]
    upsert?: recipesUpsertWithWhereUniqueWithoutAuthorInput | recipesUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: recipesCreateManyAuthorInputEnvelope
    set?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    disconnect?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    delete?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    connect?: recipesWhereUniqueInput | recipesWhereUniqueInput[]
    update?: recipesUpdateWithWhereUniqueWithoutAuthorInput | recipesUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: recipesUpdateManyWithWhereWithoutAuthorInput | recipesUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: recipesScalarWhereInput | recipesScalarWhereInput[]
  }

  export type nutrition_logsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<nutrition_logsCreateWithoutUserInput, nutrition_logsUncheckedCreateWithoutUserInput> | nutrition_logsCreateWithoutUserInput[] | nutrition_logsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutUserInput | nutrition_logsCreateOrConnectWithoutUserInput[]
    upsert?: nutrition_logsUpsertWithWhereUniqueWithoutUserInput | nutrition_logsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: nutrition_logsCreateManyUserInputEnvelope
    set?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    disconnect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    delete?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    update?: nutrition_logsUpdateWithWhereUniqueWithoutUserInput | nutrition_logsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: nutrition_logsUpdateManyWithWhereWithoutUserInput | nutrition_logsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: nutrition_logsScalarWhereInput | nutrition_logsScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUserInput | reviewsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUserInput | reviewsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUserInput | reviewsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type bookmarksUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<bookmarksCreateWithoutUserInput, bookmarksUncheckedCreateWithoutUserInput> | bookmarksCreateWithoutUserInput[] | bookmarksUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutUserInput | bookmarksCreateOrConnectWithoutUserInput[]
    upsert?: bookmarksUpsertWithWhereUniqueWithoutUserInput | bookmarksUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: bookmarksCreateManyUserInputEnvelope
    set?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    disconnect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    delete?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    update?: bookmarksUpdateWithWhereUniqueWithoutUserInput | bookmarksUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: bookmarksUpdateManyWithWhereWithoutUserInput | bookmarksUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: bookmarksScalarWhereInput | bookmarksScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutRecipesInput = {
    create?: XOR<usersCreateWithoutRecipesInput, usersUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: usersCreateOrConnectWithoutRecipesInput
    connect?: usersWhereUniqueInput
  }

  export type reviewsCreateNestedManyWithoutRecipeInput = {
    create?: XOR<reviewsCreateWithoutRecipeInput, reviewsUncheckedCreateWithoutRecipeInput> | reviewsCreateWithoutRecipeInput[] | reviewsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutRecipeInput | reviewsCreateOrConnectWithoutRecipeInput[]
    createMany?: reviewsCreateManyRecipeInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type bookmarksCreateNestedManyWithoutRecipeInput = {
    create?: XOR<bookmarksCreateWithoutRecipeInput, bookmarksUncheckedCreateWithoutRecipeInput> | bookmarksCreateWithoutRecipeInput[] | bookmarksUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutRecipeInput | bookmarksCreateOrConnectWithoutRecipeInput[]
    createMany?: bookmarksCreateManyRecipeInputEnvelope
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
  }

  export type nutrition_logsCreateNestedManyWithoutRecipeInput = {
    create?: XOR<nutrition_logsCreateWithoutRecipeInput, nutrition_logsUncheckedCreateWithoutRecipeInput> | nutrition_logsCreateWithoutRecipeInput[] | nutrition_logsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutRecipeInput | nutrition_logsCreateOrConnectWithoutRecipeInput[]
    createMany?: nutrition_logsCreateManyRecipeInputEnvelope
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<reviewsCreateWithoutRecipeInput, reviewsUncheckedCreateWithoutRecipeInput> | reviewsCreateWithoutRecipeInput[] | reviewsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutRecipeInput | reviewsCreateOrConnectWithoutRecipeInput[]
    createMany?: reviewsCreateManyRecipeInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type bookmarksUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<bookmarksCreateWithoutRecipeInput, bookmarksUncheckedCreateWithoutRecipeInput> | bookmarksCreateWithoutRecipeInput[] | bookmarksUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutRecipeInput | bookmarksCreateOrConnectWithoutRecipeInput[]
    createMany?: bookmarksCreateManyRecipeInputEnvelope
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
  }

  export type nutrition_logsUncheckedCreateNestedManyWithoutRecipeInput = {
    create?: XOR<nutrition_logsCreateWithoutRecipeInput, nutrition_logsUncheckedCreateWithoutRecipeInput> | nutrition_logsCreateWithoutRecipeInput[] | nutrition_logsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutRecipeInput | nutrition_logsCreateOrConnectWithoutRecipeInput[]
    createMany?: nutrition_logsCreateManyRecipeInputEnvelope
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateOneRequiredWithoutRecipesNestedInput = {
    create?: XOR<usersCreateWithoutRecipesInput, usersUncheckedCreateWithoutRecipesInput>
    connectOrCreate?: usersCreateOrConnectWithoutRecipesInput
    upsert?: usersUpsertWithoutRecipesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutRecipesInput, usersUpdateWithoutRecipesInput>, usersUncheckedUpdateWithoutRecipesInput>
  }

  export type reviewsUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<reviewsCreateWithoutRecipeInput, reviewsUncheckedCreateWithoutRecipeInput> | reviewsCreateWithoutRecipeInput[] | reviewsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutRecipeInput | reviewsCreateOrConnectWithoutRecipeInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutRecipeInput | reviewsUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: reviewsCreateManyRecipeInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutRecipeInput | reviewsUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutRecipeInput | reviewsUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type bookmarksUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<bookmarksCreateWithoutRecipeInput, bookmarksUncheckedCreateWithoutRecipeInput> | bookmarksCreateWithoutRecipeInput[] | bookmarksUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutRecipeInput | bookmarksCreateOrConnectWithoutRecipeInput[]
    upsert?: bookmarksUpsertWithWhereUniqueWithoutRecipeInput | bookmarksUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: bookmarksCreateManyRecipeInputEnvelope
    set?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    disconnect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    delete?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    update?: bookmarksUpdateWithWhereUniqueWithoutRecipeInput | bookmarksUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: bookmarksUpdateManyWithWhereWithoutRecipeInput | bookmarksUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: bookmarksScalarWhereInput | bookmarksScalarWhereInput[]
  }

  export type nutrition_logsUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<nutrition_logsCreateWithoutRecipeInput, nutrition_logsUncheckedCreateWithoutRecipeInput> | nutrition_logsCreateWithoutRecipeInput[] | nutrition_logsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutRecipeInput | nutrition_logsCreateOrConnectWithoutRecipeInput[]
    upsert?: nutrition_logsUpsertWithWhereUniqueWithoutRecipeInput | nutrition_logsUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: nutrition_logsCreateManyRecipeInputEnvelope
    set?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    disconnect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    delete?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    update?: nutrition_logsUpdateWithWhereUniqueWithoutRecipeInput | nutrition_logsUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: nutrition_logsUpdateManyWithWhereWithoutRecipeInput | nutrition_logsUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: nutrition_logsScalarWhereInput | nutrition_logsScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<reviewsCreateWithoutRecipeInput, reviewsUncheckedCreateWithoutRecipeInput> | reviewsCreateWithoutRecipeInput[] | reviewsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutRecipeInput | reviewsCreateOrConnectWithoutRecipeInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutRecipeInput | reviewsUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: reviewsCreateManyRecipeInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutRecipeInput | reviewsUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutRecipeInput | reviewsUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type bookmarksUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<bookmarksCreateWithoutRecipeInput, bookmarksUncheckedCreateWithoutRecipeInput> | bookmarksCreateWithoutRecipeInput[] | bookmarksUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: bookmarksCreateOrConnectWithoutRecipeInput | bookmarksCreateOrConnectWithoutRecipeInput[]
    upsert?: bookmarksUpsertWithWhereUniqueWithoutRecipeInput | bookmarksUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: bookmarksCreateManyRecipeInputEnvelope
    set?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    disconnect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    delete?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    connect?: bookmarksWhereUniqueInput | bookmarksWhereUniqueInput[]
    update?: bookmarksUpdateWithWhereUniqueWithoutRecipeInput | bookmarksUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: bookmarksUpdateManyWithWhereWithoutRecipeInput | bookmarksUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: bookmarksScalarWhereInput | bookmarksScalarWhereInput[]
  }

  export type nutrition_logsUncheckedUpdateManyWithoutRecipeNestedInput = {
    create?: XOR<nutrition_logsCreateWithoutRecipeInput, nutrition_logsUncheckedCreateWithoutRecipeInput> | nutrition_logsCreateWithoutRecipeInput[] | nutrition_logsUncheckedCreateWithoutRecipeInput[]
    connectOrCreate?: nutrition_logsCreateOrConnectWithoutRecipeInput | nutrition_logsCreateOrConnectWithoutRecipeInput[]
    upsert?: nutrition_logsUpsertWithWhereUniqueWithoutRecipeInput | nutrition_logsUpsertWithWhereUniqueWithoutRecipeInput[]
    createMany?: nutrition_logsCreateManyRecipeInputEnvelope
    set?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    disconnect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    delete?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    connect?: nutrition_logsWhereUniqueInput | nutrition_logsWhereUniqueInput[]
    update?: nutrition_logsUpdateWithWhereUniqueWithoutRecipeInput | nutrition_logsUpdateWithWhereUniqueWithoutRecipeInput[]
    updateMany?: nutrition_logsUpdateManyWithWhereWithoutRecipeInput | nutrition_logsUpdateManyWithWhereWithoutRecipeInput[]
    deleteMany?: nutrition_logsScalarWhereInput | nutrition_logsScalarWhereInput[]
  }

  export type usersCreateNestedOneWithoutNutrition_logsInput = {
    create?: XOR<usersCreateWithoutNutrition_logsInput, usersUncheckedCreateWithoutNutrition_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutNutrition_logsInput
    connect?: usersWhereUniqueInput
  }

  export type recipesCreateNestedOneWithoutNutrition_logsInput = {
    create?: XOR<recipesCreateWithoutNutrition_logsInput, recipesUncheckedCreateWithoutNutrition_logsInput>
    connectOrCreate?: recipesCreateOrConnectWithoutNutrition_logsInput
    connect?: recipesWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutNutrition_logsNestedInput = {
    create?: XOR<usersCreateWithoutNutrition_logsInput, usersUncheckedCreateWithoutNutrition_logsInput>
    connectOrCreate?: usersCreateOrConnectWithoutNutrition_logsInput
    upsert?: usersUpsertWithoutNutrition_logsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutNutrition_logsInput, usersUpdateWithoutNutrition_logsInput>, usersUncheckedUpdateWithoutNutrition_logsInput>
  }

  export type recipesUpdateOneWithoutNutrition_logsNestedInput = {
    create?: XOR<recipesCreateWithoutNutrition_logsInput, recipesUncheckedCreateWithoutNutrition_logsInput>
    connectOrCreate?: recipesCreateOrConnectWithoutNutrition_logsInput
    upsert?: recipesUpsertWithoutNutrition_logsInput
    disconnect?: recipesWhereInput | boolean
    delete?: recipesWhereInput | boolean
    connect?: recipesWhereUniqueInput
    update?: XOR<XOR<recipesUpdateToOneWithWhereWithoutNutrition_logsInput, recipesUpdateWithoutNutrition_logsInput>, recipesUncheckedUpdateWithoutNutrition_logsInput>
  }

  export type usersCreateNestedOneWithoutReviewsInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    connect?: usersWhereUniqueInput
  }

  export type recipesCreateNestedOneWithoutReviewsInput = {
    create?: XOR<recipesCreateWithoutReviewsInput, recipesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: recipesCreateOrConnectWithoutReviewsInput
    connect?: recipesWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    upsert?: usersUpsertWithoutReviewsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReviewsInput, usersUpdateWithoutReviewsInput>, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type recipesUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<recipesCreateWithoutReviewsInput, recipesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: recipesCreateOrConnectWithoutReviewsInput
    upsert?: recipesUpsertWithoutReviewsInput
    connect?: recipesWhereUniqueInput
    update?: XOR<XOR<recipesUpdateToOneWithWhereWithoutReviewsInput, recipesUpdateWithoutReviewsInput>, recipesUncheckedUpdateWithoutReviewsInput>
  }

  export type usersCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<usersCreateWithoutBookmarksInput, usersUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: usersCreateOrConnectWithoutBookmarksInput
    connect?: usersWhereUniqueInput
  }

  export type recipesCreateNestedOneWithoutBookmarksInput = {
    create?: XOR<recipesCreateWithoutBookmarksInput, recipesUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: recipesCreateOrConnectWithoutBookmarksInput
    connect?: recipesWhereUniqueInput
  }

  export type usersUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<usersCreateWithoutBookmarksInput, usersUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: usersCreateOrConnectWithoutBookmarksInput
    upsert?: usersUpsertWithoutBookmarksInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBookmarksInput, usersUpdateWithoutBookmarksInput>, usersUncheckedUpdateWithoutBookmarksInput>
  }

  export type recipesUpdateOneRequiredWithoutBookmarksNestedInput = {
    create?: XOR<recipesCreateWithoutBookmarksInput, recipesUncheckedCreateWithoutBookmarksInput>
    connectOrCreate?: recipesCreateOrConnectWithoutBookmarksInput
    upsert?: recipesUpsertWithoutBookmarksInput
    connect?: recipesWhereUniqueInput
    update?: XOR<XOR<recipesUpdateToOneWithWhereWithoutBookmarksInput, recipesUpdateWithoutBookmarksInput>, recipesUncheckedUpdateWithoutBookmarksInput>
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumusers_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumusers_roleFilter<$PrismaModel> | $Enums.users_role
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

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumusers_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_role | Enumusers_roleFieldRefInput<$PrismaModel>
    in?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.users_role[] | ListEnumusers_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumusers_roleWithAggregatesFilter<$PrismaModel> | $Enums.users_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_roleFilter<$PrismaModel>
    _max?: NestedEnumusers_roleFilter<$PrismaModel>
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type recipesCreateWithoutAuthorInput = {
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    reviews?: reviewsCreateNestedManyWithoutRecipeInput
    bookmarks?: bookmarksCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutRecipeInput
  }

  export type recipesUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    reviews?: reviewsUncheckedCreateNestedManyWithoutRecipeInput
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type recipesCreateOrConnectWithoutAuthorInput = {
    where: recipesWhereUniqueInput
    create: XOR<recipesCreateWithoutAuthorInput, recipesUncheckedCreateWithoutAuthorInput>
  }

  export type recipesCreateManyAuthorInputEnvelope = {
    data: recipesCreateManyAuthorInput | recipesCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type nutrition_logsCreateWithoutUserInput = {
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
    recipe?: recipesCreateNestedOneWithoutNutrition_logsInput
  }

  export type nutrition_logsUncheckedCreateWithoutUserInput = {
    id?: number
    recipe_id?: number | null
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
  }

  export type nutrition_logsCreateOrConnectWithoutUserInput = {
    where: nutrition_logsWhereUniqueInput
    create: XOR<nutrition_logsCreateWithoutUserInput, nutrition_logsUncheckedCreateWithoutUserInput>
  }

  export type nutrition_logsCreateManyUserInputEnvelope = {
    data: nutrition_logsCreateManyUserInput | nutrition_logsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type reviewsCreateWithoutUserInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    recipe: recipesCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutUserInput = {
    id?: number
    recipe_id: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type reviewsCreateOrConnectWithoutUserInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput>
  }

  export type reviewsCreateManyUserInputEnvelope = {
    data: reviewsCreateManyUserInput | reviewsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type bookmarksCreateWithoutUserInput = {
    createdAt?: Date | string
    recipe: recipesCreateNestedOneWithoutBookmarksInput
  }

  export type bookmarksUncheckedCreateWithoutUserInput = {
    id?: number
    recipe_id: number
    createdAt?: Date | string
  }

  export type bookmarksCreateOrConnectWithoutUserInput = {
    where: bookmarksWhereUniqueInput
    create: XOR<bookmarksCreateWithoutUserInput, bookmarksUncheckedCreateWithoutUserInput>
  }

  export type bookmarksCreateManyUserInputEnvelope = {
    data: bookmarksCreateManyUserInput | bookmarksCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type recipesUpsertWithWhereUniqueWithoutAuthorInput = {
    where: recipesWhereUniqueInput
    update: XOR<recipesUpdateWithoutAuthorInput, recipesUncheckedUpdateWithoutAuthorInput>
    create: XOR<recipesCreateWithoutAuthorInput, recipesUncheckedCreateWithoutAuthorInput>
  }

  export type recipesUpdateWithWhereUniqueWithoutAuthorInput = {
    where: recipesWhereUniqueInput
    data: XOR<recipesUpdateWithoutAuthorInput, recipesUncheckedUpdateWithoutAuthorInput>
  }

  export type recipesUpdateManyWithWhereWithoutAuthorInput = {
    where: recipesScalarWhereInput
    data: XOR<recipesUpdateManyMutationInput, recipesUncheckedUpdateManyWithoutAuthorInput>
  }

  export type recipesScalarWhereInput = {
    AND?: recipesScalarWhereInput | recipesScalarWhereInput[]
    OR?: recipesScalarWhereInput[]
    NOT?: recipesScalarWhereInput | recipesScalarWhereInput[]
    id?: IntFilter<"recipes"> | number
    author_id?: IntFilter<"recipes"> | number
    title?: StringFilter<"recipes"> | string
    cuisine_type?: StringNullableFilter<"recipes"> | string | null
    description?: StringNullableFilter<"recipes"> | string | null
    calories_per_serving?: IntFilter<"recipes"> | number
    cook_time_minutes?: IntNullableFilter<"recipes"> | number | null
    ingredients?: StringFilter<"recipes"> | string
    instructions?: StringFilter<"recipes"> | string
    image_url?: StringNullableFilter<"recipes"> | string | null
    video_url?: StringNullableFilter<"recipes"> | string | null
    created_at?: DateTimeFilter<"recipes"> | Date | string
    updated_at?: DateTimeFilter<"recipes"> | Date | string
  }

  export type nutrition_logsUpsertWithWhereUniqueWithoutUserInput = {
    where: nutrition_logsWhereUniqueInput
    update: XOR<nutrition_logsUpdateWithoutUserInput, nutrition_logsUncheckedUpdateWithoutUserInput>
    create: XOR<nutrition_logsCreateWithoutUserInput, nutrition_logsUncheckedCreateWithoutUserInput>
  }

  export type nutrition_logsUpdateWithWhereUniqueWithoutUserInput = {
    where: nutrition_logsWhereUniqueInput
    data: XOR<nutrition_logsUpdateWithoutUserInput, nutrition_logsUncheckedUpdateWithoutUserInput>
  }

  export type nutrition_logsUpdateManyWithWhereWithoutUserInput = {
    where: nutrition_logsScalarWhereInput
    data: XOR<nutrition_logsUpdateManyMutationInput, nutrition_logsUncheckedUpdateManyWithoutUserInput>
  }

  export type nutrition_logsScalarWhereInput = {
    AND?: nutrition_logsScalarWhereInput | nutrition_logsScalarWhereInput[]
    OR?: nutrition_logsScalarWhereInput[]
    NOT?: nutrition_logsScalarWhereInput | nutrition_logsScalarWhereInput[]
    id?: IntFilter<"nutrition_logs"> | number
    user_id?: IntFilter<"nutrition_logs"> | number
    recipe_id?: IntNullableFilter<"nutrition_logs"> | number | null
    food_name?: StringNullableFilter<"nutrition_logs"> | string | null
    calories_added?: IntFilter<"nutrition_logs"> | number
    logged_at?: DateTimeFilter<"nutrition_logs"> | Date | string
  }

  export type reviewsUpsertWithWhereUniqueWithoutUserInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutUserInput, reviewsUncheckedUpdateWithoutUserInput>
    create: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutUserInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutUserInput, reviewsUncheckedUpdateWithoutUserInput>
  }

  export type reviewsUpdateManyWithWhereWithoutUserInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutUserInput>
  }

  export type reviewsScalarWhereInput = {
    AND?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    OR?: reviewsScalarWhereInput[]
    NOT?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    id?: IntFilter<"reviews"> | number
    user_id?: IntFilter<"reviews"> | number
    recipe_id?: IntFilter<"reviews"> | number
    rating?: IntFilter<"reviews"> | number
    comment?: StringNullableFilter<"reviews"> | string | null
    createdAt?: DateTimeFilter<"reviews"> | Date | string
  }

  export type bookmarksUpsertWithWhereUniqueWithoutUserInput = {
    where: bookmarksWhereUniqueInput
    update: XOR<bookmarksUpdateWithoutUserInput, bookmarksUncheckedUpdateWithoutUserInput>
    create: XOR<bookmarksCreateWithoutUserInput, bookmarksUncheckedCreateWithoutUserInput>
  }

  export type bookmarksUpdateWithWhereUniqueWithoutUserInput = {
    where: bookmarksWhereUniqueInput
    data: XOR<bookmarksUpdateWithoutUserInput, bookmarksUncheckedUpdateWithoutUserInput>
  }

  export type bookmarksUpdateManyWithWhereWithoutUserInput = {
    where: bookmarksScalarWhereInput
    data: XOR<bookmarksUpdateManyMutationInput, bookmarksUncheckedUpdateManyWithoutUserInput>
  }

  export type bookmarksScalarWhereInput = {
    AND?: bookmarksScalarWhereInput | bookmarksScalarWhereInput[]
    OR?: bookmarksScalarWhereInput[]
    NOT?: bookmarksScalarWhereInput | bookmarksScalarWhereInput[]
    id?: IntFilter<"bookmarks"> | number
    user_id?: IntFilter<"bookmarks"> | number
    recipe_id?: IntFilter<"bookmarks"> | number
    createdAt?: DateTimeFilter<"bookmarks"> | Date | string
  }

  export type usersCreateWithoutRecipesInput = {
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutUserInput
    reviews?: reviewsCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutRecipesInput = {
    id?: number
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutUserInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutRecipesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutRecipesInput, usersUncheckedCreateWithoutRecipesInput>
  }

  export type reviewsCreateWithoutRecipeInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    user: usersCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutRecipeInput = {
    id?: number
    user_id: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type reviewsCreateOrConnectWithoutRecipeInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutRecipeInput, reviewsUncheckedCreateWithoutRecipeInput>
  }

  export type reviewsCreateManyRecipeInputEnvelope = {
    data: reviewsCreateManyRecipeInput | reviewsCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type bookmarksCreateWithoutRecipeInput = {
    createdAt?: Date | string
    user: usersCreateNestedOneWithoutBookmarksInput
  }

  export type bookmarksUncheckedCreateWithoutRecipeInput = {
    id?: number
    user_id: number
    createdAt?: Date | string
  }

  export type bookmarksCreateOrConnectWithoutRecipeInput = {
    where: bookmarksWhereUniqueInput
    create: XOR<bookmarksCreateWithoutRecipeInput, bookmarksUncheckedCreateWithoutRecipeInput>
  }

  export type bookmarksCreateManyRecipeInputEnvelope = {
    data: bookmarksCreateManyRecipeInput | bookmarksCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type nutrition_logsCreateWithoutRecipeInput = {
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
    user: usersCreateNestedOneWithoutNutrition_logsInput
  }

  export type nutrition_logsUncheckedCreateWithoutRecipeInput = {
    id?: number
    user_id: number
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
  }

  export type nutrition_logsCreateOrConnectWithoutRecipeInput = {
    where: nutrition_logsWhereUniqueInput
    create: XOR<nutrition_logsCreateWithoutRecipeInput, nutrition_logsUncheckedCreateWithoutRecipeInput>
  }

  export type nutrition_logsCreateManyRecipeInputEnvelope = {
    data: nutrition_logsCreateManyRecipeInput | nutrition_logsCreateManyRecipeInput[]
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutRecipesInput = {
    update: XOR<usersUpdateWithoutRecipesInput, usersUncheckedUpdateWithoutRecipesInput>
    create: XOR<usersCreateWithoutRecipesInput, usersUncheckedCreateWithoutRecipesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutRecipesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutRecipesInput, usersUncheckedUpdateWithoutRecipesInput>
  }

  export type usersUpdateWithoutRecipesInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nutrition_logs?: nutrition_logsUpdateManyWithoutUserNestedInput
    reviews?: reviewsUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutRecipesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutUserNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUncheckedUpdateManyWithoutUserNestedInput
  }

  export type reviewsUpsertWithWhereUniqueWithoutRecipeInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutRecipeInput, reviewsUncheckedUpdateWithoutRecipeInput>
    create: XOR<reviewsCreateWithoutRecipeInput, reviewsUncheckedCreateWithoutRecipeInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutRecipeInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutRecipeInput, reviewsUncheckedUpdateWithoutRecipeInput>
  }

  export type reviewsUpdateManyWithWhereWithoutRecipeInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutRecipeInput>
  }

  export type bookmarksUpsertWithWhereUniqueWithoutRecipeInput = {
    where: bookmarksWhereUniqueInput
    update: XOR<bookmarksUpdateWithoutRecipeInput, bookmarksUncheckedUpdateWithoutRecipeInput>
    create: XOR<bookmarksCreateWithoutRecipeInput, bookmarksUncheckedCreateWithoutRecipeInput>
  }

  export type bookmarksUpdateWithWhereUniqueWithoutRecipeInput = {
    where: bookmarksWhereUniqueInput
    data: XOR<bookmarksUpdateWithoutRecipeInput, bookmarksUncheckedUpdateWithoutRecipeInput>
  }

  export type bookmarksUpdateManyWithWhereWithoutRecipeInput = {
    where: bookmarksScalarWhereInput
    data: XOR<bookmarksUpdateManyMutationInput, bookmarksUncheckedUpdateManyWithoutRecipeInput>
  }

  export type nutrition_logsUpsertWithWhereUniqueWithoutRecipeInput = {
    where: nutrition_logsWhereUniqueInput
    update: XOR<nutrition_logsUpdateWithoutRecipeInput, nutrition_logsUncheckedUpdateWithoutRecipeInput>
    create: XOR<nutrition_logsCreateWithoutRecipeInput, nutrition_logsUncheckedCreateWithoutRecipeInput>
  }

  export type nutrition_logsUpdateWithWhereUniqueWithoutRecipeInput = {
    where: nutrition_logsWhereUniqueInput
    data: XOR<nutrition_logsUpdateWithoutRecipeInput, nutrition_logsUncheckedUpdateWithoutRecipeInput>
  }

  export type nutrition_logsUpdateManyWithWhereWithoutRecipeInput = {
    where: nutrition_logsScalarWhereInput
    data: XOR<nutrition_logsUpdateManyMutationInput, nutrition_logsUncheckedUpdateManyWithoutRecipeInput>
  }

  export type usersCreateWithoutNutrition_logsInput = {
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesCreateNestedManyWithoutAuthorInput
    reviews?: reviewsCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutNutrition_logsInput = {
    id?: number
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesUncheckedCreateNestedManyWithoutAuthorInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutNutrition_logsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutNutrition_logsInput, usersUncheckedCreateWithoutNutrition_logsInput>
  }

  export type recipesCreateWithoutNutrition_logsInput = {
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    author: usersCreateNestedOneWithoutRecipesInput
    reviews?: reviewsCreateNestedManyWithoutRecipeInput
    bookmarks?: bookmarksCreateNestedManyWithoutRecipeInput
  }

  export type recipesUncheckedCreateWithoutNutrition_logsInput = {
    id?: number
    author_id: number
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    reviews?: reviewsUncheckedCreateNestedManyWithoutRecipeInput
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type recipesCreateOrConnectWithoutNutrition_logsInput = {
    where: recipesWhereUniqueInput
    create: XOR<recipesCreateWithoutNutrition_logsInput, recipesUncheckedCreateWithoutNutrition_logsInput>
  }

  export type usersUpsertWithoutNutrition_logsInput = {
    update: XOR<usersUpdateWithoutNutrition_logsInput, usersUncheckedUpdateWithoutNutrition_logsInput>
    create: XOR<usersCreateWithoutNutrition_logsInput, usersUncheckedCreateWithoutNutrition_logsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutNutrition_logsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutNutrition_logsInput, usersUncheckedUpdateWithoutNutrition_logsInput>
  }

  export type usersUpdateWithoutNutrition_logsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUpdateManyWithoutAuthorNestedInput
    reviews?: reviewsUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutNutrition_logsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUncheckedUpdateManyWithoutAuthorNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUncheckedUpdateManyWithoutUserNestedInput
  }

  export type recipesUpsertWithoutNutrition_logsInput = {
    update: XOR<recipesUpdateWithoutNutrition_logsInput, recipesUncheckedUpdateWithoutNutrition_logsInput>
    create: XOR<recipesCreateWithoutNutrition_logsInput, recipesUncheckedCreateWithoutNutrition_logsInput>
    where?: recipesWhereInput
  }

  export type recipesUpdateToOneWithWhereWithoutNutrition_logsInput = {
    where?: recipesWhereInput
    data: XOR<recipesUpdateWithoutNutrition_logsInput, recipesUncheckedUpdateWithoutNutrition_logsInput>
  }

  export type recipesUpdateWithoutNutrition_logsInput = {
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: usersUpdateOneRequiredWithoutRecipesNestedInput
    reviews?: reviewsUpdateManyWithoutRecipeNestedInput
    bookmarks?: bookmarksUpdateManyWithoutRecipeNestedInput
  }

  export type recipesUncheckedUpdateWithoutNutrition_logsInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: reviewsUncheckedUpdateManyWithoutRecipeNestedInput
    bookmarks?: bookmarksUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type usersCreateWithoutReviewsInput = {
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesCreateNestedManyWithoutAuthorInput
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutReviewsInput = {
    id?: number
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesUncheckedCreateNestedManyWithoutAuthorInput
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutUserInput
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutReviewsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
  }

  export type recipesCreateWithoutReviewsInput = {
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    author: usersCreateNestedOneWithoutRecipesInput
    bookmarks?: bookmarksCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutRecipeInput
  }

  export type recipesUncheckedCreateWithoutReviewsInput = {
    id?: number
    author_id: number
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    bookmarks?: bookmarksUncheckedCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type recipesCreateOrConnectWithoutReviewsInput = {
    where: recipesWhereUniqueInput
    create: XOR<recipesCreateWithoutReviewsInput, recipesUncheckedCreateWithoutReviewsInput>
  }

  export type usersUpsertWithoutReviewsInput = {
    update: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReviewsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type usersUpdateWithoutReviewsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUpdateManyWithoutAuthorNestedInput
    nutrition_logs?: nutrition_logsUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUncheckedUpdateManyWithoutAuthorNestedInput
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutUserNestedInput
    bookmarks?: bookmarksUncheckedUpdateManyWithoutUserNestedInput
  }

  export type recipesUpsertWithoutReviewsInput = {
    update: XOR<recipesUpdateWithoutReviewsInput, recipesUncheckedUpdateWithoutReviewsInput>
    create: XOR<recipesCreateWithoutReviewsInput, recipesUncheckedCreateWithoutReviewsInput>
    where?: recipesWhereInput
  }

  export type recipesUpdateToOneWithWhereWithoutReviewsInput = {
    where?: recipesWhereInput
    data: XOR<recipesUpdateWithoutReviewsInput, recipesUncheckedUpdateWithoutReviewsInput>
  }

  export type recipesUpdateWithoutReviewsInput = {
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: usersUpdateOneRequiredWithoutRecipesNestedInput
    bookmarks?: bookmarksUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUpdateManyWithoutRecipeNestedInput
  }

  export type recipesUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    bookmarks?: bookmarksUncheckedUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type usersCreateWithoutBookmarksInput = {
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesCreateNestedManyWithoutAuthorInput
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutUserInput
    reviews?: reviewsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutBookmarksInput = {
    id?: number
    username: string
    email: string
    password: string
    full_name?: string | null
    profile_picture_url?: string | null
    daily_calorie_goal?: number
    weight?: number | null
    height?: number | null
    role?: $Enums.users_role
    created_at?: Date | string
    updated_at?: Date | string
    recipes?: recipesUncheckedCreateNestedManyWithoutAuthorInput
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutUserInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutBookmarksInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBookmarksInput, usersUncheckedCreateWithoutBookmarksInput>
  }

  export type recipesCreateWithoutBookmarksInput = {
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    author: usersCreateNestedOneWithoutRecipesInput
    reviews?: reviewsCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsCreateNestedManyWithoutRecipeInput
  }

  export type recipesUncheckedCreateWithoutBookmarksInput = {
    id?: number
    author_id: number
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    reviews?: reviewsUncheckedCreateNestedManyWithoutRecipeInput
    nutrition_logs?: nutrition_logsUncheckedCreateNestedManyWithoutRecipeInput
  }

  export type recipesCreateOrConnectWithoutBookmarksInput = {
    where: recipesWhereUniqueInput
    create: XOR<recipesCreateWithoutBookmarksInput, recipesUncheckedCreateWithoutBookmarksInput>
  }

  export type usersUpsertWithoutBookmarksInput = {
    update: XOR<usersUpdateWithoutBookmarksInput, usersUncheckedUpdateWithoutBookmarksInput>
    create: XOR<usersCreateWithoutBookmarksInput, usersUncheckedCreateWithoutBookmarksInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBookmarksInput, usersUncheckedUpdateWithoutBookmarksInput>
  }

  export type usersUpdateWithoutBookmarksInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUpdateManyWithoutAuthorNestedInput
    nutrition_logs?: nutrition_logsUpdateManyWithoutUserNestedInput
    reviews?: reviewsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutBookmarksInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    profile_picture_url?: NullableStringFieldUpdateOperationsInput | string | null
    daily_calorie_goal?: IntFieldUpdateOperationsInput | number
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    role?: Enumusers_roleFieldUpdateOperationsInput | $Enums.users_role
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipes?: recipesUncheckedUpdateManyWithoutAuthorNestedInput
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutUserNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type recipesUpsertWithoutBookmarksInput = {
    update: XOR<recipesUpdateWithoutBookmarksInput, recipesUncheckedUpdateWithoutBookmarksInput>
    create: XOR<recipesCreateWithoutBookmarksInput, recipesUncheckedCreateWithoutBookmarksInput>
    where?: recipesWhereInput
  }

  export type recipesUpdateToOneWithWhereWithoutBookmarksInput = {
    where?: recipesWhereInput
    data: XOR<recipesUpdateWithoutBookmarksInput, recipesUncheckedUpdateWithoutBookmarksInput>
  }

  export type recipesUpdateWithoutBookmarksInput = {
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: usersUpdateOneRequiredWithoutRecipesNestedInput
    reviews?: reviewsUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUpdateManyWithoutRecipeNestedInput
  }

  export type recipesUncheckedUpdateWithoutBookmarksInput = {
    id?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: reviewsUncheckedUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type recipesCreateManyAuthorInput = {
    id?: number
    title: string
    cuisine_type?: string | null
    description?: string | null
    calories_per_serving: number
    cook_time_minutes?: number | null
    ingredients: string
    instructions: string
    image_url?: string | null
    video_url?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type nutrition_logsCreateManyUserInput = {
    id?: number
    recipe_id?: number | null
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
  }

  export type reviewsCreateManyUserInput = {
    id?: number
    recipe_id: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type bookmarksCreateManyUserInput = {
    id?: number
    recipe_id: number
    createdAt?: Date | string
  }

  export type recipesUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: reviewsUpdateManyWithoutRecipeNestedInput
    bookmarks?: bookmarksUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUpdateManyWithoutRecipeNestedInput
  }

  export type recipesUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: reviewsUncheckedUpdateManyWithoutRecipeNestedInput
    bookmarks?: bookmarksUncheckedUpdateManyWithoutRecipeNestedInput
    nutrition_logs?: nutrition_logsUncheckedUpdateManyWithoutRecipeNestedInput
  }

  export type recipesUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    cuisine_type?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories_per_serving?: IntFieldUpdateOperationsInput | number
    cook_time_minutes?: NullableIntFieldUpdateOperationsInput | number | null
    ingredients?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    image_url?: NullableStringFieldUpdateOperationsInput | string | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nutrition_logsUpdateWithoutUserInput = {
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: recipesUpdateOneWithoutNutrition_logsNestedInput
  }

  export type nutrition_logsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    recipe_id?: NullableIntFieldUpdateOperationsInput | number | null
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nutrition_logsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    recipe_id?: NullableIntFieldUpdateOperationsInput | number | null
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUpdateWithoutUserInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: recipesUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookmarksUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recipe?: recipesUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type bookmarksUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookmarksUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    recipe_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsCreateManyRecipeInput = {
    id?: number
    user_id: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
  }

  export type bookmarksCreateManyRecipeInput = {
    id?: number
    user_id: number
    createdAt?: Date | string
  }

  export type nutrition_logsCreateManyRecipeInput = {
    id?: number
    user_id: number
    food_name?: string | null
    calories_added: number
    logged_at?: Date | string
  }

  export type reviewsUpdateWithoutRecipeInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookmarksUpdateWithoutRecipeInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutBookmarksNestedInput
  }

  export type bookmarksUncheckedUpdateWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookmarksUncheckedUpdateManyWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nutrition_logsUpdateWithoutRecipeInput = {
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutNutrition_logsNestedInput
  }

  export type nutrition_logsUncheckedUpdateWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type nutrition_logsUncheckedUpdateManyWithoutRecipeInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    food_name?: NullableStringFieldUpdateOperationsInput | string | null
    calories_added?: IntFieldUpdateOperationsInput | number
    logged_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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