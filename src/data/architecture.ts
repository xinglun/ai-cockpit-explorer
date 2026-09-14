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
  label: string;
  /** One line: what this element does. */
  what: string;
  inputs: string[];
  outputs: string[];
  /** What this element explicitly cannot do. */
  boundary: string;
  provenance: ExplorerModelMetadata;
}

/**
 * Canonical Governance Loop facts. Content describes AI Cockpit's own
 * documented responsibilities (see docs/upstream.md) — the Explorer
 * does not invent capabilities. Ordered causally: agents enter, pass
 * through the gate, are bounded by a Contract, execute against the
 * repository, produce evidence, and the resulting Outcome is decided
 * by Human Authority.
 */
export const architectureElements: Record<ArchitectureElementId, ArchitectureElement> = {
  agents: {
    id: "agents",
    label: "Agents",
    what: "External actors (e.g. Codex, Claude) that perform AI-assisted execution.",
    inputs: ["An active Work Item Contract"],
    outputs: ["Execution requests at the entry gate"],
    boundary: "Cannot execute outside a bounded Work Item, and hold no repository authority.",
    provenance: modelMetadata,
  },
  entrySurface: {
    id: "entrySurface",
    label: "Entry Gate",
    what: "Where execution requests enter the governed lifecycle.",
    inputs: ["Agent execution requests"],
    outputs: ["Bounded start / checkpoint / finish calls"],
    boundary: "Cannot be bypassed to mutate the repository directly and invisibly.",
    provenance: modelMetadata,
  },
  contract: {
    id: "contract",
    label: "Contract",
    what: "The human-defined boundary for a Work Item: intent, scope, and acceptance criteria.",
    inputs: ["Intent", "Scope", "Acceptance criteria", "Authority"],
    outputs: ["The bounds Runtime evaluates every action against"],
    boundary: "Cannot be satisfied by inference — only by evidence checked against its own text.",
    provenance: modelMetadata,
  },
  runtime: {
    id: "runtime",
    label: "AI Cockpit Runtime",
    what: "The engine that evaluates the Contract against repository facts and evidence.",
    inputs: ["Contract", "Repository facts", "Evidence"],
    outputs: ["Verification result", "Outcome"],
    boundary: "Cannot grant human approval — it computes verification, not authorization.",
    provenance: modelMetadata,
  },
  repository: {
    id: "repository",
    label: "Software Repository",
    what: "The thing being governed — source of truth for code and history.",
    inputs: ["Commits", "Working tree state"],
    outputs: ["Git HEAD", "Changed paths", "Snapshot digests"],
    boundary: "Is not replaced or owned by AI Cockpit — Runtime only observes it.",
    provenance: modelMetadata,
  },
  repositoryProtocol: {
    id: "repositoryProtocol",
    label: "Repository Protocol",
    what: "A persistent, repository-owned layer (.ai/) storing Contracts, evidence, and decisions.",
    inputs: ["Lifecycle events"],
    outputs: ["Durable governance history versioned with the code"],
    boundary: "Cannot be evaluated as evidence by itself — it stores state, Runtime evaluates it.",
    provenance: modelMetadata,
  },
  evidence: {
    id: "evidence",
    label: "Evidence",
    what: "Observable, structured facts produced by execution: tests, git state, digests, artifacts.",
    inputs: ["Test results", "Git state", "Digests", "Artifacts"],
    outputs: ["A verification-ready evidence packet"],
    boundary: "Cannot substitute for a human decision, no matter how complete it is.",
    provenance: modelMetadata,
  },
  outcome: {
    id: "outcome",
    label: "Outcome",
    what: "What Runtime produced after verification: a result plus what remains unknown.",
    inputs: ["Verification result", "Unresolved unknowns"],
    outputs: ["A record Human Authority can decide on"],
    boundary: "Cannot authorize itself — GREEN outcome is not an APPROVED decision.",
    provenance: modelMetadata,
  },
  humanAuthority: {
    id: "humanAuthority",
    label: "Human Authority",
    what: "The separate, explicit boundary where humans approve or reject outcomes.",
    inputs: ["Outcome", "Verification result"],
    outputs: ["Contract (defines what is allowed)", "Decision: APPROVE / REJECT"],
    boundary: "Is never inferred from verification — approval is always an explicit, separate act.",
    provenance: modelMetadata,
  },
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
