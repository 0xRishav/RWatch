import { createContext, useEffect, useReducer, useState } from "react";
// import { AllVideos } from "../data/AllVideos";
import axios from "axios";

export const videoContext = createContext();
const baseUrl = "https://rwatch-api.herokuapp.com";

export const VideoContextProvider = ({ children }) => {
  const [playListIdCounter, setPlayListIdCounter] = useState(3);
  const initialState = {
    AllVideos: [],
    playlists: [
      {
        playlistId: 1,
        name: "Watch Later",
        playlist: [],
      },
    ],
    history: [],
    likedVideos: [],
    isLoading: false,
    isErr: false,
  };

  const videoReducer = (state, action) => {
    switch (action.type) {
      case "SET_ALL_VIDEOS":
        return { ...state, AllVideos: [...action.payload] };

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

      case "TOGGLE_LOADING":
        return { ...state, isLoading: state.isLoading };

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

      case "CLEAR_HISTORY":
        return {
          ...state,
          history: [],
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
      case "TOGGLE_ERR":
        return { ...state, isErr: !state.isErr };
    }
  };
  const [state, dispatch] = useReducer(videoReducer, initialState);
  useEffect(() => {
    (async function () {
      dispatch({ type: "TOGGLE_LOADING" });
      try {
        const response = await axios.get(`${baseUrl}/video`);
        if (response.data.success) {
          console.log("inside loop");
          dispatch({
            type: "SET_ALL_VIDEOS",
            payload: [...response.data.videos],
          });
        }
        console.log(response.data.videos);
      } catch (err) {
        dispatch({ type: "TOGGLE_ERR" });
      }

      dispatch({ type: "TOGGLE_LOADING" });
    })();
  }, []);

  return (
    <videoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </videoContext.Provider>
  );
};
