/**
 * @file src\assets\data\content\side-projects\diagrams.js
 * @description src\assets\data\content\side-projects\diagrams module.
 * @module src\assets\data\content\side-projects\diagrams
 */

import {
  diagramConfig,
  diagram,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  interactiveSurfaceStateModel: {
    id: "diagram-interactive-surface-state-model",
    type: "diagram",
    title: "Interaction State Model",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR
  
  Base[Base Surface]
  Hover[Hover State]
  Focus[Focus Visible]
  Active[Active or Toggled]
  Pressed[Pressed]
  Disabled[Disabled]
  
  Base ==> Hover
  Base ==> Focus
  Hover ==> Active
  Focus ==> Active
  Active ==> Pressed
  Base ==> Disabled
  Hover ==> Disabled
  Focus ==> Disabled
  Active ==> Disabled`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB
  
  Base[Base Surface]
  Hover[Hover State]
  Focus[Focus Visible]
  Active[Active or Toggled]
  Pressed[Pressed]
  Disabled[Disabled]
  
  Base ==> Hover
  Base ==> Focus
  Hover ==> Active
  Focus ==> Active
  Active ==> Pressed
  Base ==> Disabled
  Hover ==> Disabled
  Focus ==> Disabled
  Active ==> Disabled`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "text", text: "This diagram frames the library as a " },
          {
            type: "strong",
            children: [{ type: "text", text: "state-driven interaction primitive" }],
          },
          {
            type: "text",
            text: " rather than a collection of isolated hover effects.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Base state:" },
              {
                type: "text",
                text: " provides the default interaction surface and visual contract.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Interactive transitions:" },
              {
                type: "text",
                text: " hover, focus, active, and pressed states are modeled explicitly instead of improvised per component.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Disabled behavior:" },
              {
                type: "text",
                text: " the model explicitly accounts for non-interactive states so they remain visually consistent.",
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
            text: "The deeper value of the project is consistency: every interactive surface follows the same behavioral rules.",
          },
        ],
      },
    ],
  },

  interactiveSurfaceTokenFlow: {
    id: "diagram-interactive-surface-token-flow",
    type: "diagram",
    title: "Token Resolution Flow",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR
  
  Preferred[Preferred Package Tokens]
  Legacy[Legacy Fallback Tokens]
  Semantic[Semantic App Tokens]
  Defaults[Safe Defaults]
  Resolved[Resolved Internal Values]
  Surface[Interactive Surface]
  States[Visual States]
  
  Preferred ==> Resolved
  Legacy ==> Resolved
  Semantic ==> Resolved
  Defaults ==> Resolved
  Resolved ==> Surface
  Resolved ==> States`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB
  
  Preferred[Preferred Package Tokens]
  Legacy[Legacy Fallback Tokens]
  Semantic[Semantic App Tokens]
  Defaults[Safe Defaults]
  Resolved[Resolved Internal Values]
  Surface[Interactive Surface]
  States[Visual States]
  
  Preferred ==> Resolved
  Legacy ==> Resolved
  Semantic ==> Resolved
  Defaults ==> Resolved
  Resolved ==> Surface
  Resolved ==> States`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "text", text: "The theming model is designed around " },
          { type: "strong", children: [{ type: "text", text: "fallback-based token resolution" }] },
          {
            type: "text",
            text: " so the primitive can be adopted in different environments without forcing one rigid theme system.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Preferred tokens:" },
              {
                type: "text",
                text: " package-level names provide the clearest public contract.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Fallback layers:" },
              {
                type: "text",
                text: " legacy, semantic, and safe-default values support incremental adoption.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Resolved output:" },
              {
                type: "text",
                text: " final values drive both the base surface and its interaction states.",
              },
            ],
          },
        ],
      },
    ],
  },

  mernAuthLifecycle: {
    id: "diagram-mern-auth-lifecycle",
    type: "diagram",
    title: "Authentication Lifecycle",
    desktop: {
      diagram: diagram(
        diagramConfig.SEQUENCE_INIT,
        `sequenceDiagram
  participant User
  participant Client as React Client
  participant API as Express API
  participant DB as MongoDB
  
  User ->> Client: Submit login form
  Client ->> API: POST /api/users/login
  API ->> DB: Validate credentials
  DB -->> API: User found
  API -->> Client: Access token + refresh cookie
  
  Client ->> API: Request protected resource
  API -->> Client: 401 when token expires
  
  Client ->> API: POST /api/users/refresh
  API -->> Client: New access token
  Client ->> API: Retry queued requests
  API -->> Client: Protected response`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB
  
  Login[Login Request]
  Access[Access Token Issued]
  Cookie[Refresh Cookie Stored]
  Protected[Protected API Request]
  Expired{Access Token Expired?}
  Refresh[Refresh Endpoint]
  Retry[Retry Original Request]
  Success[Protected Response + Continue Session]
  
  Login ==> Access ==> Cookie ==> Protected ==> Expired
  Expired ==>|Yes| Refresh ==> Retry ==> Success
  Expired ==>|No| Success`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "text", text: "This flow shows the split between " },
          { type: "strong", children: [{ type: "text", text: "short-lived access tokens" }] },
          { type: "text", text: " and a " },
          { type: "strong", children: [{ type: "text", text: "refresh-based session path" }] },
          {
            type: "text",
            text: ", which is a core architectural concept in the template.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Access token:" },
              {
                type: "text",
                text: " used for normal authenticated API requests.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Refresh cookie:" },
              {
                type: "text",
                text: " supports session continuation without forcing constant re-login.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Retry handling:" },
              {
                type: "text",
                text: " failed requests can resume after refresh instead of immediately breaking the user flow.",
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
            text: "The template is designed around real session behavior, not just successful login demos.",
          },
        ],
      },
    ],
  },

  mernDeploymentFlow: {
    id: "diagram-mern-deployment-flow",
    type: "diagram",
    title: "Single-Service Deployment Shape",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR
  
  Browser[Browser]
  Client[React + Vite Client]
  Server[Express Server]
  Routes[API Routes]
  Auth[JWT + Refresh Handling]
  DB[MongoDB]
  
  Browser ==> Client
  Client ==> Server
  Server ==> Routes
  Server ==> Client
  Routes ==> Auth
  Routes ==> DB`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB
  
  Browser[Browser]
  Client[React Client]
  Server[Express Server]
  API[API Routes]
  Auth[Auth Middleware]
  DB[MongoDB]
  
  Browser ==> Client ==> Server
  Server ==> API
  API ==> Auth
  API ==> DB`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "text", text: "This diagram emphasizes the template’s " },
          { type: "strong", children: [{ type: "text", text: "practical deployment model" }] },
          {
            type: "text",
            text: ": one server can host the API and serve the built client in production.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Frontend:" },
              {
                type: "text",
                text: " Vite handles development and build output for the React client.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Backend:" },
              {
                type: "text",
                text: " Express owns routing, auth concerns, and application hosting in production.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Operational value:" },
              {
                type: "text",
                text: " a simpler hosting story makes the starter easier to launch and reuse.",
              },
            ],
          },
        ],
      },
    ],
  },
  greenhouseMentalModel: {
    id: "diagram-greenhouse-mental-model",
    type: "diagram",
    title: "Greenhouse Controller – Mental Model",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Sense[Sense]
  Sensor>DHT11 Sensor]
  Read[[Sensor Read Cycle]]
end

subgraph Decide[Decide]
  Config{{Growth Mode Configuration}}
  Engine[/"Deterministic Decision Engine"\\]
  Compare{Desired State\nDiffers?}
end

subgraph Act[Act]
  Apply[Apply Relay Update]
  Delay([Stability Delay])
end

Read==> Sensor==>|Send Values|Config ==> Engine ==> Compare
Compare==>|No|Delay
Compare==>|Yes|Apply ==> Delay
Delay==>|After Wait|Sense`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Sensor>DHT11 Sensor]
Read[[Sensor Read Cycle]]
Config{{Growth Mode Configuration}}
Engine[/"Deterministic Decision Engine"\\]
Compare{Desired State Differs?}
Apply[\\Apply Relay Update\\]
Delay([Stability Delay])

Read==>|Get climate\n readings|Sensor==>|Send Values|Config ==> Engine ==> Compare
Compare ==>|No| Delay
Compare ==>|Yes| Apply ==> Delay
Delay ==> Read`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "This project treats a Raspberry Pi greenhouse controller as a ",
          },
          { type: "strong", text: "deterministic closed-loop control system" },
          {
            type: "text",
            text: ", not just a collection of GPIO scripts. Sensor input, policy evaluation, and relay state updates are modeled as explicit phases in a recurring cycle.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Sense." },
              {
                type: "text",
                text: " The controller gathers environmental telemetry from the DHT11 sensor on a recurring interval.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Decide." },
              {
                type: "text",
                text: " Readings are interpreted against a growth-mode configuration so thresholds remain data-driven rather than hardcoded into the loop.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Act." },
              {
                type: "text",
                text: " Relay state is mutated only when the desired outcome differs from the current physical state, which reduces unnecessary switching and stabilizes the environment.",
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
            text: "The important architectural move is separating environmental policy from hardware control so new growing strategies can be added as configuration instead of rewrites.",
          },
        ],
      },
    ],
  },
  greenhouseAutomation: {
    id: "diagram-greenhouse",
    type: "diagram",
    title: "Automation System",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Sensor[DHT11 Sensor] ==> Controller[Control Loop]
Controller ==> Logic[Threshold Evaluator]
Logic ==>|Too Hot| Cooling[Enable Cooling]
Logic ==>|Too Cold| ReduceAir[Reduce Airflow]
Logic ==>|Humidity Drift| Humidity[Adjust Humidity]
Logic ==>|Stable| Maintain[Maintain Current State]
Cooling ==> Sensor
ReduceAir ==> Sensor
Humidity ==> Sensor
Maintain ==> Sensor`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.SEQUENCE_INIT,
        `sequenceDiagram
participant Sensor as DHT11 Sensor
participant ControlLoop as Control Loop
participant Logic as Threshold Evaluator
participant Relays as GPIO Relay Board
participant Devices as Fan / Vent / Humidity Devices

loop Continuous control cycle
  ControlLoop ->> Sensor: Poll temperature + humidity
  Sensor -->> ControlLoop: Current readings
  ControlLoop ->> Logic: Evaluate thresholds

  alt Temperature above target
    Logic -->> ControlLoop: Cooling required
    ControlLoop ->> Relays: Enable cooling relays
    Relays ->> Devices: Increase airflow / cooling
  else Temperature below target
    Logic -->> ControlLoop: Reduce airflow
    ControlLoop ->> Relays: Disable cooling relays
    Relays ->> Devices: Lower airflow
  else Humidity outside range
    Logic -->> ControlLoop: Correct humidity
    ControlLoop ->> Relays: Toggle humidity device
    Relays ->> Devices: Apply humidity correction
  else Stable environment
    Logic -->> ControlLoop: Hold state
  end
end`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Autonomous environmental control." },
          {
            type: "text",
            text: " The greenhouse automation system functions as a continuous regulation loop that senses, evaluates, and actuates without requiring manual intervention after configuration.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Sensing layer." },
              {
                type: "text",
                text: " Temperature and humidity readings provide the raw environmental signal that drives every control decision.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Decision layer." },
              {
                type: "text",
                text: " Threshold logic compares live telemetry to target bands and determines whether cooling, airflow reduction, humidity correction, or no action is appropriate.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Actuation layer." },
              {
                type: "text",
                text: " GPIO-connected relays convert software state changes into physical device control over fans, vents, and humidity hardware.",
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
            text: "The key quality here is not just automation, but predictable automation: every device change is traceable back to the same threshold-evaluation cycle.",
          },
        ],
      },
    ],
  },
  encryptionFlow: {
    id: "enigma-client-encrypt-flow",
    type: "diagram",
    title: "Encryption Pipeline",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Input[User Interaction]
  Plain[Plaintext Input]
  Trigger[Encrypt Action]
  Mode[Mode Resolver]
  Plain ==> Trigger ==> Mode
end

subgraph Config[Cipher Configuration]
  Version[Alphabet Version v1-v9]
  Magic[Random Magic Number]
  Mode ==> Version
  Mode ==> Magic
end

subgraph Transform[Transformation]
  Rotate[Position-Aware Character Rotation]
  Version ==> Rotate
  Magic ==> Rotate
end

subgraph Output[Output]
  Tag[Append Encryption Tag]
  Cipher[Encrypted Output]
  Rotate ==> Tag ==> Cipher
end`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Plain[Plaintext Input]
Trigger[Encrypt Action]
Mode[Mode Resolver]
Version[Alphabet Version v1-v9]
Magic[Random Magic Number]
Rotate[Position-Aware Character Rotation]
Tag[Append Encryption Tag]
Cipher[Encrypted Output]

Plain ==> Trigger ==> Mode
Mode ==> Version
Mode ==> Magic
Version ==> Rotate
Magic ==> Rotate
Rotate ==> Tag ==> Cipher`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "text", text: "This diagram shows the " },
          { type: "strong", children: [{ type: "text", text: "client-side encryption pipeline" }] },
          {
            type: "text",
            text: ": plaintext input is routed through mode resolution, cipher configuration, deterministic rotation, and metadata tagging before output is produced.",
          },
        ],
      },
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "All transformation occurs locally in the browser, so the original plaintext never needs to leave the device.",
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
                text: " The UI determines that the encryption path should execute and gathers the configuration required for that operation.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Cipher configuration:" },
              {
                type: "text",
                text: " A versioned alphabet and magic number provide the inputs needed to make rotation deterministic and reversible.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Self-describing output:" },
              {
                type: "text",
                text: " The final tag carries enough metadata to support automatic decryption later without storing external keys or server-side session state.",
              },
            ],
          },
        ],
      },
    ],
  },
  decryptFlow: {
    id: "diagram-enigma-decrypt-flow",
    type: "diagram",
    title: "Decryption Lifecycle",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Input[Encrypted Input]
Detect{Detect Encryption Tag}
Parse[Extract Version + Magic Number]
Resolve[Resolve Alphabet Set]
Reverse[Reverse Character Rotation]
Output[Decrypted Output]

Input ==> Detect ==> Parse ==> Resolve ==> Reverse ==> Output`
      ),
      description: [
        {
          type: "p",
          children: [
            { type: "text", text: "The mobile view focuses on the " },
            { type: "strong", children: [{ type: "text", text: "decryption path" }] },
            {
              type: "text",
              text: ": detect the tag, extract metadata, resolve the correct alphabet version, and reverse the rotation per character.",
            },
          ],
        },
      ],
    },
    desktop: {
      diagram: diagram(
        diagramConfig.SEQUENCE_INIT,
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
Engine ->> Engine: Reverse character rotation
Engine ->> Output: Produce decrypted text
Output -->> User: Render result`
      ),
      description: [
        {
          type: "p",
          children: [
            { type: "text", text: "This sequence diagram shows how Enigma " },
            {
              type: "strong",
              children: [
                { type: "text", text: "automatically detects and reverses encrypted input" },
              ],
            },
            {
              type: "text",
              text: " using the metadata embedded in the output tag.",
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
                  text: "Decryption is intentionally frictionless: users do not need to remember which alphabet version or magic number was used during encryption.",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  domainModel: {
    id: "diagram-domain-model",
    type: "diagram",
    title: "Narrative Domain Architecture",
    diagram: diagram(
      diagramConfig.FLOWCHART_INIT,
      `flowchart LR

subgraph Root[Aggregate Root]
  Storybook[(Storybook<br/>Campaign Root)]
end

subgraph Narrative[Narrative Layers]
  Act[(Act)]
  Room[(Room)]
  Encounter[(Encounter)]
end

subgraph EncounterContext[Encounter Context]
  Opponent[Opponent]
  Treasure[Treasure]
end

Storybook ==> Act ==> Room ==> Encounter
Encounter ==> Opponent
Encounter ==> Treasure`
    ),
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The campaign system is modeled as a hierarchical domain with clearly bounded aggregates. Each level owns its structural scope while referencing the next narrative layer below it.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Storybook is the aggregate root." },
              {
                type: "text",
                text: " It defines the top-level campaign boundary and coordinates the consistency of acts, rooms, and encounters beneath it.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Narrative layers scale downward cleanly." },
              {
                type: "text",
                text: " Acts contain rooms, rooms contain encounters, and encounters attach tactical context like opponents and treasure without flattening the full story into one structure.",
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
            text: "This domain shape keeps branching narrative content extensible while still giving the data model a clear root and ownership chain.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams);
