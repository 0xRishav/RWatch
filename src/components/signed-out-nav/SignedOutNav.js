import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import "./SignedOutNav.css";

function SignedOutNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => {
      window.removeEventListener("scroll", transitionNavbar);
    };
  }, []);

  return (
    <div
      className={
        isScrolled === false
          ? "navbar__wrapper"
          : "navbar__wrapper navbar__wrapper--scrolled"
      }
    >
      <div className="navbar" ref={navbarRef}>
        <ul className="navbar__ul">
          <li>
            <NavLink to="/" className="Navbar__logo">
              <div>RWatch</div>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/signin"
              className="navbar__Link"
              activeClassName="Navbar__activeLink"
            >
              <button className="navbar__signInBtn">
                <BsFillPersonFill style={{ marginRight: "4px" }} />
                SignIn
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SignedOutNav;
