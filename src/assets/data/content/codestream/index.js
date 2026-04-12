/**
 * @file src\assets\data\content\codestream\index.js
 * @description src\assets\data\content\codestream\index module.
 * @module src\assets\data\content\codestream\index
 */

import {
  faArrowsToCircle,
  faBinoculars,
  faBook,
  faBookAtlas,
  faBoxArchive,
  faBugSlash,
  faChalkboardTeacher,
  faChartDiagram,
  faCircleExclamation,
  faCode,
  faCommentDots,
  faDatabase,
  faDesktop,
  faEye,
  faFileCircleCheck,
  faFileLines,
  faFilePdf,
  faFileShield,
  faGear,
  faHandHoldingMedical,
  faHourglassEnd,
  faHouseLaptop,
  faIdCard,
  faIndustry,
  faLaptop,
  faLayerGroup,
  faLightbulb,
  faMagnifyingGlass,
  faObjectUngroup,
  faPenFancy,
  faPeopleGroup,
  faPersonChalkboard,
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
  faUserXmark,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { faBlackTie } from "@fortawesome/free-brands-svg-icons";
import { BlockType } from "types/ui.types.js";
import imgObj from "assets/images/codestream";
import diagrams from "./diagrams.js";

/**
 * @description CodeStream Case Study Data ------------------------------------------------------------ This file powers the CodeStream portfolio page using a data-driven approach. It is designed to work with: - Sticky Section Nav - AccordionList - InfoSection / ClickableImg / diagramDiagram components All UI layout should be derived from this data structure. /
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
      "A platform that began as an urgent internal fix and grew into the company's most critical product asset.",

    isScroller: true,
    blocks: [
      /**
       * @description Intro narrative
       */
      {
        id: "what-I-did",
        title: "My Role at CodeStream Studios LLC",
        icon: faHouseLaptop,
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "During my tenure at " },
              { type: "strong", text: "CodeStream Studios LLC" },
              {
                type: "text",
                text: ", I served as the sole frontend engineer responsible for taking a React-based platform from concept to production. I owned the frontend architecture and translated rough ideas into durable, user-facing systems.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Working within a lean team meant operating well beyond a narrow implementation role. I handled feature design, UI polish, bug fixing, documentation, and instructor feedback loops — often simultaneously.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "💻" },
              {
                type: "text",
                text: "This role required creating systems, not just components.",
              },
            ],
          },
        ],
      },
      {
        id: "teaching-platform",
        title: "Building a Teaching Platform",
        icon: faSchoolFlag,
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "In addition to developing the platform, I also " },
              { type: "strong", text: "taught on it" },
              {
                type: "text",
                text: ". I used the system to teach classes, build curriculum, manage teachers, onboard students, and grade assignments. That dual perspective shaped every major product decision I made.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "What began as a single-school solution evolved into a multi-organization teaching platform with:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Users can be a part of multiple organizations" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Organizational curriculum and member role management" },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Project grading, curriculum building, and role-based oversight tools",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "live-platform-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "CSOS Screenshots",
        items: [imgObj.csos_home, imgObj.csos_profile],
      },
      {
        id: "platform-link",
        type: BlockType.LINKS,
        title: "Live Platform",
        items: [
          {
            title: "Visit CodeStream Online Studio",
            url: "https://codestreamonlinestudio.com",
            icon: faDesktop,
            ariaLabel: "Visit CodeStream Online Studio website",
            tooltip: "Visit CodeStream Online Studio",
            local: false,
            target: "_blank",
            rel: "noopener noreferrer",
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
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "CodeStream Online Studio was designed as a " },
              { type: "strong", text: "complete teaching environment" },
              {
                type: "text",
                text: ", not just a code editor. The platform unified browser-based coding, classroom management, grading workflows, and administrative oversight into a single system.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "What began as a workaround during the COVID era matured into an ecosystem capable of supporting multiple schools, programs, and organizations with differing needs and constraints.",
              },
            ],
          },
        ],
      },
      {
        id: "kf-platform",
        type: BlockType.IMAGE_GALLERY,
        title: "CodeStream Online Studio Platform",
        items: [imgObj.csos_home, imgObj.csos_profile, imgObj.classrooms],
      },
      {
        id: "kf-pillars",
        type: BlockType.CARD_GRID,
        title: "Core Pillars",
        subtitle:
          "The platform was built around a set of core pillars required to support the full teaching lifecycle.",
        icon: faTrowelBricks,
        // Reordered to match real user flow:
        // classroom → curriculum → project → grading → admin → licensing

        items: [
          {
            id: "kp-p-virtual-classrooms",
            title: "Virtual Classrooms",
            subtitle: "The operational hub where instruction, projects, and visibility converge.",
            icon: faChalkboardTeacher,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Virtual Classrooms serve as the primary boundary of instructional activity. Each classroom aggregates roster membership, lesson assignments, project instances, and grading data under a single scoped context. This design mirrors real institutional structure while preventing cross-class data leakage.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "By treating classrooms as first-class entities rather than filters over global data, the system maintains predictable behavior as organizations scale and teachers manage multiple cohorts simultaneously.",
                  },
                ],
              },
            ],
          },
          {
            id: "kp-p-curriculum-builder",
            title: "Curriculum Builder",
            subtitle: "Reusable course architecture built from modular units and lessons.",
            icon: faLayerGroup,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Curriculum is modeled independently from classrooms to preserve reuse and separation of concerns. Courses decompose into units and lessons that act as stable templates rather than mutable classroom artifacts.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "When deployed to classrooms, lessons generate student-specific project instances without altering the underlying template. This prevents content drift while allowing instructional customization at the classroom layer.",
                  },
                ],
              },
            ],
          },
          {
            id: "kp-p-editor-system",
            title: "3-Panel Editor System",
            subtitle: "Project-level execution environment designed for instructional clarity.",
            icon: faTableColumns,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The editor represents the project boundary. Each lesson initializes a structured project instance inside a three-panel workspace: instructions, editable code, and runtime output. This eliminates environment setup friction while preserving clear separation between guidance, implementation, and execution.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The interface deliberately mirrors lightweight IDE workflows without exposing unnecessary complexity. Students operate within a stable execution context, while teachers evaluate deterministic outputs.",
                  },
                ],
              },
            ],
          },

          {
            id: "kp-p-grades-reports",
            title: "Grading & Reporting",
            subtitle: "Evaluation embedded directly into the project lifecycle.",
            icon: faUserGraduate,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Grading is structurally tied to classroom membership and project state. Teachers access student submissions through a controlled review interface that preserves original work while enabling inline feedback and score assignment.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Aggregated metrics update automatically at classroom and organizational scopes, reducing manual reporting overhead and ensuring administrative visibility without redundant data pipelines.",
                  },
                ],
              },
            ],
          },

          {
            id: "kp-p-admin-monitoring",
            title: "Admin Monitoring",
            subtitle: "Scoped oversight without direct database access.",
            icon: faMagnifyingGlass,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Administrative tools provide visibility across classrooms and tenants while preserving permission boundaries. Organization Admins operate within their tenant scope, while Super Admins maintain platform-wide oversight.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "All privileged actions flow through audited APIs rather than manual database edits. This preserves traceability, enforces consistent validation logic, and prevents hidden state mutation.",
                  },
                ],
              },
            ],
          },

          {
            id: "kp-p-orgs-licensing",
            title: "Organizations & Licensing",
            subtitle: "Multi-tenant role and capacity enforcement model.",
            icon: faPeopleGroup,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Organizations define tenancy boundaries. Users assume scoped roles—Student, Teacher, Admin—within those boundaries. Licensing rules enforce seat limits, expiration windows, and feature access at the tenant level.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "License enforcement restricts new instructional activity without deleting student work, preserving continuity while satisfying contractual constraints.",
                  },
                ],
              },
            ],
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
      "A browser-based coding workspace designed for students and teachers rather than professional developers.",
    isScroller: true,
    blocks: [
      {
        id: "pe-problem",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        icon: faCircleExclamation,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Students needed a single, intuitive workspace where they could read instructions, write code, and see results without installing or configuring local tools.",
              },
            ],
          },
          {
            type: "p",
            children: [{ type: "text", text: "Existing options were either:" }],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Too fragmented across multiple tools" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Too technical for middle and high school students" },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Too difficult to manage consistently across classrooms" },
                ],
              },
            ],
          },
        ],
      },
      diagrams.panelEditor, // 3 Panel Editor Architecture
      {
        id: "pe-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        icon: faLightbulb,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "I designed and built a " },
              { type: "strong", text: "three-panel browser-based IDE" },
              {
                type: "text",
                text: " that keeps instructions, code, and output visible at all times. This layout reduces cognitive load while reinforcing the relationship between code and results.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Markdown-based lesson instructions (ReactMarkdown)" },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Ace Editor with language-aware editing" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Sandboxed Web iframe or in-browser Python execution" },
                ],
              },
            ],
          },
          {
            type: "pre",
            language: "js",
            text: `Ctrl+S → save project\nRun → execute safely\nReview → grade identically`,
          },
        ],
      },
      {
        id: "pe-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Editor Views",
        items: [imgObj.editor_web, imgObj.editor_python],
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
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  { type: "text", text: "The paying customer was not the individual user." },
                ],
              },
              {
                type: "text",
                text: " The true customer was the organization — schools, bootcamps, and training programs operating under centralized licensing.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each organization required a unified management layer capable of governing:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Teachers and administrative roles" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Student enrollments" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Classroom composition and course assignments" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "License allocation and expiration control" }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The core tension was architectural: enforce organizational access rules without violating individual data ownership.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Students needed to retain permanent ownership of their projects, even if an organization's license expired or access privileges were revoked.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Constraint: organizational control governs access — not data deletion.",
                  },
                ],
              },
            ],
          },
        ],
      },
      diagrams.organizationLicenseModel, // Organization & License Model
      {
        id: "org-solution",
        icon: faLightbulb,
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  { type: "text", text: "An organization-aware access layer was introduced." },
                ],
              },
              {
                type: "text",
                text: " Users exist as global identities, but assume scoped roles within specific organizations.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This separation allowed identity, ownership, and governance to operate independently.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Users maintain a single persistent account across the platform.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Organization membership assigns contextual roles (teacher, student, admin).",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Access decisions are evaluated against organization scope — not global user state.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Student project ownership remains tied to the user, not the license.",
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "When a license expires, access to organizational resources is revoked — but student-created artifacts remain intact and accessible.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "inlineIcon",
                icon: "🔐",
              },
              {
                type: "text",
                text: "Governance restricts participation. It does not erase ownership.",
              },
            ],
          },
        ],
      },
      {
        id: "org-outcomes",
        type: BlockType.BULLETED_LIST,
        title: "Outcomes",
        subtitle:
          "By modeling organizations as first-class entities with scoped roles and access rules, the platform was able to scale cleanly from a single school to multiple institutions without compromising data integrity or user experience.",
        icon: faRoute,
        items: [
          {
            id: "org-o-scalable-multi-tenancy",
            title: "Scalable Multi-Tenancy",
            subtitle: "Isolated organizational contexts without duplicated infrastructure.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Implemented a multi-tenant architecture that isolates organizational data while sharing a unified application infrastructure.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Clean data boundaries between organizations" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "No duplicated deployments required for growth" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Stable onboarding as additional schools were added" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Isolation without infrastructure duplication." }],
              },
            ],
          },
          {
            id: "org-o-role-based-access",
            title: "Role-Based Access",
            subtitle: "Scoped permissions that reflect real-world organizational structure.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Established consistent role definitions across the platform to eliminate privilege ambiguity.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Teachers, students, and administrators operate within scoped permissions",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Route-level enforcement prevents privilege creep" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Clear visibility reduces onboarding friction" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Clarity in roles reduces complexity in enforcement." },
                ],
              },
            ],
          },
          {
            id: "org-o-license-enforcement",
            title: "License Enforcement",
            subtitle: "Fine-grained licensing that restricts access to specific activities.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Enforced licensing at the classroom and activity level rather than through blunt account restrictions.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Restricts new instructional activity when licenses expire",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Preserves student project ownership" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduces support friction during renewals" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Governance restricts participation — not ownership." },
                ],
              },
            ],
          },
          {
            id: "org-o-flexible-org-model",
            title: "Flexible Organization Model",
            subtitle: "Extensible organizational schema that evolves without structural refactors.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designed an extensible organizational schema capable of evolving without structural refactors.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Supports new roles and classroom types" }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Adapts to after-school programs and full academic courses",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Predictable behavior simplifies maintenance" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Flexibility without schema instability." }],
              },
            ],
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
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Once organizations and licensing were in place, I still needed a structured way for teachers to ",
              },
              { type: "strong", text: "actually teach" },
              {
                type: "text",
                text: ". Teachers needed a consistent home base for each course—somewhere to present curriculum, share resources, and track progress without duct-taping tools together.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Students needed a predictable place to join class, open lessons, and access their projects. The biggest risk was fragmentation: if the experience felt different per teacher or per lesson, it would slow down learning and increase support overhead.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "A single entry point for all classrooms a user belongs to",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Clear distinction between teacher-owned vs student-enrolled views",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "A stable workflow from lesson → project → grade" },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🏫" },
              {
                type: "text",
                text: " I wanted classrooms to feel like a hub, not just another page you click through.",
              },
            ],
          },
        ],
      },
      diagrams.classroomFlow, // Classroom Flow
      {
        id: "vc-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  { type: "text", text: "Classrooms became a first-class domain entity." },
                ],
              },
              {
                type: "text",
                text: " Instead of treating enrollment as a side feature, the system elevates classrooms into a primary navigation surface.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The Classrooms page renders a personalized index of every classroom associated with the authenticated user.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Clearly distinguishes teacher-owned classrooms from student enrollments.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Teacher-owned classrooms expose management metadata (student counts, administrative controls).",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Student enrollments surface participation-focused actions only.",
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Selecting a classroom opens the ",
              },
              {
                type: "strong",
                children: [{ type: "text", text: "Classroom Dashboard" }],
              },
              {
                type: "text",
                text: " — a centralized operational hub.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Course metadata and instructor context." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Attached resources and supporting materials." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Complete ordered lesson list." }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "When a student opens a lesson, the system enforces isolation between curriculum and execution.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "If no project exists, the lesson template is cloned." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "The cloned project is saved to the student's project space.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "A grade entry is initialized to track future evaluation.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Core design principle: curriculum remains immutable; student work exists as an isolated derivative artifact.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "vc-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Classroom Experience",
        items: [imgObj.classrooms, imgObj.classroom_dashboard],
      },
      {
        id: "vc-benefits",
        type: BlockType.BULLETED_LIST,
        title: "Benefits",
        subtitle:
          "By modeling the platform around classrooms as a central entity, we were able to create a more cohesive and intuitive experience for both teachers and students.",
        items: [
          {
            id: "vc-b-unified-classroom-access",
            title: "Unified Classroom Access",
            subtitle:
              "A single dashboard that adapts to the user's role and relationship with the classroom.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Provides a single, role-aware entry point for all classroom memberships.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Clear distinction between ownership and enrollment status",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Eliminates fragmented dashboards" }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Scales cleanly for instructors managing multiple cohorts",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Single access surface. Context-aware behavior." },
                ],
              },
            ],
          },
          {
            id: "vc-b-centralized-lesson-hub",
            title: "Centralized Course Hub",
            subtitle:
              "Lessons, projects, and resources organized around a shared instructional context.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Each classroom functions as a consolidated hub for lessons, projects, and resources.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Template-based project initialization ensures structural consistency",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Standardized submission format simplifies grading workflows",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Reduces variance in student project structure" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Consistency at the template layer simplifies downstream evaluation.",
                  },
                ],
              },
            ],
          },
          {
            id: "vc-b-resource-management",
            title: "Streamlined Project Management",
            subtitle:
              "A unified lifecycle that connects lessons, projects, and grading into a cohesive workflow.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Tightly integrates projects, resources, and grading into a cohesive lifecycle.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Single source of instructional materials" }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Persistent project state with automatic preservation",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduced accidental data loss" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Cohesion reduces operational friction." }],
              },
            ],
          },
          {
            id: "vc-b-enhanced-learning-experience",
            title: "Enhanced Learning Experience",
            subtitle:
              "A consistent progression from lesson → project → feedback that reduces cognitive load.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Establishes a consistent progression from lesson → project → feedback.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Minimizes navigation overhead" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reinforces shared instructional context" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Improves instructional pacing across cohorts" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Clear workflow reduces cognitive load." }],
              },
            ],
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
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As the primary instructor for several cohorts, I kept hitting the same bottleneck: when a student's project wasn't working, the only option was to stop class and have them share their screen. It was slow, disruptive, and made it hard to give deep feedback without sacrificing everyone else’s time.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "On top of that, leadership needed a way to understand classroom outcomes without relying on spreadsheets and memory. We didn’t have a consistent workflow for:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Assigning grades in a repeatable way" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Leaving written feedback tied to specific work" },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Viewing classroom-level progress across lessons" },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "❕" },
              {
                type: "text",
                text: " The platform needed to support real teaching workflows—not just store projects.",
              },
            ],
          },
        ],
      },
      {
        id: "gr-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "The grading system was tightly integrated with classroom membership, role scope, and project storage.",
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Authorized teachers and organization administrators access a secure grading view tied directly to classroom context.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Open a student's submitted project in isolation." },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Execute and review project code safely." }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Leave structured feedback tied to the grade record." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Operate without disrupting other classroom sessions." },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The grading model supports multiple institutional expectations without branching the data schema.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Pass / Fail mode" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Numeric grading (0–100)" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Letter grades derived from numeric ranges" }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "All grading states are normalized into a single integer-based storage model.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "-2 → ungraded" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "-1 → fail" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "101 → pass" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "0–100 → numeric / derived letter grades" }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This approach avoids schema fragmentation while keeping UI presentation flexible.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Design principle: normalize storage; adapt presentation.",
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Students see assignment grades and computed class averages directly within the Classroom view, reinforcing transparency without exposing internal evaluation tooling.",
              },
            ],
          },
        ],
      },
      {
        id: "gr-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Roster & Grading Views",
        items: [imgObj.grader_web, imgObj.classroom_roster, imgObj.classroom_reports],
      },
      {
        id: "gr-features",
        type: BlockType.BULLETED_LIST,
        title: "Feature Breakdown",
        subtitle:
          "Each feature was designed to align with real-world teaching workflows and institutional requirements.",
        items: [
          {
            id: "gr-f-secure-grading",
            title: "Secure Grading Interface",
            subtitle: "Role-scoped access to immutable project snapshots for safe evaluation.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Grading access is restricted to teachers and organization administrators through role-scoped authorization.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Immutable view of student submission state" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Safe code execution without modifying original artifacts",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Prevents privilege escalation across roles" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Integrity enforced at the authorization layer." },
                ],
              },
            ],
            icon: faFileShield,
          },
          {
            id: "gr-f-inline-feedback",
            title: "Integrated Grading Workflow",
            subtitle:
              "Evaluation tools embedded directly within the classroom context to minimize disruption.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Evaluation occurs directly alongside the student’s project to eliminate tool fragmentation.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Continuous review → feedback → grading flow" },
                    ],
                  },
                  { type: "li", children: [{ type: "text", text: "Reduced context switching" }] },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Feedback tightly coupled to submission state" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Workflow cohesion improves grading throughput." },
                ],
              },
            ],
            icon: faSchoolCircleCheck,
          },
          {
            id: "gr-f-flexible-grading-models",
            title: "Flexible Grading Models",
            subtitle: "Supports multiple grading paradigms without schema divergence.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Supports Pass/Fail and Numeric/Letter grading without schema divergence.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "UI toggle for grading mode" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Unified integer-based storage model" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Simplified reporting and aggregation logic" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Normalize storage; adapt presentation." }],
              },
            ],
            icon: faFileCircleCheck,
          },
          {
            id: "gr-f-real-time-feedback",
            title: "Real-Time Feedback",
            subtitle: "Grade updates propagate immediately across classroom views.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Grade updates propagate immediately across classroom views.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "Instant score reflection" }] },
                  { type: "li", children: [{ type: "text", text: "Live feedback visibility" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Automatic class average recalculation" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Timely feedback reinforces learning cycles." }],
              },
            ],
            icon: faSchool,
          },
          {
            id: "gr-f-student-visibility",
            title: "Student Visibility",
            subtitle:
              "Students access assignment grades and aggregate performance metrics directly from the Classroom dashboard.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Students access assignment grades and aggregate performance metrics directly from the Classroom dashboard.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Clear visibility into evaluation state" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Individual and cohort-level context" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduced ambiguity around standing" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Transparency builds trust in the evaluation system." },
                ],
              },
            ],
            icon: faCommentDots,
          },
        ],
      },
      {
        id: "gr-reports",
        icon: faChartDiagram,
        title: "Reporting Layer",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "To give educators and coordinators a higher-level view, I built a reporting layer using ",
              },
              { type: "strong", text: "RSuite tables" },
              {
                type: "text",
                text: " so classroom performance could be reviewed quickly and consistently. The focus wasn’t flashy dashboards—it was reliable visibility into completion, averages, and trends.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "Reports could be exported as a simple " },
              { type: "code", text: ".txt" },
              {
                type: "text",
                text: " summary for archival use or as a fully styled, color-coded ",
              },
              { type: "code", text: "PDF" },
              {
                type: "text",
                text: " for presentations and parent-facing meetings. That export path mattered because it made the data portable and useful outside the app.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "📈" },
              {
                type: "text",
                text: " Reporting is where classroom activity becomes measurable outcomes.",
              },
            ],
          },
        ],
      },
      {
        id: "gr-capabilities",
        type: BlockType.BULLETED_LIST,
        title: "Reporting Capabilities",
        subtitle: "Designed to surface actionable insights without overwhelming users with data.",
        items: [
          {
            id: "gr-c-classroom-reports",
            title: "Classroom-Level Aggregation",
            subtitle:
              "Packages performance and progress data across students and lessons into a unified classroom-level view.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Aggregates performance data across students and lessons into a unified classroom-level view.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Consolidated progress overview" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Trend visibility across lessons" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Quick identification of outliers" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Normalize data first; visualize second." }],
              },
            ],
            icon: faTable,
          },
          {
            id: "gr-c-automated-averages",
            title: "Automated Averages & Completion Rates",
            subtitle: "Dynamic computation of key performance metrics without external tools.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Automatically computes averages, completion rates, and grade distributions on submission.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Real-time recalculation on grade update" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Eliminates external spreadsheet dependency" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Consistent metric logic across classrooms" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Automate computation to reduce administrative drag." },
                ],
              },
            ],
            icon: faTableList,
          },
          {
            id: "gr-c-export-reports",
            title: "Export Reports (PDF & Text)",
            subtitle: "Reports generated directly from live classroom data.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Generates report outputs directly from live aggregated data.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Lightweight text exports for archival use" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Styled PDF exports for stakeholder presentation" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "No duplicate reporting logic across formats" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Single data source, multiple presentation layers." },
                ],
              },
            ],
            icon: faFileLines,
          },
          {
            id: "gr-c-presentation-ready-pdfs",
            title: "Presentation-Ready PDFs",
            subtitle:
              "PDF reports that match the visual design of the app for easy sharing and presentation.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "PDF reports are structured with visual hierarchy and color-coded indicators for rapid interpretation.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Color-coded performance indicators" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Clear sectional breakdown of performance metrics" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Ready for parent or leadership review without modification",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Data clarity reduces interpretation overhead." }],
              },
            ],
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
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As the platform grew, it wasn’t just teachers and students who needed visibility. School partners had coordinators responsible for setting up classrooms, enrolling students, and supporting teachers. They needed more control than a teacher—but not full platform-wide access.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Internally, we also needed a safe way to manage organizations at scale: licensing changes, onboarding support, and debugging edge cases. Without an admin UI, the only option was manipulating the database directly—which was both risky and slow.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Reduce dependency on direct database edits" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Provide scoped tools aligned to role boundaries" },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Keep operations auditable and consistent with app behavior",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🏁" },
              {
                type: "text",
                text: " If support requires the database, the product isn’t finished.",
              },
            ],
          },
        ],
      },
      {
        id: "am-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As the platform grew beyond single classrooms, operational visibility and governance had to scale with it. I implemented a structured role hierarchy—",
              },
              { type: "strong", text: "Teacher" },
              { type: "text", text: ", " },
              { type: "strong", text: "Organization Admin" },
              { type: "text", text: ", and " },
              { type: "strong", text: "Super Admin" },
              {
                type: "text",
                text: "—so support, licensing, reporting, and exception handling could happen through controlled interfaces instead of ad-hoc fixes.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each role maps to a clear scope boundary: Teachers operate inside their classrooms, Organization Admins oversee a single tenant, and Super Admins manage platform-wide operations without bypassing system rules. This kept authority proportional to responsibility and prevented “god mode” patterns from creeping into production.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Most importantly, admin functionality was implemented as ",
              },
              { type: "strong", text: "first-class product workflows" },
              {
                type: "text",
                text: "—not hidden database operations. That meant all privileged actions used the same request/validation pipeline as standard features, with explicit permission checks, predictable side effects, and consistent behavior across the application.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Scoped authorization:" },
                  {
                    type: "text",
                    text: " role + tenant checks applied at route and API boundaries.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Audited operations:" },
                  {
                    type: "text",
                    text: " sensitive actions logged and traceable for support and compliance.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "UI-driven governance:" },
                  {
                    type: "text",
                    text: " license adjustments, membership changes, and reporting executed through controlled flows.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🛡️" },
              {
                type: "text",
                text: "Every privileged action flowed through the same audited API paths — no database shortcuts.",
              },
            ],
          },
        ],
      },
      {
        id: "am-role",
        type: BlockType.BULLETED_LIST,
        title: "Organization Admin",
        subtitle:
          "Organization Admins have elevated permissions within their tenant to manage classrooms and memberships without affecting other organizations.",
        items: [
          {
            id: "am-r-capabilities",
            title: "Tenant-Level Oversight",
            subtitle:
              "Oversight tools scoped to the organization boundary for safe and effective management system.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Provides full visibility across classrooms, teachers, and students within a single organization tenant.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Scoped to organization boundary" }],
                  },
                  { type: "li", children: [{ type: "text", text: "No platform-wide access" }] },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Bridges instructional and operational layers" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Broad visibility. Scoped authority." }],
              },
            ],
            icon: faEye,
          },
          {
            id: "am-r-view-rosters",
            title: "Classroom & Roster Visibility",
            subtitle: "Admins can view and modify classroom information",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Read-only access to classroom structure and enrollment data.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "Full roster inspection" }] },
                  { type: "li", children: [{ type: "text", text: "Enrollment auditing" }] },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "No modification of teacher-owned content by default" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Clarity without disruption." }],
              },
            ],
            icon: faPersonChalkboard,
          },
          {
            id: "am-r-manage-classrooms",
            title: "Classroom Configuration Management",
            subtitle:
              "Admins can update metadata settings without modifying instructional content or student work.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Allows controlled updates to classroom-level metadata and logistical settings.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Meeting links and metadata updates" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Centralized resource adjustments" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Uses shared system APIs for consistency" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Operational changes without structural drift." }],
              },
            ],
            icon: faGear,
          },
          {
            id: "am-r-edit-students",
            title: "Classroom Membership Management",
            subtitle: "Admins can add or remove students and teachers from classrooms.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Manages student and teacher membership at the organization level.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "Add or remove users" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Supports onboarding and transitions" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Auditable role-restricted operations" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Centralized membership prevents classroom misalignment." },
                ],
              },
            ],
            icon: faUserXmark,
          },
          {
            id: "am-r-override-grades",
            title: "Override & Update Student Grades",
            subtitle: "Admins can override student grades in exceptional circumstances.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Supports rare administrative grade overrides for dispute resolution or clerical correction.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "Explicit override workflows" }] },
                  { type: "li", children: [{ type: "text", text: "Role-restricted capability" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Preserves instructor authority by default" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Exception handling without weakening governance." },
                ],
              },
            ],
            icon: faWandMagicSparkles,
          },
          {
            id: "am-r-retrieve-reports",
            title: "Retrieve Reports",
            subtitle: "Admins can retrieve and view classroom reports.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Provides controlled access to active and archived classroom reports.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "Long-term record retention" }] },
                  { type: "li", children: [{ type: "text", text: "Audit support" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Post-term review capabilities" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Continuity beyond the classroom lifecycle." }],
              },
            ],
            icon: faBoxArchive,
          },
          {
            id: "am-r-troubleshoot-projects",
            title: "Troubleshoot Student Projects",
            subtitle: "Admins can inspect student projects directly without screen sharing.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Allows direct inspection of student projects to diagnose technical issues.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Shared execution environment" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduces reliance on screen sharing" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Faster resolution of support cases" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Inspect directly. Diagnose precisely." }],
              },
            ],
            icon: faMagnifyingGlass,
          },
          {
            id: "am-r-logistical-support",
            title: "Logistical Support",
            subtitle:
              "Admins can manage logistical aspects of classrooms without modifying instructional content or student work.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Separates instructional focus from logistical configuration tasks.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Handles scheduling and configuration" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduces instructor administrative burden" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Improves classroom sustainability" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Clear separation of responsibilities strengthens system stability.",
                  },
                ],
              },
            ],
            icon: faTruckFast,
          },
        ],
      },
      {
        id: "am-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Admin UI Screenshots",
        items: [imgObj.org_roster],
      },
      {
        id: "am-super",
        type: BlockType.RICH_TEXT,
        title: "Super Admin Views",
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "To support platform operations, I built a " },
              { type: "strong", text: "Super Admin dashboard" },
              {
                type: "text",
                text: " available only to a small group of trusted users. From this view, we could inspect organizations, classrooms, and licensing without needing backend-only tools.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: 'The goal was operational safety: actions should follow the same API pathways as normal usage, so behavior stays predictable and auditable. That meant fewer one-off scripts and fewer risky "just change it in the DB" moments.',
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🛡️" },
              {
                type: "text",
                text: " Super Admin wasn’t about power—it was about safe, repeatable support.",
              },
            ],
          },
        ],
      },
      {
        id: "am-super-capabilities",
        type: BlockType.BULLETED_LIST,
        title: "Super Admin Capabilities",
        subtitle:
          "Super Admin access provides a set of tools for platform-wide oversight and organization management, all built on the same audited API foundations as regular user actions.",
        items: [
          {
            id: "am-s-platform-oversight",
            title: "Platform-Wide Oversight",
            subtitle:
              "The Super Admin dashboard provides visibility across all organizations, licenses, and usage boundaries.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Provides visibility across all organizations, licenses, and usage boundaries without direct database access. Super Admins can inspect tenant health, monitor license usage, and perform operational diagnostics through the same UI workflows available to regular users.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Tenant-level health inspection" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "License and quota monitoring" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Operational diagnostics via UI workflows" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Observe broadly. Modify deliberately." }],
              },
            ],
            icon: faIdCard,
          },
          {
            id: "am-s-organization-management",
            title: "Organization Management",
            subtitle:
              "Super Admins can create and manage organizations, assign admins, and configure tenant structure through consistent system APIs.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Creates and manages organizations, assigns admins, and configures tenant structure through consistent system APIs. All changes are made through controlled UI workflows that enforce the same validation and side effects as regular user actions. This ensures predictable propagation and reduces the risk of misconfiguration.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Centralized onboarding workflows" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Predictable propagation through shared APIs" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Eliminates ad-hoc backend scripting" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Lifecycle changes should follow the same rules as user actions.",
                  },
                ],
              },
            ],
            icon: faPenFancy,
          },
          {
            id: "am-s-classroom-inspection",
            title: "Classroom Inspection",
            subtitle:
              "Super Admins can inspect student projects directly without screen sharing. This allows for faster diagnosis of technical issues without needing to coordinate screen sharing sessions.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Allows inspection of any classroom environment for debugging and support purposes.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "Reproduce issues in-context" }] },
                  { type: "li", children: [{ type: "text", text: "Read-only by default" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Minimizes risk during support operations" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Support without destabilization." }],
              },
            ],
            icon: faBugSlash,
          },
          {
            id: "am-s-license-adjustments",
            title: "License Adjustments",
            subtitle:
              "Super Admins can resolve edge-case licensing issues through audited UI-driven workflows and API.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Resolves edge-case licensing issues through audited UI-driven workflows rather than direct database edits.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Adjust counts and expiration windows" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "All changes logged and traceable" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduces operational risk exposure" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "High privilege requires higher auditability." }],
              },
            ],
            icon: faDatabase,
          },
          {
            id: "am-s-auditability-security",
            title: "Auditability & Security",
            subtitle:
              "Ensures all critical actions pass through traceable, role-enforced API boundaries.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Ensures all critical actions pass through traceable, role-enforced API boundaries.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  { type: "li", children: [{ type: "text", text: "No hidden state mutations" }] },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Consistent privilege validation" }],
                  },
                  { type: "li", children: [{ type: "text", text: "Full action logging" }] },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Even the highest privilege operates within system constraints.",
                  },
                ],
              },
            ],
            icon: faScissors,
          },
        ],
      },
      {
        id: "am-architecture",
        type: BlockType.CARD_GRID,
        title: "Architecture Highlights",
        subtitle:
          "The Super Admin dashboard was built on a foundation of secure, auditable API design that informed the entire platform architecture.",
        items: [
          {
            id: "am-s-platform-oversight",
            title: "Platform-Wide Oversight",
            subtitle:
              "The Super Admin dashboard provides visibility across all organizations, licenses, and usage boundaries.",
            icon: faIdCard,
            variant: "primary",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Provides visibility across all organizations, licenses, and usage boundaries without direct database access. Super Admins can inspect tenant health, monitor license usage, and perform operational diagnostics through the same UI workflows available to regular users.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Tenant-level health inspection" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "License and quota monitoring" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Operational diagnostics via UI workflows" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Observe broadly. Modify deliberately." }],
              },
            ],
          },
          {
            id: "am-a-tenant-isolation",
            title: "Tenant Isolation",
            subtitle:
              "Super Admins can create and manage organizations, assign admins, and configure tenant structure via consistent system APIs.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Creates and manages organizations, assigns admins, and configures tenant structure through consistent system APIs.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Centralized onboarding workflows" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Predictable propagation through shared APIs" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Eliminates ad-hoc backend scripting" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Lifecycle changes should follow the same rules as user actions.",
                  },
                ],
              },
            ],
            icon: faUserGroup,
          },
          {
            id: "am-a-super-admin-ui",
            title: "Super Admin Interface",
            subtitle: "Super Admins can inspect student projects directly without screen sharing.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Resolves edge-case licensing issues through audited UI-driven workflows rather than direct database edits.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Adjust counts and expiration windows" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "All changes logged and traceable." }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduces operational risk exposure" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "High privilege requires higher auditability." }],
              },
            ],
            icon: faBlackTie,
          },
          {
            id: "am-a-api-driven-modifications",
            title: "API-Driven Modifications",
            subtitle:
              "Ensures all critical actions pass through traceable, role-enforced API boundaries.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Ensures all critical actions pass through traceable, role-enforced API boundaries. This design enforces consistent validation, predictable side effects, and comprehensive logging for all privileged operations.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "No hidden state mutations" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Consistent privilege validation" }],
                  },
                  { type: "li", children: [{ type: "text", text: "Full action logging" }] },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Even the highest privilege operates within system constraints.",
                  },
                ],
              },
            ],
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
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As more organizations came onto the platform, we needed a better way to build and manage curriculum. Teachers and content teams wanted to assemble courses from reusable units and lessons rather than recreating content for every classroom.",
              },
            ],
          },
          {
            type: "p",
            children: [
              { type: "text", text: "We also needed a clean separation between " },
              { type: "em", text: "curriculum design" },
              { type: "text", text: " and " },
              { type: "em", text: "classroom delivery" },
              {
                type: "text",
                text: ". A course might be taught across multiple organizations, and each organization might customize resources or presentation without breaking the underlying lesson templates.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Reuse lessons across courses without duplication" },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Allow org-specific extensions without corrupting templates",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Enable fast assembly of courses, units, and lesson sequences",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "📚" },
              {
                type: "text",
                text: " Curriculum needed to behave like modular building blocks, not copy-pasted pages.",
              },
            ],
          },
        ],
      },
      diagrams.curriculumModel, // Curriculum Data Model
      {
        id: "cb-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "I built a " },
              { type: "strong", text: "Curriculum Builder" },
              {
                type: "text",
                text: " that allows authorized users to compose courses from modular pieces. The structure is intentionally simple and scalable:",
              },
            ],
          },
          {
            type: "ol",
            children: [
              { type: "li", children: [{ type: "text", text: "Courses contain Units" }] },
              { type: "li", children: [{ type: "text", text: "Units contain Lessons" }] },
              {
                type: "li",
                children: [{ type: "text", text: "Lessons can have attached Resources" }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Once a lesson is part of a course, organizations can attach additional resources or tweak metadata without breaking the underlying lesson template. That separation let us reuse core lesson content while still supporting organization-specific needs.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "A dedicated curriculum dashboard lets authorized users browse courses, units, and lessons within their active organization. Adding a lesson to a course uses a searchable, tabular picker (powered by RSuite), reinforcing the idea that lessons are ",
              },
              { type: "em", text: "reusable assets" },
              { type: "text", text: " rather than one-off copies." },
            ],
          },
          {
            type: "pre",
            language: "txt",
            text: `Lesson Template + Org Extensions → Course Assembly\nReuse without duplication → Update once, teach many`,
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "📚" },
              {
                type: "text",
                text: " I treated curriculum like composable building blocks, not static pages.",
              },
            ],
          },
        ],
      },
      {
        id: "cb-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Curriculum Screens",
        items: [
          imgObj.org_library,
          imgObj.org_myContent,
          imgObj.course_builder,
          imgObj.lesson_attacher,
        ],
      },
      {
        id: "cb-benefits",
        type: BlockType.CARD_GRID,
        title: "Feature Benefits",
        subtitle:
          "The Curriculum Builder’s modular design and centralized management provided clear benefits for content teams, instructors, and students.",
        icon: faHandHoldingMedical,
        items: [
          {
            id: "cb-b-reusable-curriculum",
            icon: faBookAtlas,
            title: "Reusable Curriculum Architecture",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Treats curriculum as a reusable system asset rather than disposable classroom content.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Shared lessons and units across courses" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "No content duplication across organizations" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Improvements propagate intentionally" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Design once. Deploy many times." }],
              },
            ],
          },
          {
            id: "cb-b-separation-of-concerns",
            icon: faObjectUngroup,
            title: "Separation of Concerns",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Decouples curriculum authoring from classroom delivery.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Content teams focus on instructional quality" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Instructors focus on live teaching" }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Organizations attach resources without mutating base lessons",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Decouple structure from execution." }],
              },
            ],
          },
          {
            id: "cb-b-centralized-management",
            icon: faArrowsToCircle,
            title: "Centralized Management",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Provides a unified dashboard for browsing, attaching, and managing curriculum assets.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Clear visibility into course structure" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduces informal content dependency" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Prevents orphaned or duplicate lessons" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "text", text: "Centralize visibility to reduce structural drift." },
                ],
              },
            ],
          },
          {
            id: "cb-b-efficiency-gains",
            icon: faIndustry,
            title: "Operational Efficiency",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Reduces manual course setup and enables controlled propagation of updates.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Single-source content updates" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Lower onboarding overhead for new organizations" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Scales without proportional administrative growth",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Efficiency compounds as the system scales." }],
              },
            ],
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
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                text: "CodeStream required designing for real operational constraints.",
              },
              {
                type: "text",
                text: " The platform served schools and training programs where access control, licensing, grading, and data ownership intersected daily.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each architectural decision had downstream effects across classrooms, organizations, and individual users. The system had to balance:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Organizational governance and licensing control" },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Individual ownership of student work" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Flexible grading expectations across institutions" },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Role-aware, context-scoped access enforcement" }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Working as the sole frontend engineer required thinking beyond UI implementation — it demanded architectural accountability. That foundation now informs how I approach future systems — prioritizing clarity, separation of concerns, and long-term operational stability.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "👔" },
              {
                type: "text",
                text: " The result was a platform designed for durability: normalized storage, scoped access, and systems that respect both governance and ownership.",
              },
            ],
          },
        ],
      },
    ],
  },
];
Object.freeze(codestreamSections);

export default codestreamSections;
