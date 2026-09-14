import { describe, expect, it } from "vitest";
import { cornerBracketSegments } from "@/interaction/boundaryField";

describe("cornerBracketSegments", () => {
  it("produces 3 segments per corner across all 8 corners", () => {
    const segments = cornerBracketSegments([0, 0, 0], [2, 2, 2]);
    expect(segments).toHaveLength(24);
  });

  it("every segment starts exactly at a corner of the box", () => {
    const center: [number, number, number] = [1, 2, 3];
    const size: [number, number, number] = [4, 4, 4];
    const half = size.map((value) => value / 2);
    const segments = cornerBracketSegments(center, size);
    for (const [start] of segments) {
      for (let axis = 0; axis < 3; axis += 1) {
        const distance = Math.abs(start[axis] - center[axis]);
        expect(distance).toBeCloseTo(half[axis]);
      }
    }
  });

  it("each segment reaches inward, never past the box center", () => {
    const center: [number, number, number] = [0, 0, 0];
    const size: [number, number, number] = [2, 2, 2];
    const segments = cornerBracketSegments(center, size);
    for (const [start, end] of segments) {
      const startDistance = Math.hypot(...start);
      const endDistance = Math.hypot(...end);
      expect(endDistance).toBeLessThan(startDistance);
    }
  });

  it("caps the edge length so a very large box does not produce comically long brackets", () => {
    const segments = cornerBracketSegments([0, 0, 0], [100, 100, 100], 0.22, 0.6);
    const [start, end] = segments[0];
    const length = Math.hypot(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
    expect(length).toBeLessThanOrEqual(0.6 + 1e-6);
  });

  it("scales edge length with a smaller box instead of always using the cap", () => {
    const segments = cornerBracketSegments([0, 0, 0], [1, 1, 1], 0.22, 0.6);
    const [start, end] = segments[0];
    const length = Math.hypot(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
    expect(length).toBeLessThan(0.3);
  });
});
