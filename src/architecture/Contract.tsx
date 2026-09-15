"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

/** A small flat token descending from Human Authority — the bound. */
export function Contract({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.contract;
  const { hovered, hoverHandlers } = useHover();
  return (
    <group
      position={position}
      scale={hovered && !isDimmed ? HOVER_SCALE : 1}
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("contract");
      }}
    >
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={colors.humanAuthority}
          emissive={isSelected ? colors.humanAuthority : "#000000"}
          emissiveIntensity={isSelected ? 0.3 : 0}
          opacity={isDimmed ? 0.15 : 0.95}
          transparent
          depthWrite={false}
          roughness={0.7}
        />
      </mesh>
      <Label position={[0, size[1] / 2 + 0.25, 0]} text={label} size={0.2} dimmed={isDimmed} />
    </group>
  );
}
