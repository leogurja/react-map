import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { HintProps } from "./hint";
import { HoverableMap } from "./hoverable-map";

const testMap = {
  regionA: "M0 0 L10 0 L10 10 Z",
  regionB: "M20 0 L30 0 L30 10 Z",
} as const;

type TestState = keyof typeof testMap;

function getPath(container: HTMLElement, state: TestState) {
  return container.querySelector<SVGPathElement>(`path[data-state="${state}"]`);
}

describe("HoverableMap", () => {
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

  it("renders the underlying map", () => {
    const { container } = render(<HoverableMap map={testMap} />);

    expect(container.querySelector("svg")).not.toBeNull();
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });

  it("marks a path as hovered on mouse enter", () => {
    const { container } = render(<HoverableMap map={testMap} />);
    const path = getPath(container, "regionA");

    fireEvent.mouseEnter(path!);

    expect(path?.getAttribute("data-hovered")).toBe("true");
    expect(path?.style.fill).toBe("rgb(48, 48, 48)");
  });

  it("clears hovered state on mouse leave", () => {
    const { container } = render(<HoverableMap map={testMap} />);
    const path = getPath(container, "regionA");

    fireEvent.mouseEnter(path!);
    fireEvent.mouseLeave(path!);

    expect(path?.getAttribute("data-hovered")).toBeNull();
    expect(path?.style.fill).toBe("white");
  });

  it("shows the default hint while hovering", () => {
    const { container } = render(<HoverableMap map={testMap} />);

    fireEvent.mouseEnter(getPath(container, "regionA")!);

    expect(screen.getByText("regionA")).toBeTruthy();
  });

  it("does not show a hint when Hint is null", () => {
    const { container } = render(<HoverableMap map={testMap} Hint={null} />);

    fireEvent.mouseEnter(getPath(container, "regionA")!);

    expect(screen.queryByText("regionA")).toBeNull();
  });

  it("renders a custom hint while hovering", () => {
    function CustomHint({ state }: HintProps<TestState>) {
      return <div data-testid="custom-hint">{state}</div>;
    }

    const { container } = render(<HoverableMap map={testMap} Hint={CustomHint} />);

    fireEvent.mouseEnter(getPath(container, "regionB")!);

    expect(screen.getByTestId("custom-hint").textContent).toBe("regionB");
  });

  it("keeps only one region hovered at a time", () => {
    const { container } = render(<HoverableMap map={testMap} />);
    const regionA = getPath(container, "regionA");
    const regionB = getPath(container, "regionB");

    fireEvent.mouseEnter(regionA!);
    fireEvent.mouseEnter(regionB!);

    expect(regionA?.getAttribute("data-hovered")).toBeNull();
    expect(regionB?.getAttribute("data-hovered")).toBe("true");
    expect(screen.getByText("regionB")).toBeTruthy();
    expect(screen.queryByText("regionA")).toBeNull();
  });
});
