"use client";

import { useMemo } from "react";
import { BackSide, BufferAttribute, Color, SphereGeometry } from "three";
import { colors } from "@/design-system/semanticColors";

const RADIUS = 60;

/**
 * A large inverted sphere with a vertical vertex-color gradient — a
 * dark backdrop with depth, not a flat color plane, but still just
 * standard vertex colors (no custom shader material).
 */
export function SceneBackdrop() {
  const geometry = useMemo(() => {
    const geo = new SphereGeometry(RADIUS, 24, 24);
    const position = geo.attributes.position;
    const top = new Color(colors.backgroundGradientTop);
    const bottom = new Color(colors.backgroundGradientBottom);
    const channels = new Float32Array(position.count * 3);
    for (let i = 0; i < position.count; i += 1) {
      const y = position.getY(i);
      const t = Math.min(1, Math.max(0, (y + RADIUS) / (RADIUS * 2)));
      const mixed = top.clone().lerp(bottom, t);
      channels[i * 3] = mixed.r;
      channels[i * 3 + 1] = mixed.g;
      channels[i * 3 + 2] = mixed.b;
    }
    geo.setAttribute("color", new BufferAttribute(channels, 3));
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} renderOrder={-1}>
      <meshBasicMaterial vertexColors side={BackSide} depthWrite={false} fog={false} />
    </mesh>
  );
}
