import type { HintProps } from "@/features/hoverable-map/ui/hint";

export function DefaultHint<T extends string>({ mouseX, mouseY, state }: HintProps<T>) {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        borderRadius: 5,
        border: "1px solid #ccc",
        pointerEvents: "none",
        zIndex: 1000,
        position: "fixed",
        top: mouseY + 20,
        left: mouseX + 20,
        color: "black",
      }}
    >
      {state}
    </div>
  );
}
