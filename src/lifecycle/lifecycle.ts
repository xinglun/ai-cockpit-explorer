import { lifecycleSteps, type LifecycleStepId } from "@/data/lifecycle";
import type { LifecycleStepCopy } from "@/i18n/types";

export type LifecycleStepState = "completed" | "active" | "upcoming";

export interface LifecycleStepView {
  id: LifecycleStepId;
  label: string;
  summary: string;
  state: LifecycleStepState;
}

/**
 * Builds a view model for the lifecycle flow: everything before the
 * active step reads as completed, the active step is highlighted, and
 * everything after is upcoming. This is presentation state only — the
 * canonical step order lives in src/data/lifecycle.ts, and the
 * localized label/summary copy is supplied by the caller (from
 * src/i18n/*) rather than baked into the data layer.
 */
export function lifecycleView(
  activeStepId: LifecycleStepId,
  stepsCopy: Record<LifecycleStepId, LifecycleStepCopy>,
): LifecycleStepView[] {
  const activeIndex = lifecycleSteps.findIndex((step) => step.id === activeStepId);
  return lifecycleSteps.map((step, index) => ({
    id: step.id,
    label: stepsCopy[step.id].label,
    summary: stepsCopy[step.id].summary,
    state: index < activeIndex ? "completed" : index === activeIndex ? "active" : "upcoming",
  }));
}

export function nextLifecycleStepId(current: LifecycleStepId): LifecycleStepId {
  const index = lifecycleSteps.findIndex((step) => step.id === current);
  const next = lifecycleSteps[Math.min(index + 1, lifecycleSteps.length - 1)];
  return next.id;
}

export function previousLifecycleStepId(current: LifecycleStepId): LifecycleStepId {
  const index = lifecycleSteps.findIndex((step) => step.id === current);
  const previous = lifecycleSteps[Math.max(index - 1, 0)];
  return previous.id;
}
