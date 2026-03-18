import { BlockType } from "types/ui.types";

export default {
  id: "diagram-3panel-editor",
  type: BlockType.DIAGRAM,
  title: "3-Panel Editor – Architecture Flow",

  architecture: {
    direction: "LR",

    layers: [
      {
        key: "presentation",
        nodes: [
          { id: "Markdown", label: "Lesson Markdown" },
          { id: "Panel", label: "Instruction Panel" },
          { id: "Editor", label: "Ace Editor" },
        ],
      },

      {
        key: "application",
        nodes: [{ id: "Router", label: "Execution Router", core: true }],
      },

      {
        key: "infrastructure",
        nodes: [
          { id: "Sandbox", label: "Web Sandbox iframe", type: "external" },
          { id: "Python", label: "Python Runtime Skulpt", type: "external" },
        ],
      },

      {
        key: "persistence",
        nodes: [{ id: "S3", label: "AWS S3 Storage", type: "datastore" }],
      },
    ],

    edges: [
      { from: "Markdown", to: "Panel" },
      { from: "Editor", to: "Router" },
      { from: "Router", to: "Sandbox", label: "Web" },
      { from: "Router", to: "Python", label: "Python" },
      { from: "Editor", to: "S3", label: "Save" },
    ],
  },
};
