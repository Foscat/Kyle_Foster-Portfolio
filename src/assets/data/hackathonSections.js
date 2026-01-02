import { BlockType, Theme } from "../../types/ui.types";

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

export default [
  {
    id: "overview",
    slug: "overview",
    title: "Overview",
    subtitle:
      "How a team of junior developers unexpectedly won Daimler's 2019 Hackathon.",
    icon: "tower-observation",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "The Daimler Trucking Hackathon of 2019 marked a pivotal moment in my journey as a developer. Freshly graduated from my second bootcamp, I attended the event with a friend — initially just for fun. Little did we know that we would be tasked with rethinking the company's technician workflow. Although we were overlooked by senior teams, a small group of junior developers joined forces and attacked the challenge head-on.",
          "Against all expectations, our solution stood out for its practicality and focus on real technician needs, and we won the entire event. Motivated by the victory, several teammates and I pooled our winnings to continue developing the app professionally. As the sole developer who moved forward with the project, I taught myself React Native to transform the web prototype into a mobile application. Unfortunately, the venture collapsed due to decisions made by the project lead, who signed client contracts under his own separate company — excluding the rest of us. Though disappointing, the experience pushed my skills and provided lessons I still value today.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.LINKS,
        links: [
          {
            title: "Read The Article",
            url: "https://austinstartups.com/21-teams-gather-at-capital-factory-to-hack-daimler-north-americas-voice-technology-for-truck-77ed19862592",
            icon: "newspaper",
          },
          {
            title: "Hackathon Project",
            url: "#reinforce",
            icon: "person-chalkboard",
          },
          {
            title: "Tech Assist Code",
            url: "#tech_assist",
            icon: "headphones",
          },
        ],
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Me and the team hacking",
        icon: "comment-nodes",
        images: [
          {
            src: "../images/hackathon/focus.jpg",
            alt: "Me and team Reinforce working together in our project room.",
            title: "Team Reinforce during development",
          },
        ],
      },
    ],
  },
  {
    id: "reinforce",
    slug: "reinforce",
    title: "Hackathon App (Reinforce)",
    subtitle: "A hands-free, voice-powered repair assistant.",
    icon: "truck-fast",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "The Problem",
        icon: "circle-exclamation",
        paragraphs: [
          "The technicians at Daimler relied heavily on paper instructions or screen-based tools to assist them during repairs. Both approaches slowed down the workflow and created inconsistency in how steps were followed. The company needed a solution that could guide technicians while keeping their hands free—one that accurately tracked how long each step of a repair took so slowdowns could be identified across different repair types and truck models.",
          "Additionally, Daimler wanted high-performing technicians to share insights about how they completed tasks faster than average. However, the existing system for providing feedback was underutilized because it was time-consuming and difficult to submit improvements. There was also no reliable way to measure how much the suggested improvements actually affected the repair process or which part of the workflow they impacted.",
          "The challenge was to create a real-time, voice-driven system that supported technicians without disrupting their hands-on workflow or requiring new hardware.",
          "Many teams had already formed before the event began. My friend and former classmate—also a junior developer—and I were overlooked by several groups of more experienced developers. This left us to join a mixed team made up of college students, a salesman, and an accountant. We knew we wouldn't be building the most technically advanced solution at the hackathon, but we were determined to create one that actually solved the real problems Daimler described.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Working with the team",
        images: [
          {
            src: "../images/hackathon/chatBotting.jpg",
            alt: "Me showing off to the team the voice translator finding key words from a phrase to use for search algorithm",
            title:
              "Showing the team how the voice to text worked and identified search varibles",
          },
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.RICH_TEXT,
        title: "The Solution",
        icon: "lightbulb",
        paragraphs: [
          "Our team designed a fully voice-operated repair assistant that delivered step-by-step instructions to technicians without requiring any screen interaction. Using my MERN starter template as the backend foundation, we rapidly assembled a modular system tailored to Daimler's workflow. One teammate developed an XML parser capable of reading and structuring Daimler's service documentation, while another built an AWS Lambda function responsible for tracking step progression and timing. My role centered on the natural-language command system: interpreting technician speech, translating it into actionable commands, routing those commands to the backend, and reading the next instruction aloud through synthesized speech.",
        ],
        dividerAfter: true,
      },
      {
        type: BlockType.DIAGRAM,
        title: "Hands-Free Repair Workflow",
        description:
          "This diagram illustrates the continuous, voice-driven loop that allows technicians to perform repairs without touching a screen while the system tracks timing and workflow data in real time.",
        theme: Theme.DARK,
        diagram: `flowchart LR
        A[Technician Performs Repair] --> B[Speaks Command<br/>(e.g. 'Next Step')]
        B --> C[Voice-to-Text Engine]
        C --> D[NLP Command Processor]
        D --> E[AWS Lambda<br/>Step Logic + Timing]
        E --> F[XML Parser<br/>Returns Step Instructions]
        F --> G[App Reads Instruction Aloud]
        G --> A
    
        style A fill:#0b1220,stroke:#5da9ff,stroke-width:1px
        style B fill:#0f1a2e,stroke:#5da9ff
        style C fill:#12223a,stroke:#5da9ff
        style D fill:#16304a,stroke:#5da9ff
        style E fill:#1a3d57,stroke:#5da9ff
        style F fill:#1d4b68,stroke:#5da9ff
        style G fill:#225a78,stroke:#5da9ff
    `,
      },
      {
        type: BlockType.DIAGRAM,
        title: "Voice Command Lifecycle",
        description:
          "A detailed sequence of how a spoken command flows through the system, from technician input to spoken instruction output.",
        theme: Theme.DARK,
        diagram: `sequenceDiagram
      participant Tech as Technician
      participant STT as Speech-to-Text
      participant NLP as Command Processor
      participant Lambda as AWS Lambda
      participant Parser as XML Parser
      participant App as App Output
  
      Tech->>STT: Speak command ("Next step")
      STT->>NLP: Transcribed speech
      NLP->>Lambda: Parsed intent
      Lambda->>Parser: Request instructions
      Parser->>Lambda: Step data
      Lambda->>App: Instruction + timing
      App->>Tech: Read instruction aloud
  `,
      },
      {
        type: BlockType.RICH_TEXT,
        paragraphs: [
          "This approach allowed technicians to perform an entire service hands-free while the system automatically recorded timing metrics and workflow insights. The experience felt intuitive, fast, and closely aligned with how technicians actually performed their work. Our prototype became the only hands-free, real-time guidance system at the hackathon—one that solved Daimler's stated problems instead of adding new friction.",
          "Additionally, the system allowed technicians to provide valuable feedback on their work, enabling continuous improvement and optimization of repair procedures. The app's success at the hackathon demonstrated its potential to streamline operations and drive efficiency within Daimler's repair process. Its practicality and seamless user experience ultimately became the key reasons our team won the competition.",
        ],
      },
      {
        type: BlockType.IMAGE_GALLERY,
        images: [
          {
            src: "../images/hackathon/bigCheck.jpg",
            alt: "Me and the team on stage holding a giant check to show off our prize.",
            title: "On stage celebrating",
            caption:
              "The team and I holding our prize check that showed off our winnings to the other attendees.",
          },
        ],
      },
      {
        type: BlockType.DIAGRAM,
        title: "System Architecture + Team Contribution Breakdown",
        description:
          "A modular view of the system architecture, showing how each major component and team contribution fit together to support the voice-driven workflow.",
        theme: Theme.DARK,
        diagram: `flowchart TB
        subgraph Frontend ["Mobile/Web App (React / React Native)"]
            UI[Voice Control Interface]
            STT[Speech-to-Text Input]
            TTS[Text-to-Speech Output]
        end
    
        subgraph Backend ["MERN Template Backend"]
            API[REST API Layer]
        end
    
        subgraph Services ["Microservices"]
            XML[XML Parser Service<br/>(Teammate #1)]
            Logic[AWS Lambda Step Logic<br/>(Teammate #2)]
            NLP[Speech Command Router<br/>(Your Work)]
        end
    
        UI --> STT --> NLP
        NLP --> API --> Logic --> XML
        XML --> Logic --> TTS --> UI
    
        style UI fill:#0d1526,stroke:#5da9ff
        style STT fill:#122035,stroke:#5da9ff
        style NLP fill:#16304a,stroke:#5da9ff
        style API fill:#1a2a40,stroke:#5da9ff
        style Logic fill:#1d3a53,stroke:#5da9ff
        style XML fill:#204b67,stroke:#5da9ff
        style TTS fill:#235c7d,stroke:#5da9ff
    `,
      },
      {
        type: BlockType.DIAGRAM,
        icon: "timeline",
        title: "Command Lifecycle",
        diagram: `sequenceDiagram
        participant Tech as Technician
        participant STT as Speech-to-Text
        participant NLP as Command Processor<br/>(Your Component)
        participant Lambda as AWS Lambda Step Logic
        participant Parser as XML Parser
        participant App as App TTS Engine
    
        Tech->>STT: Speaks command ("Next step")
        STT->>NLP: Transcribed text
        NLP->>Lambda: Interpret + Send Intent
        Lambda->>Parser: Request next instruction block
        Parser->>Lambda: Return step/substep data
        Lambda->>App: Send next step + timing update
        App->>Tech: Reads instructions aloud
    `,
      },
    ],
  },
  {
    id: "tech_assist",
    slug: "tech-assist",
    title: "Post-Hackathon Work (Tech Assist)",
    subtitle:
      "Scaling the prototype into a cross-platform mobile app — and the challenges that followed.",
    icon: "mobile-screen-button",
    isScroller: true,
    blocks: [
      {
        type: BlockType.RICH_TEXT,
        title: "Transition",
        paragraphs: [
          "After the hackathon, me and a few other team members formed a company called Reinforce, and renamed the app to 'Tech Assist'. Without a home office at the time, I rented a co-working space and began development. I was the only developer who stayed on, So it was going to be 100% up to me to tackle any challenges.",
          "Daimler wanted the prototype to evolve into a scalable mobile application for real-world technicians. This introduced several challenges at once: the app had to support iOS and Android, operate offline or with unreliable warehouse Wi-Fi, and process large, deeply nested XML instruction sets far more efficiently than the hackathon prototype. The backend logic also needed to expand to support hundreds of repair types across multiple truck models. As the sole developer transitioning the prototype into a production-grade tool, I needed to migrate logic into microservices, rebuild the architecture for mobile constraints, and redesign the workflow so it could serve technicians in high-demand environments.",
        ],
      },
      {
        type: BlockType.RICH_TEXT,
        title: "Development & Challenges",
        paragraphs: [
          "We held multiple scope-defining meetings with Daimler, which were invaluable as early professional experience. I chose React Native for its cross-platform support, allowing rapid prototyping. I also converted the Python based XML parsing logic into JavaScript and migrated it into server microservice. I also expanded its functionality to find the correct file for the intended job from one of the over 500 instruction sets across five truck types. I used key words from the users speech to find the file they needed for instructions.",
          "The system workflow: a technician requests a service → the backend determines the correct XML file → the microservice parses instructions → the app reads them aloud. This allowed technicians to complete entire repairs without touching a screen.",
        ],
      },
      {
        type: BlockType.BULLETED_LIST,
        title: "System Workflow",
        icon: "bars-staggered",
      },
      /** Tech Assist Logo Image */
      {
        type: BlockType.IMAGE_GALLERY,
        title: "Tech Assist Branding",
        images: [
          {
            src: "/portfolio_2025/images/hackathon/TechAssistLogo.jpg",
            alt: "Logo for the Tech Assist mobile application showing a microphone and sound waves.",
            title: "Tech Assist Logo",
          },
        ],
      },
      {
        type: BlockType.RICH_TEXT,
        title: "Outcome",
        icon: "route",
        paragraphs: [
          "Despite the promising start following the hackathon victory, the post-hackathon journey ultimately ended in disappointment and frustration. While we made significant progress in defining project requirements, developing a prototype, and laying the groundwork for further development, unforeseen challenges emerged that derailed our efforts.",
          "Regrettably, the project's downfall stemmed from the actions of our team leader, who made unilateral decisions without consulting the rest of the team. In a disheartening turn of events, it was discovered that the team leader had signed contracts with Daimler under a company he owned, sidelining the rest of the team and denying us the opportunity to continue our work on the project. Despite my best efforts to salvage the situation, I found myself cut out of the project entirely, lacking the resources and leverage to rectify the situation.",
          "While the outcome was disappointing, the experience served as a valuable lesson in the importance of transparency, communication, and trust within a team dynamic. Although the project did not materialize as intended, the lessons learned and the skills acquired during the post-hackathon work have undoubtedly contributed to my growth as a developer and have prepared me for future challenges and opportunities.",
        ],
      },
    ],
  },
];
