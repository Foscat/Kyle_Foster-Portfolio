/**
 * @file index.jsx
 * @description Curated portfolio landing page for hiring teams and engineering leaders.
 * @module pages/Home
 */

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarDays,
  faCode,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import codeStreamImages from "assets/images/codestream";
import hackathonImages from "assets/images/hackathon";
import steLogo from "assets/images/sideProjects/chris_sanderson_enterprises_logo.jpg";
import { StickyNav, Footer, helpers } from "components/navigation";
import { PageRoute } from "types/navigation.types";
import "./styles.css";

const home = pageSummaryMetas.Home;

const proofItems = [
  { id: "experience", icon: faCalendarDays, label: "Since 2018" },
  { id: "specialty", icon: faCode, label: "React / Frontend" },
  {
    id: "domains",
    icon: faLayerGroup,
    label: "Learning platforms · admin tools · data-rich workflows",
  },
];

const selectedProjects = [
  {
    id: "codestream",
    index: "01",
    title: "CodeStream Studios",
    description:
      "Browser-based coding, classroom operations, grading, reporting, and organization administration in one production education platform.",
    context: "Learning platform for students, instructors, and program administrators.",
    role: "Sole frontend engineer owning interface architecture and delivery.",
    image: codeStreamImages.csos_home,
    route: PageRoute.PROFESSIONAL,
    linkLabel: "Read the CodeStream Studios case study",
  },
  {
    id: "hackathon",
    index: "02",
    title: "Daimler Hackathon",
    description:
      "A winning voice-driven repair assistant shaped around real technician workflows during Daimler Truck North America's 2019 hackathon.",
    context: "Hands-free repair guidance with step-level progress tracking.",
    role: "Voice-command interpretation and backend command routing.",
    image: hackathonImages.check,
    route: PageRoute.HACKATHON,
    linkLabel: "Read the Daimler Hackathon case study",
  },
  {
    id: "ste",
    index: "03",
    title: "Sanderson Technology Enterprises",
    description:
      "Public-site delivery, early platform products, and a reusable interface system documented in a public-safe case study.",
    context: "Product foundations for content and salvage-yard workflows.",
    role: "Frontend delivery, interaction design, and interface-system work.",
    image: {
      src: steLogo,
      alt: "Sanderson Technology Enterprises logo.",
    },
    route: PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
    linkLabel: "Read the Sanderson Technology Enterprises case study",
  },
];

/**
 * Render a selected-work row with a consistent accessible link target.
 *
 * @param {object} props - Component properties.
 * @param {object} props.project - Curated project summary.
 * @returns {JSX.Element} Project row.
 */
function ProjectRow({ project }) {
  return (
    <article className="home-project-row ly-cluster" data-project={project.id}>
      <span className="home-project-row__index" aria-hidden="true">
        {project.index}
      </span>
      <div className="home-project-row__copy">
        {project.index === "01" ? (
          <span className="home-project-row__featured">Featured case</span>
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
          loading="lazy"
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
        data-surface-variant="subtle"
        data-surface-level="1"
        to={project.route}
        aria-label={project.linkLabel}
      >
        <span className="home-project-row__link-label">Case study</span>
        <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
      </Link>
    </article>
  );
}

/**
 * Portfolio home page.
 *
 * @returns {JSX.Element} Curated hiring-oriented landing page.
 */
const Home = () => {
  useEffect(() => {
    helpers.restoreScrollPosition();
  }, []);

  return (
    <div className="home-page page-shell ly-wrapper ly-wrapper--wide ly-stack">
      <StickyNav activePage={home.url} />

      <main className="home-showcase app-main ly-stack">
        <section className="home-hero ly-section ly-split" aria-labelledby="home-title">
          <div className="home-hero__copy ly-stack">
            <h1 id="home-title" className="home-hero__title" aria-label="Kyle Foster">
              <span>Kyle</span>
              <span>Foster</span>
            </h1>
            <p className="home-hero__role">Senior React / Frontend Engineer</p>
            <p className="home-hero__lead">
              Clear, scalable interfaces for complex product workflows.
            </p>

            <div className="home-hero__actions ly-cluster" aria-label="Homepage actions">
              <a
                className="home-action home-action--primary interactive-surface"
                data-surface-variant="primary"
                data-surface-level="2"
                href="#selected-work"
              >
                <span>View selected work</span>
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </a>
              <Link
                className="home-action interactive-surface"
                data-surface-variant="subtle"
                data-surface-level="1"
                to={PageRoute.CONTACT}
              >
                <span>Contact Kyle</span>
                <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
              </Link>
            </div>

            <ul className="home-proof-list ly-cluster" aria-label="Experience summary">
              {proofItems.map((item) => (
                <li key={item.id}>
                  <FontAwesomeIcon icon={item.icon} aria-hidden="true" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <figure className="home-hero__media" aria-label="CodeStream product interface preview">
            <img
              className="home-hero__media-primary"
              src={codeStreamImages.csos_home.src}
              alt={codeStreamImages.csos_home.alt}
              width="1828"
              height="900"
              fetchPriority="high"
            />
            <img
              className="home-hero__media-secondary"
              src={codeStreamImages.editor_web.src}
              alt=""
              width="1920"
              height="1080"
              loading="eager"
            />
            <figcaption>
              Interface work from CodeStream Online Studio, including the public site and
              browser-based editor.
            </figcaption>
          </figure>
        </section>

        <section
          id="selected-work"
          className="home-work ly-section ly-stack"
          aria-labelledby="selected-work-title"
        >
          <div className="home-section-heading ly-cluster">
            <div>
              <p className="home-section-heading__eyebrow">Selected proof</p>
              <h2 id="selected-work-title">Selected work</h2>
            </div>
            <p>
              Three projects that show how I approach product structure, interaction, and delivery.
            </p>
          </div>

          <div className="home-project-list ly-stack">
            {selectedProjects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section
          className="home-contact ly-section ly-surface ly-cluster"
          aria-labelledby="home-contact-title"
        >
          <div>
            <p className="home-contact__eyebrow">Start a conversation</p>
            <h2 id="home-contact-title">Have a project in mind?</h2>
          </div>
          <p>
            Tell me what you are building, where the workflow is getting difficult, and what a
            better experience should make possible.
          </p>
          <Link
            className="home-action home-action--primary interactive-surface"
            data-surface-variant="primary"
            data-surface-level="2"
            to={PageRoute.CONTACT}
          >
            <span>Contact Kyle</span>
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
