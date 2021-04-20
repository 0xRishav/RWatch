import React from "react";
import { NormalVideoCard } from "../../components";
import "./NormalVideoList.css";
import ScrollContainer from "react-indiana-drag-scroll";

function NormalVideoList({ videos }) {
  return (
    <div className="normalVideoList">
      <h1>From {videos[0].organiser}</h1>
      <ScrollContainer className="normalVideoList__videosWrapper">
        {videos.map((video) => (
          <NormalVideoCard {...video} />
        ))}
      </ScrollContainer>
    </div>
  );
}

export default NormalVideoList;
