import { useContext } from "react";
import { NormalVideoList } from "../../containers";
import { UserContext } from "../../context/UserContext";
import "./Historypage.css";

const Historypage = () => {
  const {
    currentUser: { history },
    resetHistory,
  } = useContext(UserContext);

  return (
    <div className="historypage">
      {
        <div className="">
          {history?.length !== 0 && History}
          {history?.length !== 0 && (
            <NormalVideoList videos={history} dontShowTitle />
          )}
        </div>
      }
      {history?.length === 0 && <h1>Nothing to show</h1>}
      {history?.length !== 0 && (
        <button
          className="historypage__clearHistoryBtn"
          onClick={() => resetHistory()}
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default Historypage;
