import React, { useContext, useRef } from "react";
import { LatestVideoCard } from "../../components";
import { videoContext } from "../../context/VideoContext";
import "./LatestRow.css";
import { RiArrowDropRightLine } from "react-icons/ri";
import ScrollContainer from "react-indiana-drag-scroll";

function LatestRow() {
  const { AllVideos } = useContext(videoContext);
  const latestVideos = AllVideos.filter((video) => video.isLatest);

  return (
    <div className="latestRow">
      <h1>Latest on RWatch</h1>
      <ScrollContainer className="latestRow__videosWrapper">
        {latestVideos.map((video) => (
          <LatestVideoCard {...video} />
        ))}
      </ScrollContainer>
    </div>
  );
}

export default LatestRow;
