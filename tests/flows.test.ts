import { describe, expect, it } from "vitest";
import { opacityFor, isActive } from "@/architecture/Flows";

describe("per-flow activation (active nodes and active flows light up together)", () => {
  it("shows every flow at rest opacity when there is no filtering context", () => {
    expect(opacityFor("execution", null)).toBeGreaterThan(0.5);
    expect(opacityFor("knowledge", null)).toBeGreaterThan(0.5);
    expect(isActive("execution", null)).toBe(false);
  });

  it("brightens and activates only the listed flow(s) once a filtering context exists", () => {
    expect(isActive("evidence", ["evidence"])).toBe(true);
    expect(isActive("outcome", ["evidence"])).toBe(false);
    expect(opacityFor("evidence", ["evidence"])).toBeGreaterThan(opacityFor("outcome", ["evidence"]));
  });

  it("dims every flow — not just the unselected ones — when the filtering context has no relevant flow at all (e.g. inspect/attach)", () => {
    expect(opacityFor("execution", [])).toBeLessThan(opacityFor("execution", null));
    expect(isActive("execution", [])).toBe(false);
  });

  it("never marks two unrelated flows active from a single-flow context", () => {
    expect(isActive("contract", ["knowledge"])).toBe(false);
  });
});
