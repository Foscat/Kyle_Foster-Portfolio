import { loadLastSection } from "@/navigation/sectionPersistence";

/**
 * restoreScrollPosition
 * ---------------------------------------------------------------------------
 * Restores the user’s scroll position when a page is loaded or reloaded.
 *
 * Resolution order:
 * 1. URL hash (deep link / manual navigation)
 * 2. Persisted section state from previous session
 *
 * Behavior:
 * - Reads the current location hash, if present
 * - Falls back to the last saved section ID
 * - Smoothly scrolls the resolved section into view
 *
 * Design notes:
 * - URL hash is treated as the source of truth to support deep linking
 * - Uses `requestAnimationFrame` to ensure DOM layout is complete
 *   before attempting to scroll
 * - No-op if no valid section can be resolved
 *
 * Typical usage:
 * - Called once during page or application bootstrap
 * - Works in conjunction with scroll-spy and section persistence hooks
 *
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
