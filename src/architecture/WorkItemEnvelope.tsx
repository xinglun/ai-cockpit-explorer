"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { workItemEnvelopeBounds } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { prefersReducedMotion } from "@/design-system/motion";
import { nextEnvelopeStep, vec3Reached, type Vec3 } from "@/interaction/envelopeTransition";
import { cornerBracketSegments } from "@/interaction/boundaryField";
import { Label } from "./Label";
import { useHover } from "./useHover";
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
  /** True for the RED fail-closed Verification scenario — the boundary flashes red instead of reading as an open glass volume. */
  blocked?: boolean;
}

const COLLAPSED_STAGES: WorkItemEnvelopeStage[] = ["archived", "closed"];
const FLASH_HZ = 2.4;

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
 *
 * Rendered as a boundary field — corner brackets implying a volume —
 * rather than a fully six-sided glass box: the six-sided version read
 * as a fishbowl and drew attention to itself as an object rather than
 * a boundary. When `blocked`, the brackets flash red instead of the
 * usual blue, a distinct visual state for an out-of-scope action;
 * reduced motion holds solid red instead of flashing.
 */
export function WorkItemEnvelope({
  stage,
  workItemId,
  isDimmed,
  isSelected,
  onSelect,
  label,
  closedLabel,
  blocked = false,
}: WorkItemEnvelopeProps) {
  const target = stage === "none" ? null : workItemEnvelopeBounds[stage];
  const collapsed = stage !== "none" && COLLAPSED_STAGES.includes(stage);

  const [center, setCenter] = useState<Vec3>(target?.center ?? [0, 0, 0]);
  const [size, setSize] = useState<Vec3>(target?.size ?? [0.01, 0.01, 0.01]);
  const wasVisible = useRef(stage !== "none");
  const [flashPhase, setFlashPhase] = useState(1);
  const { hovered, hoverHandlers } = useHover();

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

  useFrame((state, delta) => {
    if (target) {
      const reduced = prefersReducedMotion();
      const deltaMs = delta * 1000;
      if (!vec3Reached(center, target.center)) {
        setCenter((current) => nextEnvelopeStep(current, target.center, deltaMs, reduced));
      }
      if (!vec3Reached(size, target.size)) {
        setSize((current) => nextEnvelopeStep(current, target.size, deltaMs, reduced));
      }
    }
    if (blocked && !prefersReducedMotion()) {
      setFlashPhase(0.55 + 0.45 * Math.abs(Math.sin(state.clock.elapsedTime * Math.PI * FLASH_HZ)));
    } else if (flashPhase !== 1) {
      setFlashPhase(1);
    }
  });

  if (!target) return null;

  const boundaryColor = blocked ? colors.stateRed : colors.informationFlow;
  // A hover boost on opacity, not scale: center/size are absolute world
  // coordinates the segments/mesh below use directly, not a local
  // offset from this group's own (unset) position -- scaling the group
  // would grow the boundary outward from the world origin instead of
  // from its own center, a visibly wrong jump rather than a subtle cue.
  const baseOpacity =
    (isDimmed ? 0.08 : collapsed ? 0.4 : blocked ? 0.85 : isSelected ? 0.7 : 0.5) + (hovered && !isDimmed ? 0.15 : 0);
  const opacity = baseOpacity * (blocked ? flashPhase : 1);
  const segments = cornerBracketSegments(center, size);
  const lineWidth = isSelected || hovered ? 3 : 2;

  return (
    <group
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("workItem");
      }}
    >
      {segments.map((segment, index) => (
        <Line key={index} points={segment} color={boundaryColor} lineWidth={lineWidth} transparent opacity={opacity} />
      ))}
      {/* An almost-invisible fill so the volume is still clickable, not just its edges. */}
      <mesh position={center}>
        <boxGeometry args={size} />
        <meshBasicMaterial color={boundaryColor} transparent opacity={isDimmed ? 0.01 : 0.03} depthWrite={false} />
      </mesh>
      <Label
        position={[center[0], center[1] + size[1] / 2 + 0.5, center[2]]}
        text={`${label}: ${workItemId}`}
        size={0.18}
        dimmed={isDimmed}
      />
      {stage === "closed" && (
        <Label
          position={[center[0], center[1] + size[1] / 2 + 0.75, center[2]]}
          text={closedLabel}
          size={0.2}
          dimmed={isDimmed}
        />
      )}
    </group>
  );
}
