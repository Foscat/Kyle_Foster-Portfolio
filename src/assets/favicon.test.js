/**
 * @file favicon.test.js
 * @description Unit tests for favicon theme, palette, and system-mode helpers.
 * @module assets/favicon.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getSystemTheme,
  resolveFaviconPath,
  resolveFaviconTheme,
  resolveFaviconVariant,
  subscribeToSystemThemeChanges,
  updateFavicon,
} from "./favicon";

describe("favicon utilities", () => {
  const originalMatchMedia = window.matchMedia;
  const CACHE_BUST = "v=20260504";

  beforeEach(() => {
    document.head.innerHTML = "";
  });

  afterEach(() => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
    vi.restoreAllMocks();
  });

  it("updates the existing favicon link for dark and light themes", () => {
    const link = document.createElement("link");
    link.id = "app-favicon";
    link.rel = "icon";
    document.head.appendChild(link);

    updateFavicon("dark");
    expect(link.getAttribute("href")).toBe(`/favicons/favicon-dark.png?${CACHE_BUST}`);

    updateFavicon("light");
    expect(link.getAttribute("href")).toBe(`/favicons/favicon-light.png?${CACHE_BUST}`);
  });

  it("uses palette-specific themed favicon files when a palette variant exists", () => {
    const link = document.createElement("link");
    link.id = "app-favicon";
    link.rel = "icon";
    document.head.appendChild(link);

    updateFavicon("dark", "ocean");
    expect(link.getAttribute("href")).toBe(`/favicons/favicon-dark-ocean.png?${CACHE_BUST}`);

    updateFavicon("light", "forest");
    expect(link.getAttribute("href")).toBe(`/favicons/favicon-light-forest.png?${CACHE_BUST}`);

    updateFavicon("dark", "primary");
    expect(link.getAttribute("href")).toBe(`/favicons/favicon-dark-midnight.png?${CACHE_BUST}`);
  });

  it("creates a favicon link when one does not exist", () => {
    expect(document.getElementById("app-favicon")).toBeNull();
    updateFavicon("dark");

    const link = document.getElementById("app-favicon");
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe(`/favicons/favicon-dark.png?${CACHE_BUST}`);
  });

  it("removes competing rel=icon tags so only app-favicon remains", () => {
    const managed = document.createElement("link");
    managed.id = "app-favicon";
    managed.rel = "icon";
    managed.href = "/favicons/favicon-dark.png";
    document.head.appendChild(managed);

    const legacy = document.createElement("link");
    legacy.rel = "icon";
    legacy.type = "image/jpeg";
    legacy.href = "/portfolio-icon.jpg";
    document.head.appendChild(legacy);

    const shortcutLegacy = document.createElement("link");
    shortcutLegacy.rel = "shortcut icon";
    shortcutLegacy.type = "image/x-icon";
    shortcutLegacy.href = "/favicon.ico";
    document.head.appendChild(shortcutLegacy);

    updateFavicon("light");

    const iconLinks = [...document.head.querySelectorAll('link[rel~="icon"]')];
    expect(iconLinks).toHaveLength(1);
    expect(iconLinks[0].id).toBe("app-favicon");
    expect(iconLinks[0].getAttribute("href")).toBe(`/favicons/favicon-light.png?${CACHE_BUST}`);
  });

  it("resolves auto mode from system preference", () => {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });
    expect(getSystemTheme()).toBe("dark");
    expect(resolveFaviconTheme("auto")).toBe("dark");
    expect(resolveFaviconTheme("light")).toBe("light");
  });

  it("subscribes and unsubscribes from system theme changes", () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const mediaQuery = {
      matches: false,
      addEventListener,
      removeEventListener,
    };

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue(mediaQuery),
    });

    const onChange = vi.fn();
    const unsubscribe = subscribeToSystemThemeChanges(onChange);

    expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    const handler = addEventListener.mock.calls[0][1];
    handler();
    expect(onChange).toHaveBeenCalledTimes(1);

    unsubscribe();
    expect(removeEventListener).toHaveBeenCalledWith("change", handler);
  });

  it("falls back to classic base favicon when palette is unsupported", () => {
    expect(resolveFaviconVariant("unknown")).toBeNull();
    expect(resolveFaviconPath("dark", "unknown")).toBe("/favicons/favicon-dark.png");
    expect(resolveFaviconPath("light", "unknown")).toBe("/favicons/favicon-light.png");
  });
});
