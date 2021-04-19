import React, { useContext } from "react";
import { videoContext } from "../../context/VideoContext";
import "./LatestVideoCard.css";

function LatestVideoCard() {
  const AllVideos = useContext(videoContext);
  // console.log(AllVideos);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };
  return (
    <div className="latestVideoCard">
      <img
        src={`https://img.youtube.com/vi/${AllVideos[0].videoId}/0.jpg`}
        alt="thumbnail"
        className="latestVideoCard__coverPhoto"
      />
      <div className="latestVideoCard__infoWrapper">
        <div className="latestVideoCard__organiser">
          {AllVideos[0].organiser}
        </div>
        <div className="latestVideoCard__title">{AllVideos[0].title}</div>
        <div className="latestVideoCard__description">
          {truncate(AllVideos[0].description, 80)}
        </div>
      </div>
    </div>
  );
}

export default LatestVideoCard;
