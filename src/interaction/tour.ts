import type { ArchitectureElementId } from "@/data/architecture";

export type TourStatusBeat = "none" | "green" | "pending" | "verified-not-approved";

export interface TourStep {
  title: string;
  narration: string;
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
 * is not the same as approved.
 */
export const tourSteps: TourStep[] = [
  {
    title: "Autonomous execution",
    narration:
      "AI agents can execute work. They do not automatically own repository authority — execution stops at the AI Cockpit gate.",
    focus: ["agents", "entrySurface"],
    cameraId: "entrySurface",
    status: "none",
  },
  {
    title: "Contract",
    narration:
      "Before anything runs, a human defines what's allowed: intent, scope, and acceptance criteria.",
    focus: ["humanAuthority", "contract", "runtime"],
    cameraId: "contract",
    status: "none",
  },
  {
    title: "Repository facts",
    narration:
      "The repository feeds Runtime with Git HEAD, changed paths, snapshot, and digests — observed, not assumed.",
    focus: ["repository", "repositoryProtocol", "runtime"],
    cameraId: "repository",
    status: "none",
  },
  {
    title: "Execution",
    narration: "Execution is bounded by the active Work Item — checkpoints, not silent writes.",
    focus: ["agents", "entrySurface", "runtime", "repository"],
    cameraId: "runtime",
    status: "none",
  },
  {
    title: "Evidence",
    narration:
      "Tests, git state, digests, and artifacts converge into an Evidence packet that flows back to Runtime.",
    focus: ["repository", "evidence", "runtime"],
    cameraId: "evidence",
    status: "green",
  },
  {
    title: "Verification",
    narration: "Verification is GREEN. Human decision: PENDING. Verified ≠ Approved.",
    focus: ["evidence", "runtime", "contract", "outcome", "humanAuthority"],
    cameraId: "runtime",
    status: "verified-not-approved",
  },
  {
    title: "Human Authority",
    narration:
      "The Outcome rises to Human Authority, who decides: approve or reject. Autonomous execution, bounded by evidence, governed by explicit authority.",
    focus: ["outcome", "humanAuthority"],
    cameraId: "humanAuthority",
    status: "pending",
  },
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
