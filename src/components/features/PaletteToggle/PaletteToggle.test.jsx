/**
 * @file src\components\features\PaletteToggle\PaletteToggle.test.jsx
 * @description src\components\features\PaletteToggle\PaletteToggle.test module.
 * @module src\components\features\PaletteToggle\PaletteToggle.test
 */

import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "tests/renderWithProviders";
import PaletteToggle from "./index";

describe("PaletteToggle", () => {
  test("renders palette selector options", async () => {
    renderWithProviders(<PaletteToggle />);

    const selector = await screen.findByRole("combobox", { name: /color palette selector/i });

    expect(within(selector).getByRole("option", { name: /midnight/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /classic/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /forest/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /ocean/i })).toBeInTheDocument();
    expect(within(selector).getByRole("option", { name: /sunset/i })).toBeInTheDocument();
  });

  test("updates the active palette when a new option is selected", async () => {
    const user = userEvent.setup();

    renderWithProviders(<PaletteToggle />);

    const selector = await screen.findByRole("combobox", { name: /color palette selector/i });
    await user.selectOptions(selector, "forest");

    await waitFor(() => {
      expect(document.documentElement.dataset.palette).toBe("forest");
    });
  });
});
