"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureNodeProps } from "./types";

export function Runtime({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const { position, size } = layout.runtime;
  return (
    <mesh
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("runtime");
      }}
    >
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={colors.informationFlow}
        emissive={isSelected ? colors.informationFlow : "#000000"}
        emissiveIntensity={isSelected ? 0.5 : 0.15}
        opacity={isDimmed ? 0.2 : 1}
        transparent
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  );
}
