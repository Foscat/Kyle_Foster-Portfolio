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

  layoutStyleBundleFlow: {
    id: "diagram-layout-style-bundle-flow",
    type: "diagram",
    title: "UI Bundle Layout Flow",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  Needs[App and Page Needs]
  subgraph Layout["layout-style-css"]
    Wrapper[".ly-wrapper"]
    Section[".ly-section"]
    Stack[".ly-stack"]
    Grid[".ly-grid"]
    Sidebar[".ly-sidebar-layout"]
  end
  Paint[ui-style-kit-css Theme Paint]
  States[interactive-surface-css Interaction States]
  Output[Responsive STE Interfaces]

  Needs ==> Wrapper
  Needs ==> Section
  Wrapper ==> Stack
  Section ==> Grid
  Section ==> Sidebar
  Stack ==> Paint
  Grid ==> Paint
  Sidebar ==> Paint
  Paint ==> States
  States ==> Output`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Needs[App and Page Needs]
  Layout[layout-style-css Primitives]
  Paint[ui-style-kit-css Paint]
  States[interactive-surface-css States]
  Output[Responsive STE Interfaces]

  Needs ==> Layout ==> Paint ==> States ==> Output`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Layout Style CSS sits between page requirements and the visual system. It turns repeated responsive layout work into reusable structure before color and interaction styling are applied.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Structure:" },
              {
                type: "text",
                text: " layout-style-css owns wrappers, sections, stacks, grids, and sidebars.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Paint:" },
              {
                type: "text",
                text: " ui-style-kit-css owns theme roles, palette expression, and visual surface treatment.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "States:" },
              {
                type: "text",
                text: " interactive-surface-css owns hover, focus-visible, active, pressed, and disabled behavior.",
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
            text: ", a core architectural concept in the template.",
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
            text: "The Raspberry Pi runs a closed control loop: read DHT11 climate data, evaluate it against the selected growth-mode configuration, compare the desired and current relay states, apply only necessary hardware changes, then pause briefly before sampling again. Configuration stays separate from GPIO control so growth profiles can change without rewriting the loop.",
          },
        ],
      },
    ],
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
            text: "Storybook is the campaign aggregate root. It contains Acts, which contain Rooms and Encounters; each Encounter references tactical context such as Opponents and Treasure. The hierarchy keeps ownership explicit while allowing a long-running narrative to grow without flattening every relationship into one record.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams);
