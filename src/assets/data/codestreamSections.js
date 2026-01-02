import { BlockType, Theme } from "../../types/ui.types";

/**
 * CodeStream Case Study Data
 * ------------------------------------------------------------
 * This file powers the CodeStream portfolio page using a
 * data-driven approach. It is designed to work with:
 *
 * - Sticky Section Nav
 * - AccordionList
 * - InfoSection / ClickableImg / diagramDiagram components
 *
 * All UI layout should be derived from this data structure.
 */

export default [
  // ============================================================
  // OVERVIEW
  // ============================================================
  {
    id: "overview",
    slug: "overview",
    icon: "tower-observation",
    title: "Overview",
    subtitle:
      "The app that went from a quick fix to get us out of a bind. That grew to be the most important asset the company has.",
    jobTitle: "Frontend Engineer",
    timespan: "January 2020 - March 2025",
    url: "https://codestreamonlinestudios.com",
    repo: "Private",
    tech: [
      "React.js",
      "AWS (S3,RDS,ELB,Lambda)",
      "Google oAuth",
      "rSuite v4",
      "Asana API",
      "Skulpt.js",
      "Ace Editor",
      "Postgresql",
      "Jest",
      "Swagger API",
    ],
    isScroller: true,
    blocks: [
      /** Intro narrative */
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "During my tenure at CodeStream Studios LLC, I served as the sole front-end developer responsible for taking our React.js application from concept to production. I owned the front-end architecture, translated rough ideas into concrete features, and shipped a platform that became the backbone of our classroom operations.",
          "Working with a lean team meant I routinely stepped outside a typical developer lane: I handled implementation, bug fixing, UI polish, documentation, and coordination with instructors using the platform in real classrooms. That blend of hands-on coding and tight feedback loops allowed me to build features that were practical, resilient, and directly informed by real-world usage.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "In addition to building the platform, I also taught on it. I used the system to run live classes, onboard students, and grade real assignments. That dual perspective—as both developer and instructor—let me quickly identify friction points and improve the experience without waiting on lengthy feedback cycles.",
          "What started as a single-school tool evolved into a multi-organization teaching platform with virtual classrooms, curriculum management, licensing, grading, and admin controls—all layered on top of the core 3-panel code editor.",
        ],
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "CodeStream Online Studio – Instructor Views",
        images: [
          {
            src: "../../assets/images/codestream/Screenshot (1313).png",
            alt: "Portfolio page showing a list of a student's projects and navigation options.",
            title: "Student Portfolio View",
            caption:
              "The portfolio page gives students a central place to access active and completed projects, reinforcing a sense of progress while making it easy for teachers to revisit past work.",
          },
          {
            src: "../../assets/images/codestream/Screenshot (1314).png",
            alt: "Classrooms page displaying active and expired classrooms associated with the user.",
            title: "Classrooms Overview",
            caption:
              "The classrooms dashboard shows all classes a user belongs to—both as a student and as a teacher—making it the main entry point into lessons, projects, and grading workflows.",
          },
        ],
      },
      {
        type: BlockType.LINKS,
        title: "Live Platform",
        links: [
          {
            title: "Visit CodeStream Online Studio",
            url: "https://codestreamonlinestudio.com",
            icon: "desktop",
          },
        ],
      },
    ],
  },

  // ============================================================
  // KEY FEATURES
  // ============================================================
  {
    id: "features",
    slug: "key-features",
    icon: "star",
    title: "Key Features",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "CodeStream Online Studio was designed as a full teaching environment—not just a code editor. The platform brought together browser-based coding, role-aware organizations, virtual classrooms, grading and reporting, admin monitoring tools, and a modular curriculum builder.",
          "What started as a way to run a single class during COVID grew into an ecosystem where schools, after-school programs, and training organizations could manage courses, licenses, and student outcomes across multiple classrooms and organizations.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Core Pillars",
        items: [
          {
            text: "Three-panel browser-based editor for Web and Python projects",
            isScroller: false,
          },
          {
            text: "Organization & licensing system for schools and partners",
            isScroller: false,
          },
          {
            text: "Virtual classrooms with project cloning and lesson tracking",
            isScroller: false,
          },
          {
            text: "Integrated grading tools and exportable progress reports",
            isScroller: false,
          },
          {
            text: "Admin and Super Admin tools for platform-wide oversight",
            isScroller: false,
          },
          {
            text: "Modular curriculum builder for re-usable lessons and courses",
            isScroller: false,
          },
        ],
      },
    ],
  },

  // ============================================================
  // 3-PANEL EDITOR SYSTEM
  // ============================================================
  {
    id: "editor",
    slug: "three-panel-editor",
    icon: "code",
    title: "3 Panel Editor System",
    subtitle:
      "A browser-based coding workspace that feels like a lightweight IDE, designed for students and teachers instead of engineers.",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        icon: "circle-exclamation",
        paragraphs: [
          "Students needed a single, intuitive workspace where they could read instructions, write code, and see results—without installing tools or configuring complex environments. Instructors needed every learner to be on the same setup, whether they were writing HTML/CSS/JavaScript or Python.",
          "Existing options were either too fragmented (separate tools for instructions, coding, and output), too technical for middle- and high-school students, or too difficult to manage at scale across dozens of classrooms. We needed a way to support Web and Python projects in a consistent, classroom-friendly experience.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        icon: "lightbulb",
        paragraphs: [
          "I designed and built a three-panel interface that acts like a small IDE inside the browser. The left panel renders Markdown-based lesson instructions via ReactMarkdown. The center panel uses AceEditor to provide a real coding experience with language-aware editing for HTML, CSS, JavaScript, and Python. The right panel shows the live result—either a sandboxed iframe for Web projects or an in-browser terminal for Python.",
          "For Web lessons, the editor combines separate HTML/CSS/JS files into a single sandboxed bundle that runs safely inside an iframe. For Python, I integrated Skulpt via CDN to compile and execute code in the browser, streaming output into a dedicated console view.",
          "I wired custom keyboard shortcuts into AceEditor to support behaviors like save-on-Ctrl+S. Project files are persisted to AWS S3 instead of local storage, allowing students and teachers to open and review work from any device. Teachers see exactly what students see, which became critical for grading and real-time assistance.",
        ],
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Editor Views",
        images: [
          {
            src: "../../assets/images/codestream/Screenshot (1330).png",
            alt: "Three-panel editor with lesson instructions, code editor, and live browser preview.",
            title: "Web Project – File Tabs",
            caption:
              "The left panel displays lesson instructions and tools, the middle panel hosts a tabbed editor for HTML/CSS/JS, and the right panel renders a live browser preview using a sandboxed iframe.",
          },
          {
            src: "../../assets/images/codestream/Screenshot (1333).png",
            alt: "Three-panel editor configured for Python with instructions, code editor, and terminal output.",
            title: "Python Project – Terminal",
            caption:
              "For Python projects, the center editor adapts to a single-file workflow and the right panel becomes an in-browser terminal powered by Skulpt, giving students immediate feedback on their code.",
          },
        ],
      },
      {
        type: BlockType.DIAGRAM,
        title: "3 Panel Editor – Architecture Flow",
        theme: Theme.DARK,
        diagram: `
graph LR
  A[Lesson Markdown<br/>ReactMarkdown] --> B[Instruction Panel]
  C[AceEditor<br/>HTML/CSS/JS/Python] --> D[Execution Layer]
  D -->|Web Project| E[Sandboxed iframe]
  D -->|Python Project| F[Skulpt Runtime]
  F --> G[Terminal Output Panel]
  C --> H[Save Shortcut<br/>Ctrl+S Handler]
  H --> I[AWS S3<br/>Project Storage]
  I --> J[Teacher & Student Access<br/>Across Devices]
        `,
        description:
          "The editor pipeline connects Markdown instructions, an Ace-based code editor, a dual execution path for Web and Python, and AWS S3 persistence so projects can be reopened anywhere.",
      },
    ],
  },

  // ============================================================
  // ORGANIZATIONS & LICENSING
  // ============================================================
  {
    id: "organizations",
    slug: "organizations-licensing",
    icon: "people-group",
    title: "Organizations & Licensing",
    subtitle:
      "Tenant-aware roles and licensing rules that scale from a single classroom to multiple schools.",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "Individual accounts were easy to manage—but real customers weren't individuals; they were organizations: schools, after-school programs, and training partners. Each organization needed to manage teachers, student rosters, active classrooms, and course access, all under a single license.",
          "We had to enforce limits on how many students and teachers could be active, gate access to premium curriculum, and gracefully handle expired licenses. At the same time, students needed to keep access to their personal projects, even when a school's license expired. The challenge was building a flexible permission system that felt simple to users but could express all of these rules reliably.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I implemented an Organization & Licensing subsystem that became the backbone of the platform's access control. Every user existed as an independent account but could be attached to one or more organizations with a specific role: Admin, Teacher, or Student.",
          "Organizations were bound to a license object that defined teacher and student counts, active classroom limits, and expiration dates. Each classroom and enrollment was validated against that license. If a license expired, classrooms became inaccessible for new lesson activity—but students still retained access to previously created projects in their personal workspace.",
          "Under the hood, organization-scoped queries, role checks, and a centralized license gatekeeper were used across classroom and curriculum routes, ensuring consistent behavior without duplicating permission logic throughout the codebase.",
        ],
      },
      {
        type: BlockType.DIAGRAM,
        title: "Organization & License Model",
        theme: Theme.DARK,
        diagram: `
graph TD
  U[User] -->|memberOf| O[Organization]
  O -->|has| L[License]
  O --> C[Classroom]
  C --> S[Student Enrollment]
  C --> T[Teacher Role]

  L -->|limits| S
  L -->|limits| T

  L -->|expired?| X[Classroom Access]
  X -->|No| C
  X -->|Yes| P[Projects Read-Only]

  U -->|owns| P2[Personal Projects]
        `,
        description:
          "Users may belong to multiple organizations with different roles. Each organization operates under a license that governs how many teachers and students can actively participate in classrooms.",
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Outcomes",
        icon: "route",
        items: [
          {
            text: "Multi-tenant SaaS-style structure without leaking data between organizations",
            isScroller: false,
            icon: "user-lock",
          },
          {
            text: "Clear roles for Admin, Teacher, and Student tied to each organization",
            isScroller: false,
            icon: "user-tie",
          },
          {
            text: "License-aware classroom behavior that still preserves student work",
            isScroller: false,
            icon: "user-shield",
          },
          {
            text: "Predictable access rules that scaled as new organizations were onboarded",
            isScroller: false,
            icon: "person-circle-plus",
          },
        ],
      },
    ],
  },

  // ============================================================
  // VIRTUAL CLASSROOMS
  // ============================================================
  {
    id: "classrooms",
    slug: "virtual-classrooms",
    icon: "person-chalkboard",
    title: "Virtual Classrooms",
    subtitle:
      "A centralized space where teachers deliver lessons and students access projects, resources, and grades.",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "Once organizations and licensing were in place, we still needed a structured way for teachers to actually teach. Teachers needed a home base for each course where they could present curriculum, share resources, and track student progress. Students needed a simple, predictable place to join class, access lessons, and open project work.",
          "We also needed a unified entry point where any user—teacher or student—could see every classroom they belonged to without exposing the underlying organization and licensing complexity.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I introduced Classrooms as a first-class feature in the main navigation. The Classrooms page shows each user a personalized list of every classroom they belong to—highlighting which ones they own as a teacher versus where they are enrolled as a student. Teacher-owned classrooms surface additional metadata like student counts and management options.",
          "Clicking into a classroom opens a Classroom Dashboard: a hub that displays course information, instructor details, attached resources, and the full lesson list. Students can open any lesson as a project; if a project doesn't exist yet, the system clones a lesson template, saves it to the student's projects, and initializes a grade entry for later evaluation.",
        ],
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Classroom Experience",
        images: [
          {
            src: "../../assets/images/codestream/Screenshot (1331).png",
            alt: "Classroom page with units, lessons, and an intro video.",
            title: "Classroom Dashboard",
            caption:
              "The classroom page aggregates lesson materials, assignments, and supplementary resources. An introductory video helps set context and raise engagement before students dive into the work.",
          },
        ],
      },
      {
        type: BlockType.DIAGRAM,
        title: "Classroom Flow",
        theme: Theme.DARK,
        diagram: `
graph LR
  U[User] --> CP[Classrooms Page]
  CP -->|Teacher| CT[Teacher Classroom List]
  CP -->|Student| CS[Student Classroom List]

  CT --> CD[Classroom Dashboard]
  CS --> CD

  CD --> L[Lesson List]
  L -->|Open Lesson| P[Project Resolver]
  P -->|Existing| PX[Open Existing Project]
  P -->|New| PC[Clone Lesson Template]
  PC --> PS[Student Project + Grade Entry]
        `,
        description:
          "The classroom layer hides organization and licensing complexity, giving each user a clear list of classes and a predictable flow from course overview into project work.",
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Benefits",
        items: [
          {
            text: "Single, role-aware entry point for all classes a user belongs to",
            isScroller: false,
            icon: "door-open",
          },
          {
            text: "Automatic cloning of lesson templates into student projects",
            isScroller: false,
            icon: "copy",
          },
          {
            text: "Tight integration with grading and reporting features",
            isScroller: false,
            icon: "network-wired",
          },
          {
            text: "Classroom dashboard that keeps lessons, resources, and projects in sync",
            isScroller: false,
            icon: "table-columns",
          },
        ],
      },
    ],
  },

  // ============================================================
  // GRADES & REPORTS
  // ============================================================
  {
    id: "grading",
    slug: "grades-and-reports",
    icon: "user-graduate",
    title: "Grades & Reports",
    subtitle:
      "Integrated grading workflows and exportable reports that align with how real classrooms operate.",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "As the primary instructor for several cohorts, I kept running into the same pattern: when a student's project wasn't working, the only option was to stop class and have them share their screen. It was slow, awkward, and made it difficult to give deep feedback without sacrificing everyone else's time.",
          "On top of that, leadership needed a way to monitor how classes were performing as a whole. There was no built-in system for assigning grades, leaving written feedback, or viewing classroom-level progress across lessons. Everything lived in spreadsheets and memory.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I built a grading system that connects directly to classroom membership, user roles, and project storage. From a secure grading view, teachers and organization admins can open a student's project, run their code, and leave structured feedback without interrupting the rest of the class.",
          "To support different school expectations, I implemented a flexible grading model that supports both Pass/Fail and Numeric/Letter grading modes. A UI toggle switches modes, while the database stores everything in a single integer-based model (e.g., -2 = ungraded, -1 = fail, 101 = pass, 0–100 = numeric/letter). Students see their assignment grades and class average directly on the Classroom page.",
        ],
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Roster & Grading Views",
        images: [
          {
            src: "../../assets/images/codestream/Screenshot (1332).png",
            alt: "Classroom roster showing students and action buttons to view their projects.",
            title: "Classroom Roster",
            caption:
              "The roster view lets instructors see all enrolled students at a glance, with quick access into each student's projects and grading details.",
          },
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Feature Breakdown",
        items: [
          {
            text: "Secure project viewer limited to teachers and organization admins",
            isScroller: false,
            icon: "file-shield",
          },
          {
            text: "Grading UI integrated directly into the project view",
            isScroller: false,
            icon: "school-circle-check",
          },
          {
            text: "Support for Pass/Fail and Numeric/Letter grading styles",
            isScroller: false,
            icon: "file-circle-question",
          },
          {
            text: "Integer-based grade model for simple aggregation and reporting",
            isScroller: false,
            icon: "school",
          },
          {
            text: "Real-time class average and per-assignment feedback visibility for students",
            isScroller: false,
            icon: "comment-dots",
          },
        ],
      },
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "To give educators and coordinators a higher-level view, I also built a reporting layer using RSuite's Table component. Teachers can export results as a simple .txt summary for archival purposes or as a fully styled, color-coded PDF that's ready for presentations or parent meetings.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Reporting Capabilities",
        items: [
          {
            text: "Classroom-level tables of students, assignments, and grades",
            isScroller: false,
            icon: "table",
          },
          {
            text: "Automatic computation of per-student and per-class averages",
            isScroller: false,
            icon: "table-list",
          },
          {
            text: "Exportable text reports for lightweight record-keeping",
            isScroller: false,
            icon: "file-lines",
          },
          {
            text: "Color-coded PDF reports for polished, presentation-ready summaries",
            isScroller: false,
            icon: "file-pdf",
          },
        ],
      },
    ],
  },

  // ============================================================
  // ADMIN MONITORING & SUPER ADMIN
  // ============================================================
  {
    id: "monitoring",
    slug: "admin-monitoring",
    icon: "binoculars",
    title: "Admin Monitoring & Super Admin",
    subtitle:
      "Role-based oversight tools that let coordinators and platform staff manage classrooms without touching the database.",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "As the platform grew, it wasn't just teachers and students who needed visibility. School partners had coordinators responsible for configuring classrooms, enrolling students, and supporting teachers. They needed more control than a teacher—but not full platform-wide access.",
          "Internally, our team also needed a way to manage every organization from a central place: adjusting licenses, helping with onboarding, and debugging edge cases. Without an admin UI, the only option was to manipulate data directly in the database, which was both risky and slow.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I implemented a role-based access control (RBAC) system with a clear hierarchy: Student → Teacher → Organization Admin → Super Admin. On top of that, I built dedicated admin UIs so that each level had the tools they needed without exposing internals they shouldn't see.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Organization Admin",
        paragraphs: [
          {
            text: "Organization Admins gained full visibility into everything within their tenant, including all classrooms owned by any teacher in that organization. They could:",
            isScroller: false,
            icon: "eye",
          },
          {
            text: "View any teacher's classroom and its roster",
            isScroller: false,
            icon: "",
          },
          {
            text: "Modify classroom settings, meeting links, and attached resources",
            isScroller: false,
            icon: "gear",
          },
          {
            text: "Add or remove students and teachers from the organization",
            isScroller: false,
            icon: "user-xmark",
          },
          {
            text: "Override or update student grades when needed",
            isScroller: false,
            icon: "wand-magic-sparkles",
          },
          {
            text: "Retrieve reports for both active and archived classrooms",
            isScroller: false,
            icon: "box-archive",
          },
          {
            text: "Inspect student projects directly when troubleshooting issues",
            isScroller: false,
            icon: "magnifying-glass",
          },
          {
            text: "Allowed classroom coordinators to handle logistics and quality control while teachers focused on instruction.",
            isScroller: false,
            icon: "truck-arrow-right",
          },
        ],
      },
      {
        type: BlockType.RICH_TEXT,
        title: "Super Admin",
        paragraphs: [
          {
            text: "To support platform operations, I built a Super Admin dashboard available only to a small group of trusted users. From this view, we could see every organization, inspect its classrooms, and manage licensing without leaving the UI.",
          },
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Super Admin Capabilities",
        items: [
          {
            text: "Viewing and editing any organization's license and limits",
            isScroller: false,
            icon: "id-card",
          },
          {
            text: "Creating and updating organizations, admins, and teachers",
            isScroller: false,
            icon: "pen-fancy",
          },
          {
            text: "Jumping into any classroom for debugging or support",
            isScroller: false,
            icon: "bug-slash",
          },
          {
            text: "Managing edge-case data issues without raw database access",
            isScroller: false,
            icon: "database",
          },
          {
            text: "Eliminated the need for backend-only tools and ensured all critical actions flowed through audited, API-driven pathways.",
            isScroller: false,
            icon: "scissors",
          },
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Architecture Highlights",
        items: [
          {
            text: "RBAC model with clearly defined role boundaries",
            isScroller: false,
            icon: "arrow-down-up-lock",
          },
          {
            text: "Multi-tenant isolation: admins manage only their own organization",
            isScroller: false,
            icon: "",
          },
          {
            text: "Super Admins manage any tenant through a dedicated UI, not by editing the database",
            isScroller: false,
            icon: "",
          },
          {
            text: "All modifications go through the same API layer used by the app, keeping behavior consistent and auditable",
            isScroller: false,
            icon: "",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CURRICULUM BUILDER
  // ============================================================
  {
    id: "curriculum",
    slug: "curriculum-builder",
    icon: "book",
    title: "Curriculum Builder",
    subtitle:
      "A modular system for creating and reusing courses, units, lessons, and resources across organizations.",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "As more organizations came onto the platform, we needed a better way to build and manage curriculum. Teachers and content teams wanted to assemble courses from reusable units and lessons rather than recreating the same content for each classroom or school.",
          "We also needed a clear separation between curriculum design and classroom delivery: a course might be taught across multiple organizations, and organizations might customize or extend their own copies over time.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I built a Curriculum Builder that allows users to compose courses from modular pieces: courses contain units, units contain lessons, and lessons can have attached resources. Once a lesson is part of a course, organizations can attach additional resources or tweak metadata without breaking the underlying lesson template.",
          "A dedicated curriculum dashboard lets authorized users browse all courses, units, and lessons within their active organization. Adding a lesson to a course uses a searchable, tabular picker (powered by RSuite) that reinforces the idea that lessons are reusable assets rather than one-off copies.",
        ],
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Curriculum Screens",
        images: [
          {
            src: "../../assets/images/codestream/Screenshot (1337).png",
            alt: "Course editor showing curriculum structure and resources.",
            title: "Course Editor",
            caption:
              "Course editors can add units, attach lessons, and manage resources, giving organizations full control over how curriculum is structured and delivered.",
          },
          {
            src: "../../assets/images/codestream/Screenshot (1338).png",
            alt: "Lesson selection popup table listing lessons in the organization.",
            title: "Lesson Selector",
            caption:
              "A modular lesson selector lets admins and teachers reuse existing lessons across multiple courses, reinforcing the idea of curriculum as a shared library.",
          },
          {
            src: "../../assets/images/codestream/Screenshot (1317).png",
            alt: "Dashboard showing curriculum and resources under the active organization.",
            title: "Curriculum Dashboard",
            caption:
              "The curriculum dashboard centralizes all course and lesson assets for the active organization, making it easy to audit what's being taught and where.",
          },
        ],
      },
      {
        type: BlockType.DIAGRAM,
        title: "Curriculum Model",
        theme: Theme.DARK,
        diagram: `
graph TD
  O[Organization] --> CD[Curriculum Dashboard]
  CD --> C[Course]
  C --> U[Unit]
  U --> L[Lesson]
  L --> R[Resources]

  L --> T[Lesson Template]
  C --> CL[Classroom Use]
        `,
        description:
          "Courses are built from reusable units and lessons, with resources attached at the appropriate level. Classrooms consume this structure to deliver consistent learning experiences.",
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Benefits",
        items: [
          {
            text: "Modular curriculum that can be reused across courses and organizations",
            isScroller: false,
            icon: "",
          },
          {
            text: "Clear separation between content creation and classroom delivery",
            isScroller: false,
            icon: "",
          },
          {
            text: "Structured dashboard for curriculum teams and admins",
            isScroller: false,
            icon: "",
          },
          {
            text: "Reduces duplication and makes updates easier to roll out",
            isScroller: false,
            icon: "",
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONCLUSION
  // ============================================================
  {
    id: "conclusion",
    slug: "conclusion",
    icon: "hourglass-end",
    title: "Conclusion",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "My time at CodeStream Studios LLC was defined by building real products for real classrooms. As the sole front-end developer—and often the person connecting engineering, instruction, and operations—I had to design systems that worked not just in theory, but in the hands of teachers and students who depended on them every week.",
          "Although the company ultimately closed due to financial and organizational challenges, the experience gave me deep, practical exposure to product design, system architecture, and long-term platform stewardship. I'm bringing those lessons forward into my next role: designing tools that are robust, understandable, and genuinely useful to the people who rely on them.",
        ],
      },
    ],
  },
];
