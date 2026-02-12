export function getStateColor<T extends string>(
  color: string | ((state: T) => string),
  state: T
) {
  return typeof color === 'string' ? color : color(state);
}
