/**
 * @file src\components\navigation\helpers\__tests__\SectionRegistryProvider.test.jsx
 * @description src\components\navigation\helpers\__tests__\SectionRegistryProvider.test module.
 * @module src\components\navigation\helpers\__tests__\SectionRegistryProvider.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

import {
  SectionRegistryProvider,
  useSectionRegistry,
} from "assets/context/SectionRegistryProvider";

function wrapper({ children }) {
  return <SectionRegistryProvider>{children}</SectionRegistryProvider>;
}

function withSuppressedWindowError(callback) {
  const suppressExpectedError = (event) => {
    event.preventDefault();
  };

  window.addEventListener("error", suppressExpectedError);

  try {
    return callback();
  } finally {
    window.removeEventListener("error", suppressExpectedError);
  }
}

describe("SectionRegistryProvider", () => {
  let consoleErrorSpy;
  let consoleWarnSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("registers and retrieves sections", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("intro", {
        id: "intro",
        title: "Introduction",
      });
    });

    expect(result.current.getSections()).toEqual([{ id: "intro", title: "Introduction" }]);
  });

  it("prevents duplicate section ids", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("intro", {
        id: "intro",
        title: "Introduction",
      });
      result.current.registerSection("intro", {
        id: "intro",
        title: "Duplicate",
      });
    });

    expect(result.current.getSections()).toHaveLength(1);
    expect(result.current.getSections()[0].title).toBe("Introduction");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '[SectionRegistry] Duplicate section id "intro" detected. Each section id must be unique per page.'
    );
  });

  it("unregisters sections correctly", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("intro", {
        id: "intro",
        title: "Introduction",
      });
    });

    act(() => {
      result.current.unregisterSection("intro");
    });

    expect(result.current.getSections()).toEqual([]);
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[SectionRegistry] No sections registered. Did you forget to render <SectionRenderer /> components?"
    );
  });

  it("throws if hook is used outside provider", () => {
    expect(() =>
      withSuppressedWindowError(() => {
        renderHook(() => useSectionRegistry());
      })
    ).toThrow(/must be used within <SectionRegistryProvider \/>/i);

    expect(consoleErrorSpy).toHaveBeenCalled();
  });
});
