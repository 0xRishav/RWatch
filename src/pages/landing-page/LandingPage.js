import React from "react";
import "./LandingPage.css";
import landingPageBannerImg from "../../assets/newYorkImg2.jpg";
import landingPageBannerVideo from "../../assets/BannerVideo.mp4";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AllVideos } from "../../data/AllVideos";
import LatestVideoCard from "../../components/latest-video-card/LatestVideoCard";
import { LatestRow } from "../../containers";

function LandingPage() {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  const onLoadedData = () => {
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
        {/* <video
          autoPlay
          playsInline
          muted
          src="https://www.youtube.com/watch?v=SRs3zTkkFTY"
          onLoadedData={onLoadedData}
          className="landingpage__bannerVideo"
          style={{ opacity: isVideoLoaded ? 0.4 : 0.4 }}
        /> */}
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
        {/* <div className="fade--bottom" /> */}
      </div>
      <div className="landingpage__videoListingContainer">
        <LatestRow />
      </div>
    </div>
  );
}

export default LandingPage;
