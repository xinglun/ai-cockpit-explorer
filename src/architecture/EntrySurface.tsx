"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureNodeProps } from "./types";

export function EntrySurface({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const { position } = layout.entrySurface;
  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("entrySurface");
      }}
    >
      <ringGeometry args={[1.1, 1.4, 32]} />
      <meshStandardMaterial
        color={colors.textSecondary}
        emissive={isSelected ? colors.informationFlow : "#000000"}
        emissiveIntensity={isSelected ? 0.4 : 0}
        opacity={isDimmed ? 0.15 : 0.7}
        transparent
        side={2}
      />
    </mesh>
  );
}
