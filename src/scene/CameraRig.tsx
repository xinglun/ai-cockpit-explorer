"use client";

import { useEffect, useRef } from "react";
import { CameraControls, CameraControlsImpl } from "@react-three/drei";
import type { ArchitectureElementId } from "@/data/architecture";
import { buildSetLookAtArgs } from "@/interaction/cameraTargets";
import { prefersReducedMotion } from "@/design-system/motion";

interface CameraRigProps {
  cameraId: ArchitectureElementId | null;
}

const { ACTION } = CameraControlsImpl;

/**
 * The single owner of camera position + orbit target. Replaces the old
 * split ArchitectureCamera (manual camera.lookAt per frame) + plain
 * OrbitControls (its own independent target) pair, whose two competing
 * update loops caused the camera to snap back right after every focus
 * transition. CameraControls owns both; setLookAt only runs when
 * cameraId itself changes, so user orbiting is never interrupted or
 * reset by an unrelated re-render.
 */
export function CameraRig({ cameraId }: CameraRigProps) {
  const controls = useRef<CameraControlsImpl>(null);

  useEffect(() => {
    const args = buildSetLookAtArgs(cameraId, prefersReducedMotion());
    controls.current?.setLookAt(...args);
  }, [cameraId]);

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
