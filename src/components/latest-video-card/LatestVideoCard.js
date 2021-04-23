import React, { useContext } from "react";
import { videoContext } from "../../context/VideoContext";
import "./LatestVideoCard.css";
import { Link } from "react-router-dom";

function LatestVideoCard({ title, videoId, description, organiser }) {
  const { AllVideos } = useContext(videoContext);
  // console.log(AllVideos);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };
  return (
    <Link className="latestVideoCard__link" to={`/videos/${videoId}`}>
      <div className="latestVideoCard">
        <img
          src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
          alt="thumbnail"
          className="latestVideoCard__coverPhoto"
        />
        <div className="latestVideoCard__infoWrapper">
          <div className="latestVideoCard__organiser">{organiser}</div>
          <div className="latestVideoCard__title">{truncate(title, 15)}</div>
          <div className="latestVideoCard__description">
            {truncate(description, 80)}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LatestVideoCard;
