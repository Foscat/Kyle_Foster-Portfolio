import {
  faTimeline,
  faTableColumns,
  faIdCard,
  faChalkboardTeacher,
  faLayerGroup,
  faHandsHelping,
  faHeadset,
  faUsersViewfinder,
  faSeedling,
  faFileShield,
  faFolderTree,
  faUserAstronaut,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType, Theme } from "../../types/ui.types.js";
import { formatMermaid } from "../../../scripts/format-mermaid.js";

/**
 * Standard Mermaid init block
 * Enforced by diagram linter
 */
const FLOWCHART_INIT = `%%{init:{
  "flowchart":{
    "curve":"basis",
    "nodeSpacing":40,
    "rankSpacing":60
  }
}}%%`;

const SEQUENCE_INIT = `%%{init:{
  "sequence":{
    "diagramMarginX":50,
    "diagramMarginY":20,
    "messageMargin":35
  }
}}%%`;

const diagram = (init, body) => formatMermaid(`${init}\n${body}`);

export const diagrams = {
  /* ============================================================
     CodeStream
     ============================================================ */

  panelEditor: {
    id: "diagram-3panel-editor",
    type: BlockType.DIAGRAM,
    title: "3-Panel Editor – Architecture Flow",
    theme: Theme.DARK,
    icon: faTableColumns,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR

subgraph Authoring
  A[Lesson Markdown<br/>ReactMarkdown]
  C[Ace Editor<br/>HTML · CSS · JS · Python]
  B[Instruction Panel]
end

subgraph Runtime
  D[Execution Layer]
  E[Web Sandbox<br/>iframe]
  F[Python Runtime<br/>Skulpt]
  G[Terminal Output]
end

subgraph Persistence
  H[Save Shortcut<br/>Ctrl + S]
  I[AWS S3 Storage]
  J[Teacher & Student Access]
end

  A --> B
  C --> D
  D -->|Web| E
  D -->|Python| F
  F --> G
  C --> H --> I --> J
`
    ),
    description:
      "The editor pipeline connects Markdown instructions, an Ace-based code editor, dual execution paths for Web and Python, and AWS S3 persistence.",
  },

  organizationLicenseModel: {
    id: "diagram-organization-license-model",
    type: BlockType.DIAGRAM,
    title: "Organization & License Model",
    theme: Theme.DARK,
    icon: faIdCard,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart TB

U[User]

subgraph Ownership
  O[Organization]
  P[Personal Projects]
end

subgraph Licensing
  L[License]
  X[Access Check]
  R[Read-Only Projects]
end

subgraph Classroom
  C[Classroom]
  S[Students]
  T[Teachers]
end

U --> O
U --> P

O --> L --> X
X -->| Valid | C
X -->| Expired | R

C --> S
C --> T`
    ),
    description:
      "Organizations operate under licenses that control classroom access, roles, and participation limits.",
  },

  classroomFlow: {
    id: "diagram-classroom-flow",
    type: BlockType.DIAGRAM,
    title: "Classroom Flow",
    theme: Theme.DARK,
    icon: faChalkboardTeacher,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR

U[User] --> CP[Classrooms Page]

CP -->|Teacher| CT[Teacher Classes]
CP -->|Student| CS[Student Classes]

CT --> CD[Classroom Dashboard]
CS --> CD

CD --> L[Lesson List]
L --> PR[Project Resolver]

PR -->|Existing| PX[Open Project]
PR -->|New| PC[Clone Template]
PC --> PS[Student Project + Grade Entry]
`
    ),
    description:
      "Users transition from classrooms into lesson-driven project work through a predictable flow.",
  },

  curriculumModel: {
    id: "diagram-curriculum-model",
    type: BlockType.DIAGRAM,
    title: "Curriculum Model",
    theme: Theme.DARK,
    icon: faLayerGroup,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart TB

O[Organization]
CD[Curriculum Dashboard]

O --> CD --> C[Course]
C --> U[Unit]
U --> L[Lesson]

L --> R[Resources]
L --> T[Lesson Template]
C --> CL[Classroom Usage]
`
    ),
    description:
      "Courses are composed of reusable units and lessons that classrooms consume consistently.",
  },

  /* ============================================================
     Hackathon
     ============================================================ */

  repairWorkflow: {
    id: "diagram-hands-free-repair-workflow",
    type: BlockType.DIAGRAM,
    title: "Hands-Free Repair Workflow",
    theme: Theme.DARK,
    icon: faHandsHelping,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR
A[Technician Action]
B[Voice Command]
C[Speech-to-Text]
D[NLP Processor]
E[AWS Lambda]
F[Instruction Parser]
G[Audio Instruction]

A --> B --> C --> D --> E --> F --> G --> A
`
    ),
    description:
      "Voice-driven loop enabling technicians to work hands-free while the system tracks workflow.",
  },

  voiceCommands: {
    id: "diagram-voice-command-lifecycle",
    type: BlockType.DIAGRAM,
    title: "Voice Command Lifecycle (System-Level)",
    theme: Theme.DARK,
    icon: faHeadset,
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
  
  Tech ->> Mic: Speak command
  Mic ->> STT: Raw audio
  STT ->> NLP: Transcribed text
  NLP ->> Lambda: Intent + entities
  Lambda ->> Engine: Action request
  Engine ->> Audio: Instruction payload
  Audio -->> Tech: Spoken guidance
  `
    ),
    description:
      "Technical sequence showing how a spoken command propagates through transcription, intent parsing, cloud execution, and audio response.",
  },

  systemArchitecture: {
    id: "diagram-system-architecture-team-contribution",
    type: BlockType.DIAGRAM,
    title: "System Architecture + Team Contribution",
    theme: Theme.DARK,
    icon: faUsersViewfinder,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart TB
subgraph Frontend
  UI[UI Layer]
  STT[Speech Input]
  TTS[Audio Output]
end

subgraph Backend
  API[REST API]
end

subgraph Services
  NLP[NLP Router]
  Logic[Step Logic]
  XML[XML Parser]
end

UI --> STT --> NLP
NLP --> API --> Logic --> XML
XML --> Logic --> TTS --> UI
`
    ),
    description: "Modular architecture showing frontend, backend, and service responsibilities.",
  },

  commandLifecycle: {
    id: "diagram-command-lifecycle",
    type: BlockType.DIAGRAM,
    title: "Command Lifecycle",
    description:
      "Detailed sequence diagram illustrating the end-to-end flow of a voice command through the system components.",
    theme: Theme.DARK,
    icon: faTimeline,
    diagram: diagram(
      SEQUENCE_INIT,
      `sequenceDiagram
participant Tech as Technician
participant STT as Speech-to-Text
participant NLP as Command Processor
participant Lambda as AWS Lambda
participant Parser as XML Parser
participant App as TTS Engine

Tech->>STT: Speak command
STT->>NLP: Transcribed text
NLP->>Lambda: Intent
Lambda->>Parser: Fetch instruction
Parser->>Lambda: Step data
Lambda->>App: Response
App->>Tech: Audio instruction
`
    ),
  },

  /* ============================================================
     Side Projects / SMU
     ============================================================ */

  greenhouseAutomation: {
    id: "diagram-greenhouse",
    type: BlockType.DIAGRAM,
    title: "Greenhouse Automation System",
    icon: faSeedling,
    description:
      "Shows the flow of data from temperature and humidity sensors through the Raspberry Pi control logic to actuate environmental devices via a relay board.",
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR
Sensors[Temp & Humidity Sensors]
Pi[Raspberry Pi Zero]
Logic[Control Logic]
Relays[Relay Board]
Devices[Heaters / Fans / Humidifiers]

Sensors --> Pi --> Logic --> Relays --> Devices
`
    ),
  },

  encryptionFlow: {
    id: "diagram-encryption-flow",
    type: BlockType.DIAGRAM,
    title: "Encryption Flow",
    icon: faFileShield,
    description:
      "Depicts the process of encrypting plain text using a multi-alphabet cipher within the web application.",
    theme: Theme.DARK,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR
Input[Plain Text]
Cipher[Multi-Alphabet Cipher]
Output[Encrypted Text]

Input --> Cipher --> Output`
    ),
  },

  domainModel: {
    id: "diagram-domain-model",
    type: BlockType.DIAGRAM,
    title: "Domain Model",
    description:
      "Illustrates the core entities and relationships within the D20 Dungeon Master application.",
    icon: faFolderTree,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart TD
Storybook --> Act
Act --> Room
Room --> Encounter
Encounter --> Opponent
Encounter --> Treasure`
    ),
  },
  gifSystemFlow: {
    id: "diagram-gif-freak-system-flow",
    type: BlockType.DIAGRAM,
    title: "System Flow",
    description:
      "Illustrates how user input flows through the GIF Freak application to fetch and display GIFs from the Giphy API.",
    icon: faUserAstronaut,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR
UserInput --> UI
UI --> GiphyAPI
GiphyAPI --> UI
UI --> GIFDisplay`
    ),
  },
  stockMemerFlow: {
    id: "diagram-stock-memer-flow",
    type: BlockType.DIAGRAM,
    title: "Data & Content Flow",
    icon: faArrowTrendDown,
    description:
      "Shows how stock data and user-generated content flow through the Stock Memer application.",
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR
  StockAPI --> DataProcessor --> ChartUI
  User --> MemeGenerator --> Firebase
  Firebase --> StockPage`
    ),
  },
  matchFlow: {
    id: "diagram-scion-algorithm-flow",
    type: BlockType.DIAGRAM,
    title: "Matching Algorithm Flow",
    description:
      "Depicts the flow of data through the Scion Matches compatibility algorithm based on user survey responses.",
    icon: faUsersViewfinder,
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart TD
  UserProfiles --> SurveyEngine
  SurveyEngine --> MatchAlgorithm
  MatchAlgorithm --> MatchScores
  MatchScores --> UserMatches`
    ),
  },
};

const diagramValues = Object.values(diagrams);

export default diagramValues;
