"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion as motionTokens, prefersReducedMotion } from "@/design-system/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fades a mode/selection-specific panel in on mount instead of it
 * appearing with a hard cut. Pass a `key` from the caller when the
 * same conditional block should re-fade for a new value (e.g. a new
 * selection) without actually unmounting. prefers-reduced-motion
 * skips the transition and renders at full opacity immediately.
 */
export function FadeIn({ children, className }: FadeInProps) {
  const reduced = prefersReducedMotion();
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    if (reduced) return;
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
    // Intentionally runs once per mount only -- a fresh mount (e.g. via
    // a caller-supplied `key`) is what should restart the fade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: reduced ? "none" : `opacity ${motionTokens.normal}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
