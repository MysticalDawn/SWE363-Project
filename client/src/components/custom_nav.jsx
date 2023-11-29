import "../styles/custom_nav.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Logo } from "./logo";
export const CustomNav = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <header>
      <nav>
        <Logo className="logo" />
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
        </div>
        {cookies.token ? (
          <Link id="sign-in-up" to="/profile">
            Profile
          </Link>
        ) : (
          <Link id="sign-in-up" to="/login">
            Sign in/up
          </Link>
        )}
      </nav>
    </header>
  );
};


