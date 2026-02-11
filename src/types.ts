import type { ComponentProps, ComponentType } from 'react';

export type BorderStyle =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'dash-dot'
  | 'dash-double-dot';

interface MapProps<T extends string>
  extends Omit<ComponentProps<'svg'>, 'onSelect'> {
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  hoverColor?: string | Record<T, string>;
  selectColor?: string | Record<T, string>;
  stateColor?: string | Record<T, string>;
  map: Record<T, string>;
  disableClick?: boolean;
  disableHover?: boolean;
  borderStyle?: BorderStyle;
  HintComponent?: ComponentType<HintProps<T>>;
}

export interface SingleSelectMapProps<T extends string> extends MapProps<T> {
  onSelect?: (state: T | null) => void;
}

export interface MultipleSelectMapProps<T extends string> extends MapProps<T> {
  onSelect?: (state: T | null, selectedStates?: T[]) => void;
}

export interface HintProps<T extends string> {
  mouseX: number;
  mouseY: number;
  state: T;
}
