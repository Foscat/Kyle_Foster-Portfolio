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
      "Senior React / Frontend Engineer with 7+ years building clear, scalable interfaces for learning platforms, admin tools, and data-rich product workflows.",
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
    timespan: "August 2018 - Present",
    jobTitle: "Senior MERN Stack Engineer",
  },
  Codestream: {
    url: PageRoute.PROFESSIONAL,
    title: "CodeStream Studios",
    seoTitle: "CodeStream Studios Case Study | Kyle Foster Portfolio",
    description:
      "Explore the work I did for CodeStream Studios LLC, where I built a browser-based education platform for students, instructors, and school administrators.",
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
      "Learn how our team won the Daimler Trucking Hackathon by building a voice-driven repair assistant that helped technicians follow repair steps hands-free.",
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
  SandersonTechnologyEnterprises: {
    url: PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
    title: "Sanderson Technology Enterprises",
    seoTitle: "Sanderson Technology Enterprises Case Study | Kyle Foster Portfolio",
    description:
      "Case study of professional work for Sanderson Technology Enterprises: the public company website, private/proprietary MERN platform foundations, and a three-package UI bundle built to speed up responsive delivery without exposing internal product details.",
    keywords: [
      "Sanderson Technology Enterprises",
      "STE case study",
      "custom web platforms",
      "professional STE work",
      "MERN template",
      "CSS UI libraries",
      "layout-style-css",
      "ui-style-kit-css",
      "interactive-surface-css",
      "Kyle Foster portfolio",
    ],
    timespan: "2025 - Present",
    jobTitle: "Senior Developer",
    liveUrl: "https://sandersontechnologyenterprises.com/",
    repo: "Private/proprietary platform work",
    tech: [
      { label: "React-compatible Architecture", type: "front" },
      { label: "MERN-App-Template+Auth", type: "back" },
      { label: "layout-style-css", type: "front" },
      { label: "ui-style-kit-css", type: "front" },
      { label: "interactive-surface-css", type: "front" },
      { label: "Responsive UI Systems", type: "tool" },
      { label: "Static Site Delivery", type: "tool" },
    ],
  },
  SideProjects: {
    url: PageRoute.SIDE_PROJECTS,
    title: "Side Projects",
    seoTitle: "Side Projects in React, IoT, CSS Systems, and Tooling | Kyle Foster",
    description:
      "Browse side projects spanning IoT automation, CSS utility libraries, reusable UI systems, and custom tooling. Each build shows practical problem framing and hands-on execution.",
    timespan: "August 2018 - Present",
    jobTitle: "Senior MERN Stack Engineer",
    keywords: [
      "side projects",
      "IoT projects",
      "CSS utility libraries",
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
      "Explore the early projects from my SMU Coding Bootcamp, where I built the foundation for my development career through practical, hands-on work.",
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
