import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import Health from "./index";
import renderWithProviders from "tests/renderWithProviders";

describe("Health page", () => {
  it("surfaces runtime health details", () => {
    renderWithProviders(<Health />);

    expect(screen.getByText(/system health/i)).toBeInTheDocument();
    expect(screen.getByText(/react: 18\.2\.0/i)).toBeInTheDocument();
    expect(screen.getByText(/build tool: vite/i)).toBeInTheDocument();
    expect(screen.getByText(/rsuite: loaded/i)).toBeInTheDocument();
  });
});
