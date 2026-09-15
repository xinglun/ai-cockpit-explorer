"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

/** A small bounded packet rising from the repository toward Runtime. */
export function Evidence({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.evidence;
  const { hovered, hoverHandlers } = useHover();
  return (
    <group
      position={position}
      scale={hovered && !isDimmed ? HOVER_SCALE : 1}
      {...hoverHandlers}
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
          depthWrite={false}
          roughness={0.4}
        />
      </mesh>
      <Label position={[0, size + 0.55, 0]} text={label} size={0.2} dimmed={isDimmed} />
    </group>
  );
}
