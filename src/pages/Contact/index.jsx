import { useState } from "react";
import "./styles.css";
import {
  faEnvelope,
  faFilePdf,
  faMobileScreenButton,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithubSquare,
  faSquareLinkedin,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Contact Component
 * ------------------------------------------------------------
 * - Displays frosted-glass contact form
 * - Includes contact info section with icons
 * - Shows toast confirmation on sendW
 *
 * In production, the `sendMessage()` function should call an API
 * route that uses Nodemailer, EmailJS, or Twilio.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function Contact() {
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /** Submit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage(formData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Message send failed:", err);
    }
  };

  /** Replace this with your backend call */
  async function sendMessage(data) {
    console.log("Sending message...", data);
    return fetch(
      new Request({
        url: "https://email-microservice-grem.onrender.com",
        method: "POST",
        body: data,
      }),
      (value) => {
        console.log("Email return value:" + value);
      }
    );
  }

  return (
    <div className="contact-page page-wrapper">
      <StickyNav />
      <div className="page-overlay" />

      <FlexboxGrid
        justify="center"
        className="contact-grid"
      >
        <FlexboxGrid.Item colspan={20}>
          <Panel
            bordered
            className="glassBox contact-panel"
          >
            <header className="text-center mb-4">
              <h1 className="page-title">Get in Touch</h1>
              <p className="page-subtitle">
                Have a question, project idea, or opportunity? Let's connect.
              </p>
            </header>

            {/* Contact Form */}
            <Form
              fluid
              onSubmit={handleSubmit}
              className="contact-form mt-2"
            >
              <Form.Group>
                <Form.ControlLabel>Name</Form.ControlLabel>
                <Input
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Form.Group>
                <Form.ControlLabel>Message</Form.ControlLabel>
                <Input
                  as="textarea"
                  rows={5}
                  placeholder="Your message..."
                  name="message"
                  value={formData.message}
                  onChange={(v) => setFormData({ ...formData, message: v })}
                  className="input-field frosted-input"
                />
              </Form.Group>

              <Btn
                variant="primary"
                type="submit"
                className="w-100 mt-4"
                text="Send Message"
                icon={faEnvelope}
              />
            </Form>

            <Message className="contact-note mt-3">
              💡 Your message will be securely delivered to Kyle Foster.
            </Message>

            <Divider className="divider" />

            {/* Contact Info Section */}
            <section className="contact-info mt-3">
              <h3 className="text-center accent-text">Direct Contact</h3>
              <ul className="contact-list">
                <li>
                  <FrostedIcon
                    icon={faMobileScreenButton}
                    className="contact-icon"
                  />
                  (469) 410-5286
                </li>
                <li>
                  <Btn
                    icon={faFilePdf}
                    tooltip="Download resume as PDF"
                    download="Kyle Foster - React Dev Resume"
                    href="../../assets/data/Kyle_Foster_React_Resume.pdf"
                  />
                </li>
                <li>
                  <FrostedIcon
                    icon={faPaperPlane}
                    className="contact-icon"
                  />
                  <a href="mailto:kylefoster6456@gmail.com">Email Me</a>
                </li>
                <li>
                  <FrostedIcon
                    icon={faSquareLinkedin}
                    className="contact-icon"
                  />
                  <a
                    href="https://linkedin.com/in/kylefoster-dev"
                    target="_blank"
                  >
                    LinkedIn Profile
                  </a>
                </li>
                <li>
                  <FrostedIcon
                    icon={faGithubSquare}
                    className="contact-icon"
                  />
                  <a
                    href="https://github.com/foscat"
                    target="_blank"
                  >
                    GitHub Portfolio
                  </a>
                </li>
              </ul>
            </section>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Footer />
      {showToast && <div className="toast frosted-toast">✅ Message Sent!</div>}
    </div>
  );
}
