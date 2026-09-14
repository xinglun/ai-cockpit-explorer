"use client";

import { OrbitControls } from "@react-three/drei";

export function ArchitectureControls() {
  return (
    <OrbitControls
      enablePan={false}
      minDistance={4}
      maxDistance={20}
      maxPolarAngle={Math.PI / 2.05}
    />
  );
}
