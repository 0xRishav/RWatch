import React, { useContext, useState } from "react";
import { videoContext } from "../../context/VideoContext";
import "./NormalVideoCard.css";
import { Link } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";

function NormalVideoCard({ videoId, _id, organiser, title, isInGrid }) {
  const [isCardHover, setIsCardHover] = useState(false);
  const { AllVideos } = useContext(videoContext);
  return (
    <div
      className={isInGrid ? "normalVideoCard inGrid" : "normalVideoCard"}
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
    >
      <Link to={`/videos/${_id}`} className="normalVideoCard__link">
        <img
          src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
          alt="video-cover"
          className="normalVideoCard__cover"
          style={{ opacity: isCardHover ? "0.5" : "1" }}
        />
        <div
          className="normalVideoCard__organiser"
          style={{ opacity: isCardHover ? "1" : "0" }}
        >
          {organiser}
        </div>
        <AiFillPlayCircle
          className="normalVideoCard__playBtn"
          size="50"
          style={{ opacity: isCardHover ? "1" : "0" }}
        />
        <div
          className="normalVideoCard__title"
          style={{ opacity: isCardHover ? "1" : "0" }}
        >
          {title}
        </div>
      </Link>
    </div>
  );
}

export default NormalVideoCard;
