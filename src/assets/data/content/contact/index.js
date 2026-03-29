import { BlockType } from "types/ui.types.js";
import contactForm from "./contactForm";

const contactSections = [
  {
    id: "contact-info",
    title: "Contact Information",
    navLabel: "Contact",
    blocks: [
      {
        id: "contact-info-text",
        type: BlockType.RICH_TEXT,
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Reach out through any of the channels below:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Email: fosterkyle6456@gmail.com" }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Phone: (469) 410-5286" }],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "LinkedIn:" },
                  { type: "a", text: "linkedin.com/in/kyle-foster-dev" },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "GitHub:" },
                  { type: "a", text: "github.com/Foscat" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  contactForm,
];
Object.freeze(contactSections);

export default contactSections;
