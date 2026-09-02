/**
 * @file src\pages\Health\Health.test.jsx
 * @description src\pages\Health\Health.test module.
 * @module src\pages\Health\Health.test
 */

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import Health from "./index";
import renderWithProviders from "tests/renderWithProviders";

describe("Health page", () => {
  it("surfaces runtime health details", () => {
    renderWithProviders(<Health />);

    expect(screen.getByText(/system health/i)).toBeInTheDocument();
    expect(screen.getByText(/react: 19\.2\.8/i)).toBeInTheDocument();
    expect(screen.getByText(/build tool: vite/i)).toBeInTheDocument();
    expect(screen.getByText(/ste interface libraries: loaded/i)).toBeInTheDocument();
  });
});
