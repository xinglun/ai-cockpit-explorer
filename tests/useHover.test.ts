import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useHover } from "@/architecture/useHover";

function fakePointerEvent() {
  return { stopPropagation: () => {} } as never;
}

describe("useHover", () => {
  it("turns on immediately on pointer over", () => {
    const { result } = renderHook(() => useHover());
    act(() => result.current.hoverHandlers.onPointerOver(fakePointerEvent()));
    expect(result.current.hovered).toBe(true);
  });

  it("does not flicker off when a leave is immediately followed by a re-enter (boundary jitter)", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useHover());
    act(() => result.current.hoverHandlers.onPointerOver(fakePointerEvent()));
    expect(result.current.hovered).toBe(true);

    act(() => result.current.hoverHandlers.onPointerOut(fakePointerEvent()));
    act(() => result.current.hoverHandlers.onPointerOver(fakePointerEvent()));
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.hovered).toBe(true);
    vi.useRealTimers();
  });

  it("turns off once no re-entry claims the pointer within the debounce window", () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useHover());
    act(() => result.current.hoverHandlers.onPointerOver(fakePointerEvent()));
    act(() => result.current.hoverHandlers.onPointerOut(fakePointerEvent()));
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.hovered).toBe(false);
    vi.useRealTimers();
  });
});
