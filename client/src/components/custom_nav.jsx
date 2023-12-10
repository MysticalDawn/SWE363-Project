import "../styles/custom_nav.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Logo from "../img/logo.svg";
import { useState, useEffect } from "react";
export const CustomNav = () => {
  const [cookies] = useCookies(["token"]);
  const [userName, setUserName] = useState("");
  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/GetUserInfo", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setUserName(response.data.name);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <header className="nav_header">
      <nav>
        <img className="logo" src={Logo} />
        <div className="nav-elements">
          <Link className="a-tag-nav" to="/">
            Home
          </Link>
          <Link className="a-tag-nav" to="/catalog">
            Catalog
          </Link>
          <Link className="a-tag-nav" to="/contact">
            Contact Us
          </Link>
          {cookies.token ? (
            <Link id="sign-in-up" to="/profile">
              {"Hey " + userName}
            </Link>
          ) : (
            <Link id="sign-in-up" to="/login">
              Sign in/up
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
