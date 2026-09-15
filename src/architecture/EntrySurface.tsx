"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

/** The gate agents must pass through — vertical, blocking, not a floor ring. */
export function EntrySurface({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position } = layout.entrySurface;
  const { hovered, hoverHandlers } = useHover();
  return (
    <group
      position={position}
      scale={hovered && !isDimmed ? HOVER_SCALE : 1}
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("entrySurface");
      }}
    >
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.9, 1.15, 32]} />
        <meshStandardMaterial
          color={colors.textSecondary}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.4 : 0}
          opacity={isDimmed ? 0.15 : 0.75}
          transparent
          depthWrite={false}
          side={2}
        />
      </mesh>
      <Label position={[0, 1.3, 0]} text={label} size={0.2} dimmed={isDimmed} />
    </group>
  );
}
