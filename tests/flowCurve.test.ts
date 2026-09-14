import { describe, expect, it } from "vitest";
import {
  buildFlowCurvePoints,
  curveMidpoint,
  pointAlongCurve,
  tangentAlongCurve,
} from "@/interaction/flowCurve";

describe("curveMidpoint", () => {
  it("offsets away from the straight-line midpoint for a non-degenerate segment", () => {
    const straightMid: [number, number, number] = [1, 0, 1];
    const bowed = curveMidpoint([0, 0, 0], [2, 0, 2], 0.28);
    expect(bowed).not.toEqual(straightMid);
  });

  it("returns the midpoint itself for a zero-length segment", () => {
    expect(curveMidpoint([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("bows proportionally more for a longer segment", () => {
    const short = curveMidpoint([0, 0, 0], [1, 0, 0]);
    const long = curveMidpoint([0, 0, 0], [10, 0, 0]);
    const shortOffset = Math.abs(short[2]);
    const longOffset = Math.abs(long[2]);
    expect(longOffset).toBeGreaterThan(shortOffset);
  });

  it("falls back to a different perpendicular axis for a vertical segment", () => {
    const bowed = curveMidpoint([0, 0, 0], [0, 4, 0]);
    expect(Math.abs(bowed[0]) + Math.abs(bowed[2])).toBeGreaterThan(0);
  });
});

describe("buildFlowCurvePoints", () => {
  it("starts and ends at the given endpoints", () => {
    const points = buildFlowCurvePoints([0, 0, 0], [4, 2, 0], 16);
    const [x0, y0, z0] = points[0];
    const [xN, yN, zN] = points[points.length - 1];
    expect([x0, y0, z0]).toEqual([0, 0, 0]);
    expect(Math.abs(xN - 4)).toBeLessThan(1e-6);
    expect(Math.abs(yN - 2)).toBeLessThan(1e-6);
    expect(Math.abs(zN - 0)).toBeLessThan(1e-6);
  });

  it("samples at least the requested number of segments", () => {
    const points = buildFlowCurvePoints([0, 0, 0], [1, 1, 1], 10);
    expect(points.length).toBeGreaterThanOrEqual(10);
  });

  it("bows off the straight line rather than sampling a flat segment", () => {
    const points = buildFlowCurvePoints([0, 0, 0], [4, 0, 4], 16);
    const midpoint = points[Math.floor(points.length / 2)];
    expect(Math.abs(midpoint[0] - midpoint[2])).toBeGreaterThan(0.05);
  });
});

describe("pointAlongCurve", () => {
  const points: [number, number, number][] = [
    [0, 0, 0],
    [1, 0, 0],
    [2, 0, 0],
  ];

  it("returns the first point at t=0 and the last point at t=1", () => {
    expect(pointAlongCurve(points, 0)).toEqual([0, 0, 0]);
    expect(pointAlongCurve(points, 1)).toEqual([2, 0, 0]);
  });

  it("interpolates between samples for an intermediate t", () => {
    expect(pointAlongCurve(points, 0.25)).toEqual([0.5, 0, 0]);
  });

  it("clamps out-of-range t", () => {
    expect(pointAlongCurve(points, -1)).toEqual([0, 0, 0]);
    expect(pointAlongCurve(points, 5)).toEqual([2, 0, 0]);
  });
});

describe("tangentAlongCurve", () => {
  it("points toward increasing t along a straight polyline", () => {
    const points: [number, number, number][] = [
      [0, 0, 0],
      [2, 0, 0],
      [4, 0, 0],
    ];
    const tangent = tangentAlongCurve(points, 0.5);
    expect(tangent[0]).toBeGreaterThan(0);
  });
});
