/**
 * @file ResponsiveProvider.jsx
 * @description React context provider for responsive design.
 * This component uses the useBreakpoint hook to determine the current screen size and orientation,
 * and provides this information to the rest of the app via context. It listens for window resize events
 * */

import { useEffect, useMemo, useRef, useState } from "react";
import { ResponsiveContext } from "./ResponsiveContext";
import { MidnightGoldTheme } from "@/theme/midnightGold.theme.js";

const { breakpoints, spacing: SPACING_SCALE, cssVars } = MidnightGoldTheme;

/// getBreakpoint and getOrientation functions are defined in useBreakpoint.js, but we need to replicate their logic here to avoid circular dependencies. In a future refactor, we may want to extract this logic into a separate utility file to avoid duplication.
function getBreakpoint(width) {
  if (width <= breakpoints.mobile) return "mobile";
  if (width <= breakpoints.tablet) return "tablet";
  return "desktop";
}

// Similar to getBreakpoint, we replicate getOrientation logic here to avoid circular dependencies.
function getOrientation() {
  if (typeof window === "undefined") return "landscape";
  return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
}

// Similar to getBreakpoint, we replicate getReducedMotion logic here to avoid circular dependencies.
function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * NOTE: prefers-reduced-transparency is not supported in all browsers.
 * Treat unsupported as false.
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
 * High contrast mode detection is complex due to varying support across browsers and platforms. This function checks for both prefers-contrast and forced-colors media queries to provide a more comprehensive detection of high contrast mode.
 *
 * Note that prefers-contrast has variable support and values:
 * - (prefers-contrast: more)
 * - (prefers-contrast: less)
 * forced-colors is a strong fallback for Windows High Contrast Mode.
 */
function getHighContrast() {
  if (typeof window === "undefined") return false;
  if (!window.matchMedia) return false;

  const prefersMore = window.matchMedia("(prefers-contrast: more)").matches;
  const forcedColors = window.matchMedia("(forced-colors: active)").matches;

  return prefersMore || forcedColors;
}

/**
 * ResponsiveProvider
 * ---------------------------------------------------------------------------
 * Provides responsive design context to the app, including current breakpoint, orientation, and spacing values.
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

  const [reducedMotion, setReducedMotion] = useState(getReducedMotion);
  const [reducedTransparency, setReducedTransparency] = useState(getReducedTransparency);
  const [highContrast, setHighContrast] = useState(getHighContrast);

  // Listen for window resize events and update state accordingly
  useEffect(() => {
    // Throttle resize events using requestAnimationFrame for better performance
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

    //------ Event handlers for media query changes -----\\

    // Since prefers-reduced-motion is widely supported, we can safely add a listener for it. When the user changes their reduced motion preference, we update our state to reflect that change.
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    // Since reduced transparency may not be supported, we check if the media query exists before adding a listener. If it doesn't exist, we won't be able to listen for changes, but we also won't throw an error.
    const handleTransparencyChange = (e) => setReducedTransparency(!!e.matches);
    // Since high contrast mode can be indicated by either prefers-contrast: more or forced-colors: active, we need to listen to both and update state accordingly.
    const handleContrastChange = () => setHighContrast(getHighContrast());

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

  /**
   * Sync spacing tokens to CSS variables automatically.
   * This keeps JS + CSS aligned with zero duplication.
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

  /**
   * Expose accessibility flags as CSS variables too.
   * This lets CSS do conditional styling without JS branching.
   */
  useEffect(() => {
    if (typeof document === "undefined") return;

    document.documentElement.style.setProperty(
      "--prefers-reduced-motion",
      reducedMotion ? "1" : "0"
    );
    document.documentElement.style.setProperty(
      "--prefers-reduced-transparency",
      reducedTransparency ? "1" : "0"
    );
    document.documentElement.style.setProperty("--prefers-high-contrast", highContrast ? "1" : "0");
  }, [reducedMotion, reducedTransparency, highContrast]);

  // Memoize the context value to prevent unnecessary re-renders of consuming components when unrelated state changes. The context value includes the current theme ID, width, breakpoint, orientation, accessibility preferences, boolean flags for responsive states, and the spacing values for the current breakpoint tier.
  const contextValue = useMemo(() => {
    const tierSpacing = SPACING_SCALE[breakpoint];

    return {
      themeId: MidnightGoldTheme.id,

      width,
      breakpoint,
      orientation,

      reducedMotion,
      reducedTransparency,
      highContrast,

      isMobile: breakpoint === "mobile",
      isTablet: breakpoint === "tablet",
      isDesktop: breakpoint === "desktop",
      isPortrait: orientation === "portrait",
      isLandscape: orientation === "landscape",

      spacing: tierSpacing,
    };
  }, [width, breakpoint, orientation, reducedMotion, reducedTransparency, highContrast]);

  return <ResponsiveContext.Provider value={contextValue}>{children}</ResponsiveContext.Provider>;
}
