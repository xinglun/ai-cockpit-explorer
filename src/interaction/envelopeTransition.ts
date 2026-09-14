import { motion as motionTokens } from "@/design-system/motion";

export type Vec3 = readonly [number, number, number];

/** Linear interpolation, clamped to [0, 1]. */
export function lerp(a: number, b: number, t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return a + (b - a) * clamped;
}

export function lerpVec3(current: Vec3, target: Vec3, t: number): Vec3 {
  return [lerp(current[0], target[0], t), lerp(current[1], target[1], t), lerp(current[2], target[2], t)];
}

/** True once every component is within `tolerance` of the target. */
export function vec3Reached(current: Vec3, target: Vec3, tolerance = 0.01): boolean {
  return current.every((value, index) => Math.abs(value - target[index]) < tolerance);
}

/**
 * Advances `current` toward `target` by one frame's worth of the Work
 * Item envelope's stage transition, given elapsed time in ms. Pure and
 * testable independently of any R3F/WebGL context — a component just
 * calls this once per frame and writes the result back into a ref.
 * When `reducedMotion` is true, jumps straight to `target` (no morph).
 */
export function nextEnvelopeStep(
  current: Vec3,
  target: Vec3,
  deltaMs: number,
  reducedMotion: boolean,
): Vec3 {
  if (reducedMotion) return target;
  if (vec3Reached(current, target)) return target;
  // motionTokens.focus is the time to *fully settle*, not one time
  // constant of the exponential ease — dividing by 4 means ~4 time
  // constants (>98% convergence) elapse over that duration, so the
  // envelope reliably reaches (not just approaches) the target instead
  // of asymptotically crawling toward it forever.
  const step = Math.min(1, deltaMs / (motionTokens.focus / 4));
  return lerpVec3(current, target, step);
}
