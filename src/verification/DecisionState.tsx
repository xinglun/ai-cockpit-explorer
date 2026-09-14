import { colors, humanDecisionColor } from "@/design-system/semanticColors";
import type { HumanDecisionStatus } from "@/design-system/semanticColors";

interface DecisionStateProps {
  decision: HumanDecisionStatus;
}

/**
 * Renders the human decision as a visually distinct shape/label from
 * verification evidence — a square badge with a different geometry
 * cue (border, not fill) so GREEN verification is never mistaken for
 * an APPROVED human decision.
 */
export function DecisionState({ decision }: DecisionStateProps) {
  return (
    <div
      style={{ borderColor: humanDecisionColor[decision], color: colors.textPrimary }}
      className="inline-flex items-center gap-2 rounded border-2 px-2 py-1 text-sm font-medium"
    >
      <span aria-hidden>{"▢"}</span>
      Human decision: {decision}
    </div>
  );
}
