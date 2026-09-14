import { modelMetadata, type ExplorerModelMetadata } from "./provenance";

export type ArchitectureElementId =
  | "agents"
  | "entrySurface"
  | "contract"
  | "workItem"
  | "runtime"
  | "repository"
  | "repositoryProtocol"
  | "knowledge"
  | "evidence"
  | "outcome"
  | "humanControlInterface"
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
 * Contract inside a Work Item, execute against the repository,
 * produce evidence, feed a derived Knowledge projection, and the
 * resulting Outcome is decided by Human Authority through a Human
 * Control Interface.
 *
 * `workItem`, `knowledge`, and `humanControlInterface` are Explorer
 * presentation concepts layered on top of the canonical AI Cockpit
 * architecture (a bounded envelope around one Work Item's relationships,
 * a derived-facts projection, and a framing of the human/Runtime
 * interaction) — not a claim that the Runtime exposes new services.
 */
export const architectureElements: Record<ArchitectureElementId, ArchitectureElement> = {
  agents: { id: "agents", provenance: modelMetadata },
  entrySurface: { id: "entrySurface", provenance: modelMetadata },
  contract: { id: "contract", provenance: modelMetadata },
  workItem: { id: "workItem", provenance: modelMetadata },
  runtime: { id: "runtime", provenance: modelMetadata },
  repository: { id: "repository", provenance: modelMetadata },
  repositoryProtocol: { id: "repositoryProtocol", provenance: modelMetadata },
  knowledge: { id: "knowledge", provenance: modelMetadata },
  evidence: { id: "evidence", provenance: modelMetadata },
  outcome: { id: "outcome", provenance: modelMetadata },
  humanControlInterface: { id: "humanControlInterface", provenance: modelMetadata },
  humanAuthority: { id: "humanAuthority", provenance: modelMetadata },
};

export const architectureOrder: ArchitectureElementId[] = [
  "agents",
  "entrySurface",
  "contract",
  "workItem",
  "runtime",
  "repository",
  "repositoryProtocol",
  "knowledge",
  "evidence",
  "outcome",
  "humanControlInterface",
  "humanAuthority",
];
