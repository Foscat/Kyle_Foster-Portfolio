/**
 * Generate a storage key for the current page.
 *
 * @returns {string}
 */
const getPageKey = () => `section:last:${window.location.pathname}`;

/**
 * Save the active section for the current page.
 *
 * @param {string} sectionId
 */
export const saveLastSection = (sectionId) => {
  if (!sectionId) return;
  sessionStorage.setItem(getPageKey(), sectionId);
};

/**
 * Load the last active section for the current page.
 *
 * @returns {string | null}
 */
export const loadLastSection = () => {
  return sessionStorage.getItem(getPageKey());
};
