"use client";

import { layout } from "@/design-system/geometry";
import { colors } from "@/design-system/semanticColors";
import { FlowLine } from "./FlowLine";
import type { FlowId } from "./types";

interface FlowsProps {
  /**
   * null = no filtering context (Overview, nothing selected): every
   * flow sits at rest opacity. A non-null array — even an empty one —
   * means we ARE in a filtered context (Work Item stage, Verification
   * scenario, guided tour, or a single Overview selection): only the
   * listed flows brighten and pulse, the rest dim. This replaces the
   * previous all-or-nothing single `dimmed` flag, so selecting one
   * object no longer blanks every relationship at once.
   */
  activeFlowIds: readonly FlowId[] | null;
}

const REST_OPACITY = 0.85;
const INACTIVE_OPACITY = 0.1;
const ACTIVE_OPACITY = 0.95;

/**
 * Pure and exported so the per-flow activation rule is testable
 * without a WebGL/R3F context — mirrors how interaction/cameraTargets.ts
 * exports buildSetLookAtArgs for the same reason.
 */
export function opacityFor(id: FlowId, activeFlowIds: readonly FlowId[] | null): number {
  if (activeFlowIds === null) return REST_OPACITY;
  return activeFlowIds.includes(id) ? ACTIVE_OPACITY : INACTIVE_OPACITY;
}

export function isActive(id: FlowId, activeFlowIds: readonly FlowId[] | null): boolean {
  return activeFlowIds !== null && activeFlowIds.includes(id);
}

/**
 * The Governance Loop's connectors. Architecture is objects +
 * relationships + direction + boundary — this component is the
 * relationships and direction. Solid lines are automatic governance
 * data flows; the Outcome -> Human Authority line is dashed because
 * arriving at Human Authority never automatically produces a decision.
 */
export function Flows({ activeFlowIds }: FlowsProps) {
  const execution = opacityFor("execution", activeFlowIds);
  const contract = opacityFor("contract", activeFlowIds);
  const evidence = opacityFor("evidence", activeFlowIds);
  const outcome = opacityFor("outcome", activeFlowIds);
  const knowledge = opacityFor("knowledge", activeFlowIds);
  const executionActive = isActive("execution", activeFlowIds);
  const contractActive = isActive("contract", activeFlowIds);
  const evidenceActive = isActive("evidence", activeFlowIds);
  const outcomeActive = isActive("outcome", activeFlowIds);
  const knowledgeActive = isActive("knowledge", activeFlowIds);

  return (
    <>
      {/* ExecutionFlow: Agents -> Entry gate -> Runtime */}
      <FlowLine from={layout.agents[0].position} to={layout.entrySurface.position} color={colors.textSecondary} opacity={execution} />
      <FlowLine from={layout.agents[1].position} to={layout.entrySurface.position} color={colors.textSecondary} opacity={execution} />
      <FlowLine
        from={layout.entrySurface.position}
        to={layout.runtime.position}
        color={colors.textSecondary}
        opacity={execution}
        pulse={executionActive}
      />

      {/* ContractFlow: Human Authority -> Contract -> Runtime */}
      <FlowLine
        from={layout.humanAuthority.position}
        to={layout.contract.position}
        color={colors.humanAuthority}
        opacity={contract}
        pulse={contractActive}
      />
      <FlowLine
        from={layout.contract.position}
        to={layout.runtime.position}
        color={colors.humanAuthority}
        opacity={contract}
        pulse={contractActive}
      />

      {/* EvidenceFlow: Repository -> Evidence -> Runtime */}
      <FlowLine
        from={layout.repository.position}
        to={layout.evidence.position}
        color={colors.stateGreen}
        opacity={evidence}
        pulse={evidenceActive}
      />
      <FlowLine
        from={layout.evidence.position}
        to={layout.runtime.position}
        color={colors.stateGreen}
        opacity={evidence}
        pulse={evidenceActive}
      />

      {/* OutcomeFlow: Runtime -> Outcome (dashed leg to Human Authority never pulses: not an automatic decision) */}
      <FlowLine
        from={layout.runtime.position}
        to={layout.outcome.position}
        color={colors.informationFlow}
        opacity={outcome}
        pulse={outcomeActive}
      />
      <FlowLine
        from={layout.outcome.position}
        to={layout.humanAuthority.position}
        color={colors.informationFlow}
        dashed
        opacity={outcome}
      />

      {/* KnowledgeFlow: Repository Protocol -> Knowledge (a derived projection, not a new authority source) */}
      <FlowLine
        from={layout.repositoryProtocol.position}
        to={layout.knowledge.position}
        color={colors.textMuted}
        opacity={knowledge}
        pulse={knowledgeActive}
      />
    </>
  );
}
