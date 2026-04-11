/**
 * @file src\components\features\CustomDiagram\core\architectureFactory.js
 * @description src\components\features\CustomDiagram\core\architectureFactory module.
 * @module src\components\features\CustomDiagram\core\architectureFactory
 */

import { architectureDiagram, getResponsiveFlowchartInit } from "./index.js";

/**
 * @function buildArchitectureVariants
 * @description - Builds desktop and mobile Mermaid sources from a single architecture config.
 *
 * Mobile rules:
 * - Default direction becomes TB unless explicitly set by config.mobile.direction
 * - Optionally stack layer order unchanged (TB handles readability)
 *
 * @param {object} config Base architecture config
 * @returns {{ desktop: string, mobile: string }}
 */
export function buildArchitectureVariants(config = {}) {
  const palette = config.palette || "default";
  const desktopDirection = config.direction || "LR";
  const mobileDirection = config.mobile?.direction || "TB";

  const desktopConfig = {
    ...config,
    direction: desktopDirection,
    palette,
  };

  const mobileConfig = {
    ...config,
    direction: mobileDirection,
    palette,
    layers: config.mobile?.layers || config.layers || [],
    edges: config.mobile?.edges || config.edges || [],
    legend: config.mobile?.legend ?? config.legend ?? false,
  };

  const desktop = architectureDiagram(
    getResponsiveFlowchartInit({ breakpoint: "desktop", palette }),
    desktopConfig
  );

  const mobile = architectureDiagram(
    getResponsiveFlowchartInit({ breakpoint: "mobile", palette }),
    mobileConfig
  );

  return { desktop, mobile };
}

export default buildArchitectureVariants;
