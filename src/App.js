import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  AllVideospage,
  Homepage,
  LandingPage,
  SearchPage,
  SignInPage,
  SignUpPage,
  VideoPage,
  Profilepage,
  Historypage,
  PlaylistPage,
  RouteNotFound,
} from "./pages";
import { Loader, SignedInNav, SignedOutNav } from "./components";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import PrivateRoute from "./helpers/PrivateRoute";
import { videoContext } from "./context/VideoContext";

function App() {
  const { accessToken, isUserLoading } = useContext(UserContext);
  const { isVideoLoading } = useContext(videoContext);
  console.log("IS Loading", isUserLoading, isVideoLoading);
  return (
    <div className="App">
      {(isUserLoading || isVideoLoading) && <Loader />}
      {/* {isUserLoading && <h1>Loading...</h1>} */}
      {accessToken ? <SignedInNav /> : <SignedOutNav />}

      <div className="App__wrapper">
        <Switch>
          <Route
            exact
            path="/"
            component={accessToken ? Homepage : LandingPage}
          />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/videos/:dbVideoId" component={VideoPage} />
          <Route exact path="/videos" component={AllVideospage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/profile" component={Profilepage} />
          <Route exact path="/history" component={Historypage} />
          <Route exact path="/playlists" component={PlaylistPage} />
          <Route path="/404" component={RouteNotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
