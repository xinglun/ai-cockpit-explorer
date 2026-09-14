"use client";

import { Repository } from "@/architecture/Repository";
import { RepositoryProtocol } from "@/architecture/RepositoryProtocol";
import { Runtime } from "@/architecture/Runtime";
import { EntrySurface } from "@/architecture/EntrySurface";
import { AgentActors } from "@/architecture/AgentActors";
import { HumanAuthority } from "@/architecture/HumanAuthority";
import { HumanControlInterface } from "@/architecture/HumanControlInterface";
import { Contract } from "@/architecture/Contract";
import { Evidence } from "@/architecture/Evidence";
import { Knowledge } from "@/architecture/Knowledge";
import { Outcome } from "@/architecture/Outcome";
import { WorkItemEnvelope } from "@/architecture/WorkItemEnvelope";
import { TraceTrail } from "@/architecture/TraceTrail";
import { Flows } from "@/architecture/Flows";
import type { FlowId } from "@/architecture/types";
import { isAmong } from "@/interaction/selection";
import type { ArchitectureElementId } from "@/data/architecture";
import type { WorkItemEnvelopeStage } from "@/data/workItem";
import { CameraRig } from "./CameraRig";
import { SceneLighting } from "./SceneLighting";

interface ArchitectureSceneProps {
  /** Which elements are relevant right now; null/empty means show all. */
  highlightIds: readonly ArchitectureElementId[] | null;
  selectedId: ArchitectureElementId | null;
  cameraId: ArchitectureElementId | null;
  onSelect: (id: ArchitectureElementId) => void;
  /** Localized 3D labels, keyed by element id (see src/i18n/*). */
  labels: Record<ArchitectureElementId, string>;
  /** null = show every flow at rest; a (possibly empty) array = only these flows are bright/pulsing. */
  activeFlowIds: readonly FlowId[] | null;
  workItemStage: WorkItemEnvelopeStage;
  workItemId: string;
  workItemClosedLabel: string;
  /** True only for the RED fail-closed Verification scenario — Runtime holds its sequence short of resolving, and the Work Item boundary reads blocked. */
  blocked: boolean;
  /** An optional 3D echo of the Trace timeline, hidden unless explicitly revealed — the DOM TraceTimeline stays primary. */
  showTraceTrail: boolean;
}

export function ArchitectureScene({
  highlightIds,
  selectedId,
  cameraId,
  onSelect,
  labels,
  activeFlowIds,
  workItemStage,
  workItemId,
  workItemClosedLabel,
  blocked,
  showTraceTrail,
}: ArchitectureSceneProps) {
  const nodeProps = (id: ArchitectureElementId) => ({
    isDimmed: !isAmong(highlightIds, id),
    isSelected: selectedId === id,
    onSelect,
    label: labels[id],
  });
  const verifying = activeFlowIds?.includes("evidence") ?? false;

  return (
    <>
      <SceneLighting />
      <CameraRig cameraId={cameraId} pushIn={verifying} />
      <Flows activeFlowIds={activeFlowIds} />
      {showTraceTrail && <TraceTrail />}
      <AgentActors {...nodeProps("agents")} />
      <EntrySurface {...nodeProps("entrySurface")} />
      <Contract {...nodeProps("contract")} />
      <WorkItemEnvelope
        stage={workItemStage}
        workItemId={workItemId}
        isDimmed={!isAmong(highlightIds, "workItem")}
        isSelected={selectedId === "workItem"}
        onSelect={onSelect}
        label={labels.workItem}
        closedLabel={workItemClosedLabel}
        blocked={blocked}
      />
      <Runtime {...nodeProps("runtime")} verifying={verifying} blocked={blocked} />
      <Repository {...nodeProps("repository")} />
      <RepositoryProtocol {...nodeProps("repositoryProtocol")} />
      <Knowledge {...nodeProps("knowledge")} workItemStage={workItemStage} />
      <Evidence {...nodeProps("evidence")} />
      <Outcome {...nodeProps("outcome")} />
      <HumanControlInterface {...nodeProps("humanControlInterface")} />
      <HumanAuthority {...nodeProps("humanAuthority")} />
    </>
  );
}
