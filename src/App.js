import "./App.css";
import { Switch, Route } from "react-router-dom";
import { Homepage, LandingPage, VideoPage } from "./pages";
import { SignedOutNav } from "./components";

function App() {
  return (
    <div className="App">
      <SignedOutNav />
      <div className="App__wrapper">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/homepage" component={Homepage} />
          <Route exact path="/videos/:videoId" component={VideoPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
