import { BlockType, Theme } from "../../types/ui.types";

const sideProjectsData = [
  {
    id: "overview",
    slug: "overview",
    title: "Side Projects Overview",
    icon: "flask",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "Alongside my professional work, I consistently build personal side projects to solve real problems, explore new technologies, and deepen my engineering skill set. These projects are self-directed, production-minded systems — not tutorials or proof-of-concepts — and each reflects how I approach software design in real-world conditions.",
          "Across hardware automation, security tooling, and full-stack application design, these projects demonstrate ownership, technical range, and an ability to translate abstract ideas into working systems. They mirror the same problem-solving mindset I bring to professional teams: identify constraints, design pragmatically, and iterate until the solution is reliable.",
        ],
        dividerAfter: true,
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
    icon: "seedling",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "Maintaining stable environmental conditions inside a greenhouse requires constant monitoring. Manual checks are time-consuming, error-prone, and impractical when conditions fluctuate throughout the day. Without automation, achieving consistent year-round growth becomes difficult, especially when physical access is limited.",
        ],
        dividerAfter: false,
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Control Board",
        images: [
          {
            src: "../images/sideProjects/greenhouseControls.jpg",
            alt: "Greenhouse control board",
            title: "Greenhouse control board",
          },
          {
            src: "../images/sideProjects/greenhouseHookedUp.jpg",
            alt: "Greenhouse control board hooked up and operating",
            title: "Greenhouse control board operating in the field",
          },
        ],
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I designed and built an automated climate control system using Python and a Raspberry Pi Zero that continuously monitors temperature and humidity and dynamically responds in real time. The system operates as a centralized controller, activating heaters, fans, humidifiers, dehumidifiers, vents, and lighting through relay modules based on sensor feedback.",
          "Multiple configurable operating profiles support different plant growth stages, allowing the system to adapt without manual intervention. The result is a reliable, low-maintenance solution that stabilizes greenhouse conditions and significantly reduces the need for human oversight.",
        ],
        dividerAfter: false,
      },
      {
        type: BlockType.DIAGRAM,
        title: "System Architecture",
        description:
          "High-level data and control flow for the greenhouse automation system.",
        theme: Theme.DARK,
        diagram: `
  flowchart LR
    Sensors[Temp & Humidity Sensors]
    Pi[Raspberry Pi Zero]
    Logic[Control Logic]
    Relays[Relay Board]
    Devices[Heaters / Fans / Humidifiers]
  
    Sensors --> Pi
    Pi --> Logic
    Logic --> Relays
    Relays --> Devices
  `,
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            text: "Designed a real-world automation system combining hardware, software, and environmental feedback loops",
          },
          {
            text: "Demonstrated embedded systems thinking and fault-tolerant control logic",
          },
          {
            text: "Built a solution optimized for reliability over constant user interaction",
          },
        ],
      },
      {
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/Foscat/greenhouse",
            icon: "code-branch",
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
    icon: "lock",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "Learning cryptography concepts often stops at theory, with few opportunities to apply them in a practical, user-facing way. I wanted to explore how classical cipher principles could be transformed into a modern, usable encryption tool without relying on server-side processing.",
        ],
        dividerAfter: false,
      },
      {
        type: BlockType.IMAGE_GALLERY,
        images: [
          {
            src: "../images/sideProjects/enigma.png",
            alt: "Screenshot of Enigma encrypter website",
            title: "Enigma website page",
            caption: "",
          },
        ],
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I built a client-side encryption application inspired by both the Caesar cipher and the Enigma machine. The system uses multiple rotating alphabets to increase complexity while remaining deterministic and reversible.",
          "Originally implemented in Python, I later refactored the entire system into JavaScript and designed a clean web interface. All encryption and decryption occurs locally in the browser, ensuring privacy without backend dependency.",
        ],
        dividerAfter: false,
      },
      {
        type: BlockType.DIAGRAM,
        title: "Encryption Flow",
        description:
          "Client-side encryption pipeline with no server involvement.",
        theme: Theme.DARK,
        diagram: `
  flowchart LR
    Input[Plain Text]
    Cipher[Multi-Alphabet Cipher Engine]
    Output[Encrypted Text]
  
    Input --> Cipher
    Cipher --> Output
  `,
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            text: "Designed a real-world automation system combining hardware, software, and environmental feedback loops",
          },
          {
            text: "Demonstrated embedded systems thinking and fault-tolerant control logic",
          },
          {
            text: "Built a solution optimized for reliability over constant user interaction",
          },
        ],
      },
      {
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/Foscat/Enigma",
            icon: "code-branch",
          },
          {
            title: "View the project",
            url: "https://foscat.github.io/Enigma/",
            icon: "laptop-code",
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
    icon: "dice-d20",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "Dungeon Masters often manage complex campaigns using fragmented tools: documents, notes, spreadsheets, and ad-hoc systems. While many platforms exist for players, few are designed specifically for Dungeon Masters who need structured world-building, narrative control, and long-term campaign organization.",
        ],
        dividerAfter: false,
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Screenshots",
        images: [
          {
            src: "../images/sideProjects/d20_dashboard.png",
            alt: "Screenshot of D20 tabletop campaign creator website",
            title: "Landing Page",
          },
          {
            src: "../images/sideProjects/d20_oppEditor.png",
            alt: "Screenshot of D20 opponent editor page",
            title: "Opponent editor",
          },
        ],
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I built D20 King as a full-stack platform focused on the needs of Dungeon Masters. Using a modular architecture inspired by source-control systems, campaigns are structured into Storybooks, Acts, Rooms, encounters, opponents, and rewards.",
          "This approach allows Dungeon Masters to scale campaigns organically while maintaining clarity and organization. The system supports both improvisation and long-term planning, turning creative world-building into a structured, manageable process.",
        ],
        dividerAfter: false,
      },
      {
        type: BlockType.DIAGRAM,
        title: "Domain Model",
        description: "Core entity relationships within the D20 King platform.",
        theme: Theme.DARK,
        diagram: `
  flowchart TD
    Storybook --> Act
    Act --> Room
    Room --> Encounter
    Encounter --> Opponent
    Encounter --> Treasure
  `,
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            text: "Designed a domain-driven data model for complex creative workflows",
          },
          {
            text: "Built a scalable system focused on creator productivity",
          },
          {
            text: "Balanced structured data with flexible content creation",
          },
        ],
      },
    ],
  },
];

export default sideProjectsData;
