import "../styles/contact_us.css";
import  {CustomNav} from "../components/custom_nav";
export const ContactUs = () => {
  return (
    <>
    <CustomNav></CustomNav>
    <div className="contact-wrapper">
      <div className="contact-left-section">
        <h3>Contact Us</h3>
        <p>let's us get in touch!</p>
      </div>
      <div className="contact-right-section">
        <form className="contactUs-form">
          <div className="name-email-contact">
            <div className="name-contact">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="contactUs-name-input" />
            </div>
            <div className="email-contact">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="contactUs-email-input"
              />
            </div>
          </div>
          <div className="message-contact">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              className="contactUs-message-input"
            ></textarea>
          </div>
          <button className="login-btn">Send</button>
        </form>
      </div>
    </div>
    </>
  );
};
