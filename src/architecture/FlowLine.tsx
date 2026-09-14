"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Group, Quaternion, Vector3 } from "three";
import { colors } from "@/design-system/semanticColors";
import { motion as motionTokens, prefersReducedMotion } from "@/design-system/motion";
import { buildFlowCurvePoints, pointAlongCurve, tangentAlongCurve } from "@/interaction/flowCurve";

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
   * Small markers travel along this curve while true — the only motion
   * in the Governance Loop that isn't a camera/mode transition. Never
   * set on a dashed line: animating the Outcome -> Human Authority
   * connector would visually suggest an automatic decision, which is
   * exactly the distinction that line exists to deny.
   */
  pulse?: boolean;
}

const CONE_UP = new Vector3(0, 1, 0);
const PACKET_COUNT = 3;

/**
 * A directional connector rendered as a curved data channel (a single
 * gentle bow, not a straight wire) plus an arrowhead, so relationships
 * in the Governance Loop read as channels with a shape, not nearby
 * floating objects joined by a ruler line.
 */
export function FlowLine({
  from,
  to,
  color = colors.informationFlow,
  dashed = false,
  opacity = 0.85,
  pulse = false,
}: FlowLineProps) {
  const points = useMemo(() => buildFlowCurvePoints(from, to), [from, to]);

  const { arrowPosition, arrowQuaternion } = useMemo(() => {
    const position = pointAlongCurve(points, 0.94);
    const tangent = tangentAlongCurve(points, 0.94);
    const direction = new Vector3(...tangent).normalize();
    const quaternion = new Quaternion().setFromUnitVectors(CONE_UP, direction);
    return { arrowPosition: position, arrowQuaternion: quaternion };
  }, [points]);

  const packetsRef = useRef<Group>(null);
  const elapsed = useRef(0);
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const active = pulse && !reducedMotion;

  useFrame((_, delta) => {
    if (!active || !packetsRef.current) return;
    elapsed.current = (elapsed.current + delta * (1000 / motionTokens.tour)) % 1;
    packetsRef.current.children.forEach((child, index) => {
      const phase = (elapsed.current + index / PACKET_COUNT) % 1;
      const position = pointAlongCurve(points, phase);
      const tangent = tangentAlongCurve(points, phase);
      const direction = new Vector3(...tangent).normalize();
      child.position.set(...position);
      child.quaternion.setFromUnitVectors(CONE_UP, direction);
    });
  });

  return (
    <>
      <Line
        points={points}
        color={color}
        lineWidth={1.5}
        dashed={dashed}
        dashSize={dashed ? 0.16 : undefined}
        gapSize={dashed ? 0.12 : undefined}
        transparent
        opacity={opacity}
      />
      <mesh position={arrowPosition} quaternion={arrowQuaternion}>
        <coneGeometry args={[0.08, 0.22, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} />
      </mesh>
      {active && (
        // Multiple short tapered markers (not plain spheres), each
        // oriented along its own local travel direction so the packets
        // read as directional data moving through the channel, not a
        // single dot sliding along a wire.
        <group ref={packetsRef}>
          {Array.from({ length: PACKET_COUNT }).map((_, index) => (
            <mesh key={index} position={points[0]}>
              <coneGeometry args={[0.06, 0.18, 8]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} />
            </mesh>
          ))}
        </group>
      )}
    </>
  );
}
