import {
  FLOWCHART_INIT,
  FLOWCHART_INIT_ALT,
  MOBILE_FLOWCHART_INIT,
  MOBILE_FLOWCHART_INIT_ALT,
} from "./architecture.config.js";

function replaceThemeValue(init, key, value) {
  return init.replace(new RegExp(`"${key}":"[^"]*"`, "g"), `"${key}":"${value}"`);
}

/**
 * Generates a Mermaid init block based on responsive and accessibility context.
 * This allows diagrams to adapt to user preferences and device constraints.
 * Currently adjusts flowchart diagrams for mobile breakpoint, reduced motion, reduced transparency, and high contrast modes.
 *
 * @param {Object} options - Configuration options for diagram initialization.
 * @param {"mobile"|"tablet"|"desktop"} options.breakpoint - Current responsive breakpoint.
 * @param {boolean} options.reducedMotion - Whether the user prefers reduced motion.
 * @param {boolean} options.reducedTransparency - Whether the user prefers reduced transparency.
 * @param {boolean} options.highContrast - Whether the user prefers high contrast mode.
 *
 * @return {string} Mermaid init block string with appropriate adjustments based on context.
 *
 * This function is designed to be used in conjunction with the `diagram` helper to ensure that Mermaid diagrams are rendered with context-aware styling and behavior adjustments, enhancing accessibility and usability across different devices and user preferences.
 */
export function getResponsiveFlowchartInit({
  breakpoint,
  reducedMotion,
  reducedTransparency,
  highContrast,
  palette = "default",
}) {
  const isMobile = breakpoint === "mobile";
  const useAltPalette = palette === "alt";

  let init = isMobile
    ? useAltPalette
      ? MOBILE_FLOWCHART_INIT_ALT
      : MOBILE_FLOWCHART_INIT
    : useAltPalette
      ? FLOWCHART_INIT_ALT
      : FLOWCHART_INIT;

  // High contrast
  if (highContrast) {
    init = replaceThemeValue(init, "primaryBorderWidth", "3px");
    init = replaceThemeValue(init, "clusterBorderWidth", "3px");
    init = replaceThemeValue(init, "primaryColor", "#FFFF00");
    init = replaceThemeValue(init, "primaryTextColor", "#FFFFFF");
    init = replaceThemeValue(init, "clusterBkg", "#000000");
    init = replaceThemeValue(init, "textColor", "#FFFFFF");
    init = replaceThemeValue(init, "lineColor", "#FFFF00");
  }

  // Reduced transparency
  if (reducedTransparency) {
    init = replaceThemeValue(init, "clusterBkg", "#000000");
  }

  // Reduced motion
  if (reducedMotion) {
    init = init.replace(/"nodeSpacing":\d+/, `"nodeSpacing":28`);
    init = init.replace(/"rankSpacing":\d+/, `"rankSpacing":56`);
    init = init.replace(/stroke-dasharray:[^,]+,[^,]+/, `stroke-dasharray: 0,0`);
    init = init.replace(/animation:[^;]+/, `animation: none`);
  }

  return init;
}
