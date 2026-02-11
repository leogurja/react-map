import type { ComponentProps, ComponentType } from 'react';

export type BorderStyle =
  | 'solid'
  | 'dashed'
  | 'dotted'
  | 'dash-dot'
  | 'dash-double-dot';

export interface MapProps<States extends string>
  extends Omit<ComponentProps<'svg'>, 'onSelect'> {
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
  hoverColor?: string | Record<States, string>;
  selectColor?: string | Record<States, string>;
  stateColor?: string | Record<States, string>;
  map: Record<States, string>;
  disableClick?: boolean;
  disableHover?: boolean;
  borderStyle?: BorderStyle;
  HintComponent?: ComponentType<HintProps>;
}

export interface SingleSelectMapProps<States extends string>
  extends MapProps<States> {
  onSelect?: (state: States | null) => void;
}

export interface MultipleSelectMapProps<States extends string>
  extends MapProps<States> {
  onSelect?: (state: States | null, selectedStates?: States[]) => void;
}

export interface HintProps {
  mouseX: number;
  mouseY: number;
  state: string;
}
