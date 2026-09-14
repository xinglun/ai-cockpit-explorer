import { describe, expect, it } from "vitest";
import { tourSteps, nextStepIndex, previousStepIndex, isLastStep } from "@/interaction/tour";

describe("guided tour", () => {
  it("has exactly the 7 scenes of the narrative", () => {
    expect(tourSteps).toHaveLength(7);
  });

  it("reaches the climax beat where verification is GREEN and the decision is explicitly not automatic", () => {
    const climax = tourSteps.find((step) => step.status === "verified-not-approved");
    expect(climax).toBeDefined();
  });

  it("ends on Human Authority so the boundary is the final beat", () => {
    const last = tourSteps[tourSteps.length - 1];
    expect(last.cameraId).toBe("humanAuthority");
    expect(last.focus).toContain("humanAuthority");
  });

  it("starts with agents stopped at the entry gate, not already inside the repository", () => {
    const first = tourSteps[0];
    expect(first.focus).toEqual(["agents", "entrySurface"]);
  });

  it("does not advance past the last step", () => {
    const lastIndex = tourSteps.length - 1;
    expect(nextStepIndex(lastIndex)).toBe(lastIndex);
    expect(isLastStep(lastIndex)).toBe(true);
  });

  it("does not go before the first step", () => {
    expect(previousStepIndex(0)).toBe(0);
  });
});
