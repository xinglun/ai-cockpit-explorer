import { describe, expect, it } from "vitest";
import { lifecycleSteps } from "@/data/lifecycle";
import { stageRelevance, stageCameraId, isRelevantToStage } from "@/interaction/stageFocus";

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
});
