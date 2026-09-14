"use client";

import { Billboard, Text } from "@react-three/drei";
import { colors } from "@/design-system/semanticColors";

interface LabelProps {
  position: [number, number, number];
  text: string;
  size?: number;
  dimmed?: boolean;
}

/**
 * Persistent 3D label — always visible, not only on hover/select, so
 * the scene reads as a labeled system rather than unlabeled geometry.
 * Wrapped in Billboard: drei's Text has a fixed world-space
 * orientation on its own, so orbiting past a label (or viewing it
 * from above/behind) showed its back — a mirrored, upside-down flip —
 * instead of readable text. Billboard keeps it continuously facing
 * the camera from every angle.
 *
 * "Always visible" only holds in the unfiltered Overview (nothing
 * dimmed, few enough labels to coexist). Once a Work Item stage,
 * Verification scenario, or tour scene filters the scene, every
 * dimmed element's label was still rendering at 25% opacity — with
 * a dozen-plus labels this reads as dense overlapping text rather
 * than a restrained, readable filtered view. Dimmed labels are
 * dropped entirely instead: the geometry stays (faded), the text
 * does not compete for the same screen space.
 */
export function Label({ position, text, size = 0.26, dimmed = false }: LabelProps) {
  if (dimmed) return null;
  return (
    <Billboard position={position}>
      <Text
        fontSize={size}
        color={colors.textPrimary}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.012}
        outlineColor={colors.background}
      >
        {text}
      </Text>
    </Billboard>
  );
}
