import { modelMetadata, type ExplorerModelMetadata } from "./provenance";

export type LifecycleStepId =
  | "inspect"
  | "attach"
  | "start"
  | "preflight"
  | "checkpoint"
  | "verify"
  | "finish"
  | "archive"
  | "close";

export interface LifecycleStep {
  id: LifecycleStepId;
  label: string;
  summary: string;
  provenance: ExplorerModelMetadata;
}

/**
 * Ordered Work Item lifecycle, as governed by the Repository Protocol.
 * This ordering is a canonical fact — do not reorder or invent steps.
 */
export const lifecycleSteps: LifecycleStep[] = [
  {
    id: "inspect",
    label: "Inspect",
    summary: "Read repository state without writing governance evidence.",
    provenance: modelMetadata,
  },
  {
    id: "attach",
    label: "Attach",
    summary: "Bind the Repository Protocol to this repository.",
    provenance: modelMetadata,
  },
  {
    id: "start",
    label: "Start",
    summary: "Open a Work Item with an intent, goal, scope, and Contract.",
    provenance: modelMetadata,
  },
  {
    id: "preflight",
    label: "Preflight",
    summary: "Evaluate the Contract against current repository facts before execution.",
    provenance: modelMetadata,
  },
  {
    id: "checkpoint",
    label: "Checkpoint",
    summary: "Record incremental, evidence-backed progress during execution.",
    provenance: modelMetadata,
  },
  {
    id: "verify",
    label: "Verify",
    summary: "Evaluate evidence against the Contract and produce a verification outcome.",
    provenance: modelMetadata,
  },
  {
    id: "finish",
    label: "Finish",
    summary: "Confirm lifecycle gates are satisfied before the Work Item can close.",
    provenance: modelMetadata,
  },
  {
    id: "archive",
    label: "Archive",
    summary: "Move the completed Work Item's evidence into durable history.",
    provenance: modelMetadata,
  },
  {
    id: "close",
    label: "Close",
    summary: "Finalize the Work Item; the governance record becomes immutable.",
    provenance: modelMetadata,
  },
];
