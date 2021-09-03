import "./PlaylistModal.css";
import React, { useContext, useState } from "react";
import { videoContext } from "../../context/VideoContext";
import Modal from "react-modal";
import { AiFillDelete } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";

const PlaylistModal = ({ video, modalIsOpen, setIsOpen }) => {
  const {
    currentUser: { playlists },
    dispatch,
    addNewPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
  } = useContext(UserContext);

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
      maxHeight: "50%",
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
    return playlist?.videos?.some(
      (playlistVideo) => playlistVideo._id === video._id
    );
  };
  const handleCheckboxClick = (playlist) => {
    console.log(playlist);
    console.log(video);
    let isInPlaylist = checkIsInPlaylist(playlist);
    isInPlaylist
      ? removeVideoFromPlaylist(playlist._id, video._id)
      : addVideoToPlaylist(playlist._id, video._id);
  };

  const addNewPlaylistHandler = () => {
    addNewPlaylist(newPlaylistName);
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
        {playlists.map((playlist, i) => (
          <div
            className="playlistmodal__checkboxInputContainer"
            key={playlist._id}
          >
            <input
              type="checkbox"
              onChange={() => handleCheckboxClick(playlist)}
              className="playlistmodal__checkbox"
              checked={checkIsInPlaylist(playlist)}
            />
            <div>{playlist.name}</div>
            <AiFillDelete
              onClick={() => deletePlaylist(playlist._id)}
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
