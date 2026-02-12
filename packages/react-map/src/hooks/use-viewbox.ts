import { useLayoutEffect, useRef, useState } from 'react';

export function useViewbox(map: Record<string, string>) {
  const [viewBox, setViewBox] = useState<string>('0 0 100 100');
  const ref = useRef<SVGSVGElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: boundingBox changes when map changes
  useLayoutEffect(() => {
    if (!ref.current) return;

    const boundingBox = ref.current.getBBox();
    setViewBox(
      `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`
    );
  }, [map]);

  return { ref, viewBox };
}
