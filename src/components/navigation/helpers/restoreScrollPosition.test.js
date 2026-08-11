/**
 * @file restoreScrollPosition.test.js
 * @description Covers explicit deep-link restoration without stale session jumps.
 * @module components/navigation/helpers/tests
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import restoreScrollPosition from "./restoreScrollPosition";

describe("restoreScrollPosition", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/case-study");
    sessionStorage.clear();
    window.__DISABLE_RESTORE_SCROLL_POSITION__ = false;
    window.requestAnimationFrame = vi.fn((callback) => callback());
  });

  it("does not jump to a section saved during an earlier visit", () => {
    const savedSection = document.createElement("section");
    savedSection.id = "saved-section";
    savedSection.scrollIntoView = vi.fn();
    document.body.append(savedSection);
    sessionStorage.setItem("section:last:/case-study", "saved-section");

    restoreScrollPosition();

    expect(savedSection.scrollIntoView).not.toHaveBeenCalled();
    savedSection.remove();
  });

  it("restores an explicit hash destination", () => {
    const linkedSection = document.createElement("section");
    linkedSection.id = "linked-section";
    linkedSection.scrollIntoView = vi.fn();
    document.body.append(linkedSection);
    window.history.replaceState({}, "", "/case-study#linked-section");

    restoreScrollPosition();

    expect(linkedSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    linkedSection.remove();
  });
});
