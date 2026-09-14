import type { WorkItemEnvelopeStage } from "@/data/workItem";

/**
 * Geometry semantics for the Governance Loop, not an architecture stack.
 * Placement encodes causality (left-to-right, bottom-to-top), not
 * abstract polar coordinates:
 *
 *   Agents (far left, outside) -> Entry gate -> Runtime (center)
 *   Runtime <-> Repository (below, Protocol nested inside) via Evidence
 *   Runtime <-> Human Authority (top) via Contract (down) / Outcome (up)
 *   Human Authority <-> Runtime via a Human Control (Human-Computer Interaction) layer
 *   Repository Protocol -> Knowledge (a derived-facts projection)
 *
 * - repository: solid, heavy foundation -> durable governed asset
 * - repositoryProtocol: layer nested inside the repository -> repository-owned governance state
 * - runtime: a gate/engine silhouette (ring + core), not a generic solid -> governance computation
 * - entrySurface: a gate agents must pass through -> bounded execution entry
 * - agents: distinct external actors, static, left of the gate -> execution capability
 * - humanAuthority: stable, separated, above the loop -> explicit decision authority
 * - humanControlInterface: a flat hex plate between Human Authority and Runtime -> the Define/Understand/Decide interaction layer, not a new Runtime service
 * - contract: a small flat token descending from Human Authority -> defines what is allowed
 * - workItem: a bounding envelope (not a peer object) -> the bounded, evolving Work Item everything else happens inside
 * - evidence: a small bounded packet rising from the repository -> observable structured facts
 * - knowledge: a small connected node graph nested near Repository Protocol -> derived from completed facts, not a source of authority
 * - outcome: a small flat token rising toward Human Authority -> what verification produced
 */
export const layout = {
  agents: [
    { id: "codex", position: [-6.4, 1.1, 1.95] as [number, number, number] },
    { id: "claude", position: [-6.4, 1.1, 0.65] as [number, number, number] },
    { id: "gemini", position: [-6.4, 1.1, -0.65] as [number, number, number] },
    { id: "grok", position: [-6.4, 1.1, -1.95] as [number, number, number] },
  ],
  entrySurface: { position: [-3.4, 1.1, 0] as [number, number, number] },
  runtime: { position: [0, 1.2, 0] as [number, number, number], size: 1.05 },
  contract: { position: [-1, 3.1, 0] as [number, number, number], size: [0.9, 0.15, 0.9] as [number, number, number] },
  outcome: { position: [1, 3.1, 0] as [number, number, number], size: [0.9, 0.15, 0.9] as [number, number, number] },
  humanAuthority: { position: [0, 5, 0] as [number, number, number], size: [1.6, 0.5, 1.1] as [number, number, number] },
  humanControlInterface: { position: [0, 4.05, 0] as [number, number, number], radius: 0.6, height: 0.14 },
  evidence: { position: [0, -0.15, 2] as [number, number, number], size: 0.35 },
  repositoryProtocol: {
    position: [0, -0.55, 0] as [number, number, number],
    size: [5.2, 0.45, 3.2] as [number, number, number],
  },
  knowledge: { position: [1.8, -0.55, -1.4] as [number, number, number], size: 0.16 },
  repository: { position: [0, -1.55, 0] as [number, number, number], size: [6, 1.1, 4] as [number, number, number] },
  /** A representative point for camera/detail purposes; the envelope's actual bounds vary by stage (see workItemEnvelopeBounds). */
  workItem: { position: [0, 1.9, 0.5] as [number, number, number], size: [4.2, 3.2, 3.0] as [number, number, number] },
} as const;

/** Small node-graph offsets for Knowledge — a graph, not another cube. */
export const knowledgeNodeOffsets: [number, number, number][] = [
  [0, 0, 0],
  [0.3, 0.12, 0.08],
  [-0.26, 0.15, 0.05],
  [0.04, 0.28, -0.2],
];

export const knowledgeEdges: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
];

/**
 * The Work Item Envelope's bounds per lifecycle stage. Discrete
 * (greybox) presets rather than a continuous morph — smooth
 * transitions between them are visual polish for a later pass.
 */
export const workItemEnvelopeBounds: Record<
  Exclude<WorkItemEnvelopeStage, "none">,
  { center: [number, number, number]; size: [number, number, number] }
> = {
  opening: { center: [-1, 3.1, 0], size: [1.6, 0.9, 1.6] },
  active: { center: [0, 1.9, 0.5], size: [4.4, 3.4, 3.2] },
  finished: { center: [0, 2.3, 0.7], size: [4.8, 3.9, 3.6] },
  archived: { center: [0, -0.55, 0], size: [1.5, 0.55, 1.15] },
  closed: { center: [0, -0.55, 0], size: [1.5, 0.55, 1.15] },
};

export const cameraDefaults = {
  position: [11, 6.5, 14] as [number, number, number],
  fov: 42,
  near: 0.1,
  far: 120,
};
