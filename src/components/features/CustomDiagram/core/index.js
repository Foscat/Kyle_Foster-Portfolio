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
  ARCH_LAYERS,
  NODE_SHAPES,
  EDGE_STYLES,
  FLOWCHART_INIT,
  MOBILE_FLOWCHART_INIT,
  STATE_INIT,
  MOBILE_STATE_INIT,
  SEQUENCE_INIT,
  themeVariables,
} from "./architecture.config.js";

const diagramConfig = {
  ARCH_FLOWCHART_PALETTE,
  ARCH_LAYERS,
  NODE_SHAPES,
  EDGE_STYLES,
  FLOWCHART_INIT,
  MOBILE_FLOWCHART_INIT,
  STATE_INIT,
  MOBILE_STATE_INIT,
  SEQUENCE_INIT,
  themeVariables,
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
