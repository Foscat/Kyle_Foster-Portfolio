import resolveDiagram from "./resolveDiagrams.js";
import {
  registerDiagram,
  getDiagramEntry,
  listDiagramIds,
  buildDiagramSources,
  buildAllDiagramSources,
} from "./diagramRegistry.js";
import buildArchitectureVariants from "./architectureFactory.js";
import { getResponsiveFlowchartInit } from "./mermaidInit.js";
import { architectureDiagram, diagram } from "./customDiagram.js";
import {
  ARCH_FLOWCHART_PALETTE,
  ARCH_FLOWCHART_PALETTE_ALT,
  ARCH_LAYERS,
  NODE_SHAPES,
  EDGE_STYLES,
  FLOWCHART_INIT,
  FLOWCHART_INIT_ALT,
  MOBILE_FLOWCHART_INIT,
  MOBILE_FLOWCHART_INIT_ALT,
  STATE_INIT,
  STATE_INIT_ALT,
  MOBILE_STATE_INIT,
  MOBILE_STATE_INIT_ALT,
  SEQUENCE_INIT,
  SEQUENCE_INIT_ALT,
  themeVariables,
  themeVariablesAlt,
} from "./architecture.config.js";

const diagramConfig = {
  ARCH_FLOWCHART_PALETTE,
  ARCH_FLOWCHART_PALETTE_ALT,
  ARCH_LAYERS,
  NODE_SHAPES,
  EDGE_STYLES,
  FLOWCHART_INIT,
  FLOWCHART_INIT_ALT,
  MOBILE_FLOWCHART_INIT,
  MOBILE_FLOWCHART_INIT_ALT,
  STATE_INIT,
  STATE_INIT_ALT,
  MOBILE_STATE_INIT,
  MOBILE_STATE_INIT_ALT,
  SEQUENCE_INIT,
  SEQUENCE_INIT_ALT,
  themeVariables,
  themeVariablesAlt,
};

export {
  diagram,
  resolveDiagram,
  registerDiagram,
  getDiagramEntry,
  listDiagramIds,
  buildDiagramSources,
  buildAllDiagramSources,
  buildArchitectureVariants,
  architectureDiagram,
  getResponsiveFlowchartInit,
  diagramConfig,
};
