import {
  faArrowDownUpLock,
  faArrowsToEye,
  faBookOpenReader,
  faBuildingUser,
  faChartDiagram,
  faChartLine,
  faCode,
  faDesktop,
  faDiceD20,
  faEnvelope,
  faFileArrowDown,
  faFlask,
  faFlaskVial,
  faGraduationCap,
  faHeadset,
  faIdBadge,
  faLaptopCode,
  faLayerGroup,
  faMicrophone,
  faMobileScreenButton,
  faPaperPlane,
  faPeopleGroup,
  faPlug,
  faSeedling,
  faTrophy,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import { faGitSquare } from "@fortawesome/free-brands-svg-icons";
import { BlockType, PageRoute } from "types/ui.types.js";
import {
  diagram,
  diagramConfig,
} from "../../../../components/features/CustomDiagram/core/index.js";
import diagrams from "./diagrams.js";

const homeSections = [
  {
    id: "hero",
    slug: "hero",
    icon: faCode,
    title: "Overview",
    subtitle: "Frontend Engineering Built on Systems Thinking",
    isScroller: true,
    blocks: [
      {
        id: "hero-about-me",
        title: "About Me",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "I'm a " },
              { type: "strong", text: "full-stack (MERN) engineer" },
              {
                type: "text",
                text: " I design user-facing experiences grounded in clear domain models and scalable architecture, building interfaces that evolve cleanly as products grow in complexity, data, and organizational scope.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "I bring tested experience across production systems and rapid prototyping. I built a custom education platform used in real classrooms, and I have repeatedly delivered hackathon prototypes under tight constraints using my own MERN boilerplates. Across side projects, my work consistently centers around ",
              },
              { type: "em", text: "solving real-world problems" },
              {
                type: "text",
                text: " with robust, practical solutions. I prioritize code that is maintainable and scalable so the systems I build can evolve without becoming brittle over time.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "👨‍🔬" },
              {
                type: "text",
                text: " I believe great engineering is not just about writing code, but about understanding the problem domain deeply and designing solutions that are elegant and effective.",
              },
            ],
          },
        ],
      },
      diagrams.engineeringFlow,
    ],
  },
  {
    id: "professional",
    slug: "professional-work",
    title: "Professional Work",
    subtitle: "Lead Frontend Engineer for CodeStream Studios LLC",
    icon: faBuildingUser,
    isScroller: true,
    blocks: [
      {
        id: "professional-codestream",
        title: "CodeStream Studios LLC",
        subtitle: "Lead Frontend Engineer 2019-2025",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "My professional work has centered on building and scaling a ",
              },
              { type: "strong", text: "production education platform" },
              {
                type: "text",
                text: " used by real students, teachers, and organizations. It supported both synchronous and asynchronous learning, from lesson delivery and assignment grading to classroom and organization-level operations in a scalable model.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "At CodeStream Studios, I served as the " },
              { type: "em", text: "sole frontend engineer" },
              {
                type: "text",
                text: ", owning the UI architecture end-to-end. I personally architected and built core systems, including a multi-panel browser-based IDE, role-based access control for organizations and classrooms, virtual classroom workflows, grading tools, reporting systems, and administrative dashboards.",
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
                    text: "Zero-install 3-panel IDE for Web (HTML, CSS, JS) and Python",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Organization-aware permissions for users and licensing" },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Integrated grading interface and bug tracking that auto-assigns and forwards app issues to developers in real time",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "professional-key-features",
        type: BlockType.CARD_GRID,
        title: "Notable Features",
        subtitle: "Systems designed for real-world educational contexts and organizational growth",
        items: [
          {
            id: "pro-grading",
            title: "Teacher Tools",
            subtitle: "Comprehensive grading and feedback system",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Integrated grading and feedback system built into the learning platform to streamline evaluation and provide actionable student performance insights.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Secure project inspection and code execution" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Inline feedback and grade assignment" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Exportable classroom performance reports" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Evaluation integrated directly into instructional flow." },
                ],
              },
            ],
            icon: faChartLine,
            url: `${PageRoute.PROFESSIONAL}/#grading`,
            ariaLabel: "View Teacher Tools Section",
          },
          {
            id: "pro-organizations",
            title: "Organizations & Licensing",
            subtitle: "Multi-tenant role and licensing system",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Multi-tenant role and licensing system that scales from individual classrooms to multi-school deployments while maintaining clear access boundaries and a consistent user experience.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Scoped permissions (Student, Teacher, Admin)" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Active seat and curriculum access enforcement" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Consistent rule application across features" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Governance designed to scale with organizational growth",
                  },
                ],
              },
            ],
            icon: faIdBadge,
            url: `${PageRoute.PROFESSIONAL}/#organizations`,
            ariaLabel: "View Organizations and Licensing Section",
          },
          {
            id: "pro-editor",
            title: "3-Panel Browser-Based IDE",
            subtitle: "Browser-based coding environment for Web and Python projects",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Zero-install 3-panel IDE for Web (HTML, CSS, JS) and Python projects, designed to provide a seamless browser-based coding experience with no setup friction for students and teachers.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Simultaneous view of instructions, code, and output" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Live execution with cloud persistence" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Device-agnostic access without setup friction" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Lightweight IDE experience inside the browser." },
                ],
              },
            ],
            icon: faLaptopCode,
            url: `${PageRoute.PROFESSIONAL}/#editor`,
            ariaLabel: "View 3 Panel Browser-Based IDE Section",
          },
        ],
      },
      {
        id: "professional-learn-more",
        title: "Learn More",
        type: BlockType.LINKS,
        items: [
          {
            id: "pro-case-study",
            title: "View Professional Case Study",
            url: PageRoute.PROFESSIONAL,
            icon: faLayerGroup,
            size: "md",
            ariaLabel: "View Professional Case Study",
            local: true,
          },
          {
            id: "pro-website-link",
            title: "Visit CodeStream Studios Website",
            url: "https://codestreamonlinestudio.com",
            icon: faDesktop,
            size: "md",
            ariaLabel: "Visit CodeStream Studios Website",
            local: false,
          },
        ],
      },
    ],
  },
  {
    id: "hackathon",
    title: "Daimler Trucking Hackathon",
    isScroller: true,
    icon: faTrophy,
    blocks: [
      {
        id: "hackathon-overview",
        title: "Hackathon Overview",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "In 2019, I participated in the " },
              { type: "strong", text: "Daimler Trucking Hackathon" },
              {
                type: "text",
                text: " in Austin, Texas, where teams were tasked with improving real-world repair workflows under tight time constraints.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "After being initially overlooked by senior teams, I joined a group of junior developers and focused on understanding the client's actual pain points. We prioritized usability and practical constraints over technical flash.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🏆" },
              {
                type: "text",
                text: "By grounding our solution in real operator needs, we outperformed over 20 teams of senior engineers.",
              },
            ],
          },
        ],
      },
      {
        id: "hackathon-key-features",
        title: "Key Features",
        subtitle: "Core aspects of our winning solution that addressed real-world constraints",
        type: BlockType.CARD_GRID,
        items: [
          {
            id: "h-kf-mvp-solution",
            title: "Voice-Driven MVP Architecture",
            subtitle: "Focused on real-world repair workflows and operator needs",
            url: `${PageRoute.HACKATHON}/#reinforce`,
            local: true,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Delivered a hands-free repair assistant aligned with real-world shop workflows. We prioritized practical constraints, including technicians needing to keep both hands free and attention on the task, instead of building flashy but impractical features.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Step-by-step guided task execution" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Workflow timing and bottleneck tracking" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduced cognitive and physical friction" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Solve the real constraint, not the imagined one." },
                ],
              },
            ],
          },
          {
            id: "h-kf-voice-interface",
            title: "Hands-Free Voice Interface",
            subtitle: "Designed for repair shop environments with limited space and attention.",
            icon: faMicrophone,
            accent: "success",
            url: `${PageRoute.HACKATHON}/#workflow-diagram`,
            local: true,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designed a speech-driven interface optimized for environments where hands and attention are limited. This approach directly addressed the core constraints of repair shops, allowing technicians to interact with the system without needing to stop their work or use a separate device.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "Spoken instruction delivery" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "No specialized hardware required" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Low adoption barrier for technicians" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Interface design must respect physical context." },
                ],
              },
            ],
          },
          {
            id: "h-kf-post-hackathon",
            title: "Post-Hackathon Productization",
            subtitle:
              "Transitioning from prototype to production with a focus on durability and real-world deployment.",
            icon: faMobileScreenButton,
            accent: "warning",
            url: `${PageRoute.HACKATHON}/#tech_assist`,
            local: true,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Continued development as sole engineer, transitioning the prototype into a mobile-first React Native application. I focused first on reinforcing the core value proposition and addressing real-world deployment challenges rather than adding new features. This phase emphasized building for durability and long-term maintainability.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Reinforcement of core voice-driven workflow" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Refactoring for mobile architecture and field performance",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Iterative testing and refinement based on real-world feedback",
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
                    text: "Prototype velocity must transition into structural durability.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "hackathon-learn-more",
        title: "Learn More",
        type: BlockType.LINKS,
        items: [
          {
            id: "hackathon-article-link",
            title: "View Hackathon Case Study",
            url: PageRoute.HACKATHON,
            isScroller: false,
            local: true,
            icon: faCode,
          },
        ],
      },
    ],
  },
  {
    id: "side-projects",
    slug: "side-projects",
    title: "Side Projects",
    icon: faFlaskVial,
    isScroller: true,
    blocks: [
      {
        id: "sp-projects-overview",
        title: "Projects Overview",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "My side projects are where I experiment, explore new tools, and solve ",
              },
              { type: "strong", text: "practical problems" },
              { type: "text", text: " outside of client or organizational constraints." },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "These projects range from hardware-integrated automation systems to encryption tools and creative applications. Each one reflects my ability to take an idea from concept to execution while owning the full technical lifecycle.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              { type: "li", children: [{ type: "text", text: "Hardware + software integration" }] },
              { type: "li", children: [{ type: "text", text: "Algorithmic experimentation" }] },
              { type: "li", children: [{ type: "text", text: "End-to-end product ownership" }] },
            ],
          },
        ],
      },
      {
        id: "sp-focus-areas",
        type: BlockType.CARD_GRID,
        title: "Focus Areas",
        subtitle: "Themes that run through my side projects and reflect my engineering values",
        icon: faArrowsToEye,
        items: [
          {
            id: "sp-agile-robust-programs",
            title: "Agile & Robust Architectures",
            subtitle: "Balancing rapid iteration with structural discipline in side projects",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Use side projects to experiment with full-stack architectures while preserving structural discipline.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Rapid prototyping via custom MERN template" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Intentional system structure from the start" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Lessons translated into professional work" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Speed and structure are not mutually exclusive." },
                ],
              },
            ],
            icon: faLayerGroup,
          },
          {
            id: "sp-practical-applications",
            title: "Real-World Problem Solving",
            subtitle:
              "Building solutions that operate in real environments with practical constraints",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Build hardware-integrated systems that operate outside controlled environments.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Software-hardware integration" }],
                  },
                  { type: "li", children: [{ type: "text", text: "Field-tested reliability" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Design shaped by physical constraints" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Practical constraints expose better architectural decisions.",
                  },
                ],
              },
            ],
            icon: faUniversalAccess,
          },
          {
            id: "sp-full-sdlc-experiance",
            title: "Full Software Development Lifecycle Experience",
            subtitle: "Owning projects end-to-end from concept to deployment and maintenance",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Side projects have pushed me to learn and direct myself through every phase of the software development lifecycle, from requirements gathering to deployment and maintenance.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Requirements definition and architecture planning" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Implementation and production deployment" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Maintenance and iterative refinement" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Ownership across phases reveals real tradeoffs." },
                ],
              },
            ],
            icon: faLayerGroup,
          },
        ],
      },
      {
        id: "sp-programs-of-note",
        type: BlockType.CARD_GRID,
        title: "Programs of Note",
        subtitle: "Selected projects demonstrating architectural range and systems ownership",
        icon: faBookOpenReader,
        items: [
          {
            id: "sp-greenhouse-automation",
            title: "Greenhouse Automation",
            subtitle: "A Raspberry Pi-based system for autonomous greenhouse climate control",
            icon: faSeedling,
            url: `${PageRoute.SIDE_PROJECTS}/#greenhouse`,
            isScroller: false,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "A hardware-integrated automation system built on a Raspberry Pi Zero, designed to regulate greenhouse climate conditions autonomously.",
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
                        text: "Python-based control logic with real-time sensor feedback",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Relay-driven actuation of fans, lighting, and humidity systems",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Profile-driven environmental thresholds for staged plant growth",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "sp-encryption-tool",
            title: "Encryption Tool",
            subtitle: "A client-side encryption engine inspired by classical cipher systems",
            icon: faArrowDownUpLock,
            url: `${PageRoute.SIDE_PROJECTS}/#enigma`,
            isScroller: false,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "A deterministic, client-side encryption engine inspired by classical Caesar substitution and multi-rotor cipher systems.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Multi-alphabet rotational transformation logic" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Embedded metadata for stateless decryption" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Browser-only execution for privacy and reduced attack surface",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            id: "sp-d20-king",
            title: "D20 King (Private)",
            subtitle:
              "A modular tabletop RPG campaign management platform focused on sharing content and building on top of community-created work",
            icon: faDiceD20,
            url: `${PageRoute.SIDE_PROJECTS}/#d20`,
            isScroller: false,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "A modular campaign management platform built around a structured narrative domain model.",
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
                        text: "Hierarchical modeling (Storybook → Act → Room → Encounter)",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Reusable and extensible campaign components" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Designed for long-running, evolving creative systems",
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
        id: "sp-learn-more",
        title: "Learn More",
        type: BlockType.LINKS,
        items: [
          {
            id: "sp-explore-side-projects",
            title: "Explore Side Projects",
            url: `${PageRoute.SIDE_PROJECTS}`,
            icon: faFlask,
          },
          {
            id: "sp-github-profile",
            title: "View GitHub Profile",
            url: "https://github.com/Foscat",
            icon: faGitSquare,
          },
        ],
      },
    ],
  },
  {
    id: "education",
    slug: "education",
    title: "Education & Foundations",
    subtitle: "Formal training and early projects that shaped my development journey",
    icon: faGraduationCap,
    isScroller: true,
    blocks: [
      {
        id: "ed-smu-experience",
        title: "SMU Experience",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "My formal training at " },
              { type: "strong", text: "Southern Methodist University" },
              {
                type: "text",
                text: " laid the technical foundation for my career, introducing me to web development, APIs, collaboration, and project-based learning.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This period represents the transition from learning syntax to solving meaningful problems through software. The projects from this phase highlight early growth, first team experiences, and increasing ownership of technical decisions.",
              },
            ],
          },
        ],
      },
      {
        id: "ed-notable-projects",
        title: "Notable Projects",
        subtitle: "Foundational work that introduced key architectural and collaborative concepts",
        type: BlockType.CARD_GRID,
        items: [
          {
            id: "ed-np-driven-interfaces",
            title: "API-Driven Interfaces",
            subtitle:
              "Early experience designing interfaces that consume and react to the nuances of external data sources",
            icon: faPlug,
            url: `${PageRoute.EDUCATION}/#gif_freak`,
            isScroller: false,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Early projects centered on integrating third-party APIs and managing asynchronous data flows within reactive user interfaces.",
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
                        text: "Designed UI states around loading, error, and success conditions",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Shifted from static rendering to data-driven components",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Developed early instincts for state ownership and lifecycle management",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            id: "ed-np-collaborative-development",
            title: "Collaborative Development",
            subtitle:
              "Early experience working in a team setting with shared code ownership and coordination",
            icon: faPeopleGroup,
            url: `${PageRoute.EDUCATION}/#stock_memer`,
            isScroller: false,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Team-based development introduced shared responsibility for code quality, backend coordination, and interface contracts.",
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
                        text: "Defined clearer boundaries between frontend and backend responsibilities",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Collaborated through structured task division and integration checkpoints",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Learned how communication impacts system reliability",
                      },
                    ],
                  },
                ],
              },
            ],
          },

          {
            id: "ed-np-matching-algorithms",
            title: "Matching Algorithms",
            subtitle:
              "Early experience designing algorithms to translate qualitative inputs into structured outputs",
            icon: faChartDiagram,
            url: `${PageRoute.EDUCATION}/#scion_matches`,
            isScroller: false,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "A capstone project focused on designing a compatibility scoring algorithm for a real-world domain with meaningful user impact.",
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
                        text: "Translated qualitative survey inputs into weighted scoring logic",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Balanced algorithmic precision with user interpretability",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Applied structured data modeling to ambiguous requirements",
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
        id: "ed-learn-more",
        title: "Learn More",
        type: BlockType.LINKS,
        items: [
          {
            id: "ed-explore-smu-projects",
            title: "Explore SMU Projects",
            url: `${PageRoute.EDUCATION}`,
            icon: faGraduationCap,
          },
        ],
      },
    ],
  },

  {
    id: "cta",
    slug: "contact",
    title: "Let's Connect",
    subtitle: "I'm always open to new opportunities and collaborations",
    icon: faPaperPlane,
    isScroller: true,
    blocks: [
      {
        id: "cta-get-in-touch",
        title: "Get in Touch",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "If you're looking for an engineer who can " },
              { type: "strong", text: "own UI architecture" },
              {
                type: "text",
                text: ", think in systems, and collaborate closely across product and engineering teams, I’d love to connect.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Whether you're hiring, exploring a collaboration, or simply want to talk through ideas, feel free to reach out. I’m always open to meaningful conversations and new challenges.",
              },
            ],
          },
        ],
      },
      {
        id: "cta-contact-links",
        type: BlockType.LINKS,
        items: [
          {
            id: "cta-contact-me",
            title: "Contact Me",
            url: PageRoute.CONTACT,
            icon: faEnvelope,
            tooltip: "View contact page",
          },
          {
            id: "cta-download-resume",
            title: "Download Resume",
            url: "./Kyle_Foster_React_Resume.pdf",
            icon: faFileArrowDown,
            download: true,
            tooltip: "Download a PDF version of my resume",
          },
        ],
      },
    ],
  },
];
Object.freeze(homeSections);
export default homeSections;
