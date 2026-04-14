/**
 * @file src\components\features\CustomDiagram\core\customDiagram.js
 * @description src\components\features\CustomDiagram\core\customDiagram module.
 * @module src\components\features\CustomDiagram\core\customDiagram
 */

import formatMermaid from "../../../../../scripts/format-mermaid.js";
import {
  ARCH_LAYERS,
  ARCH_FLOWCHART_PALETTE,
  ARCH_FLOWCHART_PALETTE_ALT,
  EDGE_STYLES,
  NODE_SHAPES,
} from "./architecture.config.js";

const LAYER_ORDER = [
  "external",
  "presentation",
  "application",
  "domain",
  "infrastructure",
  "persistence",
];

/**
 * @function architectureDiagram
 * @description - Custom diagram builder for layered architecture diagrams with built-in validation and styling conventions. This function abstracts the complexity of Mermaid syntax while enforcing a consistent structure and visual language for architecture diagrams, making it easier to create clear and maintainable architectural visuals.
 *
 * Key features:
 * - Layered structure with subgraphs for clear separation of concerns
 * - Class assignment for consistent styling of components, datastores, and external systems
 * - Edge validation to ensure all connections reference valid nodes
 *
 * Enforces:
 * - Subgraph per layer
 * - Class assignment per layer
 * - Datastore formatting
 * - Deterministic structure
 *
 * @param {string} init - Mermaid init block
 * @param {Object} config - Architecture configuration
 *
 * @returns {string} Mermaid diagram string
 * @throws Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).
 * @example
 * Given the following configuration:
 *
 * const config = {
 * layers: [
 *  {
 *   key: "application",
 *  label: "Application Layer",
 *  className: "layerApplication",
 *  nodes: [
 *    { id: "AppState", label: "Central State Store", type: "datastore" },
 * ],
 * },
 * {
 *  key: "presentation",
 * label: "Presentation Layer",
 * className: "layerPresentation",
 * nodes: [
 *  { id: "ChartUI", label: "Chart Interface" },
 *  { id: "MemeUI", label: "Meme Generator" },
 * ],
 * },
 * ],
 * edges: [
 *  { from: "AppState", to: "ChartUI" },
 *  { from: "MemeUI", to: "AppState" },
 * ],
 * };
 *
 * Calling `architectureDiagram("", config)` will produce a Mermaid diagram string that represents the defined architecture, with "AppState" as a datastore in the Application Layer, "ChartUI" and "MemeUI" as components in the Presentation Layer, and edges connecting them according to the specified relationships. The diagram will include appropriate class definitions for styling and will be formatted for rendering in a Mermaid-compatible environment.
 *
 * The output will be a Mermaid diagram string representing the defined architecture, with appropriate subgraphs, classes, and edges, ready for rendering in a Mermaid-compatible environment.
 *
 * @callback
 * @satisfies {function(string, object): string}
 * @throws Will throw an error if the configuration is invalid (e.g., missing node ids, duplicate ids, edges referencing unknown nodes).
 *
 */
export function architectureDiagram(init, config) {
  const {
    layers = [],
    edges = [],
    direction = "LR",
    legend = false,
    mobile = false,
    palette = "default",
  } = config;

  const lines = [];
  const ids = new Set();
  const adjacency = new Map();

  lines.push(`flowchart ${direction}`);
  lines.push(palette === "alt" ? ARCH_FLOWCHART_PALETTE_ALT : ARCH_FLOWCHART_PALETTE);
  lines.push("");

  // Sort layers according to predefined order, unknown layers go last in provided order
  const orderedLayers = [...layers].sort((a, b) => {
    const indexA = LAYER_ORDER.indexOf(a.key);
    const indexB = LAYER_ORDER.indexOf(b.key);

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  // ------------------------------------------------
  // Build Layers
  // ------------------------------------------------

  // Render each layer as a subgraph with its nodes, applying class names and collecting node ids for edge validation
  orderedLayers.forEach((layer) => {
    const meta = ARCH_LAYERS[layer.key];

    if (!meta) {
      throw new Error(`Unknown architecture layer: "${layer.key}"`);
    }

    const label = layer.label || meta.label;
    const className = layer.className || meta.className;
    const nodes = Array.isArray(layer.nodes) ? layer.nodes : [];

    lines.push(`subgraph ${layer.key}["${label}"]`);

    // Render nodes within the layer, applying shapes and classes based on type and metadata, while validating uniqueness and presence of required fields
    nodes.forEach((node) => {
      const shape = NODE_SHAPES[node.type] || NODE_SHAPES.component;

      if (!node.id) {
        throw new Error(`Node missing id in layer "${layer.key}"`);
      }

      const safeLabel = String(node.label ?? "")
        .replace(/\n/g, " ")
        .trim();

      if (!safeLabel) {
        throw new Error(`Node "${node.id}" missing label`);
      }

      if (ids.has(node.id)) {
        throw new Error(`Duplicate node id "${node.id}"`);
      }

      ids.add(node.id);
      adjacency.set(node.id, []);

      lines.push(`  ${shape(node.id, safeLabel)}`);

      if (className) {
        lines.push(`  class ${node.id} ${className}`);
      }

      if (node.className) {
        lines.push(`  class ${node.id} ${node.className}`);
      }

      if (node.type === "datastore") {
        lines.push(`  class ${node.id} datastore`);
      }

      if (node.core) {
        lines.push(`  class ${node.id} core`);
      }

      adjacency.set(node.id, []);
    });

    lines.push("end");
    lines.push("");

    // Apply class definitions for the entire layer based on the collected node ids, ensuring consistent styling across all nodes in the layer while allowing individual overrides
    const nodeIds = (layer.nodes || []).map((n) => n.id).join(",");

    if (nodeIds) {
      lines.push(`class ${nodeIds} ${className}`);
    }

    lines.push("");
  });

  // ------------------------------------------------
  // Normalize Edges
  // ------------------------------------------------

  // Support both object and array edge definitions for flexibility, while normalizing to a consistent format for validation and rendering
  const normalizedEdges = (Array.isArray(edges) ? edges : []).map((edge) => {
    if (Array.isArray(edge)) {
      const [from, to, label] = edge;
      return { from, to, label, style: undefined };
    }

    return {
      from: edge?.from,
      to: edge?.to,
      label: edge?.label,
      style: edge?.style,
    };
  });

  // ------------------------------------------------
  // Validate Edges
  // ------------------------------------------------

  // Validate that all edges reference existing nodes and that required fields are present, ensuring diagram integrity and preventing rendering errors due to invalid references
  normalizedEdges.forEach((edge) => {
    if (!edge.from || !edge.to) {
      throw new Error(`Edge missing from/to definition`);
    }

    if (!ids.has(edge.from)) {
      throw new Error(`Edge references unknown node "${edge.from}"`);
    }

    if (!ids.has(edge.to)) {
      throw new Error(`Edge references unknown node "${edge.to}"`);
    }

    adjacency.get(edge.from).push(edge.to);
  });

  // ------------------------------------------------
  // Circular Dependency Detection
  // ------------------------------------------------

  const visited = new Set();
  const stack = new Set();

  // Detect circular dependencies in the graph using DFS, which can indicate potential architectural issues and help maintain a clean, acyclic design
  function detectCycle(node) {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const next of adjacency.get(node) || []) {
      if (detectCycle(next)) return true;
    }

    stack.delete(node);
    return false;
  }

  // Run cycle detection for each node, logging a warning if a circular dependency is found, while allowing the diagram to render for further analysis and refactoring
  for (const node of ids) {
    if (detectCycle(node)) {
      console.warn(`⚠ architectureDiagram] Circular dependency detected starting at "${node}"`);
      break;
    }
  }

  // ------------------------------------------------
  // Render Edges
  // ------------------------------------------------

  // Render edges with appropriate Mermaid syntax, applying styles and labels based on configuration, while ensuring that all edges reference valid nodes and adhere to the defined architecture structure
  normalizedEdges.forEach((edge) => {
    const arrow = EDGE_STYLES[edge.style] || EDGE_STYLES.sync;

    const label = edge.label ? `|${String(edge.label).replace(/\n/g, " ").trim()}|` : "";

    lines.push(`${edge.from} ${arrow}${label} ${edge.to}`);
  });

  // ------------------------------------------------
  // Optional Legend
  // ------------------------------------------------

  // Render a legend if specified, providing a reference for the diagram's visual language and ensuring that it does not duplicate existing class definitions, while maintaining clarity and readability
  if (legend) {
    lines.push("");
    lines.push(`subgraph Legend["Legend"]`);
    lines.push(`  L1[Component]`);
    lines.push(`  L2((Datastore))`);
    lines.push(`  L3[[External]]`);
    lines.push(`end`);
    lines.push(`class L1 layerPresentation`);
    lines.push(`class L2 datastore`);
    lines.push(`class L3 layerExternal`);
  }

  return `${String(init || "").trim()}\n${lines.join("\n")}`.trim();
}

/**
 * Diagram helper that injects a standard architecture layer palette into flowchart diagrams and formats with Mermaid init.
 * This ensures consistent styling and layer definitions across all architecture diagrams without requiring manual palette inclusion, while leaving non-flowchart diagrams unaffected.
 *
 * @param {string} init - Mermaid init block string.
 * @param {string} body - Mermaid diagram body string.
 * @return {string} Fully formatted Mermaid diagram string with palette injection for flowcharts.
 *
 * The function checks if the diagram body contains a flowchart definition. If it does, it verifies whether the architecture layer palette is already included to avoid duplication. If the palette is missing, it injects the palette immediately after the first flowchart header. Finally, it formats the entire diagram with the provided Mermaid init block for consistent styling and rendering.
 *
 * This helper abstracts away the need for manual palette management in architecture diagrams, ensuring that all such diagrams adhere to a unified visual language while allowing other diagram types to remain unaffected.
 */
export const diagram = (init, body) => {
  const initStr = String(init || "").trim();
  const bodyStr = String(body || "").trim();

  // Non-flowcharts: leave untouched.
  if (!/^\s*flowchart\b/m.test(bodyStr)) {
    return formatMermaid(`${initStr}\n${bodyStr}`);
  }

  // Avoid double injection.
  const alreadyHasPalette =
    bodyStr.includes("classDef layerPresentation") ||
    bodyStr.includes("Architecture Layer Palette");

  // If palette already exists, skip injection but still format for consistency.
  if (alreadyHasPalette) {
    return formatMermaid(`${initStr}\n${bodyStr}`);
  }

  // Inject palette immediately after the first flowchart header to preserve Mermaid type detection.
  const lines = bodyStr.split("\n");
  const headerIndex = lines.findIndex((l) => /^\s*flowchart\b/.test(l));
  if (headerIndex === -1) {
    return formatMermaid(`${initStr}\n${bodyStr}`);
  }

  // Inject palette immediately after the first flowchart header.
  const injectedBody = [
    ...lines.slice(0, headerIndex + 1),
    ARCH_FLOWCHART_PALETTE,
    ...lines.slice(headerIndex + 1),
  ].join("\n");

  // Format the final diagram with the provided init block.
  return formatMermaid(`${initStr}\n${injectedBody}`);
};
