import {
  faArrowDownUpLock,
  faBinoculars,
  faBook,
  faBoxArchive,
  faBugSlash,
  faChalkboardTeacher,
  faChartDiagram,
  faCircleExclamation,
  faClone,
  faCode,
  faCommentDots,
  faCopy,
  faDatabase,
  faDesktop,
  faDoorOpen,
  faEye,
  faFileCircleCheck,
  faFileLines,
  faFilePdf,
  faFileShield,
  faGear,
  faHourglassEnd,
  faHouseLaptop,
  faIdCard,
  faLayerGroup,
  faLightbulb,
  faMagnifyingGlass,
  faNetworkWired,
  faPenFancy,
  faPeopleGroup,
  faPersonChalkboard,
  faPersonCirclePlus,
  faRoute,
  faSchool,
  faSchoolCircleCheck,
  faSchoolFlag,
  faScissors,
  faServer,
  faStar,
  faTable,
  faTableColumns,
  faTableList,
  faTowerObservation,
  faTriangleExclamation,
  faTrowelBricks,
  faTruckFast,
  faUserGraduate,
  faUserGroup,
  faUserLock,
  faUserShield,
  faUserTie,
  faUserXmark,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";
import { BlockType } from "../../types/ui.types";
import imgObj from "../images/codestream/index.js";
import { diagrams } from "./diagrams.js";

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

const codestreamSections = [
  // ============================================================
  // OVERVIEW
  // ============================================================
  {
    id: "overview",
    icon: faTowerObservation,
    title: "Overview",
    subtitle:
      "The app that went from a quick fix to get the company out of a bind. That grew to be the most important asset the company has.",

    isScroller: true,
    blocks: [
      /** Intro narrative */
      {
        id: "what-I-did",
        title: "My Role at CodeStream Studios LLC",
        icon: faHouseLaptop,
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "During my tenure at CodeStream Studios LLC, I served as the sole front-end developer responsible for taking our React.js application from concept to production. I owned the front-end architecture, translated rough ideas into concrete features, and shipped a platform that became the backbone of our classroom operations.",
          "Working with a lean team meant I routinely stepped outside a typical developer lane: I handled implementation, bug fixing, UI polish, documentation, and coordination with instructors using the platform in real classrooms. That blend of hands-on coding and tight feedback loops allowed me to build features that were practical, resilient, and directly informed by real-world usage.",
        ],
      },
      {
        id: "teaching-platform",
        title: "Building a Teaching Platform",
        icon: faSchoolFlag,
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "In addition to building the platform, I also taught on it. I used the system to run live classes, onboard students, and grade real assignments. That dual perspective—as both developer and instructor—let me quickly identify friction points and improve the experience without waiting on lengthy feedback cycles.",
          "What started as a single-school tool evolved into a multi-organization teaching platform with virtual classrooms, curriculum management, licensing, grading, and admin controls—all layered on top of the core 3-panel code editor.",
        ],
      },
      {
        id: "live-platform-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "CodeStream Online Studio Screenshots",
        images: [imgObj.csos_home, imgObj.csos_profile],
      },
      {
        id: "platform-link",
        type: BlockType.LINKS,
        title: "Live Platform",
        links: [
          {
            title: "Visit CodeStream Online Studio",
            url: "https://codestreamonlinestudio.com",
            icon: faDesktop,
            ariaLabel: "Visit CodeStream Online Studio website",
          },
        ],
      },
    ],
  },

  // ============================================================
  // KEY FEATURES
  // ============================================================
  {
    id: "key-features",
    icon: faStar,
    title: "Key Features",
    isScroller: true,
    blocks: [
      {
        title: "Platform Overview",
        icon: faTowerObservation,
        id: "kf-overview",
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "CodeStream Online Studio was designed as a full teaching environment—not just a code editor. The platform brought together browser-based coding, role-aware organizations, virtual classrooms, grading and reporting, admin monitoring tools, and a modular curriculum builder.",
          "What started as a way to run a single class during COVID grew into an ecosystem where schools, after-school programs, and training organizations could manage courses, licenses, and student outcomes across multiple classrooms and organizations.",
        ],
      },
      {
        id: "kf-platform",
        type: BlockType.IMAGE_GALLERY,
        title: "CodeStream Online Studio Platform",
        images: [imgObj.csos_home, imgObj.csos_profile, imgObj.classrooms],
      },
      {
        id: "kf-pillars",
        type: BlockType.BULLETED_LIST,
        title: "Core Pillars",
        icon: faTrowelBricks,
        items: [
          {
            id: "kp-p-editor-system",
            title: "3-Panel Editor System",
            icon: faTableColumns,
            text: "A browser-based coding workspace that feels like a lightweight IDE, designed for students and teachers without installing software.",
          },
          {
            id: "kp-p-orgs-licensing",
            title: "Organizations & Licensing",
            icon: faPeopleGroup,
            text: "Tenant-aware roles and licensing rules that scale from a single classroom to multiple schools.",
          },
          {
            id: "kp-p-virtual-classrooms",
            title: "Virtual Classrooms",
            icon: faChalkboardTeacher,
            text: "A centralized space where teachers deliver lessons and students access projects, resources, and grades.",
          },
          {
            id: "kp-p-grades-reports",
            title: "Grades & Reports",
            icon: faUserGraduate,
            text: "Integrated grading tools and exportable progress reports",
          },
          {
            id: "kp-p-admin-monitoring",
            title: "Admin Monitoring & Super Admin",
            icon: faMagnifyingGlass,
            text: "Admin oversight tools that let coordinators and platform staff manage classrooms without touching the database.",
          },
          {
            id: "kp-p-curriculum-builder",
            title: "Curriculum Builder",
            icon: faLayerGroup,
            text: "A modular system for creating and reusing courses, units, lessons, and resources across organizations.",
          },
        ],
      },
    ],
  },

  // ============================================================
  // 3-PANEL EDITOR SYSTEM
  // ============================================================
  {
    id: "panel-editor",
    icon: faCode,
    title: "3 Panel Editor System",
    subtitle:
      "A browser-based coding workspace that feels like a lightweight IDE, designed for students and teachers instead of engineers.",
    isScroller: true,
    blocks: [
      {
        id: "pe-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        icon: faCircleExclamation,
        paragraphs: [
          "Students needed a single, intuitive workspace where they could read instructions, write code, and see results—without installing tools or configuring complex environments. Instructors needed every learner to be on the same setup, whether they were writing HTML/CSS/JavaScript or Python.",
          "Existing options were either too fragmented (separate tools for instructions, coding, and output), too technical for middle- and high-school students, or too difficult to manage at scale across dozens of classrooms. We needed a way to support Web and Python projects in a consistent, classroom-friendly experience.",
        ],
      },
      diagrams.panelEditor, // 3 Panel Editor Architecture
      {
        id: "pe-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        icon: faLightbulb,
        paragraphs: [
          "I designed and built a three-panel interface that acts like a small IDE inside the browser. The left panel renders Markdown-based lesson instructions via ReactMarkdown. The center panel uses AceEditor to provide a real coding experience with language-aware editing for HTML, CSS, JavaScript, and Python. The right panel shows the live result—either a sandboxed iframe for Web projects or an in-browser terminal for Python.",
          "For Web lessons, the editor combines separate HTML/CSS/JS files into a single sandboxed bundle that runs safely inside an iframe. For Python, I integrated Skulpt via CDN to compile and execute code in the browser, streaming output into a dedicated console view.",
          "I wired custom keyboard shortcuts into AceEditor to support behaviors like save-on-Ctrl+S. Project files are persisted to AWS S3 instead of local storage, allowing students and teachers to open and review work from any device. Teachers see exactly what students see, which became critical for grading and real-time assistance.",
        ],
      },
      {
        id: "pe-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Editor Views",
        images: [imgObj.editor_web, imgObj.editor_python],
      },
    ],
  },

  // ============================================================
  // ORGANIZATIONS & LICENSING
  // ============================================================
  {
    id: "organizations",
    icon: faPeopleGroup,
    title: "Organizations & Licensing",
    subtitle:
      "Tenant-aware roles and licensing rules that scale from a single classroom to multiple schools.",
    isScroller: true,
    blocks: [
      {
        id: "org-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        icon: faTriangleExclamation,
        paragraphs: [
          "Individual accounts were easy to manage—but real customers weren't individuals; they were organizations: schools, after-school programs, and training partners. Each organization needed to manage teachers, student rosters, active classrooms, and course access, all under a single license.",
          "We had to enforce limits on how many students and teachers could be active, gate access to premium curriculum, and gracefully handle expired licenses. At the same time, students needed to keep access to their personal projects, even when a school's license expired. The challenge was building a flexible permission system that felt simple to users but could express all of these rules reliably.",
        ],
      },
      diagrams.organizationLicenseModel, // Organization & License Model
      {
        id: "org-solution",
        icon: faLightbulb,
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I implemented an Organization & Licensing subsystem that became the backbone of the platform's access control. Every user existed as an independent account but could be attached to one or more organizations with a specific role: Admin, Teacher, or Student.",
          "Organizations were bound to a license object that defined teacher and student counts, active classroom limits, and expiration dates. Each classroom and enrollment was validated against that license. If a license expired, classrooms became inaccessible for new lesson activity—but students still retained access to previously created projects in their personal workspace.",
          "Under the hood, organization-scoped queries, role checks, and a centralized license gatekeeper were used across classroom and curriculum routes, ensuring consistent behavior without duplicating permission logic throughout the codebase.",
        ],
      },
      {
        id: "org-outcomes",
        type: BlockType.BULLETED_LIST,
        title: "Outcomes",
        icon: faRoute,
        items: [
          {
            id: "org-o-scalable-multi-tenancy",
            title: "Scalable Multi-Tenancy",
            text: "Multi-tenant SaaS-style structure without leaking data between organizations",
            isScroller: false,
            icon: faUserLock,
          },
          {
            id: "org-o-role-based-access",
            title: "Role-Based Access",
            text: "Clear roles for Admin, Teacher, and Student tied to each organization",
            isScroller: false,
            icon: faUserTie,
          },
          {
            id: "org-o-license-enforcement",
            title: "License Enforcement",
            text: "License-aware classroom behavior that still preserves student work",
            isScroller: false,
            icon: faUserShield,
          },
          {
            id: "org-o-flexible-org-model",
            title: "Flexible Organization Model",
            text: "Predictable access rules that scaled as new organizations were onboarded",
            isScroller: false,
            icon: faPersonCirclePlus,
          },
        ],
      },
    ],
  },

  // ============================================================
  // VIRTUAL CLASSROOMS
  // ============================================================
  {
    id: "virtual-classrooms",
    icon: faPersonChalkboard,
    title: "Virtual Classrooms",
    subtitle:
      "A centralized space where teachers deliver lessons and students access projects, resources, and grades.",
    isScroller: true,
    blocks: [
      {
        id: "vc-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "Once organizations and licensing were in place, we still needed a structured way for teachers to actually teach. Teachers needed a home base for each course where they could present curriculum, share resources, and track student progress. Students needed a simple, predictable place to join class, access lessons, and open project work.",
          "We also needed a unified entry point where any user—teacher or student—could see every classroom they belonged to without exposing the underlying organization and licensing complexity.",
        ],
      },
      diagrams.classroomFlow, // Classroom Flow
      {
        id: "vc-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I introduced Classrooms as a first-class feature in the main navigation. The Classrooms page shows each user a personalized list of every classroom they belong to—highlighting which ones they own as a teacher versus where they are enrolled as a student. Teacher-owned classrooms surface additional metadata like student counts and management options.",
          "Clicking into a classroom opens a Classroom Dashboard: a hub that displays course information, instructor details, attached resources, and the full lesson list. Students can open any lesson as a project; if a project doesn't exist yet, the system clones a lesson template, saves it to the student's projects, and initializes a grade entry for later evaluation.",
        ],
      },
      {
        id: "vc-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Classroom Experience",
        images: [imgObj.classrooms, imgObj.classroom_dashboard],
      },
      {
        id: "vc-benefits",
        type: BlockType.BULLETED_LIST,
        title: "Benefits",
        items: [
          {
            id: "vc-b-unified-classroom-access",
            title: "Unified Classroom Access",
            text: "Single, role-aware entry point for all classes a user belongs to",
            isScroller: false,
            icon: faDoorOpen,
          },
          {
            id: "vc-b-centralized-lesson-hub",
            title: "Centralized Course Hub",
            text: "Automatic cloning of lesson templates into student projects",
            isScroller: false,
            icon: faCopy,
          },
          {
            id: "vc-b-resource-management",
            title: "Streamlined Project Management",
            text: "Tight integration with grading and reporting features",
            isScroller: false,
            icon: faNetworkWired,
          },
          {
            id: "vc-b-enhanced-learning-experience",
            title: "Enhanced Learning Experience",
            text: "Classroom dashboard that keeps lessons, resources, and projects in sync",
            isScroller: false,
            icon: faTableColumns,
          },
        ],
      },
    ],
  },

  // ============================================================
  // GRADES & REPORTS
  // ============================================================
  {
    id: "grades-and-reports",
    icon: faUserGraduate,
    title: "Grades & Reports",
    subtitle:
      "Integrated grading workflows and exportable reports that align with how real classrooms operate.",
    isScroller: true,
    blocks: [
      {
        id: "gr-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "As the primary instructor for several cohorts, I kept running into the same pattern: when a student's project wasn't working, the only option was to stop class and have them share their screen. It was slow, awkward, and made it difficult to give deep feedback without sacrificing everyone else's time.",
          "On top of that, leadership needed a way to monitor how classes were performing as a whole. There was no built-in system for assigning grades, leaving written feedback, or viewing classroom-level progress across lessons. Everything lived in spreadsheets and memory.",
        ],
      },
      {
        id: "gr-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I built a grading system that connects directly to classroom membership, user roles, and project storage. From a secure grading view, teachers and organization admins can open a student's project, run their code, and leave structured feedback without interrupting the rest of the class.",
          "To support different school expectations, I implemented a flexible grading model that supports both Pass/Fail and Numeric/Letter grading modes. A UI toggle switches modes, while the database stores everything in a single integer-based model (e.g., -2 = ungraded, -1 = fail, 101 = pass, 0–100 = numeric/letter). Students see their assignment grades and class average directly on the Classroom page.",
        ],
      },
      {
        id: "gr-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Roster & Grading Views",
        images: [imgObj.grader_web, imgObj.classroom_roster, imgObj.classroom_reports],
      },
      {
        id: "gr-features",
        type: BlockType.BULLETED_LIST,
        title: "Feature Breakdown",
        items: [
          {
            id: "gr-f-secure-grading",
            title: "Secure Grading Interface",
            text: "Secure project viewer limited to teachers and organization admins",
            icon: faFileShield,
          },
          {
            id: "gr-f-inline-feedback",
            title: "Integrated Grading Workflow",
            text: "Grading UI integrated directly into the project view",
            icon: faSchoolCircleCheck,
          },
          {
            id: "gr-f-flexible-grading-models",
            title: "Flexible Grading Models",
            text: "Support for Pass/Fail and Numeric/Letter grading styles",
            icon: faFileCircleCheck,
          },
          {
            id: "gr-f-real-time-feedback",
            title: "Real-Time Feedback",
            text: "Integer-based grade model for simple aggregation and reporting",
            icon: faSchool,
          },
          {
            id: "gr-f-student-visibility",
            title: "Student Visibility",
            text: "Real-time class average and per-assignment feedback visibility for students",
            icon: faCommentDots,
          },
        ],
      },
      {
        id: "gr-reports",
        icon: faChartDiagram,
        title: "Reporting Layer",
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "To give educators and coordinators a higher-level view, I also built a reporting layer using RSuite's Table component. Teachers can export results as a simple .txt summary for archival purposes or as a fully styled, color-coded PDF that's ready for presentations or parent meetings.",
        ],
      },
      {
        id: "gr-capabilities",
        type: BlockType.BULLETED_LIST,
        title: "Reporting Capabilities",
        items: [
          {
            id: "gr-c-classroom-reports",
            title: "Classroom-Level Reports",
            text: "Aggregate performance data across all students and lessons in a classroom",
            icon: faTable,
          },
          {
            id: "gr-c-automated-averages",
            title: "Automated Averages",
            text: "Automatic calculation of averages, completion rates, and grade distributions",
            icon: faTableList,
          },
          {
            id: "gr-c-export-reports",
            title: "Export Reports (PDF & Text)",
            text: "Ready-to-use text summaries for archives and color-coded PDFs for presentations",
            icon: faFileLines,
          },
          {
            id: "gr-c-presentation-ready-pdfs",
            title: "Presentation-Ready PDFs",
            text: "Color-coded PDF classroom reports for polished, presentation-ready summaries",
            icon: faFilePdf,
          },
        ],
      },
    ],
  },

  // ============================================================
  // ADMIN MONITORING & SUPER ADMIN
  // ============================================================
  {
    id: "admin-monitoring",
    icon: faBinoculars,
    title: "Admin Monitoring & Super Admin",
    subtitle:
      "Role-based oversight tools that let coordinators and platform staff manage classrooms without touching the database.",
    isScroller: true,
    blocks: [
      {
        id: "am-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "As the platform grew, it wasn't just teachers and students who needed visibility. School partners had coordinators responsible for configuring classrooms, enrolling students, and supporting teachers. They needed more control than a teacher—but not full platform-wide access.",
          "Internally, our team also needed a way to manage every organization from a central place: adjusting licenses, helping with onboarding, and debugging edge cases. Without an admin UI, the only option was to manipulate data directly in the database, which was both risky and slow.",
        ],
      },
      {
        id: "am-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I implemented a role-based access control (RBAC) system with a clear hierarchy: Student → Teacher → Organization Admin → Super Admin. On top of that, I built dedicated admin UIs so that each level had the tools they needed without exposing internals they shouldn't see.",
        ],
      },
      {
        id: "am-role",
        type: BlockType.BULLETED_LIST,
        title: "Organization Admin",
        items: [
          {
            id: "am-r-capabilities",
            title: "Organization Admin Capabilities",
            text: "Organization Admins gained full visibility into everything within their tenant, including all classrooms owned by any teacher in that organization. They could:",
            icon: faEye,
          },
          {
            id: "am-r-view-rosters",
            title: "View Classrooms & Rosters",
            text: "View any teacher's classroom and its roster",
            icon: faPersonChalkboard,
          },
          {
            id: "am-r-manage-classrooms",
            title: "Manage Classrooms",
            text: "Modify classroom settings, meeting links, and attached resources",
            icon: faGear,
          },
          {
            id: "am-r-edit-students",
            title: "Add & Remove Students & Teachers",
            text: "Add or remove students and teachers from the organization",
            icon: faUserXmark,
          },
          {
            id: "am-r-override-grades",
            title: "Override & Update Student Grades",
            text: "Override or update student grades when needed",
            icon: faWandMagicSparkles,
          },
          {
            id: "am-r-retrieve-reports",
            title: "Retrieve Reports",
            text: "Retrieve reports for both active and archived classrooms",
            icon: faBoxArchive,
          },
          {
            id: "am-r-troubleshoot-projects",
            title: "Troubleshoot Student Projects",
            text: "Inspect student projects directly when troubleshooting issues",
            icon: faMagnifyingGlass,
          },
          {
            id: "am-r-logistical-support",
            title: "Logistical Support",
            text: "Allowed classroom coordinators to handle logistics and quality control while teachers focused on instruction.",
            icon: faTruckFast,
          },
        ],
      },
      {
        id: "am-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Admin UI Screenshots",
        images: [imgObj.org_roster],
      },
      {
        id: "am-super",
        type: BlockType.RICH_TEXT,
        title: "Super Admin",
        paragraphs: [
          "To support platform operations, I built a Super Admin dashboard available only to a small group of trusted users. From this view, we could see every organization, inspect its classrooms, and manage licensing without leaving the UI.",
        ],
      },
      {
        id: "am-super",
        type: BlockType.BULLETED_LIST,
        title: "Super Admin Capabilities",
        items: [
          {
            id: "am-s-platform-oversight",
            title: "Platform-Wide Oversight",
            text: "Viewing and editing any organization's license and limits",
            isScroller: false,
            icon: faIdCard,
          },
          {
            id: "am-s-organization-management",
            title: "Organization Management",
            text: "Creating and updating organizations, admins, and teachers",
            isScroller: false,
            icon: faPenFancy,
          },
          {
            id: "am-s-classroom-inspection",
            title: "Classroom Inspection",
            text: "Jumping into any classroom for debugging or support",
            isScroller: false,
            icon: faBugSlash,
          },
          {
            id: "am-s-license-adjustments",
            title: "License Adjustments",
            text: "Managing edge-case data issues without raw database access",
            isScroller: false,
            icon: faDatabase,
          },
          {
            id: "am-s-auditability-security",
            title: "Auditability & Security",
            text: "Eliminated the need for backend-only tools and ensured all critical actions flowed through audited, API-driven pathways.",
            isScroller: false,
            icon: faScissors,
          },
        ],
      },
      {
        id: "am-architecture",
        type: BlockType.BULLETED_LIST,
        title: "Architecture Highlights",
        items: [
          {
            id: "am-a-rbac",
            title: "Role-Based Access Control",
            text: "RBAC model with clearly defined role boundaries",
            isScroller: false,
            icon: faArrowDownUpLock,
          },
          {
            id: "am-a-tenant-isolation",
            title: "Tenant Isolation",
            text: "Multi-tenant isolation: admins manage only their own organization",
            isScroller: false,
            icon: faUserGroup,
          },
          {
            id: "am-a-super-admin-ui",
            title: "Super Admin Interface",
            text: "Super Admins manage any tenant through a dedicated UI, not by editing the database",
            isScroller: false,
            icon: faBlackTie,
          },
          {
            id: "am-a-api-driven-modifications",
            title: "API-Driven Modifications",
            text: "All modifications go through the same API layer used by the app, keeping behavior consistent and auditable",
            isScroller: false,
            icon: faServer,
          },
        ],
      },
    ],
  },

  // ============================================================
  // CURRICULUM BUILDER
  // ============================================================
  {
    id: "curriculum-builder",
    icon: faBook,
    title: "Curriculum Builder",
    subtitle:
      "A modular system for creating and reusing courses, units, lessons, and resources across organizations.",
    isScroller: true,
    blocks: [
      {
        id: "cb-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        paragraphs: [
          "As more organizations came onto the platform, we needed a better way to build and manage curriculum. Teachers and content teams wanted to assemble courses from reusable units and lessons rather than recreating the same content for each classroom or school.",
          "We also needed a clear separation between curriculum design and classroom delivery: a course might be taught across multiple organizations, and organizations might customize or extend their own copies over time.",
        ],
      },
      diagrams.curriculumModel, // Curriculum Data Model
      {
        id: "cb-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        paragraphs: [
          "I built a Curriculum Builder that allows users to compose courses from modular pieces: courses contain units, units contain lessons, and lessons can have attached resources. Once a lesson is part of a course, organizations can attach additional resources or tweak metadata without breaking the underlying lesson template.",
          "A dedicated curriculum dashboard lets authorized users browse all courses, units, and lessons within their active organization. Adding a lesson to a course uses a searchable, tabular picker (powered by RSuite) that reinforces the idea that lessons are reusable assets rather than one-off copies.",
        ],
      },
      {
        id: "cb-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Curriculum Screens",
        images: [
          imgObj.org_library,
          imgObj.org_myContent,
          imgObj.course_builder,
          imgObj.lesson_attacher,
        ],
      },
      {
        id: "cb-benefits",
        type: BlockType.BULLETED_LIST,
        title: "Benefits",
        items: [
          {
            id: "cb-b-reusable-curriculum",
            title: "Reusable Curriculum",
            text: "Modular curriculum that can be reused across courses and organizations",
            isScroller: false,
            icon: faChartDiagram,
          },
          {
            id: "cb-b-separation-of-concerns",
            title: "Separation of Concerns",
            text: "Clear separation between content creation and classroom delivery",
            isScroller: false,
            icon: faNetworkWired,
          },
          {
            id: "cb-b-centralized-management",
            title: "Centralized Management",
            text: "Structured dashboard for curriculum teams and admins",
            isScroller: false,
            icon: faTableColumns,
          },
          {
            id: "cb-b-efficiency-gains",
            title: "Efficiency Gains",
            text: "Reduces duplication and makes updates easier to roll out",
            isScroller: false,
            icon: faClone,
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
    icon: faHourglassEnd,
    title: "Conclusion",
    isScroller: true,
    blocks: [
      {
        id: "cl-text",
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "My time at CodeStream Studios LLC was defined by building real products for real classrooms. As the sole front-end developer—and often the person connecting engineering, instruction, and operations—I had to design systems that worked not just in theory, but in the hands of teachers and students who depended on them every week.",
          "Although the company ultimately closed due to financial and organizational challenges, the experience gave me deep, practical exposure to product design, system architecture, and long-term platform stewardship. I'm bringing those lessons forward into my next role: designing tools that are robust, understandable, and genuinely useful to the people who rely on them.",
        ],
      },
    ],
  },
];

export default codestreamSections;
