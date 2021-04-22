import React, { useContext, useEffect, useState, useRef } from "react";
import "./SignedInNav.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useWindowDimensions } from "../../custom-hooks";
import { IoReorderTwoOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
// import { authContext } from "../../contexts/authContext";

function SignedInNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { width } = useWindowDimensions();
  const navbarRef = useRef(null);
  // const { isUserLoggedIn } = useContext(authContext);

  const serchClickHandler = () => {
    setIsSearchClicked(true);
  };

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

  let history = useHistory();

  const handleMenuClick = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const sideNavLinkClickHandler = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // const filteredProducts = products.filter((product) => {
  //   if (
  //     product.name.toLowerCase().includes(searchInput.toLowerCase()) ||
  //     product.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
  //     product.category.toLowerCase().includes(searchInput.toLowerCase())
  //   ) {
  //     return product;
  //   }
  // });

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      // history.push("/search", { filteredProducts });
      setIsSideMenuOpen(false);
    }
  };

  return (
    <div
      className={
        isScrolled === false
          ? "navbar__wrapper"
          : isSideMenuOpen === true
          ? "navbar__wrapper"
          : "navbar__wrapper navbar__wrapper--scrolled"
      }
    >
      {isSideMenuOpen && width < 770 && (
        <div className="Navbar__sideMenu">
          <nav className="Navbar__sideMenuNav">
            <div className="Navbar__searchInputContainer">
              <input
                type="text"
                className="Navbar__searchInput"
                placeholder="Search..."
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
              />
              <Link
                to={{
                  pathname: "/search",
                  // state: { filteredProducts: filteredProducts },
                }}
                className="Navbar__searchInputIcon"
                onClick={() => setIsSideMenuOpen(false)}
              >
                <BiSearch className="Navbar__searchInputIcon" color="#6e6e73" />
              </Link>
            </div>
            <div className="Navbar__sideMenu--linkWrapper">
              <div
                className="Navbar__sideMenu--linkContainer"
                style={{ marginTop: "32px" }}
              >
                <NavLink
                  to="/videos"
                  className="navbar__Link"
                  onClick={sideNavLinkClickHandler}
                  activeClassName="Navbar__activeLink"
                >
                  All Events
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/playlists"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  Playlists
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/history"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  History
                </NavLink>
              </div>

              <div className="hr-div"></div>
              <div className="Navbar__sideMenu--linkContainer">
                <NavLink
                  to="/profile"
                  className="navbar__Link"
                  activeClassName="Navbar__activeLink"
                  onClick={sideNavLinkClickHandler}
                >
                  Profile
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      )}
      <div className="navbar" ref={navbarRef}>
        {width < 770 && (
          <>
            {isSideMenuOpen ? (
              <AiOutlineClose
                onClick={handleMenuClick}
                style={{ cursor: "pointer" }}
                color="white"
              />
            ) : (
              <IoReorderTwoOutline
                onClick={handleMenuClick}
                style={{ cursor: "pointer" }}
                color="white"
              />
            )}
          </>
        )}
        <NavLink to="/" className="Navbar__logo">
          <div>RWatch</div>
        </NavLink>

        {width > 770 ? (
          <>
            <NavLink
              to="/videos"
              className="navbar__Link"
              activeClassName="Navbar__activeLink"
            >
              All Events
            </NavLink>
            <NavLink
              to="/playlists"
              className="navbar__Link"
              activeClassName="Navbar__activeLink"
            >
              Playlists
            </NavLink>
            <NavLink
              to="/history"
              className="navbar__Link"
              activeClassName="Navbar__activeLink"
            >
              History
            </NavLink>
            <div className="Navbar__searchInputContainer Navbar__searchInputContainer--desktop navbar__Link">
              <input
                type="text"
                className="Navbar__searchInput"
                placeholder="Search..."
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
              />
              <NavLink
                to={{
                  pathname: "/search",
                  // state: { filteredProducts: filteredProducts },
                }}
                className="Navbar__searchInputIcon"
                onClick={() => setIsSideMenuOpen(false)}
              >
                <BiSearch className="Navbar__searchInputIcon" color="#6e6e73" />
              </NavLink>
            </div>
          </>
        ) : null}
        <NavLink
          to={"/"}
          className="navbar__Link"
          activeClassName="Navbar__activeLink"
        >
          {true ? (
            <FaUserAlt />
          ) : (
            <button className="navbar__signInBtn">Sign in</button>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default SignedInNav;
