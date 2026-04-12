/**
 * @file src\tests\setupTests.js
 * @description src\tests\setupTests module.
 * @module src\tests\setupTests
 */

import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// Keep JSX tests compatible with files that still expect React in scope.
globalThis.React = React;

/**
 * @file setupTests.js
 * @fileoverview Global test-environment shims for Vitest + jsdom.
 * @description This file provides stable implementations of browser APIs that are commonly used across the codebase, such as requestAnimationFrame, matchMedia, ResizeObserver, IntersectionObserver, scroll APIs, and clipboard functionality. By defining these shims in a central location, we ensure that all tests have access to consistent and deterministic behavior for these APIs, which is crucial for testing components that rely on responsive design, scrolling behavior, and clipboard interactions. This setup helps to prevent errors related to missing APIs in the jsdom environment and allows tests to focus on component behavior rather than low-level API availability.
 *
 * Testing rules applied:
 * - Browser APIs are mocked to provide stable implementations in the jsdom environment.
 * - The matchMedia mock includes a helper method to allow tests to simulate different media query matches, enabling testing of responsive behavior in components that rely on matchMedia.
 * - The clipboard mock provides a spy function for writeText, allowing tests to verify that clipboard interactions are occurring as expected without relying on the actual clipboard API, which is not available in jsdom.
 * - The IntersectionObserver and ResizeObserver mocks provide basic implementations that allow components using these APIs to function in tests without throwing errors, while also allowing for more complex behavior to be tested by replacing the mock implementations in specific test files as needed.
 * Design intent:
 * The goal of this setup file is to provide a consistent and reliable testing environment for all tests in the codebase by ensuring that commonly used browser APIs are available and behave in a predictable manner. This allows tests to focus on the behavior of the components being tested rather than dealing with issues related to missing or inconsistent API implementations in the jsdom environment. By centralizing these shims, we also avoid the need for individual test files to implement their own mocks for these APIs, reducing duplication and ensuring consistency across tests.
 * @module tests/setupTests
 * @author Kyle Foster
 * @see https://vitest.dev/guide/setup-files.html for more information on setup files in Vitest
 */

// -----------------------------------------------------------------------------
// requestAnimationFrame / cancelAnimationFrame
// -----------------------------------------------------------------------------
if (!globalThis.requestAnimationFrame) {
  globalThis.requestAnimationFrame = (callback) => setTimeout(() => callback(Date.now()), 0);
}

if (!globalThis.cancelAnimationFrame) {
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
}

// -----------------------------------------------------------------------------
// Viewport defaults
// -----------------------------------------------------------------------------
// JSDOM may report narrow/zero widths in some environments; force a stable
// desktop viewport so responsive components render predictably in unit tests.
Object.defineProperty(window, "innerWidth", {
  configurable: true,
  writable: true,
  value: 1280,
});

Object.defineProperty(window, "innerHeight", {
  configurable: true,
  writable: true,
  value: 720,
});

// -----------------------------------------------------------------------------
// matchMedia
// -----------------------------------------------------------------------------
if (!window.matchMedia) {
  window.matchMedia = (query) => {
    let matches = false;
    const listeners = new Set();

    return {
      matches,
      media: query,
      onchange: null,
      addListener: (listener) => listeners.add(listener),
      removeListener: (listener) => listeners.delete(listener),
      addEventListener: (_event, listener) => listeners.add(listener),
      removeEventListener: (_event, listener) => listeners.delete(listener),
      dispatchEvent: (event) => {
        listeners.forEach((listener) => listener(event));
        return true;
      },
      /**
 * @description Test-only helper used by explicit matchMedia overrides when needed. Kept here so unsupported environments still expose a stable shape. /
 */
      __setMatches(nextValue) {
        matches = !!nextValue;
      },
    };
  };
}

// -----------------------------------------------------------------------------
// ResizeObserver
// -----------------------------------------------------------------------------
if (!globalThis.ResizeObserver) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  globalThis.ResizeObserver = ResizeObserver;
}

// -----------------------------------------------------------------------------
// IntersectionObserver
// -----------------------------------------------------------------------------
if (!globalThis.IntersectionObserver) {
  class IntersectionObserver {
    constructor(callback, options = {}) {
      this.callback = callback;
      this.options = options;
      this.elements = new Set();
    }

    observe = (element) => {
      this.elements.add(element);
    };

    unobserve = (element) => {
      this.elements.delete(element);
    };

    disconnect = () => {
      this.elements.clear();
    };

    takeRecords = () => [];
  }

  globalThis.IntersectionObserver = IntersectionObserver;
}

// -----------------------------------------------------------------------------
// Scroll APIs
// -----------------------------------------------------------------------------
if (!window.scrollTo) {
  window.scrollTo = () => {};
}

if (!HTMLElement.prototype.scrollIntoView) {
  // eslint-disable-next-line no-extend-native
  HTMLElement.prototype.scrollIntoView = () => {};
}

// -----------------------------------------------------------------------------
// JSDOM navigation noise
// -----------------------------------------------------------------------------
// JSDOM fires "Not implemented: navigation to another Document" directly to
// the process stderr stream (not through the captured console) whenever a
// rendered page contains external <a href> links. This is expected and
// harmless; suppress it so it doesn't pollute the test tail output.
{
  const _notImplementedPattern = /Not implemented: navigation to another Document/i;
  const _stderrWrite = process.stderr.write.bind(process.stderr);
  process.stderr.write = (chunk, encodingOrCb, cb) => {
    if (typeof chunk === "string" && _notImplementedPattern.test(chunk)) {
      if (typeof encodingOrCb === "function") encodingOrCb();
      else if (typeof cb === "function") cb();
      return true;
    }
    return _stderrWrite(chunk, encodingOrCb, cb);
  };
}

// -----------------------------------------------------------------------------
// Clipboard
// -----------------------------------------------------------------------------
if (!navigator.clipboard) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: {
      writeText: vi.fn(() => Promise.resolve()),
    },
  });
}
