import { createContext, useEffect, useReducer, useState } from "react";
import { AllVideos } from "../data/AllVideos";
import axios from "axios";

export const videoContext = createContext();
const baseUrl = "https://rwatch-api.onrender.com/";

export const VideoContextProvider = ({ children }) => {
  const initialState = {
    isVideoLoading: false,
    isErr: false,
    currentVideo: {},
  };

  const fetchSingleVideo = async (videoId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      console.log("INSIDE_FETCH_VID", videoId);
      const res = await axios.get(`${baseUrl}/video/${videoId}`);
      console.log("INSIDE_FETCH_VID_RES", res);
      if (res.status === 200) {
        dispatch({ type: "SET_VIDEO", payload: res.data.video });
      }
    } catch (err) {
      console.log(err);
    }
    dispatch({ type: "TOGGLE_LOADING" });
  };

  const videoReducer = (state, action) => {
    switch (action.type) {
      case "SET_VIDEO":
        return { ...state, currentVideo: action.payload };

      case "TOGGLE_LOADING":
        return { ...state, isVideoLoading: !state.isVideoLoading };

      case "TOGGLE_ERR":
        return { ...state, isErr: !state.isErr };
    }
  };

  const [state, dispatch] = useReducer(videoReducer, initialState);

  return (
    <videoContext.Provider
      value={{
        ...state,
        dispatch,
        fetchSingleVideo,
        AllVideos,
      }}
    >
      {children}
    </videoContext.Provider>
  );
};
