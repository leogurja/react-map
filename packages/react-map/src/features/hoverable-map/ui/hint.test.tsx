import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { RenderHint, type HintProps } from "./hint";

describe("RenderHint", () => {
  it("renders the hovered state with the default hint", () => {
    render(<RenderHint state="regionA" />);

    expect(screen.getByText("regionA")).toBeTruthy();
  });

  it("positions the default hint relative to the mouse", () => {
    render(<RenderHint state="regionA" />);

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 50 }));
    });

    const hint = screen.getByText("regionA");

    expect(hint.style.position).toBe("fixed");
    expect(hint.style.top).toBe("70px");
    expect(hint.style.left).toBe("120px");
    expect(hint.style.pointerEvents).toBe("none");
  });

  it("renders a custom hint component with mouse position and state", () => {
    function CustomHint({ mouseX, mouseY, state }: HintProps<"regionA">) {
      return <div data-testid="custom-hint">{`${state}:${mouseX}:${mouseY}`}</div>;
    }

    render(<RenderHint Hint={CustomHint} state="regionA" />);

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 10, clientY: 20 }));
    });

    expect(screen.getByTestId("custom-hint").textContent).toBe("regionA:10:20");
  });
});
