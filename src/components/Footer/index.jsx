import React from "react";
import { Link } from "react-router-dom";
import { Container, FlexboxGrid, Panel } from "rsuite";
import Btn from "components/Btn/index";
import "./styles.css";

/**
 *
 * Displays contact links and social media icons
 * using RSuite UI components and a custom
 * frosted-glass / blurred background aesthetic.
 *
 * @component
 * @returns {JSX.Element} The rendered footer
 */
const Footer = () => {
  return (
    <div className="footer-wrapper">
      <Container className="footer-container">
        <FlexboxGrid
          justify="space-around"
          align="middle"
        >
          {/* Contact Info Section */}
          <FlexboxGrid.Item colspan={8}>
            <Panel
              header="Contact"
              bordered
              className="footer-panel"
            >
              <div className="footer-text">
                <p>
                  <strong>Phone:</strong> (469) 410-5286
                </p>
                <p>
                  <strong>Phone 2:</strong> (972) 802-9397
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:fosterkyle6456@gmail.com">
                    fosterkyle6456@gmail.com
                  </a>
                </p>
                <p>
                  <Link to="/contact">Contact Me</Link>
                </p>
              </div>
            </Panel>
          </FlexboxGrid.Item>

          {/* Social Section */}
          <FlexboxGrid.Item colspan={8}>
            <Panel
              header="Social"
              bordered
              className="footer-panel"
            >
              <div className="footer-socials">
                <Btn
                  icon="github"
                  variant="subtle"
                  href="https://github.com/Foscat"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="footer-icon"
                >
                  GitHub
                </Btn>

                <Btn
                  icon="linkedin"
                  variant="subtle"
                  href="https://linkedin.com/in/kylefoster-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-icon"
                >
                  LinkedIn
                </Btn>
              </div>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Kyle Foster. All rights reserved.
        </div>
      </Container>
    </div>
  );
};

export default Footer;
