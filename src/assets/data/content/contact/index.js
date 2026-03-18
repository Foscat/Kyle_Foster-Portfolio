import { sendMessage } from "pages/Contact";
import contactForm from "./contactForm";

const contactSections = [
  {
    id: "contact-info",
    title: "Contact Information",
    content: [
      {
        type: "paragraph",
        text: "Feel free to reach out to me through any of the following channels:",
      },
      {
        type: "list",
        items: [
          { text: "Email: fosterkyle6456@gmail.com" },
          { text: "Phone: (469) 410 - 5286" },
          { text: "LinkedIn: linkedin.com/in/kyle-foster-dev" },
          { text: "GitHub: github.com/Foscat" },
        ],
      },
    ],
  },
  contactForm,
];
Object.freeze(contactSections);

export default contactSections;
