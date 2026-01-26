/**
 * @file sectionPersistence.js
 * @description Utilities for persisting and restoring the user's last active
 * section on a per-page basis using sessionStorage.
 * @module navigation/sectionPersistence
 */

const sessionStorage = window.sessionStorage;

/**
 * Generates a storage key scoped to the current page pathname.
 *
 * This ensures section state is isolated per route and does not leak
 * across different pages within the application.
 *
 * @returns {string} Namespaced sessionStorage key.
 */
const getPageKey = () => `section:last:${window.location.pathname}`;

/**
 * Persists the currently active section ID for the current page.
 *
 * Intended to be called by scroll-spy or navigation logic whenever the
 * active section changes.
 *
 * No-op if a falsy section ID is provided.
 *
 * @public
 * @param {string} sectionId - ID of the active section to persist.
 * @returns {void}
 */
export const saveLastSection = (sectionId) => {
  if (!sectionId) return;
  sessionStorage.setItem(getPageKey(), sectionId);
};

/**
 * Loads the last persisted section ID for the current page.
 *
 * Returns `null` if no section has been saved for the current route.
 *
 * @public
 * @returns {string | null} Previously saved section ID, if available.
 */
export const loadLastSection = () => {
  return sessionStorage.getItem(getPageKey());
};
