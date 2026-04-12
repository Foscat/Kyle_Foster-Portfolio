/**
 * @file src\assets\data\content\resumeData.js
 * @description src\assets\data\content\resumeData module.
 * @module src\assets\data\content\resumeData
 */

const resumeData = {
  name: "Kyle Foster",
  title: "Senior React / Frontend Engineer",
  location: "Wills Point, TX",
  email: "fosterkyle6456@gmail.com",
  phone: "(469) 410-5286",
  website: "kyle-foster.com",
  summary:
    "React-focused frontend engineer building scalable interfaces, translating complex workflows into clear user experiences, and delivering polished UI systems that remain maintainable as products grow.",

  experience: [
    {
      role: "Frontend Developer",
      company: "CodeStream Studios LLC",
      location: "Remote",
      dates: "2019 – 2025",
      summary:
        "Built and maintained the company’s React-based learning platform as the primary frontend engineer.",
      bullets: [
        "Designed and implemented a browser-native coding platform with lesson rendering, a three-panel editor, classroom workflows, and grading/reporting tools.",
        "Built scalable, reusable UI patterns for content rendering, navigation, responsive layout, and documentation-focused presentation.",
        "Worked directly with instructional and platform constraints, using feedback from teachers and students to improve workflow clarity and usability.",
      ],
    },
  ],

  projects: [
    {
      name: "Daimler Truck Hackathon Winner",
      subtitle: "Voice-powered technician assistant",
      dates: "2019",
      summary:
        "Created a hands-free repair workflow prototype for technicians using voice interaction and structured step-by-step repair guidance.",
      bullets: [
        "Co-built the voice and NLP flow for step retrieval and playback.",
        "Extended the concept into a mobile-ready architecture after the event.",
      ],
    },
    {
      name: "Portfolio System",
      subtitle: "kyle-foster.com",
      summary:
        "Built a structured portfolio architecture focused on case-study presentation, reusable block rendering, responsive navigation, and polished visual hierarchy.",
      bullets: [
        "Created reusable page, section, and content block systems for long-form project storytelling.",
        "Aligned component behavior and motion with a restrained Midnight Gold design language.",
      ],
    },
  ],

  skills: [
    {
      label: "Frontend",
      items: ["React", "JavaScript", "HTML", "CSS", "RSuite", "Vite"],
    },
    {
      label: "Backend / Services",
      items: ["Node.js", "Express", "MongoDB", "Mongoose", "AWS S3"],
    },
    {
      label: "Workflow",
      items: ["UI architecture", "component systems", "testing", "documentation"],
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
        "Completed immersive training in software development with Java and broader engineering fundamentals.",
      ],
    },
  ],
};

export default resumeData;
