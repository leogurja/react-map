import type { HintProps, PathParams } from "./types";

export function defaultPathStyle({ isHovered, isSelected }: PathParams): React.CSSProperties {
  return {
    fill: isHovered ? "#303030" : isSelected ? "#ff0000" : "white",
    stroke: "black",
    strokeWidth: 0.5,
  };
}

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
