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

export function GuidedTour({ stepIndex, active, onStart, onStepChange, onExit }: GuidedTourProps) {
  if (!active) {
    return (
      <button
        type="button"
        onClick={onStart}
        style={{ backgroundColor: colors.informationFlow, color: colors.background }}
        className="w-fit rounded px-3 py-1.5 text-sm font-medium"
      >
        Start guided tour
      </button>
    );
  }

  const step = tourSteps[stepIndex];

  return (
    <div
      style={{ borderColor: colors.border, color: colors.textPrimary }}
      className="flex flex-col gap-2 rounded border p-3"
      role="region"
      aria-label="Guided architecture tour"
    >
      <p style={{ color: colors.textSecondary }} className="text-xs">
        Step {stepIndex + 1} of {tourSteps.length}
      </p>
      <h3 className="text-base font-semibold">{step.title}</h3>
      <p className="text-sm">{step.narration}</p>
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
