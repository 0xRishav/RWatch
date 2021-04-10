import React from "react";
import "./LandingPage.css";
import landingPageBannerImg from "../../assets/newYorkImg2.jpg";
import landingPageBannerVideo from "../../assets/BannerVideo.mp4";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function LandingPage() {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };
  return (
    <div className="landingpage">
      <div className="landingpage__bannerContainer">
        <img
          src={landingPageBannerImg}
          className="landingpage__bannerImg"
          alt="thumb"
          style={{ opacity: isVideoLoaded ? 0 : 1 }}
        />
        <video
          autoPlay
          playsInline
          muted
          src={landingPageBannerVideo}
          onLoadedData={onLoadedData}
          className="landingpage__bannerVideo"
          style={{ opacity: isVideoLoaded ? 1 : 0 }}
        />
        <div className="landingpage__ctaContainer">
          <div className="landingpage__ctaHeading">
            Watch best of Travel Videos on RWatch
          </div>
          <div className="landingpage__ctaTagLine">
            A Destination For The New Millennium.
          </div>
          <Link to="/signin">
            <button className="landingpage__ctaBtn">SignIn To Watch</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
