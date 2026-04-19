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
  const location = {
    href: "https://beta.example.com/?foo=bar",
    reload: vi.fn(),
    replace: vi.fn(),
  };
  const history = {
    state: null,
    replaceState: vi.fn(),
  };

  return {
    location,
    history,
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

  it("detects missing hashed asset scripts by target src", () => {
    expect(
      isLikelyChunkLoadFailure({
        targetSrc: "https://beta.example.com/assets/ui-BOIkBqnZ.js",
        isScriptLoadEvent: true,
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

  it("ignores regular runtime errors from bundled assets", () => {
    expect(
      isLikelyChunkLoadFailure({
        filename: "https://beta.example.com/assets/index-BOIkBqnZ.js",
        message: "Cannot read properties of null (reading 'querySelector')",
      })
    ).toBe(false);
  });

  it("reloads only once per session on repeated recoverable failures", () => {
    const mockWindow = createMockWindow();
    installChunkLoadRecovery({ win: mockWindow, maxReloads: 1, now: () => 12345 });

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

    expect(mockWindow.location.replace).toHaveBeenCalledTimes(1);
    expect(mockWindow.location.replace).toHaveBeenCalledWith(
      "https://beta.example.com/?foo=bar&chunk-recover=12345"
    );
    expect(mockWindow.location.reload).not.toHaveBeenCalled();
  });

  it("does not reset reload attempts on subsequent successful loads", () => {
    const mockWindow = createMockWindow();
    installChunkLoadRecovery({ win: mockWindow, maxReloads: 1, now: () => 12345 });

    mockWindow.emit("error", {
      message: "",
      filename: "https://beta.example.com/assets/ui-BOIkBqnZ.js",
      target: { src: "https://beta.example.com/assets/ui-BOIkBqnZ.js" },
    });
    mockWindow.emit("load", {});
    mockWindow.emit("error", {
      message: "",
      filename: "https://beta.example.com/assets/ui-BOIkBqnZ.js",
      target: { src: "https://beta.example.com/assets/ui-BOIkBqnZ.js" },
    });

    expect(mockWindow.location.replace).toHaveBeenCalledTimes(1);
  });

  it("clears recovery query params from the address bar after a successful load", () => {
    const mockWindow = createMockWindow();
    mockWindow.location.href = "https://beta.example.com/path?chunk-recover=12345#section-1";

    installChunkLoadRecovery({ win: mockWindow, maxReloads: 1 });
    mockWindow.emit("load", {});

    expect(mockWindow.history.replaceState).toHaveBeenCalledTimes(1);
    expect(mockWindow.history.replaceState).toHaveBeenCalledWith(null, "", "/path#section-1");
  });
});
