/**
 * @file diagrams.js
 * @description Home-page diagram block definitions used by section data composition.
 * @module assets/data/content/home/diagrams
 */

import { BlockType } from "types/ui.types.js";
import {
  diagramConfig,
  resolveDiagram,
  diagram,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  engineeringFlow: {
    id: "hero-engineering-flow",
    title: "Engineering Workflow",
    type: BlockType.DIAGRAM,
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB
    
    Problem[Problem + Domain Context]
    Model[Domain Model + Constraints]
    Ux[UX + Interaction Design]
    Build[Implementation + Integration]
    Verify[Testing + Feedback]
    Deploy[Deploy + Observe]
    
    Problem ==> Model ==> Ux ==> Build ==> Verify ==> Deploy
    Verify -. refine .-> Model
    Deploy -. iterate .-> Ux`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR
    
    Problem[Problem + Domain Context] --> Model[Domain Model + Constraints]
    Model --> Ux[UX + Interaction Design]
    Ux --> Build[Implementation + Integration]
    Build --> Verify[Testing + Feedback]
    Verify --> Deploy[Deploy + Observe]
    Verify -. refine .-> Model
    Deploy -. iterate .-> Ux`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "How I ship." },
          {
            type: "text",
            text: " I start with domain clarity, translate that into usable interaction design, implement with system boundaries in mind, then loop through testing and production feedback to improve the next iteration.",
          },
        ],
      },
    ],
  },
  platformDesign: {
    id: "professional-platform-diagram",
    title: "Platform Architecture",
    type: BlockType.DIAGRAM,
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB
    
    subgraph Platform[CodeStream Studios Platform]
      IDE[3-Panel Browser-Based IDE\nLesson · Editor · Output]
      Classroom[Virtual Classroom & Grading\nAssignments · Feedback · Reports]
      Org[Organizations & Licensing\nRoles · Seats · Access Gates]
    end
    
    Student([Student]) --> IDE
    Teacher([Teacher]) --> IDE
    Teacher --> Classroom
    Admin([Admin]) --> Org
    Org --> Classroom`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR
    
    Student([Student]) --> IDE
    Teacher([Teacher]) --> IDE
    Teacher --> Classroom
    Admin([Admin]) --> Org
    
    subgraph Platform[CodeStream Studios Platform]
      IDE[3-Panel Browser-Based IDE]
      Classroom[Virtual Classroom + Grading]
      Org[Organizations + Licensing]
    end
    
    Org --> Classroom`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          { type: "strong", text: "Three connected systems." },
          {
            type: "text",
            text: " The IDE delivers instruction and execution. The classroom layer handles grading, feedback, and reporting. The organization layer governs roles, licensing, and seat access — all built and owned as the sole frontend engineer.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
