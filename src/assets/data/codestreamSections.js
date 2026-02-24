import {
  faArrowDownUpLock,
  faArrowsToCircle,
  faBinoculars,
  faBook,
  faBookAtlas,
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
  faHandHoldingMedical,
  faHourglassEnd,
  faHouseLaptop,
  faIdCard,
  faIndustry,
  faLayerGroup,
  faLightbulb,
  faMagnifyingGlass,
  faNetworkWired,
  faObjectUngroup,
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
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "During my tenure at " },
              { type: "strong", text: "CodeStream Studios LLC" },
              {
                type: "text",
                text: ", I served as the sole front-end engineer responsible for taking a React-based application from concept to production. I owned the front-end architecture and translated rough ideas into durable, user-facing systems.",
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
              { type: "inlineIcon", icon: "fa-solid fa-laptop" },
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
                text: ". I used the system to teach classes, build curriculum, manage teachers, onboard students, grade assignments. This dual perspective shaped every design decision I made.",
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
                    text: "Project grading, curriculum building and role based oversight tools",
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
                text: "What started as a COVID-era workaround matured into an ecosystem capable of supporting multiple schools, programs, and organizations with differing needs and constraints.",
              },
            ],
          },
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
            text: "The three-panel editor was designed to give students everything they need in a single, predictable workspace. Instructions, code, and output live side-by-side so learners never have to context-switch between tools. This structure dramatically reduces setup friction and allows instructors to teach concepts instead of troubleshooting environments. By mirroring the feel of a lightweight IDE, students gain confidence with professional workflows without being overwhelmed.",
          },
          {
            id: "kp-p-orgs-licensing",
            title: "Organizations & Licensing",
            icon: faPeopleGroup,
            text: "Organizations and licensing form the backbone of how access is controlled across the platform. Rather than treating users as isolated accounts, the system models real institutions with teachers, students, and administrators operating under shared constraints. Licenses define capacity, expiration, and feature access, allowing the platform to scale cleanly from a single classroom to multi-school deployments. These rules are enforced consistently across classrooms, curriculum, and reporting.",
          },
          {
            id: "kp-p-virtual-classrooms",
            title: "Virtual Classrooms",
            icon: faChalkboardTeacher,
            text: "Virtual Classrooms act as the primary teaching surface for instructors and the main entry point for students. Each classroom brings together lessons, projects, rosters, and grades in a way that mirrors how real classes operate. Teachers can manage instruction without juggling links or tools, while students always know where to go to continue their work. This structure became critical as the platform scaled across multiple organizations.",
          },
          {
            id: "kp-p-grades-reports",
            title: "Grades & Reports",
            icon: faUserGraduate,
            text: "Grading and reporting were built directly into the learning workflow rather than treated as an afterthought. Teachers can review student code, leave written feedback, and assign grades without interrupting class flow. Progress data aggregates automatically at the classroom and organization level, reducing reliance on external spreadsheets. This gave instructors better insight while giving administrators meaningful visibility into outcomes.",
          },
          {
            id: "kp-p-admin-monitoring",
            title: "Admin Monitoring & Super Admin",
            icon: faMagnifyingGlass,
            text: "Administrative monitoring tools were designed to provide oversight without requiring direct database access. Coordinators and platform staff can inspect classrooms, troubleshoot issues, and manage licenses through dedicated UIs. This approach reduces risk, improves auditability, and allows operational tasks to be handled safely within the same system teachers and students use. It also ensured that support and maintenance scaled alongside the platform.",
          },
          {
            id: "kp-p-curriculum-builder",
            title: "Curriculum Builder",
            icon: faLayerGroup,
            text: "The curriculum builder enables courses to be assembled from reusable units and lessons rather than copied repeatedly. Content teams can design high-quality lessons once and deploy them across multiple organizations. Individual schools can then extend or customize curriculum without breaking the underlying templates. This modular approach made long-term curriculum maintenance and iteration significantly more sustainable.",
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
        content: [
          {
            type: "p",
            children: [
              { type: "text", text: "Real customers were not individual users — they were " },
              { type: "strong", text: "organizations" },
              {
                type: "text",
                text: " such as schools and training programs. Each organization needed to manage teachers, students, classrooms, and licensing under a single umbrella.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The challenge was enforcing access rules while preserving student ownership of their work, even when licenses expired.",
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
              { type: "text", text: "I implemented an " },
              { type: "strong", text: "organization-aware access model" },
              {
                type: "text",
                text: " where users exist independently but assume scoped roles within organizations.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "lock" },
              {
                type: "text",
                text: "Licensing constraints were enforced without deleting student work.",
              },
            ],
          },
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
            text: "The platform uses a true multi-tenant architecture that cleanly isolates data between organizations. Each school or partner operates within its own boundary while still sharing the same application infrastructure. This prevents data leakage while allowing the platform to grow without duplicating deployments. The model proved stable as more organizations were onboarded over time.",
          },
          {
            id: "org-o-role-based-access",
            title: "Role-Based Access",
            text: "Clear role definitions ensure that users only see the tools and data relevant to their responsibilities. Teachers focus on instruction, students focus on learning, and administrators manage structure and oversight. These roles are enforced consistently across routes and features, reducing ambiguity and preventing privilege creep. This clarity also made onboarding new users significantly easier.",
          },
          {
            id: "org-o-license-enforcement",
            title: "License Enforcement",
            text: "Licensing rules are enforced at the classroom and activity level rather than through blunt access cutoffs. When a license expires, new instructional activity is restricted, but students retain access to their personal projects. This approach balances business requirements with educational continuity. It also reduced support issues during renewals and contract transitions.",
          },
          {
            id: "org-o-flexible-org-model",
            title: "Flexible Organization Model",
            text: "Organizations can evolve over time without requiring schema changes or manual intervention. New roles, classrooms, and users can be added as programs grow. This flexibility allowed the platform to support after-school programs, summer camps, and full academic courses using the same underlying model. Predictable behavior made the system easier to reason about and maintain.",
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
              { type: "inlineIcon", icon: "door-open" },
              {
                type: "text",
                text: " I wanted classrooms to feel like a hub—not another page you click through.",
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
            text: "All classrooms a user belongs to are accessible from a single, role-aware entry point. Teachers and students no longer need separate links or dashboards for different courses. Ownership and enrollment status are clearly indicated, reducing confusion as users participate in multiple classes. This became especially valuable for instructors teaching several cohorts at once.",
          },
          {
            id: "vc-b-centralized-lesson-hub",
            title: "Centralized Course Hub",
            text: "Each classroom serves as a centralized hub for lessons, projects, and resources. When a student opens a lesson, the system automatically initializes a project based on a template rather than starting from scratch. This ensures consistency across submissions while still allowing individual experimentation. It also simplifies grading by standardizing project structure.",
          },
          {
            id: "vc-b-resource-management",
            title: "Streamlined Project Management",
            text: "Projects, resources, and grades are tightly integrated rather than managed as separate concerns. Teachers can attach resources once and trust that students will see the same materials across lessons. Project state is preserved automatically, reducing accidental loss of work. This cohesion makes the classroom experience feel stable and intentional.",
          },
          {
            id: "vc-b-enhanced-learning-experience",
            title: "Enhanced Learning Experience",
            text: "The classroom dashboard provides a clear, predictable flow from lesson to project to feedback. Students spend less time navigating and more time learning. Teachers gain confidence that everyone is working from the same source of truth. Over time, this consistency improved both engagement and instructional pace.",
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
              { type: "inlineIcon", icon: "triangle-exclamation" },
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
            text: "The grading interface is intentionally restricted to teachers and organization administrators to protect student work and academic integrity. From this view, instructors can open a student’s project exactly as it was submitted, run the code, and inspect behavior without modifying the original work. This made it possible to diagnose issues and give meaningful feedback without interrupting live instruction. The security boundaries ensured grading remained both safe and trustworthy.",
            icon: faFileShield,
          },
          {
            id: "gr-f-inline-feedback",
            title: "Integrated Grading Workflow",
            text: "Grading is performed directly alongside the student’s project rather than in a separate tool or modal. Teachers can review code, leave written feedback, and assign a grade in one continuous flow. This reduces context switching and allows feedback to stay tightly coupled to the work being evaluated. Over time, this workflow significantly sped up grading while improving the quality of instructor comments.",
            icon: faSchoolCircleCheck,
          },
          {
            id: "gr-f-flexible-grading-models",
            title: "Flexible Grading Models",
            text: "Different organizations had different expectations around grading, so the system was designed to support both Pass/Fail and Numeric or Letter-based models. Teachers can switch grading modes depending on course requirements without changing how projects are stored or reviewed. Internally, all grades map to a consistent numeric representation, which keeps reporting logic simple. This flexibility allowed the platform to adapt to multiple educational contexts without fragmentation.",
            icon: faFileCircleCheck,
          },
          {
            id: "gr-f-real-time-feedback",
            title: "Real-Time Feedback",
            text: "Grades and feedback are immediately reflected across the classroom experience once submitted. Students can see updated scores, written comments, and class averages without waiting for manual updates. This immediacy reinforces learning by keeping feedback timely and actionable. It also reduces follow-up questions since students always have a clear view of their current standing.",
            icon: faSchool,
          },
          {
            id: "gr-f-student-visibility",
            title: "Student Visibility",
            text: "Students have direct access to their assignment grades and overall class performance metrics from the Classroom dashboard. This transparency helps learners understand expectations and track their progress over time. By surfacing both individual feedback and aggregate context, students gain a clearer picture of how they’re performing relative to the course. This visibility encouraged accountability without adding pressure.",
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
              { type: "inlineIcon", icon: "chart" },
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
        items: [
          {
            id: "gr-c-classroom-reports",
            title: "Classroom-Level Reports",
            text: "Classroom-level reports aggregate performance data across all students and lessons in a single view. Teachers and administrators can quickly assess overall progress without manually compiling results. This made it easier to identify trends, struggling students, or lessons that needed adjustment. Reports were designed to reflect how instructors actually evaluate class health.",
            icon: faTable,
          },
          {
            id: "gr-c-automated-averages",
            title: "Automated Averages",
            text: "The reporting system automatically calculates averages, completion rates, and grade distributions as new grades are submitted. This removes the need for external spreadsheets or manual calculations. Because the data updates in real time, instructors always have an up-to-date snapshot of class performance. This automation significantly reduced administrative overhead.",
            icon: faTableList,
          },
          {
            id: "gr-c-export-reports",
            title: "Export Reports (PDF & Text)",
            text: "Reports can be exported as lightweight text summaries or fully styled PDFs depending on the use case. Text exports support simple archival and record-keeping, while PDFs are formatted for presentations and meetings. This flexibility allows the same data to serve both operational and communication needs. Exports are generated directly from live data, ensuring accuracy.",
            icon: faFileLines,
          },
          {
            id: "gr-c-presentation-ready-pdfs",
            title: "Presentation-Ready PDFs",
            text: "PDF reports are color-coded and structured for clarity, making them suitable for parent meetings, leadership reviews, or partner updates. Visual cues help surface key performance indicators at a glance. Because the formatting is handled automatically, instructors don’t need to manually prepare slides or charts. This made reporting feel polished without extra effort.",
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
              { type: "inlineIcon", icon: "binoculars" },
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
                text: "As the platform grew, visibility and control were required beyond individual classrooms. I implemented a role hierarchy culminating in ",
              },
              { type: "strong", text: "Super Admin" },
              { type: "text", text: " access." },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "shield" },
              {
                type: "text",
                text: "Every action flowed through the same audited API paths — no database shortcuts.",
              },
            ],
          },
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
            text: "Organization Admins are responsible for overseeing all activity within their tenant. They have visibility into every classroom, teacher, and student tied to the organization. This role bridges the gap between instructional staff and platform operations. It allows coordinators to support teachers without needing platform-wide access.",
            icon: faEye,
          },
          {
            id: "am-r-view-rosters",
            title: "View Classrooms & Rosters",
            text: "Admins can view any classroom within their organization along with full student rosters. This makes it easy to audit enrollment, resolve access issues, and understand how courses are structured. Visibility is read-only by default, reducing the risk of accidental changes. It provides clarity without overstepping teacher ownership.",
            icon: faPersonChalkboard,
          },
          {
            id: "am-r-manage-classrooms",
            title: "Manage Classrooms",
            text: "Organization Admins can update classroom-level settings such as metadata, meeting links, and attached resources. This allows logistical adjustments to be handled centrally instead of relying on individual teachers. Changes are applied through the same APIs used elsewhere in the system, ensuring consistency. This capability reduced operational bottlenecks as organizations scaled.",
            icon: faGear,
          },
          {
            id: "am-r-edit-students",
            title: "Add & Remove Students & Teachers",
            text: "Admins can manage organization membership by adding or removing students and teachers as needed. This is especially important during onboarding, schedule changes, or staff transitions. By handling membership at the organization level, classrooms stay aligned without manual cleanup. The process remains auditable and role-restricted.",
            icon: faUserXmark,
          },
          {
            id: "am-r-override-grades",
            title: "Override & Update Student Grades",
            text: "In rare cases, Organization Admins can intervene to correct grading issues or handle exceptions. This might include resolving disputes, accommodating late submissions, or fixing clerical errors. Overrides are intentional and limited to prevent misuse. This ensures fairness without undermining instructor authority.",
            icon: faWandMagicSparkles,
          },
          {
            id: "am-r-retrieve-reports",
            title: "Retrieve Reports",
            text: "Admins can retrieve reports for both active and archived classrooms. This supports long-term record keeping, audits, and post-term reviews. Even after a classroom is no longer active, its data remains accessible in a controlled way. This continuity proved important for institutional partners.",
            icon: faBoxArchive,
          },
          {
            id: "am-r-troubleshoot-projects",
            title: "Troubleshoot Student Projects",
            text: "When technical issues arise, Admins can inspect student projects directly to help diagnose problems. This reduces reliance on screen sharing or vague descriptions from students. Troubleshooting happens within the same environment used for instruction and grading. It significantly improves response time and support quality.",
            icon: faMagnifyingGlass,
          },
          {
            id: "am-r-logistical-support",
            title: "Logistical Support",
            text: "By handling scheduling, enrollment, and configuration tasks, Organization Admins free teachers to focus on instruction. This separation of responsibilities improves classroom quality and reduces burnout. It also ensures that operational changes don’t disrupt lesson flow. The result is a more sustainable teaching model.",
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
              { type: "inlineIcon", icon: "shield" },
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
        items: [
          {
            id: "am-s-platform-oversight",
            title: "Platform-Wide Oversight",
            text: "Super Admins have visibility across every organization on the platform. They can inspect licenses, usage limits, and overall system health without accessing the database directly. This oversight is essential for platform operations and support. It allows issues to be diagnosed quickly and safely.",
            icon: faIdCard,
          },
          {
            id: "am-s-organization-management",
            title: "Organization Management",
            text: "Super Admins can create and manage organizations, assign admins, and configure teachers. This centralizes onboarding and support workflows. Changes made here flow through the same APIs as standard user actions, keeping behavior predictable. It prevents the need for one-off backend scripts.",
            icon: faPenFancy,
          },
          {
            id: "am-s-classroom-inspection",
            title: "Classroom Inspection",
            text: "Super Admins can jump into any classroom for debugging or support purposes. This allows platform staff to reproduce issues exactly as users experience them. Inspection is read-only by default, minimizing risk. It greatly improves the effectiveness of technical support.",
            icon: faBugSlash,
          },
          {
            id: "am-s-license-adjustments",
            title: "License Adjustments",
            text: "Edge-case license issues can be resolved through the UI rather than database edits. This includes correcting counts, extending expirations, or handling special cases. UI-driven changes are logged and auditable. This approach dramatically reduces operational risk.",
            icon: faDatabase,
          },
          {
            id: "am-s-auditability-security",
            title: "Auditability & Security",
            text: "All critical actions taken by Super Admins pass through audited, API-driven workflows. This eliminates hidden state changes and improves traceability. Security boundaries are enforced consistently, even at the highest privilege levels. The result is a safer, more maintainable platform.",
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
            text: "The platform uses a clearly defined RBAC hierarchy to control access across all features. Each role has explicit boundaries that prevent privilege creep. These checks are enforced consistently at both the UI and API layers. This clarity made the system easier to reason about and secure.",
            icon: faArrowDownUpLock,
          },
          {
            id: "am-a-tenant-isolation",
            title: "Tenant Isolation",
            text: "Each organization operates within its own isolated tenant context. Admins can manage only the data and users belonging to their organization. This prevents accidental cross-organization access while still allowing shared infrastructure. Tenant isolation was foundational to platform trust.",
            icon: faUserGroup,
          },
          {
            id: "am-a-super-admin-ui",
            title: "Super Admin Interface",
            text: "Super Admins manage organizations through a dedicated UI rather than direct database access. This ensures all changes follow the same code paths as regular actions. It improves consistency, auditability, and safety. The UI becomes the single source of truth for platform operations.",
            icon: faBlackTie,
          },
          {
            id: "am-a-api-driven-modifications",
            title: "API-Driven Modifications",
            text: "All administrative changes are performed through the platform’s API layer. This guarantees that business rules, validations, and side effects are applied uniformly. It also makes behavior easier to test and reason about. Over time, this reduced bugs and operational surprises.",
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
              { type: "inlineIcon", icon: "book" },
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
              { type: "inlineIcon", icon: "book" },
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
        icon: faHandHoldingMedical,
        items: [
          {
            id: "cb-b-reusable-curriculum",
            icon: faBookAtlas,
            title: "Reusable Curriculum",
            text: "Curriculum is designed as a reusable asset rather than disposable content. Lessons and units can be shared across courses and organizations without duplication. This reduces maintenance overhead and ensures improvements benefit every classroom using that content. It also encourages intentional curriculum design from the start.",
          },
          {
            id: "cb-b-separation-of-concerns",
            icon: faObjectUngroup,
            title: "Separation of Concerns",
            text: "Curriculum creation is intentionally separated from classroom delivery. Content teams can focus on lesson quality while instructors focus on teaching. Organizations can customize resources without altering the base lesson structure. This separation made long-term evolution of both curriculum and classrooms significantly easier.",
          },
          {
            id: "cb-b-centralized-management",
            icon: faArrowsToCircle,
            title: "Centralized Management",
            text: "A centralized curriculum dashboard provides visibility into all available courses, units, and lessons. Authorized users can browse, attach, and manage content without relying on informal knowledge. This structure supports collaboration across teams and organizations. It also reduces the risk of orphaned or duplicated lessons.",
          },
          {
            id: "cb-b-efficiency-gains",
            icon: faIndustry,
            title: "Efficiency Gains",
            text: "By reducing duplication and manual setup, the curriculum builder significantly lowers the time required to launch new courses. Updates can be made once and propagated intentionally. This efficiency became increasingly important as more organizations and classrooms came online. It allowed the platform to scale without proportional increases in overhead.",
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
                type: "text",
                text: "My time at CodeStream was defined by building software that people relied on daily. As the sole front-end engineer, I learned how architectural decisions ripple through real classrooms and organizations.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "forward" },
              {
                type: "text",
                text: "This experience reshaped how I design systems — with durability, clarity, and people in mind.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default codestreamSections;
