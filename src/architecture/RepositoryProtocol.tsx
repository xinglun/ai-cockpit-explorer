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
          depthWrite={false}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {/*
        Offset toward -Z (away from Evidence, which sits at +Z ahead of
        this plate) so the two labels don't visually collide from the
        default Overview camera angle.
      */}
      <Label
        position={[0, size[1] / 2 + 0.3, -size[2] / 2 - 0.35]}
        text={label}
        size={0.2}
        dimmed={isDimmed}
      />
    </group>
  );
}
