import { CatmullRomCurve3, Vector3 } from "three";

export type Vec3 = readonly [number, number, number];

/**
 * A perpendicular offset for the curve's single control point, sized
 * relative to the segment's own length so short and long flows bow by
 * a proportional (not identical) amount. Falls back to a different
 * perpendicular axis if the segment happens to be vertical (parallel
 * to world-up), where the primary cross product would degenerate to
 * zero.
 */
export function curveMidpoint(from: Vec3, to: Vec3, bow = 0.28): Vec3 {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const mid = start.clone().lerp(end, 0.5);
  const direction = end.clone().sub(start);
  const length = direction.length();
  if (length < 1e-6) return [mid.x, mid.y, mid.z];

  const up = new Vector3(0, 1, 0);
  let perpendicular = direction.clone().cross(up);
  if (perpendicular.lengthSq() < 1e-6) {
    perpendicular = direction.clone().cross(new Vector3(1, 0, 0));
  }
  perpendicular.normalize().multiplyScalar(length * bow);
  mid.add(perpendicular);
  return [mid.x, mid.y, mid.z];
}

/**
 * Every Governance Loop connector is a curved data channel (a single
 * gentle bow through one control point), not a straight segment —
 * relationships should read as channels with a shape, not wires. Pure
 * and testable without any WebGL/R3F context; FlowLine samples this
 * once per `from`/`to` pair and reuses the points for both the drawn
 * line and the traveling packets.
 */
export function buildFlowCurvePoints(
  from: Vec3,
  to: Vec3,
  segments = 24,
  bow = 0.28,
): [number, number, number][] {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const mid = new Vector3(...curveMidpoint(from, to, bow));
  const curve = new CatmullRomCurve3([start, mid, end]);
  return curve.getPoints(Math.max(2, segments)).map((point) => [point.x, point.y, point.z]);
}

/** Linear interpolation along a pre-sampled polyline, clamped to [0, 1]. */
export function pointAlongCurve(points: readonly Vec3[], t: number): Vec3 {
  if (points.length === 1) return points[0];
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (points.length - 1);
  const index = Math.floor(scaled);
  const nextIndex = Math.min(points.length - 1, index + 1);
  const fraction = scaled - index;
  const p0 = points[index];
  const p1 = points[nextIndex];
  return [
    p0[0] + (p1[0] - p0[0]) * fraction,
    p0[1] + (p1[1] - p0[1]) * fraction,
    p0[2] + (p1[2] - p0[2]) * fraction,
  ];
}

/** The local travel direction at `t`, used to orient a packet/arrowhead along the curve rather than always facing the same way. */
export function tangentAlongCurve(points: readonly Vec3[], t: number, epsilon = 0.02): Vec3 {
  const a = pointAlongCurve(points, Math.max(0, t - epsilon));
  const b = pointAlongCurve(points, Math.min(1, t + epsilon));
  return [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
}
