import React, { useContext, useState } from "react";
import { videoContext } from "../../context/VideoContext";
import "./NormalVideoCard.css";
import { AiFillPlayCircle } from "react-icons/ai";

function NormalVideoCard() {
  const [isCardHover, setIsCardHover] = useState(false);
  const AllVideos = useContext(videoContext);
  return (
    <div
      className="normalVideoCard"
      onMouseEnter={() => setIsCardHover(true)}
      onMouseLeave={() => setIsCardHover(false)}
    >
      <img
        src={`https://img.youtube.com/vi/${AllVideos[0].videoId}/0.jpg`}
        alt="video-cover"
        className="normalVideoCard__cover"
        style={{ opacity: isCardHover ? "0.8" : "1" }}
      />
      <div
        className="normalVideoCard__organiser"
        style={{ opacity: isCardHover ? "1" : "0" }}
      >
        {AllVideos[0].organiser}
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
        {AllVideos[0].title}
      </div>
    </div>
  );
}

export default NormalVideoCard;
