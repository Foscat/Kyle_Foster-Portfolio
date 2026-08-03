/**
 * @file diagrams.js
 * @description Product-story diagrams for the CodeStream Studios case study.
 * @module assets/data/content/codestream/diagrams
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
    title: "3-Panel Editor - Delivery Architecture",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Lesson[Lesson Markdown]
Panel[Instruction Panel]
Editor[Ace Editor]
Action{Run or Save?}
Router[Execution Router]
Web[Sandboxed Web Runtime]
Python[In-Browser Python Runtime]
Output[Rendered Output or Terminal]
Diagnostics{Runtime Successful?}
Fix[Edit from Diagnostics]
Save[Explicit Save Action]
Store[(AWS S3 Project Storage)]
Access[Teacher + Student Retrieval]
Feedback[Teacher Feedback]

Lesson ==> Panel ==> Editor ==> Action
Action ==>|Run Web| Router ==> Web ==> Output ==> Diagnostics
Action ==>|Run Python| Router ==> Python ==> Output
Diagnostics ==>|No| Fix -. revise .-> Editor
Diagnostics ==>|Yes| Save ==> Store ==> Access ==> Feedback
Feedback -. next revision .-> Editor`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Authoring[Authoring Surface]
  Lesson[Lesson Markdown]
  Panel[Instruction Panel]
  Editor[Ace Editor]
  Action{Run or Save?}
end

subgraph Runtime[Execution + Diagnostics]
  Router[Execution Router]
  Web[Sandboxed Web Runtime]
  Python[In-Browser Python Runtime]
  Output[Rendered Output or Terminal]
  Diagnostics{Runtime Successful?}
  Fix[Edit from Diagnostics]
end

subgraph Persistence[Persistence + Review]
  Save[Explicit Save Action]
  Store[(AWS S3 Project Storage)]
  Access[Teacher + Student Retrieval]
  Feedback[Teacher Feedback]
end

Lesson ==> Panel ==> Editor ==> Action
Action ==>|Run Web| Router ==> Web ==> Output ==> Diagnostics
Action ==>|Run Python| Router ==> Python ==> Output
Diagnostics ==>|No| Fix -. revise .-> Editor
Diagnostics ==>|Yes| Save ==> Store ==> Access ==> Feedback
Action ==>|Save| Save
Feedback -. next revision .-> Editor`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The editor connects lesson context to a deliberate run-or-save decision. Web and Python work share an execution router but use separate browser runtimes; diagnostics return students to editing, while successful work can be saved to S3, retrieved in classroom context, and revised from teacher feedback.",
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
Membership[Organization Membership]
Role{Resolved Role?}
License{License Active?}
Gate[Institutional Access Gate]
Permissions[Role Permissions]
Classroom[Classroom Workspace]
ReadOnly[Read-Only Continuity]
Renewal[License Renewal]
Teacher[Teacher Capabilities]
Student[Student Capabilities]

User ==> Personal
User ==> Membership ==> Role
Role ==>|Teacher or Student| License
Role ==>|No Membership| Personal
License ==>|Active| Gate ==> Permissions
Permissions ==> Teacher
Permissions ==> Student
Teacher ==> Classroom
Student ==> Classroom
License ==>|Expired| ReadOnly ==> Renewal -. restore .-> License`
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
  Role{Resolved Role?}
end

subgraph Governance[License Governance]
  License{License Active?}
  Gate[Institutional Access Gate]
  ReadOnly[Read-Only Continuity]
  Renewal[License Renewal]
end

subgraph Institutional[Institutional Capabilities]
  Permissions[Role Permissions]
  Teacher[Teacher Capabilities]
  Student[Student Capabilities]
  Classroom[Classroom Workspace]
end

User ==> Personal
User ==> Membership ==> Role
Role ==>|Teacher or Student| License
Role ==>|No Membership| Personal
License ==>|Active| Gate ==> Permissions
Permissions ==> Teacher ==> Classroom
Permissions ==> Student ==> Classroom
License ==>|Expired| ReadOnly ==> Renewal -. restore .-> License`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Identity and personal projects remain independent of organization membership. Membership resolves a classroom role, active licensing opens role-specific capabilities, and expiration preserves historical work as read-only until renewal restores institutional access.",
          },
        ],
      },
    ],
  },
  classroomFlow: {
    id: "diagram-classroom-flow",
    type: "diagram",
    title: "Classroom to Project Flow",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

User[Authenticated User]
Entry[Classrooms Page]
Role{Teacher or Student?}
Teacher[Teacher Classroom List]
Student[Student Classroom List]
Dashboard[Classroom Dashboard]
Allowed{Lesson Access Allowed?}
Denied[Access Guidance]
Lesson[Selected Lesson]
Existing{Project Exists?}
Open[Open Existing Project]
Clone[Clone Lesson Template]
Project[Student Project + Grade Record]
Submit[Submit Work]
Feedback[Grade + Feedback]

User ==> Entry ==> Role
Role ==>|Teacher| Teacher ==> Dashboard
Role ==>|Student| Student ==> Dashboard
Dashboard ==> Allowed
Allowed ==>|No| Denied -. choose classroom .-> Entry
Allowed ==>|Yes| Lesson ==> Existing
Existing ==>|Yes| Open ==> Submit
Existing ==>|No| Clone ==> Project ==> Submit
Submit ==> Feedback -. revise .-> Open`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

User[Authenticated User]

subgraph Routing[Role-Aware Entry]
  Entry[Classrooms Page]
  Role{Teacher or Student?}
  Teacher[Teacher Classroom List]
  Student[Student Classroom List]
end

subgraph Workspace[Classroom Workspace]
  Dashboard[Classroom Dashboard]
  Allowed{Lesson Access Allowed?}
  Denied[Access Guidance]
  Lesson[Selected Lesson]
  Existing{Project Exists?}
end

subgraph Outcome[Project + Feedback]
  Open[Open Existing Project]
  Clone[Clone Lesson Template]
  Project[Student Project + Grade Record]
  Submit[Submit Work]
  Feedback[Grade + Feedback]
end

User ==> Entry ==> Role
Role ==>|Teacher| Teacher ==> Dashboard
Role ==>|Student| Student ==> Dashboard
Dashboard ==> Allowed
Allowed ==>|No| Denied -. choose classroom .-> Entry
Allowed ==>|Yes| Lesson ==> Existing
Existing ==>|Yes| Open ==> Submit
Existing ==>|No| Clone ==> Project ==> Submit
Submit ==> Feedback -. revise .-> Open`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Role-aware entry converges on one classroom dashboard, where lesson permissions are checked before project resolution. Existing work opens directly, first-time work clones the lesson template with a grade record, and submitted work returns through feedback for revision.",
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
Lesson[Lesson Draft]
Validate{Ready to Publish?}
Revision[Revise Structure or Content]
Published[Published Lesson]
Template[Reusable Project Template]
Resources[Lesson Resources]
Classroom[Classroom Assignment]
Project[Student Project Instance]
Feedback[Delivery Feedback]

Org ==> Dashboard ==> Course ==> Unit ==> Lesson ==> Validate
Validate ==>|No| Revision -. update .-> Lesson
Validate ==>|Yes| Published
Published ==> Template
Published ==> Resources
Course ==> Classroom ==> Published ==> Project
Feedback -. future revision .-> Lesson
Project ==> Feedback`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Authoring[Central Authoring]
  Org[Organization]
  Dashboard[Curriculum Dashboard]
  Course[Course]
  Unit[Unit]
  Lesson[Lesson Draft]
  Validate{Ready to Publish?}
  Revision[Revise Structure or Content]
  Published[Published Lesson]
end

subgraph Reuse[Reusable Lesson Assets]
  Template[Project Template]
  Resources[Lesson Resources]
end

subgraph Delivery[Isolated Classroom Delivery]
  Classroom[Classroom Assignment]
  Project[Student Project Instance]
  Feedback[Delivery Feedback]
end

Org ==> Dashboard ==> Course ==> Unit ==> Lesson ==> Validate
Validate ==>|No| Revision -. update .-> Lesson
Validate ==>|Yes| Published
Published ==> Template
Published ==> Resources
Course ==> Classroom ==> Published ==> Project ==> Feedback
Feedback -. future revision .-> Lesson`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Curriculum remains centrally authored through course, unit, and lesson composition. Publication validates the draft before exposing reusable templates and resources; classrooms consume the published structure as assignments, while delivery feedback informs a future revision without rewriting existing student projects.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
