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

/**
 * Generalized isolation check against a set of relevant ids (used by
 * Work Item stage focus and the guided tour) instead of a single
 * selection. A null/empty set means nothing is dimmed.
 */
export function isAmong(
  relevant: readonly ArchitectureElementId[] | null,
  id: ArchitectureElementId,
): boolean {
  return relevant === null || relevant.length === 0 || relevant.includes(id);
}
