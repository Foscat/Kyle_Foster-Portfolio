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
 * Context value exposed by SectionRegistryProvider.
 *
 * @typedef {object} SectionRegistryContextValue
 * @property {(id: string, meta: SectionMeta) => void} registerSection
 * @property {(id: string) => void} unregisterSection
 * @property {() => SectionMeta[]} getSections
 */
