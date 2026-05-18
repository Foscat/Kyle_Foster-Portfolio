/**
 * @file src/App.test.jsx
 * @description Route-level regression tests for the root application shell.
 * @module src/App.test
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen } from "@testing-library/react";
import renderWithAppProviders from "tests/renderWithAppProviders";
import App from "./App";

vi.mock("hooks/useThemeFavicon", () => ({
  useThemeFavicon: () => {},
}));

vi.mock("interactive-surface-css", () => ({}));

vi.mock("components/navigation", () => ({
  Head: () => <div data-testid="app-head" />,
}));

vi.mock("pages/Home", () => ({ default: () => <h1>Home Mock</h1> }));
vi.mock("pages/CodeStream", () => ({ default: () => <h1>CodeStream Mock</h1> }));
vi.mock("pages/SideProjects", () => ({ default: () => <h1>Side Projects Mock</h1> }));
vi.mock("pages/Hackathon", () => ({ default: () => <h1>Hackathon Mock</h1> }));
vi.mock("pages/SMU", () => ({ default: () => <h1>SMU Mock</h1> }));
vi.mock("pages/ContactAlt", () => ({ default: () => <h1>ContactAlt Mock</h1> }));
vi.mock("pages/Docs", () => ({ default: () => <h1>Docs Mock</h1> }));
vi.mock("pages/Health", () => ({ default: () => <h1>Health Mock</h1> }));
vi.mock("pages/NotFound", () => ({ default: () => <h1>NotFound Mock</h1> }));

const renderApp = () => renderWithAppProviders(<App />);

describe("App routes", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("renders ContactAlt for /contact", async () => {
    window.history.pushState({}, "", "/contact");

    renderApp();

    expect(await screen.findByRole("heading", { name: "ContactAlt Mock" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "NotFound Mock" })).not.toBeInTheDocument();
  });
});
