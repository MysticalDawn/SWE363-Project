import "../styles/home.css";
import { CustomNav } from "../components/custom_nav.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lost from "../img/lost-man.svg";
import { Footer } from "../components/footer.jsx";

export const Home = () => {
  const [text, setText] = useState("");
  const [fullText] = useState(
    "Co-op and Summer Training Opportunities for KFUPM students🧑‍🎓"
  );
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(text + fullText[index]);
        setIndex(index + 1);
      }, 30);
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
            training opportunity in different companies. It takes the hassle out
            of the process of finding a co-op or summer training opportunity.
          </p>
          <Link to="/catalog">
            <button className="browse-btn">Browse our catalog</button>
          </Link>
        </div>
        <div className="right-section">
          <img src={Lost} alt="lost" className="lost-img" />
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
