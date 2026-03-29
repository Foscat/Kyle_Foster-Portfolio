import {
  diagramConfig,
  resolveDiagram,
  diagram,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  panelEditor: {
    id: "diagram-3panel-editor",
    type: "diagram",
    title: "3-Panel Editor – Delivery Architecture",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Input[Lesson Markdown]
Panel[Instruction Panel]
Editor[Ace Editor<br/>HTML · CSS · JS · Python]
Router[Execution Router]
Web[Sandboxed iframe Runtime]
Py[In-Browser Python Runtime]
Output[Rendered Output / Terminal]
Save[Explicit Save Action]
Store[AWS S3 Project Storage]
Access[Teacher + Student Retrieval]

Input ==> Panel
Editor ==> Router
Router ==>|Web| Web
Router ==>|Python| Py
Web ==> Output
Py ==> Output
Editor ==> Save ==> Store ==> Access`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Authoring[Authoring Surface]
  Lesson[Lesson Markdown]
  Panel[Instruction Panel]
  Editor[Ace Editor<br/>HTML · CSS · JS · Python]
  Lesson ==> Panel
end

subgraph Runtime[Execution Runtime]
  Router[Execution Router]
  Web[Sandboxed iframe Runtime]
  Py[In-Browser Python Runtime<br/>Skulpt]
  Terminal[Terminal / Rendered Output]

  Router ==>|Web| Web
  Router ==>|Python| Py
  Web ==> Terminal
  Py ==> Terminal
end

subgraph Persistence[Persistence + Retrieval]
  Save[Explicit Save Action<br/>Ctrl + S]
  Store[AWS S3 Project Storage]
  Access[Teacher + Student Retrieval]

  Save ==> Store ==> Access
end

Editor ==> Router
Editor ==> Save`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Purpose." },
          {
            type: "text",
            text: " The editor acts as a browser-native instructional IDE that keeps lesson content, code authoring, runtime execution, and persistence in a single bounded workflow.",
          },
        ],
      },
      {
        type: "p",
        children: [
          { type: "strong", text: "Authoring model." },
          {
            type: "text",
            text: " Markdown-based lesson content is rendered alongside an Ace-powered editor so students can read, write, and test code without leaving the learning context.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Execution is routed by project type." },
              {
                type: "text",
                text: " Web projects run in a sandboxed iframe while Python exercises execute through an in-browser runtime, allowing the same workspace to support multiple instructional modes.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Feedback is immediate." },
              {
                type: "text",
                text: " Rendered output and terminal feedback stay adjacent to the editor, reducing context switching and shortening the loop between attempt and correction.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Persistence is explicit." },
              {
                type: "text",
                text: " Saving is treated as a first-class user action and writes project state to S3 so work remains available across classrooms, devices, and grading flows.",
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "The design balances IDE-level capability with classroom constraints by isolating execution paths while preserving a single coherent teaching surface.",
          },
        ],
      },
    ],
  },
  organizationLicenseModel: {
    id: "diagram-organization-license-model",
    type: "diagram",
    title: "Organization & License Model",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

User[User Identity]
Personal[Personal Projects]
Org[Organization Membership]
License[Organization License]
Gate[Access Gate]
Classroom[Classroom Features]
ReadOnly[Read-Only Project Access]
Teachers[Teachers]
Students[Students]

User ==> Personal
User ==> Org
Org ==> License ==> Gate
Gate ==>|Valid| Classroom
Gate ==>|Expired| ReadOnly
Classroom ==> Teachers
Classroom ==> Students`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

User[User Identity]

subgraph Ownership[Ownership Boundary]
  Personal[Personal Projects]
  Membership[Organization Membership]
end

subgraph Governance[License Governance]
  License[Active / Expired License]
  Gate[Access Gate]
  ReadOnly[Read-Only Continuity]
end

subgraph Classroom[Institutional Usage]
  ClassroomShell[Classroom Workspace]
  Teachers[Teacher Access]
  Students[Student Access]
end

User ==> Personal
User ==> Membership
Membership ==> License ==> Gate
Gate ==>|Valid| ClassroomShell
Gate ==>|Expired| ReadOnly
ClassroomShell ==> Teachers
ClassroomShell ==> Students`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Purpose." },
          {
            type: "text",
            text: " The model separates user identity, personal ownership, and institutional entitlement so multi-tenant access rules do not corrupt individual project data.",
          },
        ],
      },
      {
        type: "p",
        children: [
          { type: "strong", text: "Identity and ownership." },
          {
            type: "text",
            text: " Users exist independently of organizations, which means they can retain personal projects even when their classroom or school access changes.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Licenses govern capability, not identity." },
              {
                type: "text",
                text: " Organizational licenses determine whether classroom tooling is interactive, but they do not erase underlying user or project records.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Expiration degrades safely." },
              {
                type: "text",
                text: " An expired subscription moves institutional work into read-only mode so historical artifacts remain visible without allowing uncontrolled mutation.",
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "Separating identity, ownership, and licensing created a scalable foundation for supporting multiple schools without entangling user data with subscription state.",
          },
        ],
      },
    ],
  },
  classroomFlow: {
    id: "diagram-classroom-flow",
    type: "diagram",
    title: "Classroom → Project Flow",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

User[User]
Entry[Classrooms Page]
Teacher[Teacher Classroom List]
Student[Student Classroom List]
Dashboard[Classroom Dashboard]
Lessons[Lesson List]
Resolver[Project Resolver]
Existing[Open Existing Project]
Clone[Clone Lesson Template]
Project[Student Project + Grade Record]

User ==> Entry
Entry ==>|Teacher| Teacher
Entry ==>|Student| Student
Teacher ==> Dashboard
Student ==> Dashboard
Dashboard ==> Lessons ==> Resolver
Resolver ==>|Existing Work| Existing
Resolver ==>|No Prior Work| Clone ==> Project`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

User[Authenticated \nUser] ==> Entry[Classrooms \nPage]

subgraph Routing[Role-Aware Routing]
  Teacher[Teacher \nClassroom List]
  Student[Student \nClassroom List]
end

subgraph Workspace[Shared \nClassroom Workspace]
  Dashboard[Classroom \nDashboard]
  Lessons[Lesson \nList]
  Resolver[Project \nResolver]
end

subgraph Outcome[Project Outcome]
  Existing[Open \nExisting Project]
  Clone[Clone \nLesson Template]
  Grade[Initialize Project \n+ \nGrade Record]
end

Entry ==>|Teacher| Teacher
Entry ==>|Student| Student
Teacher ==> Dashboard
Student ==> Dashboard
Dashboard ==> Lessons ==> Resolver
Resolver ==>|Existing Work| Existing
Resolver ==>|No Prior Work| Clone ==> Grade`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Purpose." },
          {
            type: "text",
            text: " This flow shows how classroom context resolves into executable student work while preserving deterministic behavior for both teachers and students.",
          },
        ],
      },
      {
        type: "p",
        children: [
          { type: "strong", text: "Role-aware entry." },
          {
            type: "text",
            text: " Both user types enter through the same top-level classroom surface, then split into role-specific lists before converging at a shared dashboard model.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Project resolution is deterministic." },
              {
                type: "text",
                text: " When a lesson is selected, the resolver either loads prior work or clones a fresh project from the lesson template using the same decision path every time.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Assessment metadata is created with the project." },
              {
                type: "text",
                text: " New student work is initialized alongside grading context so instructional progress and evaluation remain attached from the start.",
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "The resolver removed friction between instruction and execution by making project startup predictable regardless of user role or prior work state.",
          },
        ],
      },
    ],
  },
  curriculumModel: {
    id: "diagram-curriculum-model",
    type: "diagram",
    title: "Curriculum Composition Model",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Org[Organization]
Dashboard[Curriculum Dashboard]
Course[Course]
Unit[Unit]
Lesson[Lesson]
Template[Lesson Template]
Resources[Lesson Resources]
Classroom[Classroom Usage]

Org ==> Dashboard ==> Course ==> Unit ==> Lesson
Lesson ==> Template
Lesson ==> Resources
Course ==> Classroom`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Structure[Structural Composition]
  Org[Organization]
  Dashboard[Curriculum Dashboard]
  Course[Course]
  Unit[Unit]
  Lesson[Lesson]

  Org ==> Dashboard ==> Course ==> Unit ==> Lesson
end

subgraph Execution[Execution Boundary]
  Template[Lesson Template]
  Classroom[Classroom Usage]
end

subgraph Extensibility[Extensibility Surface]
  Resources[Lesson Resources]
end

Lesson ==> Template
Lesson ==> Resources
Course ==> Classroom`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Composable curriculum architecture." },
          {
            type: "text",
            text: " The system models curriculum as a strict hierarchy from organization to lesson, which keeps authoring structure stable while allowing classrooms to consume content without owning it.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Structure is centralized." },
              {
                type: "text",
                text: " Organizations manage dashboards, courses, units, and lessons in one compositional chain rather than duplicating content into every classroom.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Execution is isolated." },
              {
                type: "text",
                text: " Classrooms consume lesson outputs and templates while leaving the source curriculum graph intact, protecting active instruction from structural edits.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Templates provide indirection." },
              {
                type: "text",
                text: " Lessons can evolve through stable template references and resource attachments instead of mutating classroom copies directly.",
              },
            ],
          },
        ],
      },
      {
        type: "blockquote",
        children: [
          {
            type: "text",
            text: "This composition model made curriculum reuse practical across organizations while preserving clear boundaries between authoring and live classroom execution.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
