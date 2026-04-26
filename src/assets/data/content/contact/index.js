/**
 * @file src\assets\data\content\contact\index.js
 * @description src\assets\data\content\contact\index module.
 * @module src\assets\data\content\contact\index
 */

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
                text: "I'm a Senior React / Frontend Engineer. You can reach me through any of the channels below:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Email: " },
                  {
                    type: "a",
                    text: "fosterkyle6456@gmail.com",
                    href: "mailto:fosterkyle6456@gmail.com",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Phone: " },
                  { type: "a", text: "(469) 410-5286", href: "tel:+14694105286" },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "LinkedIn:" },
                  {
                    type: "a",
                    text: "linkedin.com/in/kylefoster-dev",
                    href: "https://linkedin.com/in/kylefoster-dev",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "GitHub:" },
                  { type: "a", text: "github.com/Foscat", href: "https://github.com/Foscat" },
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
