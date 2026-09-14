"use client";

import { useEffect, useRef } from "react";
import { CameraControls, CameraControlsImpl } from "@react-three/drei";
import type { ArchitectureElementId } from "@/data/architecture";
import { buildSetLookAtArgs } from "@/interaction/cameraTargets";
import { prefersReducedMotion } from "@/design-system/motion";

interface CameraRigProps {
  cameraId: ArchitectureElementId | null;
  /**
   * True during a Verify beat — the camera dollies in slightly for a
   * deliberate cinematic push, then back out when the beat ends. A
   * supplementary nudge on top of the position `setLookAt` already
   * owns, not a second target-setting path: it never fires from
   * `cameraId` changing, only from this flag's own rising/falling edge.
   */
  pushIn?: boolean;
}

const { ACTION } = CameraControlsImpl;
const PUSH_IN_DISTANCE = 1.1;

/**
 * The single owner of camera position + orbit target. Replaces the old
 * split ArchitectureCamera (manual camera.lookAt per frame) + plain
 * OrbitControls (its own independent target) pair, whose two competing
 * update loops caused the camera to snap back right after every focus
 * transition. CameraControls owns both; setLookAt only runs when
 * cameraId itself changes, so user orbiting is never interrupted or
 * reset by an unrelated re-render.
 */
export function CameraRig({ cameraId, pushIn = false }: CameraRigProps) {
  const controls = useRef<CameraControlsImpl>(null);
  const pushedIn = useRef(false);

  useEffect(() => {
    const args = buildSetLookAtArgs(cameraId, prefersReducedMotion());
    controls.current?.setLookAt(...args);
  }, [cameraId]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (pushIn && !pushedIn.current) {
      controls.current?.dolly(PUSH_IN_DISTANCE, true);
      pushedIn.current = true;
    } else if (!pushIn && pushedIn.current) {
      controls.current?.dolly(-PUSH_IN_DISTANCE, true);
      pushedIn.current = false;
    }
  }, [pushIn]);

  return (
    <CameraControls
      ref={controls}
      minDistance={4}
      maxDistance={20}
      maxPolarAngle={Math.PI / 2.05}
      mouseButtons={{
        left: ACTION.ROTATE,
        middle: ACTION.DOLLY,
        right: ACTION.NONE,
        wheel: ACTION.DOLLY,
      }}
      touches={{
        one: ACTION.TOUCH_ROTATE,
        two: ACTION.TOUCH_DOLLY_TRUCK,
        three: ACTION.NONE,
      }}
    />
  );
}
