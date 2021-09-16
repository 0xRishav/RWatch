import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./SignInSignOutBtn.css";

function SignInSignOutBtn() {
  const { accessToken, setIsUserLoggedIn } = useContext(UserContext);
  const signinBtnHandler = () => {
    if (accessToken) {
      window.localStorage.removeItem("currentUser");
      setIsUserLoggedIn(!accessToken);
    }
  };

  return (
    <Link to={accessToken ? "#" : "/signin"}>
      <button className="blue-btn--primary" onClick={signinBtnHandler}>
        {accessToken ? "Sign Out" : "Sign In"}
      </button>
    </Link>
  );
}

export default SignInSignOutBtn;
