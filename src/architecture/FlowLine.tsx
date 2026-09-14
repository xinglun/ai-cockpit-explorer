"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Mesh, Quaternion, Vector3 } from "three";
import { colors } from "@/design-system/semanticColors";
import { motion as motionTokens, prefersReducedMotion } from "@/design-system/motion";

interface FlowLineProps {
  from: [number, number, number];
  to: [number, number, number];
  color?: string;
  /**
   * Dashed lines represent an explicit human act that must happen next
   * (not an automatic data flow) — e.g. Outcome reaching Human Authority
   * does not automatically become an APPROVED decision.
   */
  dashed?: boolean;
  opacity?: number;
  /**
   * A small marker animates along this line while true — the only
   * motion in the Governance Loop that isn't a camera/mode transition.
   * Never set on a dashed line: animating the Outcome -> Human Authority
   * connector would visually suggest an automatic decision, which is
   * exactly the distinction that line exists to deny.
   */
  pulse?: boolean;
}

const CONE_UP = new Vector3(0, 1, 0);

/**
 * A directional connector: a line plus an arrowhead so relationships in
 * the Governance Loop read as flows, not just nearby floating objects.
 */
export function FlowLine({ from, to, color = colors.informationFlow, dashed = false, opacity = 0.85, pulse = false }: FlowLineProps) {
  const { arrowPosition, arrowQuaternion, start, end } = useMemo(() => {
    const start = new Vector3(...from);
    const end = new Vector3(...to);
    const direction = end.clone().sub(start);
    const position = start.clone().add(direction.clone().multiplyScalar(0.85));
    const quaternion = new Quaternion().setFromUnitVectors(CONE_UP, direction.clone().normalize());
    return { arrowPosition: position, arrowQuaternion: quaternion, start, end };
  }, [from, to]);

  const pulseRef = useRef<Mesh>(null);
  const elapsed = useRef(0);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const active = pulse && !reducedMotion;

  useFrame((_, delta) => {
    if (!active || !pulseRef.current) return;
    elapsed.current = (elapsed.current + delta * (1000 / motionTokens.tour)) % 1;
    pulseRef.current.position.lerpVectors(start, end, elapsed.current);
  });

  return (
    <>
      <Line
        points={[from, to]}
        color={color}
        lineWidth={1.5}
        dashed={dashed}
        dashSize={dashed ? 0.16 : undefined}
        gapSize={dashed ? 0.12 : undefined}
        transparent
        opacity={opacity}
      />
      <mesh position={arrowPosition.toArray()} quaternion={arrowQuaternion}>
        <coneGeometry args={[0.08, 0.22, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} />
      </mesh>
      {active && (
        <mesh ref={pulseRef} position={start.toArray()}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
        </mesh>
      )}
    </>
  );
}
