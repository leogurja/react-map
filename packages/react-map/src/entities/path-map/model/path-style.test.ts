import { describe, expect, it } from "vitest";

import { defaultPathStyle, resolvePathStyle } from "./path-style";

const params = {
  state: "regionA" as const,
  isHovered: false,
  isSelected: false,
};

describe("resolvePathStyle", () => {
  it("returns an object style as-is", () => {
    expect(resolvePathStyle({ opacity: 0.5 }, params)).toEqual({ opacity: 0.5 });
  });

  it("calls a function style with path state", () => {
    expect(
      resolvePathStyle(({ isSelected }) => ({ opacity: isSelected ? 1 : 0.5 }), {
        ...params,
        isSelected: true,
      }),
    ).toEqual({ opacity: 1 });
  });

  it("defaults to an empty object", () => {
    expect(resolvePathStyle(undefined, params)).toEqual({});
  });
});

describe("defaultPathStyle", () => {
  it("returns the default fill, stroke, and strokeWidth", () => {
    expect(defaultPathStyle(params)).toEqual({
      fill: "white",
      stroke: "black",
      strokeWidth: 0.5,
    });
  });

  it("uses the hover fill when hovered", () => {
    expect(defaultPathStyle({ ...params, isHovered: true }).fill).toBe("#303030");
  });

  it("uses the selected fill when selected", () => {
    expect(defaultPathStyle({ ...params, isSelected: true }).fill).toBe("#ff0000");
  });

  it("prioritizes hover over selected", () => {
    expect(defaultPathStyle({ ...params, isHovered: true, isSelected: true }).fill).toBe("#303030");
  });
});
