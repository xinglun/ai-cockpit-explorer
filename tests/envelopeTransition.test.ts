import { describe, expect, it } from "vitest";
import { lerp, lerpVec3, nextEnvelopeStep, vec3Reached } from "@/interaction/envelopeTransition";

describe("lerp / lerpVec3", () => {
  it("interpolates linearly and clamps t to [0, 1]", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
    expect(lerp(0, 10, -1)).toBe(0);
    expect(lerp(0, 10, 2)).toBe(10);
  });

  it("interpolates each component independently", () => {
    expect(lerpVec3([0, 0, 0], [10, 20, -10], 0.5)).toEqual([5, 10, -5]);
  });
});

describe("vec3Reached", () => {
  it("is true once every component is within tolerance", () => {
    expect(vec3Reached([1, 1, 1], [1.005, 0.996, 1], 0.01)).toBe(true);
  });

  it("is false if any component is still outside tolerance", () => {
    expect(vec3Reached([1, 1, 1], [1.5, 1, 1], 0.01)).toBe(false);
  });
});

describe("nextEnvelopeStep", () => {
  it("jumps straight to target under prefers-reduced-motion, no morph", () => {
    const next = nextEnvelopeStep([0, 0, 0], [4, 4, 4], 16, true);
    expect(next).toEqual([4, 4, 4]);
  });

  it("moves partway toward target over a single short frame when motion is not reduced", () => {
    const next = nextEnvelopeStep([0, 0, 0], [4, 4, 4], 16, false);
    expect(next[0]).toBeGreaterThan(0);
    expect(next[0]).toBeLessThan(4);
  });

  it("returns the target once already reached, without overshooting", () => {
    const next = nextEnvelopeStep([4, 4, 4], [4, 4, 4], 16, false);
    expect(next).toEqual([4, 4, 4]);
  });

  it("converges to the target over repeated frames", () => {
    let current: readonly [number, number, number] = [0, 0, 0];
    const target: readonly [number, number, number] = [1, 2, 3];
    for (let i = 0; i < 400; i += 1) {
      current = nextEnvelopeStep(current, target, 16, false);
    }
    expect(vec3Reached(current, target)).toBe(true);
  });
});
