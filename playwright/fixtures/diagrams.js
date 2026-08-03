/**
 * @module playwright\fixtures\diagrams
 * @description playwright\fixtures\diagrams module.
 * @file playwright\fixtures\diagrams.js
 * @type {Array<{id: string, route: string}>}
 * Each entry maps a Mermaid diagram block ID to the page route where it renders.
 */
export const DIAGRAM_ENTRIES = [
  // /
  { id: "hero-engineering-flow", route: "/" },
  { id: "professional-platform-diagram", route: "/" },
  // /codestream
  { id: "diagram-3panel-editor", route: "/codestream" },
  { id: "diagram-organization-license-model", route: "/codestream" },
  { id: "diagram-classroom-flow", route: "/codestream" },
  { id: "diagram-curriculum-model", route: "/codestream" },
  // /hackathon
  { id: "diagram-hands-free-repair-workflow", route: "/hackathon" },
  { id: "diagram-voice-command-lifecycle", route: "/hackathon" },
  // /sanderson-technology-enterprises
  { id: "diagram-ste-public-site-journey", route: "/sanderson-technology-enterprises" },
  {
    id: "diagram-ste-content-creator-platform-flow",
    route: "/sanderson-technology-enterprises",
  },
  { id: "diagram-ste-scrapyard-commerce-loop", route: "/sanderson-technology-enterprises" },
  { id: "diagram-ste-interface-system-flow", route: "/sanderson-technology-enterprises" },
  // /side-projects
  { id: "diagram-interface-systems-lab-contract", route: "/side-projects" },
  { id: "diagram-layout-style-bundle-flow", route: "/side-projects" },
  { id: "diagram-ui-style-kit-token-flow", route: "/side-projects" },
  { id: "diagram-interactive-surface-state-model", route: "/side-projects" },
  { id: "diagram-interactive-surface-token-flow", route: "/side-projects" },
  { id: "diagram-mern-auth-lifecycle", route: "/side-projects" },
  { id: "diagram-mern-deployment-flow", route: "/side-projects" },
  { id: "diagram-greenhouse-mental-model", route: "/side-projects" },
  { id: "diagram-domain-model", route: "/side-projects" },
  // /smu
  { id: "diagram-gif-freak-system-flow", route: "/smu" },
  { id: "diagram-stock-memer-architecture", route: "/smu" },
  { id: "diagram-scion-algorithm-flow", route: "/smu" },
];

/**
 * @description Flat list of just the IDs, for utilities that only need strings.
 */
export const DIAGRAM_IDS = DIAGRAM_ENTRIES.map((e) => e.id);
