/**
 * @file favicon.js
 * @description Utilities for resolving and updating the active site favicon
 * based on the current app theme mode, palette, and system color-scheme
 * preference.
 * @module assets/favicon
 */

const DEFAULT_PALETTE = "alt";
const FAVICON_VARIANT_BY_PALETTE = Object.freeze({
  primary: "midnight",
  alt: null,
  forest: "forest",
  ocean: "ocean",
  sunset: "sunset",
});

const FAVICON_ID = "app-favicon";

function resolveFaviconCacheBustVersion() {
  if (
    typeof globalThis !== "undefined" &&
    typeof globalThis.__APP_BUILD_ID__ === "string" &&
    globalThis.__APP_BUILD_ID__.trim() !== ""
  ) {
    return globalThis.__APP_BUILD_ID__.trim();
  }

  if (typeof document !== "undefined" && typeof document.lastModified === "string") {
    const lastModifiedTime = Date.parse(document.lastModified);

    if (!Number.isNaN(lastModifiedTime)) {
      return String(lastModifiedTime);
    }
  }

  return "0";
}

const FAVICON_CACHE_BUST_VERSION = resolveFaviconCacheBustVersion();

/**
 * Returns the user's current system color-scheme preference.
 *
 * @returns {"light"|"dark"} The resolved system theme.
 */
export function getSystemTheme() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
}

/**
 * Resolves the final theme that should control the favicon.
 *
 * @param {"light"|"dark"|"auto"} mode - The app theme mode.
 * @returns {"light"|"dark"} The resolved theme.
 */
export function resolveFaviconTheme(mode = "auto") {
  if (mode === "light" || mode === "dark") {
    return mode;
  }

  return getSystemTheme();
}

/**
 * Resolves the favicon palette variant segment for a palette.
 *
 * @param {string} palette - The current app palette.
 * @returns {string|null} Variant suffix segment or null for base icons.
 */
export function resolveFaviconVariant(palette = DEFAULT_PALETTE) {
  if (typeof palette !== "string") {
    return FAVICON_VARIANT_BY_PALETTE[DEFAULT_PALETTE];
  }

  return FAVICON_VARIANT_BY_PALETTE[palette] ?? FAVICON_VARIANT_BY_PALETTE[DEFAULT_PALETTE];
}

/**
 * Builds the favicon path from the active theme mode and palette.
 *
 * @param {"light"|"dark"|"auto"} mode - The app theme mode.
 * @param {string} palette - The current app palette.
 * @returns {string} Absolute favicon path.
 */
export function resolveFaviconPath(mode = "auto", palette = DEFAULT_PALETTE) {
  const resolvedTheme = resolveFaviconTheme(mode);
  const variant = resolveFaviconVariant(palette);

  if (variant) {
    return `/favicons/favicon-${resolvedTheme}-${variant}.png`;
  }

  return `/favicons/favicon-${resolvedTheme}.png`;
}

/**
 * Ensures the favicon link element exists.
 *
 * @returns {HTMLLinkElement|null} The favicon link element.
 */
function getOrCreateFaviconLink() {
  if (typeof document === "undefined") return null;

  let link = document.getElementById(FAVICON_ID);

  if (link instanceof HTMLLinkElement) {
    return link;
  }

  link = document.createElement("link");
  link.id = FAVICON_ID;
  link.rel = "icon";
  link.type = "image/png";
  document.head.appendChild(link);

  return link;
}

/**
 * Removes competing favicon link tags so the app-controlled favicon
 * remains the only active `rel="icon"` candidate.
 *
 * @param {HTMLLinkElement} canonicalLink - The canonical theme-managed link.
 */
function pruneCompetingFaviconLinks(canonicalLink) {
  if (typeof document === "undefined" || !canonicalLink) return;

  const iconLinks = document.head.querySelectorAll('link[rel~="icon"]');
  iconLinks.forEach((node) => {
    if (!(node instanceof HTMLLinkElement) || node === canonicalLink) {
      return;
    }

    node.remove();
  });
}

/**
 * Appends a stable cache-busting version so deployed favicon updates
 * are fetched even when browsers hold aggressive icon caches.
 *
 * @param {string} path - Base favicon path.
 * @returns {string} Versioned favicon path.
 */
function withCacheBust(path) {
  if (typeof path !== "string" || path.length === 0) return path;

  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}v=${FAVICON_CACHE_BUST_VERSION}`;
}

/**
 * Updates the active favicon based on the supplied theme mode.
 *
 * @param {"light"|"dark"|"auto"} mode - The app theme mode.
 * @param {string} palette - The current app palette.
 */
export function updateFavicon(mode = "auto", palette = DEFAULT_PALETTE) {
  const link = getOrCreateFaviconLink();

  if (!link) return;

  pruneCompetingFaviconLinks(link);
  link.href = withCacheBust(resolveFaviconPath(mode, palette));
}

/**
 * Subscribes to system theme changes.
 *
 * Useful when the app is in "auto" mode and the favicon should follow
 * OS/browser theme changes live.
 *
 * @param {() => void} onChange - Callback fired when system theme changes.
 * @returns {() => void} Cleanup function.
 */
export function subscribeToSystemThemeChanges(onChange) {
  if (typeof window === "undefined" || !window.matchMedia || typeof onChange !== "function") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handler = () => onChange();

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }

  // Fallback for older browsers
  if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }

  return () => {};
}
