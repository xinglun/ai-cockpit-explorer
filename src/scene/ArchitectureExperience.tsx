"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
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
      {/*
        Selective by luminance, not a full-scene glow: every "at rest"
        material in this scene keeps its emissiveIntensity clearly below
        ~0.35 (see Runtime/Knowledge/FlowLine), while active/selected
        states climb to ~0.85-0.95 — luminanceThreshold sits between the
        two so only active evidence, Runtime's active ring, active flow
        packets, a blocked boundary, and a selected Knowledge node cross
        it. mipmapBlur is left off: it produced a "GPU stall due to
        ReadPixels" warning under this environment's software GL
        renderer during rapid interaction; a plain (non-mipmap) blur is
        cheaper and still reads as a soft, restrained halo at this
        radius/intensity.
      */}
      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.82} luminanceSmoothing={0.2} intensity={0.7} radius={0.5} />
      </EffectComposer>
    </Canvas>
  );
}
