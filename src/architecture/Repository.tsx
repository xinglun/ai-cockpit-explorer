"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

export function Repository({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.repository;
  const { hovered, hoverHandlers } = useHover();
  return (
    <group
      position={position}
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("repository");
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
    </group>
  );
}
