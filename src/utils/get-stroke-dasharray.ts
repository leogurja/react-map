import type { BorderStyle } from '../types';

export function getStrokeDasharray(borderStyle?: BorderStyle) {
  switch (borderStyle) {
    case 'dashed':
      return '8 4';
    case 'dotted':
      return '2 2';
    case 'dash-dot':
      return '8 4 2 4';
    case 'dash-double-dot':
      return '8 4 2 4 2 4';
    default:
      return 'none';
  }
}
