/**
 * @file src\assets\images\sideProjects\index.js
 * @description src\assets\images\sideProjects\index module.
 * @module src\assets\images\sideProjects\index
 */

import d20Dash from "./d20-dashboard.png";
import oppEdit from "./d20-opp-editor.png";
import greCon from "./greenhouse-controls.jpg";
import greHook from "./greenhouse-hooked-up.jpg";
import interactiveSurfaceSocialCard from "./interactive-surface-social-card.webp";
import layoutStyleSocialCard from "./layout-style-social-card.jpg";
import mernTemplateSocialCard from "./mern-template-social-card.webp";
import uiStyleKitSocialCard from "./ui-style-kit-social-card.webp";

export {
  d20Dash,
  oppEdit,
  greCon,
  greHook,
  interactiveSurfaceSocialCard,
  layoutStyleSocialCard,
  mernTemplateSocialCard,
  uiStyleKitSocialCard,
};

const imgObjs = {
  d20Dashboard: {
    id: "d20_dashboard_img",
    src: d20Dash,
    alt: "Screenshot of D20 dashboard landing page",
    title: "Landing Page",
    caption: "Dashboard landing page for D20, a digital tabletop RPG assistant application.",
    ariaLabel: "Screenshot of D20 dashboard landing page",
  },
  opponentEditor: {
    id: "d20_opp_editor_img",
    src: oppEdit,
    alt: "Screenshot of D20 opponent editor page showing various stats and options",
    title: "Opponent editor",
    caption:
      "Opponent editor page within D20, allowing users to customize and manage in-game adversaries.",
    ariaLabel: "Screenshot of D20 opponent editor page showing various stats and options",
  },
  greenhouseControls: {
    id: "greenhouse_controls_img",
    src: greCon,
    alt: "Greenhouse control board with sensors and relays connected",
    ariaLabel: "Greenhouse control board with sensors and relays connected",
    title: "Greenhouse control board",
    caption:
      "The custom-built control board featuring temperature and humidity sensors alongside relay modules to manage environmental devices.",
  },
  greenhouseHookedup: {
    id: "greenhouse_hookedup_img",
    src: greHook,
    alt: "Greenhouse control board operating in the field",
    title: "Control board in the field",
    caption:
      "The control board installed inside the greenhouse, actively monitoring and adjusting conditions in real time.",
    ariaLabel: "Greenhouse control board installed inside the greenhouse",
  },
  interactiveSurfaceSocialCard: {
    id: "interactive_surface_social_card_img",
    src: interactiveSurfaceSocialCard,
    alt: "Interactive Surface CSS documentation landing page preview",
    title: "Interactive Surface CSS preview",
    caption: "Homepage preview of the Interactive Surface CSS documentation and demo experience.",
    ariaLabel: "Interactive Surface CSS documentation landing page preview",
  },
  layoutStyleSocialCard: {
    id: "layout_style_social_card_img",
    src: layoutStyleSocialCard,
    alt: "Layout Style CSS documentation and demo preview",
    title: "Layout Style CSS preview",
    caption:
      "Preview of the Layout Style CSS documentation and demo surface for responsive layout primitives.",
    ariaLabel: "Layout Style CSS documentation and demo preview",
  },
  mernTemplateSocialCard: {
    id: "mern_template_social_card_img",
    src: mernTemplateSocialCard,
    alt: "MERN app template repository preview on GitHub",
    title: "MERN template repository preview",
    caption: "Repository preview for the MERN App Template with Auth project.",
    ariaLabel: "MERN app template repository preview on GitHub",
  },
  uiStyleKitSocialCard: {
    id: "ui_style_kit_social_card_img",
    src: uiStyleKitSocialCard,
    alt: "ui-style-kit-css social card preview image",
    title: "ui-style-kit-css social card",
    caption:
      "Social card preview used for the ui-style-kit-css library listing and share metadata.",
    ariaLabel: "ui-style-kit-css social card preview image",
  },
};

export default imgObjs;
