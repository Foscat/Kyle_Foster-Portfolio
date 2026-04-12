/**
 * @module src\assets\context\responsive\ResponsiveProvider
 * @file ResponsiveProvider.jsx
 * @description React context provider for responsive design.
 * This component uses the useBreakpoint hook to determine the current screen size and orientation,
 * and provides this information to the rest of the app via context. It listens for window resize events
 * */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { ResponsiveContext } from "./ResponsiveContext";
import { MidnightGoldTheme } from "../../../theme/midnightGold.theme.js";

// Destructure breakpoints, spacing scale, and CSS variable mappings from the theme configuration. These values will be used for determining the current breakpoint and for syncing spacing tokens to CSS variables.
const { breakpoints, spacing: SPACING_SCALE, cssVars } = MidnightGoldTheme;
const A11Y_OVERRIDES_STORAGE_KEY = "portfolio-a11y-overrides";
const DEFAULT_A11Y_OVERRIDES = Object.freeze({
  reducedMotion: null,
  reducedTransparency: null,
  highContrast: null,
  largeText: false,
});

const sanitizeOverrideBoolean = (value) => {
  if (value === true || value === false || value === null) return value;
  return null;
};

const sanitizeStoredBoolean = (value, fallback = false) => {
  if (value === true || value === false) return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return fallback;
};

function getStoredA11yOverrides() {
  if (typeof window === "undefined") return { ...DEFAULT_A11Y_OVERRIDES };

  try {
    const raw = window.localStorage.getItem(A11Y_OVERRIDES_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_A11Y_OVERRIDES };

    const parsed = JSON.parse(raw);
    return {
      reducedMotion: sanitizeOverrideBoolean(parsed?.reducedMotion),
      reducedTransparency: sanitizeOverrideBoolean(parsed?.reducedTransparency),
      highContrast: sanitizeOverrideBoolean(parsed?.highContrast),
      largeText: sanitizeStoredBoolean(parsed?.largeText, false),
    };
  } catch {
    return { ...DEFAULT_A11Y_OVERRIDES };
  }
}

/**
 * @function getBreakpoint
 * @description Determines the current breakpoint based on the given width. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the width against defined breakpoints for mobile and tablet, and returns "mobile", "tablet", or "desktop" accordingly.
 * @param {number} width - The current width of the viewport.
 * @return {string} The current breakpoint ("mobile", "tablet", or "desktop").
 * @throws Will throw an error if width is not a number or if breakpoints are not defined properly.
 * @see useBreakpoint.js for the original breakpoint detection logic that this function replicates to avoid circular dependencies.
 */
function getBreakpoint(width) {
  if (width <= breakpoints.mobile) return "mobile";
  if (width <= breakpoints.tablet) return "tablet";
  return "desktop";
}

/**
 * @function getOrientation
 * @description Determines the current orientation of the viewport. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the orientation using the window.matchMedia API and returns "portrait" or "landscape" accordingly.
 * @return {string} The current orientation ("portrait" or "landscape").
 */
function getOrientation() {
  if (typeof window === "undefined") return "landscape";
  return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
}

/**
 * @function getReducedMotion
 * @description Determines if the user has requested reduced motion. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the prefers-reduced-motion media query and returns a boolean accordingly.
 * @return {boolean} True if the user has requested reduced motion, false otherwise.
 */
function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * @function getReducedTransparency
 * @description Determines if the user has requested reduced transparency. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the prefers-reduced-transparency media query and returns a boolean accordingly.
 * @return {boolean} True if the user has requested reduced transparency, false otherwise.
 */
function getReducedTransparency() {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia) return false;

  try {
    return window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * @function getHighContrast
 * @description Determines if the user has requested high contrast mode. This function replicates the logic from useBreakpoint.js to avoid circular dependencies. It checks the prefers-contrast and forced-colors media queries and returns a boolean accordingly.
 * @return {boolean} True if the user has requested high contrast mode, false otherwise.
 */
function getHighContrast() {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia) return false;

  const prefersMore = window.matchMedia("(prefers-contrast: more)").matches;
  const forcedColors = window.matchMedia("(forced-colors: active)").matches;

  return prefersMore || forcedColors;
}

/**
 * @function ResponsiveProvider
 * @description Provides responsive design context to the app, including current breakpoint, orientation, and spacing values.
 * Listens for window resize events and updates context values accordingly.
 * This allows any component in the app to access responsive information and adapt its layout or behavior based on screen size and orientation.
 *
 * @param {ReactNode} children - The child components that will have access to the responsive context values.
 * @returns {ReactNode} The context provider wrapping the child components.
 * @example
 * <ResponsiveProvider>
 *  <YourAppComponents />
 * </ResponsiveProvider>
 *
 * Note: This provider should be placed near the root of the component tree (e.g., in main.jsx) to ensure that all components can access the responsive context.
 * It is designed to be used in a browser environment where window.matchMedia and window.innerWidth are available. In server-side rendering contexts, it will default to "desktop" breakpoint and "landscape" orientation.
 * The spacing values provided in the context are based on the current breakpoint and can be used for consistent spacing throughout the app.
 * The provider also includes boolean flags (isMobile, isTablet, isDesktop, isPortrait, isLandscape) for easy conditional rendering based on the current responsive state.
 * The use of requestAnimationFrame in the resize handler helps to optimize performance by batching state updates and avoiding excessive re-renders during rapid resize events.
 * Cleanup of event listeners and animation frames is handled in the useEffect cleanup function to prevent memory leaks.
 * Overall, this provider centralizes responsive design logic and makes it easily accessible throughout the app, promoting a consistent and adaptive user experience across different devices and screen sizes.
 * @throws Will throw an error if the provider is used in a non-browser environment without appropriate fallbacks for window properties.
 * @see useBreakpoint.js for the original breakpoint and orientation detection logic that this provider replicates to avoid circular dependencies.
 */
export function ResponsiveProvider({ children }) {
  const frameRef = useRef(null);

  const getInitialWidth = () => (typeof window !== "undefined" ? window.innerWidth : 0);

  const [width, setWidth] = useState(getInitialWidth);
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(getInitialWidth()));
  const [orientation, setOrientation] = useState(getOrientation);

  const [systemReducedMotion, setSystemReducedMotion] = useState(getReducedMotion);
  const [systemReducedTransparency, setSystemReducedTransparency] =
    useState(getReducedTransparency);
  const [systemHighContrast, setSystemHighContrast] = useState(getHighContrast);
  const [a11yOverrides, setA11yOverrides] = useState(getStoredA11yOverrides);

  const reducedMotion = a11yOverrides.reducedMotion ?? systemReducedMotion;
  const reducedTransparency = a11yOverrides.reducedTransparency ?? systemReducedTransparency;
  const highContrast = a11yOverrides.highContrast ?? systemHighContrast;
  const largeText = Boolean(a11yOverrides.largeText);

  // Listen for window resize events and update state accordingly
  useEffect(() => {
    /**
     * @function handleResize
     * @description Event handler for window resize events. This function uses requestAnimationFrame to optimize performance by batching state updates and avoiding excessive re-renders during rapid resize events. When the window is resized, it updates the width, breakpoint, and orientation state based on the new window dimensions.
     * @throws Will throw an error if window properties are not available (e.g., in a non-browser environment), but this is mitigated by the initial state setup that defaults to safe values when window is undefined.
     */
    const handleResize = () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      // Schedule an update on the next animation frame to avoid excessive re-renders during rapid resize events
      frameRef.current = requestAnimationFrame(() => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
        setBreakpoint(getBreakpoint(newWidth));
        setOrientation(getOrientation());
      });
    };

    // Listen for changes in the prefers-reduced-motion media query to update reducedMotion state
    const mqReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Reduced transparency query may be unsupported; guard it.
    let mqReducedTransparency = null;
    try {
      mqReducedTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)");
    } catch {
      mqReducedTransparency = null;
    }

    const mqPrefersContrastMore = window.matchMedia("(prefers-contrast: more)");
    const mqForcedColors = window.matchMedia("(forced-colors: active)");

    // Add event listener for window resize

    /**
     * @function handleMotionChange
     * @description Event handler for changes in the prefers-reduced-motion media query. Updates the reducedMotion state based on the media query's match status.
     * @param {MediaQueryListEvent} e - The media query change event.
     */
    const handleMotionChange = (e) => setSystemReducedMotion(e.matches);
    /**
     * @function handleTransparencyChange
     * @description Event handler for changes in the prefers-reduced-transparency media query. Updates the reducedTransparency state based on the media query's match status.
     * @param {MediaQueryListEvent} e - The media query change event.
     */
    const handleTransparencyChange = (e) => setSystemReducedTransparency(!!e.matches);
    /**
     * @function handleContrastChange
     * @description Event handler for changes in the prefers-contrast: more or forced-colors: active media queries. Updates the highContrast state based on the current media query match status.
     */
    const handleContrastChange = () => setSystemHighContrast(getHighContrast());

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    mqReducedMotion.addEventListener("change", handleMotionChange);

    // Since reduced transparency may not be supported, we check if the media query exists before adding a listener. If it doesn't exist, we won't be able to listen for changes, but we also won't throw an error.
    if (mqReducedTransparency)
      mqReducedTransparency?.addEventListener("change", handleTransparencyChange);

    // Since high contrast mode can be indicated by either prefers-contrast: more or forced-colors: active, we need to listen to both and update state accordingly.
    mqPrefersContrastMore.addEventListener("change", handleContrastChange);
    mqForcedColors.addEventListener("change", handleContrastChange);

    // Initial check in case the user has a reduced motion preference set on page load
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      mqReducedMotion.removeEventListener("change", handleMotionChange);
      if (mqReducedTransparency)
        mqReducedTransparency.removeEventListener("change", handleTransparencyChange);

      mqPrefersContrastMore.removeEventListener("change", handleContrastChange);
      mqForcedColors.removeEventListener("change", handleContrastChange);
    };
  }, []);

  const setReducedMotionOverride = useCallback((value) => {
    setA11yOverrides((prev) => ({ ...prev, reducedMotion: sanitizeOverrideBoolean(value) }));
  }, []);

  const setReducedTransparencyOverride = useCallback((value) => {
    setA11yOverrides((prev) => ({
      ...prev,
      reducedTransparency: sanitizeOverrideBoolean(value),
    }));
  }, []);

  const setHighContrastOverride = useCallback((value) => {
    setA11yOverrides((prev) => ({ ...prev, highContrast: sanitizeOverrideBoolean(value) }));
  }, []);

  const setLargeTextEnabled = useCallback((value) => {
    setA11yOverrides((prev) => ({ ...prev, largeText: Boolean(value) }));
  }, []);

  const resetAccessibilityPreferences = useCallback(() => {
    setA11yOverrides({ ...DEFAULT_A11Y_OVERRIDES });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(A11Y_OVERRIDES_STORAGE_KEY, JSON.stringify(a11yOverrides));
    } catch {
      // Ignore storage failures in restricted environments.
    }
  }, [a11yOverrides]);

  /**
   * @description Updates CSS variables for spacing based on the current breakpoint. This effect runs whenever the breakpoint changes and sets CSS variables on the document root according to the mapping defined in the theme's cssVars configuration. This allows for dynamic theming and responsive spacing in CSS based on the current breakpoint tier.
   *
   * The effect first checks if the document object is available (to ensure it is running in a browser environment). It then retrieves the spacing values for the current breakpoint tier and the mapping of spacing tokens to CSS variable names from the theme configuration. If both are available, it iterates over the mapping and sets the corresponding CSS variables on the document root using the values from the current breakpoint's spacing configuration. This enables the use of CSS variables in stylesheets that automatically adapt to the current responsive state of the app.
   * @throws Will throw an error if document is not defined (e.g., in a non-browser environment), but this is mitigated by the initial check for document availability. It will also fail silently if the theme configuration does not include the expected spacing and cssVars properties.
   */

  useEffect(() => {
    if (typeof document === "undefined") return;

    const tierSpacing = SPACING_SCALE[breakpoint];
    const map = cssVars?.spacing;

    if (!tierSpacing || !map) return;

    // Iterate over the CSS variable mapping and set the corresponding CSS variables on the document root. This allows us to use CSS variables in our stylesheets that automatically update based on the current breakpoint's spacing values.
    Object.entries(map).forEach(([tokenKey, cssVarName]) => {
      const tokenValue = tierSpacing[tokenKey];
      if (tokenValue == null) return;

      document.documentElement.style.setProperty(cssVarName, String(tokenValue));
    });
  }, [breakpoint]);

  // Update CSS variables for accessibility preferences (reduced motion, reduced transparency, high contrast) whenever they change. This allows for dynamic theming and responsive design adjustments in CSS based on the user's accessibility settings.
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    root.style.setProperty("--prefers-reduced-motion", reducedMotion ? "1" : "0");
    root.style.setProperty("--prefers-reduced-transparency", reducedTransparency ? "1" : "0");
    root.style.setProperty("--prefers-high-contrast", highContrast ? "1" : "0");
    root.style.setProperty("--accessibility-text-scale", largeText ? "1.08" : "1");

    root.dataset.a11yReducedMotion = reducedMotion ? "true" : "false";
    root.dataset.a11yReducedTransparency = reducedTransparency ? "true" : "false";
    root.dataset.a11yHighContrast = highContrast ? "true" : "false";
    root.dataset.a11yLargeText = largeText ? "true" : "false";
  }, [reducedMotion, reducedTransparency, highContrast, largeText]);

  /**
   * @function contextValue
   * @description Memoized context value object that contains all responsive information and flags. This object is created using useMemo to optimize performance by preventing unnecessary re-renders of context consumers when the responsive state changes. The context value includes the current theme ID, width, breakpoint, orientation, accessibility preferences (reduced motion, reduced transparency, high contrast), boolean flags for device type and orientation, and the spacing values for the current breakpoint tier. By memoizing this object, we ensure that components consuming the ResponsiveContext only re-render when relevant responsive values actually change, improving overall app performance.
   * @return {object} The context value object containing responsive information and flags.
   * @throws Will throw an error if any of the dependencies (width, breakpoint, orientation, reducedMotion, reducedTransparency, highContrast) are not defined, but this is mitigated by the initial state setup that provides default values.
   */
  const contextValue = useMemo(() => {
    const tierSpacing = SPACING_SCALE[breakpoint];
    const hasAccessibilityOverrides =
      a11yOverrides.reducedMotion !== null ||
      a11yOverrides.reducedTransparency !== null ||
      a11yOverrides.highContrast !== null ||
      Boolean(a11yOverrides.largeText);

    return {
      themeId: MidnightGoldTheme.id,

      width,
      breakpoint,
      orientation,

      reducedMotion,
      reducedTransparency,
      highContrast,
      systemReducedMotion,
      systemReducedTransparency,
      systemHighContrast,
      largeText,

      isMobile: breakpoint === "mobile",
      isTablet: breakpoint === "tablet",
      isDesktop: breakpoint === "desktop",
      isPortrait: orientation === "portrait",
      isLandscape: orientation === "landscape",

      spacing: tierSpacing,
      accessibilityOverrides: a11yOverrides,
      hasAccessibilityOverrides,
      setReducedMotionOverride,
      setReducedTransparencyOverride,
      setHighContrastOverride,
      setLargeTextEnabled,
      resetAccessibilityPreferences,
    };
  }, [
    width,
    breakpoint,
    orientation,
    reducedMotion,
    reducedTransparency,
    highContrast,
    systemReducedMotion,
    systemReducedTransparency,
    systemHighContrast,
    largeText,
    a11yOverrides,
    setReducedMotionOverride,
    setReducedTransparencyOverride,
    setHighContrastOverride,
    setLargeTextEnabled,
    resetAccessibilityPreferences,
  ]);

  return <ResponsiveContext.Provider value={contextValue}>{children}</ResponsiveContext.Provider>;
}
