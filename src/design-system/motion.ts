/**
 * Motion durations (ms). Motion must explain state or causality —
 * never idle spinning, decorative particles, or ambient animation.
 */
export const motion = {
  fast: 120,
  normal: 240,
  focus: 600,
  tour: 900,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function resolveDuration(durationMs: number): number {
  return prefersReducedMotion() ? 0 : durationMs;
}
