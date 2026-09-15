"use client";

import { useEffect, useRef, useState } from "react";
import { useCursor } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";

/**
 * Shared scale bump applied on hover across every architecture
 * element. Raised from an earlier 1.05 -- that magnitude read as
 * imperceptible against the full scene, not as a deliberate cue.
 */
export const HOVER_SCALE = 1.15;

/**
 * Elements sit close enough to each other (e.g. Contract/Outcome,
 * Human Control Interface/Human Authority) that the raycast hit test
 * right at their shared edge can flip between them from one pointer
 * frame to the next -- and since HOVER_SCALE itself changes each
 * element's footprint, a hover toggling on shifts that edge again,
 * which can flip the hit test right back. Debouncing only the "leave"
 * transition breaks that feedback loop without adding a continuous
 * per-frame effect: entering is still instant, and a leave is only
 * committed once no element has re-claimed the pointer for a short
 * window.
 */
const LEAVE_DEBOUNCE_MS = 60;

export function useHover() {
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useCursor(hovered);

  useEffect(() => {
    return () => {
      if (leaveTimer.current !== null) clearTimeout(leaveTimer.current);
    };
  }, []);

  return {
    hovered,
    hoverHandlers: {
      onPointerOver: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        if (leaveTimer.current !== null) {
          clearTimeout(leaveTimer.current);
          leaveTimer.current = null;
        }
        setHovered(true);
      },
      onPointerOut: (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();
        if (leaveTimer.current !== null) clearTimeout(leaveTimer.current);
        leaveTimer.current = setTimeout(() => {
          leaveTimer.current = null;
          setHovered(false);
        }, LEAVE_DEBOUNCE_MS);
      },
    },
  };
}
