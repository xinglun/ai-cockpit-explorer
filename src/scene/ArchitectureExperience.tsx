"use client";

import { Canvas } from "@react-three/fiber";
import { colors } from "@/design-system/semanticColors";
import { cameraDefaults } from "@/design-system/geometry";
import { ArchitectureScene } from "./ArchitectureScene";
import type { ArchitectureElementId } from "@/data/architecture";

interface ArchitectureExperienceProps {
  highlightIds: readonly ArchitectureElementId[] | null;
  selectedId: ArchitectureElementId | null;
  cameraId: ArchitectureElementId | null;
  onSelect: (id: ArchitectureElementId) => void;
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
}: ArchitectureExperienceProps) {
  return (
    <Canvas
      camera={{ position: cameraDefaults.position, fov: cameraDefaults.fov, near: cameraDefaults.near, far: cameraDefaults.far }}
      style={{ background: colors.background }}
      aria-label="Interactive 3D AI Cockpit governance loop"
    >
      <ArchitectureScene
        highlightIds={highlightIds}
        selectedId={selectedId}
        cameraId={cameraId}
        onSelect={onSelect}
      />
    </Canvas>
  );
}
