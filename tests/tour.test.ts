import { describe, expect, it } from "vitest";
import { tourSteps, nextStepIndex, previousStepIndex, isLastStep } from "@/interaction/tour";

describe("guided tour", () => {
  it("has at least one step", () => {
    expect(tourSteps.length).toBeGreaterThan(0);
  });

  it("ends on human authority so the boundary is the final beat", () => {
    expect(tourSteps[tourSteps.length - 1].id).toBe("humanAuthority");
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
