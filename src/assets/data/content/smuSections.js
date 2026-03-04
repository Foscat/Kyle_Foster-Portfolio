import {
  faChartLine,
  faCode,
  faCommentNodes,
  faDiagramProject,
  faExclamationTriangle,
  faGraduationCap,
  faHelmetSafety,
  faImages,
  faLaptopCode,
  faLightbulb,
  faPersonPregnant,
  faTowerObservation,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "../../../types/ui.types.js";
import { diagrams } from "./diagrams.js";
import imgObjs from "../../images/smu/index.js";

/**
 * SMU – Page Section Data
 * ------------------------------------------------------------
 * Academic projects demonstrating early-stage growth,
 * teamwork, and problem-solving progression.
 */

const smuSections = [
  {
    id: "smu-education",
    icon: faGraduationCap,
    title: "SMU Full Stack Bootcamp",
    subtitle: "Foundational projects that launched my software development career",
    isScroller: true,
    blocks: [
      {
        id: "smu-overview-text",
        title: "Overview",
        type: BlockType.RICH_TEXT,
        icon: faTowerObservation,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "My time at " },
              { type: "strong", text: "Southern Methodist University" },
              {
                type: "text",
                text: " marked the foundation of my transition into professional software development. This phase was less about memorizing syntax and more about learning how real systems are designed, reasoned about, and evolved.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "Rather than isolated exercises, I worked through " },
              { type: "em", text: "end-to-end projects" },
              {
                type: "text",
                text: " that required planning, iteration, and trade-off analysis. These projects exposed me to early system thinking and the realities of maintaining code beyond the first successful demo.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🎓" },
              {
                type: "text",
                text: " This section represents the shift from learning how to code to learning how to build software.",
              },
            ],
          },
        ],
      },
    ],
  },

  /* ============================================================
     GIF FREAK
     ============================================================ */

  {
    id: "gif-freak",
    title: "Gif Freak",
    icon: faImages,
    isScroller: true,
    blocks: [
      {
        id: "gif-freak-problem",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "The Problem",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Early in my education, I needed hands-on experience working with ",
              },
              { type: "strong", text: "third-party APIs" },
              {
                type: "text",
                text: " and asynchronous JavaScript. Many learning exercises felt abstract and disconnected from how users actually interact with software.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "I wanted a project that would force me to confront:" },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Network latency and unpredictable responses" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Event-driven UI updates triggered by async data" },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "External data shaping the user experience" }],
              },
            ],
          },
        ],
      },
      {
        id: "gif-freak-image",
        type: BlockType.IMAGE_GALLERY,
        images: [imgObjs.freak],
      },
      {
        id: "gif-freak-solution",
        type: BlockType.RICH_TEXT,
        icon: faLightbulb,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "I built " },
              { type: "strong", text: "Gif Freak" },
              {
                type: "text",
                text: ", a lightweight client-side application that integrates with the Giphy API to fetch and render animated content based on user input.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each interaction triggers an asynchronous request, updating the UI in real time. While persistence was limited to session state, the project gave me early exposure to:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "code", text: "fetch()" },
                  { type: "text", text: "-based request lifecycles" },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Managing loading and empty states" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Mapping raw API data into usable UI models" }],
              },
            ],
          },
        ],
      },
      diagrams.gifSystemFlow,
      {
        id: "gif-freak-links",
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/Foscat/gif-buttons",
            icon: faCode,
            ariaLabel: "Link to the Gif Freak code repository on GitHub",
            local: false,
            tooltip: "GitHub Repository",
          },
          {
            title: "View the project",
            url: "https://foscat.github.io/gif-buttons/",
            icon: faLaptopCode,
            ariaLabel: "Link to the live Gif Freak project",
            local: false,
            tooltip: "Live Project",
          },
        ],
      },
      {
        id: "gif-freak-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        subtitle:
          "Lessons learned from building a real-world API integration with asynchronous behavior and user-facing complexity",
        items: [
          {
            id: "smu-kt-1",
            title: "API Integration",
            subtitle: "Working with external data sources and designing around their constraints",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "This project was my first real implementation of ",
                  },
                  { type: "strong", text: "3rd-party API integration" },
                  {
                    type: "text",
                    text: ". It moved me from theory to production-minded thinking about data contracts, reliability, and user-facing behavior.",
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
                        text: "Built request/response flows that transformed raw API data into clear UI output",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Handled inconsistent payloads and edge cases without breaking the user experience",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Learned to treat external APIs as dependencies that require validation and fallback thinking",
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
                    text: "External integrations are product design decisions, not just technical tasks.",
                  },
                ],
              },
            ],
            icon: faDiagramProject,
          },
          {
            id: "smu-kt-2",
            title: "Asynchronous JavaScript",
            subtitle:
              "Designing user experiences that respond to asynchronous data flows and state changes",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Working with asynchronous requests reshaped how I approached control flow and UI state. I had to design interactions that stayed clear and responsive while data was in transit.",
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
                        text: "Implemented loading, empty, and success states so users always understood system status",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Managed event-driven updates triggered by async fetch calls and user input",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Gained confidence writing non-blocking JavaScript in realistic UI scenarios",
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
                    text: "Perceived speed comes from clear state transitions, not just fast network calls.",
                  },
                ],
              },
            ],
            icon: faLaptopCode,
          },
          {
            id: "smu-kt-3",
            title: "User Interaction",
            subtitle:
              "Designing interfaces that provide clear feedback and maintain user confidence",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Gif Freak reinforced that strong interfaces are defined by feedback quality, not just features. Every action needed to feel immediate, understandable, and trustworthy.",
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
                        text: "Designed interactions that acknowledged user actions right away",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Improved clarity by making state changes visible and predictable",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Started prioritizing user perception and confidence alongside core functionality",
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
                    text: "A responsive interface should explain itself through behavior.",
                  },
                ],
              },
            ],
            icon: faCommentNodes,
          },
        ],
      },
      {
        id: "gif-freak-improvements",
        type: BlockType.RICH_TEXT,
        title: "What I'd Improve Today",
        subtitle: "Revisiting the project with current standards in mind",
        icon: faHelmetSafety,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Revisiting this project with current standards in mind, several architectural and UX improvements would meaningfully elevate its robustness and maintainability.",
              },
            ],
          },

          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Persistent data layer:" },
                  {
                    type: "text",
                    text: " introduce a backend service with structured storage to support saved searches, usage history, and rate-limit management.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Resilient API handling:" },
                  {
                    type: "text",
                    text: " implement comprehensive error boundaries, retry strategies, and graceful degradation for third-party failures.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Modern component patterns:" },
                  {
                    type: "text",
                    text: " refactor into more granular, composable components with clearer state ownership and separation of concerns.",
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
                text: "On the user experience side, accessibility refinements, explicit loading states, and performance optimizations such as memoization would reduce unnecessary re-renders and improve perceived responsiveness.",
              },
            ],
          },

          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🛠️" },
              {
                type: "text",
                text: "The core API integration remains sound, but today I would harden the system around resilience, performance, and long-term maintainability.",
              },
            ],
          },
        ],
      },
    ],
  },

  /* ============================================================
     STOCK MEMER
     ============================================================ */

  {
    id: "stock-memer",
    slug: "stock-memer",
    title: "Stock Memer",
    icon: faChartLine,
    isScroller: true,
    blocks: [
      {
        id: "stock-memer-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Financial data is often presented in dense, inaccessible formats, making it difficult for casual users to identify meaningful trends.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "This project also introduced a new constraint: " },
              { type: "strong", text: "team-based development" },
              {
                type: "text",
                text: ". Coordinating responsibilities, merging code, and integrating multiple systems added complexity well beyond solo projects.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "👤" },
              {
                type: "text",
                text: " This was my first exposure to shared ownership of both code and decisions.",
              },
            ],
          },
        ],
      },
      {
        id: "stock-memer-image",
        type: BlockType.IMAGE_GALLERY,
        images: [imgObjs.stocks],
      },
      {
        id: "stock-memer-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Stock Memer combined real-time stock data with user-generated content, allowing users to explore market trends while creating memes tied to specific stocks.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "My role focused on " },
              { type: "strong", text: "API integrations and Firebase persistence" },
              {
                type: "text",
                text: ", specifically designing how live data and user content were retrieved, stored, and associated across the application.",
              },
            ],
          },
          {
            type: "pre",
            language: "js",
            text: `// Example responsibility
        fetchStockData(symbol)
          .then(storeSnapshot)
          .then(renderUI);`,
          },
        ],
      },
      diagrams.stockMemerFlow,
      {
        id: "stock-memer-links",
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/Foscat/Stock-Memer",
            icon: faCode,
          },
        ],
      },
      {
        id: "stock-memer-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        subtitle:
          "Lessons learned from integrating real-time financial data and coordinating development across a team",
        items: [
          {
            id: "sm-kt-1",
            title: "Team-Based Development",
            subtitle:
              "Managing merge conflicts, handoffs, and shared standards in a collaborative codebase",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "This was my first project in a multi-developer repository with shared ownership and overlapping responsibilities. It quickly showed me how one implementation decision can create friction across other workstreams.",
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
                        text: "Learned to reduce merge risk by keeping changes scoped and consistent with existing patterns",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Improved communication around ownership boundaries and implementation timing",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Saw how unclear planning creates avoidable rework during integration",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "sm-kt-2",
            title: "API & Database Integration",
            subtitle:
              "Coordinating live stock feeds with Firebase persistence and stable data boundaries",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "I implemented flows that combined external stock API responses with Firebase-stored user content. The work centered on making live and persisted data cooperate without breaking UI assumptions.",
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
                        text: "Mapped external payloads into app-friendly models before rendering or persistence",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Kept user-generated records separate from volatile market data to avoid coupling",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Identified where API dependency risk should be isolated behind clear boundaries",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "sm-kt-3",
            title: "Cross-Team Coordination",
            subtitle: "Aligning interfaces and delivery across parallel contributors",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Stock Memer required real coordination instead of isolated execution. We split responsibility across contributors and had to keep interface decisions synchronized to avoid integration failures.",
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
                        text: "Aligned on API contracts earlier to reduce downstream mismatches",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Used clearer ownership lines for faster debugging and decision-making",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Developed stronger habits for syncing assumptions across teammates",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "stock-memer-improvements",
        type: BlockType.RICH_TEXT,
        title: "What I'd Improve Today",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Revisiting the project with more architectural maturity, the primary improvements would focus on service decoupling, data reliability, and operational discipline.",
              },
            ],
          },

          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Decoupled data services:" },
                  {
                    type: "text",
                    text: " separate market data ingestion, transformation, and delivery into independent service layers with clear contracts.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "API lifecycle management:" },
                  {
                    type: "text",
                    text: " replace deprecated providers with versioned integrations and abstraction layers to prevent vendor lock-in.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Caching & rate control:" },
                  {
                    type: "text",
                    text: " introduce server-side caching and controlled refresh intervals to reduce external API strain and improve performance.",
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
                text: "From a team perspective, clearer ownership boundaries and formalized API contracts would improve coordination. Structured code reviews, shared documentation, and defined service interfaces would reduce ambiguity and make scaling contributors significantly easier.",
              },
            ],
          },

          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "📈" },
              {
                type: "text",
                text: "The core idea remains viable, but today the emphasis would be on modular services, resilience, and collaborative maintainability.",
              },
            ],
          },
        ],
      },
    ],
  },

  /* ============================================================
     SCION MATCHES
     ============================================================ */

  {
    id: "scion-matches",
    slug: "scion-matches",
    title: "Scion Matches",
    icon: faPersonPregnant,
    isScroller: true,
    blocks: [
      {
        id: "scion-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Matching Intended Parents with Gestational Carriers is emotionally, financially, and logistically complex. Existing processes relied heavily on manual review, creating delays during an already stressful journey.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🤍" },
              {
                type: "text",
                text: " This problem demanded more than technical correctness — it required trust and care.",
              },
            ],
          },
        ],
      },
      {
        id: "scion-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Scion Matches was my capstone project and marked a shift toward building ",
              },
              { type: "strong", text: "impact-driven software" },
              {
                type: "text",
                text: ". I designed and implemented the core matching algorithm, translating survey responses into compatibility scores.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The algorithm balanced multiple weighted factors, prioritizing transparency and explainability over opaque scoring.",
              },
            ],
          },
          {
            type: "pre",
            language: "js",
            text: `score =
          valuesMatch * 0.4 +
          expectationsAlign * 0.35 +
          logisticsFit * 0.25;`,
          },
        ],
      },
      diagrams.matchFlow,
      {
        id: "scion-links",
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/justinkunz/scion/tree/master",
            tooltip: "GitHub Repository",
            icon: faCode,
            rel: "noopener noreferrer",
          },
        ],
      },
      {
        id: "scion-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        subtitle: "Lessons from designing a real-world matching algorithm with human impact",
        items: [
          {
            id: "scion-takeaway-1",
            title: "Real-World Matching Algorithms",
            subtitle:
              "Designing a compatibility engine that balances fairness, interpretability, and predictability",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designing a compatibility engine required translating qualitative survey responses into structured, weighted scoring logic. The algorithm needed to balance fairness, interpretability, and predictability rather than optimize for raw mathematical output.",
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
                        text: "Normalized survey inputs into comparable scoring dimensions",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Weighted attributes to reflect domain priorities" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Maintained transparency in how compatibility was calculated",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            id: "scion-takeaway-2",
            title: "Business Logic Ownership",
            subtitle: "Defining and implementing the core matching algorithm",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The matching algorithm represented the core value of the system. I owned the business logic from requirement interpretation through implementation, defining how edge cases, ties, and ambiguous inputs were resolved.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "This reinforced that central business logic must be explicit, testable, and resilient — especially when it directly affects user outcomes.",
                  },
                ],
              },
            ],
          },

          {
            id: "scion-takeaway-3",
            title: "Purpose-Driven Engineering",
            subtitle: "Designing with ethical awareness and long-term responsibility in mind",
            text: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Because matching outcomes had real human implications, design decisions required care and ethical awareness. Data handling, scoring transparency, and long-term maintainability were treated as architectural requirements rather than optional enhancements.",
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "inlineIcon", icon: "⚖️" },
                  {
                    type: "text",
                    text: "When algorithms influence people directly, clarity and responsibility matter as much as correctness.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "smu-conclusion",
    title: "Conclusion",
    blocks: [
      {
        id: "smu-conclusion-text",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The projects completed at SMU established the foundation of how I approach software design today. They introduced real constraints — external APIs, team coordination, shifting requirements — and required solutions that extended beyond isolated code exercises.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Working across integration challenges and collaborative workflows reinforced that effective software demands more than functional correctness. It requires clarity in structure, disciplined communication, and thoughtful handling of dependencies.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Integration awareness:" },
                  {
                    type: "text",
                    text: " designing around third-party APIs and service boundaries.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Collaborative development:" },
                  {
                    type: "text",
                    text: " coordinating responsibilities and shared logic within a team.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Ownership mindset:" },
                  {
                    type: "text",
                    text: " recognizing that deployed software carries ongoing responsibility.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🎓" },
              {
                type: "text",
                text: "These projects shaped the transition from writing code to designing systems.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default smuSections;
