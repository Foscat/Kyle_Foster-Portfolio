import {
  faArrowsToCircle,
  faBookBookmark,
  faBrush,
  faCodeBranch,
  faCodeCompare,
  faDiceD20,
  faExclamationTriangle,
  faFlagCheckered,
  faKey,
  faLaptopCode,
  faLightbulb,
  faSeedling,
  faTowerObservation,
  faUnlockKeyhole,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "types/ui.types.js";
import diagrams from "./diagrams.js";
import imgObjs from "assets/images/sideProjects";

const sideProjectSections = [
  /* ============================================================
       Overview
       ============================================================ */
  {
    id: "overview",
    title: "Overview",
    icon: faTowerObservation,
    isScroller: true,
    blocks: [
      {
        id: "overview-text",
        type: BlockType.RICH_TEXT,
        title: "Exploring Real-World Solutions",
        icon: faTowerObservation,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "Side projects serve as controlled environments for full-system engineering.",
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
                text: "Each project begins with a real-world constraint and is developed with production-level discipline rather than tutorial-driven experimentation.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Because these systems are self-directed, they require end-to-end ownership:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Architecture and technology selection." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Frontend and backend implementation." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Deployment, monitoring, and iteration." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Long-term maintainability considerations." }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Across hardware automation, security tooling, and full-stack applications, these projects demonstrate adaptability across domains while maintaining a consistent engineering approach.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Principle: understand constraints, design pragmatically, and iterate until the system is reliable under real conditions.",
              },
            ],
          },
        ],
      },
    ],
  },

  /* ============================================================
       Greenhouse Climate Controller
       ============================================================ */

  {
    id: "greenhouse",
    title: "Greenhouse Controller",
    icon: faSeedling,
    isScroller: true,
    blocks: [
      {
        id: "greenhouse-problem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "The Problem",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Maintaining a stable environment is critical for year-round plant growth in a greenhouse, especially when physical access is limited.",
              },
              {
                type: "strong",
                text: " Manual monitoring and adjustment of temperature and humidity is impractical for consistent plant health.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Temperature and humidity fluctuate throughout the day due to weather shifts, sunlight intensity, and airflow variability. Manual monitoring introduces delay, inconsistency, and human error.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Reactive adjustments instead of proactive regulation." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Inconsistent plant growth due to environmental drift." },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Time-intensive manual intervention." }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "When physical access is limited, maintaining stable year-round growth becomes operationally impractical without automation.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Constraint: environmental regulation must be continuous, autonomous, and adaptive to changing conditions.",
              },
            ],
          },
        ],
      },
      diagrams.greenhouseMentalModel,
      {
        id: "greenhouse-control-board",
        type: BlockType.IMAGE_GALLERY,
        title: "Control Board",
        items: [imgObjs.greenhouseControls, imgObjs.greenhouseHookedup],
      },
      {
        id: "greenhouse-solution-text",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        icon: faLightbulb,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "An automated, sensor-driven climate control system was built around a Raspberry Pi Zero and Python.",
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
                text: "The Pi functions as a centralized controller, continuously sampling environmental data and executing rule-based decisions in real time.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Temperature and humidity monitored via onboard sensors." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Relay modules control heaters, circulation fans, vents, humidifiers, dehumidifiers, and lighting.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Decision logic evaluates thresholds and device state before triggering changes.",
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
                text: "The system operates as a closed-loop controller, minimizing environmental drift by continuously recalibrating device activation based on live feedback.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Configurable operating profiles define target ranges for different plant growth stages, allowing the greenhouse to transition between vegetative and flowering cycles without manual retuning.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Design objective: maintain environmental stability through autonomous, low-latency control while reducing human intervention to configuration only.",
              },
            ],
          },
        ],
      },
      diagrams.greenhouseAutomation,
      {
        id: "greenhouse-takeaways",
        type: BlockType.CARD_GRID,
        title: "Key Takeaways",
        subtitle: "Lessons learned from designing and implementing a real-world automation system",
        items: [
          {
            id: "gh-takeaway-1",
            title: "Automation & Control Systems",
            subtitle: "Designing a responsive, real-time control system under physical constraints",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The project provided hands-on experience with real-time control systems, sensor integration, and the challenges of physical automation.",
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
                        text: "Continuous feedback sampling and threshold evaluation with state awareness.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Autonomous actuator response optimized for stability under fluctuating external conditions.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Robust error handling and graceful degradation in case of sensor or actuator failure.",
                      },
                    ],
                  },
                ],
              },
            ],
            icon: faCodeCompare,
          },
          {
            id: "gh-takeaway-2",
            title: "Embedded Systems Constraints",
            subtitle: "Designing for limited hardware resources and real-time performance",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designing for a resource-constrained embedded environment required prioritizing efficiency, reliability, and simplicity over feature complexity.",
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
                        text: "Memory-aware processing to ensure stability on limited hardware.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Resilient recovery from transient sensor failures.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "No-crash tolerance in long-running processes.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "inlineIcon", icon: "🧠" },
                  {
                    type: "text",
                    text: "Principle: embedded systems reward simplicity, predictability, and disciplined state management.",
                  },
                ],
              },
            ],
          },
          {
            id: "gh-takeaway-3",
            title: "Reliability as a Design Priority",
            subtitle: "Designing for consistent operation under real-world conditions",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The system was designed with reliability as a core objective, prioritizing consistent operation under real-world conditions over feature richness.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Fail-safe defaults and error handling." }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Minimized manual intervention through autonomous decision-making.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Long-term stability through continuous feedback and adaptive control rather than static configurations.",
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
                    text: "Principle: reliability is achieved through disciplined design that anticipates real-world variability and failure modes.",
                  },
                ],
              },
            ],
            icon: faArrowsToCircle,
          },
        ],
      },
      {
        id: "greenhouse-links",
        type: BlockType.LINKS,
        items: [
          {
            id: "greenhouse-link-1",
            title: "See the code",
            url: "https://github.com/Foscat/greenhouse",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faCodeBranch,
            ariaLabel: "Link to the Greenhouse Climate Controller code repository on GitHub",
          },
        ],
      },
    ],
  },

  /* ============================================================
       Caesar's Enigma
       ============================================================ */

  {
    id: "enigma",
    slug: "caesars-enigma",
    title: "Caesar's Enigma",
    icon: faUnlockKeyhole,
    isScroller: true,
    blocks: [
      {
        id: "enigma-problem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "The Problem",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Cryptography education often remains theoretical, disconnected from practical implementation. While classical ciphers are well understood conceptually, there are few opportunities to examine how deterministic transformations behave inside a real, user-facing system.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The challenge was to design a modern encryption tool rooted in classical cipher mechanics that operated entirely client-side. This meant eliminating server processing, preserving user privacy, and ensuring repeatable, predictable transformations within a constrained browser environment.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🔐" },
              {
                type: "text",
                text: "How can simple cryptographic principles be composed into a deterministic system that feels modern, usable, and privacy-preserving?",
              },
            ],
          },
        ],
      },
      // diagrams.enigmaMentalModel,
      {
        id: "enigma-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Application Screenshots",
        items: [
          imgObjs.enigmaApp,
          imgObjs.enigmaEncryption,
          imgObjs.enigmaDecryption,
          imgObjs.enigmaGuide,
        ],
      },
      {
        id: "enigma-solution-text",
        type: BlockType.RICH_TEXT,
        icon: faLightbulb,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The system was designed as a deterministic, client-side encryption engine inspired by classical Caesar substitution and multi-rotor transformation mechanics. Rather than relying on a single static alphabet, the implementation composes multiple rotating character sets to increase transformation depth while preserving reversibility.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each character transformation is derived from predictable rotation rules and an embedded metadata tag, allowing encrypted messages to carry the information necessary for accurate decryption without storing state externally. This ensures the cipher remains stateless, reproducible, and fully reversible.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The engine was initially prototyped in Python to validate algorithmic correctness, then fully refactored into JavaScript for browser execution. The final implementation runs entirely client-side, eliminating server dependency and ensuring that plaintext input never leaves the user's device.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Multi-alphabet rotation:" },
                  {
                    type: "text",
                    text: " layered substitutions increase complexity without sacrificing determinism.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Stateless design:" },
                  {
                    type: "text",
                    text: " encrypted output embeds versioning and transformation metadata.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Client-only execution:" },
                  {
                    type: "text",
                    text: " no backend processing, reduced attack surface, privacy by architecture.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "⚙️" },
              {
                type: "text",
                text: "The goal was not complexity for its own sake, but controlled transformation rules that remain predictable, reversible, and transparent.",
              },
            ],
          },
        ],
      },
      diagrams.encryptionFlow,
      diagrams.decryptFlow,
      {
        id: "enigma-takeaways",
        type: BlockType.RICH_TEXT,
        title: "Key Takeaways",
        content: [
          {
            type: "h3",
            children: [
              { type: "inlineIcon", icon: "🔑" },
              { type: "text", text: " Cryptography Principles" },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The project served as a practical exploration of classical cryptography through direct implementation. By composing rotating alphabets and deterministic transformations, I examined how simple substitution mechanics can form layered systems.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The emphasis was placed on clarity, correctness, and repeatability rather than artificial complexity. Well-defined transformation rules proved more important than algorithmic opacity.",
              },
            ],
          },
          {
            type: "h3",
            children: [
              { type: "inlineIcon", icon: "🛡️" },
              { type: "text", text: " Client-Side Security" },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "All encryption and decryption logic executes entirely in the browser. No user data is transmitted to a server, reducing the application’s attack surface and reinforcing privacy by design.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This constraint required deterministic behavior and performance awareness in a client-only environment. Security here is expressed through architectural decisions, not just cipher mechanics.",
              },
            ],
          },
          {
            type: "h3",
            children: [
              { type: "inlineIcon", icon: "💻" },
              { type: "text", text: " Usability Focus" },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "A core objective was to make cryptographic concepts approachable without oversimplifying them. The interface guides users through encryption and decryption workflows without requiring prior cipher knowledge.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Clear feedback, predictable outputs, and constrained configuration were prioritized to balance technical depth with accessibility. The result demonstrates that secure systems can remain understandable.",
              },
            ],
          },

          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Security is not only about complexity — it is about deterministic, well-defined behavior.",
              },
            ],
          },
        ],
      },
      {
        id: "enigma-links",
        type: BlockType.LINKS,
        items: [
          {
            id: "enigma-link-1",
            title: "See the code",
            url: "https://github.com/Foscat/Enigma",
            icon: faCodeBranch,
            ariaLabel: "Link to the Caesar's Enigma code repository on GitHub",
            local: false,
            target: "_blank",
            rel: "noopener noreferrer",
          },
          {
            id: "enigma-link-2",
            title: "View the project",
            url: "https://foscat.github.io/Enigma/",
            icon: faLaptopCode,
            ariaLabel: "Link to the live Caesar's Enigma project website",
            local: false,
            target: "_blank",
            rel: "noopener noreferrer",
          },
        ],
      },
    ],
  },

  /* ============================================================
       D20 King
       ============================================================ */

  {
    id: "d20",
    slug: "d20-king",
    title: "D20 King",
    icon: faDiceD20,
    isScroller: true,
    blocks: [
      {
        id: "d20-problem-text",
        icon: faExclamationTriangle,
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Dungeon Masters manage campaigns that evolve over months or years, yet the tooling available to them is typically fragmented across documents, spreadsheets, and loosely connected note systems. These tools capture information, but they do not model relationships.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "A campaign is not just text — it is a structured domain composed of story arcs, encounters, entities, rewards, and branching paths. Without a formal data model, narrative consistency becomes difficult to maintain as complexity grows.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "No relational structure:" },
                  { type: "text", text: " encounters, rooms, and acts lack defined hierarchy." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Poor scalability:" },
                  { type: "text", text: " campaign data becomes unwieldy over time." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Limited narrative control:" },
                  {
                    type: "text",
                    text: " branching paths and state tracking are handled manually.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🗺️" },
              {
                type: "text",
                text: "The real problem was not note-taking — it was the absence of a structured domain model for long-running narrative systems.",
              },
            ],
          },
        ],
      },
      {
        id: "d20-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Development Screenshots",
        items: [imgObjs.d20Dashboard, imgObjs.opponentEditor],
      },
      {
        id: "d20-solution-text",
        icon: faLightbulb,
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "D20 King models campaigns as structured narrative systems rather than collections of notes. The platform decomposes content into a hierarchical domain: ",
              },
              { type: "strong", text: "Storybook → Act → Room → Encounter → Opponent / Reward" },
              {
                type: "text",
                text: ", giving Dungeon Masters a predictable framework for organizing long-running campaigns.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each layer represents a distinct aggregation boundary. Storybooks define campaign scope, Acts represent narrative phases, Rooms encapsulate explorable contexts, and Encounters define gameplay events composed of opponents and potential rewards. This separation keeps narrative structure stable as campaign complexity increases.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Modular composition:" },
                  {
                    type: "text",
                    text: " narrative elements can be reorganized or extended without rewriting the campaign.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Scalable hierarchy:" },
                  {
                    type: "text",
                    text: " data remains navigable even across multi-year story arcs.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Extensible model:" },
                  {
                    type: "text",
                    text: " new entity types or mechanics can be introduced without restructuring the core system.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "📚" },
              {
                type: "text",
                text: "World-building becomes a structured domain model rather than an accumulation of disconnected documents.",
              },
            ],
          },
        ],
      },
      diagrams.domainModel,
      {
        id: "d20-takeaways",
        type: BlockType.CARD_GRID,
        title: "Key Takeaways",
        subtitle: "Architectural lessons from building a modular narrative system",
        items: [
          {
            id: "d20-takeaway-1",
            title: "Scalable Domain Modeling (MERN)",
            subtitle:
              "Designing a hierarchical data model that supports evolving narrative complexity without relational drift",
            icon: faLaptopCode,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designed a hierarchical data model structured as ",
                  },
                  {
                    type: "strong",
                    text: "Storybook → Act → Room → Encounter",
                  },
                  {
                    type: "text",
                    text: ", enabling long-running campaigns to evolve without relational drift.",
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
                        text: "Clear aggregation boundaries between narrative layers",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Ownership isolation across entities" }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Extensible schema design without structural rewrites",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "d20-takeaway-2",
            title: "Product Thinking for Creator Workflows",
            subtitle:
              "Designing a user interface that aligns with the underlying domain model to support creative workflows",
            icon: faBrush,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Structured the system around Dungeon Masters as ",
                  },
                  {
                    type: "strong",
                    text: "primary content creators",
                  },
                  {
                    type: "text",
                    text: ", aligning UI architecture directly with the underlying domain model.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reorganization without data loss" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reusable campaign components" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Reduced friction during iterative world-building" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "d20-takeaway-3",
            title: "Structured Flexibility",
            subtitle: "Balancing strict hierarchy with controlled adaptability",
            icon: faBookBookmark,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Balanced strict hierarchical modeling with controlled adaptability, ensuring creative freedom did not compromise system integrity.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Constraint at the campaign level" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Flexibility within encounters and entities" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Maintainable structure under increasing complexity" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  /* ============================================================
       Conclusion
       ============================================================ */
  {
    id: "sp_conclusion",
    title: "Conclusion",
    icon: faFlagCheckered,
    blocks: [
      {
        id: "sp-conclusion-text",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "These projects extend beyond experimentation. Each one required end-to-end ownership — from defining the problem space to designing architecture, implementing systems, and maintaining operational stability.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Whether automating a greenhouse control system, modeling narrative domains, or building a client-side encryption engine, the common thread was disciplined structure under constraint. Hardware limits, browser execution boundaries, and evolving data models demanded deliberate architectural decisions rather than ad-hoc solutions.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Full ownership:" },
                  {
                    type: "text",
                    text: " requirements, architecture, implementation, and iteration.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Constraint-driven design:" },
                  { type: "text", text: " systems shaped by real-world limitations." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Maintainability focus:" },
                  {
                    type: "text",
                    text: " long-term stability prioritized over short-term novelty.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🧭" },
              {
                type: "text",
                text: "The throughline across every project is structured thinking — designing systems that remain coherent as complexity grows.",
              },
            ],
          },
        ],
      },
    ],
  },
];
Object.freeze(sideProjectSections);
export default sideProjectSections;
