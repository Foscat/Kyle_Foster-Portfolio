/**
 * @file useClipboard.test.js
 * @fileoverview Behavioral tests for the useClipboard hook.
 * @description Tests the clipboard copying functionality, state management, and error handling of the useClipboard hook.
 *
 * Test plan:
 * - copies valid text and resets copied state after the configured delay
 * - returns false and does not call the clipboard API for empty input
 * - surfaces an error when the clipboard API is unavailable
 *
 * Note: the hook's internal timer is mocked to keep tests deterministic and fast.
 *
 * Testing strategy:
 * - Mocks the clipboard API to verify interactions without relying on actual clipboard access
 * - Uses fake timers to control the timing of state resets without waiting in real time
 * - Asserts the hook's return values and state changes based on different input scenarios
 * - Covers both typical usage and edge cases to ensure robust behavior
 * @module tests/hooks/useClipboard
 *
 */

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import useClipboard from "./";

/**
 * Test plan:
 * - copies valid text and resets copied state after the configured delay
 * - returns false and does not call the clipboard API for empty input
 * - surfaces an error when the clipboard API is unavailable
 *
 * Note: the hook's internal timer is mocked to keep tests deterministic and fast.
 */
describe("useClipboard", () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    vi.useFakeTimers();

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: vi.fn(),
      },
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: originalClipboard,
    });
  });

  it("copies valid text and resets copied state after the configured delay", () => {
    navigator.clipboard.writeText.mockResolvedValue(undefined);

    const { result } = renderHook(() => useClipboard({ resetDelay: 2000 }));

    let didCopy;
    act(() => {
      didCopy = result.current.copy("hello");
    });

    expect(didCopy).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });

  // Edge case: empty input should not trigger a clipboard write and should return false.
  it("returns false and does not call the clipboard API for empty input", () => {
    const { result } = renderHook(() => useClipboard());

    let didCopy;
    act(() => {
      didCopy = result.current.copy("");
    });

    expect(didCopy).toBe(false);
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
  });

  // Edge case: if the clipboard API is unavailable, the hook should return false and set an error.
  it("surfaces an error when the clipboard API is unavailable", () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useClipboard());

    let didCopy;
    act(() => {
      didCopy = result.current.copy("Copy me");
    });

    expect(didCopy).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
  });
});
