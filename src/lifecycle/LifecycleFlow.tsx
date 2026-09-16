import { colors } from "@/design-system/semanticColors";
import type { LifecycleStepId } from "@/data/lifecycle";
import type { ExplorerMessages } from "@/i18n/types";
import { lifecycleView } from "./lifecycle";
import { LifecycleStep } from "./LifecycleStep";

interface LifecycleFlowProps {
  activeStepId: LifecycleStepId;
  onSelectStep: (id: LifecycleStepId) => void;
  messages: ExplorerMessages;
}

/**
 * A single timeline (dot - connector - dot), not nine dashboard tiles.
 * Clicking a step filters the 3D scene to that stage's relationships.
 * Wraps onto additional rows rather than scrolling horizontally --
 * nine steps don't fit one row at the panel's width, and a horizontal
 * scrollbar hid the later steps entirely instead of just needing a
 * second glance.
 */
export function LifecycleFlow({ activeStepId, onSelectStep, messages }: LifecycleFlowProps) {
  const steps = lifecycleView(activeStepId, messages.lifecycle.steps);
  return (
    <ol className="flex flex-wrap items-center gap-y-3" aria-label={messages.lifecycle.ariaLabel}>
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-center">
          <LifecycleStep step={step} onSelect={onSelectStep} currentLabel={messages.lifecycle.current} />
          {index < steps.length - 1 && (
            <span
              style={{ backgroundColor: colors.border }}
              className="mx-1 h-px w-4 md:w-6"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
