import { BlockType, Theme } from "../../types/ui.types";

/**
 * SMU – Page Section Data
 * ------------------------------------------------------------
 * Academic projects demonstrating early-stage growth,
 * teamwork, and problem-solving progression.
 */

export default [
  {
    id: "smu-overview",
    slug: "overview",
    title: "SMU Projects",
    subtitle:
      "Foundational projects that launched my software development career",
    icon: "graduation-cap",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RichText,
        paragraphs: [
          "My time at Southern Methodist University marked the foundation of my transition into professional software development. During this period, I built a strong technical baseline in HTML, CSS, JavaScript, Node.js, Express, and React, while learning how to apply those skills through real projects rather than isolated exercises.",
          "This page highlights three milestone projects that reflect my growth trajectory: Gif Freak, my first hands-on experience consuming external APIs; Stock Memer, my first collaborative team project involving live data and persistence; and Scion Matches, my capstone project where I designed a real-world matching system and took ownership of core business logic.",
        ],
        dividerAfter: false,
      },
    ],
  },

  /* ============================================================
     GIF FREAK
     ============================================================ */

  {
    id: "gif-freak",
    slug: "gif-freak",
    title: "Gif Freak",
    icon: "image",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RichText,
        title: "The Problem",
        paragraphs: [
          "Early in my education, I needed hands-on experience working with third-party APIs and asynchronous JavaScript. Most learning exercises felt abstract and disconnected from real user interaction.",
          "I wanted to build something interactive that demonstrated how front-end applications communicate with external services and respond dynamically to user input.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.IMAGE_GALLERY,
        images: [
          {
            src: "../images/smu/gifFreak.png",
            alt: "Screenshot of original Gif Freak page",
            title: "Original webpage",
            caption: "",
          },
        ],
      },
      {
        type: BlockType.RichText,
        title: "The Solution",
        paragraphs: [
          "I built Gif Freak, a lightweight client-side web application that integrates with the Giphy API to fetch and display animated content based on user input.",
          "Users can trigger predefined searches or generate custom search buttons, each making asynchronous API requests and rendering results in real time. While persistence was limited to session state at the time, the project provided direct exposure to API consumption, event-driven UI updates, and async data handling.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.Diagram,
        title: "System Flow",
        mermaid: `
          flowchart LR
            UserInput --> UI
            UI --> GiphyAPI
            GiphyAPI --> UI
            UI --> GIFDisplay
        `,
        theme: "auto",
      },
      {
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/Foscat/gif-buttons",
            icon: "code",
          },
          {
            title: "View the project",
            url: "https://foscat.github.io/gif-buttons/",
            icon: "laptop-code",
          },
        ],
      },

      {
        type: BlockType.BulletedList,
        title: "Key Takeaways",
        items: [
          { text: "First hands-on experience consuming third-party APIs" },
          {
            text: "Learned asynchronous JavaScript and event-driven UI updates",
          },
          { text: "Sparked long-term interest in front-end development" },
        ],
      },

      {
        type: BlockType.RichText,
        title: "What I'd Improve Today",
        paragraphs: [
          "If I rebuilt this project today, I would introduce persistent storage using a backend service, implement proper error handling for API failures, and refactor the UI using modern component patterns.",
          "I would also add accessibility improvements, loading states, and memoization to reduce unnecessary re-renders.",
        ],
        dividerAfter: false,
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
    icon: "chart-line",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RichText,
        title: "The Problem",
        paragraphs: [
          "Financial data is often presented in dense, inaccessible formats, making it difficult for casual users to understand trends.",
          "Additionally, this project introduced the challenge of working within a team — coordinating responsibilities, merging code, and integrating multiple systems into a cohesive product.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.IMAGE_GALLERY,
        images: [
          {
            src: "../images/smu/stock_memer.png",
            alt: "Screenshot of the Stock Memer website",
            title: "Original webpage",
            caption: "",
          },
        ],
      },
      {
        type: BlockType.RichText,
        title: "The Solution",
        paragraphs: [
          "Stock Memer combined real-time stock data with user-generated content, allowing users to view live market trends while creating memes associated with specific stocks.",
          "My role focused on API integrations and Firebase persistence, designing how live data and user content were retrieved, stored, and associated within the application.",
        ],
        dividerAfter: true,
      },

      {
        type: BlockType.Diagram,
        title: "Data & Content Flow",
        mermaid: `
          flowchart LR
            StockAPI --> DataProcessor --> ChartUI
            User --> MemeGenerator --> Firebase
            Firebase --> StockPage
        `,
        theme: Theme.AUTO,
      },
      {
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/Foscat/Stock-Memer",
            icon: "code",
          },
        ],
      },

      {
        type: BlockType.BulletedList,
        title: "Key Takeaways",
        items: [
          { text: "First experience working in a multi-developer codebase" },
          { text: "Built API and database integrations collaboratively" },
          { text: "Learned to coordinate responsibilities across a team" },
        ],
      },

      {
        type: BlockType.RichText,
        title: "What I'd Improve Today",
        paragraphs: [
          "Today, I would redesign the backend to decouple data services, replace deprecated APIs, and introduce caching for stock data.",
          "I would also formalize team workflows using code reviews, clearer ownership boundaries, and shared API contracts.",
        ],
        dividerAfter: false,
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
    icon: "heart",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RichText,
        title: "The Problem",
        paragraphs: [
          "Matching Intended Parents with Gestational Carriers is emotionally, financially, and logistically complex.",
          "Existing processes relied heavily on manual review, creating delays and inefficiencies during an already stressful journey.",
        ],
        dividerAfter: true,
      },

      {
        type: BlockType.RichText,
        title: "The Solution",
        paragraphs: [
          "Scion Matches was my capstone project and marked a shift toward building impact-driven software.",
          "I designed and implemented the core matching algorithm, analyzing survey responses to generate compatibility scores and identify strong potential pairings.",
        ],
        dividerAfter: true,
      },

      {
        type: BlockType.Diagram,
        title: "Matching Algorithm Flow",
        mermaid: `
          flowchart TD
            UserProfiles --> SurveyEngine
            SurveyEngine --> MatchAlgorithm
            MatchAlgorithm --> MatchScores
            MatchScores --> UserMatches
        `,
        theme: "auto",
      },
      {
        type: BlockType.LINKS,
        links: [
          {
            title: "See the code",
            url: "https://github.com/justinkunz/scion/tree/master",
            icon: "code",
          },
        ],
      },
      {
        type: BlockType.BulletedList,
        title: "Key Takeaways",
        items: [
          { text: "Designed and implemented a real-world matching algorithm" },
          { text: "Owned core business logic in a capstone project" },
          { text: "Shifted from experimental apps to purpose-driven software" },
        ],
      },

      {
        type: BlockType.RichText,
        title: "What I'd Improve Today",
        paragraphs: [
          "With my current experience, I would formalize the matching logic into a versioned service, add explainability to match scores, and introduce audit logging.",
          "I would also prioritize data privacy, validation layers, and long-term maintainability.",
        ],
        dividerAfter: false,
      },
    ],
  },
];
