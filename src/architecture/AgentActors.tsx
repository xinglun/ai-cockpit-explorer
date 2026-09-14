"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

const agentShape: Record<string, "box" | "cone"> = {
  codex: "box",
  claude: "cone",
};

/**
 * Agents are external actors, placed outside the loop on the left,
 * facing the entry gate. Positions are static (no continuous idle
 * animation) — motion should only ever explain a state transition.
 */
export function AgentActors({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const opacity = isDimmed ? 0.15 : 0.9;
  const emissiveIntensity = isSelected ? 0.5 : 0.1;

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect("agents");
      }}
    >
      {layout.agents.map((agent) => (
        <group key={agent.id} position={agent.position} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            {agentShape[agent.id] === "box" ? (
              <boxGeometry args={[0.55, 0.55, 0.55]} />
            ) : (
              <coneGeometry args={[0.32, 0.75, 4]} />
            )}
            <meshStandardMaterial
              color={colors.textPrimary}
              emissive={isSelected ? colors.informationFlow : "#000000"}
              emissiveIntensity={emissiveIntensity}
              opacity={opacity}
              transparent
              roughness={0.5}
            />
          </mesh>
          <Label
            position={[0, 0.6, 0]}
            text={agent.id === "codex" ? "Codex" : "Claude"}
            size={0.2}
            dimmed={isDimmed}
          />
        </group>
      ))}
    </group>
  );
}
