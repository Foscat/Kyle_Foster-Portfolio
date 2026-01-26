import { useState } from "react";
import "./styles.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import StickyNav from "components/StickyNav";
import { FlexboxGrid, Input, Panel } from "rsuite";
import { Form } from "rsuite";
import Btn from "components/Btn";
import Footer from "components/Footer";
import { PageRoute, Size, Variant } from "types/ui.types";

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
      <StickyNav activePage={PageRoute.CONNECT} />
      <div className="page-overlay" />

      <FlexboxGrid justify="center" className="contact-grid">
        <FlexboxGrid.Item colspan={20}>
          <Panel
            header={
              <header>
                <h1 className="page-title text-center">Get in Touch</h1>
                <p className="text-center page-subtitle">
                  Have a question, project idea, or opportunity? Let's connect.
                </p>
              </header>
            }
            className="frosted contact-panel"
          >
            {/* Contact Form */}
            <Form fluid onSubmit={handleSubmit} className="contact-form mt-2">
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
                variant={Variant.PRIMARY}
                type="submit"
                className="w-100 mt-2"
                text="Send Message"
                icon={faEnvelope}
                ariaLabel="Send message"
                tooltip="Send email message"
                size={Size.LG}
                block
              />
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Footer />
      {showToast && <div className="toast frosted-toast">✅ Message Sent!</div>}
    </div>
  );
}
