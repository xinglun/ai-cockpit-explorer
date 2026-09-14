"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import type { CameraTarget } from "@/interaction/cameraTargets";
import { motion as motionTokens, prefersReducedMotion } from "@/design-system/motion";

interface ArchitectureCameraProps {
  target: CameraTarget;
}

/**
 * Animates the camera toward a target only while it has not yet
 * arrived — this is a meaningful focus transition, not an idle loop.
 * Once within tolerance it stops updating.
 */
export function ArchitectureCamera({ target }: ArchitectureCameraProps) {
  const { camera } = useThree();
  const lookAtRef = useRef(new Vector3(...target.lookAt));
  const targetPosition = useRef(new Vector3(...target.position));
  const targetLookAt = useRef(new Vector3(...target.lookAt));

  useEffect(() => {
    targetPosition.current.set(...target.position);
    targetLookAt.current.set(...target.lookAt);
  }, [target]);

  useFrame((_, delta) => {
    const arrived =
      camera.position.distanceTo(targetPosition.current) < 0.01 &&
      lookAtRef.current.distanceTo(targetLookAt.current) < 0.01;
    if (arrived) return;

    const reduced = prefersReducedMotion();
    const speed = reduced ? 1 : Math.min(1, delta * (1000 / motionTokens.focus));
    camera.position.lerp(targetPosition.current, speed);
    lookAtRef.current.lerp(targetLookAt.current, speed);
    camera.lookAt(lookAtRef.current);
  });

  return null;
}
