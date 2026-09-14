"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import type { ArchitectureNodeProps } from "./types";

/**
 * Agents are external actors, rendered as distinct small meshes outside
 * the repository/runtime cluster, oriented toward the entry surface.
 * Positions are static (no continuous idle animation) — motion should
 * only ever explain a state transition, not decorate an idle scene.
 */
export function AgentActors({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const { radius, count, height } = layout.agents;

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect("agents");
      }}
    >
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={index} position={[x, height, z]} rotation={[Math.PI, 0, -angle]}>
            <coneGeometry args={[0.3, 0.7, 4]} />
            <meshStandardMaterial
              color={colors.textPrimary}
              emissive={isSelected ? colors.informationFlow : "#000000"}
              emissiveIntensity={isSelected ? 0.5 : 0.1}
              opacity={isDimmed ? 0.15 : 0.85}
              transparent
              roughness={0.5}
            />
          </mesh>
        );
      })}
    </group>
  );
}
