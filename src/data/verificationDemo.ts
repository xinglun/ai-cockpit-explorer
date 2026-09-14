import { modelMetadata, type ExplorerModelMetadata } from "./provenance";
import type { VerificationStatus, HumanDecisionStatus } from "@/design-system/semanticColors";

export type VerificationScenarioId = "green-pending" | "red-fail-closed";
export type EvidenceItemId = "build" | "tests" | "scope";

export interface EvidenceItem {
  id: EvidenceItemId;
  status: VerificationStatus;
}

export interface VerificationScenario {
  id: VerificationScenarioId;
  evidence: EvidenceItem[];
  verificationStatus: VerificationStatus;
  humanDecision: HumanDecisionStatus;
  provenance: ExplorerModelMetadata;
}

/**
 * Two demonstration scenarios only. UNKNOWN must never be presented as
 * approval, and GREEN verification must never be conflated with an
 * APPROVED human decision — they remain visually and semantically
 * distinct. Display copy (label/narrative/evidence labels) lives in
 * src/i18n/*, keyed by these same ids.
 */
export const verificationScenarios: Record<VerificationScenarioId, VerificationScenario> = {
  "green-pending": {
    id: "green-pending",
    evidence: [
      { id: "build", status: "GREEN" },
      { id: "tests", status: "GREEN" },
      { id: "scope", status: "GREEN" },
    ],
    verificationStatus: "GREEN",
    humanDecision: "PENDING",
    provenance: modelMetadata,
  },
  "red-fail-closed": {
    id: "red-fail-closed",
    evidence: [
      { id: "build", status: "GREEN" },
      { id: "tests", status: "RED" },
      { id: "scope", status: "UNKNOWN" },
    ],
    verificationStatus: "RED",
    humanDecision: "PENDING",
    provenance: modelMetadata,
  },
};

export const verificationScenarioOrder: VerificationScenarioId[] = ["green-pending", "red-fail-closed"];
