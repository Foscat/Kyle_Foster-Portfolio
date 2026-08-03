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
  interfaceSystemsLabContract: {
    id: "diagram-interface-systems-lab-contract",
    type: "diagram",
    title: "Shared Interface Contract",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  Consumer([Consumer App])
  Markup[Shared Semantic Markup]
  Adoption{Adoption Mode?}
  Layout[layout-style-css]
  Paint[ui-style-kit-css]
  States[interactive-surface-css]
  Standalone[Standalone Package Use]
  Workbench[Integrated Workbench]
  Align{Contracts Align?}
  Correct[Correct Markup or Tokens]
  Proof[Unified System Proof]
  Release[Package Release]

  Consumer ==> Markup ==> Adoption
  Adoption ==>|Standalone| Standalone ==> Proof
  Adoption ==>|Integrated| Layout
  Adoption ==> Paint
  Adoption ==> States
  Layout ==> Workbench
  Paint ==> Workbench
  States ==> Workbench ==> Align
  Align ==>|No| Correct -. retest .-> Markup
  Align ==>|Yes| Proof ==> Release`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Consumer([Consumer App])
  Markup[Shared Semantic Markup]
  Adoption{Adoption Mode?}
  Layout[layout-style-css]
  Paint[ui-style-kit-css]
  States[interactive-surface-css]
  Standalone[Standalone Package Use]
  Workbench[Interactive Workbench]
  Align{Contracts Align?}
  Correct[Correct Markup or Tokens]
  Proof[Unified System Proof]
  Release[Package Release]

  Consumer ==> Markup ==> Adoption
  Adoption ==>|Standalone| Standalone ==> Proof
  Adoption ==>|Integrated| Layout
  Adoption ==> Paint
  Adoption ==> States
  Layout ==> Workbench
  Paint ==> Workbench
  States ==> Workbench
  Workbench ==> Align
  Align ==>|No| Correct -. retest .-> Markup
  Align ==>|Yes| Proof ==> Release`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Interface Systems Lab keeps the libraries coordinated around shared semantic markup while preserving standalone adoption. Integrated use composes structure, paint, and interaction behavior in the workbench; contract failures return to markup or token correction before the packages become unified proof and a releasable version.",
          },
        ],
      },
    ],
  },

  interactiveSurfaceStateModel: {
    id: "diagram-interactive-surface-state-model",
    type: "diagram",
    title: "Interaction State Model",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  Input[Pointer or Keyboard Input]
  Enabled{Surface Enabled?}
  Disabled[Disabled + Inert]
  Base[Base Surface]
  Hover[Hover State]
  Focus[Focus Visible]
  Pressed[Pressed State]
  Toggle{Persistent Selection?}
  Active[Active or Toggled]
  Release[Released State]
  Motion{Reduced Motion?}
  Settle[Stable Visual State]

  Input ==> Enabled
  Enabled ==>|No| Disabled
  Enabled ==>|Yes| Base
  Base ==>|Pointer| Hover ==> Pressed
  Base ==>|Keyboard| Focus ==> Pressed
  Pressed ==> Toggle
  Toggle ==>|Yes| Active ==> Release
  Toggle ==>|No| Release
  Release ==> Motion
  Motion ==>|Yes| Settle
  Motion ==>|No| Settle
  Settle -. next interaction .-> Input`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Input[Pointer or Keyboard]
  Enabled{Surface Enabled?}
  Disabled[Disabled + Inert]
  Base[Base Surface]
  Hover[Hover State]
  Focus[Focus Visible]
  Pressed[Pressed State]
  Toggle{Persistent Selection?}
  Active[Active or Toggled]
  Release[Released State]
  Motion{Reduced Motion?}
  Settle[Stable Visual State]

  Input ==> Enabled
  Enabled ==>|No| Disabled
  Enabled ==>|Yes| Base
  Base ==>|Pointer| Hover ==> Pressed
  Base ==>|Keyboard| Focus ==> Pressed
  Pressed ==> Toggle
  Toggle ==>|Yes| Active ==> Release
  Toggle ==>|No| Release
  Release ==> Motion
  Motion ==>|Yes| Settle
  Motion ==>|No| Settle
  Settle -. next interaction .-> Input`
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

  Consumer[Consumer Theme Input]
  Preferred[Preferred Package Tokens]
  Legacy[Legacy Fallback Tokens]
  Semantic[Semantic App Tokens]
  Defaults[Safe Defaults]
  Available{Preferred Value Available?}
  Resolved[Resolved Internal Values]
  Valid{Resolved Value Valid?}
  Recover[Use Next Fallback]
  Surface[Interactive Surface]
  States[Visual States]
  Contrast{Contrast + State Check Pass?}
  Adjust[Adjust Consumer Override]

  Consumer ==> Preferred ==> Available
  Available ==>|No| Legacy ==> Semantic ==> Defaults ==> Resolved
  Available ==>|Yes| Resolved
  Resolved ==> Valid
  Valid ==>|No| Recover -. continue fallback chain .-> Legacy
  Valid ==>|Yes| Surface
  Resolved ==> States
  Surface ==> Contrast
  States ==> Contrast
  Contrast ==>|No| Adjust -. revise tokens .-> Consumer
  Contrast ==>|Yes| States`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Consumer[Consumer Theme Input]
  Preferred[Preferred Package Tokens]
  Legacy[Legacy Fallback Tokens]
  Semantic[Semantic App Tokens]
  Defaults[Safe Defaults]
  Available{Preferred Value Available?}
  Resolved[Resolved Internal Values]
  Valid{Resolved Value Valid?}
  Recover[Use Next Fallback]
  Surface[Interactive Surface]
  States[Visual States]
  Contrast{Contrast + State Check Pass?}
  Adjust[Adjust Consumer Override]

  Consumer ==> Preferred ==> Available
  Available ==>|No| Legacy ==> Semantic ==> Defaults ==> Resolved
  Available ==>|Yes| Resolved
  Resolved ==> Valid
  Valid ==>|No| Recover -. continue fallback .-> Legacy
  Valid ==>|Yes| Surface
  Resolved ==> States
  Surface ==> Contrast
  States ==> Contrast
  Contrast ==>|No| Adjust -. revise tokens .-> Consumer
  Contrast ==>|Yes| States`
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
            text: " so the primitive can be adopted in different environments without forcing one rigid theme system. Resolved values are validated before use, and contrast or state failures return to consumer overrides instead of silently producing an unusable surface.",
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

  uiStyleKitTokenFlow: {
    id: "diagram-ui-style-kit-token-flow",
    type: "diagram",
    title: "UI Style Kit Token Flow",
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

  Consumer[Consumer Theme Request]
  Root[Root Configuration]
  Tokens[Design Tokens]
  Palette[Palette Roles]
  Mode[Mode Rules]
  Roles[Semantic Roles]
  Components[Component Consumption]
  Contrast{Contrast Passes?}
  Adjust[Adjust Role or Token]
  Paint[Published Component Paint]
  Feedback[Consumer Feedback]

  Consumer ==> Root ==> Tokens
  Tokens ==> Palette
  Tokens ==> Mode
  Palette ==> Roles
  Mode ==> Roles
  Roles ==> Components ==> Contrast
  Contrast ==>|No| Adjust -. resolve again .-> Tokens
  Contrast ==>|Yes| Paint ==> Feedback
  Feedback -. refine theme .-> Root`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Consumer[Consumer Theme Request]
  Root[Root Configuration]
  Tokens[Design Tokens]
  Palette[Palette Roles]
  Mode[Mode Rules]
  Roles[Semantic Roles]
  Components[Component Consumption]
  Contrast{Contrast Passes?}
  Adjust[Adjust Role or Token]
  Paint[Published Component Paint]
  Feedback[Consumer Feedback]

  Consumer ==> Root ==> Tokens
  Tokens ==> Palette
  Tokens ==> Mode
  Palette ==> Roles
  Mode ==> Roles
  Roles ==> Components ==> Contrast
  Contrast ==>|No| Adjust -. resolve again .-> Tokens
  Contrast ==>|Yes| Paint ==> Feedback
  Feedback -. refine theme .-> Root`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "UI Style Kit CSS resolves a consumer theme request through root configuration, palette and mode inputs, and semantic roles. Component contrast checks can return to token adjustment, while validated paint becomes a reusable output whose consumer feedback informs the next theme revision.",
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
    Sidebar[".ly-sidebar"]
  end
  Paint[ui-style-kit-css Theme Paint]
  States[interactive-surface-css Interaction States]
  Fit{Container Fits Content?}
  Reflow[Intrinsic Reflow]
  Access{Accessible + Usable?}
  Correct[Correct Composition]
  Output[Responsive STE Interfaces]
  Feedback[Consumer Feedback]

  Needs ==> Wrapper
  Needs ==> Section
  Wrapper ==> Stack
  Section ==> Grid
  Section ==> Sidebar
  Stack ==> Paint
  Grid ==> Paint
  Sidebar ==> Paint
  Paint ==> States ==> Fit
  Fit ==>|No| Reflow -. recompute layout .-> Wrapper
  Fit ==>|Yes| Access
  Access ==>|No| Correct -. revise composition .-> Needs
  Access ==>|Yes| Output ==> Feedback
  Feedback -. new requirements .-> Needs`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Needs[App and Page Needs]
  Wrapper[Responsive Wrapper]
  Layout[layout-style-css Primitives]
  Reflow{Content Fits?}
  Adjust[Intrinsic Reflow]
  Paint[ui-style-kit-css Paint]
  States[interactive-surface-css States]
  Access{Accessible + Usable?}
  Correct[Correct Composition]
  Output[Responsive STE Interfaces]
  Feedback[Consumer Feedback]

  Needs ==> Wrapper ==> Layout ==> Reflow
  Reflow ==>|No| Adjust -. recompute .-> Layout
  Reflow ==>|Yes| Paint ==> States ==> Access
  Access ==>|No| Correct -. revise .-> Needs
  Access ==>|Yes| Output ==> Feedback
  Feedback -. new requirements .-> Needs`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Layout Style CSS turns page requirements into reusable wrappers, sections, stacks, grids, and sidebars before paint or interaction states are applied. Container-fit and accessibility decisions return weak compositions for intrinsic reflow or correction, while validated output feeds the next set of consumer requirements.",
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
  alt Credentials are invalid
    DB -->> API: User not found or password mismatch
    API -->> Client: Authentication error
    Client -->> User: Keep session signed out
  else Credentials are valid
    DB -->> API: User found
    API -->> Client: Access token + refresh cookie
    Client ->> API: Request protected resource
    API -->> Client: 401 when access token expires
    Client ->> API: POST /api/users/refresh
    alt Refresh cookie is accepted
      API -->> Client: New access token
      Client ->> API: Retry queued requests
      API -->> Client: Protected response
    else Refresh cookie is rejected
      API -->> Client: Session expired
      Client -->> User: Clear session and request login
    end
  end`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB
  
  Login[Login Request]
  Credentials{Credentials Valid?}
  Error[Authentication Error]
  Access[Access Token Issued]
  Cookie[Refresh Cookie Stored]
  Protected[Protected API Request]
  Expired{Access Token Expired?}
  Refresh[Refresh Endpoint]
  RefreshValid{Refresh Accepted?}
  Retry[Retry Original Request]
  Success[Protected Response + Continue Session]
  End[Clear Session + Request Login]
  
  Login ==> Credentials
  Credentials ==>|No| Error -. correct login .-> Login
  Credentials ==>|Yes| Access ==> Cookie ==> Protected ==> Expired
  Expired ==>|Yes| Refresh ==> RefreshValid
  RefreshValid ==>|Yes| Retry ==> Success
  RefreshValid ==>|No| End
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
            text: ", a core architectural concept in the template. Invalid logins stay signed out, accepted refresh retries queued requests, and rejected refresh clears the session.",
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
                text: " used for authenticated API requests.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Refresh cookie:" },
              {
                type: "text",
                text: " supports session continuation without forcing re-login.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Retry handling:" },
              {
                type: "text",
                text: " failed requests can resume after refresh instead of breaking the user flow.",
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

  Source[React + Express Source]

  subgraph Build[Build + Configuration]
    Vite[Vite Production Build]
    Assets[(Static Client Assets)]
    Env[Runtime Environment]
  end

  subgraph Service[Single Express Service]
    Server[Express Server]
    Request{Client or API Request?}
    Static[Serve React Assets]
    Routes[API Routes]
    Auth[JWT + Refresh Handling]
  end

  subgraph Runtime[Runtime Dependencies]
    DB[(MongoDB)]
    Health{Service Healthy?}
    Browser[Browser Response]
    Recover[Log Error + Recover]
  end

  Source ==> Vite ==> Assets ==> Server
  Env ==> Server ==> Request
  Request ==>|Client Route| Static ==> Browser
  Request ==>|API Route| Routes ==> Auth ==> DB ==> Browser
  Server ==> Health
  Health ==>|No| Recover -. restart or retry .-> Server
  Health ==>|Yes| Browser`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

  Source[React + Express Source]
  Vite[Vite Production Build]
  Assets[(Static Client Assets)]
  Env[Runtime Environment]
  Server[Single Express Service]
  Request{Client or API Request?}
  Static[Serve React Assets]
  API[API Routes]
  Auth[Auth Middleware]
  DB[(MongoDB)]
  Health{Service Healthy?}
  Browser[Browser Response]
  Recover[Log Error + Recover]

  Source ==> Vite ==> Assets ==> Server
  Env ==> Server ==> Request
  Request ==>|Client Route| Static ==> Browser
  Request ==>|API Route| API ==> Auth ==> DB ==> Browser
  Server ==> Health
  Health ==>|No| Recover -. retry .-> Server
  Health ==>|Yes| Browser`
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
            text: ": one configured server can host the API and serve the built client. Request routing separates static navigation from authenticated API work, while health failure returns through logging and recovery before a browser response is served.",
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
  Valid{Reading Valid?}
  Safe[Preserve Safe Relay State]
end

subgraph Decide[Decide]
  Config{{Growth Mode Configuration}}
  Engine[/"Deterministic Decision Engine"\\]
  Deadband{Outside Allowed Range?}
  Compare{Desired State Differs?}
end

subgraph Act[Act]
  Apply[Apply Relay Update]
  Verify{Relay State Confirmed?}
  Recover[Retry Safe Relay Update]
  Log[Log Cycle Outcome]
  Delay([Stability Delay])
end

Read ==> Sensor ==> Valid
Valid ==>|No| Safe ==> Log
Valid ==>|Yes| Config ==> Engine ==> Deadband
Deadband ==>|No| Log
Deadband ==>|Yes| Compare
Compare ==>|No Change| Log
Compare ==>|Update| Apply ==> Verify
Verify ==>|No| Recover -. retry .-> Apply
Verify ==>|Yes| Log ==> Delay
Delay -. next sample .-> Read`
      ),
    },
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Sensor>DHT11 Sensor]
Read[[Sensor Read Cycle]]
Valid{Reading Valid?}
Safe[Preserve Safe Relay State]
Config{{Growth Mode Configuration}}
Engine[/"Deterministic Decision Engine"\\]
Deadband{Outside Allowed Range?}
Compare{Desired State Differs?}
Apply[\\Apply Relay Update\\]
Verify{Relay State Confirmed?}
Recover[Retry Safe Relay Update]
Log[Log Cycle Outcome]
Delay([Stability Delay])

Read ==> Sensor ==> Valid
Valid ==>|No| Safe ==> Log
Valid ==>|Yes| Config ==> Engine ==> Deadband
Deadband ==>|No| Log
Deadband ==>|Yes| Compare
Compare ==>|No Change| Log
Compare ==>|Update| Apply ==> Verify
Verify ==>|No| Recover -. retry .-> Apply
Verify ==>|Yes| Log ==> Delay
Delay -. next sample .-> Read`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The Raspberry Pi validates each DHT11 reading before comparing it with the configured growth range. Invalid readings preserve a safe relay state, acceptable readings avoid unnecessary switching, and required updates are verified before the cycle is logged and sampled again. Configuration remains separate from GPIO control so growth profiles can change without rewriting the loop.",
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
  Invariants{Aggregate Valid?}
  Repair[Repair Narrative References]
end

subgraph Narrative[Narrative Layers]
  Act[(Act)]
  Room[(Room)]
  Encounter[(Encounter)]
  Resolve[Resolve Encounter]
end

subgraph EncounterContext[Encounter Context]
  Opponent[Opponent]
  Treasure[Treasure]
  Update[Update Campaign State]
end

subgraph Progression[Progression + Persistence]
  Continue{Act Complete?}
  Next[Open Next Act]
  Persist[(Persist Campaign)]
end

Storybook ==> Invariants
Invariants ==>|No| Repair -. restore consistency .-> Storybook
Invariants ==>|Yes| Act ==> Room ==> Encounter
Encounter ==> Opponent
Encounter ==> Treasure
Opponent ==> Resolve
Treasure ==> Resolve ==> Update ==> Continue
Continue ==>|No| Room
Continue ==>|Yes| Next
Room ==> Persist
Next ==> Persist -. reload campaign .-> Storybook`
    ),
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Storybook is the campaign aggregate root and validates narrative references before progression. Acts contain Rooms and Encounters; resolving Opponents and Treasure updates campaign state, determines whether play continues in the current Act, and persists a consistent campaign that can be reloaded for the next session.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams);
