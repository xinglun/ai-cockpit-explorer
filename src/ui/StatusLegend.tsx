import { colors, verificationStatusColor, humanDecisionColor } from "@/design-system/semanticColors";

const verificationEntries: Array<{ label: string; color: string }> = [
  { label: "GREEN — verification passed", color: verificationStatusColor.GREEN },
  { label: "YELLOW — partial evidence", color: verificationStatusColor.YELLOW },
  { label: "RED — verification failed (fail-closed)", color: verificationStatusColor.RED },
  { label: "UNKNOWN — not evaluated (never approval)", color: verificationStatusColor.UNKNOWN },
];

/**
 * GREEN verification and an APPROVED human decision are rendered with
 * different shapes (fill vs. outline) so the legend itself teaches the
 * distinction, not just the color.
 */
export function StatusLegend() {
  return (
    <div className="flex flex-col gap-2 text-xs" style={{ color: colors.textSecondary }}>
      <div className="flex flex-col gap-1">
        {verificationEntries.map((entry) => (
          <div key={entry.label} className="flex items-center gap-2">
            <span
              style={{ backgroundColor: entry.color }}
              className="h-2.5 w-2.5 rounded-sm"
              aria-hidden
            />
            {entry.label}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span
          style={{ borderColor: humanDecisionColor.PENDING }}
          className="h-2.5 w-2.5 rounded-sm border-2"
          aria-hidden
        />
        PENDING / APPROVED — human decision, separate from verification
      </div>
    </div>
  );
}
