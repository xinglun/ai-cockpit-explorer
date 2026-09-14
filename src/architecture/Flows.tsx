"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { FlowLine } from "./FlowLine";

interface FlowsProps {
  dimmed: boolean;
}

/**
 * The Governance Loop's connectors. Architecture is objects +
 * relationships + direction + boundary — this component is the
 * relationships and direction. Solid lines are automatic governance
 * data flows; the Outcome -> Human Authority line is dashed because
 * arriving at Human Authority never automatically produces a decision.
 */
export function Flows({ dimmed }: FlowsProps) {
  const opacity = dimmed ? 0.12 : 0.85;

  return (
    <>
      {/* ExecutionFlow: Agents -> Entry gate -> Runtime */}
      <FlowLine from={layout.agents[0].position} to={layout.entrySurface.position} color={colors.textSecondary} opacity={opacity} />
      <FlowLine from={layout.agents[1].position} to={layout.entrySurface.position} color={colors.textSecondary} opacity={opacity} />
      <FlowLine from={layout.entrySurface.position} to={layout.runtime.position} color={colors.textSecondary} opacity={opacity} />

      {/* ContractFlow: Human Authority -> Contract -> Runtime */}
      <FlowLine from={layout.humanAuthority.position} to={layout.contract.position} color={colors.humanAuthority} opacity={opacity} />
      <FlowLine from={layout.contract.position} to={layout.runtime.position} color={colors.humanAuthority} opacity={opacity} />

      {/* EvidenceFlow: Repository -> Evidence -> Runtime */}
      <FlowLine from={layout.repository.position} to={layout.evidence.position} color={colors.stateGreen} opacity={opacity} />
      <FlowLine from={layout.evidence.position} to={layout.runtime.position} color={colors.stateGreen} opacity={opacity} />

      {/* OutcomeFlow / AuthorityFlow: Runtime -> Outcome -> Human Authority (dashed: not an automatic decision) */}
      <FlowLine from={layout.runtime.position} to={layout.outcome.position} color={colors.informationFlow} opacity={opacity} />
      <FlowLine
        from={layout.outcome.position}
        to={layout.humanAuthority.position}
        color={colors.informationFlow}
        dashed
        opacity={opacity}
      />
    </>
  );
}
