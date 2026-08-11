/**
 * @file src\components\navigation\helpers\restoreScrollPosition.js
 * @description src\components\navigation\helpers\restoreScrollPosition module.
 * @module src\components\navigation\helpers\restoreScrollPosition
 */

/**
 * @file restoreScrollPosition.js
 * @description Restores the user's scroll position when a page is loaded
 * or reloaded by resolving a target section and scrolling it into view.
 * @module navigation/restoreScrollPosition
 */

/**
 * Restores the user's scroll position when a page is loaded or reloaded.
 *
 * Resolution rule:
 * - Restore only an explicit URL hash (deep link or manual navigation).
 *
 * Behavior:
 * - Reads the current location hash, if present
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
const restoreScrollPosition = () => {
  if (window.__DISABLE_RESTORE_SCROLL_POSITION__) return;

  // Explicit hashes are stable, shareable navigation intent. Session state is
  // intentionally excluded so returning visitors still see a page's header.
  const hashId = window.location.hash.replace("#", "");
  if (!hashId) return;

  // Locate the target section element
  const el = document.getElementById(hashId);
  if (!el) return;

  // Defer scrolling until the browser has completed layout
  requestAnimationFrame(() => {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
};

export default restoreScrollPosition;
