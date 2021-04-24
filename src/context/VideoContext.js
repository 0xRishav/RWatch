import { createContext, useReducer, useState } from "react";
import { AllVideos } from "../data/AllVideos";

export const videoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [playListIdCounter, setPlayListIdCounter] = useState(3);
  const initialState = {
    playlists: [
      {
        playlistId: 1,
        name: "Watch Later",
        playlist: [],
      },
    ],
    history: [],
    likedVideos: [],
  };

  const videoReducer = (state, action) => {
    switch (action.type) {
      case "ADD_PLAYLIST":
        setPlayListIdCounter(playListIdCounter + 1);
        const newObj = {
          name: action.payload,
          playlist: [],
          playlistId: playListIdCounter,
        };
        return {
          ...state,
          playlists: [...state.playlists, newObj],
        };

      case "REMOVE_PLAYLIST":
        return {
          ...state,
          playlists: state.playlists.filter(
            (playlist) => playlist.playlistId !== action.payload.playlistId
          ),
        };

      case "ADD_TO_HISTORY":
        return {
          ...state,
          history: [...state.history, action.payload],
        };

      case "REMOVE_FROM_HISTORY":
        return {
          ...state,
          history: state.history.filter(
            (video) => video.videoId !== action.payload.videoId
          ),
        };

      case "ADD_TO_LIKED":
        return {
          ...state,
          likedVideos: [...state.likedVideos, action.payload],
        };

      case "REMOVE_FROM_LIKED":
        return {
          ...state,
          likedVideos: state.likedVideos.filter(
            (video) => video.videoId !== action.payload.videoId
          ),
        };

      case "ADD_TO_PLAYLIST":
        // const newPlaylist = state.playlists.map((individualPlaylist) => {
        //   if (individualPlaylist.playlistId === action.payload.id) {
        //     return {
        //       ...individualPlaylist,
        //       playlist: [...individualPlaylist.playlist, action.payload.video],
        //     };
        //   }
        //   return individualPlaylist;
        // });
        return {
          ...state,
          playlists: state.playlists.map((individualPlaylist) => {
            if (individualPlaylist.playlistId === action.payload.id) {
              return {
                ...individualPlaylist,
                playlist: [
                  ...individualPlaylist.playlist,
                  action.payload.video,
                ],
              };
            }
            return individualPlaylist;
          }),
        };
      case "REMOVE_FROM_PLAYLIST":
        const playlistIndex = state.playlists.findIndex(
          (playlist) => playlist.playlistId === action.payload.id
        );
        state.playlists[playlistIndex].playlist = state.playlists[
          playlistIndex
        ].playlist.filter((video) => video.videoId !== action.payload.videoId);
        return {
          ...state,
        };
    }
  };
  const [state, dispatch] = useReducer(videoReducer, initialState);
  return (
    <videoContext.Provider value={{ AllVideos, ...state, dispatch }}>
      {children}
    </videoContext.Provider>
  );
};
