/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { tv, type VariantProps } from "tailwind-variants";

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

type ExtractStyleVariantProps<
  Styles extends Record<string, (...args: any[]) => string>
> = UnionToIntersection<{
  [K in keyof Styles]: VariantProps<Styles[K]>;
}[keyof Styles]>;

export type VariantPropsOfStyleHook<Hook> =
  Hook extends (userCtx: any) => infer Styles
    ? Styles extends Record<string, (...args: any[]) => string>
      ? ExtractStyleVariantProps<Styles>
      : never
    : never;

export function createStyleHook<
  UserCtx,
  Styles extends Record<string, (...args: any[]) => string>
>(
  fn: (ctx: { tv: typeof tv; context: UserCtx  }) => Styles
) {
  return (userCtx: UserCtx): Styles =>
    useMemo(() => fn({ tv, context: userCtx }), [userCtx]);
}
