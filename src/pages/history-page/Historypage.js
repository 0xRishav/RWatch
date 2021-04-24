import { useContext } from "react";
import { NormalVideoList } from "../../containers";
import { videoContext } from "../../context/VideoContext";
import "./Historypage.css";

const Historypage = () => {
  const { history, dispatch } = useContext(videoContext);

  return (
    <div className="historypage">
      {
        <div className="">
          {history.length !== 0 && History}
          {history.length !== 0 && (
            <NormalVideoList videos={history} dontShowTitle />
          )}
        </div>
      }
      {history.length === 0 && <h1>Nothing to show</h1>}
      {history.length !== 0 && (
        <button
          className="historypage__clearHistoryBtn"
          onClick={() => dispatch({ type: "CLEAR_HISTORY" })}
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default Historypage;
