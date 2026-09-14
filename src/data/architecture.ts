import { modelMetadata, type ExplorerModelMetadata } from "./provenance";

export type ArchitectureElementId =
  | "repository"
  | "repositoryProtocol"
  | "runtime"
  | "entrySurface"
  | "agents"
  | "humanAuthority";

export interface ArchitectureElement {
  id: ArchitectureElementId;
  label: string;
  role: string;
  summary: string;
  detail: string;
  provenance: ExplorerModelMetadata;
}

/**
 * Canonical architecture facts. Content describes AI Cockpit's own
 * documented responsibilities (see docs/upstream.md) — the Explorer
 * does not invent capabilities.
 */
export const architectureElements: Record<ArchitectureElementId, ArchitectureElement> = {
  repository: {
    id: "repository",
    label: "Software Repository",
    role: "Durable governed asset",
    summary: "The repository is the thing being governed — source of truth for code and history.",
    detail:
      "AI Cockpit does not replace the repository. It sits alongside it, observing repository facts (git history, build systems, diffs) and recording governance state without redefining what the repository itself owns.",
    provenance: modelMetadata,
  },
  repositoryProtocol: {
    id: "repositoryProtocol",
    label: "Repository Protocol",
    role: "Repository-owned governance state",
    summary: "A persistent, repository-owned layer that stores Contracts, evidence, and lifecycle state.",
    detail:
      "The Repository Protocol lives inside the repository (the .ai/ directory) so governance state travels with the code, is versioned alongside it, and survives independently of any single runtime process.",
    provenance: modelMetadata,
  },
  runtime: {
    id: "runtime",
    role: "Governance computation",
    label: "AI Cockpit Runtime",
    summary: "The engine that evaluates Contracts against repository facts and evidence.",
    detail:
      "The Runtime reads repository facts and evidence, evaluates them against the active Contract and lifecycle gates, and produces verification outcomes. It computes; it does not itself hold authority to approve.",
    provenance: modelMetadata,
  },
  entrySurface: {
    id: "entrySurface",
    label: "Entry Surface",
    role: "Execution interface",
    summary: "Where AI-assisted execution requests enter the governed lifecycle.",
    detail:
      "Agents and automated execution enter through a defined entry surface — start, checkpoint, finish — rather than mutating the repository directly and invisibly.",
    provenance: modelMetadata,
  },
  agents: {
    id: "agents",
    label: "Agents",
    role: "Execution capability",
    summary: "External actors that perform AI-assisted work under an active Contract.",
    detail:
      "Agents are execution capability, not authority. They operate within the scope, acceptance criteria, and evidence requirements defined by a Work Item's Contract.",
    provenance: modelMetadata,
  },
  humanAuthority: {
    id: "humanAuthority",
    label: "Human Authority",
    role: "Explicit decision authority",
    summary: "The separate, explicit boundary where humans approve or reject outcomes.",
    detail:
      "Verification (GREEN/YELLOW/RED/UNKNOWN) describes what the evidence supports. It is never the same as approval. Human Authority is a distinct, stable governance boundary — it decides what is permitted, not just what is verified.",
    provenance: modelMetadata,
  },
};

export const architectureOrder: ArchitectureElementId[] = [
  "repository",
  "repositoryProtocol",
  "runtime",
  "entrySurface",
  "agents",
  "humanAuthority",
];
