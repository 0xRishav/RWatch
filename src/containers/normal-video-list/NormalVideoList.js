import React from "react";
import { NormalVideoCard } from "../../components";
import "./NormalVideoList.css";
import ScrollContainer from "react-indiana-drag-scroll";

function NormalVideoList({ videos, title }) {
  return (
    <div className="normalVideoList">
      {title ? <h1>More From {title}</h1> : <h1>From {videos[0].organiser}</h1>}
      <ScrollContainer className="normalVideoList__videosWrapper">
        {videos.map((video) => (
          <NormalVideoCard {...video} />
        ))}
      </ScrollContainer>
    </div>
  );
}

export default NormalVideoList;
