(() => {
  const body = document.body;
  const fixedTheme = "light";

  if (!body) {
    return;
  }

  body.dataset.theme = fixedTheme;
})();
