import { describe, expect, it } from "vitest";

import { resolvePathClassName } from "./path-classname";

const params = {
  state: "regionA" as const,
  isHovered: false,
  isSelected: true,
};

describe("resolvePathClassName", () => {
  it("returns undefined when className is undefined", () => {
    expect(resolvePathClassName(undefined, params)).toBeUndefined();
  });

  it("returns a string className as-is", () => {
    expect(resolvePathClassName("path-default", params)).toBe("path-default");
  });

  it("calls a function className with path state", () => {
    expect(resolvePathClassName(({ state, isSelected }) => `${state}-${isSelected}`, params)).toBe(
      "regionA-true",
    );
  });
});
