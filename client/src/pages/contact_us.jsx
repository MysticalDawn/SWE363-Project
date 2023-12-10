import "../styles/contact_us.css";
import { CustomNav } from "../components/custom_nav";
import Mail from "../img/Mailbox.svg";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export const ContactUs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();
  const send_message = async (e) => {
    e.preventDefault();
    const res = await emailjs.sendForm(
      "service_2vqh3ur",
      "template_z0gdlor",
      form.current,
      "zwa15ns9x4SUp-XXL"
    );
    console.log(res.status);
    if(res.status === 200){
      navigate("/confirm");
    }
  };
  return (
    <>
      <CustomNav></CustomNav>
      <div className="contact-wrapper">
        <div className="contact-left-section">
          <h3>Contact Us</h3>
          <p>{`let's us get in touch!`}</p>
          <img src={Mail} alt="mail" height="300" width="300" />
        </div>
        <form className="contactUs-form" ref={form}>
          <div className="name-email-contact">
            <div className="name-contact">
              <label htmlFor="name">
                Name <h2>*</h2>
              </label>

              <input
                required
                type="text"
                name="from_name"
                className="contactUs-name-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="email-contact">
              <label htmlFor="email">
                Email <h2>*</h2>
              </label>
              <input
                required
                type="email"
                name="email"
                className="contactUs-email-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="message-contact">
            <label htmlFor="message" className="contactUs-message-label">
              Message
            </label>
            <textarea
              name="message"
              className="contactUs-message-input"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
          </div>
          <button className="contact-btn" onClick={send_message}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};
