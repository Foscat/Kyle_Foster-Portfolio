import {
  faArrowDownUpLock,
  faArrowsToEye,
  faBookOpenReader,
  faBuildingUser,
  faChartDiagram,
  faChartLine,
  faCode,
  faDiceD20,
  faEnvelope,
  faFileArrowDown,
  faFlask,
  faFlaskVial,
  faGraduationCap,
  faHeadset,
  faIdBadge,
  faLaptopCode,
  faLayerGroup,
  faMicrophone,
  faMobileScreenButton,
  faPaperPlane,
  faPeopleGroup,
  faPlug,
  faSeedling,
  faTrophy,
  faUniversalAccess,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType, PageRoute } from "../../types/ui.types";

export const homeSections = [
  {
    id: "hero",
    slug: "hero",
    icon: faCode,
    title: "Overview",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "I'm a full-stack engineer that specializes on front-end with a strong product mindset. I specializes in building complex, user-facing systems that scale beyond individual features.",
          "From education platforms used by real classrooms, to hackathon-winning prototypes, to deeply personal side projects, my work reflects a strong bias toward solving meaningful problems through software.",
          "In the pursuit of productivity and excellence, I uphold a commitment to continuous improvement and quality. Striving for competency and impact, both as an individual and my role within an organization. Having these traits are essential to creating meaningful outcomes and achieving success.",
        ],
      },
    ],
  },

  {
    id: "professional",
    slug: "professional-work",
    title: "Professional Work",
    subtitle: "Lead Front-end Engineer for CodeStream Studios LLC",
    icon: faBuildingUser,
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "My professional work centers on building and scaling a production education platform used in schools by real students, teachers, and organizations.",
          "At CodeStream Studios, I served as the sole front-end engineer. I built the platform from the ground up. Personally architecting the core systems that empowered the platform. From a multi-panel code editor that ran compleatly in the browser. Created a role-based access control system for organizations, virtual classroom workflows, grading tools, reporting systems, and administrative dashboards.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Noteable Features",
        accordian: false,
        items: [
          {
            id: "grading",
            title: "Teacher Tools",
            text: "Teacher-facing grading tools and downloadable classroom reports to support real instructional workflows.",
            icon: faChartLine,
            url: `${PageRoute.HOME}#grading`,
            isScroller: false,
          },
          {
            id: "organizations",
            title: "Organizations and Licensing",
            text: "Role-based permissions for organizations (Student, Teacher, Admin). Flexable licensing system that limited number of teachers and students allowed to join. As well as paywalling propritary curriculum their classes were allowed to use.",
            icon: faIdBadge,
            url: `${PageRoute.HOME}#organizations`,
            isScroller: false,
          },
          {
            id: "editor",
            title: "3 Panel Browser Based IDE",
            text: "Designed a zero-install coding environment supporting Web (HTML,CSS,JS) and Python projects with live execution and cloud persistence.",
            icon: faLaptopCode,
            url: `${PageRoute.HOME}#editor`,
            isScroller: false,
          },
        ],
      },
      {
        type: "links",
        links: [
          {
            title: "Explore CodeStream Studios Platform Features",
            url: PageRoute.PROFESSIONAL,
            icon: faLayerGroup,
            size: "md",
          },
        ],
      },
    ],
  },
  {
    id: "hackathon",
    title: "Daimler Trucking Hackathon Winner",
    isScroller: true,
    subtitle:
      "Rapid problem-solving under real-world constraints to real-world problems.",
    icon: faTrophy,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "In 2019, I had the honor of participating in the Daimler Trucking Hackathon in Austin, Texas. Tasked with improving the repair process for the company, I joined forces with fellow junior developers after being initially overlooked by senior teams. Despite the odds, our collaborative effort resulted in a resounding victory, outperforming 20 other teams comprised of senior developers.",
          "We won due to prioritizing the client's actual needs and delivering a solution tailored to their specific challenges, showcasing our ability to innovate and deliver impactful solutions under pressure.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        items: [
          {
            title: "Innovative MVP soloution",
            text: "Built a voice-driven repair assistant to guide technicians hands-free while tracking workflow efficiency.",
            icon: faHeadset,
            url: `${PageRoute.HACKATHON}#reinforce`,
            isScroller: false,
          },
          {
            title: "Hands-Free Voice Interface",
            text: "Enabled technicians to receive step-by-step spoken instructions without screens or new hardware.",
            icon: faMicrophone,
            url: `${PageRoute.HACKATHON}#reinforce`,
            isScroller: false,
          },
          {
            title: "Post-Hackathon Product Work",
            text: "Continued development as the sole engineer, transitioning the prototype into a mobile-first React Native app.",
            icon: faMobileScreenButton,
            url: `${PageRoute.HACKATHON}#tech_assist`,
            isScroller: false,
          },
        ],
      },
    ],
  },
  {
    id: "side-projects",
    slug: "side-projects",
    title: "Side Projects",
    subtitle: "Self-directed solutions to real problems I've faced",
    icon: faFlaskVial,
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "My side projects are where I like to experiment, explore new tools, and solve practical problems outside of client constraints.",
          "These projects range from hardware-integrated automation systems to encryption tools and creative applications, each reflecting my curiosity and ability to take an idea from concept to execution.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Focus Areas",
        icon: faArrowsToEye,
        items: [
          {
            title: "Agile and Robust Programs",
            text: "Full-stack (MERN) experimentation and rapid prototyping using my custom made template.",
            icon: faLayerGroup,
          },
          {
            title: "Practical Applications",
            text: "Hardware and software integration that is still running in the field today.",
            icon: faUniversalAccess,
          },
          {
            title: "Full SDLC experiance",
            text: "Independent problem-solving and product ownership from beginning to end.",
            icon: faLayerGroup,
          },
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "Programs of Note",
        icon: faBookOpenReader,
        items: [
          {
            title: "Greenhouse Automation",
            text: "Hardware-driven automation system using a Raspberry Pi Zero and Sense Kit. Written in Python to regulate the climate conditions autonomously of a greenhouse.",
            icon: faSeedling,
            url: `${PageRoute.SIDE_PROJECTS}#greenhouse`,
            isScroller: false,
          },
          {
            title: "Encryption Tool",
            text: "Custom Caesar/Enigma-inspired encryption tools built for experimentation with algorithms and UI clarity.",
            icon: faArrowDownUpLock,
            url: `${PageRoute.SIDE_PROJECTS}#enigma`,
            isScroller: false,
          },
          {
            title: "D20 King (Private)",
            text: "A modular world-building and campaign management system designed by a Dungeon Master for Dungeon Masters. Allows users to copy, edit and share with others the modular sections that make up a campaign.",
            icon: faDiceD20,
            url: `${PageRoute.SIDE_PROJECTS}#d20`,
            isScroller: false,
          },
        ],
      },
      {
        type: "links",
        links: [
          {
            title: "View Side Projects",
            url: PageRoute.SIDE_PROJECTS,
            icon: faFlask,
          },
        ],
      },
    ],
  },

  {
    id: "education",
    slug: "education",
    title: "Education & Foundations",
    subtitle: "Where it all started",
    icon: faGraduationCap,
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "My formal training at Southern Methodist University laid the technical foundation for my career, introducing me to web development, APIs, collaboration, and project-based learning.",
          "The projects from this period showcase my early growth, my first experiences working in teams, and the transition from learning syntax to solving meaningful problems.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        items: [
          {
            title: "API-Driven Interfaces",
            text: "Early projects integrating public APIs, asynchronous data flows, and dynamic rendering.",
            icon: faPlug,
            url: `${PageRoute.EDUCATION}#gif_freak`,
            isScroller: false,
          },
          {
            title: "Collaborative Development",
            text: "First exposure to team workflows, task division, and backend responsibilities.",
            icon: faPeopleGroup,
            url: `${PageRoute.EDUCATION}#stock_memer`,
            isScroller: false,
          },
          {
            title: "Matching Algorithms",
            text: "Designed a compatibility scoring system as part of a real-world problem-solving capstone.",
            icon: faChartDiagram,
            url: `${PageRoute.EDUCATION}#scion_matches`,
            isScroller: false,
          },
        ],
      },
      {
        type: "links",
        links: [
          {
            title: "Explore SMU Projects",
            url: `${PageRoute.EDUCATION}`,
            icon: faGraduationCap,
          },
        ],
      },
    ],
  },

  {
    id: "cta",
    slug: "contact",
    title: "Let's Connect",
    icon: faPaperPlane,
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "If you're looking for an engineer who can take ownership of UI architecture, think in systems, and collaborate across product and engineering teams, I'd love to talk.",
          "Whether you're hiring, exploring a collaboration, or just want to discuss ideas, feel free to reach out.",
        ],
      },
      {
        type: "links",
        links: [
          {
            title: "Contact Me",
            url: "/contact",
            icon: faEnvelope,
            tooltip: "View contact page",
          },
          {
            title: "Download Resume",
            url: "./Kyle_Foster_React_Resume.pdf",
            icon: faFileArrowDown,
            download: true,
            tooltip: "Download a PDF version of my resume",
          },
        ],
      },
    ],
  },
];
