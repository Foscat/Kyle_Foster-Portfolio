# Kyle Foster — Portfolio Application

This repository contains the source code, tooling, and documentation for a modern React-based portfolio application. The project is intentionally engineered to demonstrate **clean architecture**, **predictable UI composition**, **strong testing discipline**, and **professional-grade tooling**.

The application is not just a UI showcase—it is a fully documented system with clear separation between runtime code, navigation orchestration, content rendering, testing contracts, and build tooling.

---

## 🚀 Project Goals

* Demonstrate production-quality React architecture
* Enforce consistency through tooling and documentation
* Showcase maintainable UI composition patterns
* Provide clear onboarding context for reviewers and contributors

---

## 🧭 High-Level Architecture

The system is built around **declarative pages**, **data-driven sections**, and **composable content blocks**, coordinated through a shared navigation and registry layer.

### Architecture Overview

Start here to understand how the entire system fits together:

📄 **Architecture Overview**
→ [`architecture_overview.md`](architecture_overview.md)

This document explains:

* Page → Section → Block composition
* Navigation and scroll coordination
* Section registration lifecycle
* Why responsibilities are intentionally separated

---

## 🧩 Documentation Index

All major subsystems are documented independently to keep the documentation focused and readable.

### Components

📄 [`docs/components.md`](docs/components.md)

Covers:

* Reusable UI components
* Props, accessibility contracts, and behavior
* Frosted UI patterns and variants

---

### Navigation

📄 [`docs/navigation.md`](docs/navigation.md)

Covers:

* `StickyNav` and `StickySectionNav`
* Section registration and scroll tracking
* Navigation state coordination

---

### Scripts & Tooling

📄 [`scripts/README.md`](scripts/README.md)

Covers:

* Diagram generation pipeline
* Formatting, linting, and rendering scripts
* Codemods and safety guidelines
* CI vs manual tooling distinctions

---

### Tests

📄 [`docs/tests.md`](docs/tests.md)

Covers:

* Component testing philosophy
* Page-level contract testing
* Shared test helpers and factories
* What tests guarantee—and what they intentionally do not

---

### Types & UI Contracts

📄 [`docs/types.md`](docs/types.md)

Covers:

* Shared UI enums and types
* Variant and size contracts
* Block and section data shapes

---

## 🖼️ Generated Diagrams

This project includes **automatically rendered Mermaid diagrams** used throughout the documentation.

Diagrams are:

* Authored in Mermaid syntax
* Validated and linted
* Rendered to transparent PNGs using Playwright

### Diagram Assets

📁 [`docs/diagrams/`](docs/diagrams/)

Example diagrams include:

* Page → Section → Block rendering flow
* Navigation and registry relationships
* UI composition patterns

These images are generated via documented scripts and should not be edited manually.

---

## 🛠️ Documentation Generation

Documentation is generated using **JSDoc** and **jsdoc-to-markdown**.

Available commands:

```sh
npm run docs:components
npm run docs:navigation
npm run docs:tests
npm run docs:types
```

Each command outputs a focused Markdown file under `docs/`.

Strict JSDoc rules are enforced to prevent documentation drift and generation failures.

---

## 🧪 Testing Philosophy

Testing is treated as a **first-class architectural concern**.

* Components are tested for behavior, not structure
* Pages are tested declaratively via shared contracts
* Navigation and utilities are tested at invariant boundaries

Tests are designed to answer:

> *“What must always be true?”*

—not *“How is this implemented?”*

---

## 🧱 Technology Stack

* **React** — UI framework
* **RSuite** — component primitives
* **FontAwesome** — iconography
* **Mermaid** — diagram authoring
* **Playwright** — diagram rendering
* **Vitest / Testing Library** — testing

---

## 📌 Final Notes

This repository is intentionally opinionated.

It prioritizes:

* Predictability over flexibility
* Documentation over tribal knowledge
* Tooling discipline over convenience

Every abstraction, script, and convention exists for a reason—and that reasoning is documented.

---

If you are reviewing this project, the **Architecture Overview** is the best place to begin.
