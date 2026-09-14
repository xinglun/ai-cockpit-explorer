import type { ArchitectureElementId } from "@/data/architecture";
import type { LifecycleStepId } from "@/data/lifecycle";

/**
 * Which Governance Loop elements are relevant at each lifecycle stage.
 * Work Item mode dims everything outside the active stage's set instead
 * of isolating a single selected object.
 */
export const stageRelevance: Record<LifecycleStepId, ArchitectureElementId[]> = {
  inspect: ["repository", "repositoryProtocol"],
  attach: ["repository", "repositoryProtocol", "runtime"],
  start: ["humanAuthority", "contract", "runtime"],
  preflight: ["contract", "runtime", "repository"],
  checkpoint: ["agents", "entrySurface", "runtime", "repository"],
  verify: ["repository", "evidence", "runtime", "contract"],
  finish: ["runtime", "evidence", "outcome"],
  archive: ["outcome", "repositoryProtocol"],
  close: ["outcome", "humanAuthority"],
};

export function isRelevantToStage(stage: LifecycleStepId, id: ArchitectureElementId): boolean {
  return stageRelevance[stage].includes(id);
}

/** The single most representative element to focus the camera on per stage. */
export const stageCameraId: Record<LifecycleStepId, ArchitectureElementId> = {
  inspect: "repository",
  attach: "repositoryProtocol",
  start: "contract",
  preflight: "contract",
  checkpoint: "entrySurface",
  verify: "evidence",
  finish: "outcome",
  archive: "repositoryProtocol",
  close: "humanAuthority",
};
