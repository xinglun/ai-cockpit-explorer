"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";
import { colors } from "@/design-system/semanticColors";

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
}

const CONE_UP = new Vector3(0, 1, 0);

/**
 * A directional connector: a line plus an arrowhead so relationships in
 * the Governance Loop read as flows, not just nearby floating objects.
 */
export function FlowLine({ from, to, color = colors.informationFlow, dashed = false, opacity = 0.85 }: FlowLineProps) {
  const { arrowPosition, arrowQuaternion } = useMemo(() => {
    const start = new Vector3(...from);
    const end = new Vector3(...to);
    const direction = end.clone().sub(start);
    const length = direction.length() || 1;
    const position = start.clone().add(direction.clone().multiplyScalar(0.85));
    const quaternion = new Quaternion().setFromUnitVectors(CONE_UP, direction.clone().normalize());
    return { arrowPosition: position, arrowQuaternion: quaternion, length };
  }, [from, to]);

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
    </>
  );
}
