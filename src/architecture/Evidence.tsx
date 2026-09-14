"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

/** A small bounded packet rising from the repository toward Runtime. */
export function Evidence({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.evidence;
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("evidence");
      }}
    >
      <mesh>
        <dodecahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={colors.stateGreen}
          emissive={isSelected ? colors.stateGreen : "#000000"}
          emissiveIntensity={isSelected ? 0.4 : 0.2}
          opacity={isDimmed ? 0.15 : 0.95}
          transparent
          roughness={0.4}
        />
      </mesh>
      <Label position={[0, size + 0.25, 0]} text={label} size={0.2} dimmed={isDimmed} />
    </group>
  );
}
