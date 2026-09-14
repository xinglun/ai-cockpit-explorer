import { describe, expect, it } from "vitest";
import { envelopeStageForLifecycleStep, traceEvents, sampleWorkItemId } from "@/data/workItem";
import { lifecycleSteps } from "@/data/lifecycle";

describe("Work Item envelope stages", () => {
  it("does not exist before start", () => {
    expect(envelopeStageForLifecycleStep.inspect).toBe("none");
    expect(envelopeStageForLifecycleStep.attach).toBe("none");
  });

  it("opens at start and stays open through preflight", () => {
    expect(envelopeStageForLifecycleStep.start).toBe("opening");
    expect(envelopeStageForLifecycleStep.preflight).toBe("opening");
  });

  it("is active during checkpoint/verify and finished after finish", () => {
    expect(envelopeStageForLifecycleStep.checkpoint).toBe("active");
    expect(envelopeStageForLifecycleStep.verify).toBe("active");
    expect(envelopeStageForLifecycleStep.finish).toBe("finished");
  });

  it("collapses at archive and stays collapsed through close", () => {
    expect(envelopeStageForLifecycleStep.archive).toBe("archived");
    expect(envelopeStageForLifecycleStep.close).toBe("closed");
  });

  it("defines a stage for every lifecycle step, in the same order", () => {
    for (const step of lifecycleSteps) {
      expect(envelopeStageForLifecycleStep[step.id]).toBeDefined();
    }
  });
});

describe("Traceability trail", () => {
  it("has a stable sample Work Item id", () => {
    expect(sampleWorkItemId).toMatch(/^WI-/);
  });

  it("orders the primary events before the archive event", () => {
    const archiveIndex = traceEvents.findIndex((event) => event.id === "archive");
    const humanDecisionIndex = traceEvents.findIndex((event) => event.id === "humanDecision");
    expect(humanDecisionIndex).toBeLessThan(archiveIndex);
  });

  it("keeps the resource-finalize/finalize/close cleanup steps marked advanced so they stay collapsed by default", () => {
    const advancedIds = traceEvents.filter((event) => event.advanced).map((event) => event.id);
    expect(advancedIds).toEqual(["finalizePlan", "finalize", "finalizeVerify", "close"]);
  });

  it("keeps the primary 30-second flow's events (intent through archive) out of the advanced set", () => {
    const primaryIds = traceEvents.filter((event) => !event.advanced).map((event) => event.id);
    expect(primaryIds).toEqual([
      "intent",
      "contract",
      "snapshot",
      "checkpoint",
      "verificationReceipt",
      "outcome",
      "humanDecision",
      "archive",
    ]);
  });
});
