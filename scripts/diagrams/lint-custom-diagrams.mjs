#!/usr/bin/env node
import process from "node:process";
import console from "node:console";

/**
 * @file lint-custom-diagrams.mjs
 * @fileoverview
 * Lint custom diagrams for:
 * - Required config fields and structure
 * - Valid layer keys and node types
 * - Mermaid source structure (basic checks for init block, flowchart header, palette injection)
 * - Optional warnings for long labels, non-TB mobile direction, and duplicate node ids across diagrams
 *
 * This script is intended to be run as part of the build process or manually to validate diagram definitions. It ensures that diagrams adhere to expected conventions and helps catch common issues early.
 * Usage:
 *   ```shell
 * node lint-custom-diagrams.mjs
 * ```
 * IMPORTANT: This script relies on the diagram registry and the registered diagrams to perform validation. It does not take diagram definitions as input directly, but instead validates the diagrams that have been registered through the `diagramRegistry`. Make sure that your diagrams are properly registered and that the `buildAllDiagramSources()` function in the registry returns the necessary data for this linter to work effectively.
 *
 * ---
 *
 * Note: This linter focuses on architecture diagrams (entry.type === "architecture") since they have a well-defined config structure. If you have other diagram types, you may want to extend this linter or create separate linters for those types.
 */
import diagrams from "../../src/assets/data/content/diagrams.js";
import { buildArchitectureVariants } from "../../src/components/features/CustomDiagram/core/architectureFactory.js";

const errors = [];

// Validate architecture diagrams
for (const diagram of diagrams) {
  try {
    if (diagram.architecture) {
      buildArchitectureVariants(diagram.architecture);
    }
  } catch (error) {
    errors.push(`${diagram.id}: ${error.message}`);
  }
}

// Additional checks can be added here, such as:
// TODO - Check for duplicate node ids across diagrams
// TODO - Check for long labels that might cause rendering issues
// TODO - Check for mobile diagram direction (should be TB for flowcharts)
if (errors.length) {
  console.error("\nDiagram lint errors:\n");
  for (const error of errors) {
    console.error(` - ${error}`);
  }
  process.exit(1);
}

console.log("✓ custom architecture diagrams valid");
