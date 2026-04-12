/**
 * @file src\assets\hooks\useScrollSpy\useScrollSpy.test.js
 * @description src\assets\hooks\useScrollSpy\useScrollSpy.test module.
 * @module src\assets\hooks\useScrollSpy\useScrollSpy.test
 */

import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { buildSectionTree, useScrollSpyWithHistory } from "./index";

/**
 * @file useScrollSpy.test.js
 * @fileoverview Behavioral tests for the useScrollSpyWithHistory hook.
 *
 * Testing rules applied:
 * - browser APIs are mocked
 * - calls are wrapped in act()
 * - async updates use waitFor()
 * - assertions target public return values only
 *
 * Test plan:
 * - builds a flat observable tree from section data
 * - updates the active chain when the closest visible node changes
 * - marks a programmatic scroll immediately without waiting for the observer
 */

/**
 * Hook tests for useScrollSpyWithHistory.
 *
 * Gold-standard rules followed:
 * - browser APIs are mocked
 * - calls are wrapped in act()
 * - async updates use waitFor()
 * - assertions target public return values only
 *
 * @module tests/hooks/useScrollSpy
 */

// Note: the hook's internal IntersectionObserver is mocked to allow deterministic testing of scroll behavior.
describe("useScrollSpyWithHistory", () => {
  let observedElements;
  let observerCallback;
  let replaceStateSpy;
  let originalIntersectionObserver;

  // Before each test, we set up a fresh mock IntersectionObserver and spy on history.replaceState to verify URL updates.
  beforeEach(() => {
    observedElements = [];
    replaceStateSpy = vi.spyOn(window.history, "replaceState").mockImplementation(() => {});
    originalIntersectionObserver = globalThis.IntersectionObserver;

    globalThis.IntersectionObserver = class {
      constructor(callback) {
        observerCallback = callback;
      }

      observe = (element) => {
        observedElements.push(element);
      };

      unobserve = () => {};
      disconnect = () => {};
    };
  });

  // After each test, we restore the original IntersectionObserver and history.replaceState, and clear the document body.
  afterEach(() => {
    replaceStateSpy.mockRestore();
    globalThis.IntersectionObserver = originalIntersectionObserver;
    document.body.innerHTML = "";
  });

  // Test case: the hook should build a flat observable tree from the provided section data.
  it("builds a flat observable tree from section data", () => {
    const { nodes, byId } = buildSectionTree([
      {
        id: "overview",
        blocks: [{ id: "overview-block" }],
      },
    ]);

    expect(nodes.map((node) => node.id)).toEqual(["overview", "overview-block"]);
    expect(byId.get("overview-block")?.parentId).toBe("overview");
  });

  it("builds section children from navItems when provided", () => {
    const { nodes, byId } = buildSectionTree([
      {
        id: "docs",
        navItems: [{ id: "doc-components", title: "Components" }],
        blocks: [{ id: "legacy-block" }],
      },
    ]);

    expect(nodes.map((node) => node.id)).toEqual(["docs", "doc-components"]);
    expect(byId.get("doc-components")?.parentId).toBe("docs");
    expect(byId.has("legacy-block")).toBe(false);
  });

  // Test case: the hook should update the active chain when the closest visible node changes.
  it("updates the active chain when the closest visible node changes", async () => {
    document.body.innerHTML = '<section id="overview"></section><div id="overview-block"></div>';

    const sections = [
      {
        id: "overview",
        blocks: [{ id: "overview-block" }],
      },
    ];

    const { nodes, byId } = buildSectionTree(sections);
    const { result } = renderHook(() => useScrollSpyWithHistory(nodes, byId, 96));

    await waitFor(() => {
      expect(observedElements).toHaveLength(2);
    });

    act(() => {
      observerCallback([
        {
          isIntersecting: true,
          target: observedElements.find((element) => element.id === "overview-block"),
          boundingClientRect: { top: 24 },
        },
      ]);
    });

    await waitFor(() => {
      expect(result.current.activeLeafId).toBe("overview-block");
      expect(result.current.activeChain).toEqual(["overview", "overview-block"]);
    });

    expect(replaceStateSpy).toHaveBeenCalledWith(null, "", "#overview-block");
  });

  // Test case: when markProgrammaticScroll is called, the hook should immediately update the active chain without waiting for the observer callback.
  it("marks a programmatic scroll immediately without waiting for the observer", async () => {
    const { nodes, byId } = buildSectionTree([{ id: "summary", blocks: [] }]);
    const { result } = renderHook(() => useScrollSpyWithHistory(nodes, byId));

    await act(async () => {
      result.current.markProgrammaticScroll("summary");
    });

    await waitFor(() => {
      expect(result.current.activeLeafId).toBe("summary");
      expect(result.current.activeChain).toEqual(["summary"]);
    });
  });
});
