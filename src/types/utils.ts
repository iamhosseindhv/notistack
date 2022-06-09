export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * type MyType = {
 *      a: string
 *      b: never
 * }
 *
 * OmitNever<MyType> --> { a: string }
 */
type OmitNever<T> = Pick<
  T,
  {
    [Prop in keyof T]: [T[Prop]] extends [never] ? never : Prop;
  }[keyof T]
>;

/**
 * type Type1 = { a: string; b: number }
 * type Type2 = { b: boolean; c: string }
 *
 * Override<Type1, Type2> --> {
 *      a: string
 *      b: boolean
 *      c: string
 * }
 */
type Override<T, U> = Omit<T, keyof U> & U;

type MarkInvalidVariantAsNever<T> = {
  [Key in keyof T]: T[Key] extends true ? T[Key] : T[Key] extends Record<string, unknown> ? T[Key] : never;
};

export type GetWhitelistedVariants<V extends string, U> = OmitNever<
  MarkInvalidVariantAsNever<Override<Record<V, true>, U>>
>;
