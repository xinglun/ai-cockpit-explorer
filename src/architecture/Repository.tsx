"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureNodeProps } from "./types";

export function Repository({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const { position, size } = layout.repository;
  return (
    <mesh
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("repository");
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={colors.surfaceRaised}
        emissive={isSelected ? colors.informationFlow : "#000000"}
        emissiveIntensity={isSelected ? 0.25 : 0}
        opacity={isDimmed ? 0.25 : 1}
        transparent
        roughness={0.85}
        metalness={0.1}
      />
    </mesh>
  );
}
