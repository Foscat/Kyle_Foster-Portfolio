/**
 * @file index.jsx
 * @description Portfolio landing page for hiring teams and STE product clients.
 * @module pages/Home
 */

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import codeStreamImages from "assets/images/codestream";
import hackathonImages from "assets/images/hackathon";
import steLogo from "assets/images/sideProjects/chris_sanderson_enterprises_logo.jpg";
import { Footer, helpers, UnifiedNavigation } from "components/navigation";
import { PageRoute } from "types/navigation.types";
import "./styles.css";

const home = pageSummaryMetas.Home;

const selectedProjects = [
  {
    id: "ste",
    index: "01",
    title: "Sanderson Technology Enterprises",
    featuredLabel: "Flagship case study",
    description:
      "Products, platforms, and an interface system built to turn specialized business needs into usable software.",
    context: "Product company and applied engineering practice.",
    role: "Senior developer, product designer, and frontend engineer.",
    image: {
      src: steLogo,
      alt: "Sanderson Technology Enterprises logo.",
    },
    route: PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
    linkLabel: "Explore the Sanderson Technology Enterprises case study",
  },
  {
    id: "codestream",
    index: "02",
    title: "CodeStream Studios",
    description:
      "Six years owning frontend architecture and delivery for a browser-based education platform.",
    context: "Coding, classroom operations, grading, and reporting.",
    role: "Sole frontend engineer from 2019 through 2025.",
    image: codeStreamImages.csos_home,
    route: PageRoute.PROFESSIONAL,
    linkLabel: "Explore the CodeStream Studios case study",
  },
  {
    id: "hackathon",
    index: "03",
    title: "Daimler Hackathon",
    description:
      "A winning voice-guided repair assistant shaped around the real sequence of a technician's work.",
    context: "Daimler Truck North America hackathon.",
    role: "Voice-command interpretation and backend routing.",
    image: hackathonImages.check,
    route: PageRoute.HACKATHON,
    linkLabel: "Explore the Daimler Hackathon case study",
  },
];

const interfacePackages = [
  {
    name: "layout-style-css",
    responsibility: "Responsive layout primitives and page topology",
    accent: "STRUCTURE",
  },
  {
    name: "ui-style-kit-css",
    responsibility: "Theme tokens, surfaces, typography, and visual identity",
    accent: "THEME",
  },
  {
    name: "ui-style-kit-icons",
    responsibility: "A consistent icon vocabulary for interface controls",
    accent: "ICONS",
  },
  {
    name: "interactive-surface-css",
    responsibility: "Interaction states, feedback, and accessible affordances",
    accent: "BEHAVIOR",
  },
];

/**
 * Render one proof-rich project row with a single descriptive destination.
 *
 * @param {object} props - Component properties.
 * @param {object} props.project - Curated project summary.
 * @returns {JSX.Element} Project article.
 */
function ProjectRow({ project }) {
  return (
    <article
      id={project.id === "codestream" ? "professional-experience" : undefined}
      className={`home-project-row ${project.featuredLabel ? "is-flagship" : ""}`}
      data-project={project.id}
    >
      <span className="home-project-row__index" aria-hidden="true">
        {project.index}
      </span>
      <div className="home-project-row__copy">
        {project.featuredLabel ? (
          <span className="home-project-row__featured">{project.featuredLabel}</span>
        ) : null}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <figure className="home-project-row__media">
        <img
          src={project.image.src}
          alt={project.image.alt}
          width="640"
          height="360"
          loading={project.featuredLabel ? "eager" : "lazy"}
        />
      </figure>
      <dl className="home-project-row__meta">
        <div>
          <dt>Context</dt>
          <dd>{project.context}</dd>
        </div>
        <div>
          <dt>My role</dt>
          <dd>{project.role}</dd>
        </div>
      </dl>
      <Link
        className="home-project-row__link interactive-surface"
        data-surface-variant={project.featuredLabel ? "primary" : "subtle"}
        data-surface-level={project.featuredLabel ? "2" : "1"}
        to={project.route}
        aria-label={project.linkLabel}
      >
        <span>Case study</span>
        <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
      </Link>
    </article>
  );
}

/**
 * Portfolio home page.
 *
 * @returns {JSX.Element} Dual-audience portfolio landing page.
 */
const Home = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <div className="home-page page-shell ly-wrapper ly-wrapper--wide ly-stack">
      <UnifiedNavigation activePage={home.url} />
      <main className="home-showcase app-main ly-stack">
        <section className="home-hero ly-section" aria-labelledby="home-title">
          <div className="home-hero__copy">
            <p className="home-eyebrow">Portfolio / 2026</p>
            <h1 id="home-title">Kyle Foster</h1>
            <p className="home-hero__role">Senior Frontend Engineer &amp; Product Builder</p>
            <p className="home-hero__lead">Clear interfaces for ambitious products.</p>
            <p className="home-hero__summary">
              I build accessible React products, reusable interface systems, and practical software
              through Sanderson Technology Enterprises.
            </p>

            <div className="home-hero__actions" aria-label="Homepage actions">
              <Link
                className="home-action home-action--primary interactive-surface"
                data-surface-variant="primary"
                data-surface-level="2"
                to={PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES}
              >
                <span>Explore STE work</span>
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </Link>
              <a
                className="home-action interactive-surface"
                data-surface-variant="subtle"
                data-surface-level="1"
                href="#professional-experience"
              >
                <span>For hiring teams</span>
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </a>
              <Link className="home-action home-action--quiet" to={PageRoute.INTERFACE_SYSTEM}>
                <span>View NPM libraries</span>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="home-system-map" aria-label="STE product system overview">
            <div className="home-system-map__header">
              <span>STE / PRODUCT SYSTEM</span>
              <span className="home-system-map__status">Building in public</span>
            </div>
            <div className="home-system-map__product">
              <span className="home-system-map__number">01</span>
              <div>
                <strong>Golden Goose</strong>
                <span>Workflow software for a specialized retail operation</span>
              </div>
            </div>
            <div className="home-system-map__product">
              <span className="home-system-map__number">02</span>
              <div>
                <strong>Scrap Yard System</strong>
                <span>Operational tooling for inventory and customer workflows</span>
              </div>
            </div>
            <div className="home-system-map__packages">
              <span>Interface foundation</span>
              <strong>4 published NPM libraries</strong>
            </div>
          </aside>
        </section>

        <section
          id="selected-work"
          className="home-work ly-section"
          aria-labelledby="selected-work-title"
          aria-label="Flagship work"
        >
          <header className="home-section-heading">
            <div>
              <p className="home-eyebrow">Selected proof</p>
              <h2 id="selected-work-title">Flagship work</h2>
            </div>
            <p>
              Product ownership, sustained frontend delivery, and problem-solving under pressure.
            </p>
          </header>

          <div className="home-project-list">
            {selectedProjects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section
          className="home-interface-system ly-section"
          aria-labelledby="interface-system-title"
          aria-label="Open-source interface system"
        >
          <header className="home-section-heading">
            <div>
              <p className="home-eyebrow">Published infrastructure</p>
              <h2 id="interface-system-title">Open-source interface system</h2>
            </div>
            <p>
              Four focused packages that separate layout, theme, icons, and interaction without
              losing a cohesive product language.
            </p>
          </header>

          <div className="home-package-grid">
            {interfacePackages.map((item, index) => (
              <article key={item.name} className="home-package-card">
                <span key={item.id} className="home-package-card__index" aria-hidden="true">
                  0{index + 1}
                </span>
                <span key={item.id} className="home-package-card__accent">
                  {item.accent}
                </span>
                <h3 key={item.id}>{item.name}</h3>
                <p key={item.id}>{item.responsibility}</p>
              </article>
            ))}
          </div>

          <Link className="home-interface-system__link" to={PageRoute.INTERFACE_SYSTEM}>
            <span>Explore the Interface System</span>
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </Link>
        </section>

        <section className="home-contact ly-section" aria-labelledby="home-contact-title">
          <div>
            <p className="home-eyebrow">Two ways to connect</p>
            <h2 id="home-contact-title">What are you trying to build?</h2>
            <p>
              I am open to senior frontend opportunities and focused product conversations through
              STE.
            </p>
          </div>
          <div className="home-contact__actions">
            <Link
              className="home-action home-action--primary interactive-surface"
              data-surface-variant="accent"
              data-surface-level="2"
              to={PageRoute.CONTACT}
            >
              Talk about a role
            </Link>
            <Link
              className="home-action interactive-surface"
              data-surface-variant="subtle"
              data-surface-level="1"
              to={PageRoute.CONTACT}
            >
              Talk about an STE project
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
