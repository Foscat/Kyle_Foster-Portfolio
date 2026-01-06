import { useState } from "react";
import "./styles.css";
import { PageRoute } from "types/ui.types";
import {
  faGithubSquare,
  faSquareLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faBusinessTime,
  faCommentDollar,
  faHeadset,
  faHouseChimneyUser,
  faHouseLaptop,
  faPersonChalkboard,
} from "@fortawesome/free-solid-svg-icons";

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
const StickyNav = ({ activePage = PageRoute.HOME }) => {
  const [open, setOpen] = useState(false);

  /** Toggle mobile menu open/close state */
  const toggleMenu = () => setOpen(!open);

  return (
    <Navbar className="sticky-nav frosted-nav">
      {/* Mobile Burger Button */}
      <Nav className="mobile-only">
        <Btn
          icon={faBars}
          variant="ghost"
          onClick={toggleMenu}
          className="burger-btn"
          ariaLabel="Open navigation menu"
          tooltip="Open Navigation Menu"
        />
      </Nav>

      {/* Desktop Navigation */}
      <Nav className="desktop-menu">
        <Nav.Item
          active={activePage === PageRoute.HOME}
          href={PageRoute.HOME}
          icon={
            <FrostedIcon
              ariaLabel="Go to home page"
              icon={faHouseChimneyUser}
            />
          }
        >
          Home
        </Nav.Item>
        <Nav.Item
          active={activePage === PageRoute.PROFESSIONAL}
          href={PageRoute.PROFESSIONAL}
          icon={
            <FrostedIcon
              ariaLabel="See my work experiance"
              icon={faBusinessTime}
            />
          }
        >
          Work Experience
        </Nav.Item>
        <Nav.Item
          active={activePage === PageRoute.HACKATHON}
          href={PageRoute.HACKATHON}
          icon={
            <FrostedIcon
              ariaLabel="How I "
              icon={faHeadset}
            />
          }
        >
          Hackathon Win
        </Nav.Item>
        <Nav.Item
          active={activePage === PageRoute.SIDE_PROJECTS}
          href={PageRoute.SIDE_PROJECTS}
          icon={<FrostedIcon icon={faHouseLaptop} />}
        >
          Personal Projects
        </Nav.Item>
        <Nav.Item
          active={activePage === PageRoute.EDUCATION}
          href={PageRoute.EDUCATION}
          title="Education"
          icon={<FrostedIcon icon={faPersonChalkboard} />}
        >
          Education
        </Nav.Item>
        <Nav.Item
          active={activePage === PageRoute.CONNECT}
          href={PageRoute.CONNECT}
          title="Contact Page"
          icon={<FrostedIcon icon={faCommentDollar} />}
        >
          Contact Me
        </Nav.Item>

        <Nav.Item
          as="a"
          href="https://github.com/Foscat"
          target="_blank"
          rel="noreferrer"
          icon={
            <FrostedIcon
              icon={faGithubSquare}
              ariaLabel="Link to Github"
              tooltip="View my Github profile"
              size="lg"
            />
          }
        />

        <Nav.Item
          as="a"
          href="https://linkedin.com/in/kylefoster-dev"
          target="_blank"
          rel="noreferrer"
          icon={
            <FrostedIcon
              icon={faSquareLinkedin}
              ariaLabel="Link to Github"
              tooltip="View my Github profile"
              size="lg"
            />
          }
        />
      </Nav>

      {/* Mobile Slide-down Menu */}
      {open && (
        <div className="mobile-menu">
          <Nav vertical>
            <Nav.Item
              active={activePage === PageRoute.HOME}
              href="/"
            >
              Home
            </Nav.Item>
            <Nav.Item
              active={activePage === PageRoute.PROFESSIONAL}
              href="/codestream"
            >
              Work Experience
            </Nav.Item>
            <Nav.Item
              active={activePage === PageRoute.HACKATHON}
              href="/hackathon"
            >
              Hackathon Win
            </Nav.Item>
            <Nav.Item
              active={activePage === PageRoute.SIDE_PROJECTS}
              href="/side-projects"
            >
              Personal Projects
            </Nav.Item>
            <Nav.Item
              active={activePage === PageRoute.EDUCATION}
              href="/smu"
            >
              Education
            </Nav.Item>
            <Nav.Item
              active={activePage === PageRoute.CONNECT}
              href="/contact"
            >
              Contact Me
            </Nav.Item>
            <Nav.Item
              href="https://github.com/Foscat"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Nav.Item>
            <Nav.Item
              href="https://linkedin.com/in/kylefoster-dev"
              target="_blank"
              rel="noreferrer"
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
