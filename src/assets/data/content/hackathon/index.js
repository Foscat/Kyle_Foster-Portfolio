/**
 * @file src\assets\data\content\hackathon\index.js
 * @description src\assets\data\content\hackathon\index module.
 * @module src\assets\data\content\hackathon\index
 */

import {
  faCircleExclamation,
  faCommentNodes,
  faHeadset,
  faLightbulb,
  faMobileScreenButton,
  faRoute,
  faTicket,
  faTowerObservation,
  faTruckFast,
  faTruckFront,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "types/ui.types.js";
import diagrams from "./diagrams.js";
import imageObjs from "assets/images/hackathon";

/**
 * @description Hackathon experience ------------------------------------------------------------ This file powers the Hackathon portfolio page using a data-driven approach. It is designed to work with: - Sticky Section Nav - AccordionList - InfoSection / ClickableImg / diagramDiagram components All UI layout should be derived from this data structure. /
 */

const hackathonSections = [
  {
    id: "overview",
    title: "How We Won",
    subtitle:
      "How a junior developer team won Daimler's 2019 Hackathon by solving the practical repair problem first.",
    icon: faTruckFront,
    isScroller: true,
    blocks: [
      {
        id: "overview-text",
        type: BlockType.RICH_TEXT,
        icon: faTowerObservation,
        title: "My Hackathon Journey",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "The Daimler Trucking Hackathon (2019) was an early inflection point in my development career.",
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
                text: "Shortly after completing my second bootcamp, I joined a small team focused on improving technician repair workflows for a large enterprise environment.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Competing against more experienced teams, we prioritized practical shop needs over presentation polish. The solution was designed around actual technician behavior, not abstract feature lists.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Our approach won the event.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "After the hackathon, several team members invested their winnings to continue the project. I became the sole developer and independently learned ",
              },
              {
                type: "strong",
                children: [{ type: "text", text: "React Native" }],
              },
              {
                type: "text",
                text: " to convert the original web prototype into a mobile application.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The project later ended because of leadership and contract issues, but the work accelerated my growth in product ownership, delivery, and governance.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Key takeaway: practical delivery and adaptability matter more than seniority labels.",
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
            id: "hackathon-who-it-served",
            title: "Who It Served",
            subtitle: "Fleet technicians and repair teams",
            icon: faTruckFast,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The solution supported technicians in active repair environments who needed step-by-step guidance without interrupting hands-on mechanical work.",
                  },
                ],
              },
            ],
          },
          {
            id: "hackathon-problem-solved",
            title: "Main Challenge",
            subtitle: "Instruction delivery disrupted repair flow",
            icon: faCircleExclamation,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Technicians had to switch between tools and instructions, which slowed repairs and made timing and feedback data less reliable.",
                  },
                ],
              },
            ],
          },
          {
            id: "hackathon-solution",
            title: "Custom Software Response",
            subtitle: "Voice-first, hands-free repair guidance",
            icon: faLightbulb,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "We built a voice-guided assistant that delivered spoken steps, captured progress data, and worked within existing shop conditions without new hardware.",
                  },
                ],
              },
            ],
          },
          {
            id: "hackathon-what-i-owned",
            title: "What I Owned",
            subtitle: "Core implementation and post-event continuation",
            icon: faHeadset,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "I co-built the core hackathon implementation, then became the sole developer after the event and rebuilt the product path in React Native for mobile delivery.",
                  },
                ],
              },
            ],
          },
          {
            id: "hackathon-what-changed",
            title: "What Changed",
            subtitle: "Winning prototype with durable lessons",
            icon: faRoute,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The team won the Daimler event, and the work proved the concept under pressure while accelerating my growth in architecture and product ownership.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "overview-links",
        type: BlockType.LINKS,
        items: [
          {
            id: "org-event-link",
            title: "See Event Info",
            url: "https://www.eventbrite.com/e/mobilityx-hr-hackathon-presented-by-daimler-financial-services-tickets-49355982071",
            icon: faTicket,
            ariaLabel: "View the original event information",
            local: false,
            isScroller: false,
          },
          {
            id: "overview-tech-assist-link",
            title: "View Tech Assist Build",
            url: "https://github.com/Foscat/TechAssist_Public",
            icon: faHeadset,
            ariaLabel: "View the post-hackathon mobile app project",
            local: false,
            isScroller: false,
          },
        ],
      },
      {
        id: "overview-image",
        type: BlockType.IMAGE_GALLERY,
        title: "Building with the Team",
        icon: faCommentNodes,
        items: [imageObjs.focused],
      },
    ],
  },
  {
    id: "reinforce",
    slug: "reinforce",
    title: "Reinforce App",
    navLabel: "Reinforce App",
    subtitle: "A hands-free, voice-powered repair assistant.",
    icon: faTruckFast,
    isScroller: true,
    blocks: [
      {
        id: "problem-statement",
        type: BlockType.RICH_TEXT,
        title: "Challenge: Hands-Busy Repair Workflows",
        icon: faCircleExclamation,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "Technician repair work was slowed by screen- and paper-based instruction systems.",
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
                text: "Repair procedures required technicians to reference external materials, interrupting hands-on work and introducing inconsistencies in how steps were executed.",
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
                    text: "Hands were frequently diverted from tools to screens or documentation.",
                  },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Step adherence varied between technicians." }],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Repair timing data lacked reliable step-level granularity.",
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
                text: "Daimler also needed a way to capture insights from high-performing technicians and turn them into process improvements.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Feedback was hard to submit and easy to ignore." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "There was no clear link between suggested improvements and repair performance.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Optimization efforts lacked empirical validation." },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The challenge was to design a real-time, voice-driven repair assistant that:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Guided technicians hands-free." }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Captured step-level timing data automatically." },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Enabled frictionless performance feedback." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Required no additional hardware investment." }],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Challenge: improve repair efficiency without increasing mental load or infrastructure cost.",
              },
            ],
          },
        ],
      },
      {
        id: "team-photo",
        type: BlockType.IMAGE_GALLERY,
        title: 'Meet the Team "Reinforce"',
        items: [imageObjs.groupPhoto],
      },
      {
        id: "the-solution",
        type: BlockType.RICH_TEXT,
        title: "Solution: Voice-First Repair Assistant",
        icon: faLightbulb,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "We built a voice-operated repair assistant technicians could use hands-free.",
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
                text: "The system delivered step-by-step repair guidance through synthesized speech while capturing real-time progress and timing data.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The architecture was modular and assembled rapidly during the hackathon:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Backend foundation built from my MERN starter template." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "XML parser to ingest and structure Daimler service documentation.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "AWS Lambda function to manage step progression and timing telemetry.",
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
                text: "My primary responsibility was the natural-language command layer.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Interpret technician speech input." }],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Translate spoken intent into structured backend commands.",
                  },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Route commands through the API layer." }],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Trigger text-to-speech responses with the next procedural step.",
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
                text: "This created a continuous interaction loop:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Listen → Interpret → Execute → Respond → Track." },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Goal: reduce interruptions while generating measurable step-level performance data.",
              },
            ],
          },
        ],
      },
      {
        id: "group-collaboration",
        type: BlockType.IMAGE_GALLERY,
        title: "Collaboration in Action",
        items: [imageObjs.chatbotting],
      },
      diagrams.repairWorkflow,

      {
        id: "focused-collaboration",
        type: BlockType.IMAGE_GALLERY,
        title: "Focused Collaboration",
        items: [imageObjs.focused],
      },
      diagrams.voiceCommands,
      {
        id: "outcome-text",
        title: "Outcome",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "The prototype enabled hands-free repair guidance with real-time progress tracking.",
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
                text: "Technicians could complete an entire repair procedure without touching a screen, while the system automatically recorded step-level timing and progress data.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Reduced repair interruptions." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Standardized step adherence." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Generated measurable performance metrics." }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The system also introduced a simple feedback mechanism, allowing technicians to suggest process improvements during the repair.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Unlike many prototypes, our solution prioritized shop fit over feature volume. It met Daimler's requirements without new hardware or added mental load.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "The combination of practicality, measurable impact, and user-centric design led to the team winning the hackathon.",
              },
            ],
          },
        ],
      },
      {
        id: "winners-circle",
        type: BlockType.IMAGE_GALLERY,
        title: "The Winners Circle",
        items: [imageObjs.check],
      },
    ],
  },
  {
    id: "tech_assist",
    slug: "tech-assist",
    title: "Post-Hackathon Work (Tech Assist)",
    subtitle:
      "Turning the hackathon prototype into a mobile app designed for real repair environments.",
    icon: faMobileScreenButton,
    isScroller: true,
    blocks: [
      {
        id: "transition-text",
        type: BlockType.RICH_TEXT,
        title: "Transition",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: 'Following the hackathon, the prototype transitioned into a formal product initiative under the name Reinforce ("Tech Assist").',
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
                text: "I became the sole developer responsible for turning the proof of concept into a production-ready mobile application.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Daimler's expectations expanded the scope significantly. The system needed to support:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Native iOS and Android deployment." }],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Offline-first operation in low-connectivity warehouse environments.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Efficient processing of large, deeply nested XML instruction sets.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Scalable backend support across hundreds of repair types and truck models.",
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
                text: "The XML documentation introduced structural complexity beyond the hackathon prototype.",
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
                    text: "Multi-level hierarchical nesting (procedures, sub-procedures, grouped steps).",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Cross-referenced instruction blocks reused across repair types.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Embedded conditional branches for model-specific variations.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Metadata tied to timing, safety flags, and required tooling.",
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
                text: "In-memory parsing no longer worked on mobile. To support performance and offline use, I refactored XML processing into preprocessed, normalized instruction data that the app could query efficiently.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Migrated core logic into modular microservices." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Rebuilt architecture around mobile-first requirements." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Redesigned step coordination for high-demand technician environments.",
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
                text: "The project shifted from rapid prototyping to long-term architectural accountability.",
              },
            ],
          },
        ],
      },
      {
        id: "development-challenges",
        type: BlockType.RICH_TEXT,
        title: "Development & Challenges",
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "The transition to production required refining scope and architecture with Daimler stakeholders.",
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
                text: "Planning sessions clarified operational expectations, performance needs, and long-term scalability requirements.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "To meet cross-platform requirements efficiently, I selected ",
              },
              {
                type: "strong",
                children: [{ type: "text", text: "React Native" }],
              },
              {
                type: "text",
                text: " for unified iOS and Android deployment while maintaining rapid iteration capability.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "A major engineering challenge involved restructuring the XML processing pipeline.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Ported Python-based XML parsing logic into JavaScript." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Migrated parsing into a dedicated server-side microservice.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Expanded the parser to locate the correct file among 500+ instruction sets spanning five truck types.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Implemented keyword-driven matching from technician speech input to identify the intended repair procedure.",
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
                text: "The resulting flow worked as follows:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Technician requests a service via voice command." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Backend resolves the appropriate XML instruction file." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Microservice parses and structures the instruction set." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Application delivers step guidance through synthesized speech.",
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
                text: "The system combined natural-language input, document matching, and structured procedure parsing into a continuous hands-free repair flow.",
              },
            ],
          },
        ],
      },
      /**
       * @description Tech Assist Logo Image
       */
      {
        id: "tech-assist-logo",
        type: BlockType.IMAGE_GALLERY,
        title: "Tech Assist Branding",
        items: [imageObjs.taLogo],
      },
      {
        id: "outcome-text",
        type: BlockType.RICH_TEXT,
        title: "Outcome",
        icon: faRoute,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "The post-hackathon project ended before reaching production deployment.",
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
                text: "We made strong progress on requirements, architecture, and the mobile implementation, but contract and organizational issues ended further development.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The experience showed the risks that arise when technical work and business governance are not aligned under clear agreements.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Technical ownership without contractual protection." },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Ambiguous decision-making authority." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Misaligned incentives between stakeholders." }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Even though the project ended, the experience accelerated my growth in mobile architecture, microservice design, offline-first systems, and large-scale document modeling.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Key lesson: sustainable products require both technical rigor and structured governance.",
              },
            ],
          },
        ],
      },
    ],
  },
];
Object.freeze(hackathonSections);
export default hackathonSections;
