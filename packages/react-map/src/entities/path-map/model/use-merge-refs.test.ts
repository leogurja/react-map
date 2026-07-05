import { renderHook } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { useMergeRefs } from "./use-merge-refs";

describe("useMergeRefs", () => {
  it("assigns the node to object refs", () => {
    const ref1 = createRef<HTMLDivElement>();
    const ref2 = createRef<HTMLDivElement>();
    const node = document.createElement("div");

    const { result } = renderHook(() => useMergeRefs(ref1, ref2));
    result.current(node);

    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
  });

  it("calls callback refs with the node", () => {
    const callback = vi.fn<(node: HTMLDivElement | null) => void>();
    const node = document.createElement("div");

    const { result } = renderHook(() => useMergeRefs(callback));
    result.current(node);

    expect(callback).toHaveBeenCalledWith(node);
  });

  it("ignores undefined refs", () => {
    const ref = createRef<HTMLDivElement>();
    const node = document.createElement("div");

    const { result } = renderHook(() => useMergeRefs(undefined, ref, undefined));
    result.current(node);

    expect(ref.current).toBe(node);
  });
});
