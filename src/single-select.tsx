import { type MouseEventHandler, useId, useMemo, useState } from 'react';
import {
  DEFAULT_HOVER_COLOR,
  DEFAULT_MAP_COLOR,
  DEFAULT_SELECTED_COLOR,
  DEFAULT_STROKE_COLOR,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_WIDTH,
  DefaultHint
} from './defaults';
import { useMousePosition } from './hooks/mouseTrack';
import { useHoveredState } from './hooks/use-hovered-state';
import type { SingleSelectMapProps } from './types';
import { getStateColor } from './utils/get-state-color';
import { getStrokeDasharray } from './utils/get-stroke-dasharray';

export function SingleSelectMap<T extends string>({
  size = DEFAULT_WIDTH,
  strokeColor = DEFAULT_STROKE_COLOR,
  selectColor = DEFAULT_SELECTED_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  hoverColor = DEFAULT_HOVER_COLOR,
  onSelect,
  stateColor = DEFAULT_MAP_COLOR,
  map,
  disableClick,
  disableHover,
  borderStyle,
  HintComponent = DefaultHint,
  ...rest
}: SingleSelectMapProps<T>) {
  const instanceId = useId();
  const { x, y } = useMousePosition();
  const [selectedState, setSelectedState] = useState<T | null>(null);
  const { hoveredState, handleMouseEnter, handleMouseLeave } = useHoveredState(
    selectedState,
    selectColor,
    hoverColor,
    stateColor
  );
  const states = useMemo(() => Object.keys(map) as T[], [map]);

  const handleClick: MouseEventHandler<SVGPathElement> = (event) => {
    const path = event.target as SVGPathElement;
    const currentState = path.dataset.state as T;

    if (selectedState === currentState) {
      path.style.fill = getStateColor(stateColor, currentState);
      setSelectedState(null);
      onSelect?.(null);
      return;
    }

    if (selectedState) {
      const previousPath = document.getElementById(
        `${selectedState}-${instanceId}`
      );
      if (previousPath) {
        previousPath.style.fill = getStateColor(stateColor, selectedState);
      }
    }

    setSelectedState(currentState);
    onSelect?.(currentState);
  };

  return (
    <>
      <div
        className="map"
        style={{
          width: size,
          stroke: strokeColor,
          strokeWidth
        }}
      >
        {/** biome-ignore lint/a11y/noSvgWithoutTitle: no title is needed */}
        <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" {...rest}>
          {states?.map((state) => (
            // biome-ignore lint/a11y/noStaticElementInteractions: has to be a path
            <path
              key={state}
              onClick={disableClick ? undefined : handleClick}
              data-state={state}
              onMouseEnter={disableHover ? undefined : handleMouseEnter}
              onMouseLeave={disableHover ? undefined : handleMouseLeave}
              id={`${state}-${instanceId}`}
              d={map[state]}
              style={{
                fill: getStateColor(stateColor, state),
                cursor: disableClick ? 'default' : 'pointer',
                strokeDasharray: getStrokeDasharray(borderStyle)
              }}
            />
          ))}
        </svg>
      </div>
      {!disableHover && hoveredState && (
        <HintComponent mouseX={x} mouseY={y} state={hoveredState} />
      )}
    </>
  );
}
