import { describe, expect, it } from "vitest";
import { architectureOrder, architectureElements } from "@/data/architecture";
import { lifecycleSteps } from "@/data/lifecycle";
import { verificationScenarios } from "@/data/verificationDemo";
import { modelMetadata } from "@/data/provenance";

describe("architecture data", () => {
  it("every architecture element carries upstream provenance", () => {
    for (const id of architectureOrder) {
      expect(architectureElements[id].provenance.upstreamRepository).toBe(
        modelMetadata.upstreamRepository,
      );
      expect(architectureElements[id].provenance.upstreamRevision).toMatch(/^[0-9a-f]{40}$/);
    }
  });
});

describe("lifecycle data", () => {
  it("follows the canonical Work Item lifecycle order", () => {
    expect(lifecycleSteps.map((step) => step.id)).toEqual([
      "inspect",
      "attach",
      "start",
      "preflight",
      "checkpoint",
      "verify",
      "finish",
      "archive",
      "close",
    ]);
  });
});

describe("verification demo data", () => {
  it("never renders UNKNOWN as an approved human decision", () => {
    for (const scenario of Object.values(verificationScenarios)) {
      const hasUnknownEvidence = scenario.evidence.some((item) => item.status === "UNKNOWN");
      if (hasUnknownEvidence) {
        expect(scenario.humanDecision).not.toBe("APPROVED");
      }
    }
  });

  it("keeps GREEN verification distinct from an APPROVED human decision", () => {
    const greenScenario = verificationScenarios["green-pending"];
    expect(greenScenario.verificationStatus).toBe("GREEN");
    expect(greenScenario.humanDecision).not.toBe("APPROVED");
  });

  it("fails closed on RED verification", () => {
    const redScenario = verificationScenarios["red-fail-closed"];
    expect(redScenario.verificationStatus).toBe("RED");
  });
});
