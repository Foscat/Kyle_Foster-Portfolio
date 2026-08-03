/**
 * @file diagrams.js
 * @description Product-story diagrams for the hands-free repair hackathon project.
 * @module assets/data/content/hackathon/diagrams
 */

import {
  diagramConfig,
  resolveDiagram,
  diagram,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  repairWorkflow: {
    id: "diagram-hands-free-repair-workflow",
    type: "diagram",
    title: "Hands-Free Repair Flow",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Tech[Technician + Current Repair]
Capture[Voice Capture]
Intent[NLP Intent Parser]
Confidence{Intent Clear?}
Clarify[Ask for Clarification]
Context[Load Repair Context]
Resolve[Resolve Current Step]
Guide[Speak Guidance]
Action[Perform Physical Action]
Confirm{Step Confirmed?}
Complete[Repair Complete]
Next[Advance Workflow State]

Tech ==> Capture ==> Intent ==> Confidence
Confidence ==>|No| Clarify -. retry command .-> Tech
Confidence ==>|Yes| Context ==> Resolve ==> Guide ==> Action ==> Confirm
Confirm ==>|Yes + Final| Complete
Confirm ==>|Yes + More Steps| Next -. next command .-> Tech
Confirm ==>|No| Guide`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Input[Hands-Free Input]
  Tech[Technician + Current Repair]
  Capture[Voice Capture]
  Intent[NLP Intent Parser]
  Confidence{Intent Clear?}
  Clarify[Ask for Clarification]
end

subgraph Workflow[Repair-State Resolution]
  Context[Load Repair Context]
  Resolve[Resolve Current Step]
  Next[Advance Workflow State]
end

subgraph Guidance[Guidance + Confirmation]
  Guide[Speak Guidance]
  Action[Perform Physical Action]
  Confirm{Step Confirmed?}
  Complete[Repair Complete]
end

Tech ==> Capture ==> Intent ==> Confidence
Confidence ==>|No| Clarify -. retry command .-> Tech
Confidence ==>|Yes| Context ==> Resolve ==> Guide ==> Action ==> Confirm
Confirm ==>|Yes + Final| Complete
Confirm ==>|Yes + More Steps| Next -. next command .-> Tech
Confirm ==>|No| Guide`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The hands-free workflow now distinguishes recognition from repair-state resolution. Unclear intent prompts a clarification instead of advancing the repair, while confirmed physical work either completes the repair or updates the current step before the technician issues the next command.",
          },
        ],
      },
    ],
  },
  voiceCommands: {
    id: "diagram-voice-command-lifecycle",
    type: "diagram",
    title: "Voice Command Lifecycle",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

Tech[Technician]
Capture[Voice Capture]
STT[Speech-to-Text]
Intent[NLP Intent]
Clear{Confidence Sufficient?}
Clarify[Clarification Prompt]
Lambda[AWS Lambda]
Engine[Instruction Engine]
Step[Resolved Repair Step]
Final{Repair Complete?}
Audio[Spoken Guidance]
Done[Completion Confirmation]

Tech ==> Capture ==> STT ==> Intent ==> Clear
Clear ==>|No| Clarify -. repeat .-> Tech
Clear ==>|Yes| Lambda ==> Engine ==> Step ==> Final
Final ==>|No| Audio -. next command .-> Tech
Final ==>|Yes| Done`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.SEQUENCE_INIT,
        `sequenceDiagram
participant Tech as Technician
participant Mic as Voice Capture
participant STT as Speech-to-Text
participant NLP as NLP Engine
participant Lambda as AWS Lambda
participant Engine as Instruction Engine
participant Audio as Audio Output

Tech ->> Mic: Speak repair command
Mic ->> STT: Capture audio stream
STT -->> NLP: Return transcript
alt Intent confidence is low
  NLP -->> Audio: Request clarification
  Audio -->> Tech: Ask technician to repeat
else Intent is actionable
  NLP ->> Lambda: Send structured intent
  Lambda ->> Engine: Resolve current repair step
  Engine -->> Lambda: Return step and completion state
  alt Repair has more steps
    Lambda -->> Audio: Send next instruction
    Audio -->> Tech: Speak guidance
  else Repair is complete
    Lambda -->> Audio: Send completion confirmation
    Audio -->> Tech: Confirm repair completion
  end
end`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "One command can now end in clarification, next-step guidance, or repair completion. Speech-to-text and NLP establish confidence before Lambda requests repair context, preventing an ambiguous transcript from silently advancing the workflow.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
