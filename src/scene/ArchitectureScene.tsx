"use client";

import { Repository } from "@/architecture/Repository";
import { RepositoryProtocol } from "@/architecture/RepositoryProtocol";
import { Runtime } from "@/architecture/Runtime";
import { EntrySurface } from "@/architecture/EntrySurface";
import { AgentActors } from "@/architecture/AgentActors";
import { HumanAuthority } from "@/architecture/HumanAuthority";
import { Contract } from "@/architecture/Contract";
import { Evidence } from "@/architecture/Evidence";
import { Outcome } from "@/architecture/Outcome";
import { Flows } from "@/architecture/Flows";
import { isAmong } from "@/interaction/selection";
import type { ArchitectureElementId } from "@/data/architecture";
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
}

export function ArchitectureScene({
  highlightIds,
  selectedId,
  cameraId,
  onSelect,
  labels,
}: ArchitectureSceneProps) {
  const nodeProps = (id: ArchitectureElementId) => ({
    isDimmed: !isAmong(highlightIds, id),
    isSelected: selectedId === id,
    onSelect,
    label: labels[id],
  });
  const flowsDimmed = highlightIds !== null && highlightIds.length > 0;

  return (
    <>
      <SceneLighting />
      <CameraRig cameraId={cameraId} />
      <Flows dimmed={flowsDimmed} />
      <AgentActors {...nodeProps("agents")} />
      <EntrySurface {...nodeProps("entrySurface")} />
      <Contract {...nodeProps("contract")} />
      <Runtime {...nodeProps("runtime")} />
      <Repository {...nodeProps("repository")} />
      <RepositoryProtocol {...nodeProps("repositoryProtocol")} />
      <Evidence {...nodeProps("evidence")} />
      <Outcome {...nodeProps("outcome")} />
      <HumanAuthority {...nodeProps("humanAuthority")} />
    </>
  );
}
