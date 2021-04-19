import React, { useContext } from "react";
import { LatestVideoCard } from "../../components";
import { videoContext } from "../../context/VideoContext";
import "./LatestRow.css";

function LatestRow() {
  const AllVideos = useContext(videoContext);
  const latestVideos = AllVideos.filter((video) => video.isLatest);
  return (
    <div className="latestRow">
      <h1>Latest on RWatch</h1>
      <div className="latestRow__videosWrapper">
        {latestVideos.map((video) => (
          <LatestVideoCard {...video} />
        ))}
      </div>
    </div>
  );
}

export default LatestRow;
