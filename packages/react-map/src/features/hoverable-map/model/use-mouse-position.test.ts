import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useMousePosition } from "./use-mouse-position";

describe("useMousePosition", () => {
  it("starts at the origin", () => {
    const { result } = renderHook(() => useMousePosition());

    expect(result.current).toEqual({ x: 0, y: 0 });
  });

  it("tracks window mouse movement", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 120, clientY: 80 }));
    });

    expect(result.current).toEqual({ x: 120, y: 80 });
  });

  it("updates position on subsequent mouse moves", () => {
    const { result } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 20 }));
    });

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 30, clientY: 40 }));
    });

    expect(result.current).toEqual({ x: 30, y: 40 });
  });

  it("stops tracking after unmount", () => {
    const { result, unmount } = renderHook(() => useMousePosition());

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 20 }));
    });

    expect(result.current).toEqual({ x: 10, y: 20 });

    unmount();

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 999, clientY: 888 }));
    });

    expect(result.current).toEqual({ x: 10, y: 20 });
  });
});
