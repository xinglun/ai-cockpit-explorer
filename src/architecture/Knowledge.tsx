"use client";

import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { layout, knowledgeNodeOffsets, knowledgeEdges, knowledgeNewNodeEdge } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { prefersReducedMotion } from "@/design-system/motion";
import { nextEnvelopeStep, vec3Reached, type Vec3 } from "@/interaction/envelopeTransition";
import { hasArchivedKnowledge } from "@/interaction/knowledgeReveal";
import { Label } from "./Label";
import { useHover } from "./useHover";
import type { ArchitectureNodeProps } from "./types";
import type { WorkItemEnvelopeStage } from "@/data/workItem";

interface KnowledgeProps extends ArchitectureNodeProps {
  workItemStage: WorkItemEnvelopeStage;
}

const HIDDEN_SCALE: Vec3 = [0.01, 0.01, 0.01];
const SHOWN_SCALE: Vec3 = [1, 1, 1];

/**
 * A small connected node graph, not another cube — Knowledge is a
 * derived projection of completed repository facts (see Repository
 * Protocol), not a peer governed object and not a source of authority.
 * A fifth node grows in (reusing the same eased lerp as the Work Item
 * envelope's stage transitions) once the sample Work Item has
 * archived, briefly reading brighter than the rest while it animates
 * in — a visible "this became Knowledge" beat instead of a caption.
 */
export function Knowledge({ isDimmed, isSelected, onSelect, label, workItemStage }: KnowledgeProps) {
  const { position, size } = layout.knowledge;
  const opacity = isDimmed ? 0.15 : 0.85;
  /** Luminous by default — a graph of small light sources, not a lit solid. */
  // Kept well clear of the selective-bloom threshold (see
  // ArchitectureExperience.tsx) except when selected: a visible-but-
  // unselected node should read as a quiet light source, not glow.
  const emissiveIntensity = isDimmed ? 0.05 : isSelected ? 0.9 : 0.3;

  const revealed = hasArchivedKnowledge(workItemStage);
  const target = revealed ? SHOWN_SCALE : HIDDEN_SCALE;
  const [newNodeScale, setNewNodeScale] = useState<Vec3>(HIDDEN_SCALE);

  useFrame((_, delta) => {
    if (vec3Reached(newNodeScale, target)) return;
    const reduced = prefersReducedMotion();
    setNewNodeScale((current) => nextEnvelopeStep(current, target, delta * 1000, reduced));
  });

  const newNodeGrowing = newNodeScale[0] < 0.95 && newNodeScale[0] > 0.05;
  const { hovered, hoverHandlers } = useHover();

  return (
    <group
      position={position}
      scale={hovered && !isDimmed ? 1.05 : 1}
      {...hoverHandlers}
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
      {knowledgeNodeOffsets.slice(0, 4).map((offset, index) => (
        <mesh key={index} position={offset}>
          <sphereGeometry args={[size * (index === 0 ? 0.65 : 0.45), 10, 10]} />
          <meshStandardMaterial
            color={colors.textMuted}
            emissive={isSelected ? colors.informationFlow : colors.textMuted}
            emissiveIntensity={emissiveIntensity}
            opacity={opacity}
            transparent
            depthWrite={false}
            roughness={0.6}
          />
        </mesh>
      ))}
      {newNodeScale[0] > 0.05 && (
        <>
          <Line
            points={[knowledgeNodeOffsets[knowledgeNewNodeEdge[0]], knowledgeNodeOffsets[knowledgeNewNodeEdge[1]]]}
            color={colors.stateGreen}
            lineWidth={1}
            transparent
            opacity={opacity * 0.8 * newNodeScale[0]}
          />
          <mesh position={knowledgeNodeOffsets[4]} scale={newNodeScale}>
            <sphereGeometry args={[size * 0.45, 10, 10]} />
            <meshStandardMaterial
              color={colors.stateGreen}
              emissive={colors.stateGreen}
              emissiveIntensity={newNodeGrowing ? 0.85 : isSelected ? 0.9 : emissiveIntensity}
              opacity={opacity}
              transparent
              depthWrite={false}
              roughness={0.5}
            />
          </mesh>
        </>
      )}
      <Label position={[0, 0.55, 0]} text={label} size={0.18} dimmed={isDimmed} />
    </group>
  );
}
