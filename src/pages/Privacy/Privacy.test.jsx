/**
 * @file Privacy.test.jsx
 * @description Content-contract tests for the portfolio visitor notice.
 * @module pages/Privacy/test
 */

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import renderWithProviders from "tests/renderWithProviders";
import Privacy from ".";

describe("Privacy page", () => {
  it("discloses the logger fields, retention, browser identifier, and evidence limits", () => {
    renderWithProviders(<Privacy />);

    expect(
      screen.getByRole("heading", { name: /visitor privacy and security logging/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/encrypted source IP/i)).toBeInTheDocument();
    expect(screen.getByText(/rolling 180-day period/i)).toBeInTheDocument();
    expect(
      screen.getByText(/random identifier in this site's local browser storage/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/do not, by themselves, prove a person's identity/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact page/i })).toHaveAttribute("href", "/contact");
  });
});
