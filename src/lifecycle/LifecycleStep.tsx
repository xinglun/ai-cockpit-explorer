import { colors } from "@/design-system/semanticColors";
import type { LifecycleStepView } from "./lifecycle";

const stateColor: Record<LifecycleStepView["state"], string> = {
  completed: colors.stateGreen,
  active: colors.informationFlow,
  upcoming: colors.textMuted,
};

interface LifecycleStepProps {
  step: LifecycleStepView;
  onSelect: (id: LifecycleStepView["id"]) => void;
  currentLabel: string;
}

/** One dot in the horizontal timeline: `● inspect ─ ● attach ─ ...`. */
export function LifecycleStep({ step, onSelect, currentLabel }: LifecycleStepProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(step.id)}
      aria-current={step.state === "active" ? "step" : undefined}
      className="flex flex-col items-center gap-1"
    >
      <span
        style={{ backgroundColor: stateColor[step.state] }}
        className="h-2.5 w-2.5 rounded-full"
        aria-hidden
      />
      <span style={{ color: step.state === "active" ? colors.textPrimary : colors.textSecondary }} className="text-xs">
        {step.label}
      </span>
      {step.state === "active" && (
        <span style={{ color: colors.informationFlow }} className="text-[0.65rem] font-semibold uppercase tracking-wide">
          {currentLabel}
        </span>
      )}
    </button>
  );
}
