import type { ArchitectureElementId } from "@/data/architecture";
import type { LifecycleStepId } from "@/data/lifecycle";
import { envelopeStageForLifecycleStep, type WorkItemEnvelopeStage } from "@/data/workItem";
import type { FlowId } from "@/architecture/types";

/**
 * Which Governance Loop elements are relevant at each lifecycle stage.
 * Work Item mode dims everything outside the active stage's set instead
 * of isolating a single selected object. `workItem` is included from
 * `start` onward so the envelope itself is always part of what's shown
 * once it exists.
 */
export const stageRelevance: Record<LifecycleStepId, ArchitectureElementId[]> = {
  inspect: ["repository", "repositoryProtocol"],
  attach: ["repository", "repositoryProtocol", "runtime"],
  start: ["humanAuthority", "contract", "runtime", "workItem"],
  preflight: ["contract", "runtime", "repository", "workItem"],
  checkpoint: ["agents", "entrySurface", "runtime", "repository", "workItem"],
  verify: ["repository", "evidence", "runtime", "contract", "workItem"],
  finish: ["runtime", "evidence", "outcome", "workItem"],
  archive: ["outcome", "repositoryProtocol", "knowledge", "workItem"],
  close: ["outcome", "humanAuthority", "humanControlInterface", "workItem"],
};

export function isRelevantToStage(stage: LifecycleStepId, id: ArchitectureElementId): boolean {
  return stageRelevance[stage].includes(id);
}

/** The single most representative element to focus the camera on per stage. */
export const stageCameraId: Record<LifecycleStepId, ArchitectureElementId> = {
  inspect: "repository",
  attach: "repositoryProtocol",
  start: "workItem",
  preflight: "contract",
  checkpoint: "workItem",
  verify: "workItem",
  finish: "workItem",
  archive: "repositoryProtocol",
  close: "humanControlInterface",
};

/** Which flow(s) are the visible cause/effect at each lifecycle stage. */
export const stageFlowIds: Record<LifecycleStepId, FlowId[]> = {
  inspect: [],
  attach: [],
  start: ["contract"],
  preflight: ["contract"],
  checkpoint: ["execution"],
  verify: ["evidence"],
  finish: ["outcome"],
  archive: ["knowledge"],
  close: [],
};

/** How the Work Item Envelope should read while stepping through Work Item mode. */
export const stageEnvelope: Record<LifecycleStepId, WorkItemEnvelopeStage> = envelopeStageForLifecycleStep;

/**
 * Which flows are relevant when a single element is selected in
 * Overview mode. Selecting one object now brightens only the flows it
 * actually participates in, instead of dimming every flow at once.
 */
export const elementFlowRelevance: Record<ArchitectureElementId, FlowId[]> = {
  agents: ["execution"],
  entrySurface: ["execution"],
  contract: ["contract"],
  workItem: ["contract", "evidence", "outcome"],
  runtime: ["execution", "contract", "evidence", "outcome"],
  repository: ["evidence"],
  repositoryProtocol: ["knowledge"],
  knowledge: ["knowledge"],
  evidence: ["evidence"],
  outcome: ["outcome"],
  humanControlInterface: ["outcome"],
  humanAuthority: ["contract", "outcome"],
};
