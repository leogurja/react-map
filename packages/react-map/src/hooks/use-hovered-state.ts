import { useCallback, useState } from "react";

export function useHoveredState<T extends string>() {
  const [hoveredState, setHoveredState] = useState<T | null>(null);

  const handleMouseEnter = useCallback((event: React.MouseEvent<SVGPathElement>) => {
    const path = event.target as SVGPathElement;
    const hoveredState = path.dataset.state as T;

    setHoveredState(hoveredState);
  }, []);

  const handleMouseLeave = useCallback(() => setHoveredState(null), []);

  return { hoveredState, handleMouseEnter, handleMouseLeave };
}
