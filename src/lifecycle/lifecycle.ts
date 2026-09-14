import { lifecycleSteps, type LifecycleStepId } from "@/data/lifecycle";

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
 * canonical step order itself lives in src/data/lifecycle.ts.
 */
export function lifecycleView(activeStepId: LifecycleStepId): LifecycleStepView[] {
  const activeIndex = lifecycleSteps.findIndex((step) => step.id === activeStepId);
  return lifecycleSteps.map((step, index) => ({
    id: step.id,
    label: step.label,
    summary: step.summary,
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
