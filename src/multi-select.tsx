import { type MouseEventHandler, useMemo, useState } from 'react';
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
import type { MultipleSelectMapProps } from './types';
import { getStateColor } from './utils/get-state-color';
import { getStrokeDasharray } from './utils/get-stroke-dasharray';

export function MultiSelectMap<T extends string>({
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
}: MultipleSelectMapProps<T>) {
  const { x, y } = useMousePosition();
  const [selectedStates, setSelectedStates] = useState<T[]>([]);
  const { hoveredState, handleMouseEnter, handleMouseLeave } = useHoveredState(
    selectedStates,
    selectColor,
    hoverColor,
    stateColor
  );
  const states = useMemo(() => Object.keys(map) as T[], [map]);

  const handleClick: MouseEventHandler<SVGPathElement> = (event) => {
    const path = event.target as SVGPathElement;
    const currentState = path.dataset.state as T;

    if (selectedStates.includes(currentState)) {
      const updatedSelectedStates = selectedStates.filter(
        (state) => state !== currentState
      );

      path.style.fill = getStateColor(stateColor, currentState);

      setSelectedStates(updatedSelectedStates);
      onSelect?.(currentState, updatedSelectedStates);
      return;
    }

    setSelectedStates((prevStates) => {
      const updatedStates = [...prevStates, currentState];
      path.style.fill = getStateColor(selectColor, currentState);

      onSelect?.(currentState, updatedStates);
      return updatedStates;
    });
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
          {states?.map((code) => (
            // biome-ignore lint/a11y/noStaticElementInteractions: has to be a path
            <path
              key={code}
              onClick={disableClick ? undefined : handleClick}
              data-state={code}
              onMouseEnter={disableHover ? undefined : handleMouseEnter}
              onMouseLeave={disableHover ? undefined : handleMouseLeave}
              d={map[code]}
              style={{
                fill: getStateColor(stateColor, code),
                cursor: disableClick ? 'default' : 'pointer',
                strokeDasharray: getStrokeDasharray(borderStyle)
              }}
            />
          ))}
        </svg>
      </div>
      {hoveredState && (
        <HintComponent mouseX={x} mouseY={y} state={hoveredState} />
      )}
    </>
  );
}
