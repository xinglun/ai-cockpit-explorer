import type { ArchitectureElementId } from "@/data/architecture";
import { layout, cameraDefaults } from "@/design-system/geometry";

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

const overview: CameraTarget = {
  position: cameraDefaults.position,
  lookAt: [0, 1.4, 0],
};

const agentsCenter: [number, number, number] = [
  (layout.agents[0].position[0] + layout.agents[1].position[0]) / 2,
  layout.agents[0].position[1],
  0,
];

export const cameraTargets: Record<ArchitectureElementId, CameraTarget> = {
  agents: {
    position: [agentsCenter[0] - 2.5, agentsCenter[1] + 2, agentsCenter[2] + 4],
    lookAt: agentsCenter,
  },
  entrySurface: {
    position: [-3.4, 2.6, 4],
    lookAt: layout.entrySurface.position,
  },
  contract: {
    position: [-1, 4, 4.5],
    lookAt: layout.contract.position,
  },
  runtime: {
    position: [3, 3, 5.5],
    lookAt: layout.runtime.position,
  },
  repository: {
    position: [4, 0.5, 6.5],
    lookAt: layout.repository.position,
  },
  repositoryProtocol: {
    position: [3.5, 0.4, 5],
    lookAt: layout.repositoryProtocol.position,
  },
  evidence: {
    position: [1.5, 1, 5.5],
    lookAt: layout.evidence.position,
  },
  outcome: {
    position: [1, 4, 4.5],
    lookAt: layout.outcome.position,
  },
  humanAuthority: {
    position: [3, 6, 6],
    lookAt: layout.humanAuthority.position,
  },
};

export function cameraTargetFor(id: ArchitectureElementId | null): CameraTarget {
  return id ? cameraTargets[id] : overview;
}

export { overview as overviewCameraTarget };

/**
 * Args for CameraControls#setLookAt, derived from a single id. Pure and
 * testable independently of any R3F/WebGL context — the camera rig just
 * spreads this into the controls ref.
 */
export type SetLookAtArgs = [
  number,
  number,
  number,
  number,
  number,
  number,
  boolean,
];

export function buildSetLookAtArgs(
  id: ArchitectureElementId | null,
  reducedMotion: boolean,
): SetLookAtArgs {
  const target = cameraTargetFor(id);
  return [...target.position, ...target.lookAt, !reducedMotion];
}
