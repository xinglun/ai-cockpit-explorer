import type { LifecycleStepId } from "@/data/lifecycle";
import { lifecycleView } from "./lifecycle";
import { LifecycleStep } from "./LifecycleStep";

interface LifecycleFlowProps {
  activeStepId: LifecycleStepId;
}

export function LifecycleFlow({ activeStepId }: LifecycleFlowProps) {
  const steps = lifecycleView(activeStepId);
  return (
    <ol className="flex gap-4 overflow-x-auto pb-1" aria-label="Work Item lifecycle">
      {steps.map((step) => (
        <LifecycleStep key={step.id} step={step} />
      ))}
    </ol>
  );
}
