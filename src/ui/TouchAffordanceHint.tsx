"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "./FadeIn";
import { colors } from "@/design-system/semanticColors";
import type { ExplorerMessages } from "@/i18n/types";

interface TouchAffordanceHintProps {
  messages: ExplorerMessages;
  dismissed: boolean;
}

const AUTO_DISMISS_MS = 4500;

/**
 * Desktop visitors learn "these shapes are clickable" from the hover
 * cue (see useHover.ts) as they move the mouse around. Touch has no
 * hover event, so without this a touch visitor gets no signal short
 * of tapping something at random. Shown once, only on touch/no-hover
 * viewports, until the visitor selects an element or a few seconds
 * pass -- never a persistent overlay.
 */
export function TouchAffordanceHint({ messages, dismissed }: TouchAffordanceHintProps) {
  const [isTouch] = useState(() => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!isTouch) return;
    const timer = window.setTimeout(() => setExpired(true), AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [isTouch]);

  if (!isTouch || dismissed || expired) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-20 flex justify-center md:top-24">
      <FadeIn>
        <p
          style={{ backgroundColor: colors.surface, borderColor: colors.border, color: colors.textPrimary }}
          className="rounded-full border px-4 py-2 text-sm"
        >
          {messages.app.touchHint}
        </p>
      </FadeIn>
    </div>
  );
}
