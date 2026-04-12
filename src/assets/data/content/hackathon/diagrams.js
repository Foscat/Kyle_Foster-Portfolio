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
    title: "Hands-Free Repair Workflow",
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
          { type: "strong", text: "Architectural intent." },
          {
            type: "text",
            text: " This hackathon prototype models a voice-driven repair assistant as a closed operational loop rather than a one-shot speech demo.",
          },
        ],
      },
      {
        type: "p",
        children: [
          { type: "strong", text: "Input abstraction layer." },
          {
            type: "text",
            text: " Technician speech becomes the primary control surface, removing the need to touch a screen or keyboard in the middle of a repair task.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Speech is normalized into intent." },
              {
                type: "text",
                text: " Audio is transcribed and interpreted through an NLP stage so free-form commands can map to structured workflow actions.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Cloud logic holds workflow state." },
              {
                type: "text",
                text: " Lambda functions act as a lightweight orchestration layer that can evaluate prior step context before issuing the next instruction.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Guidance re-enters the physical workflow." },
              {
                type: "text",
                text: " The system returns spoken instructions so the operator can continue working hands-free and immediately feed the next action back into the same loop.",
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
            text: "Even under hackathon constraints, the design hinted at a scalable event-driven workflow assistant for industrial repair and guided maintenance.",
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
          { type: "strong", text: "Lifecycle view." },
          {
            type: "text",
            text: " This diagram isolates the command path itself: capture, transcription, intent extraction, orchestration, and spoken feedback.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Human input remains natural." },
              {
                type: "text",
                text: " The technician never needs to convert repair intent into rigid command syntax up front.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Interpretation and execution are separated." },
              {
                type: "text",
                text: " Speech-to-text and NLP stages handle understanding, while downstream logic focuses on repair-state resolution and response generation.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Output closes the loop." },
              {
                type: "text",
                text: " Audio guidance is not a terminal event; it directly informs the next technician action and keeps the workflow cyclical.",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams).map(resolveDiagram);
