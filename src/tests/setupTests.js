import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

/**
 * Global test environment shims for Vitest + jsdom.
 *
 * Goals:
 * - Provide stable browser APIs commonly used by components (ResizeObserver, matchMedia, scroll APIs).
 * - Keep behavior deterministic across local runs and CI.
 */

// ------------------------------------------------------------
// matchMedia
// ------------------------------------------------------------
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// ------------------------------------------------------------
// ResizeObserver
// ------------------------------------------------------------
if (!globalThis.ResizeObserver) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = ResizeObserver;
}

// ------------------------------------------------------------
// Scroll APIs
// ------------------------------------------------------------
if (!window.scrollTo) {
  window.scrollTo = () => {};
}

if (!HTMLElement.prototype.scrollIntoView) {
  // eslint-disable-next-line no-extend-native
  HTMLElement.prototype.scrollIntoView = () => {};
}

// ------------------------------------------------------------
// Clipboard
// ------------------------------------------------------------
if (!navigator.clipboard) {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: vi.fn(() => Promise.resolve()),
    },
    configurable: true,
  });
}
