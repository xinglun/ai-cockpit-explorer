"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

/** A small flat token rising from Runtime toward Human Authority. */
export function Outcome({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.outcome;
  const { hovered, hoverHandlers } = useHover();
  return (
    <group
      position={position}
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("outcome");
      }}
    >
      {/* Fixed-size hit target, always scale 1 -- see Contract.tsx. */}
      <mesh visible={false}>
        <boxGeometry args={size} />
        <meshBasicMaterial />
      </mesh>
      <group scale={hovered && !isDimmed ? HOVER_SCALE : 1}>
        <mesh raycast={() => null}>
          <boxGeometry args={size} />
          <meshStandardMaterial
            color={colors.informationFlow}
            emissive={isSelected ? colors.informationFlow : "#000000"}
            emissiveIntensity={isSelected ? 0.3 : 0.1}
            opacity={isDimmed ? 0.15 : 0.95}
            transparent
            depthWrite={false}
            roughness={0.5}
          />
        </mesh>
        <Label position={[0, size[1] / 2 + 0.25, 0]} text={label} size={0.2} dimmed={isDimmed} />
      </group>
    </group>
  );
}
