import React, { useContext, useState } from "react";
import "./VideoPage.css";
import { BiPlayCircle } from "react-icons/bi";
import { videoContext } from "../../context/VideoContext";
import { NormalVideoList } from "../../containers";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import { BsArrowUpRight } from "react-icons/bs";
import { useParams } from "react-router";
import YouTube from "react-youtube";
import { PlaylistModal } from "../../components";

function VideoPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { AllVideos, likedVideos } = useContext(videoContext);
  const { dispatch } = useContext(videoContext);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const { videoId } = useParams();
  const video = AllVideos.find((video) => video.videoId === videoId);

  const organisersVideos = AllVideos.filter(
    (individualVideo) => individualVideo.organiser === video.organiser
  ).filter((organierVideo) => organierVideo.videoId !== videoId);
  const [playBtnHover, setPlayBtnHover] = useState(false);

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const playBtnClickHandler = () => {
    dispatch({ type: "ADD_TO_HISTORY", payload: videoId });
    setIsVideoPlaying(true);
  };

  const checkIsInLiked = () => {
    let isInLiked;
    if (
      likedVideos.some((likedVideo) => likedVideo.videoId === video.videoId)
    ) {
      isInLiked = true;
    } else {
      isInLiked = false;
    }
    return isInLiked;
  };

  const likeClickHandler = () => {
    setIsVideoLiked(!isVideoLiked);
    checkIsInLiked()
      ? dispatch({ type: "ADD_TO_LIKED", payload: video })
      : dispatch({ type: "REMOVE_FROM_LIKED", payload: { videoId: videoId } });
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    console.log("CLICKED");
    setIsOpen(true);
  }

  return (
    <div className="videopage">
      {!isVideoPlaying && (
        <>
          {" "}
          <div
            className="videopage__banner"
            style={{
              backgroundImage: `url("https://img.youtube.com/vi/${videoId}/maxresdefault.jpg")`,
              opacity: playBtnHover ? "0.5" : "1",
            }}
          >
            <div className="fade--bottom" />
          </div>
          <BiPlayCircle
            className="videopage__playIcon"
            opacity="1"
            onMouseEnter={() => setPlayBtnHover(true)}
            onMouseLeave={() => setPlayBtnHover(false)}
            onClick={playBtnClickHandler}
          />
        </>
      )}

      {isVideoPlaying && (
        <YouTube
          videoId={videoId}
          opts={opts}
          className="videopage__youtube__video"
        />
      )}
      <div className="videopage__titleBtnWrapper">
        <div className="videopage__titleWrapper">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>

        <div className="videopage__iconWrapper">
          {isVideoLiked ? (
            <AiFillLike
              className="videopage__icons"
              onClick={likeClickHandler}
            />
          ) : (
            <AiOutlineLike
              className="videopage__icons"
              onClick={likeClickHandler}
            />
          )}
          <MdPlaylistAdd className="videopage__icons" onClick={openModal} />
          <a href={video.videoUrl} target="_blank" className="videopage__link">
            <BsArrowUpRight className="videopage__icons" />
          </a>
        </div>
      </div>

      <PlaylistModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        video={video}
        openModal={openModal}
      />

      <div className="videopage__hr" />

      <NormalVideoList videos={organisersVideos} title={video.organiser} />
    </div>
  );
}

export default VideoPage;
