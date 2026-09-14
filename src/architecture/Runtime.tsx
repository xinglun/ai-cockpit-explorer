"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

/**
 * Runtime reads as a gate/engine (ring + core), not a generic solid —
 * it is the thing execution must pass through and be evaluated by.
 */
export function Runtime({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.runtime;
  const emissiveIntensity = isSelected ? 0.5 : 0.15;
  const opacity = isDimmed ? 0.2 : 1;

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("runtime");
      }}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size, size * 0.16, 12, 32]} />
        <meshStandardMaterial
          color={colors.informationFlow}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={emissiveIntensity}
          opacity={opacity}
          transparent
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[size * 0.4, 0]} />
        <meshStandardMaterial
          color={colors.surfaceRaised}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={emissiveIntensity}
          opacity={opacity}
          transparent
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      <Label position={[0, size + 0.35, 0]} text={label} dimmed={isDimmed} />
    </group>
  );
}
