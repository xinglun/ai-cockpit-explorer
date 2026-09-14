import type { WorkItemEnvelopeStage } from "@/data/workItem";

/**
 * Knowledge gains a visible node once the sample Work Item has
 * archived — "archived" and "closed" both count, since closing never
 * un-archives it. Pure so Knowledge.tsx's reveal logic is testable
 * without a WebGL/R3F context.
 */
export function hasArchivedKnowledge(stage: WorkItemEnvelopeStage): boolean {
  return stage === "archived" || stage === "closed";
}
