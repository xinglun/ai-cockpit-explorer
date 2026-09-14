"use client";

import { Canvas } from "@react-three/fiber";
import { colors } from "@/design-system/semanticColors";
import { cameraDefaults } from "@/design-system/geometry";
import { ArchitectureScene } from "./ArchitectureScene";
import type { ArchitectureElementId } from "@/data/architecture";
import type { WorkItemEnvelopeStage } from "@/data/workItem";
import type { FlowId } from "@/architecture/types";

interface ArchitectureExperienceProps {
  highlightIds: readonly ArchitectureElementId[] | null;
  selectedId: ArchitectureElementId | null;
  cameraId: ArchitectureElementId | null;
  onSelect: (id: ArchitectureElementId) => void;
  labels: Record<ArchitectureElementId, string>;
  ariaLabel: string;
  activeFlowIds: readonly FlowId[] | null;
  workItemStage: WorkItemEnvelopeStage;
  workItemId: string;
  workItemClosedLabel: string;
  blocked: boolean;
}

/**
 * The single client boundary for WebGL / Three.js. Semantic data and
 * design tokens stay independent of this rendering layer.
 */
export function ArchitectureExperience({
  highlightIds,
  selectedId,
  cameraId,
  onSelect,
  labels,
  ariaLabel,
  activeFlowIds,
  workItemStage,
  workItemId,
  workItemClosedLabel,
  blocked,
}: ArchitectureExperienceProps) {
  return (
    <Canvas
      camera={{ position: cameraDefaults.position, fov: cameraDefaults.fov, near: cameraDefaults.near, far: cameraDefaults.far }}
      style={{ background: colors.background }}
      aria-label={ariaLabel}
    >
      <ArchitectureScene
        highlightIds={highlightIds}
        selectedId={selectedId}
        cameraId={cameraId}
        onSelect={onSelect}
        labels={labels}
        activeFlowIds={activeFlowIds}
        workItemStage={workItemStage}
        workItemId={workItemId}
        workItemClosedLabel={workItemClosedLabel}
        blocked={blocked}
      />
    </Canvas>
  );
}
