/**
 * @file chunkLoadRecovery.test.js
 * @description Unit tests for chunk load recovery detection and one-time reload behavior.
 * @module assets/chunkLoadRecovery.test
 */

import { describe, expect, it, vi } from "vitest";
import { installChunkLoadRecovery, isLikelyChunkLoadFailure } from "./chunkLoadRecovery";

function createMockWindow() {
  const listeners = new Map();
  const storage = new Map();

  return {
    location: {
      reload: vi.fn(),
    },
    sessionStorage: {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      },
      removeItem(key) {
        storage.delete(key);
      },
    },
    addEventListener(type, handler) {
      const existing = listeners.get(type) || [];
      listeners.set(type, [...existing, handler]);
    },
    removeEventListener(type, handler) {
      const existing = listeners.get(type) || [];
      listeners.set(
        type,
        existing.filter((candidate) => candidate !== handler)
      );
    },
    emit(type, event) {
      const registered = listeners.get(type) || [];
      registered.forEach((handler) => handler(event));
    },
  };
}

describe("chunkLoadRecovery", () => {
  it("detects dynamic import failure messages", () => {
    expect(
      isLikelyChunkLoadFailure({
        message: "Failed to fetch dynamically imported module",
      })
    ).toBe(true);
  });

  it("detects missing hashed asset scripts by URL", () => {
    expect(
      isLikelyChunkLoadFailure({
        filename: "https://beta.example.com/assets/ui-BOIkBqnZ.js",
      })
    ).toBe(true);
  });

  it("ignores extension-only errors", () => {
    expect(
      isLikelyChunkLoadFailure({
        filename: "chrome-extension://cbnpimmlikdmfccbjhbjlmonkehnlofh/user_style.js",
        message: "Cannot read properties of null (reading 'querySelector')",
      })
    ).toBe(false);
  });

  it("reloads only once per session on repeated recoverable failures", () => {
    const mockWindow = createMockWindow();
    installChunkLoadRecovery({ win: mockWindow, maxReloads: 1 });

    mockWindow.emit("error", {
      message: "",
      filename: "https://beta.example.com/assets/ui-BOIkBqnZ.js",
      target: { src: "https://beta.example.com/assets/ui-BOIkBqnZ.js" },
    });

    mockWindow.emit("error", {
      message: "",
      filename: "https://beta.example.com/assets/ui-BOIkBqnZ.js",
      target: { src: "https://beta.example.com/assets/ui-BOIkBqnZ.js" },
    });

    expect(mockWindow.location.reload).toHaveBeenCalledTimes(1);
  });
});
