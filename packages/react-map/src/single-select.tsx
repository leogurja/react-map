import { useCallback, useMemo } from "react";

import { DefaultHint, defaultPathStyle } from "./defaults";
import { useControllableState } from "./hooks/use-controllable-state";
import { useHoveredState } from "./hooks/use-hovered-state";
import { useMergeRefs } from "./hooks/use-merge-refs";
import { useMousePosition } from "./hooks/use-mouse-position";
import { useViewbox } from "./hooks/use-viewbox";
import type { SingleSelectMapProps } from "./types";

export function SingleSelectMap<T extends string>({
  value,
  onChange,
  defaultValue = null,
  map,
  disableClick,
  pathClassName,
  pathStyle,
  HintComponent = DefaultHint,
  className,
  style,
  ref: externalRef,
  ...rest
}: SingleSelectMapProps<T>) {
  const { x, y } = useMousePosition();
  const [selectedState, setSelectedState] = useControllableState({
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

      setSelectedState?.(selectedState === currentState ? null : currentState);
    },
    [selectedState, setSelectedState],
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
        {states.map((state) => {
          const isHovered = hoveredState === state;
          const isSelected = selectedState === state;

          const colorParams = {
            state,
            isHovered,
            isSelected,
          };

          const resolvedClassName =
            typeof pathClassName === "function" ? pathClassName(colorParams) : pathClassName;
          const resolvedStyle =
            typeof pathStyle === "function" ? pathStyle(colorParams) : pathStyle;

          return (
            <path
              key={state}
              onClick={disableClick ? undefined : handleClick}
              className={resolvedClassName}
              data-state={state}
              data-hovered={isHovered || undefined}
              data-selected={isSelected || undefined}
              onMouseEnter={HintComponent == null ? undefined : handleMouseEnter}
              onMouseLeave={HintComponent == null ? undefined : handleMouseLeave}
              d={map[state]}
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
