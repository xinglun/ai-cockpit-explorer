"use client";

import { Repository } from "@/architecture/Repository";
import { RepositoryProtocol } from "@/architecture/RepositoryProtocol";
import { Runtime } from "@/architecture/Runtime";
import { EntrySurface } from "@/architecture/EntrySurface";
import { AgentActors } from "@/architecture/AgentActors";
import { HumanAuthority } from "@/architecture/HumanAuthority";
import { isIsolated } from "@/interaction/selection";
import type { SelectionState } from "@/interaction/selection";
import type { ArchitectureElementId } from "@/data/architecture";
import { ArchitectureCamera } from "./ArchitectureCamera";
import { ArchitectureControls } from "./ArchitectureControls";
import { SceneLighting } from "./SceneLighting";
import { cameraTargetFor } from "@/interaction/cameraTargets";

interface ArchitectureSceneProps {
  selection: SelectionState;
  onSelect: (id: ArchitectureElementId) => void;
}

export function ArchitectureScene({ selection, onSelect }: ArchitectureSceneProps) {
  const nodeProps = (id: ArchitectureElementId) => ({
    isDimmed: !isIsolated(selection, id),
    isSelected: selection.selected === id,
    onSelect,
  });

  return (
    <>
      <SceneLighting />
      <ArchitectureCamera target={cameraTargetFor(selection.selected)} />
      <ArchitectureControls />
      <Repository {...nodeProps("repository")} />
      <RepositoryProtocol {...nodeProps("repositoryProtocol")} />
      <Runtime {...nodeProps("runtime")} />
      <EntrySurface {...nodeProps("entrySurface")} />
      <AgentActors {...nodeProps("agents")} />
      <HumanAuthority {...nodeProps("humanAuthority")} />
    </>
  );
}
