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
      <div className="flex items-center gap-3">
        <span
          style={{ backgroundColor: verificationStatusColor[scenario.verificationStatus] }}
          className="rounded px-2 py-1 text-xs font-semibold text-black/80"
        >
          Verification: {scenario.verificationStatus}
        </span>
        <DecisionState decision={scenario.humanDecision} />
      </div>
    </div>
  );
}
