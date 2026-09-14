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
  provenance: ExplorerModelMetadata;
}

/**
 * Ordered Work Item lifecycle identifiers, as governed by the
 * Repository Protocol. This ordering is a canonical fact — do not
 * reorder or invent steps. Display copy (label/summary) lives in
 * src/i18n/*, keyed by these same ids.
 */
export const lifecycleSteps: LifecycleStep[] = [
  { id: "inspect", provenance: modelMetadata },
  { id: "attach", provenance: modelMetadata },
  { id: "start", provenance: modelMetadata },
  { id: "preflight", provenance: modelMetadata },
  { id: "checkpoint", provenance: modelMetadata },
  { id: "verify", provenance: modelMetadata },
  { id: "finish", provenance: modelMetadata },
  { id: "archive", provenance: modelMetadata },
  { id: "close", provenance: modelMetadata },
];
