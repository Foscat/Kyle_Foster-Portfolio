import { renderHook, act } from "@testing-library/react";
import { useScrollSpyWithHistory } from "assets/hooks/useScrollSpy";

/**
 * @file useScrollSpy.test.js
 * @description Unit tests for the `useScrollSpyWithHistory` hook.
 *
 * Testing focus:
 * - Defensive guarantees around return shape
 * - Safe behavior with empty or missing section IDs
 * - Stability for consumer destructuring
 * - Non-throwing behavior for exposed methods
 *
 * Rationale:
 * This test suite exists primarily to prevent regressions that could
 * cause runtime crashes when consumers destructure the hook return
 * value without null guards.
 *
 * @module tests/hooks/useScrollSpyWithHistory
 */

/**
 * useScrollSpyWithHistory
 * ---------------------------------------------------------------------------
 * Ensures the hook always returns a stable, non-null object shape,
 * even when provided with empty input.
 */
describe("useScrollSpyWithHistory", () => {
  /**
   * Verifies that the hook always returns an object containing the
   * expected properties, regardless of input.
   */
  test("always returns an object with expected properties", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("object");

    expect(result.current).toHaveProperty("activeId");
    expect(result.current).toHaveProperty("markProgrammaticScroll");

    expect(typeof result.current.markProgrammaticScroll).toBe("function");
  });

  /**
   * Ensures the hook never returns null when invoked with an empty
   * section list.
   */
  test("does not return null when sectionIds is empty", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(result.current).not.toBeNull();
  });

  /**
   * Verifies that `activeId` initializes safely to null.
   */
  test("activeId initializes to null safely", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(result.current.activeId).toBeNull();
  });

  /**
   * Ensures that `markProgrammaticScroll` is callable and does not
   * throw when invoked without active scroll context.
   */
  test("markProgrammaticScroll can be called without errors", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(() => {
      act(() => {
        result.current.markProgrammaticScroll();
      });
    }).not.toThrow();
  });

  /**
   * Regression test ensuring consumers can safely destructure
   * the hook return value without defensive checks.
   */
  test("supports safe destructuring by consumers", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    // Mirrors the destructuring pattern that previously caused crashes
    const { activeId, markProgrammaticScroll } = result.current;

    expect(activeId).toBeNull();
    expect(typeof markProgrammaticScroll).toBe("function");
  });
});
