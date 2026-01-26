import React, { createContext, useContext, useRef } from "react";

/**
 * @file SectionRegistryProvider.jsx
 * @description Provides a centralized registry for page sections so navigation
 * systems (e.g., sticky navigation, scroll-spy) can dynamically discover and
 * track registered sections.
 * @module navigation/SectionRegistryProvider
 */

/**
 * @callback RegisterSection
 * @param {string} id - Unique section identifier.
 * @param {SectionMeta} meta - Section metadata.
 * @returns {void}
 */

/**
 * @callback UnregisterSection
 * @param {string} id - Section identifier to remove.
 * @returns {void}
 */

/**
 * @callback GetSections
 * @returns {SectionMeta[]} Ordered list of registered sections.
 */

/**
 * @typedef {Object} SectionMeta
 * @description Metadata describing a registered page section.
 *
 * @property {string} id - Unique identifier for the section.
 * @property {string} [title] - Human-readable section title.
 * @property {HTMLElement} [element] - DOM element associated with the section.
 * @property {number} [order] - Optional ordering hint for navigation.
 */

/**
 * @typedef {Object} SectionRegistryContextValue
 * @description Public API exposed by the Section Registry context.
 *
 * @property {RegisterSection} registerSection - Registers a section.
 * @property {UnregisterSection} unregisterSection - Unregisters a section.
 * @property {GetSections} getSections - Returns all registered sections.
 */

/**
 * Internal React context for the section registry.
 * The context value is intentionally nullable to enforce provider usage.
 *
 * @type {React.Context<SectionRegistryContextValue | null>}
 */
const SectionRegistryContext = createContext(null);

/**
 * SectionRegistryProvider
 * ---------------------------------------------------------------------------
 * Provides a centralized registry for page sections so that navigation
 * components (e.g., sticky navigation, scroll-spy) can discover sections
 * automatically at runtime.
 *
 * Design notes:
 * - Uses a Map stored in a ref to avoid unnecessary re-renders
 * - Enforces unique section IDs per page
 * - Emits development-only warnings for incorrect usage
 *
 * @public
 * @component
 * @param {{ children: React.ReactNode }} props - Provider props.
 * @returns {JSX.Element} Context provider wrapping child components.
 */
function SectionRegistryProvider({ children }) {
  /**
   * Internal registry of section metadata keyed by section ID.
   * Stored in a ref to ensure stable identity across renders.
   *
   * @type {React.MutableRefObject<Map<string, SectionMeta>>}
   */
  const sectionsRef = useRef(new Map());

  /**
   * Registers a section with the registry.
   *
   * Guardrails:
   * - No-op if no ID is provided
   * - Prevents duplicate IDs
   * - Emits warnings in development mode only
   *
   * @param {string} id - Unique section identifier.
   * @param {SectionMeta} meta - Metadata describing the section.
   * @returns {void}
   */
  const registerSection = (id, meta) => {
    if (!id) {
      if (import.meta.env.DEV) {
        console.warn("[SectionRegistry] Attempted to register a section without an id.", meta);
      }
      return;
    }

    if (sectionsRef.current.has(id)) {
      if (import.meta.env.DEV) {
        console.warn(
          `[SectionRegistry] Duplicate section id "${id}" detected. ` +
            "Each section id must be unique per page."
        );
      }
      return;
    }

    sectionsRef.current.set(id, meta);
  };

  /**
   * Unregisters a section from the registry.
   * Intended to be called during component unmount.
   *
   * @param {string} id - ID of the section to remove.
   * @returns {void}
   */
  const unregisterSection = (id) => {
    sectionsRef.current.delete(id);
  };

  /**
   * Returns all registered sections in insertion order.
   *
   * Emits a development-only warning if no sections are registered,
   * which typically indicates incorrect usage of SectionRenderer.
   *
   * @returns {SectionMeta[]} Array of registered section metadata.
   */
  const getSections = () => {
    const values = Array.from(sectionsRef.current.values());

    if (import.meta.env.DEV && values.length === 0) {
      console.warn(
        "[SectionRegistry] No sections registered. " +
          "Did you forget to render <SectionRenderer /> components?"
      );
    }

    return values;
  };

  return (
    <SectionRegistryContext.Provider
      value={{
        registerSection,
        unregisterSection,
        getSections,
      }}
    >
      {children}
    </SectionRegistryContext.Provider>
  );
}

export default SectionRegistryProvider;

/**
 * useSectionRegistry
 * ---------------------------------------------------------------------------
 * Hook for accessing the Section Registry context.
 *
 * This hook must be used within a SectionRegistryProvider.
 *
 * @public
 * @returns {SectionRegistryContextValue} Section registry API.
 * @throws {Error} If used outside of a SectionRegistryProvider.
 *
 * @example
 * ```js
 * const { registerSection } = useSectionRegistry();
 *
 * useEffect(() => {
 *   registerSection("about", { id: "about", title: "About Me" });
 * }, []);
 * ```
 */
export const useSectionRegistry = () => {
  const ctx = useContext(SectionRegistryContext);

  if (!ctx) {
    throw new Error("useSectionRegistry must be used within <SectionRegistryProvider />");
  }

  return ctx;
};
