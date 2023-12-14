import "../styles/login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Login_pic from "../img/Secure-login.svg";
import { useForm } from "react-hook-form";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [_, setCookies] = useCookies("token");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const loginUser = async (e) => {
    //e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: email.toLowerCase(),
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
          <Link className="go-back-arrow" to="/">
            <svg
              fill="#ffffff"
              viewBox="0 0 45.40 30.40"
              width="70"
              height="70"
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
          </Link>
        </div>
        <h1>Login 📝</h1>
        <p className="bellow-login-text">
          Welcome back! Please login to your account
        </p>
        <form className="login-form" onSubmit={handleSubmit(loginUser)}>
          <h3>Email</h3>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="someone@gmail.com"
            className="login-email-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <error>
            {errors.email?.type === "required" && "Email is required"}
          </error>
          <h3>Password</h3>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="type your password"
            className="login-password-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <error>
            {errors.password?.type === "required" && "password is required"}
          </error>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {/* <button className="login-btn" onClick={loginUser}>
          Login
        </button> */}
        <p className="login-bottom-text">
          {`Don't have an account?`} <Link to="/auth">Sign up</Link>
        </p>
        <Link className="forgot-password" to="/forgot">Forgot password?</Link>
      </div>
      <div className="login-right-side">
        <img src={Login_pic} alt="login" height="800" width="800" />
      </div>
    </div>
  );
};
