/**
 * @file useThemeFavicon.js
 * @description React hook that keeps the favicon in sync with the app theme.
 * @module hooks/useThemeFavicon
 */

import { useEffect } from "react";
import { subscribeToSystemThemeChanges, updateFavicon } from "../../favicon";

/**
 * Syncs the site favicon with the current theme mode.
 *
 * Supported modes:
 * - "light"
 * - "dark"
 * - "auto"
 *
 * @param {"light"|"dark"|"auto"} themeMode - Current app theme mode.
 * @param {string} palette - Current app palette.
 */
export function useThemeFavicon(themeMode = "auto", palette = "alt") {
  useEffect(() => {
    updateFavicon(themeMode, palette);

    if (themeMode !== "auto") {
      return undefined;
    }

    const unsubscribe = subscribeToSystemThemeChanges(() => {
      updateFavicon("auto", palette);
    });

    return unsubscribe;
  }, [themeMode, palette]);
}
