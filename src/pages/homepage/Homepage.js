import React, { useContext } from "react";
import { AllVideoListing } from "../../containers";
import { videoContext } from "../../context/VideoContext";
import "./Homepage.css";

function Homepage() {
  const AllVideos = useContext(videoContext);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const { title, description, videoId } = AllVideos.find(
    (video) => video.title === "High Speed - October 13"
  );
  return (
    <div className="homepage">
      <header
        className="homepage__banner"
        style={{
          backgroundImage: `url("https://img.youtube.com/vi/${videoId}/maxresdefault.jpg")`,
        }}
      >
        <div className="homepage__bannerContent">
          <h1 className="homepage__bannerTitle">{title}</h1>
          <div className="homepage__bannerButtons">
            <button className="homepage__bannerButton">Play</button>
            <button className="homepage__bannerButton">My List</button>
          </div>
          <h3 className="homepage__bannerDiscription">{truncate(description, 150)}</h3>
        </div>
        <div className="fade--bottom" />
      </header>
      <AllVideoListing />
    </div>
  );
}

export default Homepage;
