/**
 * useClipboard.test.js
 * ------------------------------------------------------------------
 * Unit tests for the useClipboard hook.
 *
 * Covers:
 * - Successful copy behavior
 * - Error handling
 * - State transitions (copied / error)
 * - Guard conditions (invalid input)
 */

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useClipboard from "./useClipboard";

/* ------------------------------------------------------------------
 * Clipboard mock
 * ------------------------------------------------------------------ */

const writeTextMock = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  Object.assign(navigator, {
    clipboard: {
      writeText: writeTextMock,
    },
  });
});

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("useClipboard", () => {
  /* ------------------------------------------------------------
   * Success path
   * ------------------------------------------------------------ */

  it("copies text to the clipboard successfully", async () => {
    writeTextMock.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      const success = await result.current.copy("Hello world");
      expect(success).toBe(true);
    });

    expect(writeTextMock).toHaveBeenCalledWith("Hello world");
    expect(result.current.copied).toBe(true);
    expect(result.current.error).toBeNull();
  });

  /* ------------------------------------------------------------
   * Error path
   * ------------------------------------------------------------ */

  it("handles clipboard write failure", async () => {
    const error = new Error("Clipboard error");
    writeTextMock.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      const success = await result.current.copy("Fail");
      expect(success).toBe(false);
    });

    expect(writeTextMock).toHaveBeenCalledWith("Fail");
    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBe(error);
  });

  /* ------------------------------------------------------------
   * Guard conditions
   * ------------------------------------------------------------ */

  it("does not attempt to copy empty strings", async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      const success = await result.current.copy("");
      expect(success).toBe(false);
    });

    expect(writeTextMock).not.toHaveBeenCalled();
    expect(result.current.copied).toBe(false);
  });

  it("handles missing clipboard API gracefully", async () => {
    delete navigator.clipboard;

    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      const success = await result.current.copy("Test");
      expect(success).toBe(false);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.copied).toBe(false);
  });

  /* ------------------------------------------------------------
   * Reset behavior
   * ------------------------------------------------------------ */

  it("resets copied state after the specified delay", async () => {
    vi.useFakeTimers();
    writeTextMock.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useClipboard({ resetDelay: 1000 }));

    await act(async () => {
      await result.current.copy("Timed copy");
    });

    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.copied).toBe(false);

    vi.useRealTimers();
  });
});
