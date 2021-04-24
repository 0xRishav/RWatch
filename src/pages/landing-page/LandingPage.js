import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { AllVideoListing } from "../../containers";

function LandingPage() {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const onLoadedDataHandler = () => {
    setIsVideoLoaded(true);
  };
  return (
    <div className="landingpage">
      <div className="landingpage__bannerContainer">
        <img
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
          className="landingpage__bannerImg"
          alt="thumb"
          style={{ opacity: isVideoLoaded ? 0 : 0.6 }}
        />
        <video
          autoPlay
          playsInline
          muted
          src="https://cdn.kapwing.com/final_6084a1b28ecdf5002f0c6f28_382763.mp4"
          onLoadedData={onLoadedDataHandler}
          className="landingpage__bannerVideo"
          style={{ opacity: isVideoLoaded ? 0.6 : 0 }}
          loop
        />
        <div className="landingpage__ctaContainer">
          <div className="landingpage__ctaHeading">
            Watch best Tech Events on RWatch
          </div>
          <div className="landingpage__ctaTagLine">
            A Destination For The New Millennium.
          </div>
          <Link to="/signin">
            <button className="landingpage__ctaBtn">SignIn To Watch</button>
          </Link>
        </div>
      </div>
      <AllVideoListing />
    </div>
  );
}

export default LandingPage;
