import { modelMetadata } from "./provenance";
import type { LifecycleStepId } from "./lifecycle";

/**
 * How the Work Item Envelope reads spatially at each point in the
 * lifecycle. "none" means the envelope does not exist yet (inspect /
 * attach); it opens at start, expands through checkpoint/verify, gains
 * an Outcome at finish, and collapses into Repository Protocol at
 * archive/close.
 */
export type WorkItemEnvelopeStage = "none" | "opening" | "active" | "finished" | "archived" | "closed";

export const envelopeStageForLifecycleStep: Record<LifecycleStepId, WorkItemEnvelopeStage> = {
  inspect: "none",
  attach: "none",
  start: "opening",
  preflight: "opening",
  checkpoint: "active",
  verify: "active",
  finish: "finished",
  archive: "archived",
  close: "closed",
};

/** A stand-in id for the single sample Work Item the Explorer walks through. */
export const sampleWorkItemId = "WI-123";

export const workItemProvenance = modelMetadata;

/**
 * One record/receipt/digest/decision per lifecycle event, in order,
 * for the sample Work Item — the Traceability/Audit trail. This is a
 * single timeline through one Work Item, not a new architecture
 * object. The `advanced` entries (resource-finalize/finalize/close
 * cleanup) are governance detail that stays collapsed by default so
 * they never compete with the primary 30-second comprehension flow;
 * they only appear once a user explicitly expands the trace.
 */
export type TraceEventId =
  | "intent"
  | "contract"
  | "snapshot"
  | "checkpoint"
  | "verificationReceipt"
  | "outcome"
  | "humanDecision"
  | "archive"
  | "finalizePlan"
  | "finalize"
  | "finalizeVerify"
  | "close";

export type TraceEventKind = "record" | "receipt" | "digest" | "decision" | "evidence";

export interface TraceEvent {
  id: TraceEventId;
  kind: TraceEventKind;
  /** Only shown once the Trace view's "advanced" detail is expanded. */
  advanced: boolean;
}

export const traceEvents: TraceEvent[] = [
  { id: "intent", kind: "record", advanced: false },
  { id: "contract", kind: "record", advanced: false },
  { id: "snapshot", kind: "digest", advanced: false },
  { id: "checkpoint", kind: "receipt", advanced: false },
  { id: "verificationReceipt", kind: "evidence", advanced: false },
  { id: "outcome", kind: "record", advanced: false },
  { id: "humanDecision", kind: "decision", advanced: false },
  { id: "archive", kind: "record", advanced: false },
  { id: "finalizePlan", kind: "record", advanced: true },
  { id: "finalize", kind: "receipt", advanced: true },
  { id: "finalizeVerify", kind: "receipt", advanced: true },
  { id: "close", kind: "decision", advanced: true },
];
