/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { tv, type VariantProps } from "tailwind-variants";

/** ユニオンをインターセクションに変換するユーティリティ */
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

/** スタイルオブジェクト（複数の tv 関数）から variant 型情報をまとめて抽出する */
type ExtractStyleVariantProps<
  Styles extends Record<string, (...args: any[]) => string>
> = UnionToIntersection<{
  [K in keyof Styles]: VariantProps<Styles[K]>;
}[keyof Styles]>;

export type VariantPropsOfStyleHook<Hook> =
  Hook extends (userCtx: unknown) => infer Styles
    ? Styles extends Record<string, (...args: unknown[]) => string>
      ? ExtractStyleVariantProps<Styles>
      : never
    : never;


/**
 * createStyleHook
 *
 * ユーザー定義コンテキスト (UserCtx) を受け取り、
 * 内部で { tv, merge } と展開したユーザーコンテキストを渡して
 * スタイル定義オブジェクトを生成します。
 */
export function createStyleHook<
  UserCtx,
  Styles extends Record<string, (...args: any[]) => string>
>(
  fn: (ctx: { tv: typeof tv;  } & UserCtx) => Styles
) {
  return (userCtx: UserCtx): Styles =>
    useMemo(() => fn({ tv, ...userCtx }), [userCtx]);
}
