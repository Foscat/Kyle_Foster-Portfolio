/**
 * @file index.js
 * @description React hook that synchronizes the document favicon with the active theme mode and palette.
 * @module assets/hooks/useThemeFavicon
 */

import { useEffect } from "react";
import {
  subscribeToPaletteChanges,
  subscribeToSystemThemeChanges,
  updateFavicon,
} from "../../favicon";

/**
 * Keeps the favicon in sync with the current theme mode and palette.
 *
 * @param {"light"|"dark"|"auto"|"contrast"} themeMode
 * @param {string} palette
 */
export function useThemeFavicon(themeMode = "auto", palette) {
  useEffect(() => {
    updateFavicon(themeMode, palette);

    const cleanups = [];

    if (themeMode === "auto") {
      cleanups.push(subscribeToSystemThemeChanges(() => updateFavicon("auto", palette)));
    }

    if (!palette) {
      cleanups.push(subscribeToPaletteChanges(() => updateFavicon(themeMode, undefined)));
    }

    return () => {
      cleanups.forEach((cleanup) => {
        if (typeof cleanup === "function") {
          cleanup();
        }
      });
    };
  }, [themeMode, palette]);
}
