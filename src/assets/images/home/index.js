/**
 * @file src\assets\images\home\index.js
 * @description src\assets\images\home\index module.
 * @module src\assets\images\home\index
 */

import headshot from "./headshot.jpg";
import stem from "./stem.jpg";
import suitSitting from "./suit-sitting.jpg";
import suitStanding from "./suit-standing.jpg";

export { headshot, stem, suitSitting, suitStanding };

const imgObjs = {
  headshot: {
    id: "home_headshot_img",
    src: headshot,
    alt: "Professional headshot of Kyle Foster",
    title: "Professional Headshot",
    caption: "Professional headshot used across the portfolio and profile materials.",
    ariaLabel: "Professional headshot of Kyle Foster",
  },
  suitStanding: {
    id: "home_suit_standing_img",
    src: suitStanding,
    alt: "Kyle Foster standing in a suit",
    title: "Formal Portrait",
    caption: "Formal portrait used for professional branding and presentation contexts.",
    ariaLabel: "Kyle Foster standing in a suit",
  },
  suitSitting: {
    id: "home_suit_sitting_img",
    src: suitSitting,
    alt: "Kyle Foster seated in a suit",
    title: "Seated Portrait",
    caption: "Alternative professional portrait with a more relaxed seated composition.",
    ariaLabel: "Kyle Foster seated in a suit",
  },
  stem: {
    id: "home_stem_photo_img",
    src: stem,
    alt: "Kyle Foster STEM-themed portrait",
    title: "STEM Portrait",
    caption: "Portrait aligned with engineering and technical storytelling themes.",
    ariaLabel: "Kyle Foster STEM-themed portrait",
  },
};

export default imgObjs;
