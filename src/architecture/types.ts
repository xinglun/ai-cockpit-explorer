import type { ArchitectureElementId } from "@/data/architecture";

export interface ArchitectureNodeProps {
  isDimmed: boolean;
  isSelected: boolean;
  onSelect: (id: ArchitectureElementId) => void;
}
