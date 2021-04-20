import React, { useContext } from "react";
import { LatestRow, NormalVideoList } from "..";
import { videoContext } from "../../context/VideoContext";
import "./AllVideoListing.css";

function AllVideoListing() {
  const AllVideos = useContext(videoContext);
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
      <NormalVideoList videos={appleEvents} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={googleEvents} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={samsungEvents} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={microsoftEvents} />
      <div className="allVideosListing__hr"></div>
      <NormalVideoList videos={cesEvents} />
    </div>
  );
}

export default AllVideoListing;
