export interface PathState<T extends string = string> {
  state: T;
  isHovered: boolean;
  isSelected: boolean;
}
