import { describe, expect, it } from "vitest";
import { tourSteps, nextStepIndex, previousStepIndex, isLastStep } from "@/interaction/tour";

describe("guided tour", () => {
  it("has exactly the 8 scenes of the narrative", () => {
    expect(tourSteps).toHaveLength(8);
  });

  it("reaches the climax beat where verification is GREEN and the decision is explicitly not automatic", () => {
    const climax = tourSteps.find((step) => step.status === "verified-not-approved");
    expect(climax).toBeDefined();
  });

  it("shows the HCI/Human Decision beat as PENDING after the climax, still before the final scene", () => {
    const climaxIndex = tourSteps.findIndex((step) => step.status === "verified-not-approved");
    const pendingIndex = tourSteps.findIndex((step) => step.status === "pending");
    expect(pendingIndex).toBe(climaxIndex + 1);
    expect(pendingIndex).toBeLessThan(tourSteps.length - 1);
    expect(tourSteps[pendingIndex].focus).toContain("humanControlInterface");
  });

  it("ends on Archive -> Trace -> Knowledge, not on Human Authority alone", () => {
    const last = tourSteps[tourSteps.length - 1];
    expect(last.cameraId).toBe("knowledge");
    expect(last.focus).toContain("knowledge");
    expect(last.envelopeStage).toBe("archived");
  });

  it("starts with agents stopped at the entry gate, not already inside the repository", () => {
    const first = tourSteps[0];
    expect(first.focus).toEqual(["agents", "entrySurface"]);
    expect(first.envelopeStage).toBe("none");
  });

  it("introduces the Work Item envelope as its own early scene, before Contract is elaborated", () => {
    const workItemSceneIndex = tourSteps.findIndex((step) => step.focus.includes("workItem"));
    expect(workItemSceneIndex).toBe(1);
    expect(tourSteps[workItemSceneIndex].envelopeStage).not.toBe("none");
  });

  it("never marks a flow active on the dashed Outcome -> Human Authority connector's scene without also keeping the decision explicitly pending", () => {
    for (const step of tourSteps) {
      if (step.activeFlowIds.includes("outcome") && step.focus.includes("humanControlInterface")) {
        expect(step.status).not.toBe("verified-not-approved");
      }
    }
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
