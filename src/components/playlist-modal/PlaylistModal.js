import "./PlaylistModal.css";
import React, { useContext, useState } from "react";
import { videoContext } from "../../context/VideoContext";
import Modal from "react-modal";
import { AiFillDelete } from "react-icons/ai";

const PlaylistModal = ({ video, modalIsOpen, setIsOpen }) => {
  const { playlists, dispatch } = useContext(videoContext);

  const [newPlaylistName, setNewPlaylistName] = useState("");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#2b2b2b",
      color: "white",
      minHeight: "50%",
      display: "flex",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItem: "center",
    },
  };

  function afterOpenModal() {
    console.log("Modal opened");
  }

  function closeModal() {
    setIsOpen(false);
  }

  const checkIsInPlaylist = (playlist) => {
    let isInPlaylist;
    if (
      playlist.playlist.some(
        (playlistVideo) => playlistVideo.videoId === video.videoId
      )
    ) {
      isInPlaylist = true;
    } else {
      isInPlaylist = false;
    }
    return isInPlaylist;
  };
  const handleCheckboxClick = (playlist) => {
    let isInPlaylist = checkIsInPlaylist(playlist);
    isInPlaylist
      ? dispatch({
          type: "REMOVE_FROM_PLAYLIST",
          payload: { id: playlist.playlistId, videoId: video.videoId },
        })
      : dispatch({
          type: "ADD_TO_PLAYLIST",
          payload: { id: playlist.playlistId, video },
        });
  };

  const addNewPlaylistHandler = () => {
    dispatch({ type: "ADD_PLAYLIST", payload: newPlaylistName });
    setNewPlaylistName("");
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Playlist Modal"
    >
      <button onClick={closeModal} className="playlistmodal__closeModal">
        x
      </button>
      <div className="playlistmodal__playlistWrapper">
        {playlists.map((playlist) => (
          <div className="playlistmodal__checkboxInputContainer">
            <input
              type="checkbox"
              onChange={() => handleCheckboxClick(playlist)}
              className="playlistmodal__checkbox"
              checked={checkIsInPlaylist(playlist)}
            />
            <div>{playlist.name}</div>
            <AiFillDelete
              onClick={() =>
                dispatch({
                  type: "REMOVE_PLAYLIST",
                  payload: { playlistId: playlist.playlistId },
                })
              }
              className="playlistmodal__playlistDeleteIcon"
            />
          </div>
        ))}
      </div>

      <div className="playlistmodal__addPlaylistWrapper">
        <input
          type="text"
          onChange={(e) => setNewPlaylistName(e.target.value)}
          value={newPlaylistName}
          placeholder="Enter Playlist Name..."
        />
        <button
          onClick={addNewPlaylistHandler}
          className="playlistmodal__addPlaylistBtn"
        >
          Add New Playlist
        </button>
      </div>
    </Modal>
  );
};

export default PlaylistModal;
