import "./App.css";
import { Switch, Route } from "react-router-dom";
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
} from "./pages";
import { SignedInNav, SignedOutNav } from "./components";
import { useContext } from "react";
import { authContext } from "./context/authContext";
import PrivateRoute from "./helpers/PrivateRoute";

function App() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext);
  return (
    <div className="App">
      {isUserLoggedIn ? <SignedInNav /> : <SignedOutNav />}

      <div className="App__wrapper">
        <Switch>
          <Route
            exact
            path="/"
            component={isUserLoggedIn ? Homepage : LandingPage}
          />
          <Route exact path="/signin" component={SignInPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/videos/:videoId" component={VideoPage} />
          <PrivateRoute exact path="/videos" component={AllVideospage} />
          <PrivateRoute exact path="/search" component={SearchPage} />
          <Route exact path="/profile" component={Profilepage} />
          <Route exact path="/history" component={Historypage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
