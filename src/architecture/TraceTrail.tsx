"use client";

import { Line } from "@react-three/drei";
import { traceTrailPoints } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";

/**
 * An optional 3D echo of the Trace / Audit timeline — a light trail
 * of small nodes through the same primary events the DOM
 * TraceTimeline lists, in order. Hidden by default and only rendered
 * once a user explicitly reveals it (see ExplorerShell's
 * `showTraceTrail` state) — the DOM timeline remains the primary
 * Traceability interface; this is a spatial companion, not a
 * replacement.
 */
export function TraceTrail() {
  return (
    <group>
      <Line points={traceTrailPoints} color={colors.informationFlow} lineWidth={1} dashed dashSize={0.1} gapSize={0.08} transparent opacity={0.5} />
      {traceTrailPoints.map((point, index) => (
        <mesh key={index} position={point}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial
            color={colors.informationFlow}
            emissive={colors.informationFlow}
            emissiveIntensity={0.5}
            transparent
            depthWrite={false}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}
