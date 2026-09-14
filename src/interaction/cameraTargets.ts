import type { ArchitectureElementId } from "@/data/architecture";
import { layout, cameraDefaults } from "@/design-system/geometry";

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

const overview: CameraTarget = {
  position: cameraDefaults.position,
  lookAt: [0, 0.5, 0],
};

export const cameraTargets: Record<ArchitectureElementId, CameraTarget> = {
  repository: {
    position: [4, 1.5, 6],
    lookAt: layout.repository.position,
  },
  repositoryProtocol: {
    position: [3.5, 1.2, 5],
    lookAt: layout.repositoryProtocol.position,
  },
  runtime: {
    position: [3, 3, 5],
    lookAt: layout.runtime.position,
  },
  entrySurface: {
    position: [2, 5, 5],
    lookAt: layout.entrySurface.position,
  },
  agents: {
    position: [8, 3, 8],
    lookAt: [layout.agents.radius, layout.agents.height, 0],
  },
  humanAuthority: {
    position: [7, 2.4, -1],
    lookAt: layout.humanAuthority.position,
  },
};

export function cameraTargetFor(id: ArchitectureElementId | null): CameraTarget {
  return id ? cameraTargets[id] : overview;
}

export { overview as overviewCameraTarget };
