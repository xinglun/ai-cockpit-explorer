import type { ArchitectureElementId } from "@/data/architecture";

export interface ArchitectureNodeProps {
  isDimmed: boolean;
  isSelected: boolean;
  onSelect: (id: ArchitectureElementId) => void;
  /** Localized label rendered as the persistent 3D text (see src/i18n/*). */
  label: string;
}

/**
 * A named connector group in the Governance Loop. "authority" is
 * folded into contract (down) + outcome (up) rather than a fifth
 * distinct id, and "trace" has no line of its own — Traceability is a
 * UI timeline, not a spatial flow — matching the simplification already
 * made for the Governance Loop's Flows in a prior iteration.
 */
export type FlowId = "execution" | "contract" | "evidence" | "outcome" | "knowledge";
