import { describe, expect, it } from "vitest";
import {
  initialSelectionState,
  select,
  clearSelection,
  toggle,
  isIsolated,
} from "@/interaction/selection";

describe("selection", () => {
  it("starts with nothing selected", () => {
    expect(initialSelectionState.selected).toBeNull();
  });

  it("selects an element", () => {
    const state = select("runtime");
    expect(state.selected).toBe("runtime");
  });

  it("clears a selection", () => {
    expect(clearSelection().selected).toBeNull();
  });

  it("toggles selection off when selecting the same element twice", () => {
    const first = toggle(initialSelectionState, "agents");
    const second = toggle(first, "agents");
    expect(first.selected).toBe("agents");
    expect(second.selected).toBeNull();
  });

  it("treats every element as isolated when nothing is selected", () => {
    expect(isIsolated(initialSelectionState, "repository")).toBe(true);
    expect(isIsolated(initialSelectionState, "humanAuthority")).toBe(true);
  });

  it("isolates only the selected element once something is selected", () => {
    const state = select("repository");
    expect(isIsolated(state, "repository")).toBe(true);
    expect(isIsolated(state, "humanAuthority")).toBe(false);
  });
});
