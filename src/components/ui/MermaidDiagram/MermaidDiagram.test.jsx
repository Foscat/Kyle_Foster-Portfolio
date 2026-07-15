/**
 * @module src\components\ui\MermaidDiagram\MermaidDiagram.test
 * @description src\components\ui\MermaidDiagram\MermaidDiagram.test module.
 * @file src\components\ui\MermaidDiagram\MermaidDiagram.test.jsx
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

import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import mermaid from "mermaid";
import MermaidDiagram from "components/ui/MermaidDiagram";
import renderWithProviders from "tests/renderWithProviders";

const mockToPng = vi.fn(() => Promise.resolve("data:image/png;base64,test"));
const mockTryRecoverFromChunkLoadFailure = vi.fn();

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

vi.mock("html-to-image", () => ({
  toPng: (...args) => mockToPng(...args),
}));

vi.mock("assets/chunkLoadRecovery.js", () => ({
  tryRecoverFromChunkLoadFailure: (...args) => mockTryRecoverFromChunkLoadFailure(...args),
}));

// Canvas stubs - jsdom doesn't implement canvas rendering.
const mockToDataURL = vi.fn(() => "data:image/png;base64,test");
const mockFillRect = vi.fn();
const mockDrawImage = vi.fn();
const mockScale = vi.fn();

const mockContext = {
  scale: mockScale,
  fillRect: mockFillRect,
  drawImage: mockDrawImage,
  fillStyle: "",
};

beforeEach(() => {
  mockToPng.mockReset();
  mockToPng.mockResolvedValue("data:image/png;base64,test");
  mockToDataURL.mockClear();
  mockFillRect.mockClear();
  mockDrawImage.mockClear();
  mockScale.mockClear();
  mockTryRecoverFromChunkLoadFailure.mockClear();

  // Stub HTMLCanvasElement for jsdom (no native canvas support).
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(mockContext);
  vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockImplementation(mockToDataURL);

  // URL.createObjectURL / revokeObjectURL are not in jsdom.
  globalThis.URL.createObjectURL = vi.fn(() => "blob:mock");
  globalThis.URL.revokeObjectURL = vi.fn();

  // Make Image src assignments fire onload synchronously.
  Object.defineProperty(globalThis.Image.prototype, "src", {
    configurable: true,
    set(_src) {
      // Schedule onload so it fires after current microtask.
      Promise.resolve().then(() => this.onload?.());
    },
  });
});

describe("MermaidDiagram (unit)", () => {
  it("renders without crashing", () => {
    renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Test Diagram" />);

    expect(screen.getByText("Test Diagram")).toBeInTheDocument();
  });

  it("requests chunk recovery when Mermaid rendering hits a dynamic module failure", async () => {
    const moduleError = new TypeError(
      "Failed to fetch dynamically imported module: https://example.com/assets/mermaid.core.js"
    );
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    mermaid.render.mockRejectedValueOnce(moduleError);

    try {
      renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Recovery Test" />);

      await waitFor(() => {
        expect(mockTryRecoverFromChunkLoadFailure).toHaveBeenCalledWith({
          payload: { message: moduleError.message },
        });
      });
    } finally {
      consoleError.mockRestore();
    }
  });

  it("normalizes rendered svg dimensions without forcing inline upscaling", async () => {
    renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Normalize Test" />);

    const diagramHost = screen.getByRole("img", { name: /normalize test/i });

    await waitFor(() => {
      expect(diagramHost.innerHTML).toContain("<svg");
    });

    expect(diagramHost.innerHTML).not.toContain('height="');
    expect(diagramHost.innerHTML).toMatch(/style="[^"]*width:\s*min\(100%,/i);
    expect(diagramHost.innerHTML).toMatch(/style="[^"]*height:\s*auto/i);
  });

  it("trims Mermaid viewBox whitespace to the rendered graph bounds when possible", async () => {
    const originalGetBBox = SVGSVGElement.prototype.getBBox;
    SVGSVGElement.prototype.getBBox = vi.fn(() => ({
      x: 40,
      y: 80,
      width: 220,
      height: 120,
    }));

    try {
      mermaid.render.mockResolvedValueOnce({
        svg: '<svg viewBox="0 0 320 320"><g><rect x="40" y="80" width="220" height="120"></rect></g></svg>',
      });

      renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Trim Test" />);

      const diagramHost = screen.getByRole("img", { name: /trim test/i });

      await waitFor(() => {
        expect(diagramHost.innerHTML).toContain('viewBox="28 68 244 144"');
      });
    } finally {
      if (originalGetBBox) {
        SVGSVGElement.prototype.getBBox = originalGetBBox;
      } else {
        delete SVGSVGElement.prototype.getBBox;
      }
    }
  });

  it("exports a PNG from the rendered SVG canvas path when the download button is clicked", async () => {
    renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Export Test" />);

    const diagramHost = screen.getByRole("img", { name: /export test/i });

    await waitFor(() => {
      expect(diagramHost.innerHTML).toContain("<svg");
    });

    await userEvent.click(screen.getByText(/download png/i));

    await waitFor(() => {
      expect(mockToDataURL).toHaveBeenCalledWith("image/png");
    });

    expect(mockToPng).not.toHaveBeenCalled();
    expect(mockScale).toHaveBeenCalledWith(3, 3);
    expect(mockFillRect).toHaveBeenCalled();
    expect(mockDrawImage).toHaveBeenCalled();
  });

  it("falls back to browser-node capture when both canvas export paths fail", async () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    renderWithProviders(<MermaidDiagram diagram="flowchart LR\nA --> B" title="Fallback Test" />);

    const diagramHost = screen.getByRole("img", { name: /fallback test/i });

    await waitFor(() => {
      expect(diagramHost.innerHTML).toContain("<svg");
    });

    await userEvent.click(screen.getByText(/download png/i));

    await waitFor(() => {
      expect(mockToPng).toHaveBeenCalled();
    });

    const [node, options] = mockToPng.mock.calls[0];
    expect(node).toBeInstanceOf(HTMLElement);
    expect(node.innerHTML).toContain("<svg");
    expect(options).toMatchObject({
      pixelRatio: 3,
      cacheBust: true,
    });
    expect(options.width).toBeGreaterThan(0);
    expect(options.height).toBeGreaterThan(0);
  });

  it("keeps nested Mermaid edge-label markup unchanged in fallback export", async () => {
    const originalSerialize = XMLSerializer.prototype.serializeToString;
    let serializedSvg = "";

    const serializeSpy = vi
      .spyOn(XMLSerializer.prototype, "serializeToString")
      .mockImplementation(function (node) {
        serializedSvg = originalSerialize.call(this, node);
        return serializedSvg;
      });

    mermaid.render.mockResolvedValueOnce({
      svg: `
        <svg viewBox="0 0 320 180">
          <g class="edgeLabels">
            <g class="edgeLabel" transform="translate(100, 80)">
              <g class="label" data-id="edge-web" transform="translate(-22, -15)">
                <foreignObject width="44" height="30">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    class="labelBkg"
                    style="background-color: rgb(12, 44, 84); color: rgb(245, 247, 255); font-size: 16px; font-weight: 600;"
                  >
                    <span class="edgeLabel"><p>Web</p></span>
                  </div>
                </foreignObject>
              </g>
            </g>
          </g>
        </svg>
      `,
    });

    try {
      renderWithProviders(
        <MermaidDiagram diagram="flowchart LR\nA --> B" title="Nested Edge Label Export" />
      );

      const diagramHost = screen.getByRole("img", { name: /nested edge label export/i });

      await waitFor(() => {
        expect(diagramHost.innerHTML).toContain("<svg");
      });

      await userEvent.click(screen.getByText(/download png/i));

      await waitFor(() => {
        expect(mockToDataURL).toHaveBeenCalledWith("image/png");
      });

      expect(serializedSvg).toContain("<foreignObject");
      expect(serializedSvg).toContain("labelBkg");
      expect(serializedSvg).toContain("font-size: 14px");
      expect(serializedSvg).toContain(">Web<");
    } finally {
      serializeSpy.mockRestore();
    }
  });

  it("keeps a visible edge-label background in light-theme export", async () => {
    const originalSerialize = XMLSerializer.prototype.serializeToString;
    let serializedSvg = "";

    const serializeSpy = vi
      .spyOn(XMLSerializer.prototype, "serializeToString")
      .mockImplementation(function (node) {
        serializedSvg = originalSerialize.call(this, node);
        return serializedSvg;
      });

    mermaid.render.mockResolvedValueOnce({
      svg: `
        <svg viewBox="0 0 320 180">
          <g class="edgeLabels">
            <g class="edgeLabel" transform="translate(100, 80)">
              <g class="label" data-id="edge-web" transform="translate(-22, -15)">
                <foreignObject width="44" height="30">
                  <div
                    xmlns="http://www.w3.org/1999/xhtml"
                    class="labelBkg"
                    style="color: rgb(29, 52, 71); font-size: 16px; font-weight: 600;"
                  >
                    <span class="edgeLabel"><p>Web</p></span>
                  </div>
                </foreignObject>
              </g>
            </g>
          </g>
        </svg>
      `,
    });

    try {
      renderWithProviders(
        <MermaidDiagram
          diagram="flowchart LR\nA --> B"
          title="Light Edge Label Export"
          theme="light"
        />
      );

      const diagramHost = screen.getByRole("img", { name: /light edge label export/i });

      await waitFor(() => {
        expect(diagramHost.innerHTML).toContain("<svg");
      });

      await userEvent.click(screen.getByText(/download png/i));

      await waitFor(() => {
        expect(mockToDataURL).toHaveBeenCalledWith("image/png");
      });

      expect(serializedSvg).toContain("<foreignObject");
      expect(serializedSvg).toContain("labelBkg");
      expect(serializedSvg).toContain("color: rgb(29, 52, 71)");
      expect(serializedSvg).toContain("background-color: rgb(255, 255, 255)");
      expect(serializedSvg).toContain("font-size: 14px");
    } finally {
      serializeSpy.mockRestore();
    }
  });

  it("adds background treatment to cluster labels in export", async () => {
    const originalSerialize = XMLSerializer.prototype.serializeToString;
    let serializedSvg = "";

    const serializeSpy = vi
      .spyOn(XMLSerializer.prototype, "serializeToString")
      .mockImplementation(function (node) {
        serializedSvg = originalSerialize.call(this, node);
        return serializedSvg;
      });

    mermaid.render.mockResolvedValueOnce({
      svg: `
        <svg viewBox="0 0 320 180">
          <g class="clusters">
            <g class="cluster" data-look="classic">
              <rect x="8" y="8" width="200" height="120"></rect>
              <g class="cluster-label" transform="translate(40, 8)">
                <foreignObject width="120" height="30">
                  <div xmlns="http://www.w3.org/1999/xhtml">
                    <span class="nodeLabel"><p>Execution Runtime</p></span>
                  </div>
                </foreignObject>
              </g>
            </g>
          </g>
        </svg>
      `,
    });

    try {
      renderWithProviders(
        <MermaidDiagram
          diagram="flowchart LR\nA --> B"
          title="Cluster Label Export"
          theme="light"
        />
      );

      const diagramHost = screen.getByRole("img", { name: /cluster label export/i });

      await waitFor(() => {
        expect(diagramHost.innerHTML).toContain("<svg");
      });

      await userEvent.click(screen.getByText(/download png/i));

      await waitFor(() => {
        expect(mockToDataURL).toHaveBeenCalledWith("image/png");
      });

      expect(serializedSvg).toContain("cluster-label");
      expect(serializedSvg).toContain("Execution Runtime");
      expect(serializedSvg).toContain("background-color");
      expect(serializedSvg).toContain("background-color: rgba(255, 255, 255, 0.98)");
      expect(serializedSvg).toContain("display: inline-flex");
      expect(serializedSvg).toContain("text-align: center");
      expect(serializedSvg).not.toContain(
        'cluster-label" transform="translate(40, 8)"><foreignObject width="120" height="30" style="background-color'
      );
    } finally {
      serializeSpy.mockRestore();
    }
  });

  it("opens a fullscreen viewer without rendering metadata text inside the modal", async () => {
    renderWithProviders(
      <MermaidDiagram
        diagram="flowchart LR\nA --> B"
        title="Fullscreen Title"
        description="Fullscreen description text"
      />
    );

    await userEvent.click(screen.getByText(/full screen/i));

    const dialog = await screen.findByRole("dialog");
    await waitFor(() => {
      expect(
        within(dialog).getByRole("img", { name: /mermaid diagram fullscreen view/i })
      ).toBeInTheDocument();
    });

    expect(within(dialog).queryByText(/fullscreen title/i)).not.toBeInTheDocument();
    expect(within(dialog).queryByText(/fullscreen description text/i)).not.toBeInTheDocument();
  });

  it("keeps structured description content inside the diagram description boundary", async () => {
    renderWithProviders(
      <MermaidDiagram
        diagram="flowchart LR\nA --> B"
        title="Structured Description"
        description={[
          {
            type: "p",
            children: [{ type: "text", text: "A concise structured description." }],
          },
        ]}
      />
    );

    // RichText is lazy-loaded, so assert after its suspense boundary resolves.
    const description = await screen.findByText(
      "A concise structured description.",
      {},
      { timeout: 5000 }
    );

    expect(screen.getByRole("note", { name: "Diagram description" })).toContainElement(description);
  });
});
