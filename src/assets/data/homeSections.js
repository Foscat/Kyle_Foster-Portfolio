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
import { BlockType, PageRoute } from "../../types/ui.types";
import { faGitSquare } from "@fortawesome/free-brands-svg-icons";

const homeSections = [
  {
    id: "hero",
    slug: "hero",
    icon: faCode,
    title: "Overview",
    subtitle: "Full-Stack Engineer with a Product Mindset",
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
              { type: "strong", text: "full-stack engineer" },
              {
                type: "text",
                text: " who specializes in front-end development, with a strong product mindset and a systems-oriented approach to building software. I focus on designing user-facing experiences that remain maintainable and scalable as products grow beyond their initial scope.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "From education platforms used daily in real classrooms, to hackathon-winning prototypes, to deeply personal side projects, my work consistently centers on ",
              },
              { type: "em", text: "solving meaningful problems" },
              {
                type: "text",
                text: " rather than chasing novelty. I care deeply about how tools are actually used, not just how they look in isolation.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "lightbulb" },
              {
                type: "text",
                text: " Quality, for me, is not just clean code — it’s building systems teams can understand, extend, and rely on over time.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "professional",
    slug: "professional-work",
    title: "Professional Work",
    subtitle: "Lead Front-end Engineer for CodeStream Studios LLC",
    icon: faBuildingUser,
    isScroller: true,
    blocks: [
      {
        id: "professional-codestream",
        title: "CodeStream Studios LLC",
        subtitle: "Lead Front-end Engineer 2019-2025",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "My professional work centers on building and scaling a " },
              { type: "strong", text: "production education platform" },
              {
                type: "text",
                text: " used by real students, teachers, and organizations. The platform was not theoretical — it supported live instruction, grading, and classroom operations at scale.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "At CodeStream Studios, I served as the " },
              { type: "em", text: "sole front-end engineer" },
              {
                type: "text",
                text: ", owning the UI architecture end-to-end. I personally architected and built core systems including a multi-panel browser-based code editor, role-based access control for organizations, virtual classroom workflows, grading tools, reporting systems, and administrative dashboards.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Zero-install 3-panel IDE for Web and Python" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Organization-aware permissions and licensing" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Teacher grading, reporting, and admin tooling" }],
              },
            ],
          },
        ],
      },
      {
        id: "professional-key-features",
        type: BlockType.BULLETED_LIST,
        title: "Notable Features",
        items: [
          {
            id: "pro-grading",
            title: "Teacher Tools",
            text: "I built teacher-facing grading tools designed around real instructional workflows rather than abstract evaluation models. Instructors can review student projects, run code, and leave feedback without disrupting live teaching. Downloadable reports allow classroom performance to be shared with coordinators and leadership. These tools reduced friction and made grading feel like a natural extension of teaching.",
            icon: faChartLine,
            url: `${PageRoute.PROFESSIONAL}#grading`,
            ariaLabel: "View Teacher Tools Section",
          },
          {
            id: "pro-organizations",
            title: "Organizations & Licensing",
            text: "The platform supports role-based permissions across organizations, including Students, Teachers, and Admins. I designed a flexible licensing system that enforces limits on active teachers and students while also controlling access to proprietary curriculum. These rules are applied consistently across classrooms and features, allowing the platform to scale from a single classroom to multi-school deployments. Licensing logic balances business constraints with educational continuity.",
            icon: faIdBadge,
            url: `${PageRoute.PROFESSIONAL}#organizations`,
            ariaLabel: "View Organizations and Licensing Section",
          },
          {
            id: "pro-editor",
            title: "3-Panel Browser-Based IDE",
            text: "I designed a zero-install, browser-based coding environment that supports Web (HTML, CSS, JavaScript) and Python projects. The three-panel layout keeps instructions, code, and output visible at all times, reducing cognitive load for learners. Live execution and cloud persistence ensure students can work from any device without setup friction. The experience mirrors a lightweight IDE while remaining accessible to beginners.",
            icon: faLaptopCode,
            url: `${PageRoute.PROFESSIONAL}#editor`,
            ariaLabel: "View 3 Panel Browser Based IDE Section",
          },
        ],
      },
      {
        id: "professional-learn-more",
        title: "Learn More",
        type: "links",
        links: [
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
    subtitle: "Rapid problem-solving under real-world constraints to real-world problems.",
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
              { type: "inlineIcon", icon: "trophy" },
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
        type: BlockType.BULLETED_LIST,
        items: [
          {
            id: "h-kf-mvp-solution",
            title: "Innovative MVP Solution",
            text: "Our team delivered a voice-driven repair assistant designed specifically for real-world shop environments. The solution guided technicians step-by-step while tracking workflow efficiency and bottlenecks. We focused on reducing cognitive load and physical constraints rather than adding complexity. This clear alignment with the client’s actual needs set our MVP apart from competing solutions.",
            icon: faHeadset,
            url: `${PageRoute.HACKATHON}#reinforce`,
            local: true,
          },
          {
            id: "h-kf-voice-interface",
            title: "Hands-Free Voice Interface",
            text: "The voice interface allowed technicians to receive spoken instructions without looking at screens or handling devices. This design choice respected the realities of repair environments, where hands are often occupied. No specialized hardware was required, lowering adoption barriers. The result was a practical, immediately usable interface.",
            icon: faMicrophone,
            url: `${PageRoute.HACKATHON}#workflow-diagram`,
            local: true,
          },
          {
            id: "h-kf-post-hackathon",
            title: "Post-Hackathon Product Work",
            text: "After the hackathon, I continued development as the sole engineer, transitioning the prototype into a mobile-first React Native application. This phase focused on stability, usability, and real-world deployment considerations. The experience reinforced my ability to take a concept beyond a demo and into a production-ready direction.",
            icon: faMobileScreenButton,
            url: `${PageRoute.HACKATHON}#tech_assist`,
            local: true,
          },
        ],
      },
      {
        id: "hackathon-learn-more",
        title: "Learn More",
        type: BlockType.LINKS,
        links: [
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
    subtitle: "Self-directed solutions to real problems I've faced",
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
        type: BlockType.BULLETED_LIST,
        title: "Focus Areas",
        icon: faArrowsToEye,
        items: [
          {
            id: "sp-agile-robust-programs",
            title: "Agile & Robust Programs",
            text: "I use side projects to experiment with full-stack architectures and rapid prototyping techniques. Many of these projects are built using my custom MERN template, allowing me to iterate quickly while maintaining structure. This balance helps me test ideas without sacrificing code quality. Lessons learned here often inform my professional work.",
            icon: faLayerGroup,
          },
          {
            id: "sp-practical-applications",
            title: "Practical Applications",
            text: "Several of my side projects integrate hardware and software to solve real problems I’ve encountered firsthand. These systems are not proof-of-concepts; many are still running in the field today. Designing for reliability outside controlled environments has strengthened my problem-solving approach. Practical constraints drive better design decisions.",
            icon: faUniversalAccess,
          },
          {
            id: "sp-full-sdlc-experiance",
            title: "Full SDLC Experience",
            text: "I take full ownership of projects from ideation through deployment and maintenance. This includes requirements gathering, architecture, implementation, and iteration. Working end-to-end exposes tradeoffs that are often hidden in narrow roles. It has made me a more thoughtful and accountable engineer.",
            icon: faLayerGroup,
          },
        ],
      },
      {
        id: "sp-programs-of-note",
        type: BlockType.BULLETED_LIST,
        title: "Programs of Note",
        icon: faBookOpenReader,
        items: [
          {
            id: "sp-greenhouse-automation",
            title: "Greenhouse Automation",
            text: "Hardware-driven automation system using a Raspberry Pi Zero and Sense Kit. Written in Python to regulate the climate conditions autonomously of a greenhouse.",
            icon: faSeedling,
            url: `${PageRoute.SIDE_PROJECTS}#greenhouse`,
            isScroller: false,
          },
          {
            id: "sp-encryption-tool",
            title: "Encryption Tool",
            text: "Custom Caesar/Enigma-inspired encryption tools built for experimentation with algorithms and UI clarity.",
            icon: faArrowDownUpLock,
            url: `${PageRoute.SIDE_PROJECTS}#enigma`,
            isScroller: false,
          },
          {
            id: "sp-d20-king",
            title: "D20 King (Private)",
            text: "A modular world-building and campaign management system designed by a Dungeon Master for Dungeon Masters. Allows users to copy, edit and share with others the modular sections that make up a campaign.",
            icon: faDiceD20,
            url: `${PageRoute.SIDE_PROJECTS}#d20`,
            isScroller: false,
          },
        ],
      },
      {
        id: "sp-learn-more",
        title: "Learn More",
        type: "links",
        links: [
          {
            id: "sp-explore-side-projects",
            title: "Explore Side Projects",
            url: PageRoute.SIDE_PROJECTS,
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
        type: BlockType.BULLETED_LIST,
        items: [
          {
            id: "ed-np-driven-interfaces",
            title: "API-Driven Interfaces",
            text: "These early projects focused on integrating third-party APIs and managing asynchronous data flows. I learned how to design interfaces that react to changing data rather than static inputs. This work laid the groundwork for my understanding of state management and dynamic rendering. It marked my shift from static pages to interactive systems.",
            icon: faPlug,
            url: `${PageRoute.EDUCATION}#gif_freak`,
            isScroller: false,
          },
          {
            id: "ed-np-collaborative-development",
            title: "Collaborative Development",
            text: "This phase introduced me to team-based development, task division, and shared ownership of code. I gained early exposure to backend responsibilities and coordination challenges. Working in a group highlighted the importance of communication and clear interfaces. These experiences shaped how I collaborate today.",
            icon: faPeopleGroup,
            url: `${PageRoute.EDUCATION}#stock_memer`,
            isScroller: false,
          },
          {
            id: "ed-np-matching-algorithms",
            title: "Matching Algorithms",
            text: "As part of a capstone project, I designed a compatibility scoring system to solve a real-world matching problem. This work required balancing algorithmic logic with user expectations. It was my first exposure to translating abstract requirements into concrete, testable logic. The project reinforced the value of thoughtful data modeling.",
            icon: faChartDiagram,
            url: `${PageRoute.EDUCATION}#scion_matches`,
            isScroller: false,
          },
        ],
      },
      {
        id: "ed-learn-more",
        title: "Learn More",
        type: "links",
        links: [
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
        type: "links",
        links: [
          {
            id: "cta-contact-me",
            title: "Contact Me",
            url: "/contact",
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

export default homeSections;
