import Success from "../img/success.svg";
import "../styles/confirmation.css";
import { Link } from "react-router-dom";
export const ConfirmationPage_2 = () => {
  return (
    <div className="confirm-wrapper">
      <div className="confirm-content">
        <img
          src={Success}
          alt="success"
          height="200"
          width="200"
          className="success-img"
        />
        <h1 className="confirm-header">Success!</h1>
        <p className="confirm-text">You process has been completed!</p>
        <Link to="/login" className="conf browse-btn" id="confirm-btn">
          Return
        </Link>
      </div>
    </div>
  );
};
