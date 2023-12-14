import "../styles/signup.css";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { green } from "@mui/material/colors";
import signup_logo from "../img/signup-logo.svg";
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [verCode, setVerCode] = useState("");
  const [visibility, setVisibility] = useState("none");
  const [buttonText, setButtonText] = useState("Verify Your Email");
  const [alertText, setAlertText] = useState(
    ""
  );
  const [alertColor, setAlertColor] = useState("#990000");
  const [major, setMajor] = useState("");
  const verificationCodeRef = useRef(null);
  const navigate = useNavigate();
  const [_, setCookies] = useCookies("token"); // eslint-disable-line no-unused-vars
  let dropSubmission = false;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const signUserUp = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email: email.toLowerCase(),
        password,
        name,
        major,
      });
      navigate("/confirm-2");
    } catch (error) {
      console.log(error);
    }
  };

  const checkEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/checkEmail", {
        email: email.toLowerCase(),
      });
      console.log(response.status);
      if (response.status == 200){
        sendVerification()
      }
      else {
        setAlertText("Email already Exists");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendVerification = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/verification/sendVerification",
        {
          student_email: email.toLowerCase(),
        }
      );
      setButtonText("Sign Up");
      setVisibility("initial");
      setAlertColor("#039f03");
      setAlertText("Verification code has been sent to your Email");
      verificationCodeRef.current.focus();
    } catch (error) {
      console.log(error);
    }
  };
  const verifyCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/verification/verifyCode",
        {
          userVerificationCode: verCode,
        }
      );
      console.log(response.status);
      if (response.status == 200) {
        signUserUp();
      } else if (response.status == 201) {
        console.log("Wrong VerCode");
        setAlertColor("#990000");
        setAlertText("Wrong Verification Code");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="left-side">
        <img src={signup_logo} alt="signup-logo" className="actual-logo" width={600} height={600} />
      </div>
      <div className="right-side">
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
        <h1>Sign Up 📝</h1>
        <p className="bellow-signup-text">
          Sign up to start your journey with us
        </p>
        <form className="signup-form">
          <h3>Email</h3>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="someone@gmail.com"
            id="email-input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setButtonText("Verify Your Email");
              setVisibility("none");
            }}
          />
          <error className="signup-error">
            {errors.email?.type === "required" && "Email is required"}
          </error>
          <h3>Password</h3>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Type a strong password"
            id="password-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <error className="signup-error">
            {errors.password?.type === "required" && "Password is required"}
          </error>
          <h3>Name</h3>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Type your name"
            id="name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <error className="signup-error">
            {errors.name?.type === "required" && "Name is required"}
          </error>
          <h3>Select your major</h3>
          <select
            className="email-input major-input"
            id="major-choice"
            value={major}
            onChange={(e) => {
              setMajor(e.target.value);
            }}
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
          </select>
          <h3 style={{ display: visibility }}>Verification Code</h3>
          <input
            type="text"
            style={{ display: visibility }}
            className="email-input verCode"
            id="email-input"
            ref={verificationCodeRef}
            value={verCode}
            placeholder="XXXXXX"
            onChange={(e) => {
              setVerCode(e.target.value);
            }}
          />
          <button
            type="button"
            className="signup-btn"
            onClick={buttonText == "Sign Up" ? verifyCode : checkEmail}
          >
            {buttonText}
          </button>
        </form>
        <p
          className="alert-text"
          style={{color: alertColor }}
        >
          {alertText}
        </p>
        <p className="signup-bottom-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};
