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
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType, Theme } from "../../types/ui.types.js";
import { formatMermaid } from "../../../scripts/format-mermaid.js";

/**
 * Standard Mermaid init blocks
 * Enforced by diagram linting & formatting pipeline
 */
const FLOWCHART_INIT = `
%%{init:{

  "flowchart":{
    curve: "cardinal",
  },
  
  "themeVariables":{
    shape:"rounded",
    primaryColor: "rgba(var(--blue-rgb), 0.15)",
  }
}}%%

`;

const MOBILE_FLOWCHART_INIT = `
%%{init:{
  "flowchart":{
    curve:"cardinal",
    nodeSpacing: 20,
    rankSpacing: 35,
    shape:"rounded",

  },
  "themeVariables":{
    fontSize: 25,
    padding: 5,
    nodePadding: 6
  }
}}%%
`;

const SEQUENCE_INIT = `%%{init:{
  "sequence":{
    "diagramMarginX":50,
    "diagramMarginY":20,
    "messageMargin":35
  }
}}%%`;

const STATE_INIT = `
%%{init:{
  "state":{
    "nodeSpacing":50,
    "rankSpacing":60,
    "fontSize":16,
    "transitionLength":2,
    "shape": "rounded
  },
  "themeVariables":{
    "fontSize":"15px",
    "primaryBorderWidth":"2px",
    "nodePadding":"6px"
  }
}}%%
`;

const MOBILE_STATE_INIT = `
%%{init:{
  "state":{
    "nodeSpacing":25,
    "rankSpacing":30,
    "fontSize":13,
    "transitionLength":1
  },
  "themeVariables":{
    "fontSize":"13px",
    "primaryBorderWidth":"1.5px",
    "nodePadding":"4px"
  }
}}%%
`;

/**
 * Helper to generate consistently formatted Mermaid diagrams.
 */
const diagram = (init, body) => formatMermaid(`${init}\n${body}`);

export const diagrams = {
  /* ============================================================
     CodeStream – Core Platform
     ============================================================ */

  panelEditor: {
    id: "diagram-3panel-editor",
    type: BlockType.DIAGRAM,
    title: "3-Panel Editor – Architecture Flow",
    theme: Theme.DARK,
    icon: faTableColumns,
    mobile: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TB
      
%% Authoring
A[Lesson Markdown]
B[Instruction Panel]
C[Ace Editor]

A --> B
C --> D

%% Execution
D[Execution Router]
E[Web Sandbox]
F[Python Runtime]
G[Terminal Output]

D --> E
D --> F
F --> G

%% Persistence
H[Save]
I[AWS S3]
J[Teacher & Student Access]

C --> H --> I --> J
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
  A --> B
end

%% --- Runtime Layer ---
subgraph Execution Layer
  D[Execution Router]
  E[Web Sandbox<br/>iframe]
  F[Python Runtime<br/>Skulpt]
  G[Terminal Output]

  D -->|Web| E
  D -->|Python| F
  F --> G
end

%% --- Persistence Layer ---
subgraph Persistence Layer
  H[Save<br/>Ctrl + S]
  I[AWS S3 Storage]
  J[Teacher & Student Access]

  H --> I --> J
end

C --> D
C --> H
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
    theme: Theme.DARK,
    icon: faIdCard,
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

U --> O
U --> P

O --> L --> G
G -->|Valid| C
G -->|Expired| R

C --> S
C --> T
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
U --> O
U --> P

O --> L --> G
G -->|Valid| C
G -->|Expired| R

C --> S
C --> T
`
      ),
    },
  },

  classroomFlow: {
    id: "diagram-classroom-flow",
    type: BlockType.DIAGRAM,
    title: "Classroom → Project Flow",
    theme: Theme.DARK,
    icon: faChalkboardTeacher,
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
    mobile: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart TB
      
U[User]
CP[Classrooms Page]

CT[Teacher List]
CS[Student List]

CD[Classroom Dashboard]
LL[Lesson List]

PR[Project Resolver]

OP[Open Project]
CL[Clone Template]

SP[Student Project]

U --> CP

CP --> CT
CP --> CS

CT --> CD
CS --> CD

CD --> LL
LL --> PR

PR --> OP
PR --> CL

CL --> SP
`
      ),
    },
    desktop: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart LR
      
U[User] --> CP[Classrooms Page]

CP -->|Teacher| CT[Teacher Classroom List]
CP -->|Student| CS[Student Classroom List]

CT --> CD[Classroom Dashboard]
CS --> CD

CD --> LL[Lesson List]

LL --> PR[Project Resolver]

PR -->|Existing Project| OP[Open Project]
PR -->|New Project| CL[Clone Lesson Template]

CL --> SP[Student Project<br/>+ Grade Record]
`
      ),
    },
  },

  curriculumModel: {
    id: "diagram-curriculum-model",
    type: BlockType.DIAGRAM,
    title: "Curriculum Composition Model",
    theme: Theme.DARK,
    icon: faLayerGroup,
    mobile: {
      diagram: diagram(
        MOBILE_FLOWCHART_INIT,
        `flowchart TD
    
    Organization --> Dashboard
    Dashboard --> Course
    Course --> Unit
    Unit --> Lesson
    
    Lesson --> Template
    Course --> Classroom
    
    Lesson --> Resources`
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
    
      Org --> Dashboard --> Course --> Unit --> Lesson
    end
    
    %% --- Execution Layer ---
    subgraph Execution Context
      Template[Lesson Template]
      Classroom[Classroom Usage]
    
      Lesson --> Template
      Course --> Classroom
    end
    
    %% --- Extensibility ---
    subgraph Extensibility
      Resources[Lesson Resources]
      Lesson --> Resources
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
    theme: Theme.DARK,
    icon: faHandsHelping,
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

A --> B --> C --> D --> E --> F --> G --> A
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
    theme: Theme.DARK,
    icon: faHeadset,
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
    
    Tech --> Mic
    Mic --> STT
    STT --> NLP
    NLP --> Lambda
    Lambda --> Engine
    Engine --> Audio
    Audio --> Tech`
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
Audio -->> Tech: Spoken guidance
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
    theme: Theme.DARK,
    icon: faBrain,
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
          { type: "inlineIcon", icon: "cpu" },
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

Sensor --> Controller
Controller --> Settings
Settings --> Logic

end

%% --------------------------------------------------
%% DEVICE CONTROL LOOP
%% --------------------------------------------------
subgraph ControlLoop
direction RL
Logic --> ChangeCheck


ChangeCheck -->|No| Delay
ChangeCheck -->|Yes| StateCompare

StateCompare -->|No| Delay
StateCompare -->|Yes| Apply

Apply --> Delay
Delay --> SensorPipeline

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

Sensor --> Evaluate --> Actuate --> Delay --> Sensor
`
      ),
    },
  },

  greenhouseAutomation: {
    id: "diagram-greenhouse",
    type: BlockType.DIAGRAM,
    title: "Automation System",
    icon: faSeedling,
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

Sensor[DHT11 Sensor] --> Controller[Control Loop]
Controller --> Logic[Threshold Evaluator]

Logic -->|Temp >= Max| Cooling[Activate Cooling]
Logic -->|Temp <= Min| ReduceAir[Reduce Airflow]
Logic -->|Temp Stable| CheckHumidity[Check Humidity]

CheckHumidity -->|Out of Range| AdjustHumidity[Adjust Humidity]
CheckHumidity -->|Ideal| Maintain[Maintain State]

Cooling --> Sensor
ReduceAir --> Sensor
AdjustHumidity --> Sensor
Maintain --> Sensor`
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
  Sensor -->> Controller: Sensor readings
  Controller ->> Logic: Evaluate thresholds

  alt Temperature >= Max
    Logic -->> Controller: Overheat
    Controller ->> Relays: Enable vent + fan
    Relays ->> Devices: Activate cooling
  else Temperature <= Min
    Logic -->> Controller: Undercool
    Controller ->> Relays: Disable vent + fan
    Relays ->> Devices: Reduce airflow
  else Temperature within range
    Logic -->> Controller: Temp stable
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
    theme: Theme.DARK,
    icon: faFileShield,
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

    // Input --> Trigger --> Mode

    // %% --------------------------------------------------
    // %% SETUP (ROW 1)
    // %% --------------------------------------------------
    // subgraph Setup["Setup"]
    //   direction LR
    //   Version["Select Alphabet Version"]
    //   Magic["Generate Magic Number"]
    // end

    // Mode --> Version
    // Mode --> Magic

    // %% --------------------------------------------------
    // %% CIPHER PIPELINE (ROW 2)
    // %% --------------------------------------------------
    // subgraph Cipher["Cipher"]
    //   direction LR
    //   Rotate["Per-Character Rotation"]
    //   Tag["Append Encryption Tag"]
    // end

    // Version --> Rotate
    // Magic --> Rotate
    // Rotate --> Tag

    // %% --------------------------------------------------
    // %% OUTPUT
    // %% --------------------------------------------------
    // Tag --> Output["Encrypted Output"]
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
  Input[Plaintext Input]-- submit -->Trigger[Encrypt Action]
  Trigger-- Keys  -->Mode[Mode Resolver]
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

Mode --> Version
Mode --> Magic
Version --> Rotate
Magic --> Rotate`
      ),
    },

    mobile: {
      diagram: diagram(
        FLOWCHART_INIT,
        `flowchart LR

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

Input --> Trigger --> Mode

%% --------------------------------------------------
%% CONFIGURATION LAYER
%% --------------------------------------------------
subgraph Configuration[Cipher Configuration]
direction LR
  Version[Alphabet Version v1-v9]
  Magic[Random Magic Number]
end

Mode --> Version
Mode --> Magic

%% --------------------------------------------------
%% TRANSFORMATION LAYER
%% --------------------------------------------------
subgraph Transformation["Deterministic Rotation Engine"]
Rotate["Position-Aware Character Rotation"]
end

Version --> Rotate
Magic --> Rotate

%% --------------------------------------------------
%% METADATA + OUTPUT
%% --------------------------------------------------
subgraph OutputStage["Self-Describing Output"]
Tag["Append Encryption Tag"]
Ciphertext["Encrypted Text Output"]
end

Rotate --> Tag --> Ciphertext

end`
      ),
    },
  },
  decryptFlow: {
    id: "diagram-enigma-decrypt-flow",
    type: BlockType.DIAGRAM,
    title: "Decryption Lifecycle",
    theme: Theme.DARK,
    icon: faTimeline,

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
  
Input --> Detect
Detect --> Parse
Parse --> Resolve
Resolve --> Reverse
Reverse --> Output`
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
Output -->> User: Display result`
      ),
    },
  },

  domainModel: {
    id: "diagram-domain-model",
    type: BlockType.DIAGRAM,
    title: "Domain Model",
    icon: faFolderTree,
    description:
      "The domain model outlines the hierarchical structure used to manage campaigns in the D20 King project. Storybooks decompose into acts, rooms, encounters, and rewards, enabling complex narratives to remain organized and scalable.",
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart TD

Storybook --> Act
Act --> Room
Room --> Encounter
Encounter --> Opponent
Encounter --> Treasure
`
    ),
  },
  gifSystemFlow: {
    id: "diagram-gif-freak-system-flow",
    type: BlockType.DIAGRAM,
    title: "GIF Freak – System Flow",
    icon: faUserAstronaut,
    description:
      "This diagram shows how user input propagates through the UI to fetch data from the Giphy API and render results dynamically. It represents early hands-on experience with asynchronous requests and reactive interfaces.",
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR

UserInput --> UI
UI --> GiphyAPI
GiphyAPI --> UI
UI --> GIFDisplay
`
    ),
  },

  stockMemerFlow: {
    id: "diagram-stock-memer-flow",
    type: BlockType.DIAGRAM,
    title: "Stock Memer – Data & Content Flow",
    icon: faArrowTrendDown,
    description:
      "This diagram illustrates how live stock data and user-generated content move through the application. It highlights the interaction between external APIs, client-side processing, and Firebase persistence.",
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart LR

StockAPI --> DataProcessor --> ChartUI
User --> MemeGenerator --> Firebase
Firebase --> StockPage
`
    ),
  },

  matchFlow: {
    id: "diagram-scion-algorithm-flow",
    type: BlockType.DIAGRAM,
    title: "Matching Algorithm Flow",
    icon: faUsersViewfinder,
    description:
      "This flow represents how survey responses are processed through a compatibility algorithm to generate ranked matches. It reflects a shift toward building purpose-driven systems with real-world impact.",
    diagram: diagram(
      FLOWCHART_INIT,
      `flowchart TD

UserProfiles --> SurveyEngine
SurveyEngine --> MatchAlgorithm
MatchAlgorithm --> MatchScores
MatchScores --> UserMatches
`
    ),
  },
};

export default Object.values(diagrams);
