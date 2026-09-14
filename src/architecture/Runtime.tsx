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
  const opacity = isDimmed ? 0.2 : 1;
  /** A restrained edge glow at rest, brighter once selected — never off. */
  const edgeIntensity = isDimmed ? 0.1 : isSelected ? 0.9 : 0.35;

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("runtime");
      }}
    >
      {/* The gate body: a solid metal ring, not the emissive source itself. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size, size * 0.16, 12, 32]} />
        <meshStandardMaterial
          color={colors.surfaceRaised}
          opacity={opacity}
          transparent
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>
      {/* A thin outline riding the same ring — the "controlled emissive edge". */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size, size * 0.045, 8, 32]} />
        <meshStandardMaterial
          color={colors.informationFlow}
          emissive={colors.informationFlow}
          emissiveIntensity={edgeIntensity}
          opacity={opacity}
          transparent
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[size * 0.4, 0]} />
        <meshStandardMaterial
          color={colors.surface}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.3 : 0}
          opacity={opacity}
          transparent
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      <Label position={[0, size + 0.7, 0]} text={label} dimmed={isDimmed} />
    </group>
  );
}
