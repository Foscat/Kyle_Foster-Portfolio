/**
 * @file ThemeContext.jsx
 * @description Provides theme state and helpers for managing light and dark
 * modes across the application.
 * @module assets/theme/ThemeContext
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useResponsive } from "assets/context/responsive/ResponsiveContext";
import { PALETTE_IDS } from "assets/themePalettes.js";

const THEME_STORAGE_KEY = "portfolio-theme";
const PALETTE_STORAGE_KEY = "portfolio-palette";
const UI_STYLE_STORAGE_KEY = "portfolio-ui-style";
const LAYOUT_STYLE_STORAGE_KEY = "portfolio-layout-style";
const SUPPORTED_THEMES = Object.freeze(["light", "dark"]);
const DEFAULT_THEME = "dark";
const SUPPORTED_UI_STYLES = Object.freeze([
  "minimal-saas",
  "bento",
  "maximalist",
  "bauhaus",
  "tactile",
  "neumorphism",
  "retrofuturism",
  "brutalism",
  "cyberpunk",
  "y2k",
  "retro-glass",
]);
const DEFAULT_UI_STYLE = "retro-glass";
const SUPPORTED_LAYOUT_STYLES = SUPPORTED_UI_STYLES;
const DEFAULT_LAYOUT_STYLE = DEFAULT_UI_STYLE;
const SUPPORTED_PALETTES = PALETTE_IDS;
const DEFAULT_PALETTE = "ocean-steel";
const THEME_CYCLE_HOTKEY = "Alt+Shift+T";

const isSupportedTheme = (value) => typeof value === "string" && SUPPORTED_THEMES.includes(value);
const isSupportedUiStyle = (value) =>
  typeof value === "string" && SUPPORTED_UI_STYLES.includes(value);
const isSupportedLayoutStyle = (value) =>
  typeof value === "string" && SUPPORTED_LAYOUT_STYLES.includes(value);
const isSupportedPalette = (value) =>
  typeof value === "string" && SUPPORTED_PALETTES.includes(value);

const isEditableTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

const safeReadStorage = (key) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeWriteStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures so theme changes cannot crash the app.
  }
};

function getInitialTheme() {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const savedTheme = safeReadStorage(THEME_STORAGE_KEY);
  if (isSupportedTheme(savedTheme)) {
    return savedTheme;
  }

  return DEFAULT_THEME;
}

function getInitialPalette() {
  if (typeof window === "undefined") {
    return DEFAULT_PALETTE;
  }

  const savedPalette = safeReadStorage(PALETTE_STORAGE_KEY);
  if (isSupportedPalette(savedPalette)) {
    return savedPalette;
  }

  return DEFAULT_PALETTE;
}

function getInitialUiStyle() {
  if (typeof window === "undefined") {
    return DEFAULT_UI_STYLE;
  }

  const savedUiStyle = safeReadStorage(UI_STYLE_STORAGE_KEY);
  if (isSupportedUiStyle(savedUiStyle)) {
    return savedUiStyle;
  }

  return DEFAULT_UI_STYLE;
}

function getInitialLayoutStyle() {
  if (typeof window === "undefined") {
    return DEFAULT_LAYOUT_STYLE;
  }

  const savedLayoutStyle = safeReadStorage(LAYOUT_STYLE_STORAGE_KEY);
  if (isSupportedLayoutStyle(savedLayoutStyle)) {
    return savedLayoutStyle;
  }

  return DEFAULT_LAYOUT_STYLE;
}

/**
 * Supported application themes.
 *
 * @typedef {"light"|"dark"} Theme
 */

/**
 * Supported application palettes.
 *
 * @typedef {
 *   "midnight-gold"|
 *   "ocean-steel"|
 *   "forest-moss"|
 *   "sunset-ember"|
 *   "royal-plum"|
 *   "graphite-cyan"|
 *   "desert-sage"|
 *   "rose-quartz"|
 *   "cyber-lime"|
 *   "arctic-indigo"
 * } Palette
 */

/**
 * Supported ui-style-kit-css visual systems.
 *
 * @typedef {
 *   "minimal-saas"|
 *   "bento"|
 *   "maximalist"|
 *   "bauhaus"|
 *   "tactile"|
 *   "neumorphism"|
 *   "retrofuturism"|
 *   "brutalism"|
 *   "cyberpunk"|
 *   "y2k"|
 *   "retro-glass"
 * } UiStyle
 */

/**
 * Supported layout-style-css spatial systems.
 *
 * @typedef {
 *   "minimal-saas"|
 *   "bento"|
 *   "maximalist"|
 *   "bauhaus"|
 *   "tactile"|
 *   "neumorphism"|
 *   "retrofuturism"|
 *   "brutalism"|
 *   "cyberpunk"|
 *   "y2k"|
 *   "retro-glass"
 * } LayoutStyle
 */

/**
 * Context value exposed by the ThemeProvider.
 *
 * @typedef {Object} ThemeContextValue
 * @property {Theme} theme - Currently active theme.
 * @property {Function} setTheme - Explicitly set the theme.
 * @property {Function} toggleTheme - Toggle between light and dark themes.
 * @property {Palette} palette - Currently active color palette.
 * @property {Function} setPalette - Explicitly set the palette.
 * @property {Function} togglePalette - Cycle through available palettes.
 * @property {Palette[]} palettes - Supported palette identifiers.
 * @property {UiStyle} uiStyle - Currently active ui-style-kit-css visual system.
 * @property {Function} setUiStyle - Explicitly set the visual system.
 * @property {Function} toggleUiStyle - Cycle through available visual systems.
 * @property {UiStyle[]} uiStyles - Supported visual system identifiers.
 * @property {LayoutStyle} layoutStyle - Currently active layout-style-css spatial system.
 * @property {Function} setLayoutStyle - Explicitly set the spatial system.
 * @property {Function} toggleLayoutStyle - Cycle through available spatial systems.
 * @property {LayoutStyle[]} layoutStyles - Supported spatial system identifiers.
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
  const { highContrast } = useResponsive();
  const [theme, setThemeState] = useState(getInitialTheme);
  const [palette, setPaletteState] = useState(getInitialPalette);
  const [uiStyle, setUiStyleState] = useState(getInitialUiStyle);
  const [layoutStyle, setLayoutStyleState] = useState(getInitialLayoutStyle);
  const effectiveMode = highContrast ? "contrast" : theme;

  /**
   * Explicitly set theme while guarding against invalid values.
   *
   * @param {(Theme|Function)} nextTheme - Theme value or updater function.
   */
  const setTheme = useCallback((nextTheme) => {
    setThemeState((prev) => {
      if (typeof nextTheme === "function") {
        try {
          const resolvedTheme = nextTheme(prev);
          return isSupportedTheme(resolvedTheme) ? resolvedTheme : prev;
        } catch {
          return prev;
        }
      }

      return isSupportedTheme(nextTheme) ? nextTheme : prev;
    });
  }, []);

  /**
   * @description Toggles the current theme using a functional state update.
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

  const setUiStyle = useCallback((nextUiStyle) => {
    setUiStyleState((prev) => {
      if (typeof nextUiStyle === "function") {
        try {
          const resolvedUiStyle = nextUiStyle(prev);
          return isSupportedUiStyle(resolvedUiStyle) ? resolvedUiStyle : prev;
        } catch {
          return prev;
        }
      }

      return isSupportedUiStyle(nextUiStyle) ? nextUiStyle : prev;
    });
  }, []);

  const toggleUiStyle = useCallback(() => {
    setUiStyleState((prev) => {
      const currentIndex = SUPPORTED_UI_STYLES.indexOf(prev);
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = (safeIndex + 1) % SUPPORTED_UI_STYLES.length;
      return SUPPORTED_UI_STYLES[nextIndex];
    });
  }, []);

  const setLayoutStyle = useCallback((nextLayoutStyle) => {
    setLayoutStyleState((prev) => {
      if (typeof nextLayoutStyle === "function") {
        try {
          const resolvedLayoutStyle = nextLayoutStyle(prev);
          return isSupportedLayoutStyle(resolvedLayoutStyle) ? resolvedLayoutStyle : prev;
        } catch {
          return prev;
        }
      }

      return isSupportedLayoutStyle(nextLayoutStyle) ? nextLayoutStyle : prev;
    });
  }, []);

  const toggleLayoutStyle = useCallback(() => {
    setLayoutStyleState((prev) => {
      const currentIndex = SUPPORTED_LAYOUT_STYLES.indexOf(prev);
      const safeIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex = (safeIndex + 1) % SUPPORTED_LAYOUT_STYLES.length;
      return SUPPORTED_LAYOUT_STYLES[nextIndex];
    });
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    // Legacy attribute model on root: mode + palette selectors.
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.mode = effectiveMode;
    document.documentElement.dataset.palette = palette;
    document.documentElement.dataset.ui = uiStyle;
    document.documentElement.dataset.layout = layoutStyle;
    document.documentElement.setAttribute("layout-style", layoutStyle);
    if (document.body) {
      // layout-style-css scopes its spatial variables from ly-root and data-layout.
      document.body.classList.add("ly-root");
      document.body.dataset.ui = uiStyle;
      document.body.dataset.layout = layoutStyle;
      document.body.setAttribute("layout-style", layoutStyle);
      document.body.dataset.theme = palette;
      document.body.dataset.mode = effectiveMode;
    }

    if (typeof window !== "undefined") {
      safeWriteStorage(THEME_STORAGE_KEY, theme);
      safeWriteStorage(PALETTE_STORAGE_KEY, palette);
      safeWriteStorage(UI_STYLE_STORAGE_KEY, uiStyle);
      safeWriteStorage(LAYOUT_STYLE_STORAGE_KEY, layoutStyle);
    }
  }, [effectiveMode, layoutStyle, palette, theme, uiStyle]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleThemeCycleHotkey = (event) => {
      if (event.defaultPrevented) return;
      if (isEditableTarget(event.target)) return;
      if (!event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey) return;
      if (event.key.toLowerCase() !== "t") return;

      event.preventDefault();
      toggleTheme();
    };

    window.addEventListener("keydown", handleThemeCycleHotkey);
    return () => window.removeEventListener("keydown", handleThemeCycleHotkey);
  }, [toggleTheme]);

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
        uiStyle,
        setUiStyle,
        toggleUiStyle,
        uiStyles: SUPPORTED_UI_STYLES,
        layoutStyle,
        setLayoutStyle,
        toggleLayoutStyle,
        layoutStyles: SUPPORTED_LAYOUT_STYLES,
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

export { THEME_CYCLE_HOTKEY };
