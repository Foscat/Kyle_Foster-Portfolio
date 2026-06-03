/**
 * @file src\assets\images\sideProjects\socialCards.js
 * @description Lightweight social-card image registry for Home and side-project previews.
 * @module src\assets\images\sideProjects\socialCards
 */

import interactiveSurfaceSocialCard from "./interactive-surface-social-card.webp";
import mernTemplateSocialCard from "./mern-template-social-card.webp";
import enigmaSocialCard from "./enigma-social-card.webp";
import uiStyleKitSocialCard from "./ui-style-kit-social-card.webp";

const sideProjectSocialCards = {
  interactiveSurface: {
    id: "interactive_surface_social_card_img",
    src: interactiveSurfaceSocialCard,
    alt: "Interactive Surface CSS documentation preview",
    title: "Interactive Surface CSS Preview",
    caption: "Preview of the Interactive Surface CSS documentation and demo experience.",
    ariaLabel: "Interactive Surface CSS documentation preview",
  },
  mernTemplate: {
    id: "mern_template_social_card_img",
    src: mernTemplateSocialCard,
    alt: "MERN App Template with Auth repository preview",
    title: "MERN App Template Preview",
    caption: "Preview of the MERN App Template with Auth repository.",
    ariaLabel: "MERN App Template with Auth repository preview",
  },
  enigma: {
    id: "enigma_social_card_img",
    src: enigmaSocialCard,
    alt: "Caesar's Enigma project preview",
    title: "Caesar's Enigma Preview",
    caption: "Preview of the Caesar's Enigma project landing page.",
    ariaLabel: "Caesar's Enigma project preview",
  },
  uiStyleKit: {
    id: "ui_style_kit_social_card_img",
    src: uiStyleKitSocialCard,
    alt: "ui-style-kit-css preview image",
    title: "UI Style Kit CSS Preview",
    caption:
      "Social card preview used for the ui-style-kit-css package listing and share metadata.",
    ariaLabel: "ui-style-kit-css preview image",
  },
};

export default sideProjectSocialCards;
