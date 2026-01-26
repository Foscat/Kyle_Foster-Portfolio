import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSectionRegistry, SectionRegistryProvider } from "navigation/SectionRegistryProvider";

/**
 * @file SectionRegistryProvider.test.jsx
 * @description Unit tests for the SectionRegistryProvider and useSectionRegistry hook.
 *
 * Test coverage:
 * - Section registration lifecycle
 * - Prevention of duplicate section IDs
 * - Section unregistration behavior
 * - Enforcement of provider usage boundaries
 *
 * Architectural intent:
 * SectionRegistryProvider acts as a global, in-memory registry for
 * scrollable page sections. It enables:
 * - Sticky section navigation
 * - Scroll-spy coordination
 * - Programmatic section lookup
 *
 * These tests focus on:
 * - State integrity
 * - Defensive behavior
 * - Correct hook usage constraints
 *
 * @module tests/navigation/SectionRegistryProvider
 */

/* ------------------------------------------------------------------
 * Test utilities
 * ------------------------------------------------------------------
 */

/**
 * Wrapper component to provide SectionRegistry context
 * for hook-based tests.
 */
const wrapper = ({ children }) => <SectionRegistryProvider>{children}</SectionRegistryProvider>;

/**
 * Sanity render to ensure the provider initializes without error.
 * This is intentionally executed at module scope.
 */
renderHook(() => useSectionRegistry(), {
  wrapper: SectionRegistryProvider,
});

/* ------------------------------------------------------------------
 * Test Suite
 * ------------------------------------------------------------------ */

describe("SectionRegistryProvider", () => {
  beforeEach(() => {
    /**
     * Silence expected warnings triggered by duplicate registration attempts.
     */
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  /**
   * Verifies that sections can be registered and retrieved.
   */
  it("registers and retrieves sections", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("intro", {
        id: "intro",
        title: "Introduction",
      });
    });

    const sections = result.current.getSections();
    expect(sections).toHaveLength(1);
    expect(sections[0].id).toBe("intro");
  });

  /**
   * Verifies that duplicate section IDs are ignored
   * to preserve registry integrity.
   */
  it("prevents duplicate section ids", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("dup", { id: "dup", title: "One" });
      result.current.registerSection("dup", { id: "dup", title: "Two" });
    });

    expect(result.current.getSections()).toHaveLength(1);
  });

  /**
   * Verifies that sections can be removed from the registry.
   */
  it("unregisters sections correctly", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("a", { id: "a", title: "A" });
      result.current.unregisterSection("a");
    });

    expect(result.current.getSections()).toHaveLength(0);
  });

  /**
   * Verifies that the hook enforces provider usage and
   * throws when accessed outside its context.
   */
  it("throws if hook is used outside provider", () => {
    expect(() => renderHook(() => useSectionRegistry())).toThrow();
  });
});
