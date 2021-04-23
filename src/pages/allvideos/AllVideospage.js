import React, { useContext, useState } from "react";
import "./AllVideospage.css";
import { AiFillApple, AiFillTwitterSquare } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa";
import { SiSamsung } from "react-icons/si";
import { FaServicestack } from "react-icons/fa";
import { MdVideoLabel } from "react-icons/md";
import { videoContext } from "../../context/VideoContext";
import { NormalVideoCard } from "../../components";
import { useWindowDimensions } from "../../custom-hooks";

function AllVideospage() {
  const AllVideos = useContext(videoContext);
  const [activeOrganiser, setActiveOrganiser] = useState("All");

  const { width } = useWindowDimensions();
  console.log("WIDTH", width);

  const [videosToBeMapped, setVideosToBeMapped] = useState([]);

  const organisersList = [
    {
      organiser: "All",
      icon: <MdVideoLabel className="organisers-logo" />,
    },
    {
      organiser: "Apple",
      icon: <AiFillApple className="organisers-logo" />,
    },
    {
      organiser: "Google",
      icon: <AiFillGoogleCircle className="organisers-logo" />,
    },
    {
      organiser: "Microsoft",
      icon: <FaMicrosoft className="organisers-logo" />,
    },
    {
      organiser: "Samsung",
      icon: <SiSamsung className="organisers-logo" />,
    },
    {
      organiser: "CES",
      icon: <FaServicestack className="organisers-logo" />,
    },
  ];

  const handleOrganiserBtnClick = (organiser) => {
    setActiveOrganiser(organiser);
    setVideosToBeMapped(
      AllVideos.filter((video) => video.organiser === organiser)
    );
  };
  return (
    <div className="allvideospage">
      <div className="allvideospage__optionsWrapper">
        {organisersList.map((organiser) => (
          <div
            className={
              organiser.organiser === activeOrganiser
                ? "allvideospage__organiserBtn allvideospage__organiserBtn--active"
                : "allvideospage__organiserBtn"
            }
            onClick={() => handleOrganiserBtnClick(organiser.organiser)}
          >
            {organiser.icon} {width > 1245 ? organiser.organiser : ""}
          </div>
        ))}
      </div>
      <div className="allvidespage__videosWrapper">
        {(activeOrganiser === "All" ? AllVideos : videosToBeMapped).map(
          (video) => (
            <NormalVideoCard {...video} isInGrid/>
          )
        )}
      </div>
    </div>
  );
}

export default AllVideospage;
