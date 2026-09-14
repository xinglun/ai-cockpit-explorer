"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { workItemEnvelopeBounds } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { prefersReducedMotion } from "@/design-system/motion";
import { nextEnvelopeStep, vec3Reached, type Vec3 } from "@/interaction/envelopeTransition";
import { Label } from "./Label";
import type { WorkItemEnvelopeStage } from "@/data/workItem";
import type { ArchitectureElementId } from "@/data/architecture";

interface WorkItemEnvelopeProps {
  stage: WorkItemEnvelopeStage;
  workItemId: string;
  isDimmed: boolean;
  isSelected: boolean;
  onSelect: (id: ArchitectureElementId) => void;
  label: string;
  closedLabel: string;
}

const COLLAPSED_STAGES: WorkItemEnvelopeStage[] = ["archived", "closed"];

/**
 * A bounded, evolving envelope around whatever the in-flight Work Item
 * currently touches — not a UI-only highlight. It does not exist
 * before start (stage "none"), expands through checkpoint/verify/finish,
 * and collapses into Repository Protocol at archive/close. This is the
 * spatial answer to "where is the Work Item" rather than a dashboard
 * label with nothing behind it. Stage bounds are still discrete
 * greybox presets (see workItemEnvelopeBounds); the *move* between
 * presets is a smooth, bounded lerp (see envelopeTransition.ts), only
 * running while actually in transit, and skipped entirely (an instant
 * snap) under prefers-reduced-motion.
 */
export function WorkItemEnvelope({
  stage,
  workItemId,
  isDimmed,
  isSelected,
  onSelect,
  label,
  closedLabel,
}: WorkItemEnvelopeProps) {
  const target = stage === "none" ? null : workItemEnvelopeBounds[stage];
  const collapsed = stage !== "none" && COLLAPSED_STAGES.includes(stage);

  const [center, setCenter] = useState<Vec3>(target?.center ?? [0, 0, 0]);
  const [size, setSize] = useState<Vec3>(target?.size ?? [0.01, 0.01, 0.01]);
  const wasVisible = useRef(stage !== "none");

  useEffect(() => {
    // Nothing to morph from the first time the envelope appears —
    // snap directly to the stage's bounds instead of animating in
    // from wherever the previous (now-gone) stage last left off.
    if (target && !wasVisible.current) {
      setCenter(target.center);
      setSize(target.size);
    }
    wasVisible.current = stage !== "none";
  }, [stage, target]);

  useFrame((_, delta) => {
    if (!target) return;
    const reduced = prefersReducedMotion();
    const deltaMs = delta * 1000;
    if (!vec3Reached(center, target.center)) {
      setCenter((current) => nextEnvelopeStep(current, target.center, deltaMs, reduced));
    }
    if (!vec3Reached(size, target.size)) {
      setSize((current) => nextEnvelopeStep(current, target.size, deltaMs, reduced));
    }
  });

  if (!target) return null;

  return (
    <group
      position={center}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("workItem");
      }}
    >
      {/* Clear glass body — the envelope reads as a boundary you can see into, not a fog. */}
      <mesh>
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color={colors.informationFlow}
          emissive={isSelected ? colors.informationFlow : "#000000"}
          emissiveIntensity={isSelected ? 0.25 : 0.05}
          opacity={isDimmed ? 0.03 : collapsed ? 0.14 : 0.06}
          transparent
          transmission={0.6}
          roughness={0.15}
          thickness={0.6}
          ior={1.4}
          depthWrite={false}
        />
      </mesh>
      {/* A thin wireframe so the boundary stays legible even at low opacity. */}
      <mesh>
        <boxGeometry args={size} />
        <meshBasicMaterial
          color={colors.informationFlow}
          wireframe
          transparent
          opacity={isDimmed ? 0.05 : 0.25}
          depthWrite={false}
        />
      </mesh>
      <Label
        position={[0, size[1] / 2 + 0.3, 0]}
        text={`${label}: ${workItemId}`}
        size={0.18}
        dimmed={isDimmed}
      />
      {stage === "closed" && (
        <Label position={[0, size[1] / 2 + 0.55, 0]} text={closedLabel} size={0.2} dimmed={isDimmed} />
      )}
    </group>
  );
}
