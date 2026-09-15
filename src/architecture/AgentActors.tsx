"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

const agentShape: Record<string, "box" | "cone" | "sphere" | "octahedron"> = {
  codex: "box",
  claude: "cone",
  gemini: "sphere",
  grok: "octahedron",
};

const agentLabel: Record<string, string> = {
  codex: "Codex",
  claude: "Claude",
  gemini: "Gemini",
  grok: "Grok",
};

function agentGeometry(shape: (typeof agentShape)[string]) {
  switch (shape) {
    case "box":
      return <boxGeometry args={[0.55, 0.55, 0.55]} />;
    case "cone":
      return <coneGeometry args={[0.32, 0.75, 4]} />;
    case "sphere":
      return <sphereGeometry args={[0.36, 16, 16]} />;
    case "octahedron":
      return <octahedronGeometry args={[0.42, 0]} />;
  }
}

/**
 * Agents are external actors, placed outside the loop on the left,
 * facing the entry gate. Positions are static (no continuous idle
 * animation) — motion should only ever explain a state transition.
 */
export function AgentActors({ isDimmed, isSelected, onSelect }: ArchitectureNodeProps) {
  const opacity = isDimmed ? 0.15 : 0.9;
  const emissiveIntensity = isSelected ? 0.5 : 0.1;
  const { hovered, hoverHandlers } = useHover();

  return (
    <group
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("agents");
      }}
    >
      {/* Fixed-size hit targets, always scale 1 -- see Contract.tsx. One
          per agent, matching that agent's own shape/position, so hover
          still tracks the visual cluster's actual footprint. */}
      {layout.agents.map((agent) => (
        <mesh key={`hit-${agent.id}`} position={agent.position} rotation={[0, Math.PI / 2, 0]} visible={false}>
          {agentGeometry(agentShape[agent.id])}
          <meshBasicMaterial />
        </mesh>
      ))}
      <group scale={hovered && !isDimmed ? HOVER_SCALE : 1}>
        {layout.agents.map((agent) => (
          <group key={agent.id} position={agent.position} rotation={[0, Math.PI / 2, 0]}>
            <mesh raycast={() => null}>
              {agentGeometry(agentShape[agent.id])}
              <meshStandardMaterial
                color={colors.textPrimary}
                emissive={isSelected ? colors.informationFlow : "#000000"}
                emissiveIntensity={emissiveIntensity}
                opacity={opacity}
                transparent
                depthWrite={false}
                roughness={0.5}
              />
            </mesh>
            <Label
              position={[0, 0.6, 0]}
              text={agentLabel[agent.id] ?? agent.id}
              size={0.2}
              dimmed={isDimmed}
            />
          </group>
        ))}
      </group>
    </group>
  );
}
