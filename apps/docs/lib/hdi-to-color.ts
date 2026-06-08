/** Maps Human Development Index (0–1) to an HSL green→red fill color. */
export function hdiToColor(hdi: number | undefined): string {
  if (hdi == null) {
    return "#e2e8f0";
  }

  const clamped = Math.min(1, Math.max(0, hdi));
  const hue = clamped * 120;
  return `hsl(${hue} 55% 42%)`;
}
