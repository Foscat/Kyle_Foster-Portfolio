/**
 * @file pageMetas.js
 * @description Central metadata registry for page-level titles, descriptions, route keys,
 * and section collections.
 * @module assets/data/pageMetas
 */

import { PageRoute } from "types/navigation.types";
import {
  codestreamSections,
  homeSections,
  hackathonSections,
  sideProjectsSections,
  smuSections,
  contactSections,
  docsSections,
} from "./content";

const pageMetas = {
  Home: {
    url: PageRoute.HOME,
    title: "Kyle Foster",
    sections: homeSections,
    timespan: "2018 - Current",
    jobTitle: "React-Focused Frontend Engineer & Software Consultant",
  },
  Codestream: {
    url: PageRoute.PROFESSIONAL,
    title: "CodeStream Online Studios",
    description:
      "Explore my professional work as a frontend engineer at CodeStream Online Studios, where I helped build a browser-based coding education platform for students, instructors, and organizations.",
    jobTitle: "Frontend Engineer",
    timespan: "January 2020 - March 2025",
    liveUrl: "https://codestreamonlinestudios.com",
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
    sections: codestreamSections,
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
    jobTitle: "Lead Application Developer",
    timespan: "July 19-21, 2019",
    sections: hackathonSections,
  },
  SideProjects: {
    url: PageRoute.SIDE_PROJECTS,
    title: "Side Projects",
    description:
      "Browse side projects spanning encryption, IoT automation, and custom tooling—practical experiments that reflect curiosity, systems thinking, and hands-on problem solving.",
    timespan: "2018 - Current",
    jobTitle: "Independent Developer",
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
    sections: sideProjectsSections,
  },
  Smu: {
    url: PageRoute.EDUCATION,
    title: "SMU Coding Bootcamp",
    description:
      "Explore my journey through the SMU Coding Bootcamp, where I built the foundation for my development career through hands-on projects and rapid technical growth.",
    timespan: "August 2018 - February 2019",
    jobTitle: "Student",
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
    sections: smuSections,
  },
  Contact: {
    url: PageRoute.CONNECT,
    title: "Contact Kyle Foster | Frontend Engineer & Collaborator",
    description:
      "Get in touch with Kyle Foster about frontend engineering roles, freelance work, or technical collaboration.",
    sections: contactSections,
  },
  Docs: {
    url: PageRoute.DOCS,
    title: "Technical Docs | Kyle Foster Portfolio",
    description:
      "Browse architecture, components, scripts, and testing documentation for this portfolio project.",
    sections: docsSections,
  },
};

export default pageMetas;
