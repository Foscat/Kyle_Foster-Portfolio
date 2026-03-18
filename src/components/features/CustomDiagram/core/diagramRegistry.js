import { buildArchitectureVariants } from "./index.js";

/**
 * @file diagramRegistry.js
 * @fileoverview
 * This module implements a registry for custom diagrams. It allows diagram modules to register their configurations, and provides functions to retrieve diagram entries and build Mermaid sources based on the registered configs.
 *
 * The registry is designed to be flexible and extensible, supporting different diagram types and configurations. It abstracts away the details of how diagrams are defined and generated, allowing diagram modules to focus on their specific logic while providing a consistent interface for accessing diagram data.
 *
 * Key functions:
 * - `registerDiagram(id, entry)`: Register a diagram configuration with a unique id.
 * - `getDiagramEntry(id)`: Retrieve a registered diagram entry by id.
 * - `listDiagramIds()`: List all registered diagram ids, sorted alphabetically.
 * - `buildDiagramSources(id)`: Build Mermaid sources for a given diagram id based on its type and config.
 * - `buildAllDiagramSources()`: Build Mermaid sources for all registered diagrams (useful for linting/CI).
 *
 * The registry is intended to be used in conjunction with diagram modules that define specific diagram types (e.g., architecture diagrams) and their corresponding configurations. The diagram factory functions (e.g., `buildArchitectureVariants`) are responsible for interpreting the configs and generating the appropriate Mermaid sources, while the registry provides a centralized place to store and access these configurations.
 *
 * This module does not directly handle rendering or UI concerns; it focuses solely on managing diagram configurations and generating Mermaid sources based on those configurations. The generated sources can then be passed to rendering components (e.g., `MermaidDiagram`) for display in the UI.
 *
 * Usage example:
 *
 * In a diagram module (e.g., `greenhouseArchitecture.js`):
 * ```js
 * import { registerDiagram } from "src/diagrams/registry/diagramRegistry.js";
 *
 * registerDiagram("greenhouse-architecture", {
 *   title: "Greenhouse Controller Architecture",
 *   type: "architecture",
 *  config: {
 *    // diagram-specific config fields
 *  },
 *  description: "An architecture diagram for the greenhouse controller system.",
 * tags: ["example", "architecture"]
 * });
 * ```
 *
 * In a rendering component:
 * ```js
 * import MermaidDiagram from "components/MermaidDiagram";
 * import { buildDiagramSources } from "src/components/features/CustomDiagram/core/diagramRegistry.js";
 *
 * const { desktop, mobile } = buildDiagramSources("greenhouse-architecture");
 *
 * <MermaidDiagram
 *   id="diagram-greenhouse"
 *   title="Greenhouse Controller Architecture"
 *   desktopDiagram={{ diagram: desktop }}
 *   mobileDiagram={{ diagram: mobile }}
 * />;
 * ```
 */

const registry = new Map();

/**
 * Register a diagram configuration. The config is opaque to the registry, but will be used by the diagram factory to produce renderable Mermaid sources.
 * @param {string} id
 * @param {object} entry { title, type, config, description?, tags? }
 */
export function registerDiagram(id, entry) {
  if (!id) throw new Error("registerDiagram requires an id");
  if (registry.has(id)) throw new Error(`Diagram already registered: ${id}`);
  registry.set(id, { id, ...entry });
}

/**
 * Get a registered diagram entry by id.
 * @param {string} id - The diagram id.
 * @returns {object | undefined} The diagram entry, or undefined if not found.
 */
export function getDiagramEntry(id) {
  return registry.get(id);
}

/**
 * List registered diagram ids, sorted alphabetically.
 * @returns {string[]} List of registered diagram ids, sorted alphabetically.
 */
export function listDiagramIds() {
  return Array.from(registry.keys()).sort();
}

/**
 * Build Mermaid sources for a given diagram id. The sources are generated based on the diagram's type and config, and may include variants for different contexts (e.g., desktop vs mobile).
 * @param {string} id - The diagram id.
 * @returns {object} An object containing the Mermaid sources for the diagram.
 * 
 * The exact structure of the returned sources object depends on the diagram type and config. For example, for "architecture" diagrams, it may return an object with "desktop" and "mobile" keys, each containing a Mermaid source string variant.
 * 
 * - The diagram factory is responsible for interpreting the diagram config and producing the appropriate Mermaid sources. The registry simply stores the configs and provides access to them.
 * - The `buildDiagramSources()` function abstracts away the details of how the sources are generated, allowing callsites to simply request the sources for a given diagram id without needing to know about the underlying config or generation logic.
 * - The returned sources can then be passed to a Mermaid rendering component (e.g., `MermaidDiagram`) to display the diagram in the UI.
 * 
 * Usage example:
 * 
 * ```js
 * import MermaidDiagram from "components/MermaidDiagram";
 * import { buildDiagramSources } from "components/features/CustomDiagram/core/diagramRegistry.js";
 * 
 * const { desktop, mobile } = buildDiagramSources("greenhouse-architecture");
 * 
 * <MermaidDiagram
 *   id="diagram-greenhouse"
 *   title="Greenhouse Controller Architecture"
 *   desktopDiagram={{ diagram: desktop }}
 *   mobileDiagram={{ diagram: mobile }}
 * />;
```
 */
export function buildDiagramSources(id) {
  const entry = registry.get(id);

  if (!entry) {
    throw new Error(`Unknown diagram id: ${id}`);
  }

  if (entry.type === "architecture") {
    return buildArchitectureVariants(entry.config);
  }

  throw new Error(`Unsupported diagram type: ${entry.type}`);
}

/**
 * Build all sources (useful for linting/CI).
 * @returns {Array} An array of objects containing the diagram id, entry, and Mermaid sources.
 */
export function buildAllDiagramSources() {
  return listDiagramIds().map((id) => ({
    id,
    entry: registry.get(id),
    sources: buildDiagramSources(id),
  }));
}
