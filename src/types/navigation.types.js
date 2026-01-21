/**
 * @module types/navigation
 * @public
 */

/**
 * Metadata describing a registered page section.
 *
 * @typedef {object} SectionMeta
 * @property {string} id - Unique section identifier (must match DOM id).
 * @property {string} title - Human-readable title for navigation.
 */

/**
 * SectionRegistry API
 * ------------------------------------------------------------
 * Interface describing the section registry used for scroll-spy
 * navigation and section coordination.
 *
 * @typedef {Object} SectionRegistry
 *
 * @property {function(string, SectionMeta): void} registerSection
 *   Registers a section with its metadata.
 *
 * @property {function(string): void} unregisterSection
 *   Unregisters a section by ID.
 *
 * @property {function(): Array<SectionMeta>} getSections
 *   Returns all registered section metadata in order.
 */
