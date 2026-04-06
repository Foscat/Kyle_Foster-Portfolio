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
      "At CodeStream Studios LLC, I served as the sole frontend developer responsible for building and evolving the React application that powered the platform. I translated product ideas into shipped features, established the frontend architecture, and supported the product beyond implementation through bug fixing, documentation, and testing support. Working within a lean team sharpened my ability to balance speed, ownership, and long-term maintainability.",
    jobTitle: "Frontend Engineer",
    timespan: "January 2020 - March 2025",
    url: "https://codestreamonlinestudios.com",
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
      "An email microservice powered by Nodemailer that gives websites a simple way to send messages without heavy custom configuration. It accepts a straightforward payload containing sender information and message content, making it easy to integrate into contact workflows.",
    jobTitle: "Software Engineer",
    timespan: "1 hour",
    tech: ["Node.js", "Express.js", "Nodemailer", "Render"],
    url: "https://email-microservice-grem.onrender.com",
    repo: "https://github.com/Foscat/email-microservice",
  },
  Freelance_2: {
    id: "menOfHan",
    title: "Men of Han Models",
    description:
      'A modeling site for a premium male talent brand signed to "Han Modeling." Visitors can browse public photos, while registered users can purchase subscription tiers to unlock additional content and account-level access.',
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
    url: "Website contains NSFW content, so no link will be provided.",
    repo: "Private",
    images: [],
  },
  Freelance_3: {
    id: "hvac",
    title: "Emergency Air Services",
    url: "The company no longer pays for hosting, so the site has been taken offline.",
    repo: "https://github.com/Foscat/HVAC_Site",
    description:
      "A business website where customers could review services, browse job-site photos, and quickly access contact details, email links, and social media channels for Emergency Air Service.",
    jobTitle: "MERN Stack Developer",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Mobile-First Design"],
    images: [],
  },
  Hackathon: {
    id: "hackathon",
    title: "Daimler Trucking Hackathon: Tech Assist / Reinforce",
    description:
      "This winning hackathon project was built for Daimler Chrysler to support technicians maintaining fleet vehicles. The app guided mechanics through repair procedures with hands-free voice interaction, searched model-specific service information, and parsed XML-based repair documentation into usable steps and sub-steps. It also captured technician feedback when a task was completed faster than expected, creating a path for process improvement based on real-world shop-floor experience.",
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
        src: "../assets/images/hackathon/focus.jpg",
        caption: "",
      },
      {
        id: "h2",
        title: "Demonstrating voice parsing for the search workflow",
        alt: "Photo of me showing the team how the voice-to-text flow identified search variables.",
        src: "../assets/images/hackathon/chatBotting.jpg",
        caption: "",
      },
      {
        id: "h3",
        title: "Tech Assist prototype logo",
        alt: "Application logo for the Tech Assist app, featuring a microphone in the foreground and sound waves in the background.",
        src: "../assets/images/hackathon/TechAssistLogo.jpg",
        caption: "",
      },
    ],
  },
  SidePro_1: {
    id: "enigma",
    title: "Caesar's Enigma",
    description:
      'Originally conceived as a Python experiment in cipher systems, I later rebuilt the project in JavaScript with a friendlier interface and broader usability. Inspired by both the Caesar cipher and the Enigma machine, "Caesar\'s Enigma" uses five different alphabets to increase complexity. What began as a personal learning project evolved into a practical demonstration of algorithmic thinking, UI design, and secure-message tooling.',
    jobTitle: "JavaScript Developer",
    timespan: "3 days",
    tech: ["HTML", "JavaScript", "Custom Encryption Algorithm", "Bootstrap CSS", "GitHub Pages"],
    url: "https://foscat.github.io/Enigma",
    repo: "https://github.com/Foscat/Enigma",
    images: [
      {
        id: "e1",
        title: "Enigma app in desktop view",
        alt: "Screenshot of the Enigma app in desktop view",
        src: "../assets/images/side projects/enigma.png",
        caption: "",
      },
    ],
  },
  SidePro_2: {
    id: "greenhouse",
    title: "Greenhouse Climate Controller",
    description:
      "The Greenhouse Climate Controller is one of my favorite real-world projects because it solved a practical problem for a friend who struggled to maintain greenhouse conditions consistently. Built in Python for a Raspberry Pi Zero, the system automated environmental monitoring and device control so temperature and humidity could stay within target ranges without constant manual intervention.",
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
        src: "../assets/images/side projects/greenhouseControls.jpg",
        caption:
          'Strategically positioned temperature and humidity sensors, extended via CAT5 cable to a centralized location, provide precise climate monitoring. The system dynamically adjusts environmental variables using relay-controlled devices that function like a smart power strip for heaters, fans, humidifiers, dehumidifiers, vents, and lighting. With three distinct settings—"Veg," "Flower," and "Final Flower"—the controller adapts to different growth stages and helps optimize both yield and quality. Built with my father\'s help on soldering and wiring, the project reflects a practical, collaborative approach to automation.',
      },
      {
        id: "g2",
        title: "Greenhouse control board hooked up and operating",
        alt: "Greenhouse control board connected and running",
        src: "../assets/images/side projects/greenhouseHookedUp.jpg",
        caption: "",
      },
    ],
  },
  SidePro_3: {
    id: "d20",
    title: "D20 King",
    description:
      'This app addresses common challenges Dungeon Masters face in tabletop role-playing games, especially Dungeons & Dragons. Built from my "MERN App Template with BCrypt," the project grew into a passion-driven tool for campaign planning, note organization, and story development. While many tools are designed for players, "D20 King" focuses on the needs of Dungeon Masters and authors building custom adventures.',
    jobTitle: "Software Engineer",
    timespan: "1 year",
    url: "",
    repo: "The repository is private to protect the underlying intellectual property.",
    images: [
      {
        id: "d1",
        title: "D20 King landing page",
        alt: "Screenshot of the D20 tabletop campaign creator website",
        src: "../assets/images/side projects/d20_dashboard.png",
        caption:
          'What sets "D20 King" apart is its modular architecture, inspired by the collaborative structure of GitHub repositories. Each "Storybook" acts as a storytelling container made up of "Acts" and "Rooms" that can be filled with characters, locations, opponents, and treasures. The system is designed to help Dungeon Masters build rich, organized worlds that support long-form campaign creation.',
      },
    ],
  },
  SMU_1: {
    id: "gifFreak",
    title: "Gif Freak",
    description: `"Gif Freak" is a dynamic website I built during my time at SMU. Deployed on GitHub Pages, it showcases early proficiency with HTML, JavaScript, jQuery, and AJAX by using the Giphy API to fetch and display GIFs based on user input. The app ships with predefined buttons, lets users add their own, and dynamically renders up to 10 matching GIFs for each search term. Looking back, the code is simple, but this project was one of the first that made software development feel genuinely exciting and creative to me.`,
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
        src: "../assets/images/smu/gifFreak.png",
        caption: "",
      },
    ],
  },
  SMU_2: {
    id: "StockMemer",
    title: "Stock Memer",
    description:
      '"Stock Memer" was my first group project at SMU and an early lesson in collaborative product development. The app let users view real-time stock data for Nasdaq companies, review key company details, and create memes tied to individual stocks. Memes and stock associations were stored in Firebase. Although the meme generator integration is no longer functional because the API key expired, the project still reflects strong collaboration and early experience connecting APIs, data storage, and interactive UI behavior.',
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
        src: "../assets/images/smu/stock_memer.png",
        caption:
          'In this project, I focused primarily on API and database integration, while my teammates handled interface design and graph generation. "Stock Memer" captures an important early stage of my growth as a developer because it combined technical implementation with real team coordination.',
      },
    ],
  },
  SMU_3: {
    id: "scion",
    title: "Scion Matches",
    description:
      '"Scion Matches" was my final project at SMU and one of the first times I built software around a nuanced human process rather than a simple utility. The platform aimed to improve the matching process between Intended Parents and Gestational Carriers by collecting detailed survey responses and using a custom scoring algorithm to identify strong compatibility. I built the matching logic that compared responses, generated scores, and supported more confident connection requests.',
    url: "The deployed version is no longer active.",
    repo: "https://github.com/justinkunz/scion/tree/master",
    jobTitle: "JavaScript Developer",
    timespan: "2 weeks",
    tech: ["React.js", "Express.js", "MongoDB", "Node.js", "Team Project"],
    images: [],
  },
};
