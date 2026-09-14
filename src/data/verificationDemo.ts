import { modelMetadata, type ExplorerModelMetadata } from "./provenance";
import type { VerificationStatus, HumanDecisionStatus } from "@/design-system/semanticColors";

export type VerificationScenarioId = "green-pending" | "red-fail-closed";

export interface EvidenceItem {
  id: string;
  label: string;
  status: VerificationStatus;
}

export interface VerificationScenario {
  id: VerificationScenarioId;
  label: string;
  narrative: string;
  evidence: EvidenceItem[];
  verificationStatus: VerificationStatus;
  humanDecision: HumanDecisionStatus;
  provenance: ExplorerModelMetadata;
}

/**
 * Two demonstration scenarios only. UNKNOWN must never be presented as
 * approval, and GREEN verification must never be conflated with an
 * APPROVED human decision — they remain visually and semantically distinct.
 */
export const verificationScenarios: Record<VerificationScenarioId, VerificationScenario> = {
  "green-pending": {
    id: "green-pending",
    label: "Verification passed, decision pending",
    narrative:
      "All required evidence is present and consistent with the Contract. Verification is GREEN. This is not approval — a human still holds the decision.",
    evidence: [
      { id: "build", label: "Build evidence", status: "GREEN" },
      { id: "tests", label: "Test evidence", status: "GREEN" },
      { id: "scope", label: "Scope conformance", status: "GREEN" },
    ],
    verificationStatus: "GREEN",
    humanDecision: "PENDING",
    provenance: modelMetadata,
  },
  "red-fail-closed": {
    id: "red-fail-closed",
    label: "Verification failed, fail-closed",
    narrative:
      "Required evidence is missing or contradicts the Contract. Verification is RED and the lifecycle gate blocks progression by default — execution fails closed rather than proceeding on assumption.",
    evidence: [
      { id: "build", label: "Build evidence", status: "GREEN" },
      { id: "tests", label: "Test evidence", status: "RED" },
      { id: "scope", label: "Scope conformance", status: "UNKNOWN" },
    ],
    verificationStatus: "RED",
    humanDecision: "PENDING",
    provenance: modelMetadata,
  },
};

export const verificationScenarioOrder: VerificationScenarioId[] = [
  "green-pending",
  "red-fail-closed",
];
