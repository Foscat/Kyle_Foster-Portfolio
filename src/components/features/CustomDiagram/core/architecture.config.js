/**
 * @module src\components\features\CustomDiagram\core\architecture.config
 * @file src\components\features\CustomDiagram\core\architecture.config.js
 * @fileoverview
 * This file defines the configuration for custom diagrams in the portfolio, specifically for architectural diagrams. It provides a structured way to define layers, edge styles, and node shapes that can be used to create consistent and visually appealing diagrams using Mermaid.
 
 * This system provides:
 * - A typed architecture DSL
 * - Automatic layer styling
 * - Node type shapes
 * - Edge styles
 * - Diagram validation
 * - Automatic palette injection
 * - Mobile-friendly layouts
 * - A diagram registry
 * 
 * Everything is deterministic and safe for exported SVG diagrams
 */

// Diagram registry to manage custom diagrams
const ARCH_LAYERS = {
  presentation: {
    label: "Presentation Layer",
    className: "layerPresentation",
  },

  application: {
    label: "Application Layer",
    className: "layerApplication",
  },

  domain: {
    label: "Domain Layer",
    className: "layerDomain",
  },

  infrastructure: {
    label: "Infrastructure Layer",
    className: "layerInfrastructure",
  },

  persistence: {
    label: "Persistence Layer",
    className: "layerPersistence",
  },

  external: {
    label: "External Systems",
    className: "layerExternal",
  },
};
Object.freeze(ARCH_LAYERS);

// Edge styles for different types of interactions in architecture diagrams
const EDGE_STYLES = {
  sync: "-->",
  async: "-.->",
  data: "==>",
  event: "--o",
};
Object.freeze(EDGE_STYLES);

// Node shapes for different component types in architecture diagrams
const NODE_SHAPES = {
  component: (id, label) => `${id}[${label}]`,
  service: (id, label) => `${id}[${label}]`,
  datastore: (id, label) => `${id}((${label}))`,
  queue: (id, label) => `${id}>${label}]`,
  external: (id, label) => `${id}[[${label}]]`,
  decision: (id, label) => `${id}{${label}}`,
};
Object.freeze(NODE_SHAPES);

// Mermaid class definitions for consistent styling of layers and node types
const ARCH_FLOWCHART_PALETTE = `
%% ==========================================================
%% Architecture Layer Palette (Mermaid-safe)
%% - hex colors only (no rgba)
%% - integer px only
%% - avoid rx/ry (parser inconsistencies)
%% ==========================================================

%% Default
classDef default fill:#1F2793,stroke:#C9A227,stroke-width:2px,color:#F5F7FF;

%% Presentation
classDef layerPresentation fill:#1F2793,stroke:#C9A227,stroke-width:2px,color:#F5F7FF;

%% Application (glass)
classDef layerApplication fill:#2A326E,stroke:#D1D1D6,stroke-width:2px,color:#F5F7FF;

%% Domain (gold)
classDef layerDomain fill:#C9A227,stroke:#E6C767,stroke-width:2px,color:#0F0F12;

%% Infrastructure
classDef layerInfrastructure fill:#1A214C,stroke:#7E89C9,stroke-width:2px,color:#F5F7FF;

%% Persistence (success)
classDef layerPersistence fill:#1F6D49,stroke:#C9A227,stroke-width:2px,color:#F5F7FF;

%% External (warning)
classDef layerExternal fill:#8D710D,stroke:#E6C767,stroke-width:2px,color:#F5F7FF;

%% Common node types
classDef datastore fill:#22305F,stroke:#C9A227,stroke-width:2px,color:#F5F7FF;
classDef core fill:#C9A227,stroke:#E6C767,stroke-width:2px,color:#0F0F12;
classDef text fill:#E8EEF9,stroke:#C9A227,stroke-width:2px,color:#0F0F12;
classDef animate stroke-dasharray:,5,stroke-dashoffset:00,animation:ash 25s linear infinite;
classDef accent stroke:#C9A227,stroke-width:2px,color:#c9a227;
classDef dashed stroke-dasharray:,4,stroke-dashoffset:0;
classDef edgePath fill:none,stroke:#C9A227,stroke-width:2px,color:#C9A227;
classDef path stroke:#C9A227,stroke-width:2px,color:#C9A227;
classDef path stroke:#C9A227,stroke-width:2px,color:#C9A227;
`.trim();

const ARCH_FLOWCHART_PALETTE_ALT = `
%% ==========================================================
%% Architecture Layer Palette Alt (App_Alt aligned)
%% ==========================================================

%% Default
classDef default fill:#1D3447,stroke:#5BA4FF,stroke-width:2px,color:#E2EDF5;

%% Presentation
classDef layerPresentation fill:#1D3447,stroke:#5BA4FF,stroke-width:2px,color:#E2EDF5;

%% Application
classDef layerApplication fill:#182631,stroke:#4C687F,stroke-width:2px,color:#E2EDF5;

%% Domain
classDef layerDomain fill:#5BA4FF,stroke:#9CC4FF,stroke-width:2px,color:#09131C;

%% Infrastructure
classDef layerInfrastructure fill:#09131C,stroke:#385268,stroke-width:2px,color:#E2EDF5;

%% Persistence
classDef layerPersistence fill:#215D8D,stroke:#5BA4FF,stroke-width:2px,color:#E2EDF5;

%% External
classDef layerExternal fill:#233E54,stroke:#9CC4FF,stroke-width:2px,color:#E2EDF5;

%% Common node types
classDef datastore fill:#0D1A26,stroke:#5BA4FF,stroke-width:2px,color:#E2EDF5;
classDef core fill:#5BA4FF,stroke:#9CC4FF,stroke-width:2px,color:#09131C;
classDef text fill:#E2EDF5,stroke:#5BA4FF,stroke-width:2px,color:#09131C;
classDef animate stroke-dasharray:,5,stroke-dashoffset:00,animation:ash 25s linear infinite;
classDef accent stroke:#5BA4FF,stroke-width:2px,color:#5BA4FF;
classDef dashed stroke-dasharray:,4,stroke-dashoffset:0;
classDef edgePath fill:none,stroke:#5BA4FF,stroke-width:2px,color:#5BA4FF;
classDef path stroke:#5BA4FF,stroke-width:2px,color:#5BA4FF;
classDef path stroke:#5BA4FF,stroke-width:2px,color:#5BA4FF;
`.trim();

// Mermaid configuration blocks are standardized across diagrams for consistency and maintainability.
const themeVariables = {
  fontFamily: "Lexend Deca, system-ui, sans-serif",
  fontSize: "25px",

  primaryColor: "#131A77",
  primaryTextColor: "#F5F7FF",
  primaryBorderColor: "#b8860b",
  primaryBorderWidth: "3px",

  secondaryColor: "#131A77",
  secondaryTextColor: "#F5F7FF",
  secondaryBorderColor: "#c9a227",

  nodeBkg: "#1f2793",
  nodeBorder: "#b8860b",
  nodeTextColor: "#F5F7FF",
  nodeFontSize: "25px",

  lineColor: "#C9A227",
  stroke: "#b8860b",
  strokeWidth: "3px",
  strokeColor: "#b8860b",
  fill: "#b8860b",

  clusterTitle: "#C9A227",
  clusterColor: "#F5F7FF",
  clusterBkg: "#22305F",
  clusterBorder: "#a88900",
  clusterTextColor: "#F5F7FF",
  clusterFontSize: "25px",
  clusterFontWeight: "600",

  actorBkg: "#131A77",
  actorBorder: "#C9A227",
  actorTextColor: "#e1e1e3",
  actorFontSize: "25px",

  signalColor: "#C9A227",
  signalTextColor: "#F5F7FF",

  labelBoxBkgColor: "#22305F",
  labelBoxBorderColor: "#C9A227",
  labelTextColor: "#C9A227",

  messageColor: "#C9A227",
  messageTextColor: "#F5F7FF",

  loopLineColor: "#C9A227",
  loopTextColor: "#F5F7FF",
};

const themeVariablesAlt = {
  fontFamily: "Lexend Deca, system-ui, sans-serif",
  fontSize: "25px",

  primaryColor: "#182631",
  primaryTextColor: "#E2EDF5",
  primaryBorderColor: "#5BA4FF",
  primaryBorderWidth: "3px",

  secondaryColor: "#1D3447",
  secondaryTextColor: "#E2EDF5",
  secondaryBorderColor: "#9CC4FF",

  nodeBkg: "#1D3447",
  nodeBorder: "#5BA4FF",
  nodeTextColor: "#E2EDF5",
  nodeFontSize: "25px",

  lineColor: "#5BA4FF",
  stroke: "#5BA4FF",
  strokeWidth: "3px",
  strokeColor: "#5BA4FF",
  fill: "#5BA4FF",

  clusterTitle: "#9CC4FF",
  clusterColor: "#E2EDF5",
  clusterBkg: "#0D1A26",
  clusterBorder: "#385268",
  clusterTextColor: "#E2EDF5",
  clusterFontSize: "25px",
  clusterFontWeight: "600",

  actorBkg: "#182631",
  actorBorder: "#5BA4FF",
  actorTextColor: "#E2EDF5",
  actorFontSize: "25px",

  signalColor: "#5BA4FF",
  signalTextColor: "#E2EDF5",

  labelBoxBkgColor: "#0D1A26",
  labelBoxBorderColor: "#5BA4FF",
  labelTextColor: "#9CC4FF",

  messageColor: "#5BA4FF",
  messageTextColor: "#E2EDF5",

  loopLineColor: "#5BA4FF",
  loopTextColor: "#E2EDF5",
};

// Mermaid init strings for flowcharts, with different spacing for desktop and mobile layouts. These are used to ensure that diagrams are rendered with appropriate spacing and styling across different devices, while keeping the callsites clean and consistent.
const FLOWCHART_INIT = `
%%{init:{
  "flowchart":{
    "curve":"stepBefore",
    "nodeSpacing":50,
    "nodeWidth":300,
    "textMargin":10,
    "textSize":25,
    "textWidth":500,
    "rankSpacing":52,
    "fontSize":20,
    "htmlLabels":true
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariables)}
}}%%
`;
Object.freeze(FLOWCHART_INIT);

const FLOWCHART_INIT_ALT = `
%%{init:{
  "flowchart":{
    "curve":"stepBefore",
    "nodeSpacing":50,
    "nodeWidth":300,
    "textMargin":10,
    "textSize":25,
    "textWidth":500,
    "rankSpacing":52,
    "fontSize":20,
    "htmlLabels":true
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariablesAlt)}
}}%%
`;
Object.freeze(FLOWCHART_INIT_ALT);

// Mobile init with tighter spacing for smaller screens, while still maintaining readability and touch-friendliness. This allows the same diagram configuration to adapt to mobile layouts without requiring manual adjustments to spacing or styling at the callsites.
const MOBILE_FLOWCHART_INIT = `
%%{init:{
  "flowchart":{
    "curve":"stepAfter",
    "nodeSpacing":24,
    "rankSpacing":36,
    "fontSize":25,
    "htmlLabels":true
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariables)}
}}%%
`;
Object.freeze(MOBILE_FLOWCHART_INIT);

const MOBILE_FLOWCHART_INIT_ALT = `
%%{init:{
  "flowchart":{
    "curve":"stepAfter",
    "nodeSpacing":24,
    "rankSpacing":36,
    "fontSize":25,
    "htmlLabels":true
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariablesAlt)}
}}%%
`;
Object.freeze(MOBILE_FLOWCHART_INIT_ALT);

const SEQUENCE_INIT = `%%{init:{
  "sequence":{
    "textSize":25,
    "diagramMarginX":50,
    "diagramMarginY":10,
    "messageMargin":35,
    "actorMargin":30,
    "actorFontSize":25,
    "actorFontWeight":"bold",
    "boxMargin":12,
    "boxTextMargin":10,
    "noteMargin":10,
    "noteFontSize":25,
    "mirrorActors":true,
    "htmlLabels":true,
    "actorFontSize":25,
    "messageFontSize":25,
    "noteFontSize":25
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariables)}
}}%%`;

const SEQUENCE_INIT_ALT = `%%{init:{
  "sequence":{
    "textSize":25,
    "diagramMarginX":50,
    "diagramMarginY":10,
    "messageMargin":35,
    "actorMargin":30,
    "actorFontSize":25,
    "actorFontWeight":"bold",
    "boxMargin":12,
    "boxTextMargin":10,
    "noteMargin":10,
    "noteFontSize":25,
    "mirrorActors":true,
    "htmlLabels":true,
    "actorFontSize":25,
    "messageFontSize":25,
    "noteFontSize":25
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariablesAlt)}
}}%%`;

const STATE_INIT = `
%%{init:{
  "state":{
    "nodeSpacing":50,
    "rankSpacing":60,
    "fontSize":25,
    "transitionLength":2,
    "shape":"rounded"
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariables)}
}}%%`;

const STATE_INIT_ALT = `
%%{init:{
  "state":{
    "nodeSpacing":50,
    "rankSpacing":60,
    "fontSize":25,
    "transitionLength":2,
    "shape":"rounded"
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariablesAlt)}
}}%%`;

const MOBILE_STATE_INIT = `
%%{init:{
  "state":{
    "nodeSpacing":20,
    "rankSpacing":30,
    "fontSize":25,
    "transitionLength":1,
    "shape":"rounded"
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariables)}
}}%%`;

const MOBILE_STATE_INIT_ALT = `
%%{init:{
  "state":{
    "nodeSpacing":20,
    "rankSpacing":30,
    "fontSize":25,
    "transitionLength":1,
    "shape":"rounded"
  },
  "theme":"base",
  "themeVariables": ${JSON.stringify(themeVariablesAlt)}
}}%%`;

export {
  ARCH_LAYERS,
  EDGE_STYLES,
  NODE_SHAPES,
  ARCH_FLOWCHART_PALETTE,
  ARCH_FLOWCHART_PALETTE_ALT,
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
