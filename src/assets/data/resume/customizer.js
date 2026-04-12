/**
 * @file src\assets\data\resume\customizer.js
 * @description src\assets\data\resume\customizer module.
 * @module src\assets\data\resume\customizer
 */

(() => {
  const body = document.body;
  const fixedTheme = "light";

  if (!body) {
    return;
  }

  body.dataset.theme = fixedTheme;
})();
