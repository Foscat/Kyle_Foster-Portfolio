/**
 * @file src\assets\context\SectionRegistryProvider.jsx
 * @description src\assets\context\SectionRegistryProvider module.
 * @module src\assets\context\SectionRegistryProvider
 */

import React, { createContext, useContext, useRef } from "react";

/**
 * @file SectionRegistryProvider.jsx
 * @description Provides a centralized registry for page sections so navigation
 * systems (e.g., sticky navigation, scroll-spy) can dynamically discover and
 * track registered sections.
 * @module assets/context/SectionRegistryProvider
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
 * @function SectionRegistryProvider
 * @description React context provider component that manages a registry of page sections. This provider maintains an internal Map of registered sections, allowing components to register and unregister sections dynamically as they mount and unmount. The provider exposes a context value with functions to register/unregister sections and retrieve the current list of registered sections. By wrapping the app (or relevant parts of it) with this provider, we enable features like dynamic navigation generation and scroll-spy behavior based on the registered sections.
 * @public
 * @component
 * @param {{ children: React.ReactNode }} props - Provider props.
 * @returns {JSX.Element} Context provider wrapping child components.
 */
function SectionRegistryProvider({ children }) {
  // Internal registry of sections, stored in a ref to avoid triggering re-renders when updated. The Map allows for efficient lookups and maintains insertion order, which can be useful for rendering navigation links in the order sections were registered. The registry is keyed by unique section IDs and stores metadata about each section, such as its title and associated DOM element. By using a ref, we can update the registry imperatively without causing the provider to re-render, which optimizes performance when sections are registered or unregistered dynamically.
  const sectionsRef = useRef(new Map());

  /**
   * @function registerSection
   * @description Registers a section with the registry. This function is intended to be called by section components (e.g., SectionRenderer) when they mount to add themselves to the registry. It takes a unique section ID and associated metadata, and stores it in the internal Map. If an attempt is made to register a section without an ID or with a duplicate ID, it will emit a warning in development mode to help catch potential issues with section management.
   * @param {string} id - Unique identifier for the section being registered.
   * @param {SectionMeta} meta - Metadata describing the section (e.g., title, element).
   * @returns {void} This function does not return any value.
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
   * @function unregisterSection
   * @description Removes a section from the registry by its ID. This function is intended to be called when a section component unmounts to ensure that the registry stays up-to-date with the currently rendered sections on the page. It performs a simple deletion from the internal Map of sections based on the provided ID. If the ID does not exist in the registry, it will simply do nothing, allowing for safe calls even if there are issues with section lifecycle management.
   * @param {string} id - The unique identifier of the section to be removed from the registry.
   * @returns {void} This function does not return any value.
   */
  const unregisterSection = (id) => {
    sectionsRef.current.delete(id);
  };

  /**
   * @function getSections
   * @description Retrieves all registered sections in insertion order. This function converts the internal Map of sections to an array of section metadata objects. In development mode, it emits a warning if no sections are registered, which can help catch incorrect usage of the SectionRenderer component that is responsible for registering sections. By providing a getSections function, we allow consuming components (like navigation systems) to access the current list of registered sections and render navigation links or perform scroll-spy behavior accordingly.
   * @returns {SectionMeta[]} Array of registered section metadata.
   * @throws Will not throw errors, but will emit a warning in development mode if no sections are registered. This is to help developers catch potential issues with section registration.
   */
  const getSections = () => {
    const values = Array.from(sectionsRef.current.values());

    if (import.meta.env.DEV && values.length === 0) {
      console.warn(
        "[SectionRegistry] No sections registered. " +
          "Did you forget to render <SectionRenderer /> components?"
      );
    } else if (import.meta.env.DEV) {
      console.debug(`[SectionRegistry] Returning ${values.length} registered section(s).`, values);
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

/**
 * @function useSectionRegistry
 * @description Hook for accessing the Section Registry context.
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

export { SectionRegistryProvider };
export default SectionRegistryProvider;
