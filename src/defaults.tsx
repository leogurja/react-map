import type { HintProps } from './types';

export const DEFAULT_WIDTH = 500;
export const DEFAULT_MAP_COLOR = '#ffffff';
export const DEFAULT_STROKE_COLOR = '#000000';
export const DEFAULT_STROKE_WIDTH = 0.5;
export const DEFAULT_HOVER_COLOR = '#303030';
export const DEFAULT_SELECTED_COLOR = '#ff0000';

export function DefaultHint({ mouseX, mouseY, state }: HintProps) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: 5,
        border: '1px solid #ccc',
        pointerEvents: 'none',
        zIndex: 1000,
        position: 'fixed',
        top: mouseY + 20,
        left: mouseX + 20,
        color: 'black'
      }}
    >
      {state}
    </div>
  );
}
