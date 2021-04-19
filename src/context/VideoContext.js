import { createContext } from "react";
import { AllVideos } from "../data/AllVideos";

export const videoContext = createContext();

export const VideoContextProvider = ({ children }) => {
  return (
    <videoContext.Provider value={AllVideos}>{children}</videoContext.Provider>
  );
};
