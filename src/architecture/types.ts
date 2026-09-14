import type { ArchitectureElementId } from "@/data/architecture";

export interface ArchitectureNodeProps {
  isDimmed: boolean;
  isSelected: boolean;
  onSelect: (id: ArchitectureElementId) => void;
  /** Localized label rendered as the persistent 3D text (see src/i18n/*). */
  label: string;
}
