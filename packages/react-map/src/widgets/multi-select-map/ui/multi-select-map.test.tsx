import { fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { MultiSelectMap, type MultiSelectMapProps } from "./multi-select-map";

const testMap = {
  regionA: "M0 0 L10 0 L10 10 Z",
  regionB: "M20 0 L30 0 L30 10 Z",
} as const;

type TestState = keyof typeof testMap;

function getPath(container: HTMLElement, state: TestState) {
  return container.querySelector<SVGPathElement>(`path[data-state="${state}"]`);
}

describe.each([{ disableHover: true }, { disableHover: false }] as const)(
  "when disableHover is $disableHover",
  ({ disableHover }) => {
    function createProps(
      props: Omit<MultiSelectMapProps<TestState>, "map" | "disableHover"> = {},
    ): MultiSelectMapProps<TestState> {
      return disableHover
        ? { map: testMap, disableHover: true, ...props }
        : { map: testMap, ...props };
    }

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
      const { container } = render(<MultiSelectMap {...createProps()} />);

      expect(container.querySelector("svg")).not.toBeNull();
      expect(container.querySelectorAll("path")).toHaveLength(2);
    });

    it("selects a region on click when uncontrolled", () => {
      const { container } = render(<MultiSelectMap {...createProps()} />);

      fireEvent.click(getPath(container, "regionA")!);

      expect(getPath(container, "regionA")?.getAttribute("data-selected")).toBe("true");
      expect(getPath(container, "regionA")?.style.fill).toBe("rgb(255, 0, 0)");
    });

    it("deselects a region when clicked again", () => {
      const { container } = render(<MultiSelectMap {...createProps()} />);
      const path = getPath(container, "regionA")!;

      fireEvent.click(path);
      fireEvent.click(path);

      expect(path.getAttribute("data-selected")).toBeNull();
      expect(path.style.fill).toBe("white");
    });

    it("allows multiple regions to be selected", () => {
      const { container } = render(<MultiSelectMap {...createProps()} />);

      fireEvent.click(getPath(container, "regionA")!);
      fireEvent.click(getPath(container, "regionB")!);

      expect(getPath(container, "regionA")?.getAttribute("data-selected")).toBe("true");
      expect(getPath(container, "regionB")?.getAttribute("data-selected")).toBe("true");
    });

    it("calls onChange with the updated selection", () => {
      const onChange = vi.fn<(value: TestState[]) => void>();
      const { container } = render(<MultiSelectMap {...createProps({ onChange })} />);

      fireEvent.click(getPath(container, "regionA")!);
      fireEvent.click(getPath(container, "regionB")!);
      fireEvent.click(getPath(container, "regionA")!);

      expect(onChange).toHaveBeenNthCalledWith(1, ["regionA"]);
      expect(onChange).toHaveBeenNthCalledWith(2, ["regionA", "regionB"]);
      expect(onChange).toHaveBeenNthCalledWith(3, ["regionB"]);
    });

    it("uses defaultValue for the initial selection", () => {
      const { container } = render(
        <MultiSelectMap {...createProps({ defaultValue: ["regionB"] })} />,
      );

      expect(getPath(container, "regionB")?.getAttribute("data-selected")).toBe("true");
      expect(getPath(container, "regionA")?.getAttribute("data-selected")).toBeNull();
    });

    it("uses the controlled value", () => {
      const onChange = vi.fn<(value: TestState[]) => void>();
      const { container, rerender } = render(
        <MultiSelectMap {...createProps({ value: ["regionA"], onChange })} />,
      );

      expect(getPath(container, "regionA")?.getAttribute("data-selected")).toBe("true");

      fireEvent.click(getPath(container, "regionB")!);

      expect(onChange).toHaveBeenCalledWith(["regionA", "regionB"]);
      expect(getPath(container, "regionB")?.getAttribute("data-selected")).toBeNull();

      rerender(<MultiSelectMap {...createProps({ value: ["regionA", "regionB"], onChange })} />);

      expect(getPath(container, "regionB")?.getAttribute("data-selected")).toBe("true");
    });
  },
);
