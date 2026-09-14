"use client";

import { Text } from "@react-three/drei";
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
 */
export function Label({ position, text, size = 0.26, dimmed = false }: LabelProps) {
  return (
    <Text
      position={position}
      fontSize={size}
      color={colors.textPrimary}
      anchorX="center"
      anchorY="bottom"
      outlineWidth={0.012}
      outlineColor={colors.background}
      fillOpacity={dimmed ? 0.25 : 1}
    >
      {text}
    </Text>
  );
}
