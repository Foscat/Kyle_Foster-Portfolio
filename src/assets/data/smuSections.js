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
import { BlockType } from "../../types/ui.types";
import { diagrams } from "./diagrams.js";
import imgObjs from "assets/images/smu";

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
              { type: "inlineIcon", icon: "graduation-cap" },
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
        items: [
          {
            id: "smu-kt-1",
            title: "API Integration",
            text: "This project was my first hands-on experience consuming a third-party API in a real application. I learned how to structure requests, handle responses, and map external data into a user-facing interface. It highlighted how dependent front-end behavior is on the shape and reliability of external services. That understanding became foundational for all future API-driven work.",
            icon: faDiagramProject,
          },
          {
            id: "smu-kt-2",
            title: "Asynchronous JavaScript",
            text: "Working with asynchronous requests forced me to think differently about control flow and UI state. I learned how to manage loading states, event-driven updates, and user feedback while data was in transit. This was my first exposure to real-world async behavior outside of contrived examples. It significantly improved my confidence working with non-blocking JavaScript.",
            icon: faLaptopCode,
          },
          {
            id: "smu-kt-3",
            title: "User Interaction",
            text: "Gif Freak reinforced the importance of designing interfaces that clearly respond to user input. Each interaction needed immediate visual feedback to feel responsive and intuitive. I began thinking not just about functionality, but about how users perceive system behavior. That mindset carried forward into more complex UI systems later on.",
            icon: faCommentNodes,
          },
        ],
      },
      {
        id: "gif-freak-improvements",
        type: BlockType.RICH_TEXT,
        title: "What I'd Improve Today",
        icon: faHelmetSafety,
        paragraphs: [
          "If I rebuilt this project today, I would introduce persistent storage using a backend service, implement proper error handling for API failures, and refactor the UI using modern component patterns.",
          "I would also add accessibility improvements, loading states, and memoization to reduce unnecessary re-renders.",
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
              { type: "inlineIcon", icon: "users" },
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
        images: [
          {
            src: "../images/smu/stock_memer.png",
            alt: "Screenshot of the Stock Memer website",
            title: "Original webpage",
            caption:
              "Screen capture of the Stock Memer application showing stock data and meme generation features.",
          },
        ],
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
        items: [
          {
            id: "sm-kt-1",
            title: "Team-Based Development",
            text: "This was my first experience working inside a multi-developer codebase with shared ownership. I learned how individual decisions impact others and why consistency matters. Navigating merge conflicts and overlapping responsibilities exposed gaps in communication and planning. It was a pivotal introduction to collaborative software development.",
          },
          {
            id: "sm-kt-2",
            title: "API & Database Integration",
            text: "I worked directly on integrating external stock APIs alongside Firebase persistence. This required coordinating data flow between live services and stored user-generated content. Seeing how real-time data and persistence interact helped me understand the importance of clear data boundaries. It also highlighted the risks of tightly coupling front-end logic to external APIs.",
          },
          {
            id: "sm-kt-3",
            title: "Cross-Team Coordination",
            text: "Stock Memer forced me to coordinate responsibilities across a team rather than working in isolation. We had to divide work, align on interfaces, and trust each other’s implementations. This experience exposed the need for clearer ownership and shared contracts. It shaped how I approach collaboration in professional environments.",
          },
        ],
      },
      {
        id: "stock-memer-improvements",
        type: BlockType.RICH_TEXT,
        title: "What I'd Improve Today",
        paragraphs: [
          "Today, I would redesign the backend to decouple data services, replace deprecated APIs, and introduce caching for stock data.",
          "I would also formalize team workflows using code reviews, clearer ownership boundaries, and shared API contracts.",
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
              { type: "inlineIcon", icon: "heart" },
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
            icon: faCode,
            rel: "noopener noreferrer",
          },
        ],
      },
      {
        id: "scion-takeaways",
        type: BlockType.BULLETED_LIST,
        title: "Key Takeaways",
        items: [
          {
            title: "Real-World Matching Algorithms",
            text: "Designing a compatibility algorithm for a real-world domain forced me to think beyond theoretical correctness. Each decision had human consequences, which raised the bar for accuracy and transparency. I learned how to translate qualitative survey data into quantitative scores. This was my first exposure to algorithmic decision-making with real stakes.",
          },
          {
            title: "Business Logic Ownership",
            text: "I took full ownership of the core matching logic, from requirements through implementation. This meant making judgment calls where specifications were ambiguous. The experience taught me how central business logic defines the value of a system. It also reinforced the responsibility that comes with owning critical code paths.",
          },
          {
            title: "Purpose-Driven Software",
            text: "Scion Matches marked a shift from experimental projects to impact-driven software. The problem space demanded empathy, care, and precision. I began thinking more deeply about ethics, data handling, and long-term maintainability. This project reshaped how I evaluate the success of a technical solution.",
          },
        ],
      },
      {
        id: "scion-improvements",
        type: BlockType.RICH_TEXT,
        title: "What I'd Improve Today",
        paragraphs: [
          "With my current experience, I would formalize the matching logic into a versioned service, add explainability to match scores, and introduce audit logging.",
          "I would also prioritize data privacy, validation layers, and long-term maintainability.",
        ],
      },
    ],
  },
];

export default smuSections;
