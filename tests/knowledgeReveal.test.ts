import { describe, expect, it } from "vitest";
import { hasArchivedKnowledge } from "@/interaction/knowledgeReveal";

describe("hasArchivedKnowledge", () => {
  it("is false before the Work Item has archived", () => {
    expect(hasArchivedKnowledge("none")).toBe(false);
    expect(hasArchivedKnowledge("opening")).toBe(false);
    expect(hasArchivedKnowledge("active")).toBe(false);
    expect(hasArchivedKnowledge("finished")).toBe(false);
  });

  it("is true once archived, and stays true once closed", () => {
    expect(hasArchivedKnowledge("archived")).toBe(true);
    expect(hasArchivedKnowledge("closed")).toBe(true);
  });
});
