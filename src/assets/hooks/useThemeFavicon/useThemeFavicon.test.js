/**
 * @file useThemeFavicon.test.js
 * @description Unit tests for the useThemeFavicon hook behavior.
 * @module hooks/useThemeFavicon.test
 */

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useThemeFavicon } from "./";

const { updateFavicon, subscribeToPaletteChanges, subscribeToSystemThemeChanges } = vi.hoisted(
  () => ({
    updateFavicon: vi.fn(),
    subscribeToPaletteChanges: vi.fn(),
    subscribeToSystemThemeChanges: vi.fn(),
  })
);

vi.mock("../../favicon", () => ({
  updateFavicon,
  subscribeToPaletteChanges,
  subscribeToSystemThemeChanges,
}));

describe("useThemeFavicon", () => {
  beforeEach(() => {
    updateFavicon.mockReset();
    subscribeToPaletteChanges.mockReset();
    subscribeToSystemThemeChanges.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("updates favicon immediately for non-auto themes", () => {
    renderHook(() => useThemeFavicon("dark", "forest"));
    expect(updateFavicon).toHaveBeenCalledWith("dark", "forest");
    expect(subscribeToSystemThemeChanges).not.toHaveBeenCalled();
  });

  it("subscribes in auto mode and cleans up on unmount", () => {
    const unsubscribe = vi.fn();
    subscribeToSystemThemeChanges.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useThemeFavicon("auto", "ocean"));

    expect(updateFavicon).toHaveBeenCalledWith("auto", "ocean");
    expect(subscribeToSystemThemeChanges).toHaveBeenCalledTimes(1);

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("subscribes to document palette changes when no palette is passed", () => {
    const unsubscribe = vi.fn();
    subscribeToPaletteChanges.mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useThemeFavicon("dark"));

    expect(updateFavicon).toHaveBeenCalledWith("dark", undefined);
    expect(subscribeToPaletteChanges).toHaveBeenCalledTimes(1);

    const paletteHandler = subscribeToPaletteChanges.mock.calls[0][0];
    paletteHandler();
    expect(updateFavicon).toHaveBeenCalledWith("dark", undefined);

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it("re-applies favicon when theme mode changes", () => {
    const { rerender } = renderHook(({ mode, palette }) => useThemeFavicon(mode, palette), {
      initialProps: { mode: "light", palette: "sunset" },
    });

    rerender({ mode: "dark", palette: "sunset" });
    rerender({ mode: "dark", palette: "alt" });

    expect(updateFavicon).toHaveBeenCalledWith("light", "sunset");
    expect(updateFavicon).toHaveBeenCalledWith("dark", "sunset");
    expect(updateFavicon).toHaveBeenCalledWith("dark", "alt");
  });
});
