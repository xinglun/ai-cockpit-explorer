"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { prefersReducedMotion } from "@/design-system/motion";
import { ringPhaseAt, isRingLit, type RingPhase } from "@/interaction/verifyPhase";
import { Label } from "./Label";
import { useHover, HOVER_SCALE } from "./useHover";
import type { ArchitectureNodeProps } from "./types";

interface RuntimeProps extends ArchitectureNodeProps {
  /** True while a Verify beat (Verification mode or the tour's evidence/verification scenes) is the active context. */
  verifying?: boolean;
  /** True for the RED fail-closed scenario — the sequence holds short of "settled" and reads blocked, not resolved. */
  blocked?: boolean;
}

/**
 * Runtime is the Governance Engine — a bounded, layered structure the
 * whole scene reads as its visual core, not a torus-plus-icosahedron
 * placeholder. Concentric layers (outer boundary, verification,
 * evidence, core) sit dim at rest and activate in sequence during a
 * Verify beat: evidence arrives, the outer boundary lights, the
 * verification ring lights, then the core resolves. A blocked (RED)
 * outcome holds the sequence short of the core resolving and reads red
 * instead of green — Runtime itself "performs" verification rather
 * than sitting inert while other elements do the work.
 */
export function Runtime({ isDimmed, isSelected, onSelect, label, verifying = false, blocked = false }: RuntimeProps) {
  const { position, size } = layout.runtime;
  const opacity = isDimmed ? 0.2 : 1;

  const elapsed = useRef(0);
  const wasVerifying = useRef(false);
  const phaseRef = useRef<RingPhase>("idle");
  const [phase, setPhase] = useState<RingPhase>("idle");

  useFrame((_, delta) => {
    const reducedMotion = prefersReducedMotion();
    if (verifying && !wasVerifying.current) elapsed.current = 0;
    wasVerifying.current = verifying;
    if (verifying) elapsed.current += delta * 1000;
    const next = ringPhaseAt(elapsed.current, verifying, reducedMotion);
    if (next !== phaseRef.current) {
      phaseRef.current = next;
      setPhase(next);
    }
  });

  const resolvedColor = blocked ? colors.stateRed : colors.informationFlow;

  const restIntensity = isDimmed ? 0.05 : 0.2;
  const litIntensity = (lit: boolean, resolved = false) => {
    if (!lit) return restIntensity;
    if (resolved && blocked) return 0.4; // held, not resolved: dim red rather than a bright climax
    return isSelected ? 0.95 : 0.85;
  };

  const evidenceLit = isRingLit(phase, "evidence");
  const outerLit = isRingLit(phase, "outer");
  const verifyLit = isRingLit(phase, "verify");
  const coreLit = isRingLit(phase, "core") && !blocked;
  const { hovered, hoverHandlers } = useHover();

  return (
    <group
      position={position}
      scale={hovered && !isDimmed ? HOVER_SCALE : 1}
      {...hoverHandlers}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("runtime");
      }}
    >
      {/* Outer boundary ring: the widest, structural layer. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 1.25, size * 0.05, 8, 40]} />
        <meshStandardMaterial
          color={colors.surfaceRaised}
          emissive={resolvedColor}
          emissiveIntensity={litIntensity(outerLit)}
          opacity={opacity}
          transparent
          depthWrite={false}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      {/* Verification ring: the controlled emissive layer. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size, size * 0.05, 8, 36]} />
        <meshStandardMaterial
          color={colors.surfaceRaised}
          emissive={resolvedColor}
          emissiveIntensity={litIntensity(verifyLit)}
          opacity={opacity}
          transparent
          depthWrite={false}
          roughness={0.28}
          metalness={0.82}
        />
      </mesh>
      {/* Evidence ring: the innermost ring, closest to the core. */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size * 0.7, size * 0.045, 8, 32]} />
        <meshStandardMaterial
          color={colors.stateGreen}
          emissive={colors.stateGreen}
          emissiveIntensity={evidenceLit ? litIntensity(evidenceLit) : restIntensity * 0.5}
          opacity={opacity}
          transparent
          depthWrite={false}
          roughness={0.4}
          metalness={0.4}
        />
      </mesh>
      {/* The core: solid at rest, resolves (or holds blocked) at the sequence's end. */}
      <mesh>
        <icosahedronGeometry args={[size * 0.38, 1]} />
        <meshStandardMaterial
          color={colors.surface}
          emissive={coreLit || isSelected ? resolvedColor : "#000000"}
          emissiveIntensity={coreLit ? litIntensity(true, blocked) : isSelected ? 0.3 : 0}
          opacity={opacity}
          transparent
          depthWrite={false}
          roughness={0.55}
          metalness={0.25}
        />
      </mesh>
      <Label position={[0, size * 1.25 + 0.15, 0]} text={label} dimmed={isDimmed} />
    </group>
  );
}
