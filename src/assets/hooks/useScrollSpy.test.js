import { renderHook, act } from "@testing-library/react";
import { useScrollSpyWithHistory } from "../useScrollSpy";

/**
 * useScrollSpyWithHistory
 * ---------------------------------------------------------------------------
 * These tests ensure the hook always returns a stable object shape and never
 * returns null — preventing runtime destructuring crashes in consumers.
 */

describe("useScrollSpyWithHistory", () => {
  test("always returns an object with expected properties", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("object");

    expect(result.current).toHaveProperty("activeId");
    expect(result.current).toHaveProperty("markProgrammaticScroll");

    expect(typeof result.current.markProgrammaticScroll).toBe("function");
  });

  test("does not return null when sectionIds is empty", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(result.current).not.toBeNull();
  });

  test("activeId initializes to null safely", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(result.current.activeId).toBeNull();
  });

  test("markProgrammaticScroll can be called without errors", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    expect(() => {
      act(() => {
        result.current.markProgrammaticScroll();
      });
    }).not.toThrow();
  });

  test("supports safe destructuring by consumers", () => {
    const { result } = renderHook(() => useScrollSpyWithHistory([]));

    // This is the exact destructuring that crashed your app before
    const { activeId, markProgrammaticScroll } = result.current;

    expect(activeId).toBeNull();
    expect(typeof markProgrammaticScroll).toBe("function");
  });
});
