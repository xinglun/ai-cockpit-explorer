import { useEffect, useState } from "react";
import { colors, verificationStatusColor } from "@/design-system/semanticColors";
import { resolveDuration } from "@/design-system/motion";
import type { VerificationScenario } from "@/data/verificationDemo";
import type { ExplorerMessages } from "@/i18n/types";
import { EvidenceNode } from "./EvidenceNode";
import { DecisionState } from "./DecisionState";

interface VerificationGraphProps {
  scenario: VerificationScenario;
  messages: ExplorerMessages;
}

/** How long the verification badge sits alone before the human-decision beat lands — the "moment", not an instant state switch. */
const DECISION_BEAT_DELAY_MS = 650;

export function VerificationGraph({ scenario, messages }: VerificationGraphProps) {
  const copy = messages.verification;
  const scenarioCopy = copy.scenarios[scenario.id];
  // Keyed by scenario.id at the call site (ExplorerShell), so switching
  // scenarios remounts this component and naturally resets
  // `decisionRevealed` to its initial value instead of an effect
  // needing to reset state synchronously on every scenario change.
  const [decisionRevealed, setDecisionRevealed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDecisionRevealed(true), resolveDuration(DECISION_BEAT_DELAY_MS));
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div style={{ color: colors.textPrimary }} className="flex flex-col gap-3">
      <p style={{ color: colors.textSecondary }} className="text-sm">
        {scenarioCopy.narrative}
      </p>
      <div className="flex flex-col gap-1">
        {scenario.evidence.map((item) => (
          <EvidenceNode key={item.id} evidence={item} label={copy.evidenceLabels[item.id]} />
        ))}
      </div>
      <span
        style={{ backgroundColor: verificationStatusColor[scenario.verificationStatus] }}
        className="w-fit rounded px-2 py-1 text-xs font-semibold text-black/80"
      >
        {copy.verificationLabel}: {scenario.verificationStatus}
      </span>

      {/* Deliberate gap, not a connecting line: verification does not
          automatically produce a human decision. The decision itself
          lands a beat after the verification badge, not instantly —
          this is the one moment the Explorer stages deliberately. */}
      <div
        style={{ borderColor: colors.border }}
        className="border-t border-dashed pt-3 transition-opacity duration-300"
        aria-hidden={!decisionRevealed}
      >
        {decisionRevealed && (
          <>
            <DecisionState decision={scenario.humanDecision} label={copy.humanDecisionLabel} />
            {scenario.verificationStatus === "GREEN" && scenario.humanDecision === "PENDING" && (
              <p style={{ color: colors.stateGreen }} className="mt-1 text-sm font-semibold">
                {copy.verifiedNotApproved}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
