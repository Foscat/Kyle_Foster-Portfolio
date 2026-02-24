import {
  faArrowsToCircle,
  faBookBookmark,
  faBrain,
  faBrush,
  faCodeBranch,
  faCodeCompare,
  faDiceD20,
  faExclamationTriangle,
  faFlaskVial,
  faKey,
  faLaptopCode,
  faLightbulb,
  faSeedling,
  faTowerObservation,
  faUnlockKeyhole,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "types/ui.types";
import { diagrams } from "./diagrams.js";
import imgObjs from "assets/images/sideProjects";

const sideProjectSections = [
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
        paragraphs: [
          "Alongside my professional work, I consistently build personal side projects to solve real problems, explore new technologies, and deepen my engineering skill set. These projects are self-directed and production-minded, not tutorials or throwaway experiments. Each one reflects how I approach software design when I’m responsible for the entire system.",
          "Across hardware automation, security tooling, and full-stack application design, these projects demonstrate ownership, technical range, and a willingness to work through ambiguity. They mirror the same mindset I bring to professional teams: understand the constraints, design pragmatically, and iterate until the solution is reliable in real-world conditions.",
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
        paragraphs: [
          "Maintaining stable environmental conditions inside a greenhouse requires constant monitoring. Manual checks are time-consuming, error-prone, and impractical when conditions fluctuate throughout the day. Without automation, achieving consistent year-round growth becomes difficult, especially when physical access is limited.",
        ],
      },
      diagrams.greenhouseMentalModel,
      {
        id: "greenhouse-control-board",
        type: BlockType.IMAGE_GALLERY,
        title: "Control Board",
        images: [imgObjs.greenhouseControls, imgObjs.greenhouseHookedup],
      },
      {
        id: "greenhouse-solution-text",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        icon: faLightbulb,
        paragraphs: [
          "I designed and built an automated climate control system using Python and a Raspberry Pi Zero that continuously monitors temperature and humidity and dynamically responds in real time. The system operates as a centralized controller, activating heaters, fans, humidifiers, dehumidifiers, vents, and lighting through relay modules based on sensor feedback.",
          "Multiple configurable operating profiles support different plant growth stages, allowing the system to adapt without manual intervention. The result is a reliable, low-maintenance solution that stabilizes greenhouse conditions and significantly reduces the need for human oversight.",
        ],
      },
      diagrams.greenhouseAutomation,
      {
        id: "greenhouse-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            id: "gh-takeaway-1",
            title: "Automation & Control Systems",
            text: "This project required designing a real-world automation system that tightly integrates hardware, software, and environmental feedback loops. Sensors continuously inform control decisions, and actuators respond without human intervention. The system had to remain stable despite fluctuating conditions and imperfect inputs. It reinforced the importance of deterministic control logic in physical systems.",
            icon: faCodeCompare,
          },
          {
            id: "gh-takeaway-2",
            title: "Embedded Systems",
            text: "Working with a Raspberry Pi Zero and sensor modules pushed me to think in terms of embedded constraints rather than abstract software models. I designed fault-tolerant logic that could recover from transient failures without crashing or requiring manual resets. Resource limitations influenced architectural decisions throughout the project. This experience strengthened my systems-level thinking.",
            icon: faBrain,
          },
          {
            id: "gh-takeaway-3",
            title: "Reliability Focus",
            text: "The system was intentionally designed to minimize ongoing user interaction. Once configured, it operates autonomously for long periods of time. Reliability and predictability mattered more than rich interfaces or frequent adjustments. This focus mirrors how production infrastructure must behave when human oversight is limited.",
            icon: faArrowsToCircle,
          },
        ],
      },
      {
        id: "greenhouse-links",
        type: BlockType.LINKS,
        links: [
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
        paragraphs: [
          "Learning cryptography concepts often stops at theory, with few opportunities to apply them in a practical, user-facing way. I wanted to explore how classical cipher principles could be transformed into a modern, usable encryption tool without relying on server-side processing.",
        ],
      },
      {
        id: "enigma-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Application Screenshots",
        images: [
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
        paragraphs: [
          "I built a client-side encryption application inspired by both the Caesar cipher and the Enigma machine. The system uses multiple rotating alphabets to increase complexity while remaining deterministic and reversible.",
          "Originally implemented in Python, I later refactored the entire system into JavaScript and designed a clean web interface. All encryption and decryption occurs locally in the browser, ensuring privacy without backend dependency.",
        ],
      },
      diagrams.encryptionFlow,
      diagrams.decryptFlow,
      {
        id: "enigma-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            id: "enigma-takeaway-1",
            title: "Cryptography Principles",
            text: "This project allowed me to explore classical cryptography concepts in a hands-on, practical way. By implementing rotating alphabets and deterministic transformations, I gained a deeper understanding of how simple ciphers can be composed into more complex systems. The exercise emphasized clarity and correctness over brute-force complexity. It reinforced the importance of well-defined transformations in security-related code.",
            icon: faKey,
          },
          {
            id: "enigma-takeaway-2",
            title: "Client-Side Security",
            text: "All encryption and decryption occurs entirely in the browser, without sending data to a server. This design choice prioritizes user privacy and reduces the attack surface of the application. It also required careful consideration of performance and determinism in a client-only environment. The result is a tool that demonstrates secure behavior through architectural choices, not just algorithms.",
            icon: faUserShield,
          },
          {
            id: "enigma-takeaway-3",
            title: "Usability Focus",
            text: "A major goal of the project was making cryptography approachable rather than intimidating. The interface is designed to guide users through encryption and decryption without requiring prior knowledge of ciphers. Clear feedback and predictable behavior were prioritized over advanced configuration. This balance between technical depth and usability shaped many implementation decisions.",
            icon: faLaptopCode,
          },
        ],
      },
      {
        id: "enigma-links",
        type: BlockType.LINKS,
        links: [
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
        paragraphs: [
          "Dungeon Masters often manage complex campaigns using fragmented tools: documents, notes, spreadsheets, and ad-hoc systems. While many platforms exist for players, few are designed specifically for Dungeon Masters who need structured world-building, narrative control, and long-term campaign organization.",
        ],
      },
      {
        id: "d20-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Development Screenshots",
        images: [imgObjs.d20Dashboard, imgObjs.opponentEditor],
      },
      {
        id: "d20-solution-text",
        icon: faLightbulb,
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I built D20 King as a full-stack platform focused on the needs of Dungeon Masters. Using a modular architecture inspired by source-control systems, campaigns are structured into Storybooks, Acts, Rooms, encounters, opponents, and rewards.",
          "This approach allows Dungeon Masters to scale campaigns organically while maintaining clarity and organization. The system supports both improvisation and long-term planning, turning creative world-building into a structured, manageable process.",
        ],
      },
      diagrams.domainModel,
      {
        id: "d20-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            id: "d20-takeaway-1",
            title: "MERN at Scale",
            text: "D20 King pushed me to design a modular data model capable of supporting long-running campaigns with evolving structures. Relationships between story elements had to remain flexible without becoming unmanageable. This required careful schema design and clear ownership boundaries. The project reinforced how early data modeling decisions impact long-term scalability.",
            icon: faLaptopCode,
          },
          {
            id: "d20-takeaway-2",
            title: "Creator Productivity",
            text: "The platform is built around the needs of Dungeon Masters as content creators, not just end users. Tools are designed to reduce friction when building, editing, and reusing campaign components. By prioritizing creator workflows, the system supports both improvisation and planning. This focus mirrors how professional tools should empower their primary users.",
            icon: faBrush,
          },
          {
            id: "d20-takeaway-3",
            title: "Structured Flexibility",
            text: "D20 King balances structured data with the flexibility required for creative storytelling. While campaigns follow a defined hierarchy, individual elements remain editable and adaptable. This balance prevents chaos without stifling creativity. Designing for structured flexibility became a recurring theme throughout the system.",
            icon: faBookBookmark,
          },
        ],
      },
    ],
  },
];

export default sideProjectSections;
