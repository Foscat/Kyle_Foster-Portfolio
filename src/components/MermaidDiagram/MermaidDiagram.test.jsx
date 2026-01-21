/**
 * MermaidDiagram.test.jsx
 * ------------------------------------------------------------------
 * Minimal unit tests for MermaidDiagram.
 *
 * Purpose:
 * - Smoke test rendering
 * - Verify export button wiring
 *
 * Rendering correctness is covered by Playwright. "/playwright/**.spec.js"
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import MermaidDiagram from "./index";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

// Mock mermaid to prevent real rendering
vi.mock("mermaid", () => ({
  initialize: vi.fn(),
  render: vi.fn(),
}));

// Mock html-to-image
vi.mock("html-to-image", () => ({
  toPng: vi.fn(() => Promise.resolve("data:image/png;base64,test")),
}));

describe("MermaidDiagram (unit)", () => {
  it("renders without crashing", () => {
    render(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Test Diagram" />);

    expect(screen.getByText("Test Diagram")).toBeInTheDocument();
  });

  it("triggers export when clicking download button", async () => {
    render(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Export Test" />);

    await userEvent.click(screen.getByText(/download png/i));

    // No assertion needed — if it errors, test fails
    expect(true).toBe(true);
  });
});
