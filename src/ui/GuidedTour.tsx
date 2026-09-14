"use client";

import { tourSteps, nextStepIndex, previousStepIndex, isLastStep } from "@/interaction/tour";
import { colors } from "@/design-system/semanticColors";
import type { ExplorerMessages } from "@/i18n/types";

interface GuidedTourProps {
  stepIndex: number;
  active: boolean;
  onStart: () => void;
  onStepChange: (index: number) => void;
  onExit: () => void;
  messages: ExplorerMessages;
}

/**
 * A 7-scene narrative overlay, not a plain camera pan. The climax
 * (step 6: "Verified ≠ Approved") gets deliberate visual weight —
 * larger type, no competing UI.
 */
export function GuidedTour({ stepIndex, active, onStart, onStepChange, onExit, messages }: GuidedTourProps) {
  const copy = messages.tour;

  if (!active) {
    return (
      <button
        type="button"
        onClick={onStart}
        style={{ backgroundColor: colors.informationFlow, color: colors.background }}
        className="w-fit rounded px-4 py-2 text-sm font-semibold"
      >
        {copy.start}
      </button>
    );
  }

  const step = tourSteps[stepIndex];
  const stepCopy = copy.steps[stepIndex];
  const isClimax = step.status === "verified-not-approved";
  const sceneLabel = copy.sceneOfTotal
    .replace("{current}", String(stepIndex + 1))
    .replace("{total}", String(tourSteps.length));

  return (
    <div
      style={{ borderColor: colors.border, color: colors.textPrimary, backgroundColor: colors.surface }}
      className="flex w-full max-w-xl flex-col gap-3 rounded border p-4 shadow-lg"
      role="region"
      aria-label={copy.ariaLabel}
    >
      <p style={{ color: colors.textSecondary }} className="text-xs">
        {sceneLabel}
      </p>
      <h3 className={isClimax ? "text-xl font-bold" : "text-base font-semibold"}>{stepCopy.title}</h3>
      <p
        className={isClimax ? "text-lg font-semibold" : "text-sm"}
        style={isClimax ? { color: colors.stateGreen } : undefined}
      >
        {stepCopy.narration}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onStepChange(previousStepIndex(stepIndex))}
          disabled={stepIndex === 0}
          className="rounded border px-2 py-1 text-xs disabled:opacity-40"
          style={{ borderColor: colors.border }}
        >
          {copy.previous}
        </button>
        {isLastStep(stepIndex) ? (
          <button
            type="button"
            onClick={onExit}
            className="rounded border px-2 py-1 text-xs"
            style={{ borderColor: colors.border }}
          >
            {copy.done}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onStepChange(nextStepIndex(stepIndex))}
            className="rounded border px-2 py-1 text-xs"
            style={{ borderColor: colors.border }}
          >
            {copy.next}
          </button>
        )}
        <button
          type="button"
          onClick={onExit}
          style={{ color: colors.textMuted }}
          className="text-xs underline"
        >
          {copy.exit}
        </button>
      </div>
    </div>
  );
}
