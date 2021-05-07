import { useContext } from "react";
import { authContext } from "../../context/authContext";
import "./Profilepage.css";

const Profilepage = () => {
  const { currentUser } = useContext(authContext);
  return (
    <div className="profilepage">
      <h2>Hello, {currentUser.name}</h2>
      Account Information
      <h3>Name: {currentUser.name}</h3>
      <h3>Email: {currentUser.email}</h3>
    </div>
  );
};

export default Profilepage;
