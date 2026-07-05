import type { PathState } from "./path-state";

export type PathClassName<T extends string> = string | ((params: PathState<T>) => string);

export function resolvePathClassName<T extends string>(
  className: PathClassName<T> | undefined,
  params: PathState<T>,
) {
  return typeof className === "function" ? className(params) : className;
}
