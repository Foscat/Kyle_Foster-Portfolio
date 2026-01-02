import React, { useState } from "react";
import { Navbar, Nav } from "rsuite";
import Btn from "components/Btn";
import FrostedIcon from "components/FrostedIcon";
import "./styles.css";

/**
 * -------------------------------------------------------------------
 * 📌 StickyNav Component
 * -------------------------------------------------------------------
 * Responsive, RSuite-powered navigation bar for the portfolio website.
 * Includes a hamburger menu on mobile and a full menu layout on desktop.
 *
 * @component
 * @returns {JSX.Element}
 * -------------------------------------------------------------------
 */
const StickyNav = () => {
  const [open, setOpen] = useState(false);
  const currentURL = window.location.pathname;
  const curPath = currentURL.split("/")[currentURL.split("/").length - 1];

  /** Toggle mobile menu open/close state */
  const toggleMenu = () => setOpen(!open);

  return (
    <Navbar
      appearance="subtle"
      className="sticky-nav frosted-nav"
    >
      <Navbar.Brand href="/">
        <span className="brand-text">Kyle Foster – Side Projects</span>
      </Navbar.Brand>

      {/* Mobile Burger Button */}
      <Nav
        pullRight
        className="mobile-only"
      >
        <Btn
          icon="bars"
          variant="ghost"
          onClick={toggleMenu}
          className="burger-btn"
        />
      </Nav>

      {/* Desktop Navigation */}
      <Nav
        pullRight
        className="desktop-menu"
      >
        <Nav.Item
          active={curPath === "codestream"}
          href="/codestream/"
        >
          Work Experience
        </Nav.Item>
        <Nav.Item
          active={curPath === "hackathon"}
          href="/hackathon/"
        >
          Hackathon Win
        </Nav.Item>
        <Nav.Item
          active={curPath === "side-projects"}
          href="/sideProjects/"
        >
          Personal Projects
        </Nav.Item>
        <Nav.Item
          active={curPath === "smu"}
          href="/smu/"
        >
          Education
        </Nav.Item>
        <Nav.Item
          active={curPath === "contact"}
          href="/contact"
        >
          Contact Me
        </Nav.Item>

        <Nav.Item
          as="a"
          href="../data/Kyle Foster - Resume.pdf"
          download="Kyle_Foster_MERN_Developer_Resume.pdf"
          icon={<FrostedIcon icon="file-pdf" />}
        >
          Resume
        </Nav.Item>

        <Nav.Item
          as="a"
          href="https://github.com/Foscat"
          target="_blank"
          rel="noreferrer"
          icon={<FrostedIcon icon="github" />}
        >
          GitHub
        </Nav.Item>

        <Nav.Item
          as="a"
          href="https://linkedin.com/in/kylefoster-dev"
          target="_blank"
          rel="noreferrer"
          icon={<FrostedIcon icon="linkedin" />}
        >
          LinkedIn
        </Nav.Item>
      </Nav>

      {/* Mobile Slide-down Menu */}
      {open && (
        <div className="mobile-menu">
          <Nav vertical>
            <Nav.Item
              active={curPath === "codestream"}
              href="/codestream"
            >
              Work Experience
            </Nav.Item>
            <Nav.Item
              active={curPath === "hackathon"}
              href="/hackathon"
            >
              Hackathon Win
            </Nav.Item>
            <Nav.Item
              active={curPath === "side-projects"}
              href="/side-projects"
            >
              Personal Projects
            </Nav.Item>
            <Nav.Item
              active={curPath === "smu"}
              href="/smu"
            >
              Education
            </Nav.Item>
            <Nav.Item
              active={curPath === "contact"}
              href="/contact"
            >
              Contact Me
            </Nav.Item>
            <Nav.Item
              href="../../assets/data/Kyle Foster - Resume.pdf"
              download="Kyle_Foster_MERN_Developer_Resume.pdf"
              icon={<FrostedIcon icon="file-pdf" />}
            >
              Resume
            </Nav.Item>

            <Nav.Item
              href="https://github.com/Foscat"
              target="_blank"
              rel="noreferrer"
              icon={<FrostedIcon icon="github" />}
            >
              GitHub
            </Nav.Item>

            <Nav.Item
              href="https://linkedin.com/in/kylefoster-dev"
              target="_blank"
              rel="noreferrer"
              icon={<FrostedIcon icon="linkedin" />}
            >
              LinkedIn
            </Nav.Item>
          </Nav>
        </div>
      )}
    </Navbar>
  );
};

export default StickyNav;
