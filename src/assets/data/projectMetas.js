/**
 * @file projectMetas.js
 * @description Static registry of project metadata for portfolio cards and detail surfaces.
 * @module assets/data/projectMetas
 */

export default {
  Codestream: {
    id: "codestream",
    title: "CodeStream Online Studio",
    description:
      "At CodeStream Studios LLC, I was the sole frontend engineer for a React learning platform used by students, teachers, and administrators. I turned product ideas into shipped features, established the frontend architecture, and supported releases through bug fixing, documentation, and testing. Working on a lean team strengthened my ability to balance speed, ownership, and long-term maintainability.",
    jobTitle: "Senior Frontend Engineer",
    timespan: "2019 - 2025",
    url: "https://codestreamonlinestudio.com",
    repo: "Private",
    tech: [
      "React.js",
      "AWS (S3, RDS, ELB, Lambda)",
      "Google OAuth",
      "RSuite",
      "Asana API",
      "Skulpt.js",
      "Ace Editor",
      "Postgres",
      "Jest",
      "Swagger API",
    ],
  },
  Freelance_1: {
    id: "nodemailer",
    title: "Nodemailer Microservice",
    description:
      "A Nodemailer-powered email microservice that gives websites a simple way to send contact-form messages without heavy custom setup. It accepts a straightforward payload with sender details and message content, making it quick to integrate into small business and portfolio sites.",
    jobTitle: "Software Engineer",
    timespan: "1 hour",
    tech: ["Node.js", "Express.js", "Nodemailer", "Render"],
    url: "The public service endpoint is no longer available.",
    repo: "The repository is no longer public.",
  },
  Freelance_2: {
    id: "menOfHan",
    title: "Men of Han Models",
    description:
      'A subscription-based modeling site for a premium male talent brand signed to "Han Modeling." Visitors can browse public photos, while registered users can purchase tiers that unlock additional content and account-level access.',
    jobTitle: "MERN Stack Developer",
    tech: [
      "React",
      "MongoDB",
      "Express.js",
      "Node.js",
      "Subscription Fees and Tiers",
      "AWS S3",
      "Render",
      "RSuite",
    ],
    url: "No public link is provided because the site includes NSFW content.",
    repo: "Private",
    images: [],
  },
  Freelance_3: {
    id: "hvac",
    title: "Emergency Air Services",
    url: "The site is offline because hosting is no longer active.",
    repo: "The repository is no longer public.",
    description:
      "A business website where customers could review services, browse job-site photos, and quickly find contact details, email links, and social media channels for Emergency Air Service.",
    jobTitle: "MERN Stack Developer",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Mobile-First Design"],
    images: [],
  },
  Hackathon: {
    id: "hackathon",
    title: "Daimler Trucking Hackathon: Tech Assist / Reinforce",
    description:
      "This winning hackathon project was built for Daimler to support technicians maintaining fleet vehicles. The app guided mechanics through repair procedures with hands-free voice interaction, searched model-specific service information, and converted XML repair documentation into usable steps. It also captured timing and feedback data so process improvements could be based on real shop-floor activity.",
    tech: [
      "React.js",
      "React Native",
      "AWS Lambda",
      "AWS Lex",
      "Custom Microservices",
      "react-native-tts",
      "react-native-voice",
      "XML Parsing",
      "Reverse Engineering",
      "Team Project",
    ],
    jobTitle: "Lead Application Developer",
    url: "The original cloud-based client app is no longer online.",
    timespan: "July 19-21, 2019",
    repo: "https://github.com/Foscat/TechAssist_Public",
    images: [
      {
        id: "h1",
        title: "Building with the team during the hackathon",
        alt: "Photo of me and the Reinforce team working together in our hackathon project room.",
        src: "../images/hackathon/focus.jpg",
        caption: "",
      },
      {
        id: "h2",
        title: "Demonstrating voice parsing for the search flow",
        alt: "Photo of me showing the team how the voice-to-text flow identified search variables.",
        src: "../images/hackathon/chat-botting.jpg",
        caption: "",
      },
      {
        id: "h3",
        title: "Tech Assist prototype logo",
        alt: "Application logo for the Tech Assist app, featuring a microphone in the foreground and sound waves in the background.",
        src: "../images/hackathon/tech-assist-logo.jpg",
        caption: "",
      },
    ],
  },
  SidePro_1: {
    id: "layout-style-css",
    title: "Layout Style CSS",
    description:
      "Layout Style CSS is the layout layer in my UI bundle. It packages reusable wrappers, sections, stacks, grids, sidebars, spacing utilities, and switchable layout personalities while leaving theme paint to ui-style-kit-css and interaction states to interactive-surface-css.",
    jobTitle: "CSS Library Author",
    timespan: "2026",
    tech: ["CSS", "Design Systems", "Responsive Layout", "npm", "GitHub Pages"],
    url: "https://foscat.github.io/Layout-Style-CSS/",
    repo: "https://github.com/Foscat/layout-style-css",
    images: [
      {
        id: "layout-style-1",
        title: "Layout Style CSS documentation and demo preview",
        alt: "Layout Style CSS documentation and responsive layout demo preview",
        src: "../images/sideProjects/layout-style-social-card.jpg",
        caption: "",
      },
    ],
  },
  SidePro_2: {
    id: "greenhouse",
    title: "Greenhouse Climate Controller",
    description:
      "The Greenhouse Climate Controller solved a practical problem for a friend who needed more consistent greenhouse conditions. Built in Python for a Raspberry Pi Zero, the system monitored the environment and controlled connected devices so temperature and humidity could stay within target ranges without constant manual adjustment.",
    jobTitle: "Software Developer",
    timespan: "1 day",
    tech: ["Python", "Raspberry Pi Sense HAT", "IoT", "Custom Hardware"],
    url: "Offline software built for Raspberry Pi Zero",
    repo: "https://github.com/Foscat/greenhouse",
    images: [
      {
        id: "g1",
        title: "Greenhouse control board",
        alt: "Greenhouse climate control board",
        src: "../images/sideProjects/greenhouse-controls.jpg",
        caption:
          'Temperature and humidity sensors send data to a central Raspberry Pi controller. Relay-controlled outlets manage heaters, fans, humidifiers, dehumidifiers, vents, and lighting. Three profiles, "Veg," "Flower," and "Final Flower," adjust target ranges for different growth stages. My father helped with soldering and wiring, making this a practical collaborative automation project.',
      },
      {
        id: "g2",
        title: "Greenhouse control board hooked up and operating",
        alt: "Greenhouse control board connected and running",
        src: "../images/sideProjects/greenhouse-hooked-up.jpg",
        caption: "",
      },
    ],
  },
  SidePro_3: {
    id: "d20",
    title: "D20 King",
    description:
      'This app addresses common planning challenges for Dungeon Masters in tabletop role-playing games, especially Dungeons & Dragons. Built from my "MERN App Template with BCrypt," the project grew into a tool for campaign planning, note organization, and story development. While many tools are designed for players, "D20 King" focuses on Dungeon Masters and authors building custom adventures.',
    jobTitle: "Software Engineer",
    timespan: "1 year",
    url: "",
    repo: "The repository is private to protect the underlying intellectual property.",
    images: [
      {
        id: "d1",
        title: "D20 King landing page",
        alt: "Screenshot of the D20 tabletop campaign creator website",
        src: "../images/sideProjects/d20-dashboard.png",
        caption:
          '"D20 King" uses modular architecture inspired by the collaborative structure of GitHub repositories. Each "Storybook" acts as a storytelling container made up of "Acts" and "Rooms" that can hold characters, locations, opponents, and treasures. The system helps Dungeon Masters build organized worlds for long-form campaigns.',
      },
    ],
  },
  SMU_1: {
    id: "gifFreak",
    title: "Gif Freak",
    description: `"Gif Freak" is a dynamic website I built during my time at SMU. Deployed on GitHub Pages, it shows early practice with HTML, JavaScript, jQuery, and AJAX by using the Giphy API to fetch and display GIFs from user input. The app includes predefined buttons, lets users add their own, and renders up to 10 matching GIFs for each search term. The code is simple by my current standards, but this project was one of the first that made software development feel genuinely creative.`,
    jobTitle: "Student Developer",
    timespan: "3 days",
    tech: ["HTML", "CSS", "jQuery", "AJAX", "Third-Party APIs"],
    url: "https://foscat.github.io/gif-buttons/",
    repo: "https://github.com/Foscat/gif-buttons",
    images: [
      {
        id: "gif1",
        title: "Original Gif Freak website",
        alt: "Screenshot of the original Gif Freak page",
        src: "../images/smu/gif-freak.png",
        caption: "",
      },
    ],
  },
  SMU_2: {
    id: "StockMemer",
    title: "Stock Memer",
    description:
      '"Stock Memer" was my first group project at SMU and an early lesson in collaborative product development. The app let users view real-time stock data for Nasdaq companies, review key company details, and create memes tied to individual stocks. Memes and stock associations were stored in Firebase. Although the meme generator integration no longer works because the API key expired, the project still reflects teamwork and early experience connecting APIs, data storage, and interactive UI behavior.',
    url: "The deployed version is no longer active.",
    repo: "https://github.com/Foscat/Stock-Memer",
    jobTitle: "JavaScript Developer",
    tech: [
      "HTML",
      "JavaScript",
      "Third-Party APIs",
      "Bootstrap CSS",
      "Materialize",
      "AJAX",
      "Firebase",
      "Team Project",
    ],
    images: [
      {
        id: "s1",
        title: "Deployed version of the website",
        alt: "Screenshot of the Stock Memer website",
        src: "../images/smu/stock-memer.png",
        caption:
          'In this project, I focused primarily on API and database integration, while my teammates handled interface design and graph generation. "Stock Memer" captures an important early stage of my growth as a developer because it combined technical implementation with real team coordination.',
      },
    ],
  },
  SMU_3: {
    id: "scion",
    title: "Scion Matches",
    description:
      '"Scion Matches" was my final project at SMU and one of the first times I built software around a nuanced human process rather than a simple utility. The platform aimed to improve matching between Intended Parents and Gestational Carriers by collecting detailed survey responses and using a custom scoring algorithm to identify strong compatibility. I built the matching logic that compared responses, generated scores, and supported more confident connection requests.',
    url: "The deployed version is no longer active.",
    repo: "https://github.com/justinkunz/scion/tree/master",
    jobTitle: "JavaScript Developer",
    timespan: "2 weeks",
    tech: ["React.js", "Express.js", "MongoDB", "Node.js", "Team Project"],
    images: [],
  },
};
