import { colors } from "@/design-system/semanticColors";
import type { LifecycleStepView } from "./lifecycle";

const stateColor: Record<LifecycleStepView["state"], string> = {
  completed: colors.stateGreen,
  active: colors.informationFlow,
  upcoming: colors.textMuted,
};

interface LifecycleStepProps {
  step: LifecycleStepView;
}

export function LifecycleStep({ step }: LifecycleStepProps) {
  return (
    <li
      style={{ borderColor: colors.border }}
      className="flex min-w-[7rem] flex-col gap-1 border-l-2 pl-3"
      aria-current={step.state === "active" ? "step" : undefined}
    >
      <span
        style={{ backgroundColor: stateColor[step.state] }}
        className="h-2 w-2 rounded-full"
        aria-hidden
      />
      <span style={{ color: colors.textPrimary }} className="text-sm font-medium">
        {step.label}
      </span>
      <span style={{ color: colors.textSecondary }} className="text-xs">
        {step.summary}
      </span>
    </li>
  );
}
