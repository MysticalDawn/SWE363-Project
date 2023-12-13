import "../styles/contact_us.css";
import { CustomNav } from "../components/custom_nav";
import Mail from "../img/Mailbox.svg";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export const ContactUs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();
  const {register, formState: {errors}, handleSubmit,} = useForm();
  const send_message = async () => {
    // e.preventDefault();
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
        <form className="contactUs-form" ref={form} onSubmit={handleSubmit(send_message)}>
          <div className="name-email-contact">
            <div className="name-contact">
              <label htmlFor="name">
                Name <h2>*</h2>
              </label>

              <input
                {...register("name", {required: true})}
                type="text"
                name="name"
                className="contactUs-name-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <error>
                  {errors.name?.type === "required" && "Name is required"}
              </error>
            </div>
            <div className="email-contact">
              <label htmlFor="email">
                Email <h2>*</h2>
              </label>
              <input
                {...register("email", {required: true})}
                type="email"
                name="email"
                className="contactUs-email-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <error>
                  {errors.email?.type === "required" && "Email is required"}
              </error>
            </div>
          </div>
          <div className="message-contact">
            <label htmlFor="message" className="contactUs-message-label">
              Message
            </label>
            <textarea
              {...register("message",{required: true})}
              name="message"
              className="contactUs-message-input"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></textarea>
            <error>
                  {errors.message?.type === "required" && "Please enter a message"}
              </error>

          </div>
          <button className="contact-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
};
