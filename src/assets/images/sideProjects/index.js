/**
 * @file src\assets\images\sideProjects\index.js
 * @description src\assets\images\sideProjects\index module.
 * @module src\assets\images\sideProjects\index
 */

import d20Dash from "./d20_dashboard.png";
import oppEdit from "./d20_oppEditor.png";
import enigma from "./enigma.png";
import encryption from "./encrypting.png";
import decryption from "./decrypting.png";
import enigmaGuide from "./howToEncrypt.png";
import greCon from "./greenhouseControls.jpg";
import greHook from "./greenhouseHookedUp.jpg";

export { d20Dash, oppEdit, enigma, encryption, decryption, enigmaGuide, greCon, greHook };

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
  enigmaApp: {
    id: "enigma_app_img",
    src: enigma,
    alt: "Screenshot of Enigma encrypter website",
    title: "Enigma website page",
    caption: "Client-side encryption tool implementing a multi-alphabet cipher.",
    ariaLabel: "Screenshot of the Enigma encryption tool in action",
  },
  enigmaEncryption: {
    id: "enigma_encryption_img",
    src: encryption,
    alt: "Screenshot of Enigma tool showing plaintext input and resulting ciphertext",
    title: "Encryption in action",
    caption:
      "The Enigma tool encrypting a user's input into ciphertext using the configured cipher settings.",
    ariaLabel: "Screenshot of Enigma tool showing plaintext input and resulting ciphertext",
  },
  enigmaDecryption: {
    id: "enigma_decryption_img",
    src: decryption,
    alt: "Screenshot of Enigma tool showing ciphertext input and resulting plaintext",
    title: "Decryption in action",
    caption:
      "The Enigma tool decrypting a user's input back into plaintext using the configured cipher settings.",
    ariaLabel: "Screenshot of Enigma tool showing ciphertext input and resulting plaintext",
  },
  enigmaGuide: {
    id: "enigma_guide_img",
    src: enigmaGuide,
    alt: "Screenshot of Enigma tool's how-to guide page with instructions for using the encryption and decryption features.",
    title: "Enigma how-to guide",
    caption:
      "The Enigma tool's built-in how-to guide. This modal provides users with clear instructions on using the encryption and decryption features.",
    ariaLabel: "Screenshot of Enigma tool's how-to guide page with instructions and diagrams",
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
};

export default imgObjs;
