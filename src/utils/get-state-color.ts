export function getStateColor<T extends string>(
  color: string | Record<T, string>,
  state: T
) {
  return typeof color === 'string' ? color : color[state];
}
