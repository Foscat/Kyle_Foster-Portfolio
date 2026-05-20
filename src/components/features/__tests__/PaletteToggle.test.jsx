/**
 * @file src\components\features\PaletteToggle\PaletteToggle.test.jsx
 * @description src\components\features\PaletteToggle\PaletteToggle.test module.
 * @module src\components\features\PaletteToggle\PaletteToggle.test
 */

import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "tests/renderWithProviders";
import PaletteToggle from "../PaletteToggle";

describe("PaletteToggle", () => {
  test("renders palette selector options", async () => {
    renderWithProviders(<PaletteToggle />);

    const selector = await screen.findByRole("combobox", { name: /color palette selector/i });

    expect(within(selector).getByRole("option", { name: /midnight gold/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /ocean steel/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /forest moss/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /sunset ember/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /royal plum/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /graphite cyan/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /desert sage/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /rose quartz/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /cyber lime/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /arctic indigo/i })).toBeInTheDocument();
  });

  test("updates the active palette when a new option is selected", async () => {
    const user = userEvent.setup();

    renderWithProviders(<PaletteToggle />);

    const selector = await screen.findByRole("combobox", { name: /color palette selector/i });
    await user.selectOptions(selector, "forest-moss");

    await waitFor(() => {
      expect(document.documentElement.dataset.palette).toBe("forest-moss");
    });
  });
});
