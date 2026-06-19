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
    title: "What I Built",
    subtitle:
      "A learning platform that began as an urgent internal fix and grew into the company's most important product asset.",

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
                text: ", I was the sole frontend engineer who took a React platform from concept to production. I defined the UI architecture, built core product flows, and shipped stable features that instructors used every day.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "In a lean team, my role extended beyond implementation. I handled feature design, interaction details, bug fixes, documentation, and instructor feedback loops in parallel.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "💻" },
              {
                type: "text",
                text: "This role required owning the user experience, not just individual components.",
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
                text: ". I taught classes while building the platform, which meant creating curriculum, managing teachers, onboarding students, and grading assignments. That dual perspective shaped major product decisions.",
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
                children: [{ type: "text", text: "Users can belong to multiple organizations" }],
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
        id: "overview-why-it-mattered",
        type: BlockType.CARD_GRID,
        title: "Why It Mattered",
        subtitle: "Who it served, the problem, the solution, ownership, and impact.",
        items: [
          {
            id: "overview-who-it-served",
            title: "Who It Served",
            subtitle: "Students, teachers, and program administrators",
            icon: faPeopleGroup,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Students needed reliable browser-based coding, teachers needed clear assignment and grading flows, and administrators needed practical controls across schools and programs.",
                  },
                ],
              },
            ],
          },
          {
            id: "overview-problem-solved",
            title: "Main Challenge",
            subtitle: "Core teaching flows were fragmented",
            icon: faCircleExclamation,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Lessons, coding, grading, and oversight were split across disconnected tools, creating context switching and inconsistent delivery as programs scaled.",
                  },
                ],
              },
            ],
          },
          {
            id: "overview-solution",
            title: "Custom Software Response",
            subtitle: "Unified platform with role-specific workflows",
            icon: faArrowsToCircle,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "I helped shape a unified browser-based system that connected curriculum, coding, grading, and admin tools while keeping each role limited to the right information and actions.",
                  },
                ],
              },
            ],
          },
          {
            id: "overview-what-i-owned",
            title: "What I Owned",
            subtitle: "End-to-end frontend delivery",
            icon: faHouseLaptop,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "As sole frontend engineer, I owned component strategy, feature delivery, UX behavior, bug resolution, and product-facing documentation for the production app.",
                  },
                ],
              },
            ],
          },
          {
            id: "overview-what-changed",
            title: "What Changed",
            subtitle: "From short-term fix to durable platform",
            icon: faChartDiagram,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "What started as a short-term fix became a durable teaching platform for multiple organizations, with cleaner daily workflows and stronger administrative visibility.",
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
        title: "Platform at a Glance",
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
                text: ", not just a code editor. The platform unified browser-based coding, classroom management, grading, and administrative oversight into a single system.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "What began as a COVID-era workaround matured into a platform supporting multiple schools, programs, and organizations with different needs.",
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
            subtitle:
              "The operational hub where instruction, projects, and progress visibility came together.",
            icon: faChalkboardTeacher,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Virtual Classrooms were the main instructional boundary. Each classroom kept rosters, lesson assignments, student projects, and grades in one context, mirroring school operations while preventing data from leaking between classes.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Treating classrooms as core product entities, not simple filters on a global data set, kept behavior predictable as organizations scaled and teachers managed multiple cohorts.",
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
                    text: "Curriculum was modeled independently from classrooms so the same course materials could be reused without being rewritten for every class. Courses break into units and lessons that behave as stable templates, not one-off classroom copies.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "When assigned, lessons generate student-specific project copies without changing the underlying template. This prevents content drift while still allowing classroom-level customization.",
                  },
                ],
              },
            ],
          },
          {
            id: "kp-p-editor-system",
            title: "3-Panel Editor System",
            subtitle: "Project-level coding environment designed for instructional clarity.",
            icon: faTableColumns,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The editor defined the project workspace. Each lesson opened a three-panel layout for instructions, code, and output. This removed setup friction while keeping guidance, implementation, and results clearly separated.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The interface follows familiar coding-tool patterns without unnecessary complexity. Students work in a stable context while teachers evaluate predictable outputs.",
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
                    text: "Grading was tied directly to classroom membership and project state. Teachers reviewed saved student submissions and provided inline feedback and scores in the same flow.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Metrics updated automatically at the classroom and organization levels, reducing reporting overhead and giving administrators clearer visibility without duplicate reporting work.",
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
                    text: "Admin tooling provided visibility across classrooms and organizations while preserving permission boundaries. Organization Admins stayed limited to their own organization, while Super Admins handled platform-wide oversight.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "All privileged actions flowed through audited APIs instead of manual database edits. This preserved traceability, enforced consistent validation, and prevented hidden state changes.",
                  },
                ],
              },
            ],
          },

          {
            id: "kp-p-orgs-licensing",
            title: "Organizations & Licensing",
            subtitle: "Role and capacity rules for multiple organizations.",
            icon: faPeopleGroup,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Organizations defined customer boundaries. Users held scoped Student, Teacher, or Admin roles, and licensing enforced seat limits, expiration windows, and feature access for each organization.",
                  },
                ],
              },
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "License enforcement restricted new instructional activity without deleting student work, preserving continuity while satisfying contract requirements.",
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
      "A browser-based coding workspace designed for students and teachers, not only professional developers.",
    isScroller: true,
    blocks: [
      {
        id: "pe-problem",
        type: BlockType.RICH_TEXT,
        title: "Challenge: In-Class Project Review Friction",
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
        title: "Solution: Integrated Project Review Workflow",
        icon: faLightbulb,
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "I designed and built a " },
              { type: "strong", text: "three-panel browser-based IDE" },
              {
                type: "text",
                text: " that keeps instructions, code, and output visible at all times. This layout reduces mental overhead while making the relationship between code and results easier to see.",
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
      "Organization-aware roles and licensing rules that scale from a single classroom to multiple schools.",
    isScroller: true,
    blocks: [
      {
        id: "org-problem",
        type: BlockType.RICH_TEXT,
        title: "Challenge: Multi-Organization Access Control",
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
                text: " The true customer was the organization: schools, bootcamps, and training programs operating under centralized licensing.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each organization required a unified management layer for:",
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
                text: "The core design challenge was enforcing organizational access rules without violating individual data ownership.",
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
                    text: "Rule: organizational control governs access, not data deletion.",
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
        title: "Solution: Role-Scoped Organization Model",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  { type: "text", text: "An organization-aware access layer solved the problem." },
                ],
              },
              {
                type: "text",
                text: " Users exist as global identities, but their permissions change based on the organization they are working in.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This separation allowed identity, ownership, and organizational control to operate independently.",
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
                    text: "Access decisions are evaluated against organization scope, not global user state.",
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
                text: "When a license expires, access to organizational resources is revoked, but student-created work remains intact and accessible.",
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
          "By modeling organizations as core entities with scoped roles and access rules, the platform could scale from a single school to multiple institutions without compromising data integrity or user experience.",
        icon: faRoute,
        items: [
          {
            id: "org-o-scalable-multi-tenancy",
            title: "Scalable Multi-Tenancy",
            subtitle: "Separate organizational contexts without repeated infrastructure.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Implemented an architecture that isolated each organization's data while sharing one unified application infrastructure.",
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
                      { type: "text", text: "No repeated deployments required for growth" },
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
            subtitle: "Scoped permissions that reflect practical organizational structure.",
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
                  { type: "text", text: "Governance restricts participation, not ownership." },
                ],
              },
            ],
          },
          {
            id: "org-o-flexible-org-model",
            title: "Flexible Organization Model",
            subtitle: "Flexible organizational model that evolves without structural refactors.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designed a flexible organizational model capable of evolving without structural refactors.",
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
        title: "Challenge: Fragmented Classroom Flow",
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
                text: ". Teachers needed a consistent home base for each course: somewhere to present curriculum, share resources, and track progress without patching separate tools together.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Students needed one predictable path to join class, open lessons, and access projects. If the experience changed by teacher or lesson, learning slowed and support load increased.",
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
                children: [{ type: "text", text: "A stable path from lesson to project to grade" }],
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
        title: "Solution: Unified Classroom Workspace",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [{ type: "text", text: "Classrooms became a core domain entity." }],
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
                text: "The Classrooms page renders a personalized list of every classroom associated with the signed-in user.",
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
                text: ": a centralized classroom hub.",
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
                text: "When a student opens a lesson, the system keeps curriculum separate from student work.",
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
                    text: "Core design principle: curriculum remains unchanged; student work exists as an isolated copy.",
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
                        text: "Standardized submission format simplifies grading",
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
              "A unified lifecycle that connects lessons, projects, and grading into one clear flow.",
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
                children: [{ type: "text", text: "Clear flow reduces cognitive load." }],
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
      "Integrated grading flows and exportable reports that align with how real classrooms operate.",
    isScroller: true,
    blocks: [
      {
        id: "gr-problem",
        type: BlockType.RICH_TEXT,
        title: "Challenge: Slow Grading Feedback Loops",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As the instructor for multiple cohorts, I hit the same bottleneck: when a project failed, I had to stop class for screen sharing. That process was disruptive and reduced feedback depth for everyone else.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "On top of that, leadership needed a way to understand classroom outcomes without relying on spreadsheets and memory. We did not have a consistent process for:",
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
                text: " The platform needed to support real teaching activity, not just store projects.",
              },
            ],
          },
        ],
      },
      {
        id: "gr-solution",
        type: BlockType.RICH_TEXT,
        title: "Solution: Embedded Grading and Reporting",
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
                text: "This approach keeps the data model consistent while keeping UI presentation flexible.",
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
          "Each feature was designed to align with classroom teaching and institutional requirements.",
        items: [
          {
            id: "gr-f-secure-grading",
            title: "Secure Grading Interface",
            subtitle: "Role-limited access to saved project snapshots for safe evaluation.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Grading access is restricted to teachers and organization administrators through role-based authorization.",
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
            subtitle: "Supports multiple grading methods without splitting the data model.",
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
                text: " so classroom performance could be reviewed quickly and consistently. The focus was not flashy dashboards; it was reliable visibility into completion, averages, and trends.",
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
        title: "Challenge: Unsafe Admin Operations at Scale",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As the platform scaled, visibility needs expanded beyond teachers and students. School coordinators needed more control than teachers for setup, enrollment, and support, but without full platform privileges.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "We also needed a safe way to manage organizations at scale for licensing, onboarding, and edge-case support. Without an admin UI, teams relied on direct database edits, which were slow and risky.",
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
                  { type: "text", text: "Provide tools aligned to clear role boundaries" },
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
        title: "Solution: Role-Scoped Admin Console",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As the platform grew beyond single classrooms, operational visibility and governance had to scale with it. I implemented a structured role hierarchy: ",
              },
              { type: "strong", text: "Teacher" },
              { type: "text", text: ", " },
              { type: "strong", text: "Organization Admin" },
              { type: "text", text: ", and " },
              { type: "strong", text: "Super Admin" },
              {
                type: "text",
                text: ", so support, licensing, reporting, and exception handling could happen through controlled interfaces instead of one-off fixes.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each role had a clear boundary: Teachers managed classrooms, Organization Admins managed one organization, and Super Admins managed platform operations without bypassing rules. This kept authority proportional to responsibility and avoided unchecked access in production.",
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
              { type: "strong", text: "core product flows" },
              {
                type: "text",
                text: " rather than hidden database operations. Privileged actions used the same request/validation pipeline as standard features, with explicit permission checks and predictable side effects.",
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
                    text: " role and organization checks applied at route and API boundaries.",
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
                text: "Every privileged action flowed through the same audited API paths; no database shortcuts.",
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
          "Organization Admins have elevated permissions within their organization to manage classrooms and memberships without affecting other organizations.",
        items: [
          {
            id: "am-r-capabilities",
            title: "Organization-Level Oversight",
            subtitle: "Oversight tools limited to one organization for safe, effective management.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Provides full visibility across classrooms, teachers, and students within a single organization.",
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
                  { type: "li", children: [{ type: "text", text: "Explicit override flows" }] },
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
                text: "Operational safety was the goal: admin actions followed the same API paths as normal usage, keeping behavior predictable and auditable while reducing risky manual database edits.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🛡️" },
              {
                type: "text",
                text: " Super Admin was not about power; it was about safe, repeatable support.",
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
                    text: "Super Admins could inspect organization health, monitor license usage, and run diagnostics across organizations without direct database access.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Organization-level health inspection" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "License and quota monitoring" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Operational diagnostics through standard UI flows" },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Broad visibility with deliberate action." }],
              },
            ],
            icon: faIdCard,
          },
          {
            id: "am-s-organization-management",
            title: "Organization Management",
            subtitle:
              "Super Admins can create and manage organizations, assign admins, and configure organization structure through consistent system APIs.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Super Admins could create organizations, assign admins, and configure organization structure through controlled UI flows. Those flows enforced standard validation and predictable updates, reducing misconfiguration risk.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Centralized onboarding flows" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Predictable propagation through shared APIs" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Less need for backend scripting" }],
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
              "Super Admins can resolve edge-case licensing issues through audited UI-driven flows and APIs.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Resolves edge-case licensing issues through audited UI-driven flows rather than direct database edits.",
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
                children: [{ type: "text", text: "More access requires more traceability." }],
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
                  { type: "li", children: [{ type: "text", text: "No hidden state changes" }] },
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
                    text: "Even the highest privilege operates within system rules.",
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
          "The Super Admin dashboard used the same secure API and permission model as the rest of the platform.",
        items: [
          {
            id: "am-a-platform-oversight",
            title: "Centralized Visibility",
            subtitle: "A single view for organization health, licensing, and support signals.",
            icon: faIdCard,
            variant: "primary",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The dashboard gave trusted users broad visibility without requiring direct database access. Support work stayed inside the product instead of moving into one-off scripts.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Organization-level health checks" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "License and quota monitoring" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Diagnostics through standard UI flows" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Broad visibility with controlled action." }],
              },
            ],
          },
          {
            id: "am-a-tenant-isolation",
            title: "Organization Isolation",
            subtitle:
              "Organization boundaries stay intact even when support users have broad visibility.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Organization setup and admin assignment used shared API rules, so organization boundaries remained consistent across onboarding, support, and license changes.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Centralized onboarding flows" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Predictable updates through shared APIs" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Less need for backend scripting" }],
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
            title: "Safe Support Actions",
            subtitle: "High-trust tools still follow normal validation and logging.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "License and support fixes ran through UI-driven flows with the same validation rules as standard product actions.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Adjust counts and expiration windows safely" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "All changes logged and traceable" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reduced risk during support work" }],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "More access requires more traceability." }],
              },
            ],
            icon: faBlackTie,
          },
          {
            id: "am-a-api-driven-modifications",
            title: "API-Driven Changes",
            subtitle: "Critical changes pass through traceable, role-enforced API boundaries.",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Privileged actions passed through role-enforced APIs with consistent validation, predictable side effects, and clear logging.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "No hidden state changes" }],
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
                    text: "Even the highest privilege operates within system rules.",
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
        title: "Challenge: Curriculum Duplication and Drift",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "As adoption grew, we needed a better curriculum model. Teachers and content teams had to assemble courses from reusable units and lessons instead of recreating content per classroom.",
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
                text: ". A course can be taught across multiple organizations, each with customized resources or presentation, without breaking underlying lesson templates.",
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
        title: "Solution: Modular Curriculum Builder",
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
                text: "After a lesson joined a course, organizations could add resources or adjust metadata without changing the base template. That separation supported reuse while allowing organization-specific customization.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "A dedicated curriculum dashboard lets authorized users browse courses, units, and lessons in their active organization. Adding a lesson uses a searchable RSuite table picker, reinforcing that lessons are ",
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
                        text: "Organizations attach resources without changing base lessons",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [{ type: "text", text: "Keep structure separate from delivery." }],
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
                    children: [{ type: "text", text: "Prevents orphaned or repeated lessons" }],
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
];
Object.freeze(codestreamSections);

export default codestreamSections;
