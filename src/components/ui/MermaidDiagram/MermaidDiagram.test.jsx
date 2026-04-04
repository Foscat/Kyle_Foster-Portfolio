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

import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { toPng } from "html-to-image";
import MermaidDiagram from "components/ui/MermaidDiagram";
import renderWithProviders from "tests/renderWithProviders";

/* ------------------------------------------------------------------
 * Mocks
 * ------------------------------------------------------------------ */

vi.mock("components/ui", async () => {
  const actual = await vi.importActual("components/ui");
  return {
    ...actual,
    Btn: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
    FrostedIcon: ({ label = "icon" }) => <span>{label}</span>,
  };
});

// Mock mermaid to prevent real rendering.
vi.mock("mermaid", () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn(() => Promise.resolve({ svg: '<svg viewBox="0 0 320 180"></svg>' })),
  },
}));

// Mock html-to-image.
vi.mock("html-to-image", () => ({
  toPng: vi.fn(() => Promise.resolve("data:image/png;base64,test")),
}));

describe("MermaidDiagram (unit)", () => {
  it("renders without crashing", () => {
    renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Test Diagram" />);

    expect(screen.getByText("Test Diagram")).toBeInTheDocument();
  });

  it("normalizes rendered svg dimensions", async () => {
    renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Normalize Test" />);

    const diagramHost = screen.getByRole("img", { name: /normalize test/i });

    await waitFor(() => {
      expect(diagramHost.innerHTML).toContain("<svg");
    });

    expect(diagramHost.innerHTML).not.toContain('height="');
    expect(diagramHost.innerHTML).toMatch(/style="[^"]*width:\s*100%/i);
    expect(diagramHost.innerHTML).toMatch(/style="[^"]*height:\s*auto/i);
  });

  it("exports with stable dimensions from an off-screen clone", async () => {
    renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Export Test" />);

    const diagramHost = screen.getByRole("img", { name: /export test/i });

    await waitFor(() => {
      expect(diagramHost.innerHTML).toContain("<svg");
    });

    await userEvent.click(screen.getByText(/download diagram/i));

    await waitFor(() => {
      expect(toPng).toHaveBeenCalledTimes(1);
    });

    const [node, options] = vi.mocked(toPng).mock.calls[0];
    expect(node).toBeInstanceOf(HTMLElement);
    expect(node.innerHTML).toContain("<svg");
    expect(node.innerHTML).toContain('width="320"');
    expect(node.innerHTML).toContain('height="180"');
    expect(options).toMatchObject({
      pixelRatio: 2,
      width: 368,
      height: 228,
    });
  });
});
