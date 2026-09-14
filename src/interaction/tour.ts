import type { ArchitectureElementId } from "@/data/architecture";
import type { WorkItemEnvelopeStage } from "@/data/workItem";
import type { FlowId } from "@/architecture/types";

export type TourStatusBeat = "none" | "green" | "pending" | "verified-not-approved";

export interface TourStep {
  /** Elements visible/highlighted at this beat; everything else dims. */
  focus: ArchitectureElementId[];
  /** Which camera target to move toward. */
  cameraId: ArchitectureElementId;
  status: TourStatusBeat;
  /** Which flow(s) carry this beat's data; defaults to none if omitted. */
  activeFlowIds: FlowId[];
  /** How the Work Item Envelope should read during this beat. */
  envelopeStage: WorkItemEnvelopeStage;
}

/**
 * "Understand AI Cockpit in 30 seconds" — an 8-scene narrative, not a
 * camera pan across objects: Request, Work Item, Contract, Governed
 * Execution, Evidence, Verification, CHI/Human Decision, and finally
 * Archive -> Trace -> Knowledge. The tour no longer ends on Human
 * Authority alone — it ends on what happens to the record afterward,
 * so a first-time visitor leaves knowing not just that verification
 * happened, but where the evidence goes and how it becomes knowledge.
 * Title/narration display copy lives in src/i18n/*'s `tour.steps` (same
 * order, same length) — this file only carries the semantic
 * camera/focus/flow/envelope/status behavior behind each beat.
 */
export const tourSteps: TourStep[] = [
  {
    focus: ["agents", "entrySurface"],
    cameraId: "entrySurface",
    status: "none",
    activeFlowIds: ["execution"],
    envelopeStage: "none",
  },
  {
    focus: ["workItem", "contract", "humanAuthority"],
    cameraId: "workItem",
    status: "none",
    activeFlowIds: ["contract"],
    envelopeStage: "opening",
  },
  {
    focus: ["humanAuthority", "contract", "runtime", "workItem"],
    cameraId: "contract",
    status: "none",
    activeFlowIds: ["contract"],
    envelopeStage: "opening",
  },
  {
    focus: ["agents", "entrySurface", "runtime", "repository", "workItem"],
    cameraId: "runtime",
    status: "none",
    activeFlowIds: ["execution"],
    envelopeStage: "active",
  },
  {
    focus: ["repository", "evidence", "runtime", "workItem"],
    cameraId: "evidence",
    status: "green",
    activeFlowIds: ["evidence"],
    envelopeStage: "active",
  },
  {
    focus: ["evidence", "runtime", "contract", "outcome", "humanAuthority", "workItem"],
    cameraId: "runtime",
    status: "verified-not-approved",
    activeFlowIds: ["evidence", "outcome"],
    envelopeStage: "finished",
  },
  {
    focus: ["outcome", "humanAuthority", "humanControlInterface", "workItem"],
    cameraId: "humanControlInterface",
    status: "pending",
    activeFlowIds: ["outcome"],
    envelopeStage: "finished",
  },
  {
    focus: ["outcome", "repositoryProtocol", "knowledge", "workItem"],
    cameraId: "knowledge",
    status: "none",
    activeFlowIds: ["knowledge"],
    envelopeStage: "archived",
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
