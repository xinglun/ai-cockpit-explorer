/**
 * Geometry semantics for the Governance Loop, not an architecture stack.
 * Placement encodes causality (left-to-right, bottom-to-top), not
 * abstract polar coordinates:
 *
 *   Agents (far left, outside) -> Entry gate -> Runtime (center)
 *   Runtime <-> Repository (below, Protocol nested inside) via Evidence
 *   Runtime <-> Human Authority (top) via Contract (down) / Outcome (up)
 *
 * - repository: solid, heavy foundation -> durable governed asset
 * - repositoryProtocol: layer nested inside the repository -> repository-owned governance state
 * - runtime: a gate/engine silhouette (ring + core), not a generic solid -> governance computation
 * - entrySurface: a gate agents must pass through -> bounded execution entry
 * - agents: distinct external actors, static, left of the gate -> execution capability
 * - humanAuthority: stable, separated, above the loop -> explicit decision authority
 * - contract: a small flat token descending from Human Authority -> defines what is allowed
 * - evidence: a small bounded packet rising from the repository -> observable structured facts
 * - outcome: a small flat token rising toward Human Authority -> what verification produced
 */
export const layout = {
  agents: [
    { id: "codex", position: [-6.4, 1.1, 1.3] as [number, number, number] },
    { id: "claude", position: [-6.4, 1.1, -1.3] as [number, number, number] },
  ],
  entrySurface: { position: [-3.4, 1.1, 0] as [number, number, number] },
  runtime: { position: [0, 1.2, 0] as [number, number, number], size: 1.05 },
  contract: { position: [-1, 3.1, 0] as [number, number, number], size: [0.9, 0.15, 0.9] as [number, number, number] },
  outcome: { position: [1, 3.1, 0] as [number, number, number], size: [0.9, 0.15, 0.9] as [number, number, number] },
  humanAuthority: { position: [0, 5, 0] as [number, number, number], size: [1.6, 0.5, 1.1] as [number, number, number] },
  evidence: { position: [0, -0.15, 2] as [number, number, number], size: 0.35 },
  repositoryProtocol: {
    position: [0, -0.55, 0] as [number, number, number],
    size: [5.2, 0.45, 3.2] as [number, number, number],
  },
  repository: { position: [0, -1.55, 0] as [number, number, number], size: [6, 1.1, 4] as [number, number, number] },
} as const;

export const cameraDefaults = {
  position: [11, 6.5, 14] as [number, number, number],
  fov: 42,
  near: 0.1,
  far: 120,
};
