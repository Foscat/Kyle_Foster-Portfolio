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
import { BlockType } from "../../types/ui.types";
import { diagrams } from "./diagrams.js";
import imgObjs from "assets/images/sideProjects";

const sideProjectSections = [
  {
    id: "overview",
    slug: "overview",
    title: "Side Projects Overview",
    icon: faFlaskVial,
    isScroller: true,
    blocks: [
      {
        id: "overview-text",
        type: BlockType.RICH_TEXT,
        title: "Exploring Real-World Solutions",
        icon: faTowerObservation,
        paragraphs: [
          "Alongside my professional work, I consistently build personal side projects to solve real problems, explore new technologies, and deepen my engineering skill set. These projects are self-directed, production-minded systems — not tutorials or proof-of-concepts — and each reflects how I approach software design in real-world conditions.",
          "Across hardware automation, security tooling, and full-stack application design, these projects demonstrate ownership, technical range, and an ability to translate abstract ideas into working systems. They mirror the same problem-solving mindset I bring to professional teams: identify constraints, design pragmatically, and iterate until the solution is reliable.",
        ],
      },
    ],
  },

  /* ============================================================
       Greenhouse Climate Controller
       ============================================================ */

  {
    id: "greenhouse",
    slug: "greenhouse-climate-controller",
    title: "Greenhouse Climate Controller",
    icon: faSeedling,
    isScroller: true,
    blocks: [
      {
        id: "greenhouseproblem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "The Problem",
        paragraphs: [
          "Maintaining stable environmental conditions inside a greenhouse requires constant monitoring. Manual checks are time-consuming, error-prone, and impractical when conditions fluctuate throughout the day. Without automation, achieving consistent year-round growth becomes difficult, especially when physical access is limited.",
        ],
      },
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
            text: "Designed a real-world automation system combining hardware, software, and environmental feedback loops",
            icon: faCodeCompare,
          },
          {
            id: "gh-takeaway-2",
            title: "Embedded Systems",
            text: "Demonstrated embedded systems thinking and fault-tolerant control logic",
            icon: faBrain,
          },
          {
            id: "gh-takeaway-3",
            title: "Reliability Focus",
            text: "Built a solution optimized for reliability over constant user interaction",
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
        images: [imgObjs.enigma],
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
      {
        id: "enigma-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            id: "enigma-takeaway-1",
            title: "Cryptography Principles",
            text: "Designed a real-world automation system combining hardware, software, and environmental feedback loops",
            icon: faKey,
          },
          {
            id: "enigma-takeaway-2",
            title: "Client-Side Security",
            text: "Demonstrated embedded systems thinking and fault-tolerant control logic",
            icon: faUserShield,
          },
          {
            id: "enigma-takeaway-3",
            title: "Usability Focus",
            text: "Built a solution optimized for reliability over constant user interaction",
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
        images: [imgObjs.d20Dashboard, imgObjs.oppEdit],
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
            text: "Architected a modular data model for scalable campaign management",
            icon: faLaptopCode,
          },
          {
            id: "d20-takeaway-2",
            title: "Creator Productivity",
            text: "Built a scalable system focused on creator productivity",
            icon: faBrush,
          },
          {
            id: "d20-takeaway-3",
            title: "Structured Flexibility",
            text: "Balanced structured data with flexible content creation",
            icon: faBookBookmark,
          },
        ],
      },
    ],
  },
];

export default sideProjectSections;
