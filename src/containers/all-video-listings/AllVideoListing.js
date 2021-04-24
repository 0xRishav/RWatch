import React, { useContext } from "react";
import { LatestRow, NormalVideoList } from "..";
import { videoContext } from "../../context/VideoContext";
import "./AllVideoListing.css";

function AllVideoListing() {
  const { AllVideos } = useContext(videoContext);
  const appleEvents = AllVideos.filter((video) => video.organiser === "Apple");
  const googleEvents = AllVideos.filter(
    (video) => video.organiser === "Google"
  );
  const samsungEvents = AllVideos.filter(
    (video) => video.organiser === "Samsung"
  );
  const microsoftEvents = AllVideos.filter(
    (video) => video.organiser === "Microsoft"
  );
  const cesEvents = AllVideos.filter((video) => video.organiser === "CES");

  return (
    <div className="allVideosListing">
      <LatestRow />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={appleEvents} isInGrid={true} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={googleEvents} isInGrid={true} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={samsungEvents} isInGrid={true} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={microsoftEvents} isInGrid={true} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={cesEvents} isInGrid={true} />
    </div>
  );
}

export default AllVideoListing;
