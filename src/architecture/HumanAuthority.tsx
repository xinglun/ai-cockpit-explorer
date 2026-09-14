"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureNodeProps } from "./types";

/**
 * Human Authority must read as visually distinct from automated
 * governance state: stable geometry, neutral white, restrained
 * animation, spatial separation from the repository/runtime cluster.
 */
export function HumanAuthority({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const { position, size } = layout.humanAuthority;
  return (
    <mesh
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("humanAuthority");
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={colors.humanAuthority}
        emissive={isSelected ? colors.humanAuthority : "#000000"}
        emissiveIntensity={isSelected ? 0.2 : 0}
        opacity={isDimmed ? 0.2 : 1}
        transparent
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}
