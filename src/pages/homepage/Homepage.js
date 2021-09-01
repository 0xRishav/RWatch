import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AllVideoListing } from "../../containers";
import { videoContext } from "../../context/VideoContext";
import "./Homepage.css";
import { PlaylistModal } from "../../components";

function Homepage() {
  const { AllVideos } = useContext(videoContext);
  console.log("HOME_AllVideos", AllVideos);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const index = AllVideos?.findIndex(
    (video) => video.title === "High Speed - October 13"
  );

  const video = AllVideos[index];

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    console.log("CLICKED");
    setIsOpen(true);
  }

  return (
    <div className="homepage">
      <header
        className="homepage__banner"
        style={{
          backgroundImage: `url("https://img.youtube.com/vi/${video?.videoId}/maxresdefault.jpg")`,
        }}
      >
        <div className="homepage__bannerContent">
          <h1 className="homepage__bannerTitle">{video?.title}</h1>
          <div className="homepage__bannerButtons">
            <Link to={`/videos/${video?.videoId}`}>
              <button className="homepage__bannerButton">Play</button>
            </Link>
            <button className="homepage__bannerButton" onClick={openModal}>
              Add To Playlist
            </button>
          </div>
          <h3 className="homepage__bannerDiscription">
            {truncate(video?.description, 150)}
          </h3>
        </div>
        <div className="fade--bottom" />
      </header>

      <PlaylistModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        video={video}
        openModal={openModal}
      />

      <AllVideoListing />
    </div>
  );
}

export default Homepage;
