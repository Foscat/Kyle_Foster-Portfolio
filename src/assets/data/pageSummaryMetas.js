/**
 * @file pageSummaryMetas.js
 * @description Lightweight page metadata used for SEO and page chrome.
 * This file intentionally excludes heavy section payloads so it can be
 * imported globally without pulling all route content into the initial bundle.
 * @module assets/data/pageSummaryMetas
 */

import { PageRoute } from "types/navigation.types";
import { SEO_ROUTE_REGISTRY } from "./seoRouteRegistry.js";

/**
 * Reuse canonical SEO copy without coupling page chrome to build tooling.
 *
 * @param {string} path - Registered application route.
 * @returns {{seoTitle: string, description: string}} Shared SEO summary.
 */
const seoSummary = (path) => ({
  seoTitle: SEO_ROUTE_REGISTRY[path].title,
  description: SEO_ROUTE_REGISTRY[path].description,
});

const pageSummaryMetas = {
  Home: {
    url: PageRoute.HOME,
    title: "Kyle Foster",
    ...seoSummary(PageRoute.HOME),
    timespan: "August 2018 - Present",
    jobTitle: "Senior React / Frontend Engineer",
  },
  Codestream: {
    url: PageRoute.PROFESSIONAL,
    title: "CodeStream Studios",
    ...seoSummary(PageRoute.PROFESSIONAL),
    jobTitle: "Senior Frontend Engineer",
    timespan: "2019 - 2025",
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
    ...seoSummary(PageRoute.HACKATHON),
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
    ...seoSummary(PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES),
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
    ...seoSummary(PageRoute.SIDE_PROJECTS),
    timespan: "August 2018 - Present",
    jobTitle: "Software Engineer",
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
    ...seoSummary(PageRoute.EDUCATION),
    timespan: "August 2018 - February 2019",
    jobTitle: "MERN Stack Student",
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
    title: "Contact Kyle Foster",
    ...seoSummary(PageRoute.CONTACT),
  },
  Docs: {
    url: PageRoute.DOCS,
    title: "Technical Docs | Portfolio",
    ...seoSummary(PageRoute.DOCS),
  },
};

Object.freeze(pageSummaryMetas);

export default pageSummaryMetas;
