/**
 * @file ThemeContext.jsx
 * @description Provides theme state and helpers for managing light and dark
 * modes across the application.
 * @module assets/theme/ThemeContext
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "portfolio-theme";
const PALETTE_STORAGE_KEY = "portfolio-palette";
const SUPPORTED_PALETTES = Object.freeze(["primary", "alt", "forest", "ocean", "sunset"]);
const DEFAULT_PALETTE = "ocean";

const isSupportedPalette = (value) =>
  typeof value === "string" && SUPPORTED_PALETTES.includes(value);

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "dark";
}

function getInitialPalette() {
  if (typeof window === "undefined") {
    return DEFAULT_PALETTE;
  }

  const savedPalette = window.localStorage.getItem(PALETTE_STORAGE_KEY);
  if (isSupportedPalette(savedPalette)) {
    return savedPalette;
  }

  return DEFAULT_PALETTE;
}

/**
 * Supported application themes.
 *
 * @typedef {"light"|"dark"} Theme
 */

/**
 * Supported application palettes.
 *
 * @typedef {"primary"|"alt"|"forest"|"ocean"|"sunset"} Palette
 */

/**
 * Context value exposed by the ThemeProvider.
 *
 * @typedef {Object} ThemeContextValue
 * @property {Theme} theme - Currently active theme.
 * @property {(theme: Theme) => void} setTheme - Explicitly set the theme.
 * @property {() => void} toggleTheme - Toggle between light and dark themes.
 * @property {Palette} palette - Currently active color palette.
 * @property {(palette: Palette) => void} setPalette - Explicitly set the palette.
 * @property {() => void} togglePalette - Cycle through available palettes.
 * @property {Palette[]} palettes - Supported palette identifiers.
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
  const [palette, setPaletteState] = useState(getInitialPalette);

  /**
 * @description Toggles the current theme. Uses functional state update to avoid stale closures. /
 */
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setPalette = useCallback((nextPalette) => {
    setPaletteState((prev) => {
      if (typeof nextPalette === "function") {
        try {
          const resolvedPalette = nextPalette(prev);
          return isSupportedPalette(resolvedPalette) ? resolvedPalette : prev;
        } catch {
          return prev;
        }
      }

      return isSupportedPalette(nextPalette) ? nextPalette : prev;
    });
  }, []);

  const togglePalette = useCallback(() => {
    setPaletteState((prev) => {
      const currentIndex = SUPPORTED_PALETTES.indexOf(prev);
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = (safeIndex + 1) % SUPPORTED_PALETTES.length;
      return SUPPORTED_PALETTES[nextIndex];
    });
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
      value={{
        theme,
        setTheme,
        toggleTheme,
        palette,
        setPalette,
        togglePalette,
        palettes: SUPPORTED_PALETTES,
      }}
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
