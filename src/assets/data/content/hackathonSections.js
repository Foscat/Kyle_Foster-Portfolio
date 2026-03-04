import {
  faCircleExclamation,
  faCommentNodes,
  faHeadset,
  faLightbulb,
  faMobileScreenButton,
  faNewspaper,
  faPersonChalkboard,
  faRoute,
  faTowerObservation,
  faTruckFast,
  faTruckFront,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "../../../types/ui.types.js";
import { diagrams } from "./diagrams.js";
import imageObjs from "../../images/hackathon/index.js";

/**
 * Hackathon experiance
 * ------------------------------------------------------------
 * This file powers the Hackathon portfolio page using a
 * data-driven approach. It is designed to work with:
 *
 * - Sticky Section Nav
 * - AccordionList
 * - InfoSection / ClickableImg / diagramDiagram components
 *
 * All UI layout should be derived from this data structure.
 */

const hackathonSections = [
  {
    id: "overview",
    title: "Overview",
    subtitle: "How a team of junior developers unexpectedly won Daimler's 2019 Hackathon.",
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
                text: "Shortly after completing my second bootcamp, I joined a small team tasked with reimagining technician workflow processes for a large enterprise environment.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Competing against more experienced teams, we focused less on presentation and more on operational practicality — designing a solution grounded in real technician constraints rather than abstract feature sets.",
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
                text: "Following the hackathon, several team members invested their winnings to pursue the project further. I became the sole developer to continue building the product and independently learned ",
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
                text: "Although the venture ultimately dissolved due to leadership and contractual misalignment, the experience accelerated my technical growth and reinforced key lessons in product ownership, execution, and governance.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Key takeaway: execution depth and adaptability matter more than seniority labels.",
              },
            ],
          },
        ],
      },
      {
        id: "overview-links",
        type: BlockType.LINKS,
        links: [
          {
            id: "overview-article-link",
            title: "Read The Article",
            url: "https://austinstartups.com/21-teams-gather-at-capital-factory-to-hack-daimler-north-americas-voice-technology-for-truck-77ed19862592",
            icon: faNewspaper,
            ariaLabel: "Read the article about the Daimler Hackathon on Austin Startups",
            local: false,
          },
          {
            id: "overview-project-link",
            title: "Hackathon Project",
            url: "#reinforce",
            icon: faPersonChalkboard,
            ariaLabel: "View the hackathon project section",
            local: true,
            isScroller: true,
          },
          {
            id: "overview-tech-assist-link",
            title: "Tech Assist Code",
            url: "#tech_assist",
            icon: faHeadset,
            ariaLabel: "View the post-hackathon Tech Assist section",
            local: true,
            isScroller: true,
          },
        ],
      },
      {
        id: "overview-image",
        type: BlockType.IMAGE_GALLERY,
        title: "Me and the team hacking",
        icon: faCommentNodes,
        images: [imageObjs.focused],
      },
    ],
  },
  {
    id: "reinforce",
    slug: "reinforce",
    title: "Hackathon App (Reinforce)",
    subtitle: "A hands-free, voice-powered repair assistant.",
    icon: faTruckFast,
    isScroller: true,
    blocks: [
      {
        id: "problem-statement",
        type: BlockType.RICH_TEXT,
        title: "The Problem",
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
                    text: "Technician workflows were constrained by screen- and paper-based instruction systems.",
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
                text: "Daimler also sought a way to capture and operationalize insights from high-performing technicians.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Feedback submission was cumbersome and underutilized." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "There was no measurable linkage between suggested improvements and workflow performance.",
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
                text: "Constraint: improve operational efficiency without increasing cognitive load or infrastructure cost.",
              },
            ],
          },
        ],
      },
      {
        id: "team-photo",
        type: BlockType.IMAGE_GALLERY,
        title: 'Meet the team "Reinforce"',
        images: [imageObjs.groupPhoto],
      },
      {
        id: "the-solution",
        type: BlockType.RICH_TEXT,
        title: "The Solution",
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
                    text: "We built a fully voice-operated repair assistant designed for hands-free execution.",
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
                text: "The system delivered step-by-step repair guidance through synthesized speech while capturing real-time progression and timing data.",
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
                text: "Design objective: reduce workflow interruption while generating measurable step-level performance data.",
              },
            ],
          },
        ],
      },
      {
        id: "group-collaboration",
        type: BlockType.IMAGE_GALLERY,
        title: "Collaboration in Action",
        images: [imageObjs.chatbotting],
      },
      diagrams.repairWorkflow,

      {
        id: "focused-collaboration",
        type: BlockType.IMAGE_GALLERY,
        title: "Focused Collaboration",
        images: [imageObjs.focused],
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
                    text: "The prototype enabled fully hands-free repair execution with real-time telemetry.",
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
                text: "Technicians could complete an entire service workflow without touching a screen, while the system automatically recorded step-level timing and progression data.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Reduced workflow interruption." }],
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
                text: "The system also introduced a low-friction feedback mechanism, allowing technicians to contribute process improvements directly within the workflow.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Unlike many competing prototypes, the solution focused on operational alignment rather than feature complexity. It addressed Daimler's stated constraints without requiring new hardware or increasing cognitive load.",
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
        images: [imageObjs.check],
      },
    ],
  },
  {
    id: "tech_assist",
    slug: "tech-assist",
    title: "Post-Hackathon Work (Tech Assist)",
    subtitle: "Transforming the hackathon prototype into a production-ready mobile app.",
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
                text: "I became the sole developer responsible for transforming the proof-of-concept into a production-grade mobile application.",
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
                text: "Naive in-memory parsing was no longer viable on mobile devices. To maintain performance and support offline execution, I refactored the system to preprocess and normalize hierarchical XML trees into optimized, queryable instruction graphs.",
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
                  { type: "text", text: "Rebuilt architecture around mobile-first constraints." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Redesigned workflow orchestration for high-demand technician environments.",
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
                    text: "The transition to production required redefining scope and architecture in collaboration with Daimler stakeholders.",
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
                text: "Multiple scope-defining sessions clarified operational expectations, performance constraints, and long-term scalability requirements.",
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
                    text: "Expanded the parser to intelligently locate the correct file among 500+ instruction sets spanning five truck types.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Implemented keyword-driven matching derived from technician speech input to resolve the intended repair workflow.",
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
                text: "The resulting system workflow operated as follows:",
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
                text: "The system combined natural-language input, intelligent document resolution, and structured procedural parsing into a continuous hands-free execution loop.",
              },
            ],
          },
        ],
      },
      /** Tech Assist Logo Image */
      {
        id: "tech-assist-logo",
        type: BlockType.IMAGE_GALLERY,
        title: "Tech Assist Branding",
        images: [imageObjs.taLogo],
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
                    text: "The post-hackathon venture ultimately concluded before reaching production deployment.",
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
                text: "Although significant progress was made in refining requirements, restructuring architecture, and expanding the mobile implementation, contractual and organizational misalignment halted further development.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The experience exposed the operational risks that arise when technical execution and business governance are not aligned under clear agreements.",
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
                text: "Despite the venture’s conclusion, the experience accelerated my growth in mobile architecture, microservice design, offline-first systems, and large-scale document modeling.",
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

export default hackathonSections;
