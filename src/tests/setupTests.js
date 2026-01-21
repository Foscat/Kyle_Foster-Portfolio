/**
 * Test Setup
 * ------------------------------------------------------------------
 * Global test configuration for the application.
 *
 * This file is automatically loaded by Vitest before each test run.
 * It establishes:
 * - jest-dom matchers
 * - browser API polyfills
 * - global mocks for noisy or unsupported APIs
 */

import "@testing-library/jest-dom";
import { vi } from "vitest";

/* ------------------------------------------------------------------
 * Console error enforcement
 * ------------------------------------------------------------------
 * Fails tests on unexpected console errors.
 * Allows tests to explicitly mock console.error when needed.
 */

// const originalError = console.error;

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation((...args) => {
    throw new Error(`Unexpected console.error:\n${args.map(String).join(" ")}`);
  });
});

afterEach(() => {
  console.error.mockRestore();
});

/* ------------------------------------------------------------------
 * Console noise control
 * ------------------------------------------------------------------
 * Silence known, intentional warnings during tests so real failures
 * are easier to spot.
 */

vi.spyOn(console, "error").mockImplementation((message, ...args) => {
  // Allow explicit test assertions on errors
  if (typeof message === "string" && message.includes("Unhandled application error")) {
    return;
  }
});

/* ------------------------------------------------------------------
 * matchMedia mock
 * ------------------------------------------------------------------
 * Required for:
 * - responsive components
 * - RSuite
 * - Drawer / Modal behavior
 */

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/* ------------------------------------------------------------------
 * ResizeObserver mock
 * ------------------------------------------------------------------
 * Used by:
 * - RSuite
 * - layout components
 * - sticky / responsive logic
 */

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

/* ------------------------------------------------------------------
 * Scroll behavior stubs
 * ------------------------------------------------------------------
 * Prevents JSDOM errors for scroll-related APIs.
 */

window.scrollTo = vi.fn();
HTMLElement.prototype.scrollIntoView = vi.fn();

/* ------------------------------------------------------------------
 * Clipboard API mock
 * ------------------------------------------------------------------
 * Required for useClipboard tests.
 */

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
});

/* ------------------------------------------------------------------
 * requestAnimationFrame mock
 * ------------------------------------------------------------------
 * Needed for animations / transitions / RSuite internals.
 */

window.requestAnimationFrame = (cb) => {
  return setTimeout(cb, 0);
};

window.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
