import "../styles/contact_us.css";
import { CustomNav } from "../components/custom_nav";
import Mail from "../img/Mailbox.svg";

export const ContactUs = () => {
  return (
    <>
      <CustomNav></CustomNav>
      <div className="contact-wrapper">
        <div className="contact-left-section">
          <h3>Contact Us</h3>
          <p>let's us get in touch!</p>
          <img src={Mail} alt="mail" height="300" width="300" />
        </div>
        <form className="contactUs-form">
          <div className="name-email-contact">
            <div className="name-contact">
        
              <label htmlFor="name">Name <h2>*</h2></label>
              
              <input required type="text" name="name" className="contactUs-name-input" />
            </div>
            <div className="email-contact">
              <label htmlFor="email">Email <h2>*</h2></label>
              <input
                required 
                type="email"
                name="email"
                className="contactUs-email-input"
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
            ></textarea>
          </div>
          <button className="contact-btn">Send</button>
        </form>
      </div>
    </>
  );
};
