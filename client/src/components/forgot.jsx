import Success from "../img/success.svg";
import "../styles/forget.css";
import { Link } from "react-router-dom";
export const ForgotPassword = () => {
  return (
    <div className="forget-wrapper">
      <div className="forget-content">
        <img
          src={Success}
          alt="success"
          height="200"
          width="200"
          className="success-img"
        />
        <h1 className="forget-header">Enter your email</h1>
        <input className="email-input" type="text" placeholder="someone@email.com" />
        <Link to="/" className="conf browse-btn" id="forgot-btn">
          Submit
        </Link>
      </div>
    </div>
  );
};
