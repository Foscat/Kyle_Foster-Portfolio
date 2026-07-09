/**
 * @file src\assets\data\content\resumeData.js
 * @description Structured resume content used by the resume preview/export feature.
 * @module src\assets\data\content\resumeData
 */

const resumeData = {
  name: "Kyle Foster",
  title: "Senior Developer",
  location: "Wills Point, TX",
  email: "fosterkyle6456@gmail.com",
  phone: "(469) 410-5286",
  website: "kyle-foster.com",
  github: "github.com/Foscat",
  linkedin: "linkedin.com/in/kylefoster-dev",
  footer: "Kyle Foster | Senior Developer | kyle-foster.com",
  summary:
    "Senior Developer with 7+ years of experience building React applications, browser-based tools, role-based product systems, and custom web platforms. Strong in frontend architecture, reusable UI systems, responsive design, accessible interfaces, and maintainable product delivery across education platforms, custom business systems, admin dashboards, and service-based web products.",

  experience: [
    {
      id: "sanderson-technology-enterprises",
      role: "Senior Developer",
      company: "Sanderson Technology Enterprises",
      location: "Remote",
      dates: "2025 - Present",
      summary:
        "Develop custom web platforms, marketing sites, admin tools, and digital business systems for STE business needs and public-facing product work.",
      bullets: [
        "Built Sanderson Technology Enterprises' web presence as a clean, SEO-focused business site with service positioning, brand assets, responsive layouts, theme support, and static hosting support.",
        "Plan and implement platform concepts, including branded websites, private content systems, member-only areas, CMS workflows, admin dashboards, and storefront infrastructure.",
        "Create reusable frontend patterns using HTML, CSS, JavaScript, React-compatible architecture, layout-style-css, ui-style-kit-css, and interactive-surface-css.",
        "Lead technical scoping, information architecture, implementation planning, documentation, testing, and long-term maintenance strategy.",
        "Translate business needs into clear technical requirements that balance brand control, scalability, performance, accessibility, and maintainability.",
      ],
    },
    {
      id: "codestream-studios",
      role: "Senior Frontend Engineer",
      company: "CodeStream Studios LLC",
      location: "Remote",
      dates: "2019 - 2025",
      summary:
        "Served as the sole frontend engineer for CodeStream Online Studio, a React-based learning platform used by students, teachers, and administrators.",
      bullets: [
        "Architected a browser-native coding platform with lesson rendering, project editing, three-panel IDE workflows, live preview, and in-browser code execution.",
        "Built classroom, organization, licensing, and grading systems that supported admin, teacher, and student workflows through role-based UI design.",
        "Developed reusable component patterns for content rendering, responsive navigation, documentation interfaces, and maintainable feature delivery.",
        "Integrated cloud-backed project persistence so users could save, review, clone, grade, and continue work across sessions and devices.",
        "Applied direct classroom feedback to improve workflow clarity, reduce friction, and refine feature design.",
      ],
    },
  ],

  projects: [
    {
      id: "css-library-systems",
      name: "CSS Library Systems",
      subtitle: "Layout Style CSS / UI Style Kit CSS / Interactive Surface CSS",
      bullets: [
        "Published reusable CSS systems for responsive layout primitives, accessible interactions, theme palettes, design tokens, and polished interface patterns across static sites and application UIs.",
      ],
    },
    {
      id: "portfolio-system",
      name: "Portfolio System",
      subtitle: "kyle-foster.com",
      bullets: [
        "Built a CMS-style React portfolio architecture with reusable page and section rendering, responsive navigation, rich text rendering, technical diagrams, and case study presentation.",
      ],
    },
    {
      id: "daimler-truck-hackathon",
      name: "Daimler Truck Hackathon Winner",
      subtitle: "Voice-powered technician assistant",
      bullets: [
        "Helped build a hands-free repair workflow prototype using voice interaction, structured guidance, and backend-driven step retrieval. The project was selected as the winner among 20+ teams.",
      ],
    },
  ],

  skills: [
    {
      id: "frontend",
      label: "Frontend",
      items: ["React", "JavaScript (ES6+)", "HTML5", "CSS3", "responsive UI", "RSuite", "Vite"],
    },
    {
      id: "ui-architecture",
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
      id: "platform-systems",
      label: "Platform Systems",
      items: [
        "Role-based systems",
        "content rendering",
        "browser-based IDE workflows",
        "admin dashboards",
        "CMS workflows",
      ],
    },
    {
      id: "backend-services",
      label: "Backend / Services",
      items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Mongoose", "AWS S3", "AWS Lambda"],
    },
    {
      id: "workflow",
      label: "Workflow",
      items: [
        "Git",
        "GitHub",
        "debugging",
        "testing",
        "technical documentation",
        "product planning",
      ],
    },
  ],

  education: [
    {
      id: "smu-coding-bootcamp",
      program: "SMU Coding Bootcamp",
      school: "Southern Methodist University",
      location: "Dallas, TX",
      dates: "August 2018 - February 2019",
    },
    {
      id: "tech-talent-south",
      program: "Full-Time Coding Bootcamp",
      school: "Tech Talent South",
      location: "Dallas, TX",
      dates: "2019",
    },
  ],
};

export default resumeData;
