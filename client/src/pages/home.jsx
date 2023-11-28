import "../styles/home.css";
import { CustomNav } from "../components/custom_nav.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export const Home = () => {
  const [text, setText] = useState("");
  const [fullText] = useState("Welcome to Dallani 👋");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 60);
    }
  }, [fullText, index, text]);
  return (
    <>
      <CustomNav />
    <div className="home-wrapper">
      <div className="left-section">
        <h1 className="welcome-text">{text}</h1>
        <p className="info">
          Dallani is a website that helps students find co-op and summer
          training opportunity in different companies.
        </p>
        <Link to="/catalog">
          <button className="browse-btn">Browse our catalog</button>
        </Link>
      </div>
      <div className="right-section">
      </div>
    </div>
    </>
  );
};
