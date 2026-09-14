/**
 * Runtime's Verify sequence: evidence arrives, the outer boundary ring
 * activates, the verification ring activates, then the core resolves
 * and settles. Pure and testable independently of any WebGL/R3F
 * context — Runtime.tsx just calls this once per frame with an
 * elapsed-time accumulator and applies the returned phase to its
 * ring materials.
 */
export type RingPhase = "idle" | "evidence" | "outerRing" | "verifyRing" | "core" | "settled";

const PHASE_ORDER: RingPhase[] = ["evidence", "outerRing", "verifyRing", "core", "settled"];

/** Milliseconds spent on each phase before advancing to the next. */
export const RING_PHASE_STEP_MS = 220;

/**
 * `elapsedMs` resets to 0 whenever `verifying` transitions from false
 * to true (Runtime.tsx owns that reset); this function only maps
 * elapsed time within an active run to a phase. `reducedMotion` skips
 * straight to the final phase instead of stepping through — no
 * animated sequence, matching every other motion feature here.
 */
export function ringPhaseAt(elapsedMs: number, verifying: boolean, reducedMotion: boolean): RingPhase {
  if (!verifying) return "idle";
  if (reducedMotion) return "settled";
  const index = Math.min(PHASE_ORDER.length - 1, Math.floor(elapsedMs / RING_PHASE_STEP_MS));
  return PHASE_ORDER[index];
}

/** Whether a given ring layer should read as "lit" at the current phase. */
export function isRingLit(phase: RingPhase, ring: "outer" | "verify" | "evidence" | "core"): boolean {
  if (phase === "idle") return false;
  const order: RingPhase[] = ["evidence", "outerRing", "verifyRing", "core", "settled"];
  const reached = order.indexOf(phase);
  const thresholds: Record<typeof ring, number> = {
    evidence: order.indexOf("evidence"),
    outer: order.indexOf("outerRing"),
    verify: order.indexOf("verifyRing"),
    core: order.indexOf("core"),
  };
  return reached >= thresholds[ring];
}
