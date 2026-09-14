import { describe, expect, it } from "vitest";
import { lifecycleSteps } from "@/data/lifecycle";
import { architectureOrder } from "@/data/architecture";
import {
  stageRelevance,
  stageCameraId,
  stageFlowIds,
  stageEnvelope,
  elementFlowRelevance,
  isRelevantToStage,
} from "@/interaction/stageFocus";

describe("stage focus", () => {
  it("defines relevance and a camera target for every lifecycle stage", () => {
    for (const step of lifecycleSteps) {
      expect(stageRelevance[step.id].length).toBeGreaterThan(0);
      expect(stageRelevance[step.id]).toContain(stageCameraId[step.id]);
    }
  });

  it("keeps human authority relevant to close, matching the final governance decision", () => {
    expect(isRelevantToStage("close", "humanAuthority")).toBe(true);
  });

  it("makes the Work Item envelope relevant from start onward, once it exists", () => {
    for (const stage of ["start", "preflight", "checkpoint", "verify", "finish", "archive", "close"] as const) {
      expect(stageRelevance[stage]).toContain("workItem");
    }
  });

  it("keeps the Work Item envelope out of inspect/attach, before it exists", () => {
    expect(stageRelevance.inspect).not.toContain("workItem");
    expect(stageRelevance.attach).not.toContain("workItem");
  });

  it("defines a flow-id list for every lifecycle stage (possibly empty, never undefined)", () => {
    for (const step of lifecycleSteps) {
      expect(stageFlowIds[step.id]).toBeDefined();
    }
  });

  it("mirrors the same per-stage envelope shape used by the Work Item data layer", () => {
    for (const step of lifecycleSteps) {
      expect(stageEnvelope[step.id]).toBeDefined();
    }
  });

  it("defines which flows are relevant for every selectable architecture element", () => {
    for (const id of architectureOrder) {
      expect(elementFlowRelevance[id]).toBeDefined();
      expect(elementFlowRelevance[id].length).toBeGreaterThan(0);
    }
  });
});
