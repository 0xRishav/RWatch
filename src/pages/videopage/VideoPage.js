import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../../context/UserContext";

function VideoPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoId, setVideoId] = useState("");
  const { AllVideos, fetchSingleVideo, currentVideo } =
    useContext(videoContext);
  const {
    currentUser: { likedVideos, history },
    addToHistory,
    likeVideo,
    dislikeVideo,
  } = useContext(UserContext);
  const { dispatch } = useContext(videoContext);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [organisersVideos, setOrganisersVideos] = useState([]);
  const [playBtnHover, setPlayBtnHover] = useState(false);
  const [isInHistory, setIsInHistory] = useState(false);
  const { dbVideoId } = useParams();
  const checkIsInLiked = () => {
    const index = likedVideos.findIndex(
      (likedVideo) => likedVideo._id === currentVideo?._id
    );
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    fetchSingleVideo(dbVideoId);
    let orgVideos = AllVideos.filter(
      (individualVideo) => individualVideo.organiser === currentVideo?.organiser
    ).filter((organierVideo) => organierVideo.videoId !== videoId);
    setOrganisersVideos(orgVideos);
  }, [dbVideoId]);
  useEffect(() => {
    let orgVideos = AllVideos.filter(
      (individualVideo) => individualVideo.organiser === currentVideo?.organiser
    ).filter((organierVideo) => organierVideo.videoId !== videoId);
    setOrganisersVideos(orgVideos);
  }, [currentVideo]);

  useEffect(() => {
    setIsVideoLiked(checkIsInLiked());
  }, [dbVideoId, likedVideos, currentVideo]);
  useEffect(() => {
    setIsInHistory(checkIsInHistory());
  }, [dbVideoId, history]);

  console.log("likedVideos", likedVideos);

  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  const checkIsInHistory = () => {
    const index = history.findIndex(
      (historyVideo) => historyVideo._id === currentVideo?._id
    );
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  console.log("HISTORY", history);

  const playBtnClickHandler = () => {
    setIsVideoPlaying(true);
    if (isInHistory) {
      return;
    } else {
      addToHistory(currentVideo._id);
    }
  };

  const likeClickHandler = () => {
    isVideoLiked ? dislikeVideo(currentVideo._id) : likeVideo(currentVideo._id);
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
              backgroundImage: `url("https://img.youtube.com/vi/${currentVideo.videoId}/maxresdefault.jpg")`,
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
          videoId={currentVideo.videoId}
          opts={opts}
          className="videopage__youtube__video"
        />
      )}
      <div className="videopage__titleBtnWrapper">
        <div className="videopage__titleWrapper">
          <h2>{currentVideo?.title}</h2>
          <p>{currentVideo?.description}</p>
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
          <a
            href={currentVideo?.videoUrl}
            target="_blank"
            className="videopage__link"
          >
            <BsArrowUpRight className="videopage__icons" />
          </a>
        </div>
      </div>

      <PlaylistModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        video={currentVideo}
        openModal={openModal}
      />

      <div className="videopage__hr" />

      <NormalVideoList
        videos={organisersVideos}
        title={currentVideo?.organiser}
      />
    </div>
  );
}

export default VideoPage;
