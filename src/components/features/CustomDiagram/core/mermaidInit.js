import { FLOWCHART_INIT, MOBILE_FLOWCHART_INIT } from "./architecture.config.js";

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
}) {
  const isMobile = breakpoint === "mobile";

  let init = isMobile ? MOBILE_FLOWCHART_INIT : FLOWCHART_INIT;

  // High contrast
  if (highContrast) {
    init = init.replace(`"primaryBorderWidth":"2px"`, `"primaryBorderWidth":"3px"`);
    init = init.replace(`"clusterBorderWidth":"2px"`, `"clusterBorderWidth":"3px"`);
    init = init.replace(`"primaryColor":"#C9A227"`, `"primaryColor":"#FFFF00"`);
    init = init.replace(`"primaryTextColor":"#0F0F12"`, `"primaryTextColor":"#FFFFFF"`);
    init = init.replace(`"clusterBkg":"#1C1C1E"`, `"clusterBkg":"#000000"`);
    init = init.replace(`"textColor":"#F5F7FF"`, `"textColor":"#FFFFFF"`);
    init = init.replace(`"lineColor":"#E6C767"`, `"lineColor":"#C9A227"`);
  }

  // Reduced transparency
  if (reducedTransparency) {
    init = init.replace(`"clusterBkg":"#1C1C1E"`, `"clusterBkg":"#000000"`);
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
