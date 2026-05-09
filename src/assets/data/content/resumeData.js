/**
 * @file src\assets\data\content\resumeData.js
 * @description Structured resume content used by the resume preview/export feature.
 * @module src\assets\data\content\resumeData
 */

const resumeData = {
  name: "Kyle Foster",
  title: "Senior Frontend Engineer",
  location: "Wills Point, TX",
  email: "fosterkyle6456@gmail.com",
  phone: "(469) 410-5286",
  website: "kyle-foster.com",
  summary:
    "Senior Frontend Engineer with 6+ years of experience building React applications, browser-based tooling, and role-based product systems. Strong in translating complex workflows into clear, dependable interfaces through reusable UI architecture, responsive design, and practical product thinking.",

  experience: [
    {
      role: "Senior Frontend Engineer",
      company: "CodeStream Studios LLC",
      location: "Remote",
      dates: "2019 - 2025",
      summary:
        "Served as the primary frontend engineer for CodeStream Online Studio, a React-based learning platform used by students, teachers, and administrators.",
      bullets: [
        "Architected and delivered a browser-native coding platform with lesson rendering, project editing, three-panel IDE workflows, live preview, and in-browser execution for web and Python projects.",
        "Built classroom, organization, licensing, and grading systems that supported distinct admin, teacher, and student experiences through role-based UI and workflow design.",
        "Developed reusable component patterns for content rendering, responsive navigation, documentation-style presentation, and maintainable feature delivery across the platform.",
        "Integrated cloud-backed project persistence and workflow tooling so users could save, review, clone, grade, and continue work across sessions and devices.",
        "Worked directly as both engineer and instructor, using real classroom feedback to improve workflow clarity, usability, and feature design.",
      ],
    },
  ],

  projects: [
    {
      name: "Daimler Truck Hackathon Winner",
      subtitle: "Voice-powered technician assistant",
      dates: "2019",
      summary:
        "Built a hands-free repair workflow prototype for technicians using voice interaction, structured repair guidance, and backend-driven step retrieval.",
      bullets: [
        "Helped design the voice and NLP-driven workflow for retrieving and presenting repair steps in a hands-free environment.",
        "Extended the concept into a mobile-ready architecture after the event, contributing to a solution that won against 20+ teams.",
      ],
    },
    {
      name: "Portfolio System",
      subtitle: "kyle-foster.com",
      summary:
        "Built a CMS-style portfolio architecture focused on case-study storytelling, reusable rendering systems, responsive navigation, and polished presentation of technical work.",
      bullets: [
        "Created reusable page, section, and block rendering systems to support long-form project documentation without hardcoding layouts.",
        "Built responsive section navigation, custom rich-text rendering, and diagram support to make dense technical content easier to explore and understand.",
      ],
    },
    {
      name: "Enigma",
      subtitle: "Multi-alphabet browser encryption tool",
      summary:
        "Built a JavaScript encryption application centered on usability, custom algorithm rules, and polished browser-based interaction.",
      bullets: [
        "Implemented a custom Caesar-style cipher with rotating alphabets, tagging logic, and support for broader character handling.",
        "Designed a clean browser UI focused on clarity, repeat use, and approachable interaction for non-technical users.",
      ],
    },
  ],

  skills: [
    {
      label: "Frontend",
      items: ["React", "JavaScript (ES6+)", "HTML5", "CSS3", "Responsive UI", "RSuite", "Vite"],
    },
    {
      label: "UI Architecture",
      items: [
        "Component architecture",
        "design systems",
        "Context API",
        "state modeling",
        "accessibility",
        "navigation systems",
      ],
    },
    {
      label: "Platform / Product Systems",
      items: [
        "Role-based systems",
        "content rendering",
        "browser-based IDE workflows",
        "grading/reporting tools",
        "documentation UX",
      ],
    },
    {
      label: "Backend / Services",
      items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Mongoose", "AWS S3", "AWS Lambda"],
    },
    {
      label: "Workflow",
      items: [
        "Git",
        "GitHub",
        "Agile collaboration",
        "debugging",
        "testing",
        "technical documentation",
      ],
    },
  ],

  education: [
    {
      program: "SMU Coding Bootcamp",
      school: "Southern Methodist University",
      location: "Dallas, TX",
      dates: "2019",
      notes: [
        "Focused on full-stack web development with React, JavaScript, Node.js, and modern frontend fundamentals.",
      ],
    },
    {
      program: "Full-Time Coding Bootcamp",
      school: "Tech Talent South",
      location: "Dallas, TX",
      dates: "2019",
      notes: [
        "Completed immersive software development training with Java and broader engineering fundamentals.",
      ],
    },
  ],
};

export default resumeData;
