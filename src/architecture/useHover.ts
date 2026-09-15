"use client";

import { useState } from "react";
import { useCursor } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

/**
 * Shared scale bump applied on hover across every architecture
 * element. Raised from an earlier 1.05 -- that magnitude read as
 * imperceptible against the full scene, not as a deliberate cue.
 */
export const HOVER_SCALE = 1.15;

/**
 * Shared hover affordance for every clickable architecture element: a
 * pointer cursor plus a discrete hovered flag a component can use for
 * a subtle visual cue (e.g. a small scale bump) distinct from its
 * selected/dimmed state. Deliberately a plain on/off toggle, not a
 * useFrame-driven animation -- hover should never become a continuous
 * per-frame effect.
 */
export function useHover() {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return {
    hovered,
    hoverHandlers: {
      onPointerOver: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        setHovered(true);
      },
      onPointerOut: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        setHovered(false);
      },
    },
  };
}
