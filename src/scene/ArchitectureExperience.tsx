"use client";

import { Canvas } from "@react-three/fiber";
import { colors } from "@/design-system/semanticColors";
import { cameraDefaults } from "@/design-system/geometry";
import { ArchitectureScene } from "./ArchitectureScene";
import type { SelectionState } from "@/interaction/selection";
import type { ArchitectureElementId } from "@/data/architecture";

interface ArchitectureExperienceProps {
  selection: SelectionState;
  onSelect: (id: ArchitectureElementId) => void;
}

/**
 * The single client boundary for WebGL / Three.js. Semantic data and
 * design tokens stay independent of this rendering layer.
 */
export function ArchitectureExperience({ selection, onSelect }: ArchitectureExperienceProps) {
  return (
    <Canvas
      camera={{ position: cameraDefaults.position, fov: cameraDefaults.fov, near: cameraDefaults.near, far: cameraDefaults.far }}
      style={{ background: colors.background }}
      aria-label="Interactive 3D AI Cockpit architecture scene"
    >
      <ArchitectureScene selection={selection} onSelect={onSelect} />
    </Canvas>
  );
}
