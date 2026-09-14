"use client";

import { ContactShadows, Environment, Grid, Lightformer } from "@react-three/drei";
import { colors } from "@/design-system/semanticColors";
import { SceneBackdrop } from "./SceneBackdrop";

/**
 * Restrained "engineering instrument" environment: a dark gradient
 * backdrop, faint depth fog, a low-contrast ground grid, neutral
 * environment lighting for material reflections, and a soft contact
 * shadow. No bloom, no color spotlighting, no sci-fi decoration —
 * see src/design-system/README.md's visual-direction constraints.
 */
export function SceneLighting() {
  return (
    <>
      <color attach="background" args={[colors.backgroundGradientTop]} />
      <fog attach="fog" args={[colors.backgroundGradientTop, 22, 46]} />
      <SceneBackdrop />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 4]} intensity={1.1} />
      <directionalLight position={[-6, 4, -4]} intensity={0.3} />
      {/*
        A synthetic (Lightformer-based) environment, not a `preset` —
        presets fetch an HDRI from a remote CDN, which is slow/flaky
        offline and in CI. This stays fully local and still gives
        materials (glass, metal) something believable to reflect.
      */}
      <Environment resolution={64} frames={1}>
        <Lightformer
          form="rect"
          intensity={2}
          color={colors.textPrimary}
          position={[0, 8, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          form="rect"
          intensity={0.6}
          color={colors.informationFlow}
          position={[8, 2, 4]}
          rotation={[0, -Math.PI / 3, 0]}
          scale={[6, 6, 1]}
        />
      </Environment>
      {/*
        Repository sits at y=-1.55 with height 1.1 (bottom edge -2.1) —
        the ground plane must sit below that bottom edge, not through
        the middle of the mesh, or it visually cuts the Repository in
        half and reads as the whole lower scene being occluded.
      */}
      <Grid
        position={[0, -2.2, 0]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.4}
        cellColor={colors.border}
        sectionSize={5}
        sectionThickness={0.7}
        sectionColor={colors.surfaceRaised}
        fadeDistance={26}
        fadeStrength={1.5}
        infiniteGrid
      />
      <ContactShadows
        position={[0, -2.19, 0]}
        opacity={0.28}
        scale={16}
        blur={2.4}
        far={3}
        frames={1}
      />
    </>
  );
}
