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
    description:
      "Senior React / Frontend Engineer building role-aware interfaces, browser-based learning tools, and data-heavy product workflows with a focus on clarity and usability.",
    timespan: "2018 - Current",
    jobTitle: "Senior React / Frontend Engineer",
  },
  Codestream: {
    url: PageRoute.PROFESSIONAL,
    title: "CodeStream Online Studios",
    description:
      "Explore my professional work at CodeStream Online Studios, where I built browser-based education tooling for students, instructors, and school administrators.",
    jobTitle: "Senior React / Frontend Engineer",
    timespan: "January 2020 - March 2025",
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
    description:
      "Learn how our team of junior developers won the Daimler Trucking Hackathon by building a voice-driven repair assistant for real technician workflows.",
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
    jobTitle: "Senior React / Frontend Engineer",
    timespan: "July 19-21, 2019",
  },
  SideProjects: {
    url: PageRoute.SIDE_PROJECTS,
    title: "Side Projects",
    description:
      "Browse side projects spanning encryption, IoT automation, and custom tooling-practical builds that show hands-on problem framing and execution.",
    timespan: "2018 - Current",
    jobTitle: "Senior React / Frontend Engineer",
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
    description:
      "Explore my journey through the SMU Coding Bootcamp, where I built the foundation for my development career through hands-on projects and rapid technical growth.",
    timespan: "August 2018 - February 2019",
    jobTitle: "Senior React / Frontend Engineer",
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
    title: "Contact Kyle Foster | Senior React / Frontend Engineer",
    description:
      "Get in touch with Kyle Foster, Senior React / Frontend Engineer, for roles, consulting, or technical collaboration.",
  },
  Docs: {
    url: PageRoute.DOCS,
    title: "Technical Docs | Kyle Foster Portfolio",
    description:
      "Browse architecture, components, scripts, and testing documentation for this portfolio project.",
  },
};

Object.freeze(pageSummaryMetas);

export default pageSummaryMetas;
