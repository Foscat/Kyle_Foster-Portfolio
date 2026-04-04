/**
 * @file useBreakpoint.js
 * @description React hook for responsive breakpoint detection using window.matchMedia.
 * Provides a simple API to determine if the user is on mobile, tablet, or desktop.
 * This hook listens for changes in viewport size and updates the breakpoint state accordingly.
 * It is designed to be used in any component that needs to adapt its layout or behavior
 * based on the current screen size.
 *
 * Breakpoints:
 * - Mobile: max-width 768px
 * - Tablet: min-width 769px and max-width 1024px
 * @module assets/hooks/useBreakpoint
 */

import { useEffect, useState } from "react";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";

/// Define breakpoint queries

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
};

export const SPACING_SCALE = {
  mobile: {
    section: "1.25rem",
    gutter: "1rem",
    cardPadding: "1rem",
  },
  tablet: {
    section: "2rem",
    gutter: "1.5rem",
    cardPadding: "1.25rem",
  },
  desktop: {
    section: "3rem",
    gutter: "2rem",
    cardPadding: "1.5rem",
  },
};

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(min-width: ${BREAKPOINTS.mobile + 1}px) and (max-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.tablet + 1}px)`,
  portrait: "(orientation: portrait)",
  landscape: "(orientation: landscape)",
};

/**
 * @function getBreakpoint
 * @description Helper function that checks the current viewport width against defined breakpoints using media queries. It returns a string indicating the current breakpoint category: "mobile", "tablet", or "desktop". This function is used internally by the `useBreakpoint` hook to determine the initial breakpoint state and to update it when the viewport size changes.
 * @returns {string} The current breakpoint: "mobile", "tablet", or "desktop"
 * Note: This function is designed to be called in a browser environment where window.matchMedia is available.
 * In server-side rendering contexts, it will default to "desktop" to avoid errors.
 */
function getBreakpoint() {
  if (typeof window === "undefined") return "desktop";

  // Check breakpoints in order of specificity (mobile → tablet → desktop)
  if (window.matchMedia(MEDIA_QUERIES.mobile).matches) return "mobile";
  if (window.matchMedia(MEDIA_QUERIES.tablet).matches) return "tablet";
  return "desktop";
}

/**
 * @function getOrientation
 * @description
 * Helper function that checks the current viewport orientation using media queries.
 * @returns {string} The current orientation: "portrait" or "landscape"
 * Note: This function is designed to be called in a browser environment where window.matchMedia is available.
 * In server-side rendering contexts, it will default to "landscape" to avoid errors.
 * This is a common assumption since many desktop environments are landscape-oriented.
 */
function getOrientation() {
  if (typeof window === "undefined") return "landscape";

  if (window.matchMedia(MEDIA_QUERIES.portrait).matches) return "portrait";
  return "landscape";
}

/**
 * @typedef {Object} BreakpointState
 * @property {string} breakpoint - The current breakpoint ("mobile", "tablet", "desktop")
 * @property {string} orientation - The current orientation ("portrait", "landscape")
 * @property {boolean} isMobile - True if the current breakpoint is "mobile"
 * @property {boolean} isTablet - True if the current breakpoint is "tablet"
 * @property {boolean} isDesktop - True if the current breakpoint is "desktop"
 * @property {boolean} isPortrait - True if the current orientation is "portrait"
 * @property {boolean} isLandscape - True if the current orientation is "landscape"
 */

/**
 * @@function useBreakpoint
 * @description
 * Custom React hook that provides responsive breakpoint and orientation information based on window.matchMedia.
 * It returns the current breakpoint and orientation, along with boolean flags for convenience.
 * The hook listens for changes in viewport size and orientation, updating the state accordingly.
 * It is designed to be used in any component that needs to adapt its layout or behavior based on the current screen size and orientation.
 *
 * @returns {BreakpointState} An object containing the current breakpoint and orientation, along with boolean flags for each.
 * The hook listens for changes in viewport size and orientation, updating the state accordingly.
 * It is designed to be used in any component that needs to adapt its layout or behavior based on the current screen size and orientation.
 */
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);
  const [orientation, setOrientation] = useState(getOrientation);

  // Set up event listeners for viewport changes
  useEffect(() => {
    const mediaQueries = Object.values(MEDIA_QUERIES).map((query) => {
      // Create a MediaQueryList for each query and set up a listener to update state on changes
      const mq = window.matchMedia(query);
      const listener = () => {
        setBreakpoint(getBreakpoint());
        setOrientation(getOrientation());
      };
      // Listen for changes in the media query status
      mq.addEventListener("change", listener);
      return { mq, listener };
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      mediaQueries.forEach(({ mq, listener }) => mq.removeEventListener("change", listener));
    };
  }, []);

  // Return the current breakpoint and orientation, along with boolean flags for convenience
  return {
    breakpoint,
    orientation,
    isMobile: breakpoint === "mobile",
    isTablet: breakpoint === "tablet",
    isDesktop: breakpoint === "desktop",
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
  };
}

/**
 * @typedef {Object} ResponsiveValues
 * @property {*} [mobile] - Value returned when mobile breakpoint is active.
 * @property {*} [tablet] - Value returned when tablet breakpoint is active.
 * @property {*} [desktop] - Value returned when desktop breakpoint is active.
 */

/**
 * @function useResponsiveValue
 * @description
 * Custom React hook that returns a value based on the current responsive breakpoint.
 * It accepts an object with optional values for mobile, tablet, and desktop breakpoints.
 * The hook uses the `useBreakpoint` hook to determine the current breakpoint and returns
 * the corresponding value, falling back to smaller breakpoints if a value is not provided.
 *

 * @param {ResponsiveValues} values
 *
 * @returns {*} Responsive value for the current breakpoint.
 */
function useResponsiveValue(values) {
  const { breakpoint } = useResponsive();

  if (breakpoint === "mobile" && values.mobile !== undefined) return values.mobile;

  if (breakpoint === "tablet") {
    if (values.tablet !== undefined) return values.tablet;
    if (values.mobile !== undefined) return values.mobile;
  }

  if (breakpoint === "desktop") {
    if (values.desktop !== undefined) return values.desktop;
    if (values.tablet !== undefined) return values.tablet;
    if (values.mobile !== undefined) return values.mobile;
  }

  return undefined;
}

export { useBreakpoint, useResponsiveValue, getBreakpoint, getOrientation };
export default useBreakpoint;
