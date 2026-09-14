import { colors, verificationStatusColor, humanDecisionColor } from "@/design-system/semanticColors";
import type { VerificationStatus } from "@/design-system/semanticColors";
import type { ExplorerMessages } from "@/i18n/types";

interface StatusLegendProps {
  messages: ExplorerMessages;
}

const verificationOrder: VerificationStatus[] = ["GREEN", "YELLOW", "RED", "UNKNOWN"];

/**
 * GREEN verification and an APPROVED human decision are rendered with
 * different shapes (fill vs. outline) so the legend itself teaches the
 * distinction, not just the color. Status words themselves (GREEN,
 * PENDING, ...) stay untranslated — only the explanation copy changes.
 */
export function StatusLegend({ messages }: StatusLegendProps) {
  const copy = messages.statusLegend;
  return (
    <div className="flex flex-col gap-2 text-xs" style={{ color: colors.textSecondary }}>
      <div className="flex flex-col gap-1">
        {verificationOrder.map((status) => (
          <div key={status} className="flex items-center gap-2">
            <span
              style={{ backgroundColor: verificationStatusColor[status] }}
              className="h-2.5 w-2.5 rounded-sm"
              aria-hidden
            />
            {status} — {copy.explanations[status]}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span
          style={{ borderColor: humanDecisionColor.PENDING }}
          className="h-2.5 w-2.5 rounded-sm border-2"
          aria-hidden
        />
        PENDING / APPROVED — {copy.humanDecisionExplanation}
      </div>
    </div>
  );
}
