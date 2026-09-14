"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

/** Nested inside the repository's footprint — a layer, not a peer object. */
export function RepositoryProtocol({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.repositoryProtocol;
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("repositoryProtocol");
      }}
    >
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={colors.surface}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.3 : 0}
          opacity={isDimmed ? 0.2 : 0.9}
          transparent
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      <Label position={[0, size[1] / 2 + 0.25, 0]} text={label} size={0.2} dimmed={isDimmed} />
    </group>
  );
}
