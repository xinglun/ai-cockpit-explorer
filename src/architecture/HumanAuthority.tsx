"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

/**
 * Human Authority must read as visually distinct from automated
 * governance state: stable geometry, neutral white, restrained
 * animation, and placed above the loop rather than inside it.
 */
export function HumanAuthority({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.humanAuthority;
  const { hovered, hoverHandlers } = useHover();
  return (
    <group
      position={position}
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("humanAuthority");
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
            color={colors.humanAuthority}
            emissive={isSelected ? colors.humanAuthority : "#000000"}
            emissiveIntensity={isSelected ? 0.2 : 0}
            opacity={isDimmed ? 0.2 : 1}
            transparent
            depthWrite={false}
            roughness={0.9}
            metalness={0}
          />
        </mesh>
        <Label position={[0, size[1] / 2 + 0.3, 0]} text={label} dimmed={isDimmed} />
      </group>
    </group>
  );
}
