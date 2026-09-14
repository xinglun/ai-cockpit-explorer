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
 * A single horizontal timeline (dot - connector - dot), not nine
 * dashboard tiles. Clicking a step filters the 3D scene to that
 * stage's relationships.
 */
export function LifecycleFlow({ activeStepId, onSelectStep, messages }: LifecycleFlowProps) {
  const steps = lifecycleView(activeStepId, messages.lifecycle.steps);
  return (
    <ol className="flex items-center gap-0 overflow-x-auto" aria-label={messages.lifecycle.ariaLabel}>
      {steps.map((step, index) => (
        <li key={step.id} className="flex items-center">
          <LifecycleStep step={step} onSelect={onSelectStep} currentLabel={messages.lifecycle.current} />
          {index < steps.length - 1 && (
            <span
              style={{ backgroundColor: colors.border }}
              className="mx-1 h-px w-6 md:w-10"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
