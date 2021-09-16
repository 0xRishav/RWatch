import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NormalVideoCard } from "../../components";
import { videoContext } from "../../context/VideoContext";
import "./SearchPage.css";

function SearchPage() {
  const { state } = useLocation();
  const { AllVideos } = useContext(videoContext);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const { searchInput } = state;

  useEffect(() => {
    const videosToBeSet = AllVideos.filter(
      (video) =>
        video?.title?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
        video?.organiser?.toLowerCase()?.includes(searchInput?.toLowerCase())
    );
    setFilteredVideos([...videosToBeSet]);
  }, [searchInput]);
  return (
    <div className="searchpage">
      <h1>Search results for {searchInput}</h1>
      <div className="allvidespage__videosWrapper">
        {filteredVideos.length === 0 && <h3>Nothing to show</h3>}
        {filteredVideos.length > 0 &&
          filteredVideos.map((video, i) => (
            <NormalVideoCard {...video} isInGrid key={i} />
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
