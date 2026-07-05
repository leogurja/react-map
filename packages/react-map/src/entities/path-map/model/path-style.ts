import type { PathState } from "./path-state";

export type PathStyle<T extends string> =
  | React.CSSProperties
  | ((params: PathState<T>) => React.CSSProperties);

export function resolvePathStyle<T extends string>(
  style: PathStyle<T> = {},
  params: PathState<T>,
): React.CSSProperties {
  return typeof style === "function" ? style(params) : style;
}

export function defaultPathStyle({ isHovered, isSelected }: PathState): React.CSSProperties {
  return {
    fill: isHovered ? "#303030" : isSelected ? "#ff0000" : "white",
    stroke: "black",
    strokeWidth: 0.5,
  };
}
