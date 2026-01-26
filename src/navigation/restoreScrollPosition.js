import { loadLastSection } from "@/navigation/sectionPersistence";

/**
 * @file restoreScrollPosition.js
 * @description Restores the user's scroll position when a page is loaded
 * or reloaded by resolving a target section and scrolling it into view.
 * @module navigation/restoreScrollPosition
 */

/**
 * Restores the user's scroll position when a page is loaded or reloaded.
 *
 * Resolution order:
 * 1. URL hash (deep link or manual navigation)
 * 2. Persisted section state from a previous session
 *
 * Behavior:
 * - Reads the current location hash, if present
 * - Falls back to the last saved section ID
 * - Smoothly scrolls the resolved section into view
 *
 * Design notes:
 * - The URL hash is treated as the source of truth to support deep linking
 * - `requestAnimationFrame` is used to ensure DOM layout is complete
 *   before attempting to scroll
 * - Function exits early if no valid section can be resolved
 *
 * Typical usage:
 * - Invoked once during page or application bootstrap
 * - Works in conjunction with scroll-spy and section persistence utilities
 *
 * @public
 * @returns {void}
 */
export const restoreScrollPosition = () => {
  // Extract section ID from the URL hash (if present)
  const hashId = window.location.hash.replace("#", "");

  // Retrieve last persisted section ID from storage
  const savedId = loadLastSection();

  // Prefer URL hash over persisted state
  const targetId = hashId || savedId;
  if (!targetId) return;

  // Locate the target section element
  const el = document.getElementById(targetId);
  if (!el) return;

  // Defer scrolling until the browser has completed layout
  requestAnimationFrame(() => {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};
