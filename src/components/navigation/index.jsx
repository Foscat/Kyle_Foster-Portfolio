/**
 * @file index.jsx
 * @fileoverview Centralized export module for all navigation-related components and helpers. This file serves as a single point of import for all navigation elements across the codebase, promoting modularity and ease of maintenance.
 *
 * Note: When adding new navigation components or helpers, simply import them here and include them in the export statement.
 * @module components/navigation
 */

import { lazy, Suspense } from "react";
import React from "react";
import restoreScrollPosition from "./helpers/restoreScrollPosition";
import { saveLastSection, loadLastSection } from "./helpers/sectionPersistence";

/**
 * @function withLazySuspense
 * @description Higher-order component that wraps a lazy-loaded component with React's Suspense for code-splitting and performance optimization.
 * HOC to wrap a lazy-loaded component with Suspense.
 * This allows us to keep the benefits of code-splitting while maintaining a clean and consistent import pattern across our navigation components.
 *
 * @param {Function} loader - Function that dynamically imports the component.
 * @param {string} displayName - Display name for the wrapped component.
 * @returns {React.ComponentType} - Wrapped component with Suspense.
 *
 * @example
 * ```js
 * const LazyComponent = withLazySuspense(() => import("./MyComponent"), "MyComponent");
 * ```
 */
const withLazySuspense = (loader, displayName) => {
  const LazyComponent = lazy(loader);

  const WrappedComponent = (props) => (
    <Suspense fallback={null}>
      <LazyComponent {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = displayName;
  return WrappedComponent;
};

// Lazy-loaded navigation components wrapped with Suspense for performance optimization.
const Footer = withLazySuspense(() => import("./Footer"), "Footer");
const Head = withLazySuspense(() => import("./Head"), "Head");
const MobileSectionNavTrigger = withLazySuspense(
  () => import("./MobileSectionNavTrigger"),
  "MobileSectionNavTrigger"
);
const SectionAnchorNav = withLazySuspense(() => import("./SectionAnchorNav"), "SectionAnchorNav");
const StickyNav = withLazySuspense(() => import("./StickyNav"), "StickyNav");
const StickySectionNav = withLazySuspense(() => import("./StickySectionNav"), "StickySectionNav");

// Exporting all navigation components and helpers from a single module for easy imports across the codebase.
const helpers = {
  restoreScrollPosition,
  saveLastSection,
  loadLastSection,
};

export {
  Footer,
  Head,
  MobileSectionNavTrigger,
  SectionAnchorNav,
  StickyNav,
  StickySectionNav,
  helpers,
};
