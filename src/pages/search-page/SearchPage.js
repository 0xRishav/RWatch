import React from "react";
import { useLocation } from "react-router";
import { NormalVideoCard } from "../../components";
import "./SearchPage.css";

function SearchPage() {
  const { state } = useLocation();
  const { searchInput, filteredVideos } = state;
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
