import { DefaultHint } from "@/features/hoverable-map/config/default-hint";
import { useMousePosition } from "@/features/hoverable-map/model/use-mouse-position";

export type HintComponent<T extends string> = React.ComponentType<HintProps<T>>;

export interface HintProps<T extends string> {
  mouseX: number;
  mouseY: number;
  state: T;
}

export interface RenderHintProps<T extends string> {
  Hint?: HintComponent<T> | undefined;
  state: T;
}

export function RenderHint<T extends string>({ Hint = DefaultHint, state }: RenderHintProps<T>) {
  const { x, y } = useMousePosition();

  return <Hint mouseX={x} mouseY={y} state={state} />;
}
