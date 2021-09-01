import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./SignInSignOutBtn.css";

function SignInSignOutBtn() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
  const signinBtnHandler = () => {
    if (isUserLoggedIn) {
      window.localStorage.removeItem("currentUser");
      setIsUserLoggedIn(!isUserLoggedIn);
    }
  };

  return (
    <Link to={isUserLoggedIn ? "#" : "/signin"}>
      <button className="blue-btn--primary" onClick={signinBtnHandler}>
        {isUserLoggedIn ? "Sign Out" : "Sign In"}
      </button>
    </Link>
  );
}

export default SignInSignOutBtn;
