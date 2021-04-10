import "./App.css";
import { Switch, Route } from "react-router-dom";
import { LandingPage } from "./pages";
import { SignedOutNav } from "./components";

function App() {
  return (
    <div className="App">
      <SignedOutNav />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
