/**
 * @file pageSummaryMetas.js
 * @description Lightweight page metadata used for SEO and page chrome.
 * This file intentionally excludes heavy section payloads so it can be
 * imported globally without pulling all route content into the initial bundle.
 * @module assets/data/pageSummaryMetas
 */

import { PageRoute } from "types/navigation.types";

const pageSummaryMetas = {
  Home: {
    url: PageRoute.HOME,
    title: "Kyle Foster",
    seoTitle: "Kyle Foster | Senior React Frontend Engineer Portfolio",
    description:
      "Senior React / Frontend Engineer building role-aware interfaces, browser-based learning tools, and data-heavy product flows with a focus on clarity and usability.",
    keywords: [
      "Kyle Foster",
      "Senior React engineer",
      "Frontend engineer portfolio",
      "React architecture",
      "JavaScript portfolio",
      "UI systems engineering",
      "RSuite",
      "Vite",
    ],
    timespan: "2018 - Current",
    jobTitle: "Senior MERN Stack Engineer",
  },
  Codestream: {
    url: PageRoute.PROFESSIONAL,
    title: "CodeStream Online Studios",
    seoTitle: "CodeStream Online Studios Case Study | Kyle Foster Portfolio",
    description:
      "Explore my professional work at CodeStream Online Studios, where I built browser-based education tooling for students, instructors, and school administrators.",
    jobTitle: "React Frontend Engineer / Instructor",
    timespan: "2019 - 2025",
    keywords: [
      "CodeStream case study",
      "React case study",
      "education software engineering",
      "frontend product engineering",
      "role-based UI",
      "web learning platform",
      "Kyle Foster portfolio",
    ],
    liveUrl: "https://codestreamonlinestudio.com",
    repo: "Private",
    tech: [
      { label: "React.js", type: "front" },
      { label: "AWS (S3, RDS, ELB, Lambda)", type: "back" },
      { label: "Google OAuth", type: "back" },
      { label: "RSuite", type: "tool" },
      { label: "Asana API", type: "tool" },
      { label: "Skulpt.js", type: "front" },
      { label: "Ace Editor", type: "front" },
      { label: "Postgres", type: "back" },
      { label: "Jest", type: "tool" },
      { label: "Swagger API", type: "tool" },
    ],
  },
  Hackathon: {
    url: PageRoute.HACKATHON,
    title: "Daimler Trucking Hackathon Winner | Kyle Foster",
    seoTitle: "Daimler Trucking Hackathon Winner Case Study | Kyle Foster",
    description:
      "Learn how our team of junior developers won the Daimler Trucking Hackathon by building a voice-driven repair assistant for technician repair processes.",
    keywords: [
      "Daimler hackathon winner",
      "voice assistant case study",
      "React Native project",
      "AWS Lex Lambda",
      "technician process automation",
      "Kyle Foster project",
    ],
    tech: [
      { label: "React.js", type: "front" },
      { label: "React Native", type: "front" },
      { label: "AWS Lambda", type: "back" },
      { label: "AWS Lex", type: "back" },
      { label: "Custom Microservices", type: "back" },
      { label: "react-native-tts", type: "front" },
      { label: "react-native-voice", type: "front" },
      { label: "XML Parsing", type: "back" },
      { label: "Reverse Engineering", type: "tool" },
      { label: "Team Project", type: "tool" },
    ],
    jobTitle: "MERN Stack Engineer",
    timespan: "July 19-21, 2019",
  },
  SideProjects: {
    url: PageRoute.SIDE_PROJECTS,
    title: "Side Projects",
    seoTitle: "Side Projects in React, IoT, and Encryption | Kyle Foster",
    description:
      "Browse side projects spanning encryption, IoT automation, and custom tooling. Each build shows practical problem framing and hands-on execution.",
    timespan: "2018 - Current",
    jobTitle: "Senior MERN Stack Engineer",
    keywords: [
      "side projects",
      "IoT projects",
      "encryption project",
      "custom tooling",
      "React side projects",
      "engineering portfolio",
      "Kyle Foster",
    ],
    tech: [
      { label: "HTML", type: "front" },
      { label: "JavaScript", type: "front" },
      { label: "Custom Algorithms", type: "back" },
      { label: "Bootstrap CSS", type: "front" },
      { label: "GitHub Pages", type: "tool" },
      { label: "Python", type: "back" },
      { label: "Raspberry Pi Sense HAT", type: "tool" },
      { label: "IoT", type: "tool" },
      { label: "Custom Hardware", type: "tool" },
      { label: "React.js", type: "front" },
      { label: "Express.js", type: "back" },
      { label: "MongoDB", type: "back" },
      { label: "Node.js", type: "back" },
    ],
  },
  Smu: {
    url: PageRoute.EDUCATION,
    title: "SMU Coding Bootcamp",
    seoTitle: "SMU Coding Bootcamp Journey | Kyle Foster Portfolio",
    description:
      "Explore my journey through the SMU Coding Bootcamp, where I built the foundation for my development career through hands-on projects and rapid technical growth.",
    timespan: "August 2018 - February 2019",
    jobTitle: "MERN Stack Student",
    keywords: [
      "SMU coding bootcamp",
      "web development journey",
      "frontend portfolio education",
      "MERN bootcamp",
      "Kyle Foster",
    ],
    tech: [
      { label: "HTML", type: "front" },
      { label: "CSS", type: "front" },
      { label: "Bootstrap CSS", type: "front" },
      { label: "JavaScript", type: "front" },
      { label: "jQuery", type: "front" },
      { label: "AJAX", type: "front" },
      { label: "Third-Party APIs", type: "back" },
      { label: "Materialize", type: "front" },
      { label: "Firebase", type: "back" },
      { label: "React.js", type: "front" },
      { label: "Express.js", type: "back" },
      { label: "MongoDB", type: "back" },
      { label: "Node.js", type: "back" },
    ],
  },
  Contact: {
    url: PageRoute.CONTACT,
    title: "Contact Kyle Foster | Senior MERN Stack Engineer",
    seoTitle: "Contact Kyle Foster | Senior React Frontend Engineer",
    description:
      "Contact Kyle Foster for senior frontend roles, consulting, or technical collaboration.",
    keywords: [
      "contact Kyle Foster",
      "hire React engineer",
      "frontend consultant",
      "React developer contact",
      "portfolio contact",
    ],
  },
  Docs: {
    url: PageRoute.DOCS,
    title: "Technical Docs | Portfolio",
    seoTitle: "Technical Documentation | Kyle Foster Portfolio",
    description:
      "Browse architecture, components, scripts, and testing documentation for this portfolio project.",
    keywords: [
      "portfolio documentation",
      "React architecture docs",
      "frontend engineering docs",
      "testing documentation",
      "component documentation",
      "Kyle Foster portfolio docs",
    ],
  },
};

Object.freeze(pageSummaryMetas);

export default pageSummaryMetas;
