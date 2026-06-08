export interface PathParams<T extends string = string> {
  state: T;
  isHovered: boolean;
  isSelected: boolean;
}

interface MapProps<T extends string> extends Omit<
  React.ComponentProps<"svg">,
  "onSelect" | "onChange"
> {
  pathClassName?: string | ((params: PathParams<T>) => string);
  pathStyle?: React.CSSProperties | ((params: PathParams<T>) => React.CSSProperties);
  map: Record<T, string>;
  disableClick?: boolean;
  disableHover?: boolean;
  HintComponent?: React.ComponentType<HintProps<T>> | null;
}

export interface SingleSelectMapProps<T extends string> extends MapProps<T> {
  value?: T | null;
  onChange?: (value: T | null) => void;
  defaultValue?: T | null;
}

export interface MultipleSelectMapProps<T extends string> extends MapProps<T> {
  value?: T[];
  onChange?: React.Dispatch<React.SetStateAction<T[]>>;
  defaultValue?: T[];
}

export interface HintProps<T extends string> {
  mouseX: number;
  mouseY: number;
  state: T;
}
