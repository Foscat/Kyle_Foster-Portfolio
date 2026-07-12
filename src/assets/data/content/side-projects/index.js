/**
 * @file src\assets\data\content\side-projects\index.js
 * @description src\assets\data\content\side-projects\index module.
 * @module src\assets\data\content\side-projects\index
 */

import {
  faArrowsToCircle,
  faBookBookmark,
  faBrush,
  faCodeBranch,
  faCodeCompare,
  faDiceD20,
  faExclamationTriangle,
  faFlagCheckered,
  faKey,
  faLaptopCode,
  faLayerGroup,
  faLightbulb,
  faSeedling,
  faTowerObservation,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { BlockType } from "types/ui.types.js";
import diagrams from "./diagrams.js";
import imgObjs from "assets/images/sideProjects";
import { faNpm } from "@fortawesome/free-brands-svg-icons";

const sideProjectSections = [
  /* ============================================================
       Overview
       ============================================================ */
  {
    id: "overview",
    title: "Project Collection",
    icon: faTowerObservation,
    isScroller: true,
    deferDiagrams: false,
    blocks: [
      {
        id: "overview-text",
        type: BlockType.RICH_TEXT,
        title: "Exploring Practical Builds",
        icon: faTowerObservation,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "Side projects are where I test ideas end to end before they ever reach client work.",
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each project starts from a specific problem, such as unstable greenhouse climate signals, auth session edge cases, or campaign data that outgrows spreadsheets.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Because these builds are self-directed, they require end-to-end ownership:",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [{ type: "text", text: "Technology choices and trade-off mapping." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Frontend and backend implementation." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Deployment, monitoring, and iteration." }],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Post-launch cleanup and refactor planning." }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Across hardware automation, security tooling, and full-stack applications, these projects show domain adaptability with a consistent engineering approach.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Principle: identify the problem, choose practical trade-offs, and iterate until behavior holds up outside ideal conditions.",
              },
            ],
          },
        ],
      },
      {
        id: "overview-why-it-mattered",
        type: BlockType.CARD_GRID,
        title: "Why It Mattered",
        subtitle: "Who it served, the problem, the solution, ownership, and impact.",
        items: [
          {
            id: "side-projects-who-it-served",
            title: "Who It Served",
            subtitle: "Real users in practical domains",
            icon: faSeedling,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "These builds served concrete use cases across automation, security tooling, and creator tasks where generic products were not a good fit.",
                  },
                ],
              },
            ],
          },
          {
            id: "side-projects-problem-solved",
            title: "Main Challenge",
            subtitle: "Practical problems lacked clean off-the-shelf solutions",
            icon: faExclamationTriangle,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Each project started from a specific operational problem that required custom trade-offs in UX, architecture, or hardware/software behavior.",
                  },
                ],
              },
            ],
          },
          {
            id: "side-projects-solution",
            title: "Custom Software Response",
            subtitle: "Problem-first system design and iteration",
            icon: faLightbulb,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "I turned practical problems into working architectures, then iterated from real use and failure points instead of stopping at prototype-level demos.",
                  },
                ],
              },
            ],
          },
          {
            id: "side-projects-what-i-owned",
            title: "What I Owned",
            subtitle: "End-to-end product and engineering decisions",
            icon: faLaptopCode,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "I owned architecture, implementation, iteration, and long-term maintenance, including frontend, backend, hardware integration, and deployment trade-offs.",
                  },
                ],
              },
            ],
          },
          {
            id: "side-projects-what-changed",
            title: "What Changed",
            subtitle: "Reusable patterns and stronger delivery range",
            icon: faFlagCheckered,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The result was working software and reusable patterns that strengthened later architecture and delivery decisions.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "interactive-surface-css",
    slug: "interactive-surface-css",
    title: "Interactive Surface CSS",
    icon: faLayerGroup,
    isScroller: true,
    blocks: [
      {
        id: "interactive-surface-problem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "Challenge: Inconsistent Interaction Behavior",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Small interaction details strongly affect how coherent an interface feels. When buttons, cards, icon controls, and other click targets are styled independently, their hover, focus, pressed, and disabled states tend to drift as an application grows.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "That drift makes the product less predictable and forces developers to solve the same interaction problems in multiple components.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Repeated UI work:" },
                  {
                    type: "text",
                    text: " each new interactive component tends to re-implement the same state styling.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Inconsistent behavior:" },
                  {
                    type: "text",
                    text: " hover, focus, active, and disabled states can drift apart over time.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Weak system reuse:" },
                  {
                    type: "text",
                    text: " interaction behavior is often treated as decoration instead of shared architecture.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Visual state representation:" },
                  {
                    type: "text",
                    text: " each state communicates whether an element is available, focused, selected, pressed, or disabled.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🎯" },
              {
                type: "text",
                text: "The goal was not to perfect one button. It was to create a reusable interaction model that could remain consistent across an interface.",
              },
            ],
          },
        ],
      },

      diagrams.interactiveSurfaceStateModel,

      {
        id: "interactive-surface-solution-text",
        type: BlockType.RICH_TEXT,
        icon: faLightbulb,
        title: "Solution: Shared Interaction Primitive",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Interactive Surface CSS packages the shared behavior of buttons, cards, and icon controls into one reusable primitive. Applications can apply that primitive across different components and products without rebuilding the state model each time.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The library standardizes base, hover, focus-visible, active, pressed, toggled, and disabled behavior while remaining configurable through CSS custom properties. Products can adapt its appearance without changing the underlying interaction contract.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Framework agnostic:" },
                  {
                    type: "text",
                    text: " Built so that it can be dropped into different frontend stacks without requiring a component library rewrite.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Token-driven:" },
                  {
                    type: "text",
                    text: " All aspects of appearance, motion, focus ring, and depth are controlled through a structured token contract.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Accessibility-aware:" },
                  {
                    type: "text",
                    text: " Keyboard focus, reduced motion, high contrast, and icon target sizing are treated as first-class requirements rather than an afterthought.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🧩" },
              {
                type: "text",
                text: "The important design move was treating interaction behavior as a reusable primitive rather than a series of one-off visual effects.",
              },
            ],
          },
        ],
      },

      diagrams.interactiveSurfaceTokenFlow,

      {
        id: "interactive-surface-takeaways",
        type: BlockType.CARD_GRID,
        title: "What This Proved",
        subtitle: "What this project demonstrates beyond surface-level styling",
        items: [
          {
            id: "interactive-surface-takeaway-1",
            title: "Design System Thinking",
            subtitle: "Turning repeated interface behavior into reusable architecture",
            icon: faCodeCompare,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "This project reflects my mindset of creating systems to solve problems. Instead of styling isolated UI pieces, I extracted a repeated interaction problem and turned it into a reusable layer that can support many components.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Shared interaction rules instead of repeated component-specific styling",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Clear separation between theme values and interaction behavior",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Better maintainability as a UI grows" }],
                  },
                ],
              },
            ],
          },
          {
            id: "interactive-surface-takeaway-2",
            title: "Accessibility by Default",
            subtitle: "Building interaction quality without making accessibility an afterthought",
            icon: faUserShield,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The package was designed to make accessible behavior the default path rather than an extra pass at the end of development.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Visible keyboard focus treatment" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Reduced-motion support and high-contrast awareness" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Touch-friendly icon-only interaction targets" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "interactive-surface-takeaway-3",
            title: "Reusable Package Discipline",
            subtitle: "Shipping a small library in a form that other developers can actually adopt",
            icon: faCodeBranch,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "A good internal idea is not enough. I also treated packaging, documentation, and testing as part of the product so the primitive could be reused outside of a single app.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Token documentation and usage guidance" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Cross-browser validation of interaction behavior" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Publish-ready structure instead of demo-only code" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: BlockType.LINKS,
        id: "interactive-surface-links",
        items: [
          {
            id: "interactive-surface-link-1",
            title: "View Source Code",
            url: "https://github.com/Foscat/Interactive-Surface-CSS",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faCodeBranch,
            ariaLabel: "Link to the Interactive Surface CSS code repository on GitHub",
          },
          {
            id: "interactive-surface-link-2",
            title: "View NPM Package",
            url: "https://www.npmjs.com/package/interactive-surface-css",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faNpm,
            ariaLabel: "Link to the Interactive Surface CSS package on NPM",
          },
          {
            id: "interactive-surface-link-3",
            title: "Read Documentation",
            url: "https://foscat.github.io/Interactive-Surface-CSS/",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faBookBookmark,
          },
        ],
      },
    ],
  },

  {
    id: "ui-style-kit-css",
    slug: "ui-style-kit-css",
    title: "UI Style Kit CSS",
    icon: faBrush,
    isScroller: true,
    blocks: [
      {
        id: "ui-style-kit-problem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "Challenge: Repetitive UI Styling Work",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Teams often need lightweight, reusable UI styling primitives without adopting a full component framework. When utility styles, interaction states, and visual tokens are scattered, consistency drops and onboarding slows.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Inconsistent styles:" },
                  {
                    type: "text",
                    text: " duplicated class patterns drift over time across pages and components.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Slow implementation:" },
                  {
                    type: "text",
                    text: " repeated setup work is required before teams can ship polished interfaces.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ui-style-kit-solution-text",
        type: BlockType.RICH_TEXT,
        icon: faLightbulb,
        title: "Solution: Reusable Styling Utility Layer",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "ui-style-kit-css packages practical, reusable styling utilities into a focused npm library. It is designed for quick drop-in adoption so teams can ship consistent UI behavior with less setup overhead.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Reusable style primitives for faster UI delivery" },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Consistent interaction styling across components" },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Simple npm-based integration into existing frontend stacks",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "ui-style-kit-gallery",
        type: BlockType.IMAGE_GALLERY,
        title: "Project Preview",
        items: [imgObjs.uiStyleKitSocialCard],
      },
      {
        type: BlockType.LINKS,
        id: "ui-style-kit-links",
        items: [
          {
            id: "ui-style-kit-link-github",
            title: "View Source Code",
            url: "https://github.com/Foscat/ui-style-kit-css",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faCodeBranch,
            ariaLabel: "Link to the ui-style-kit-css repository on GitHub",
          },
          {
            id: "ui-style-kit-link-npm",
            title: "View NPM Package",
            url: "https://www.npmjs.com/package/ui-style-kit-css",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faNpm,
            ariaLabel: "Link to the ui-style-kit-css package on NPM",
          },
          {
            id: "ui-style-kit-link-docs",
            title: "Read Documentation",
            url: "https://foscat.github.io/ui-style-kit-css/",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faBookBookmark,
            ariaLabel: "Link to the ui-style-kit-css documentation site",
          },
        ],
      },
    ],
  },

  /* ============================================================
       Layout Style CSS
       ============================================================ */
  {
    id: "layout-style-css",
    slug: "layout-style-css",
    title: "Layout Style CSS",
    icon: faArrowsToCircle,
    isScroller: true,
    blocks: [
      {
        id: "layout-style-problem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "Challenge: Layout Ownership Across the UI Bundle",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Reusable UI systems need a clear boundary between layout structure, visual paint, and interaction behavior. Without that boundary, responsive wrappers, sidebars, grids, split sections, and spacing rules get rebuilt differently in every app.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Layout Style CSS exists as the layout layer in my UI bundle: layout-style-css owns spatial composition, ui-style-kit-css owns theme and visual surface roles, and interactive-surface-css owns interaction states.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Repeated layout decisions:" },
                  {
                    type: "text",
                    text: " wrapper, grid, stack, and sidebar behavior should not be reinvented for every page.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Unclear ownership:" },
                  {
                    type: "text",
                    text: " local CSS should not mix structural layout concerns with visual theme rules.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Harder responsive QA:" },
                  {
                    type: "text",
                    text: " each app needed its own safeguards for sidebars, content width, and overflow behavior.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "layout-style-preview",
        type: BlockType.IMAGE_GALLERY,
        title: "Documentation and Demo Preview",
        items: [imgObjs.layoutStyleSocialCard],
      },
      diagrams.layoutStyleBundleFlow,
      {
        id: "layout-style-solution-text",
        type: BlockType.RICH_TEXT,
        icon: faLightbulb,
        title: "Solution: Shared Spatial Composition Layer",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Layout Style CSS packages shell-first layout primitives into layout-style-css@1.1.2. It gives apps reusable classes for wrappers, content regions, sidebars, grids, stacks, clusters, panes, spacing utilities, and layout personalities while leaving color and surface paint to the UI theme layer.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Layout primitives such as " },
                  { type: "strong", text: ".ly-wrapper, .ly-section, .ly-stack, .ly-grid" },
                  { type: "text", text: ", and " },
                  { type: "strong", text: ".ly-sidebar-layout" },
                  { type: "text", text: " establish reusable page composition." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Switchable layout styles let the same content move between compact, editorial, maximalist, synthwave, and other spatial systems without rewriting page components.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "The portfolio consumes the library directly through global imports, theme context attributes, and shared layout primitives that stay independent from UI paint and interaction-state styling.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "layout-style-takeaways",
        type: BlockType.CARD_GRID,
        title: "What This Proved",
        subtitle: "How the layout layer completes the UI bundle",
        items: [
          {
            id: "layout-style-takeaway-1",
            title: "Clear Bundle Ownership",
            subtitle: "Layout, paint, and interaction states stay separate",
            icon: faCodeCompare,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The library keeps structural layout decisions in layout-style-css while ui-style-kit-css handles visual theme roles and interactive-surface-css handles interaction states.",
                  },
                ],
              },
            ],
          },
          {
            id: "layout-style-takeaway-2",
            title: "Reusable Responsive Contracts",
            subtitle: "Wrappers, grids, stacks, and sidebars become shared primitives",
            icon: faTowerObservation,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The package turns repeated layout recipes into tested class contracts that can be applied across portfolio pages, documentation surfaces, dashboards, and future product interfaces.",
                  },
                ],
              },
            ],
          },
          {
            id: "layout-style-takeaway-3",
            title: "Publish-Ready Library Work",
            subtitle: "Documentation, package exports, and demo artifacts matter",
            icon: faBookBookmark,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "This project required npm package discipline, documentation, release verification, and a demo surface so the library could be reused beyond one local app.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: BlockType.LINKS,
        id: "layout-style-links",
        items: [
          {
            id: "layout-style-link-github",
            title: "View Source Code",
            url: "https://github.com/Foscat/layout-style-css",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faCodeBranch,
            ariaLabel: "Link to the layout-style-css repository on GitHub",
          },
          {
            id: "layout-style-link-npm",
            title: "View NPM Package",
            url: "https://www.npmjs.com/package/layout-style-css",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faNpm,
            ariaLabel: "Link to the layout-style-css package on NPM",
          },
          {
            id: "layout-style-link-docs",
            title: "Read Documentation",
            url: "https://foscat.github.io/Layout-Style-CSS/",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faBookBookmark,
            ariaLabel: "Link to the layout-style-css documentation site",
          },
          {
            id: "layout-style-link-demo",
            title: "View Demo",
            url: "https://foscat.github.io/Layout-Style-CSS/",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faLaptopCode,
            ariaLabel: "Link to the layout-style-css demo site",
          },
        ],
      },
    ],
  },

  {
    id: "mern-template",
    slug: "mern-app-template-with-auth",
    title: "MERN App Template with Auth",
    icon: faKey,
    isScroller: true,
    blocks: [
      {
        id: "mern-template-problem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "Challenge: Slow Full-Stack Project Starts",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "New full-stack projects often lose momentum early because the same foundations are rebuilt from scratch. Authentication, route protection, API wiring, session handling, and deployment shape all need to exist before product work can begin.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "When those pieces are rebuilt in a rush, teams often end up with fragile scaffolding that works for a prototype but fails to establish durable patterns.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Slow project starts:" },
                  {
                    type: "text",
                    text: " too much time is spent recreating auth and routing foundations.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Inconsistent architecture:" },
                  {
                    type: "text",
                    text: " prototypes often skip patterns that production apps eventually need.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Auth complexity:" },
                  {
                    type: "text",
                    text: " session continuity and token refresh introduce practical edge cases quickly.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🏗️" },
              {
                type: "text",
                text: "The goal was to create a starter that moves quickly without teaching bad habits or ignoring production concerns.",
              },
            ],
          },
        ],
      },

      {
        id: "mern-template-solution-text",
        type: BlockType.RICH_TEXT,
        icon: faLightbulb,
        title: "Solution: Auth-Ready MERN Foundation",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "This template combines a React + Vite frontend with an Express + MongoDB backend, then adds JWT authentication, protected routes, role-aware structure, and a deployment model that serves both API and built client from one service.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The result is a reusable foundation for dashboards, internal tools, admin systems, and early SaaS concepts where authentication and session behavior need to be present from day one.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Access + refresh auth flow:" },
                  {
                    type: "text",
                    text: " short-lived access tokens work alongside an HTTP-only refresh cookie.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Protected frontend structure:" },
                  {
                    type: "text",
                    text: " routing and dashboard scaffolding already assume authenticated use cases.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Deployment-minded:" },
                  {
                    type: "text",
                    text: " the server can host both the API and the built client for simpler production setup.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🔐" },
              {
                type: "text",
                text: "This project is less about one finished app and more about building a dependable launch point for many future apps.",
              },
            ],
          },
        ],
      },
      {
        id: "mern-template-gallery",
        type: BlockType.IMAGE_GALLERY,
        title: "Project Preview",
        items: [imgObjs.mernTemplateSocialCard],
      },

      diagrams.mernAuthLifecycle,
      diagrams.mernDeploymentFlow,

      {
        id: "mern-template-takeaways",
        type: BlockType.CARD_GRID,
        title: "What This Proved",
        subtitle: "What this starter says about how I approach application architecture",
        items: [
          {
            id: "mern-template-takeaway-1",
            title: "Authentication Engineering",
            subtitle: "Designing for real session behavior instead of one-time login success",
            icon: faUserShield,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The most interesting part of the template is the authentication flow. It handles short-lived access tokens, refresh-based session renewal, and retry behavior when requests fail during token expiration windows.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "JWT bearer auth for protected API calls" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "HTTP-only refresh cookie for session continuation" },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Queued retry flow to avoid refresh storms" }],
                  },
                ],
              },
            ],
          },
          {
            id: "mern-template-takeaway-2",
            title: "Reusable Full-Stack Foundations",
            subtitle: "Starting faster without throwing structure away later",
            icon: faLaptopCode,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "I built this as a reusable baseline for future work. It reduces setup time, but it also encodes better defaults so new projects begin with a stronger architectural spine.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Frontend and backend separation already in place" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Protected routes and dashboard shell ready to extend",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Environment-aware start and build process" }],
                  },
                ],
              },
            ],
          },
          {
            id: "mern-template-takeaway-3",
            title: "Production-Oriented Pragmatism",
            subtitle: "Keeping deployment and maintainability in view from the start",
            icon: faArrowsToCircle,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "This template reflects a practical bias: start with patterns that can survive contact with a real deployment instead of treating infrastructure concerns as something to fix later.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Single-service deployment path for simpler hosting" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Documentation-oriented codebase with JSDoc support" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Useful for internal tools, admin apps, and early SaaS builds",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  /* ============================================================
       Greenhouse Climate Controller
       ============================================================ */

  {
    id: "greenhouse",
    title: "Greenhouse Controller",
    icon: faSeedling,
    isScroller: true,
    blocks: [
      {
        id: "greenhouse-problem-text",
        type: BlockType.RICH_TEXT,
        icon: faExclamationTriangle,
        title: "Challenge: Manual Climate Control Overhead",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Maintaining a stable environment is critical for year-round plant growth in a greenhouse, especially when physical access is limited.",
              },
              {
                type: "strong",
                text: " Manual monitoring and adjustment of temperature and humidity is impractical for consistent plant health.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Temperature and humidity fluctuate throughout the day due to weather shifts, sunlight intensity, and airflow variability. Manual monitoring introduces delay, inconsistency, and human error.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Reactive adjustments instead of proactive regulation." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "text", text: "Inconsistent plant growth due to environmental drift." },
                ],
              },
              {
                type: "li",
                children: [{ type: "text", text: "Time-intensive manual intervention." }],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "When physical access is limited, maintaining stable year-round growth becomes operationally impractical without automation.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Challenge: environmental regulation must be continuous, autonomous, and adaptive to changing conditions.",
              },
            ],
          },
        ],
      },
      diagrams.greenhouseMentalModel,
      {
        id: "greenhouse-control-board",
        type: BlockType.IMAGE_GALLERY,
        title: "Control Board",
        items: [imgObjs.greenhouseControls, imgObjs.greenhouseHookedup],
      },
      {
        id: "greenhouse-solution-text",
        type: BlockType.RICH_TEXT,
        title: "Solution: Sensor-Driven Control Loop",
        icon: faLightbulb,
        content: [
          {
            type: "p",
            children: [
              {
                type: "strong",
                children: [
                  {
                    type: "text",
                    text: "An automated, sensor-driven climate control system was built around a Raspberry Pi Zero and Python.",
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The Pi functions as a centralized controller, continuously sampling environmental data and executing rule-based decisions in real time.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "text", text: "Temperature and humidity monitored via onboard sensors." },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Relay modules control heaters, circulation fans, vents, humidifiers, dehumidifiers, and lighting.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  {
                    type: "text",
                    text: "Decision logic evaluates thresholds and device state before triggering changes.",
                  },
                ],
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "The system operates as a closed-loop controller, minimizing environmental drift by continuously recalibrating device activation based on live feedback.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Configurable operating profiles define target ranges for different plant growth stages, allowing the greenhouse to transition between vegetative and flowering cycles without manual retuning.",
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              {
                type: "text",
                text: "Design objective: maintain environmental stability through autonomous, low-latency control while reducing human intervention to configuration only.",
              },
            ],
          },
        ],
      },
      {
        id: "greenhouse-takeaways",
        type: BlockType.CARD_GRID,
        title: "What This Proved",
        subtitle: "Lessons learned from designing and implementing a practical automation system",
        items: [
          {
            id: "gh-takeaway-1",
            title: "Automation & Control Systems",
            subtitle: "Designing a responsive, real-time control system under physical limits",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The project provided hands-on experience with real-time control systems, sensor integration, and the challenges of physical automation.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Continuous feedback sampling and threshold evaluation with state awareness.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Autonomous actuator response optimized for stability under fluctuating external conditions.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Robust error handling and graceful degradation in case of sensor or actuator failure.",
                      },
                    ],
                  },
                ],
              },
            ],
            icon: faCodeCompare,
          },
          {
            id: "gh-takeaway-2",
            title: "Embedded System Limits",
            subtitle: "Designing for limited hardware resources and real-time performance",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designing for limited hardware required prioritizing efficiency, reliability, and simplicity over feature complexity.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Memory-aware processing to ensure stability on limited hardware.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Resilient recovery from transient sensor failures.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Crash-resistant behavior in long-running processes.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  { type: "inlineIcon", icon: "🧠" },
                  {
                    type: "text",
                    text: "Principle: embedded systems reward simplicity, predictability, and disciplined state management.",
                  },
                ],
              },
            ],
          },
          {
            id: "gh-takeaway-3",
            title: "Reliability as a Design Priority",
            subtitle: "Designing for consistent operation under real operating conditions",
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "The system was designed with reliability as a core objective, prioritizing consistent operation under real conditions over feature richness.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Fail-safe defaults and error handling." }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Minimized manual intervention through autonomous decision-making.",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Long-term stability through continuous feedback and adaptive control rather than static configurations.",
                      },
                    ],
                  },
                ],
              },
              {
                type: "blockquote",
                children: [
                  {
                    type: "text",
                    text: "Principle: reliability is achieved through disciplined design that anticipates environmental variability and failure modes.",
                  },
                ],
              },
            ],
            icon: faArrowsToCircle,
          },
        ],
      },
      {
        id: "greenhouse-links",
        type: BlockType.LINKS,
        items: [
          {
            id: "greenhouse-link-1",
            title: "View Source Code",
            url: "https://github.com/Foscat/greenhouse",
            rel: "noopener noreferrer",
            target: "_blank",
            icon: faCodeBranch,
            ariaLabel: "Link to the Greenhouse Climate Controller code repository on GitHub",
          },
        ],
      },
    ],
  },

  /* ============================================================
       D20 King
       ============================================================ */

  {
    id: "d20",
    slug: "d20-king",
    title: "D20 King",
    icon: faDiceD20,
    isScroller: true,
    blocks: [
      {
        id: "d20-problem-text",
        icon: faExclamationTriangle,
        type: BlockType.RICH_TEXT,
        title: "Challenge: Fragmented Campaign Data",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Dungeon Masters manage campaigns that evolve over months or years, yet available tooling is often fragmented across documents, spreadsheets, and loosely connected notes. These tools capture information but do not model relationships.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "A campaign is not just text; it is a structured domain of story arcs, encounters, entities, rewards, and branching paths. Without a formal data model, narrative consistency becomes hard to maintain as complexity grows.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "No relational structure:" },
                  { type: "text", text: " encounters, rooms, and acts lack defined hierarchy." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Poor scalability:" },
                  { type: "text", text: " campaign data becomes unwieldy over time." },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Limited narrative control:" },
                  {
                    type: "text",
                    text: " branching paths and state tracking are handled manually.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "🗺️" },
              {
                type: "text",
                text: "The real problem was not note-taking; it was the absence of a structured domain model for long-running narrative systems.",
              },
            ],
          },
        ],
      },
      {
        id: "d20-screenshots",
        type: BlockType.IMAGE_GALLERY,
        title: "Development Screenshots",
        items: [imgObjs.d20Dashboard, imgObjs.opponentEditor],
      },
      {
        id: "d20-solution-text",
        icon: faLightbulb,
        type: BlockType.RICH_TEXT,
        title: "Solution: Structured Narrative Domain Model",
        content: [
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "D20 King models campaigns as structured narrative systems rather than collections of notes. The platform decomposes content into a hierarchical domain: ",
              },
              {
                type: "strong",
                text: "Storybook -> Act -> Room -> Encounter -> Opponent / Reward",
              },
              {
                type: "text",
                text: ", giving Dungeon Masters a predictable framework for organizing long-running campaigns.",
              },
            ],
          },
          {
            type: "p",
            children: [
              {
                type: "text",
                text: "Each layer represents a distinct aggregation boundary. Storybooks define campaign scope, Acts define narrative phases, Rooms define explorable contexts, and Encounters define gameplay events with opponents and rewards. This separation keeps structure stable as campaign complexity increases.",
              },
            ],
          },
          {
            type: "ul",
            children: [
              {
                type: "li",
                children: [
                  { type: "strong", text: "Modular composition:" },
                  {
                    type: "text",
                    text: " narrative elements can be reorganized or extended without rewriting the campaign.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Scalable hierarchy:" },
                  {
                    type: "text",
                    text: " data remains navigable even across multi-year story arcs.",
                  },
                ],
              },
              {
                type: "li",
                children: [
                  { type: "strong", text: "Extensible model:" },
                  {
                    type: "text",
                    text: " new entity types or mechanics can be introduced without restructuring the core system.",
                  },
                ],
              },
            ],
          },
          {
            type: "blockquote",
            children: [
              { type: "inlineIcon", icon: "📚" },
              {
                type: "text",
                text: "World-building becomes a structured domain model rather than an accumulation of disconnected documents.",
              },
            ],
          },
        ],
      },
      diagrams.domainModel,
      {
        id: "d20-takeaways",
        type: BlockType.CARD_GRID,
        title: "What This Proved",
        subtitle: "Architectural lessons from building a modular narrative system",
        items: [
          {
            id: "d20-takeaway-1",
            title: "Scalable Domain Modeling (MERN)",
            subtitle:
              "Designing a hierarchical data model that supports evolving narrative complexity without relational drift",
            icon: faLaptopCode,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Designed a hierarchical data model structured as ",
                  },
                  {
                    type: "strong",
                    text: "Storybook → Act → Room → Encounter",
                  },
                  {
                    type: "text",
                    text: ", enabling long-running campaigns to evolve without relational drift.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Clear aggregation boundaries between narrative layers",
                      },
                    ],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Ownership isolation across entities" }],
                  },
                  {
                    type: "li",
                    children: [
                      {
                        type: "text",
                        text: "Extensible schema design without structural rewrites",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "d20-takeaway-2",
            title: "Product Thinking for Creator Workflows",
            subtitle:
              "Designing a user interface that aligns with the underlying domain model to support creative planning",
            icon: faBrush,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Structured the system around Dungeon Masters as ",
                  },
                  {
                    type: "strong",
                    text: "primary content creators",
                  },
                  {
                    type: "text",
                    text: ", aligning UI architecture directly with the underlying domain model.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reorganization without data loss" }],
                  },
                  {
                    type: "li",
                    children: [{ type: "text", text: "Reusable campaign components" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Reduced friction during iterative world-building" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "d20-takeaway-3",
            title: "Structured Flexibility",
            subtitle: "Balancing strict hierarchy with controlled adaptability",
            icon: faBookBookmark,
            content: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Balanced strict hierarchical modeling with controlled adaptability, ensuring creative freedom did not compromise system integrity.",
                  },
                ],
              },
              {
                type: "ul",
                children: [
                  {
                    type: "li",
                    children: [{ type: "text", text: "Structure at the campaign level" }],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Flexibility within encounters and entities" },
                    ],
                  },
                  {
                    type: "li",
                    children: [
                      { type: "text", text: "Maintainable structure under increasing complexity" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
Object.freeze(sideProjectSections);
export default sideProjectSections;
