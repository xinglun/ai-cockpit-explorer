"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

/**
 * CHI is the Explorer's own conceptual framing of how a human directs
 * and receives status from AI Cockpit — Define / Understand / Decide
 * (see the WHAT/INPUTS/OUTPUTS/BOUNDARY copy in src/i18n/*). It is a
 * presentation layer, not a claim that AI Cockpit Runtime exposes a
 * literal "CHI" service. A flat hex plate between Human Authority and
 * Runtime reads as an interaction layer, not a new governed object.
 */
export function HumanControlInterface({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, radius, height } = layout.humanControlInterface;
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("humanControlInterface");
      }}
    >
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, height, 6]} />
        <meshStandardMaterial
          color={colors.humanAuthority}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.35 : 0.05}
          opacity={isDimmed ? 0.15 : 0.85}
          transparent
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
      <Label position={[0, height / 2 + 0.28, 0]} text={label} size={0.19} dimmed={isDimmed} />
    </group>
  );
}
