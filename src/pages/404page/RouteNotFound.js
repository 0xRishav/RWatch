import "./RouteNotFound.css";
import { Link } from "react-router-dom";

const RouteNotFound = () => {
  return (
    <div className="routenotfound">
      <h1>
        Hey, the page you are trying to find does not exist why don't you watch
        something on RWatch.
      </h1>
      <Link to="/">
        <button className="routenotfound__watchNowBtn">Watch Now</button>
      </Link>
    </div>
  );
};

export default RouteNotFound;
