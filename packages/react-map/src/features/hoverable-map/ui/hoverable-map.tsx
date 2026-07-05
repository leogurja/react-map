import { useCallback, useState } from "react";

import { SvgMap, type SvgMapProps } from "@/entities/path-map";
import { RenderHint, type HintComponent } from "@/features/hoverable-map/ui/hint";

export interface HoverableMapProps<T extends string> extends Omit<
  SvgMapProps<T>,
  "isHovered" | "onPathMouseEnter" | "onPathMouseLeave"
> {
  Hint?: HintComponent<T> | null | undefined;
}

export function HoverableMap<T extends string>({ Hint, ...props }: HoverableMapProps<T>) {
  const [hoveredState, setHoveredState] = useState<T | null>(null);

  const handleMouseEnter = useCallback((state: T) => setHoveredState(state), []);
  const handleMouseLeave = useCallback(() => setHoveredState(null), []);
  const isHovered = useCallback((state: T) => hoveredState === state, [hoveredState]);

  return (
    <>
      <SvgMap
        {...props}
        isHovered={isHovered}
        onPathMouseEnter={handleMouseEnter}
        onPathMouseLeave={handleMouseLeave}
      />
      {Hint !== null && hoveredState !== null && <RenderHint Hint={Hint} state={hoveredState} />}
    </>
  );
}
