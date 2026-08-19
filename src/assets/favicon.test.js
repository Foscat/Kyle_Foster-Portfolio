/**
 * @file favicon.test.js
 * @description Unit tests for favicon theme, palette, and system-mode helpers.
 * @module assets/favicon.test
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import {
  getFaviconPath,
  getSystemTheme,
  resolvePalette,
  resolveFaviconTheme,
  subscribeToPaletteChanges,
  subscribeToSystemThemeChanges,
  updateFavicon,
} from "./favicon";

/**
 * Browser-measured text baseline that optically centers the KF mark in its 512px frame.
 * @constant {string}
 */
const FAVICON_OPTICAL_CENTER_BASELINE = "330.84";

describe("favicon utilities", () => {
  const originalMatchMedia = window.matchMedia;
  const expectFaviconHref = (href, basePath) => {
    expect(href).toBeTruthy();
    const url = new URL(href, window.location.origin);
    expect(url.pathname).toBe(basePath);
  };

  beforeEach(() => {
    document.head.innerHTML = "";
    delete document.documentElement.dataset.palette;
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
    expectFaviconHref(link.getAttribute("href"), "/favicons/favicon-ocean-steel-dark.png");

    updateFavicon("light");
    expectFaviconHref(link.getAttribute("href"), "/favicons/favicon-ocean-steel-light.png");
  });

  it("uses palette-specific themed favicon files when a palette variant exists", () => {
    const link = document.createElement("link");
    link.id = "app-favicon";
    link.rel = "icon";
    document.head.appendChild(link);

    updateFavicon("dark", "ocean");
    expectFaviconHref(link.getAttribute("href"), "/favicons/favicon-ocean-steel-dark.png");

    updateFavicon("light", "forest");
    expectFaviconHref(link.getAttribute("href"), "/favicons/favicon-forest-moss-light.png");

    updateFavicon("dark", "midnight");
    expectFaviconHref(link.getAttribute("href"), "/favicons/favicon-midnight-gold-dark.png");
  });

  it("creates a favicon link when one does not exist", () => {
    expect(document.getElementById("app-favicon")).toBeNull();
    updateFavicon("dark");

    const link = document.getElementById("app-favicon");
    expect(link).not.toBeNull();
    expectFaviconHref(link?.getAttribute("href"), "/favicons/favicon-ocean-steel-dark.png");
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
    legacy.href = "/legacy-favicon.jpg";
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
    expectFaviconHref(iconLinks[0].getAttribute("href"), "/favicons/favicon-ocean-steel-light.png");
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

  it("subscribes and unsubscribes from document palette changes", async () => {
    const onChange = vi.fn();
    const unsubscribe = subscribeToPaletteChanges(onChange);

    document.documentElement.dataset.palette = "forest-moss";
    await Promise.resolve();

    expect(onChange).toHaveBeenCalledTimes(1);

    unsubscribe();
    document.documentElement.dataset.palette = "sunset-ember";
    await Promise.resolve();

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("resolves palette aliases and falls back to the default favicon palette", () => {
    expect(resolvePalette("ocean")).toBe("ocean-steel");
    expect(resolvePalette("primary")).toBe("classic");
    expect(resolvePalette("unknown")).toBe("ocean-steel");
    expect(getFaviconPath("dark", "unknown")).toBe("/favicons/favicon-ocean-steel-dark.png");
    expect(getFaviconPath("light", "unknown")).toBe("/favicons/favicon-ocean-steel-light.png");
  });

  it("keeps every SVG favicon on the measured optical-center baseline", () => {
    const faviconDirectory = resolve(process.cwd(), "public", "favicons");
    const svgFiles = readdirSync(faviconDirectory).filter((fileName) => fileName.endsWith(".svg"));

    expect(svgFiles).toHaveLength(22);
    svgFiles.forEach((fileName) => {
      const svg = readFileSync(resolve(faviconDirectory, fileName), "utf8");
      expect(svg).toContain(`x="256.0" y="${FAVICON_OPTICAL_CENTER_BASELINE}"`);
    });
  });
});
