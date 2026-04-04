/**
 * @file ThemeContext.jsx
 * @description Provides theme state and helpers for managing light and dark
 * modes across the application.
 * @module assets/theme/ThemeContext
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";
const PALETTE_STORAGE_KEY = "portfolio-palette";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return "dark";
}

function getInitialPalette() {
  if (typeof window === "undefined") {
    return "primary";
  }

  const savedPalette = window.localStorage.getItem(PALETTE_STORAGE_KEY);
  if (savedPalette === "primary" || savedPalette === "alt") {
    return savedPalette;
  }

  return "primary";
}

/**
 * Supported application themes.
 *
 * @typedef {"light"|"dark"} Theme
 */

/**
 * Context value exposed by the ThemeProvider.
 *
 * @typedef {Object} ThemeContextValue
 * @property {Theme} theme - Currently active theme.
 * @property {(theme: Theme) => void} setTheme - Explicitly set the theme.
 * @property {() => void} toggleTheme - Toggle between light and dark themes.
 * @property {"primary"|"alt"} palette - Currently active color palette.
 * @property {(palette: "primary"|"alt") => void} setPalette - Explicitly set the palette.
 * @property {() => void} togglePalette - Toggle between primary and alt palettes.
 */

const ThemeContext = createContext(null);

/**
 * ThemeProvider component.
 * Wraps the application and provides theme state via React context.
 *
 * @param {Object} props - Provider props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} Theme context provider.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [palette, setPalette] = useState(getInitialPalette);

  /**
   * Toggles the current theme.
   * Uses functional state update to avoid stale closures.
   */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const togglePalette = useCallback(() => {
    setPalette((prev) => (prev === "alt" ? "primary" : "alt"));
  }, []);

  useEffect(() => {
    // Apply theme and palette as data attributes for CSS selectors
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.palette = palette;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    window.localStorage.setItem(PALETTE_STORAGE_KEY, palette);
  }, [palette, theme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggleTheme, palette, setPalette, togglePalette }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook for consuming the ThemeContext.
 * Must be used within a ThemeProvider.
 *
 * @returns {ThemeContextValue} Current theme context value.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
