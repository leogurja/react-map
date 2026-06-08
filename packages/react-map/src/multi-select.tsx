import { useCallback, useMemo } from "react";

import { defaultPathStyle, DefaultHint } from "./defaults";
import { useControllableState } from "./hooks/use-controllable-state";
import { useHoveredState } from "./hooks/use-hovered-state";
import { useMergeRefs } from "./hooks/use-merge-refs";
import { useMousePosition } from "./hooks/use-mouse-position";
import { useViewbox } from "./hooks/use-viewbox";
import type { MultipleSelectMapProps } from "./types";

export function MultiSelectMap<T extends string>({
  value,
  onChange,
  defaultValue = [],
  map,
  disableClick,
  disableHover,
  pathClassName,
  pathStyle,
  HintComponent = DefaultHint,
  className,
  style,
  ref: externalRef,
  ...rest
}: MultipleSelectMapProps<T>) {
  const { x, y } = useMousePosition();
  const [selectedStates, setSelectedStates] = useControllableState({
    value,
    onChange,
    defaultValue,
  });
  const { ref, viewBox } = useViewbox(map);
  const { hoveredState, handleMouseEnter, handleMouseLeave } = useHoveredState<T>();
  const states = useMemo(() => Object.keys(map) as T[], [map]);

  const handleClick = useCallback(
    (event: React.MouseEvent<SVGPathElement>) => {
      const path = event.target as SVGPathElement;
      const currentState = path.dataset.state as T;

      setSelectedStates?.(
        selectedStates.includes(currentState)
          ? selectedStates.filter((s) => s !== currentState)
          : [...selectedStates, currentState],
      );
    },
    [selectedStates, setSelectedStates],
  );

  const mergedRef = useMergeRefs(ref, externalRef);

  return (
    <>
      <svg
        {...rest}
        version="1.1"
        ref={mergedRef}
        viewBox={viewBox}
        className={className}
        style={className ? style : { width: "100%", height: "100%", ...style }}
      >
        {states.map((code) => {
          const isHovered = hoveredState === code;
          const isSelected = selectedStates.includes(code);

          const colorParams = {
            state: code,
            isHovered,
            isSelected,
          };

          const resolvedClassName =
            typeof pathClassName === "function" ? pathClassName(colorParams) : pathClassName;
          const resolvedStyle =
            typeof pathStyle === "function" ? pathStyle(colorParams) : pathStyle;

          return (
            <path
              key={code}
              onClick={disableClick ? undefined : handleClick}
              data-state={code}
              data-hovered={isHovered}
              data-selected={isSelected}
              className={resolvedClassName}
              onMouseEnter={disableHover ? undefined : handleMouseEnter}
              onMouseLeave={disableHover ? undefined : handleMouseLeave}
              d={map[code]}
              style={{
                ...defaultPathStyle(colorParams),
                ...resolvedStyle,
              }}
            />
          );
        })}
      </svg>
      {HintComponent != null && hoveredState && (
        <HintComponent mouseX={x} mouseY={y} state={hoveredState} />
      )}
    </>
  );
}
