/**
 * @file src\assets\data\content\hackathon\diagrams.js
 * @description src\assets\data\content\hackathon\diagrams module.
 * @module src\assets\data\content\hackathon\diagrams
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

Tech[Technician\n Action]
Command[Voice\n Command]
STT[Speech-to-Text]
Intent[NLP\n Intent Parser]
Cloud[AWS Lambda\n Orchestration]
Guide[Instruction\n Resolver]
Audio[Audio\n Guidance]

Tech ==> Command ==> STT ==> Intent ==> Cloud ==> Guide ==> Audio ==> Tech`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph Input[Input\n Boundary]
  Tech[Technician\n Action]
  Command[Voice\n Command]
  STT[Speech-to-Text]
end

subgraph Logic[Intent + Workflow Logic]
  Intent[NLP\n Intent Parser]
  Cloud[AWS Lambda\n Orchestration]
  Resolver[Repair-Step\n Resolver]
end

subgraph Output[Guidance Output]
  Audio[Audio\n Guidance]
  Feedback[Next\n Physical Action]
end

Tech ==> Command ==> STT ==> Intent ==> Cloud ==> Resolver ==> Audio ==> Feedback ==> Tech`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "This system-level view shows the complete hands-free repair loop. Technician speech becomes structured intent, AWS Lambda coordinates the current repair state, and the resolver returns spoken guidance. Each physical action feeds the next command back into the same workflow.",
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
NLP[NLP Engine]
Lambda[AWS Lambda]
Engine[Instruction Engine]
Audio[Audio Output]

Tech ==> Capture ==> STT ==> NLP ==> Lambda ==> Engine ==> Audio ==> Tech`
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
STT -->> NLP: Transcribed text
NLP ->> Lambda: Structured intent
Lambda ->> Engine: Resolve current repair step
Engine -->> Audio: Next instruction
Audio -->> Tech: Spoken guidance`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "This sequence-level view isolates one command. Voice capture sends audio through speech-to-text and NLP, Lambda requests the current repair step from the instruction engine, and audio output returns the next instruction to the technician.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
