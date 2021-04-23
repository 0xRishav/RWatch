import { createContext, useReducer } from "react";
import { AllVideos } from "../data/AllVideos";

export const videoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const initialState = {
    playlists: {
      likedVideos: [],
      watchLater: [],
    },
  };

  const videoReducer = (state, action) => {
    switch (action.type) {
      case "ADD_PLAYLIST":
        return {
          ...state,
          playlists: { ...state.playlists, [action.payload]: [] },
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
