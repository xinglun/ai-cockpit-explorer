import { architectureElements, type ArchitectureElementId } from "@/data/architecture";

export interface TourStep {
  id: ArchitectureElementId;
  title: string;
  narration: string;
}

/**
 * Guided tour sequence. Designed so a first-time visitor can understand
 * the core architecture in ~30 seconds without reading the README:
 * within 5s the repository/runtime relationship, within 15s the
 * governance surfaces, within 30s the verification/authority boundary.
 */
export const tourSteps: TourStep[] = [
  {
    id: "repository",
    title: architectureElements.repository.label,
    narration: architectureElements.repository.summary,
  },
  {
    id: "repositoryProtocol",
    title: architectureElements.repositoryProtocol.label,
    narration: architectureElements.repositoryProtocol.summary,
  },
  {
    id: "runtime",
    title: architectureElements.runtime.label,
    narration: architectureElements.runtime.summary,
  },
  {
    id: "agents",
    title: architectureElements.agents.label,
    narration: architectureElements.agents.summary,
  },
  {
    id: "humanAuthority",
    title: architectureElements.humanAuthority.label,
    narration:
      "Verification is not approval. Human Authority is the explicit, separate boundary that decides what is permitted.",
  },
];

export function nextStepIndex(current: number): number {
  return Math.min(current + 1, tourSteps.length - 1);
}

export function previousStepIndex(current: number): number {
  return Math.max(current - 1, 0);
}

export function isLastStep(current: number): boolean {
  return current >= tourSteps.length - 1;
}
