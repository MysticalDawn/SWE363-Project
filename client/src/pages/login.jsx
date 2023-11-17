import "../styles/login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies("token");
  const navigate = useNavigate();
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      setCookies("token", response.data.token);
      window.localStorage.setItem("userID", response.data.userId);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-left-side">
        <div className="login-starting-top">
          <div className="go-back-arrow">
            <svg
              fill="#ffffff"
              viewBox="-3.2 -3.2 38.40 38.40"
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(270)"
              stroke="#ffffff"
              strokeWidth="0.00032"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.256"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M 16 4.09375 L 9.28125 10.8125 L 10.71875 12.21875 L 15 7.9375 L 15 28 L 17 28 L 17 7.9375 L 21.28125 12.21875 L 22.71875 10.8125 Z"></path>
              </g>
            </svg>
            <Link to="/" className="go-back-text">Go back</Link>
          </div>
          <h1>Login 📝</h1>
        </div>
        <p className="bellow-login-text">
          Welcome back! Please login to your account
        </p>
        <form className="login-form">
          <h3>Email</h3>
          <input
            type="email"
            placeholder="someone@gmail.com"
            className="login-email-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3>Password</h3>
          <input
            type="password"
            placeholder="Type a strong password"
            className="login-password-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
        <button className="login-btn" onClick={loginUser}>
          Login
        </button>
        <p className="login-bottom-text">
          {`Don't have an account?`} <Link to="/auth">Signup</Link>
        </p>
      </div>
      <div className="login-right-side">
        <svg
          fill="#FFFFFF"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="50px"
          height="50px"
          className="actual-logo"
        >
          <path d="M 11.984375 4 A 1.0001 1.0001 0 0 0 11.292969 4.2929688 L 3.2929688 12.292969 A 1.0001 1.0001 0 0 0 3 13 L 3 36 A 1.0001 1.0001 0 0 0 3.2929688 36.707031 L 13.292969 46.707031 A 1.0001 1.0001 0 0 0 15 46 L 15 25.414062 L 24.292969 34.707031 A 1.0001 1.0001 0 0 0 25.707031 34.707031 L 35 25.414062 L 35 46 A 1.0001 1.0001 0 0 0 36.707031 46.707031 L 46.707031 36.707031 A 1.0001 1.0001 0 0 0 47 36 L 47 13 A 1.0001 1.0001 0 0 0 46.707031 12.292969 L 38.707031 4.2929688 A 1.0001 1.0001 0 0 0 37.292969 4.2929688 L 25 16.585938 L 12.707031 4.2929688 A 1.0001 1.0001 0 0 0 11.984375 4 z M 12 6.4140625 L 24 18.414062 L 24 31.585938 L 5.4140625 13 L 12 6.4140625 z M 38 6.4140625 L 44.585938 13 L 26 31.585938 L 26 18.414062 L 38 6.4140625 z M 5 15.414062 L 13 23.414062 L 13 43.585938 L 5 35.585938 L 5 15.414062 z M 45 15.414062 L 45 35.585938 L 37 43.585938 L 37 23.414062 L 45 15.414062 z" />
        </svg>
      </div>
    </div>
  );
};
