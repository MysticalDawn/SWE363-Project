import "../styles/signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const navigate = useNavigate();
  const [_, setCookies] = useCookies("token"); // eslint-disable-line no-unused-vars
  const {register, formState: {errors}, handleSubmit,} = useForm();
  const signUserUp = async () => {
   
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        email: email.toLowerCase(),
        password,
        name,
        major,
      });
      setCookies("token", response.data.token);
      window.localStorage.setItem("userID", response.data.userId);
      navigate("/confirm");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="auth-wrapper">
      <div className="left-side">
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
        <form className="signup-form" onSubmit={handleSubmit(signUserUp)}>
          <h3>Email</h3>
          <input
            {...register("email", {required: true})}
            type="email"
            placeholder="someone@gmail.com"
            className="email-input"
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
            {...register("password", {required: true})}
            type="password"
            placeholder="Type a strong password"
            className="password-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <error>
            {errors.password?.type === "required" && "Password is required"}
          </error>
          <h3>Name</h3>
          <input
            {...register("name", {required: true})}
            type="text"
            placeholder="Type your name"
            className="email-input name-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <error>
            {errors.name?.type === "required" && "Name is required"}
          </error>
          <h3>Select your major</h3>
          <select
            className="email-input major-input"
            id="major_choice"
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
          <button type="submit" className="signup-btn">
          Sign Up
        </button>
        </form>
        
        <p className="signup-bottom-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
};
