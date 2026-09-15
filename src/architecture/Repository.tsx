"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

export function Repository({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.repository;
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("repository");
      }}
    >
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={colors.surfaceRaised}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.25 : 0}
          opacity={isDimmed ? 0.25 : 1}
          transparent
          depthWrite={false}
          roughness={0.95}
          metalness={0}
        />
      </mesh>
      <Label position={[0, -size[1] / 2 - 0.35, 0]} text={label} dimmed={isDimmed} />
    </group>
  );
}
