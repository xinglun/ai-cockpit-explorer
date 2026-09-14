/**
 * Geometry semantics: each architecture concept uses a consistent
 * physical metaphor, not an interchangeable floating card.
 *
 * - repository: solid, heavy foundation -> durable governed asset
 * - repositoryProtocol: structured layer attached to the repository -> repository-owned governance state
 * - runtime: precise, central, engineered structure -> governance computation
 * - evidence: small bounded objects / directional streams -> observable structured facts
 * - verification: gate / graph structure -> evaluation
 * - agents: external moving actors -> execution capability
 * - humanAuthority: stable, separated structure -> explicit decision authority
 */
export const layout = {
  repository: { position: [0, -1.2, 0] as [number, number, number], size: [6, 1.2, 4] as [number, number, number] },
  repositoryProtocol: { position: [0, -0.35, 0] as [number, number, number], size: [5.4, 0.5, 3.4] as [number, number, number] },
  runtime: { position: [0, 1.1, 0] as [number, number, number], size: 1.1 },
  entrySurface: { position: [0, 3, 0] as [number, number, number] },
  agents: {
    radius: 6,
    count: 3,
    height: 1.4,
  },
  humanAuthority: { position: [4.5, 1.6, -2] as [number, number, number], size: [1.4, 1.6, 0.4] as [number, number, number] },
} as const;

export const cameraDefaults = {
  position: [9, 7, 11] as [number, number, number],
  fov: 45,
  near: 0.1,
  far: 100,
};
