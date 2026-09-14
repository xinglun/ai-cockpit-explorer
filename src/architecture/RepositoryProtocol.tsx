"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureNodeProps } from "./types";

export function RepositoryProtocol({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const { position, size } = layout.repositoryProtocol;
  return (
    <mesh
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("repositoryProtocol");
      }}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={colors.surface}
        emissive={isSelected ? colors.informationFlow : "#000000"}
        emissiveIntensity={isSelected ? 0.3 : 0}
        opacity={isDimmed ? 0.2 : 0.9}
        transparent
        roughness={0.6}
        metalness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}
