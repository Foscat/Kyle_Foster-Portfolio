import React, { createContext, useContext, useRef } from "react";
/**
 * @module navigation/SectionRegistry
 * @public
 */

/**
 * @typedef {SectionMeta} SectionMeta
 * @typedef {SectionRegistryContextValue} SectionRegistryContextValue
 */

/**
 * Internal React context for section registry.
 * @type {React.Context<SectionRegistryContextValue | null>}
 */
const SectionRegistryContext = createContext(null);

/**
 * SectionRegistryProvider
 * ---------------------------------------------------------------------------
 * Provides a centralized registry for page sections so that navigation
 * components (e.g., sticky nav, scroll-spy) can discover sections automatically.
 *
 * Features:
 * - Runtime duplicate ID protection
 * - Dev-only warnings for incorrect usage
 * - Stable registry backed by useRef (no rerenders)
 *
 * @public
 * @component
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
function SectionRegistryProvider({ children }) {
  /** @type {React.MutableRefObject<Map<string, SectionMeta>>} */
  const sectionsRef = useRef(new Map());

  /**
   * Register a section with the registry.
   *
   * @param {string} id
   * @param {SectionMeta} meta
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
   * Unregister a section from the registry.
   *
   * @param {string} id
   */
  const unregisterSection = (id) => {
    sectionsRef.current.delete(id);
  };

  /**
   * Get all registered sections in insertion order.
   *
   * @returns {SectionMeta[]}
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
 * Hook to access the Section Registry context.
 *
 * @public
 * @returns {SectionRegistryContextValue}
 * @throws {Error} If used outside of SectionRegistryProvider.
 *
 * ----------------------------------------------------------------------------
 *
 * @example
 * ```js
 * const { registerSection } = useSectionRegistry();
 *
 * useEffect(() => {
 *   registerSection("about", { id: "about", title: "About Me" });
 * }, []);
 */
export const useSectionRegistry = () => {
  const ctx = useContext(SectionRegistryContext);

  if (!ctx) {
    throw new Error("useSectionRegistry must be used within <SectionRegistryProvider />");
  }

  return ctx;
};
