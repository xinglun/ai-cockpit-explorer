"use client";

import { tourSteps, nextStepIndex, previousStepIndex, isLastStep } from "@/interaction/tour";
import { colors } from "@/design-system/semanticColors";

interface GuidedTourProps {
  stepIndex: number;
  active: boolean;
  onStart: () => void;
  onStepChange: (index: number) => void;
  onExit: () => void;
}

/**
 * A 7-scene narrative overlay, not a plain camera pan. The climax
 * (step 6: "Verified ≠ Approved") gets deliberate visual weight —
 * larger type, no competing UI.
 */
export function GuidedTour({ stepIndex, active, onStart, onStepChange, onExit }: GuidedTourProps) {
  if (!active) {
    return (
      <button
        type="button"
        onClick={onStart}
        style={{ backgroundColor: colors.informationFlow, color: colors.background }}
        className="w-fit rounded px-4 py-2 text-sm font-semibold"
      >
        Understand AI Cockpit in 30 seconds
      </button>
    );
  }

  const step = tourSteps[stepIndex];
  const isClimax = step.status === "verified-not-approved";

  return (
    <div
      style={{ borderColor: colors.border, color: colors.textPrimary, backgroundColor: colors.surface }}
      className="flex w-full max-w-xl flex-col gap-3 rounded border p-4 shadow-lg"
      role="region"
      aria-label="Guided architecture tour"
    >
      <p style={{ color: colors.textSecondary }} className="text-xs">
        Scene {stepIndex + 1} of {tourSteps.length}
      </p>
      <h3 className={isClimax ? "text-xl font-bold" : "text-base font-semibold"}>{step.title}</h3>
      <p className={isClimax ? "text-lg font-semibold" : "text-sm"} style={isClimax ? { color: colors.stateGreen } : undefined}>
        {step.narration}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onStepChange(previousStepIndex(stepIndex))}
          disabled={stepIndex === 0}
          className="rounded border px-2 py-1 text-xs disabled:opacity-40"
          style={{ borderColor: colors.border }}
        >
          Back
        </button>
        {isLastStep(stepIndex) ? (
          <button
            type="button"
            onClick={onExit}
            className="rounded border px-2 py-1 text-xs"
            style={{ borderColor: colors.border }}
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onStepChange(nextStepIndex(stepIndex))}
            className="rounded border px-2 py-1 text-xs"
            style={{ borderColor: colors.border }}
          >
            Next
          </button>
        )}
        <button
          type="button"
          onClick={onExit}
          style={{ color: colors.textMuted }}
          className="text-xs underline"
        >
          Exit tour
        </button>
      </div>
    </div>
  );
}
