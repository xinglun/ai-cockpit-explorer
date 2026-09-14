import { describe, expect, it } from "vitest";
import { ringPhaseAt, isRingLit, RING_PHASE_STEP_MS } from "@/interaction/verifyPhase";

describe("ringPhaseAt", () => {
  it("is idle whenever not verifying, regardless of elapsed time", () => {
    expect(ringPhaseAt(0, false, false)).toBe("idle");
    expect(ringPhaseAt(5000, false, false)).toBe("idle");
  });

  it("steps through phases in order as elapsed time increases", () => {
    expect(ringPhaseAt(0, true, false)).toBe("evidence");
    expect(ringPhaseAt(RING_PHASE_STEP_MS, true, false)).toBe("outerRing");
    expect(ringPhaseAt(RING_PHASE_STEP_MS * 2, true, false)).toBe("verifyRing");
    expect(ringPhaseAt(RING_PHASE_STEP_MS * 3, true, false)).toBe("core");
    expect(ringPhaseAt(RING_PHASE_STEP_MS * 4, true, false)).toBe("settled");
  });

  it("holds at settled rather than running past the end", () => {
    expect(ringPhaseAt(RING_PHASE_STEP_MS * 50, true, false)).toBe("settled");
  });

  it("jumps straight to settled under reduced motion, skipping the sequence", () => {
    expect(ringPhaseAt(0, true, true)).toBe("settled");
  });
});

describe("isRingLit", () => {
  it("lights nothing while idle", () => {
    expect(isRingLit("idle", "outer")).toBe(false);
    expect(isRingLit("idle", "core")).toBe(false);
  });

  it("lights only the evidence layer at the evidence phase", () => {
    expect(isRingLit("evidence", "evidence")).toBe(true);
    expect(isRingLit("evidence", "outer")).toBe(false);
    expect(isRingLit("evidence", "core")).toBe(false);
  });

  it("lights evidence and outer once the outer ring phase is reached", () => {
    expect(isRingLit("outerRing", "evidence")).toBe(true);
    expect(isRingLit("outerRing", "outer")).toBe(true);
    expect(isRingLit("outerRing", "verify")).toBe(false);
  });

  it("lights every layer once settled", () => {
    expect(isRingLit("settled", "evidence")).toBe(true);
    expect(isRingLit("settled", "outer")).toBe(true);
    expect(isRingLit("settled", "verify")).toBe(true);
    expect(isRingLit("settled", "core")).toBe(true);
  });
});
