import { BlockType } from "../../../types/ui.types.js";
import formatMermaid from "../../../../scripts/format-mermaid.js";

// Mermaid configuration blocks are standardized across diagrams for consistency and maintainability.
const themeVariables = `themeVariables: {
  "fontFamily": "Lexend Deca, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  "fontSize": "18px",

  "/* Midnight Blue Base */
  "primaryColor": "#131A77",
  "primaryTextColor": "#FFFFFF",
  "primaryBorderColor": "#C9A227",
  "primaryBorderWidth": "2px",

  "secondaryColor": "#131A77",
  "secondaryTextColor": "#e1e1e3",
  "secondaryBorderColor": "#C9A227",

  "/* Force node styling */
  "nodeBkg": "#1f2793",
  "nodeBorder": "#b8860b",
  "nodeTextColor": "#FFFFFF",

  "/* Lines */
  "lineColor": "#C9A227",
  "stroke": "#C9A227",
  "strokeWidth": "3px",
  "fill": "#C9A227",

  "/* Subgraphs */
  "clusterTitle": "#C9A227",
  "clusterColor": "#1C1C1E",
  "clusterBkg": "#147832",
  "clusterBorder": "#a88900",
  "clusterTextColor": "#C9A227",
}`;


/**
 * Standard Mermaid init blocks
 * Enforced by diagram linting & formatting pipeline
 * 
 *  
  
  * 
 */
const FLOWCHART_INIT = `
%%{init:{
  "flowchart":{
    "curve":"natural",
    "nodeSpacing":45,
    "rankSpacing":86,
    "subgraphMargin":"1.5em",
    "subgraphPadding":"0.5em",
    "htmlLabels":true
  },
  ${themeVariables}
}}%%
`;

export const MOBILE_FLOWCHART_INIT = `
%%{init:{
  "flowchart":{
    "curve":"natural",
    "nodeSpacing":24,
    "rankSpacing":36,
    "htmlLabels":true
  },
  ${themeVariables}
}}%%`;

export const SEQUENCE_INIT = `%%{init:{
  "sequence":{
    "diagramMarginX":50,
    "diagramMarginY":22,
    "messageMargin":34,
    "actorMargin":55,
    "boxMargin":12,
    "boxTextMargin":10,
    "noteMargin":10,
    "mirrorActors":false
  },
  ${themeVariables}
}}%%`;

export const STATE_INIT = `
%%{init:{
  "state":{
    "nodeSpacing":50,
    "rankSpacing":60,
    "fontSize":16,
    "transitionLength":2,
    "shape":"rounded"
  },
  ${themeVariables}
}}%%`;

export const MOBILE_STATE_INIT = `
%%{init:{
  "state":{
    "nodeSpacing":25,
    "rankSpacing":30,
    "fontSize":13,
    "transitionLength":1,
    "shape":"rounded"
  },
  ${themeVariables}
}}%%`;

const ARCH_FLOWCHART_PALETTE = `
%% ==========================================================
%% Architecture Layer Palette (Mermaid-safe)
%% - hex colors only (no rgba)
%% - integer px only
%% - avoid rx/ry (parser inconsistencies)
%% ==========================================================

%% Default
classDef default fill:#131A77,stroke:#C9A227,stroke-width:2px,color:#F5F7FF;

%% Presentation
classDef layerPresentation fill:#131A77,stroke:#C9A227,stroke-width:2px,color:#F5F7FF;

%% Application (glass)
classDef layerApplication fill:#1C1C1E,stroke:#D1D1D6,stroke-width:2px,color:#F5F7FF;

%% Domain (gold)
classDef layerDomain fill:#C9A227,stroke:#E6C767,stroke-width:2px,color:#0F0F12;

%% Infrastructure
classDef layerInfrastructure fill:#0F0F12,stroke:#3A3A3C,stroke-width:2px,color:#F5F7FF;

%% Persistence (success)
classDef layerPersistence fill:#147832,stroke:#147832,stroke-width:2px,color:#cBc8ff;

%% External (warning)
classDef layerExternal fill:#a88900,stroke:#a88900,stroke-width:2px,color:#cBc8ff;

%% Common node types
classDef datastore fill:#000000,stroke:#D1D1D6,stroke-width:2px,color:#F5F7FF;
classDef core fill:#C9A227,stroke:#E6C767,stroke-width:3px,color:#0F0F12;
classDef text fill:#131A77,stroke:#C9A227,stroke-width:0px,color:#F5F7FF;
classDef animate stroke-dasharray: 9,5,stroke-dashoffset: 900,animation: dash 25s linear infinite;
classDef accent stroke:#C9A227,stroke-width:2px,color:#c9a227;
`.trim();

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
  }

  // Reduced transparency
  if (reducedTransparency) {
    init = init.replace(`"clusterBkg":"#1C1C1E"`, `"clusterBkg":"#000000"`);
  }

  // Reduced motion
  if (reducedMotion) {
    init = init.replace(/"nodeSpacing":\d+/, `"nodeSpacing":28`);
  }

  return init;
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
const diagram = (init, body) => {
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

/**
 * Generates a strictly layered architectural Mermaid diagram.
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
 * Config structure:
 * {
 *   layers: [
 *     {
 *       key: "presentation",
 *       label: "Presentation Layer",
 *       className: "layerPresentation",
 *       nodes: [
 *         { id: "A", label: "Component A", type: "component" },
 *         { id: "B", label: "Database B", type: "datastore" },
 *       ],
 *     },
 *     {
 *        key: "application",
 *        label: "Application Layer",
 *        className: "layerApplication",
 *        nodes: [
 *          { id: "C", label: "Service C", type: "component" },
 *        ],
 *    },
 *   ],
 *  edges: [
 *    ["A", "C", "calls"],
 *    ["C", "B", "reads/writes"],
 *  ],
 *  direction: "LR" // or "TB"
 * }
 */
export function architectureDiagram(init, config) {
  const { layers = [], edges = [], direction = "LR" } = config;

  const lines = [];
  lines.push(`flowchart ${direction}`);
  lines.push("");

  // ----- Layers -----
  layers.forEach((layer) => {
    lines.push(`subgraph ${layer.key}["${layer.label}"]`);

    layer.nodes.forEach((node) => {
      const isStore = node.type === "datastore";

      const nodeSyntax = isStore ? `${node.id}((${node.label}))` : `${node.id}[${node.label}]`;

      lines.push(`  ${nodeSyntax}`);
    });

    lines.push("end");
    lines.push("");

    // Apply class to each node in layer
    const nodeIds = layer.nodes.map((n) => n.id).join(",");
    lines.push(`class ${nodeIds} ${layer.className}`);
    lines.push("");
  });

  // ----- Edges -----
  edges.forEach(([from, to, label]) => {
    if (label) {
      lines.push(`${from} ==>|${label}| ${to}`);
    } else {
      lines.push(`${from} ==> ${to}`);
    }
  });

  return diagram(init, lines.join("\n"));
}

/**
 * Centralized diagram definitions for portfolio content.
 * Each diagram includes responsive variants and rich descriptions to ensure clarity and accessibility across devices.
 * This structure allows for consistent diagram management and reuse throughout the portfolio, while providing detailed context and explanations to enhance viewer understanding.
 */
export const diagrams = {
  /* ============================================================
     CodeStream - 
     ============================================================ */

  panelEditor: {
    id: "diagram-3panel-editor",
    type: BlockType.DIAGRAM,
    title: "3-Panel Editor – Architecture Flow",
    mobile: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TB
      
%% Authoring
A[Lesson Markdown]
B[Instruction Panel]
C[Ace Editor<br/>HTML · CSS · JS · Python]

A ==> B
C ==> D

%% Execution
D[Execution Router]
E[Web Sandbox<br/>iframe]
F[Python Runtime<br/>Skulpt]
G[Terminal Output]

D ==> E
D ==> F
F ==> G

%% Persistence
H[Save]
I[AWS S3]
J[Teacher & Student Access]

C ==> H ==> I ==> J
`
      ),
    },
    desktop: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart LR
        
%% --- Authoring Layer ---
subgraph Authoring Layer
  A[Lesson Markdown]
  B[Instruction Panel]
  C[Ace Editor<br/>HTML · CSS · JS · Python]
  A ==> B
end

%% --- Runtime Layer ---
subgraph Runtime Layer
  D[Execution Router]
  E[Web Sandbox<br/>iframe]
  F[Python Runtime<br/>Skulpt]
  G[Terminal Output]
  H[Web Output<br/?>iframe]

  D ==>|Web| E
  D ==>|Python| F
  E ==> H
  F ==> G
end

%% --- Persistence Layer ---
subgraph Persistence Layer
  H[Save<br/>Ctrl + S]
  I[AWS S3 Storage]
  J[Teacher & Student Access]

  H ==> I ==> J
end

C ==> D
C ==> H
`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Purpose." },
          {
            type: "text",
            text: " The 3-panel editor models a browser-native IDE designed specifically for structured lessons and classroom environments.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Authoring layer." },
          {
            type: "text",
            text: " Markdown-based instructions render alongside an Ace-powered code editor, keeping content and execution tightly coupled while preserving clarity for students.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Execution layer." },
          {
            type: "text",
            text: " A centralized execution router determines how user code runs based on context.",
          },
        ],
      },

      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "text", text: "Web projects execute inside a sandboxed " },
              { type: "code", text: "iframe" },
              { type: "text", text: ", preventing cross-context leakage." },
            ],
          },
          {
            type: "li",
            children: [
              { type: "text", text: "Python exercises run in-browser using " },
              { type: "code", text: "Skulpt" },
              { type: "text", text: ", eliminating server dependency while preserving safety." },
            ],
          },
        ],
      },

      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Terminal output is surfaced directly in the interface, ensuring immediate feedback without breaking user flow.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Persistence layer." },
          {
            type: "text",
            text: " Projects are explicitly saved using a keyboard shortcut and written to AWS S3, enabling consistent cross-device access for both teachers and students.",
          },
        ],
      },

      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "The architecture balances IDE-level capability with classroom constraints by isolating execution while remaining entirely browser-native.",
          },
        ],
      },
    ],
  },
  organizationLicenseModel: {
    id: "diagram-organization-license-model",
    type: BlockType.DIAGRAM,
    title: "Organization & License Model",
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Purpose." },
          {
            type: "text",
            text: " The organization and license model separates user identity from institutional access control, enabling clean multi-tenant scalability.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Identity and ownership." },
          {
            type: "text",
            text: " Users exist independently of organizations and can maintain personal projects regardless of institutional affiliation.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "License enforcement." },
          {
            type: "text",
            text: " Each organization is governed by a centralized license that determines classroom availability through an access gate.",
          },
        ],
      },

      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "text", text: "A " },
              { type: "strong", text: "valid license" },
              { type: "text", text: " enables full classroom functionality." },
            ],
          },
          {
            type: "li",
            children: [
              { type: "text", text: "An " },
              { type: "strong", text: "expired license" },
              {
                type: "text",
                text: " transitions projects into read-only mode without deleting or restricting visibility.",
              },
            ],
          },
        ],
      },

      {
        type: "p",
        children: [
          {
            type: "text",
            text: "This model preserves student work while maintaining strict access governance across organizations.",
          },
        ],
      },

      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "Separating identity, ownership, and licensing created a scalable foundation for supporting multiple schools without entangling user data with subscription state.",
          },
        ],
      },
    ],
    mobile: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TB
      
U[User]

O[Organization]
P[Personal Projects]

L[License]
G[Access Gate]

C[Classroom]
R[Read-Only Projects]

S[Students]
T[Teachers]

U ==> O
U ==> P

O ==> L ==> G
G ==>|Valid| C
G ==>|Expired| R

C ==> S
C ==> T
`
      ),
    },
    desktop: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TB
          
%% Identity
U[User Identity]

%% Ownership Layer
subgraph Ownership
  O[Organization]
  P[Personal Projects]
end

%% Licensing Layer
subgraph Licensing
  L[Active License]
  G[Access Gate]
  R[Read-Only Mode]
end

%% Classroom Layer
subgraph Classroom
  C[Classroom]
  S[Students]
  T[Teachers]
end

%% Relationships
U ==> O
U ==> P

O ==> L ==> G
G ==>|Valid| C
G ==>|Expired| R

C ==> S
C ==> T
`
      ),
    },
  },
  classroomFlow: {
    id: "diagram-classroom-flow",
    type: BlockType.DIAGRAM,
    title: "Classroom → Project Flow",
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Purpose." },
          {
            type: "text",
            text: " This flow describes how users move from classroom context into active project work within the platform.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Role-aware entry." },
          {
            type: "text",
            text: " Both teachers and students begin on a unified Classrooms page, but are routed to role-specific class lists before converging at a shared Classroom Dashboard.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Project resolution." },
          {
            type: "text",
            text: " When a lesson is selected, a deterministic project resolver decides how work should be handled.",
          },
        ],
      },

      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              {
                type: "text",
                text: "If prior work exists, the system opens the existing project state.",
              },
            ],
          },
          {
            type: "li",
            children: [
              {
                type: "text",
                text: "If no work exists, a new project is cloned from the lesson template and initialized with grading metadata.",
              },
            ],
          },
        ],
      },

      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "This resolver ensured a predictable and low-friction transition from instruction to execution, regardless of user role.",
          },
        ],
      },
    ],
    desktop: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TB
      
U[User] ==> CP[Classrooms Page]

CP ==>|Teacher| CT[Teacher Classroom List]
CP ==>|Student| CS[Student Classroom List]

CT ==> CD[Classroom Dashboard]
CS ==> CD

CD ==> LL[Lesson List]

LL ==> PR[Project Resolver]

PR ==>|Existing Project| OP[Open Project]
PR ==>|New Project| CL[Clone Lesson Template]

CL ==> SP[Student Project<br/>+ Grade Record]
`
      ),
    },
  },
  curriculumModel: {
    id: "diagram-curriculum-model",
    type: BlockType.DIAGRAM,
    title: "Curriculum Composition Model",
    mobile: {
      diagram: diagram(
        MOBILE_FLOWCHART_INIT,
        `flowchart TD
    
    Organization ==> Dashboard
    Dashboard ==> Course
    Course ==> Unit
    Unit ==> Lesson
    
    Lesson ==> Template
    Course ==> Classroom
    
    Lesson ==> Resources`
      ),
    },
    desktop: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart LR
    
    %% --- Structural Hierarchy ---
    subgraph Structural Composition
      Org[Organization]
      Dashboard[Curriculum Dashboard]
      Course[Course]
      Unit[Unit]
      Lesson[Lesson]
    
      Org ==> Dashboard ==> Course ==> Unit ==> Lesson
    end
    
    %% --- Execution Layer ---
    subgraph Execution Context
      Template[Lesson Template]
      Classroom[Classroom Usage]
    
      Lesson ==> Template
      Course ==> Classroom
    end
    
    %% --- Extensibility ---
    subgraph Extensibility
      Resources[Lesson Resources]
      Lesson ==> Resources
    end
    `
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Composable curriculum architecture." },
          {
            type: "text",
            text: " The system models curriculum as a hierarchical composition chain from organization to lesson, enforcing structural boundaries between authoring and execution.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Structure is centralized." },
              {
                type: "text",
                text: " Organizations define dashboards, courses, units, and lessons without duplicating executable content.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Execution is isolated." },
              {
                type: "text",
                text: " Classrooms consume curriculum artifacts without owning them, protecting live environments from structural mutations.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Templates provide indirection." },
              {
                type: "text",
                text: " Lessons reference stable templates, enabling safe updates across multi-organization deployments.",
              },
            ],
          },
        ],
      },
    ],
  },

  /* ============================================================
     Hackathon – Voice-Driven Repair System
     ============================================================ */

  repairWorkflow: {
    id: "diagram-hands-free-repair-workflow",
    type: BlockType.DIAGRAM,
    title: "Hands-Free Repair Workflow",
    diagram: diagram(
      MOBILE_FLOWCHART_INIT,
      `flowchart TD

A[Technician Action]
B[Voice Command]
C[Speech-to-Text]
D[NLP Processor]
E[AWS Lambda]
F[Instruction Parser]
G[Audio Instruction]

A ==> B ==> C ==> D ==> E ==> F ==> G ==> A
`
    ),
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Architectural intent." },
          {
            type: "text",
            text: " This hackathon prototype demonstrates a state-aware, voice-driven repair assistant built using event-driven cloud architecture principles.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Input abstraction layer." },
          {
            type: "text",
            text: " Technician speech is captured as a natural input modality and converted into structured text through a speech-to-text pipeline, abstracting physical interaction away from the workflow.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Intent resolution pipeline." },
          {
            type: "text",
            text: " Transcribed commands are routed through an NLP processor and dispatched to AWS Lambda functions, where intent classification and contextual state evaluation occur.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "State-aware orchestration." },
          {
            type: "text",
            text: " The system maintains repair-step progression within cloud logic, enabling dynamic instruction resolution based on prior actions rather than static command-response mapping.",
          },
        ],
      },

      {
        type: "p",
        children: [
          { type: "strong", text: "Instruction synthesis." },
          {
            type: "text",
            text: " Parsed workflow decisions are transformed into structured procedural guidance and returned as audio output, completing the closed feedback loop without requiring manual device interaction.",
          },
        ],
      },

      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "Although developed within hackathon constraints, the architecture models a scalable, event-driven service layer capable of supporting real-world, hands-free industrial workflows.",
          },
        ],
      },
    ],
  },
  voiceCommands: {
    id: "diagram-voice-command-lifecycle",
    type: BlockType.DIAGRAM,
    title: "Voice Command Lifecycle",
    mobile: {
      diagram: diagram(
        MOBILE_FLOWCHART_INIT,
        `flowchart TD
    
    Tech[Technician]
    Mic[Voice Capture]
    STT[Speech-to-Text]
    NLP[NLP Engine]
    Lambda[AWS Lambda]
    Engine[Instruction Engine]
    Audio[Audio Output]
    
    Tech ==> Mic
    Mic ==> STT
    STT ==> NLP
    NLP ==> Lambda
    Lambda ==> Engine
    Engine ==> Audio
    Audio ==> Tech`
      ),
      description: [
        {
          type: "p",
          children: [
            { type: "text", text: "A technician issues a voice command which flows through " },
            { type: "strong", text: "capture, transcription, intent extraction, and execution" },
            { type: "text", text: " before returning spoken guidance." },
          ],
        },
        {
          type: "ul",
          children: [
            { type: "li", children: [{ type: "text", text: "Audio → Text" }] },
            { type: "li", children: [{ type: "text", text: "Text → Intent" }] },
            { type: "li", children: [{ type: "text", text: "Intent → Action" }] },
            { type: "li", children: [{ type: "text", text: "Action → Spoken Response" }] },
          ],
        },
      ],
    },
    desktop: {
      diagram: diagram(
        SEQUENCE_INIT,
        `sequenceDiagram

participant Tech as Technician
participant Mic as Voice Capture
participant STT as Speech-to-Text
participant NLP as NLP Engine
participant Lambda as AWS Lambda
participant Engine as Instruction Engine
participant Audio as Audio Output

Tech ->> Mic: Issue voice command
Mic ->> STT: Stream audio
STT ->> NLP: Transcribed command
NLP ->> Lambda: Intent + extracted entities
Lambda ->> Engine: Structured action request
Engine ->> Audio: Instruction payload
Audio ==>> Tech: Spoken guidance
`
      ),
      description: [
        {
          type: "p",
          children: [
            { type: "text", text: "This diagram models the " },
            { type: "strong", text: "end-to-end lifecycle" },
            { type: "text", text: " of a technician-issued voice command within the system." },
          ],
        },
        {
          type: "ul",
          children: [
            {
              type: "li",
              children: [
                { type: "strong", text: "Voice Capture" },
                { type: "text", text: " streams raw audio from the technician." },
              ],
            },
            {
              type: "li",
              children: [
                { type: "strong", text: "Speech-to-Text" },
                { type: "text", text: " converts audio into structured text." },
              ],
            },
            {
              type: "li",
              children: [
                { type: "strong", text: "NLP Processing" },
                { type: "text", text: " extracts intent and contextual entities." },
              ],
            },
            {
              type: "li",
              children: [
                { type: "strong", text: "Lambda Orchestration" },
                { type: "text", text: " transforms intent into an executable action." },
              ],
            },
            {
              type: "li",
              children: [
                { type: "strong", text: "Instruction Engine" },
                { type: "text", text: " generates operational guidance." },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          children: [
            {
              type: "text",
              text: "The system behaves as a deterministic command pipeline: audio input becomes structured intent, which becomes actionable guidance.",
            },
          ],
        },
      ],
    },
  },

  /* ============================================================
     Side Projects / SMU
     ============================================================ */

  greenhouseMentalModel: {
    id: "diagram-greenhouse-mental-model",
    type: BlockType.DIAGRAM,
    title: "Mental Model",
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "This project models a Raspberry Pi–based greenhouse controller as a ",
          },
          { type: "strong", text: "deterministic, state-aware automation engine" },
          {
            type: "text",
            text: ". Rather than treating it as a simple GPIO script, the system is structured as a continuous feedback loop that measures environmental conditions and translates them into deliberate actuator decisions.",
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "At runtime, the controller continuously reads telemetry from a DHT11 sensor and evaluates those readings against configuration defined by the active growth mode. Each cycle performs threshold evaluation and mutates relay state only when necessary, maintaining environmental stability without unpredictable side effects.",
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The architecture separates concerns into clearly defined layers:",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Hardware Layer: " },
              {
                type: "text",
                text: "Raspberry Pi, DHT11 sensor, and GPIO-driven relays interfacing with physical systems.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Configuration Layer: " },
              {
                type: "text",
                text: "Growth modes encapsulate humidity thresholds, light schedules, and ventilation policy as data rather than embedded logic.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Control Engine: " },
              {
                type: "text",
                text: "A rule-based evaluation function that interprets environmental input and produces deterministic plug state updates.",
              },
            ],
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "By externalizing growth strategies into declarative mode objects, the controller remains generic and extensible. Adding a new cultivation strategy does not require modifying the decision engine—only supplying a new configuration structure.",
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: " The system functions as a closed feedback loop: measure → evaluate → actuate → repeat. This mental model keeps the automation predictable, transparent, and resilient over long-running execution.",
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The result is a stable embedded control system that runs indefinitely until terminated, continuously steering the greenhouse environment toward its ideal operating conditions while remaining explicit in its state transitions and configuration boundaries.",
          },
        ],
      },
    ],
    desktop: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TD

Sensor([DHT11 Sensor])
Controller[Sensor Controller]
Settings[Growth Mode Configuration]
Logic[Deterministic Decision Engine]
ChangeCheck{State Change Required?}
Delay[Stability Delay 10s]
StateCompare{Desired ≠ Current?}
Apply[Apply Relay Update]
SensorPipeline[Sensor Evaluation Pipeline]
ControlLoop[Device State Management]

%% --------------------------------------------------
%% SENSOR + EVALUATION PIPELINE
%% --------------------------------------------------
subgraph SensorPipeline
direction RL

Sensor ==> Controller
Controller ==> Settings
Settings ==> Logic

end

%% --------------------------------------------------
%% DEVICE CONTROL LOOP
%% --------------------------------------------------
subgraph ControlLoop
direction RL
Logic ==> ChangeCheck


ChangeCheck ==>|No| Delay
ChangeCheck ==>|Yes| StateCompare

StateCompare ==>|No| Delay
StateCompare ==>|Yes| Apply

Apply ==> Delay
Delay ==> SensorPipeline

end        
`
      ),
    },
    mobile: {
      diagram: diagram(
        MOBILE_FLOWCHART_INIT,
        `flowchart TD

Sensor[DHT11 Sensor]
Evaluate[Evaluate Conditions]
Actuate[Update Device State]
Delay[Stability Delay]

Sensor ==> Evaluate ==> Actuate ==> Delay ==> Sensor
`
      ),
    },
  },
  greenhouseAutomation: {
    id: "diagram-greenhouse",
    type: BlockType.DIAGRAM,
    title: "Automation System",
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Autonomous environmental control architecture." },
          {
            type: "text",
            text: " The greenhouse automation system operates as a deterministic feedback engine that continuously senses environmental conditions and applies corrective actions without manual intervention.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Sensing Layer" },
              {
                type: "text",
                text: " – A DHT11 sensor provides periodic temperature and humidity readings to the controller.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Policy / Decision Layer" },
              {
                type: "text",
                text: " – Threshold logic evaluates readings against growth-mode configuration to determine required adjustments.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Actuation Layer" },
              {
                type: "text",
                text: " – GPIO-driven relays toggle physical devices including ventilation, cooling, heating, and humidity control.",
              },
            ],
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "By isolating sensing, policy evaluation, and device actuation into distinct layers, the system enforces a clear architectural boundary between hardware I/O and environmental decision logic.",
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "Once configured, the controller maintains environmental stability through a continuous closed-loop regulation model.",
          },
        ],
      },
    ],
    mobile: {
      diagram: diagram(
        MOBILE_FLOWCHART_INIT,
        `flowchart TD

Sensor[DHT11 Sensor] ==> Controller[Control Loop]
Controller ==> Logic[Threshold Evaluator]

Logic ==>|Temp >= Max| Cooling[Activate Cooling]
Logic ==>|Temp <= Min| ReduceAir[Reduce Airflow]
Logic ==>|Temp Stable| CheckHumidity[Check Humidity]

CheckHumidity ==>|Out of Range| AdjustHumidity[Adjust Humidity]
CheckHumidity ==>|Ideal| Maintain[Maintain State]

Cooling ==> Sensor
ReduceAir ==> Sensor
AdjustHumidity ==> Sensor
Maintain ==> Sensor`
      ),
    },
    desktop: {
      diagram: diagram(
        SEQUENCE_INIT,
        `sequenceDiagram
    
participant Sensor as DHT11 Sensor
participant Controller as Control Loop
participant Logic as Threshold Evaluator
participant Relays as GPIO Relay Board
participant Devices as Environmental Devices

loop Continuous Control Cycle
  Controller ->> Sensor: Poll temperature + humidity
  Sensor ==>> Controller: Sensor readings
  Controller ->> Logic: Evaluate thresholds

  alt Temperature >= Max
    Logic ==>> Controller: Overheat
    Controller ->> Relays: Enable vent + fan
    Relays ->> Devices: Activate cooling
  else Temperature <= Min
    Logic ==>> Controller: Undercool
    Controller ->> Relays: Disable vent + fan
    Relays ->> Devices: Reduce airflow
  else Temperature within range
    Logic ==>> Controller: Temp stable
    Controller ->> Relays: Adjust humidity if needed
    Relays ->> Devices: Apply humidity change
  end
end`
      ),
    },
  },
  encryptionFlow: {
    id: "enigma-client-encrypt-flow",
    type: BlockType.DIAGRAM,
    title: "Encryption Pipeline",
    description: [
      {
        type: "p",
        children: [
          { type: "text", text: "This diagram shows the " },
          { type: "strong", children: [{ type: "text", text: "client-side encryption pipeline" }] },
          {
            type: "text",
            text: ": UI input → mode selection → alphabet version + magic number → per-character rotation → tag append.",
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Everything runs locally in the browser—no server dependency—so the original plaintext never leaves the device.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Mode resolution:" },
              {
                type: "text",
                text: " User input determines whether encryption or decryption logic is executed.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Cipher configuration:" },
              {
                type: "text",
                text: " A random magic number and alphabet version (v1–v9) are selected per operation.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Character rotation:" },
              {
                type: "text",
                text: " Each character is rotated using position-aware alphabet mapping.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Self-describing output:" },
              {
                type: "text",
                text: " Encryption metadata is appended as a tag to enable automatic future decryption.",
              },
            ],
          },
        ],
      },
    ],
    //     mobile: {
    //       diagram: diagram(
    //         FLOWCHART_INIT,
    //         `flowchart TB

    // %% --------------------------------------------------
    // %% INPUT + MODE
    // %% --------------------------------------------------
    // Input["User Input Text"]
    // Trigger["Encrypt Trigger"]
    // Mode["Encryption Mode"]

    // Input ==> Trigger ==> Mode

    // %% --------------------------------------------------
    // %% SETUP (ROW 1)
    // %% --------------------------------------------------
    // subgraph Setup["Setup"]
    //   direction LR
    //   Version["Select Alphabet Version"]
    //   Magic["Generate Magic Number"]
    // end

    // Mode ==> Version
    // Mode ==> Magic

    // %% --------------------------------------------------
    // %% CIPHER PIPELINE (ROW 2)
    // %% --------------------------------------------------
    // subgraph Cipher["Cipher"]
    //   direction LR
    //   Rotate["Per-Character Rotation"]
    //   Tag["Append Encryption Tag"]
    // end

    // Version ==> Rotate
    // Magic ==> Rotate
    // Rotate ==> Tag

    // %% --------------------------------------------------
    // %% OUTPUT
    // %% --------------------------------------------------
    // Tag ==> Output["Encrypted Output"]
    // `
    //       ),
    //     },
    desktop: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart LR

%% --------------------------------------------------
%% CLIENT BOUNDARY
%% --------------------------------------------------
subgraph Interaction[User Interaction]
direction LR
  Input[Plaintext Input]-- submit ==>Trigger[Encrypt Action]
  Trigger-- Keys  ==>Mode[Mode Resolver]
end

subgraph Configuration[Cipher Configuration]
direction LR
  Version[Alphabet Version v1-v9] --- Magic[Random Magic Number]
end

subgraph OutputStage[Output]
direction LR
  Tag[Append Encryption Tag] --- Ciphertext[Encrypted Output]
end

Interaction --- Configuration
Configuration --- Engine
Engine --- OutputStage

Mode ==> Version
Mode ==> Magic
Version ==> Rotate
Magic ==> Rotate`
      ),
    },
    mobile: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TD

%% --------------------------------------------------
%% CLIENT EXECUTION BOUNDARY
%% --------------------------------------------------
subgraph Client["Browser (Client-Side Execution)"]
direction TB

%% --------------------------------------------------
%% INPUT LAYER
%% --------------------------------------------------
subgraph Interaction[User Interaction]
direction LR
  Input[Plaintext Input]
  Trigger[Encrypt Action]
  Mode["Mode Resolver"]
end

Input ==> Trigger ==> Mode

%% --------------------------------------------------
%% CONFIGURATION LAYER
%% --------------------------------------------------
subgraph Configuration[Cipher Configuration]
direction LR
  Version[Alphabet Version v1-v9]
  Magic[Random Magic Number]
end

Mode ==> Version
Mode ==> Magic

%% --------------------------------------------------
%% TRANSFORMATION LAYER
%% --------------------------------------------------
subgraph Transformation["Deterministic Rotation Engine"]
Rotate["Position-Aware Character Rotation"]
end

Version ==> Rotate
Magic ==> Rotate

%% --------------------------------------------------
%% METADATA + OUTPUT
%% --------------------------------------------------
subgraph OutputStage["Self-Describing Output"]
Tag["Append Encryption Tag"]
Ciphertext["Encrypted Text Output"]
end

Rotate ==> Tag ==> Ciphertext

end`
      ),
    },
  },
  decryptFlow: {
    id: "diagram-enigma-decrypt-flow",
    type: BlockType.DIAGRAM,
    title: "Decryption Lifecycle",

    /* ============================================================
       📱 MOBILE VERSION (Vertical Flowchart)
       ============================================================ */
    mobile: {
      description: [
        {
          type: "p",
          children: [
            { type: "text", text: "This diagram focuses purely on the " },
            {
              type: "strong",
              children: [{ type: "text", text: "decryption path" }],
            },
            {
              type: "text",
              text: ". The system detects the encryption tag, extracts the embedded metadata, resolves the correct alphabet version, and reverses the rotation per character.",
            },
          ],
        },
        {
          type: "blockquote",
          children: [
            {
              type: "p",
              children: [
                {
                  type: "text",
                  text: "The tag contains just enough information to make decryption deterministic — no stored keys or server lookups required.",
                },
              ],
            },
          ],
        },
      ],
      diagram: diagram(
        MOBILE_FLOWCHART_INIT,
        `flowchart TD

Input[/Encrypted text entered by user/]
Detect{{Detect encryption info block in input}}
Parse{{Extract version & Magic numbers from info block}}
Resolve{Resolve alphabet set by version number}
Reverse(Reverse rotation decoding each char using magic number and alphabet)
Output[\\Return decrypted output\\]
  
Input ==> Detect
Detect ==> Parse
Parse ==> Resolve
Resolve ==> Reverse
Reverse ==> Output`
      ),
    },
    /* ============================================================
       🖥 DESKTOP VERSION (Sequence Diagram)
       ============================================================ */
    desktop: {
      description: [
        {
          type: "p",
          children: [
            { type: "text", text: "This sequence diagram illustrates how Enigma " },
            {
              type: "strong",
              children: [
                { type: "text", text: "automatically detects and reverses encrypted input" },
              ],
            },
            {
              type: "text",
              text: " using the metadata embedded inside the encryption tag.",
            },
          ],
        },
        {
          type: "ol",
          children: [
            {
              type: "li",
              children: [
                {
                  type: "text",
                  text: "The UI detects the presence of an encryption tag in the pasted input.",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  type: "text",
                  text: "The tag parser extracts the alphabet version and magic number.",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  type: "text",
                  text: "The version resolver selects the correct alphabet set (v1–v9).",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  type: "text",
                  text: "The cipher engine reverses the per-character rotation deterministically.",
                },
              ],
            },
            {
              type: "li",
              children: [
                {
                  type: "text",
                  text: "The decrypted result is rendered immediately with no configuration required.",
                },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          children: [
            {
              type: "p",
              children: [
                {
                  type: "text",
                  text: "Decryption is intentionally frictionless — users never need to remember how encryption was performed.",
                },
              ],
            },
          ],
        },
      ],
      diagram: diagram(
        SEQUENCE_INIT,
        `sequenceDiagram
participant User
participant UI
participant Parser
participant Resolver
participant Engine
participant Output

User ->> UI: Paste encrypted text
UI ->> Parser: Detect encryption tag
Parser ->> Resolver: Extract version + magic number
Resolver ->> Engine: Resolve alphabet set
Engine ->> Engine: Reverse rotation per character
Engine ->> Output: Decrypted text
Output ==>> User: Display result`
      ),
    },
  },
  domainModel: {
    id: "diagram-domain-model",
    type: BlockType.DIAGRAM,
    title: "Narrative Domain Architecture",
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The campaign system is modeled as a hierarchical domain with clearly bounded aggregates. Each layer owns its structural scope while referencing subordinate narrative components.",
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "Storybook acts as the aggregate root, ensuring consistency across acts, rooms, and encounters.",
          },
        ],
      },
    ],
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR
  
  %% -------------------------
  %% Aggregate Root
  %% -------------------------
  subgraph Root["Aggregate Root"]
    SB[(Storybook<br/>Campaign Root)]
  end
  
  %% -------------------------
  %% Narrative Layers
  %% -------------------------
  subgraph Narrative
    ACT[(Act)]
    ROOM[(Room)]
    ENC[(Encounter)]
  end
  
  %% -------------------------
  %% Encounter Components
  %% -------------------------
  subgraph EncounterContext
    OPP[Opponent]
    TRE[Treasure]
  end
  
  SB ==> ACT
  ACT ==> ROOM
  ROOM ==> ENC
  
  ENC ==> OPP
  ENC ==> TRE
  `
    ),
  },
  //   domainModel: {
  //     id: "diagram-domain-model",
  //     type: BlockType.DIAGRAM,
  //     title: "Narrative Domain Model",
  //     description:
  //       "The domain model decomposes a campaign into modular narrative layers. Storybooks contain Acts, which contain Rooms, which define Encounters composed of opponents and rewards. This hierarchy allows complex branching narratives to remain predictable and extensible. In MongoDB, structural boundaries are defined at logical aggregation levels to balance document size, query efficiency, and narrative reuse.",
  //     diagram: diagram(
  //       FLOWCHART_INIT,
  //       `flowchart TD

  // Storybook{{Game Campaign}}
  // Act{{Major Story Arc}}
  // Room[[Explorable Location]]
  // Encounter(Challenge or Event)
  // Opponent>Adversary]
  // Treasure>Reward]

  // Storybook== "Has nany" ==>Act
  // Act== "Has many" ==>Room
  // Room-- "May have" ==> Encounter
  // Encounter-- "May have" ==>Opponent
  // Encounter-- "May have" ==> Treasure
  // Room-- "May have" ==>Treasure`
  //     ),
  //   },
  gifSystemFlow: {
    id: "diagram-gif-freak-system-flow",
    type: BlockType.DIAGRAM,
    title: "GIF Freak – Client/API Architecture",
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The system models a reactive client consuming a third-party API through an asynchronous request lifecycle.",
          },
        ],
      },
    ],
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR
  
  %% -------------------------
  %% Client Layer
  %% -------------------------
  subgraph Client
    UI[Search Interface]
    State[Client State Manager]
    Renderer[Dynamic Render Engine]
  end
  
  %% -------------------------
  %% Network Layer
  %% -------------------------
  subgraph Network
    Fetch[Async Fetch Request]
  end
  
  %% -------------------------
  %% External Service
  %% -------------------------
  subgraph External
    API[Giphy API]
  end
  
  UI ==> State
  State ==> Fetch
  Fetch ==> API
  API ==> Fetch
  Fetch ==> State
  State ==> Renderer
  `
    ),
  },
  stockMemerFlow: {
    id: "diagram-stock-memer-architecture",
    type: BlockType.DIAGRAM,
    title: "Stock Memer – Multi-Service Architecture",
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Stock Memer integrates external market data with user-generated content through a layered architecture separating presentation, application state, persistence, and third-party services.",
          },
        ],
      },
    ],
    diagram: architectureDiagram(FLOWCHART_INIT, {
      direction: "TB",
      layers: [
        {
          key: "external",
          label: "External Services",
          className: "layerExternal",
          nodes: [{ id: "StockAPI", label: "Stock Data API", type: "datastore" }],
        },
        {
          key: "application",
          label: "Application State",
          className: "layerApplication",
          nodes: [{ id: "AppState", label: "Central State Store" }],
        },
        {
          key: "persistence",
          label: "Persistence Layer",
          className: "layerPersistence",
          nodes: [{ id: "Firebase", label: "Firebase Database", type: "datastore" }],
        },
        {
          key: "presentation",
          label: "Presentation Layer",
          className: "layerPresentation",
          nodes: [
            { id: "ChartUI", label: "Chart Interface" },
            { id: "MemeUI", label: "Meme Generator" },
          ],
        },
      ],
      edges: [
        ["StockAPI", "AppState"],
        ["Firebase", "AppState"],
        ["AppState", "ChartUI"],
        ["MemeUI", "Firebase"],
      ],
    }),
  },
  matchFlow: {
    id: "diagram-scion-algorithm-flow",
    type: BlockType.DIAGRAM,
    title: "Compatibility Engine Architecture",
    diagram: diagram(
      FLOWCHART_INIT,
      `
      flowchart LR
       subgraph Input["Input Domain"]
              Survey[("Survey Response Data")]
        end
       subgraph Engine["Scoring Engine"]
              Normalize["Normalization Module"]
              Features["Feature Vector Model"]
              Weighting["Weight Matrix"]
              Aggregate["Compatibility Aggregator"]
        end
       subgraph Output["Output Domain"]
              Ranking["Ranking Resolver"]
              Explanation["Transparency Module"]
        end
        Survey ==> Normalize
        Aggregate ==> Ranking
        Explanation ==> Survey`
    ),
  },
};

export default Object.values(diagrams);
