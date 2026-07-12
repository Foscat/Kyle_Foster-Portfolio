/**
 * @file src\assets\data\content\codestream\diagrams.js
 * @description src\assets\data\content\codestream\diagrams module.
 * @module src\assets\data\content\codestream\diagrams
 */

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
Editor[Ace Editor\nHTML · CSS · JS · Python]
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
  Editor[Ace Editor\nHTML · CSS · JS · Python]
  Lesson ==> Panel
end

subgraph Runtime[Execution Runtime]
  Router[Execution Router]
  Web[Sandboxed iframe Runtime]
  Py[In-Browser Python Runtime\nSkulpt]
  Terminal[Terminal / Rendered Output]

  Router ==>|Web| Web
  Router ==>|Python| Py
  Web ==> Terminal
  Py ==> Terminal
end

subgraph Persistence[Persistence + Retrieval]
  Save[Explicit Save Action\nCtrl + S]
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
          {
            type: "text",
            text: "The editor keeps lesson content, code, runtime output, and saving in one browser workspace. Web projects run in a sandboxed iframe, Python exercises use an in-browser runtime, and explicit saves persist project state to S3. The split runtime paths support different lesson types without changing the student's core workflow.",
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
          {
            type: "text",
            text: "The model separates user identity, personal projects, organization membership, and licensed classroom access. A license controls institutional capabilities without owning the user record. When access expires, classroom work becomes read-only while personal ownership and historical data remain intact.",
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
Resolver ==> Existing
Resolver ==> Clone ==> Project`
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
  Existing[Existing Work\nOpen Project]
  Clone[No Prior Work\nClone Lesson Template]
  Grade[Initialize Project \n+ \nGrade Record]
end

Entry ==>|Teacher| Teacher
Entry ==>|Student| Student
Teacher ==> Dashboard
Student ==> Dashboard
Dashboard ==> Lessons ==> Resolver
Resolver ==> Existing
Resolver ==> Clone ==> Grade`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Teachers and students enter through role-specific classroom lists, then converge on the same dashboard and lesson model. Selecting a lesson sends the student project resolver down one of two paths: load existing work or clone a new template with its grading context attached.",
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
          {
            type: "text",
            text: "Curriculum follows an organization-to-course-to-unit-to-lesson hierarchy. Lessons reference reusable project templates and resources, while classrooms consume the published structure without owning duplicate copies. This keeps authoring centralized and classroom delivery isolated from structural edits.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
