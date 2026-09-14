import type { ArchitectureElementId } from "@/data/architecture";

export type TourStatusBeat = "none" | "green" | "pending" | "verified-not-approved";

export interface TourStep {
  /** Elements visible/highlighted at this beat; everything else dims. */
  focus: ArchitectureElementId[];
  /** Which camera target to move toward. */
  cameraId: ArchitectureElementId;
  status: TourStatusBeat;
}

/**
 * "Understand AI Cockpit in 30 seconds" — a 7-scene narrative, not a
 * camera pan across objects. Each scene explains a causal step in the
 * Governance Loop, ending on the single most important beat: verified
 * is not the same as approved. Title/narration display copy lives in
 * src/i18n/*'s `tour.steps` (same order, same length) — this file only
 * carries the semantic camera/focus/status behavior behind each beat.
 */
export const tourSteps: TourStep[] = [
  { focus: ["agents", "entrySurface"], cameraId: "entrySurface", status: "none" },
  { focus: ["humanAuthority", "contract", "runtime"], cameraId: "contract", status: "none" },
  { focus: ["repository", "repositoryProtocol", "runtime"], cameraId: "repository", status: "none" },
  { focus: ["agents", "entrySurface", "runtime", "repository"], cameraId: "runtime", status: "none" },
  { focus: ["repository", "evidence", "runtime"], cameraId: "evidence", status: "green" },
  {
    focus: ["evidence", "runtime", "contract", "outcome", "humanAuthority"],
    cameraId: "runtime",
    status: "verified-not-approved",
  },
  { focus: ["outcome", "humanAuthority"], cameraId: "humanAuthority", status: "pending" },
];

export function nextStepIndex(current: number): number {
  return Math.min(current + 1, tourSteps.length - 1);
}

export function previousStepIndex(current: number): number {
  return Math.max(current - 1, 0);
}

export function isLastStep(current: number): boolean {
  return current >= tourSteps.length - 1;
}
