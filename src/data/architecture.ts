import { modelMetadata, type ExplorerModelMetadata } from "./provenance";

export type ArchitectureElementId =
  | "agents"
  | "entrySurface"
  | "contract"
  | "runtime"
  | "repository"
  | "repositoryProtocol"
  | "evidence"
  | "outcome"
  | "humanAuthority";

export interface ArchitectureElement {
  id: ArchitectureElementId;
  provenance: ExplorerModelMetadata;
}

/**
 * Canonical Governance Loop identifiers and provenance only. Display
 * copy (label/what/inputs/outputs/boundary) lives in src/i18n/* — this
 * stable id is what every locale renders identically. Ordered
 * causally: agents enter, pass through the gate, are bounded by a
 * Contract, execute against the repository, produce evidence, and the
 * resulting Outcome is decided by Human Authority.
 */
export const architectureElements: Record<ArchitectureElementId, ArchitectureElement> = {
  agents: { id: "agents", provenance: modelMetadata },
  entrySurface: { id: "entrySurface", provenance: modelMetadata },
  contract: { id: "contract", provenance: modelMetadata },
  runtime: { id: "runtime", provenance: modelMetadata },
  repository: { id: "repository", provenance: modelMetadata },
  repositoryProtocol: { id: "repositoryProtocol", provenance: modelMetadata },
  evidence: { id: "evidence", provenance: modelMetadata },
  outcome: { id: "outcome", provenance: modelMetadata },
  humanAuthority: { id: "humanAuthority", provenance: modelMetadata },
};

export const architectureOrder: ArchitectureElementId[] = [
  "agents",
  "entrySurface",
  "contract",
  "runtime",
  "repository",
  "repositoryProtocol",
  "evidence",
  "outcome",
  "humanAuthority",
];
