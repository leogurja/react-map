import { type MouseEventHandler, useState } from 'react';
import { getStateColor } from '../utils/get-state-color';

export function useHoveredState<T extends string>(
  selectedState: T | T[] | null,
  selectColor: string | Record<T, string>,
  hoverColor: string | Record<T, string>,
  stateColor: string | Record<T, string>
) {
  const [hoveredState, setHoveredState] = useState<T | null>(null);

  const handleMouseEnter: MouseEventHandler<SVGPathElement> = (event) => {
    const path = event.target as SVGPathElement;
    const hoveredState = path.dataset.state as T;
    const isSelected = Array.isArray(selectedState)
      ? selectedState.includes(hoveredState)
      : selectedState === hoveredState;

    setHoveredState(hoveredState);

    path.style.fill = getStateColor(
      isSelected ? selectColor : hoverColor,
      hoveredState
    );
  };

  const handleMouseLeave: MouseEventHandler<SVGPathElement> = (event) => {
    const path = event.target as SVGPathElement;
    const hoveredState = path.dataset.state as T;
    const isSelected = Array.isArray(selectedState)
      ? selectedState.includes(hoveredState)
      : selectedState === hoveredState;

    setHoveredState(null);

    path.style.fill = getStateColor(
      isSelected ? selectColor : stateColor,
      hoveredState
    );
  };

  return { hoveredState, handleMouseEnter, handleMouseLeave };
}
