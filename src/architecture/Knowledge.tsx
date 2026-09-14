"use client";

import { Line } from "@react-three/drei";
import { layout, knowledgeNodeOffsets, knowledgeEdges } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { Label } from "./Label";
import type { ArchitectureNodeProps } from "./types";

/**
 * A small connected node graph, not another cube — Knowledge is a
 * derived projection of completed repository facts (see Repository
 * Protocol), not a peer governed object and not a source of authority.
 */
export function Knowledge({ isDimmed, isSelected, onSelect, label }: ArchitectureNodeProps) {
  const { position, size } = layout.knowledge;
  const opacity = isDimmed ? 0.15 : 0.85;
  /** Luminous by default — a graph of small light sources, not a lit solid. */
  const emissiveIntensity = isDimmed ? 0.05 : isSelected ? 0.9 : 0.45;

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("knowledge");
      }}
    >
      {knowledgeEdges.map(([a, b], index) => (
        <Line
          key={index}
          points={[knowledgeNodeOffsets[a], knowledgeNodeOffsets[b]]}
          color={colors.textMuted}
          lineWidth={1}
          transparent
          opacity={opacity * 0.8}
        />
      ))}
      {knowledgeNodeOffsets.map((offset, index) => (
        <mesh key={index} position={offset}>
          <sphereGeometry args={[size * (index === 0 ? 0.65 : 0.45), 10, 10]} />
          <meshStandardMaterial
            color={colors.textMuted}
            emissive={isSelected ? colors.informationFlow : colors.textMuted}
            emissiveIntensity={emissiveIntensity}
            opacity={opacity}
            transparent
            roughness={0.6}
          />
        </mesh>
      ))}
      <Label position={[0, 0.55, 0]} text={label} size={0.18} dimmed={isDimmed} />
    </group>
  );
}
