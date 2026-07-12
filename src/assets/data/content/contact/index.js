/**
 * @file src\assets\data\content\contact\index.js
 * @description Alternative contact page content module.
 * @module src\assets\data\content\contact
 */

import { BlockType } from "types/ui.types.js";

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
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Primary email: " },
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
                  { type: "text", text: "Alternate email: " },
                  {
                    type: "a",
                    text: "foscat4o1k@outlook.com",
                    href: "mailto:foscat4o1k@outlook.com",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Primary phone: " },
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
];
Object.freeze(contactSections);

export default contactSections;
