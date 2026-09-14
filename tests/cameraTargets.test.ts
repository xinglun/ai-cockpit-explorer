import { describe, expect, it } from "vitest";
import {
  buildSetLookAtArgs,
  cameraTargetFor,
  overviewCameraTarget,
} from "@/interaction/cameraTargets";

describe("buildSetLookAtArgs", () => {
  it("spreads an element's position + lookAt into a single setLookAt tuple", () => {
    const target = cameraTargetFor("runtime");
    const args = buildSetLookAtArgs("runtime", false);
    expect(args).toEqual([...target.position, ...target.lookAt, true]);
  });

  it("falls back to the overview target when there is no selection", () => {
    const args = buildSetLookAtArgs(null, false);
    expect(args).toEqual([
      ...overviewCameraTarget.position,
      ...overviewCameraTarget.lookAt,
      true,
    ]);
  });

  it("disables the animated transition flag under prefers-reduced-motion", () => {
    const args = buildSetLookAtArgs("humanAuthority", true);
    expect(args[6]).toBe(false);
  });

  it("enables the animated transition flag when motion is not reduced", () => {
    const args = buildSetLookAtArgs("humanAuthority", false);
    expect(args[6]).toBe(true);
  });

  it("is stable/idempotent for the same id (no per-call drift that could cause jitter)", () => {
    const first = buildSetLookAtArgs("evidence", false);
    const second = buildSetLookAtArgs("evidence", false);
    expect(first).toEqual(second);
  });
});
