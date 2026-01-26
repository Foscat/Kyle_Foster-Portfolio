import d20Dash from "./d20_dashboard.png";
import oppEdit from "./d20_oppEditor.png";
import enigma from "./enigma.png";
import greCon from "./greenhouseControls.jpg";
import greHook from "./greenhouseHookedUp.jpg";

export { d20Dash, oppEdit, enigma, greCon, greHook };

const imgObjs = {
  d20Dashboard: {
    id: "side_d20_dashboard_img",
    src: d20Dash,
    alt: "Screenshot of D20 dashboard landing page",
    title: "Landing Page",
    caption: "Dashboard landing page for D20, a digital tabletop RPG assistant application.",
    ariaLabel: "Screenshot of D20 dashboard landing page",
  },
  opponentEditor: {
    id: "side_d20_opp_editor_img",
    src: oppEdit,
    alt: "Screenshot of D20 opponent editor page showing various stats and options",
    title: "Opponent editor",
    caption:
      "Opponent editor page within D20, allowing users to customize and manage in-game adversaries.",
    ariaLabel: "Screenshot of D20 opponent editor page showing various stats and options",
  },
  enigmaApp: {
    id: "side_enigma_app_img",
    src: enigma,
    alt: "Screenshot of Enigma encrypter website",
    title: "Enigma website page",
    caption: "Client-side encryption tool implementing a multi-alphabet cipher.",
    ariaLabel: "Screenshot of the Enigma encryption tool in action",
  },
  greenhouseControls: {
    id: "side_greenhouse_controls_img",
    src: greCon,
    alt: "Greenhouse control board with sensors and relays connected",
    ariaLabel: "Greenhouse control board with sensors and relays connected",
    title: "Greenhouse control board",
    caption:
      "The custom-built control board featuring temperature and humidity sensors alongside relay modules to manage environmental devices.",
  },
  greenhouseHookedup: {
    id: "side_greenhouse_hookedup_img",
    src: greHook,
    alt: "Greenhouse control board operating in the field",
    title: "Control board in the field",
    caption:
      "The control board installed inside the greenhouse, actively monitoring and adjusting conditions in real time.",
    ariaLabel: "Greenhouse control board installed inside the greenhouse",
  },
};

export default imgObjs;
