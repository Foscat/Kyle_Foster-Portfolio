/**
 * @file diagrams.js
 * @description Home-page diagram block definitions used by section data composition.
 * @module assets/data/content/home/diagrams
 */

import {
  diagramConfig,
  resolveDiagram,
  diagram,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  engineeringFlow: {
    id: "hero-engineering-flow",
    title: "Engineering Process",
    type: "diagram",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

    Context[Problem + Domain Context]
    Constraints[Rules + Constraints]
    Fit{Problem Framed Clearly?}
    Reframe[Research + Reframe]
    Ux[UX + Interaction Model]
    Build[Implementation + Integration]
    Verify[Automated + Browser Testing]
    Ready{Release Ready?}
    Deploy[Deploy + Observe]
    Feedback[Production Feedback]

    Context ==> Constraints ==> Fit
    Fit ==>|No| Reframe -. clarify .-> Context
    Fit ==>|Yes| Ux ==> Build ==> Verify ==> Ready
    Ready ==>|No| Build
    Ready ==>|Yes| Deploy ==> Feedback
    Feedback -. next iteration .-> Ux`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

    subgraph Discovery[Discovery + Alignment]
      Context[Problem + Domain Context]
      Constraints[Rules + Constraints]
      Fit{Problem Framed Clearly?}
      Reframe[Research + Reframe]
    end

    subgraph Delivery[Design + Delivery]
      Ux[UX + Interaction Model]
      Build[Implementation + Integration]
      Verify[Automated + Browser Testing]
      Ready{Release Ready?}
    end

    subgraph Learning[Release + Learning]
      Deploy[Deploy + Observe]
      Feedback[Production Feedback]
    end

    Context ==> Constraints ==> Fit
    Fit ==>|No| Reframe -. clarify .-> Context
    Fit ==>|Yes| Ux ==> Build ==> Verify ==> Ready
    Ready ==>|No| Build
    Ready ==>|Yes| Deploy ==> Feedback
    Feedback -. next iteration .-> Ux`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "How I ship." },
          {
            type: "text",
            text: " I clarify the domain and constraints before committing to a solution, reframe weak assumptions, and then move through interaction design, implementation, and evidence-based release checks. Failed checks return to delivery work, while observed production feedback shapes the next iteration.",
          },
        ],
      },
    ],
  },
  platformDesign: {
    id: "professional-platform-diagram",
    title: "Platform Architecture",
    type: "diagram",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

    Student([Student])
    Teacher([Teacher])
    Admin([Admin])
    Gate{Licensed Access?}
    Org[Organizations + Roles]
    Content[Lesson Content]
    IDE[3-Panel IDE]
    Runtime[Web + Python Runtime]
    Projects[(Project Storage)]
    Classroom[Classroom Workspace]
    Grading[Feedback + Reports]
    Personal[Personal Project Access]

    Admin ==> Org ==> Gate
    Student ==> Gate
    Teacher ==> Gate
    Gate ==>|Licensed| Content ==> IDE ==> Runtime
    IDE ==> Projects
    Teacher ==> Classroom ==> Grading
    Projects ==> Classroom
    Gate ==>|No License| Personal ==> Projects`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

    Student([Student])
    Teacher([Teacher])
    Admin([Admin])

    subgraph Governance[Organization Governance]
      Org[Organizations + Roles]
      Gate{Licensed Access?}
      Personal[Personal Project Access]
    end

    subgraph Learning[Learning Workspace]
      Content[Lesson Content]
      IDE[3-Panel Browser IDE]
      Runtime[Web + Python Runtime]
      Projects[(Project Storage)]
    end

    subgraph Instruction[Classroom Operations]
      Classroom[Classroom Workspace]
      Grading[Feedback + Reports]
    end

    Admin ==> Org ==> Gate
    Student ==> Gate
    Teacher ==> Gate
    Gate ==>|Licensed| Content ==> IDE ==> Runtime
    IDE ==> Projects ==> Classroom ==> Grading
    Teacher ==> Classroom
    Gate ==>|No License| Personal ==> Projects`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Three connected systems." },
          {
            type: "text",
            text: " Organization roles and license state determine the institutional entry path without taking away personal project ownership. Lesson content moves through the browser IDE and its web or Python runtime, saved projects feed the classroom workspace, and teachers complete the loop through feedback and reporting.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
