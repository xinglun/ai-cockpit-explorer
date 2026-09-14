"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

/**
 * HCI (Human-Computer Interaction) is the Explorer's own conceptual
 * framing of how a human directs
 * and receives status from AI Cockpit — Define / Understand / Decide
 * (see the WHAT/INPUTS/OUTPUTS/BOUNDARY copy in src/i18n/*). It is a
 * presentation layer, not a claim that AI Cockpit Runtime exposes a
 * literal "HCI" service. A flat hex plate between Human Authority and
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
      {/* Neutral frosted surface: high roughness + a little transmission, distinct from the Work Item envelope's clear glass. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[radius, radius, height, 6]} />
        <meshPhysicalMaterial
          color={colors.humanAuthority}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.35 : 0.05}
          opacity={isDimmed ? 0.15 : 0.55}
          transparent
          roughness={0.75}
          metalness={0}
          transmission={0.35}
          thickness={0.4}
          ior={1.3}
        />
      </mesh>
      {/*
        The cylinder is rotated 90deg around X so its circular face (not
        its height) determines the vertical extent — the label offset
        must clear `radius`, not `height / 2`, or the mesh visually
        overlaps the middle of the text.
      */}
      <Label position={[0, radius + 0.32, 0]} text={label} size={0.19} dimmed={isDimmed} />
    </group>
  );
}
