/**
 * @file navigation.types.js
 * @description Shared navigation-related type definitions used across the
 * section registry, scroll persistence, and navigation components.
 * @module types/navigation
 */

/**
 * Represents a single navigable section registered with the application.
 *
 * @typedef {Object} NavigationSection
 * @property {string} id - Unique identifier for the section (used as anchor/hash).
 * @property {string} label - Human-readable label displayed in navigation UI.
 * @property {number} order - Sort order determining vertical and nav placement.
 * @property {HTMLElement|null} element - DOM element associated with the section.
 * @property {boolean} [hidden] - Whether the section should be excluded from nav.
 */

/**
 * Map of section IDs to their registered section metadata.
 *
 * @typedef {Object.<string, NavigationSection>} SectionRegistry
 */

/**
 * Describes the scroll position state persisted between navigations.
 *
 * @typedef {Object} ScrollPositionState
 * @property {number} x - Horizontal scroll offset.
 * @property {number} y - Vertical scroll offset.
 * @property {string} pathname - Pathname associated with the saved position.
 */

/**
 * Function signature used to register a section with the registry.
 *
 * @callback RegisterSection
 * @param {NavigationSection} section - Section metadata to register.
 * @returns {void}
 */

/**
 * Function signature used to unregister a section from the registry.
 *
 * @callback UnregisterSection
 * @param {string} sectionId - ID of the section to remove.
 * @returns {void}
 */
