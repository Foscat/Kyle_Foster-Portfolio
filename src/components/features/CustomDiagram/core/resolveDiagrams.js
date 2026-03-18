import { buildArchitectureVariants } from "./index.js";

/**
 * @typedef {object} DiagramDefinition
 * @property {string} id Unique diagram identifier
 * @property {string} type Diagram block type (e.g. "diagram")
 *
 * Optional properties for architecture diagrams:
 * @property {object} architecture Architecture config for auto-generating diagrams
 * @property {string} architecture.direction Default diagram direction (e.g. "LR", "TB")
 * @property {object[]} architecture.layers Diagram layers with nodes
 * @property {object[]} architecture.edges Connections between nodes
 * @property {object} architecture.mobile Optional mobile-specific overrides
 */

/**
 * @function resolveDiagram
 * @description - Resolves diagram definitions into renderable diagrams.
 * @param {DiagramDefinition} def Diagram definition to resolve
 * @returns {DiagramDefinition} Resolved diagram definition with generated diagrams (if architecture config is present)
 * Supports:
 * - manual diagrams (existing system)
 * - architecture DSL (auto generated)
 */
export default function resolveDiagram(def) {
  if (!def?.architecture) {
    return def;
  }
  // For architecture diagrams, generate desktop and mobile Mermaid sources from the provided config, while allowing manual diagram overrides for maximum flexibility. This enables users to define a single architecture config and get responsive diagrams out of the box, while still supporting custom diagrams when needed.
  const { desktop, mobile } = buildArchitectureVariants(def.architecture);

  // Return a new diagram definition that includes the generated diagrams, while preserving any existing manual diagram definitions for maximum flexibility. This allows users to define a single architecture config and get responsive diagrams out of the box, while still supporting custom diagrams when needed.
  return {
    ...def,
    diagram: def.diagram || desktop,
    desktop: def.desktop?.diagram ? def.desktop : { diagram: desktop },
    mobile: def.mobile?.diagram ? def.mobile : { diagram: mobile },
  };
}
