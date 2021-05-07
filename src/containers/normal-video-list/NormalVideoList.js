import React from "react";
import { NormalVideoCard } from "../../components";
import "./NormalVideoList.css";
import ScrollContainer from "react-indiana-drag-scroll";

function NormalVideoList({ videos, title, isInGrid, dontShowTitle }) {
  return (
    <div className="normalVideoList">
      {!dontShowTitle &&
        (title ? (
          <h1>More From {title}</h1>
        ) : (
          <h1>From {videos[0].organiser}</h1>
        ))}
      <ScrollContainer className="normalVideoList__videosWrapper">
        {videos.map((video, i) => (
          <NormalVideoCard {...video} isInGrid={isInGrid} key={i}/>
        ))}
      </ScrollContainer>
    </div>
  );
}

export default NormalVideoList;
