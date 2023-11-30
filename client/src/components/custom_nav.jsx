import "../styles/custom_nav.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Logo from "../img/logo.svg";
export const CustomNav = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <header>
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
            <Link id="already-login" to="/profile">
              Hi Khalid🤗
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
