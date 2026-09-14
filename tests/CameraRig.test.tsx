import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { forwardRef, useImperativeHandle } from "react";
import { CameraRig } from "@/scene/CameraRig";
import { buildSetLookAtArgs } from "@/interaction/cameraTargets";
import type { ArchitectureElementId } from "@/data/architecture";

const setLookAt = vi.fn();
const dolly = vi.fn();

vi.mock("@react-three/drei", () => ({
  // Stand-in for drei's CameraControls: no WebGL/R3F context needed,
  // just a ref exposing setLookAt/dolly so we can assert on call
  // timing — this is what "one owner of camera position + target"
  // means in practice, and what the old split ArchitectureCamera/
  // OrbitControls pair violated.
  CameraControls: (() => {
    const MockCameraControls = forwardRef(
      (_props: unknown, ref: React.Ref<{ setLookAt: typeof setLookAt; dolly: typeof dolly }>) => {
        useImperativeHandle(ref, () => ({ setLookAt, dolly }));
        return null;
      },
    );
    MockCameraControls.displayName = "MockCameraControls";
    return MockCameraControls;
  })(),
  CameraControlsImpl: {
    ACTION: {
      NONE: 0,
      ROTATE: 1,
      DOLLY: 16,
      TOUCH_ROTATE: 64,
      TOUCH_DOLLY_TRUCK: 4096,
    },
  },
}));

describe("CameraRig", () => {
  it("calls setLookAt once for the initial cameraId", () => {
    setLookAt.mockClear();
    render(<CameraRig cameraId="runtime" />);
    expect(setLookAt).toHaveBeenCalledTimes(1);
    expect(setLookAt).toHaveBeenCalledWith(...buildSetLookAtArgs("runtime", false));
  });

  it("does not re-trigger setLookAt on a re-render with the same cameraId (regression: the old bug re-applied camera.lookAt every frame regardless of whether the target changed)", () => {
    setLookAt.mockClear();
    const { rerender } = render(<CameraRig cameraId="runtime" />);
    expect(setLookAt).toHaveBeenCalledTimes(1);
    rerender(<CameraRig cameraId="runtime" />);
    rerender(<CameraRig cameraId="runtime" />);
    expect(setLookAt).toHaveBeenCalledTimes(1);
  });

  it("settles on the last id after rapidly changing the target across many objects, without firing extra calls for intermediate renders it never committed to", () => {
    setLookAt.mockClear();
    const sequence: ArchitectureElementId[] = [
      "agents",
      "entrySurface",
      "contract",
      "runtime",
      "repository",
      "repositoryProtocol",
      "evidence",
      "outcome",
      "humanAuthority",
      "runtime",
    ];
    const { rerender } = render(<CameraRig cameraId={sequence[0]} />);
    for (const id of sequence.slice(1)) {
      rerender(<CameraRig cameraId={id} />);
    }
    expect(setLookAt).toHaveBeenCalledTimes(sequence.length);
    expect(setLookAt).toHaveBeenLastCalledWith(...buildSetLookAtArgs("runtime", false));
  });

  it("falls back to the overview target when cameraId is null", () => {
    setLookAt.mockClear();
    render(<CameraRig cameraId={null} />);
    expect(setLookAt).toHaveBeenCalledWith(...buildSetLookAtArgs(null, false));
  });

  it("dollies in once when pushIn turns on, and back out once when it turns off", () => {
    dolly.mockClear();
    const { rerender } = render(<CameraRig cameraId="runtime" pushIn={false} />);
    expect(dolly).not.toHaveBeenCalled();

    rerender(<CameraRig cameraId="runtime" pushIn />);
    expect(dolly).toHaveBeenCalledTimes(1);
    expect(dolly).toHaveBeenLastCalledWith(expect.any(Number), true);
    const [inAmount] = dolly.mock.calls[0];

    rerender(<CameraRig cameraId="runtime" pushIn={false} />);
    expect(dolly).toHaveBeenCalledTimes(2);
    const [outAmount] = dolly.mock.calls[1];
    expect(outAmount).toBeCloseTo(-inAmount);
  });

  it("does not re-dolly on a re-render with the same pushIn value", () => {
    dolly.mockClear();
    const { rerender } = render(<CameraRig cameraId="runtime" pushIn />);
    expect(dolly).toHaveBeenCalledTimes(1);
    rerender(<CameraRig cameraId="runtime" pushIn />);
    rerender(<CameraRig cameraId="runtime" pushIn />);
    expect(dolly).toHaveBeenCalledTimes(1);
  });
});
