import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useControlled } from "./use-controlled";

describe("useControlled", () => {
  it("returns the default value when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControlled({ controlled: undefined, default: "default", name: "TestComponent" }),
    );

    expect(result.current[0]).toBe("default");
  });

  it("updates internal state when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControlled({ controlled: undefined, default: "default", name: "TestComponent" }),
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
  });

  it("supports functional updates when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControlled({ controlled: undefined, default: 1, name: "TestComponent" }),
    );

    act(() => {
      result.current[1]((previous) => previous + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it("returns the controlled value when controlled", () => {
    const { result } = renderHook(() =>
      useControlled({ controlled: "controlled", default: "default", name: "TestComponent" }),
    );

    expect(result.current[0]).toBe("controlled");
  });

  it("treats null as a controlled value", () => {
    const { result } = renderHook(() =>
      useControlled({ controlled: null, default: "default", name: "TestComponent" }),
    );

    expect(result.current[0]).toBeNull();
  });

  it("does not update internal state when controlled", () => {
    const { result } = renderHook(() =>
      useControlled({ controlled: "controlled", default: "default", name: "TestComponent" }),
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("controlled");
  });

  it("follows controlled prop updates", () => {
    const { result, rerender } = renderHook(
      ({ controlled }) => useControlled({ controlled, default: "default", name: "TestComponent" }),
      { initialProps: { controlled: "a" as string | undefined } },
    );

    expect(result.current[0]).toBe("a");

    rerender({ controlled: "b" });

    expect(result.current[0]).toBe("b");
  });

  it("warns when switching from uncontrolled to controlled", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const { rerender } = renderHook(
      ({ controlled }) =>
        useControlled({
          controlled,
          default: "default",
          name: "TestComponent",
          state: "selected",
        }),
      { initialProps: { controlled: undefined as string | undefined } },
    );

    rerender({ controlled: "value" });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining(
        "changing the uncontrolled selected state of TestComponent to be controlled",
      ),
    );
  });

  it("warns when switching from controlled to uncontrolled", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const { rerender } = renderHook(
      ({ controlled }) => useControlled({ controlled, default: "default", name: "TestComponent" }),
      { initialProps: { controlled: "value" as string | undefined } },
    );

    rerender({ controlled: undefined });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining(
        "changing the controlled value state of TestComponent to be uncontrolled",
      ),
    );
  });

  it("warns when default prop changes on an uncontrolled component", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const { rerender } = renderHook(
      ({ default: defaultProp }) =>
        useControlled({ controlled: undefined, default: defaultProp, name: "TestComponent" }),
      { initialProps: { default: "initial" as string | undefined } },
    );

    rerender({ default: "changed" });

    expect(error).toHaveBeenCalledWith(
      expect.stringContaining("changing the default value state of an uncontrolled TestComponent"),
    );
  });

  describe("when env is production", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "production";
    });

    afterEach(() => {
      process.env.NODE_ENV = "test";
    });

    it("does not warn when default prop changes on an uncontrolled component", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      const { rerender } = renderHook(
        ({ default: defaultProp }) =>
          useControlled({ controlled: undefined, default: defaultProp, name: "TestComponent" }),
        { initialProps: { default: "initial" as string | undefined } },
      );

      rerender({ default: "changed" });

      expect(error).not.toHaveBeenCalled();
    });

    it("does not warn when controlled prop changes on a controlled component", () => {
      const error = vi.spyOn(console, "error").mockImplementation(() => {});

      const { rerender } = renderHook(
        ({ controlled }) =>
          useControlled({ controlled, default: "default", name: "TestComponent" }),
        { initialProps: { controlled: "value" as string | undefined } },
      );

      rerender({ controlled: undefined });

      expect(error).not.toHaveBeenCalled();
    });
  });
});
