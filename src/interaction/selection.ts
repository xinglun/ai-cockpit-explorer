import type { ArchitectureElementId } from "@/data/architecture";

export type SelectionId = ArchitectureElementId | null;

export interface SelectionState {
  selected: SelectionId;
}

export const initialSelectionState: SelectionState = { selected: null };

export function select(id: ArchitectureElementId): SelectionState {
  return { selected: id };
}

export function clearSelection(): SelectionState {
  return { selected: null };
}

export function toggle(state: SelectionState, id: ArchitectureElementId): SelectionState {
  return state.selected === id ? clearSelection() : select(id);
}

export function isIsolated(state: SelectionState, id: ArchitectureElementId): boolean {
  return state.selected === null || state.selected === id;
}
