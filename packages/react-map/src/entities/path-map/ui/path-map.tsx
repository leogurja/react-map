import { useMemo } from "react";

import { resolvePathClassName, type PathClassName } from "@/entities/path-map/model/path-classname";
import type { PathMap } from "@/entities/path-map/model/path-map";
import {
  defaultPathStyle,
  resolvePathStyle,
  type PathStyle,
} from "@/entities/path-map/model/path-style";
import { useMergeRefs } from "@/entities/path-map/model/use-merge-refs";
import { useViewbox } from "@/entities/path-map/model/use-viewbox";

export interface SvgMapProps<T extends string> extends Omit<
  React.ComponentProps<"svg">,
  "onSelect" | "onChange"
> {
  map: PathMap<T>;
  pathClassName?: PathClassName<T>;
  pathStyle?: PathStyle<T>;
  isSelected?: (state: T) => boolean;
  isHovered?: (state: T) => boolean;
  onPathClick?: (state: T, event: React.MouseEvent<SVGPathElement>) => void;
  onPathMouseEnter?: (state: T, event: React.MouseEvent<SVGPathElement>) => void;
  onPathMouseLeave?: (state: T, event: React.MouseEvent<SVGPathElement>) => void;
}

export function SvgMap<T extends string>({
  map,
  onPathClick,
  isSelected,
  isHovered,
  onPathMouseEnter,
  onPathMouseLeave,
  pathClassName,
  pathStyle,
  ref: externalRef,
  ...props
}: SvgMapProps<T>) {
  const { ref, viewBox } = useViewbox(map);

  const states = useMemo(() => Object.keys(map) as T[], [map]);

  const mergedRef = useMergeRefs(ref, externalRef);

  return (
    <svg {...props} version="1.1" ref={mergedRef} viewBox={viewBox}>
      {states.map((state) => {
        const params = {
          state,
          isHovered: isHovered?.(state) ?? false,
          isSelected: isSelected?.(state) ?? false,
        };

        return (
          <path
            key={state}
            className={resolvePathClassName(pathClassName, params)}
            data-state={params.state}
            data-hovered={params.isHovered || undefined}
            data-selected={params.isSelected || undefined}
            style={{
              ...defaultPathStyle(params),
              ...resolvePathStyle(pathStyle, params),
            }}
            d={map[state]}
            onClick={(event) => onPathClick?.(state, event)}
            onMouseEnter={(event) => onPathMouseEnter?.(state, event)}
            onMouseLeave={(event) => onPathMouseLeave?.(state, event)}
          />
        );
      })}
    </svg>
  );
}
