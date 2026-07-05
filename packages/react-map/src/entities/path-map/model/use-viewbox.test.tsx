import { render, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useViewbox } from "./use-viewbox";

const testMap = {
  regionA: "M0 0 L10 0 L10 10 Z",
};

function ViewboxProbe({ map }: { map: Record<string, string> }) {
  const { ref, viewBox } = useViewbox(map);

  return (
    <svg ref={ref} data-testid="svg" data-viewbox={viewBox}>
      <path d={Object.values(map)[0]} />
    </svg>
  );
}

describe("useViewbox", () => {
  beforeEach(() => {
    SVGSVGElement.prototype.getBBox = vi.fn<() => DOMRect>(() => ({
      x: 10,
      y: 20,
      width: 30,
      height: 40,
      bottom: 60,
      left: 10,
      right: 40,
      top: 20,
      toJSON: () => ({
        x: 10,
        y: 20,
        width: 30,
        height: 40,
        bottom: 60,
        left: 10,
        right: 40,
        top: 20,
      }),
    }));
  });

  it("updates viewBox from the svg bounding box", () => {
    const { getByTestId } = render(<ViewboxProbe map={testMap} />);

    expect(getByTestId("svg").dataset.viewbox).toBe("10 20 30 40");
  });

  it("recomputes viewBox when the map changes", () => {
    const getBBox = vi
      .fn<() => DOMRect>()
      .mockReturnValueOnce({
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        bottom: 50,
        left: 0,
        right: 100,
        top: 0,
        toJSON: () => ({
          x: 0,
          y: 0,
          width: 100,
          height: 50,
          bottom: 50,
          left: 0,
          right: 100,
          top: 0,
        }),
      })
      .mockReturnValueOnce({
        x: 5,
        y: 5,
        width: 80,
        height: 40,
        bottom: 45,
        left: 5,
        right: 85,
        top: 5,
        toJSON: () => ({
          x: 5,
          y: 5,
          width: 80,
          height: 40,
          bottom: 45,
          left: 5,
          right: 85,
          top: 5,
        }),
      });

    SVGSVGElement.prototype.getBBox = getBBox;

    const nextMap = {
      regionB: "M20 0 L30 0 L30 10 Z",
    };

    const { getByTestId, rerender } = render(<ViewboxProbe map={testMap} />);

    expect(getByTestId("svg").dataset.viewbox).toBe("0 0 100 50");

    rerender(<ViewboxProbe map={nextMap} />);

    expect(getByTestId("svg").dataset.viewbox).toBe("5 5 80 40");
    expect(getBBox).toHaveBeenCalledTimes(2);
  });

  it("handles null refs", () => {
    const { result } = renderHook(() => useViewbox(testMap));

    expect(result.current.ref.current).toBeNull();
    expect(result.current.viewBox).toEqual("0 0 100 100");
  });
});
