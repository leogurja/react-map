import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SvgMap } from "./path-map";

const testMap = {
  regionA: "M0 0 L10 0 L10 10 Z",
  regionB: "M20 0 L30 0 L30 10 Z",
} as const;

type TestState = keyof typeof testMap;

function getSvg(container: HTMLElement) {
  return container.querySelector("svg");
}

function getPath(container: HTMLElement, state: TestState) {
  return container.querySelector<SVGPathElement>(`path[data-state="${state}"]`);
}

describe("SvgMap", () => {
  beforeEach(() => {
    SVGSVGElement.prototype.getBBox = vi.fn<() => DOMRect>(() => ({
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
    }));
  });

  it("renders one path per map region", () => {
    const { container } = render(<SvgMap map={testMap} />);

    const svg = getSvg(container);
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("version")).toBe("1.1");
    expect(container.querySelectorAll("path")).toHaveLength(2);

    expect(getPath(container, "regionA")?.getAttribute("d")).toBe(testMap.regionA);
    expect(getPath(container, "regionB")?.getAttribute("d")).toBe(testMap.regionB);
  });

  it("updates viewBox from the svg bounding box", () => {
    const { container } = render(<SvgMap map={testMap} />);

    expect(getSvg(container)?.getAttribute("viewBox")).toBe("0 0 100 50");
  });

  it("applies selected and hovered state to paths", () => {
    const { container } = render(
      <SvgMap
        map={testMap}
        isSelected={(state) => state === "regionA"}
        isHovered={(state) => state === "regionB"}
      />,
    );

    const selectedPath = getPath(container, "regionA");
    const hoveredPath = getPath(container, "regionB");

    expect(selectedPath?.getAttribute("data-selected")).toBe("true");
    expect(selectedPath?.style.fill).toBe("rgb(255, 0, 0)");

    expect(hoveredPath?.getAttribute("data-hovered")).toBe("true");
    expect(hoveredPath?.style.fill).toBe("rgb(48, 48, 48)");

    expect(getPath(container, "regionB")?.getAttribute("data-selected")).toBeNull();
    expect(selectedPath?.getAttribute("data-hovered")).toBeNull();
  });

  it("resolves custom className and style per path", () => {
    const { container } = render(
      <SvgMap
        map={testMap}
        pathClassName={({ state }) => `path-${state}`}
        pathStyle={({ isSelected }) => ({ opacity: isSelected ? 0.5 : 1 })}
        isSelected={(state) => state === "regionA"}
      />,
    );

    expect(getPath(container, "regionA")?.getAttribute("class")).toBe("path-regionA");
    expect(getPath(container, "regionA")?.style.opacity).toBe("0.5");
    expect(getPath(container, "regionB")?.getAttribute("class")).toBe("path-regionB");
    expect(getPath(container, "regionB")?.style.opacity).toBe("1");
  });

  it("fires interaction callbacks with the correct state", () => {
    const onPathClick = vi.fn<() => void>();
    const onPathMouseEnter = vi.fn<() => void>();
    const onPathMouseLeave = vi.fn<() => void>();

    const { container } = render(
      <SvgMap
        map={testMap}
        onPathClick={onPathClick}
        onPathMouseEnter={onPathMouseEnter}
        onPathMouseLeave={onPathMouseLeave}
      />,
    );

    const path = getPath(container, "regionA");
    expect(path).not.toBeNull();

    fireEvent.mouseEnter(path!);
    fireEvent.click(path!);
    fireEvent.mouseLeave(path!);

    expect(onPathMouseEnter).toHaveBeenCalledWith(
      "regionA",
      expect.objectContaining({ type: "mouseenter" }),
    );
    expect(onPathClick).toHaveBeenCalledWith("regionA", expect.objectContaining({ type: "click" }));
    expect(onPathMouseLeave).toHaveBeenCalledWith(
      "regionA",
      expect.objectContaining({ type: "mouseleave" }),
    );
  });
});
