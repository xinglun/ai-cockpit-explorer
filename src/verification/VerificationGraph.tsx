import { colors, verificationStatusColor } from "@/design-system/semanticColors";
import type { VerificationScenario } from "@/data/verificationDemo";
import { EvidenceNode } from "./EvidenceNode";
import { DecisionState } from "./DecisionState";

interface VerificationGraphProps {
  scenario: VerificationScenario;
}

export function VerificationGraph({ scenario }: VerificationGraphProps) {
  return (
    <div style={{ color: colors.textPrimary }} className="flex flex-col gap-3">
      <p style={{ color: colors.textSecondary }} className="text-sm">
        {scenario.narrative}
      </p>
      <div className="flex flex-col gap-1">
        {scenario.evidence.map((item) => (
          <EvidenceNode key={item.id} evidence={item} />
        ))}
      </div>
      <span
        style={{ backgroundColor: verificationStatusColor[scenario.verificationStatus] }}
        className="w-fit rounded px-2 py-1 text-xs font-semibold text-black/80"
      >
        Verification: {scenario.verificationStatus}
      </span>

      {/* Deliberate gap, not a connecting line: verification does not
          automatically produce a human decision. */}
      <div style={{ borderColor: colors.border }} className="border-t border-dashed pt-3">
        <DecisionState decision={scenario.humanDecision} />
        {scenario.verificationStatus === "GREEN" && scenario.humanDecision === "PENDING" && (
          <p style={{ color: colors.stateGreen }} className="mt-1 text-sm font-semibold">
            Verified ≠ Approved.
          </p>
        )}
      </div>
    </div>
  );
}
