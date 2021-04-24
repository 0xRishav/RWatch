import { useContext } from "react";
import { videoContext } from "../../context/VideoContext";
import "./Historypage.css";

const Historypage = () => {
  const { history, AllVideos } = useContext(videoContext);
  const historyVideos = AllVideos.map(video=>{return})
  return (
    <div className="historypage">
      <h1>History Page</h1>
    </div>
  );
};

export default Historypage;
