/**
 * @type {Array<{id: string, route: string}>}
 * Each entry maps a Mermaid diagram block ID to the page route where it renders.
 */
export const DIAGRAM_ENTRIES = [
  // /codestream
  { id: "diagram-3panel-editor", route: "/codestream" },
  { id: "diagram-organization-license-model", route: "/codestream" },
  { id: "diagram-classroom-flow", route: "/codestream" },
  { id: "diagram-curriculum-model", route: "/codestream" },
  // /hackathon
  { id: "diagram-hands-free-repair-workflow", route: "/hackathon" },
  { id: "diagram-voice-command-lifecycle", route: "/hackathon" },
  // /side-projects
  { id: "diagram-greenhouse-mental-model", route: "/side-projects" },
  { id: "diagram-greenhouse", route: "/side-projects" },
  { id: "enigma-client-encrypt-flow", route: "/side-projects" },
  { id: "diagram-enigma-decrypt-flow", route: "/side-projects" },
  { id: "diagram-domain-model", route: "/side-projects" },
  // /smu
  { id: "diagram-gif-freak-system-flow", route: "/smu" },
  { id: "diagram-stock-memer-architecture", route: "/smu" },
  { id: "diagram-scion-algorithm-flow", route: "/smu" },
];

/** Flat list of just the IDs, for utilities that only need strings. */
export const DIAGRAM_IDS = DIAGRAM_ENTRIES.map((e) => e.id);
