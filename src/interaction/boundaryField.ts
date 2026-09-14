export type Vec3 = readonly [number, number, number];
export type Segment = readonly [Vec3, Vec3];

/**
 * The Work Item envelope reads as a boundary field — corner brackets
 * implying a volume — rather than a fully six-sided box. Each of the 8
 * corners gets three short edge segments (one per axis), each reaching
 * inward from the corner by `edgeFraction` of that axis's full extent
 * (capped by `maxLength` so a very large stage doesn't grow comically
 * long brackets). Pure and testable without any WebGL/R3F context.
 */
export function cornerBracketSegments(
  center: Vec3,
  size: Vec3,
  edgeFraction = 0.22,
  maxLength = 0.6,
): Segment[] {
  const half: Vec3 = [size[0] / 2, size[1] / 2, size[2] / 2];
  const lengths: Vec3 = [
    Math.min(maxLength, size[0] * edgeFraction),
    Math.min(maxLength, size[1] * edgeFraction),
    Math.min(maxLength, size[2] * edgeFraction),
  ];

  const corners: Vec3[] = [];
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        corners.push([
          center[0] + sx * half[0],
          center[1] + sy * half[1],
          center[2] + sz * half[2],
        ]);
      }
    }
  }

  const segments: Segment[] = [];
  for (let index = 0; index < corners.length; index += 1) {
    const corner = corners[index];
    const sx = (index & 4) === 0 ? -1 : 1;
    const sy = (index & 2) === 0 ? -1 : 1;
    const sz = (index & 1) === 0 ? -1 : 1;

    const towardCenterX: Vec3 = [corner[0] - sx * lengths[0], corner[1], corner[2]];
    const towardCenterY: Vec3 = [corner[0], corner[1] - sy * lengths[1], corner[2]];
    const towardCenterZ: Vec3 = [corner[0], corner[1], corner[2] - sz * lengths[2]];

    segments.push([corner, towardCenterX]);
    segments.push([corner, towardCenterY]);
    segments.push([corner, towardCenterZ]);
  }

  return segments;
}
