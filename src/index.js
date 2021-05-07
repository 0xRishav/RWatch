import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { VideoContextProvider } from "./context/VideoContext";
import { AuthContextProvider } from "./context/authContext";
import { _ScrollToTop } from "./helpers";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <VideoContextProvider>
          <_ScrollToTop>
            <App />
          </_ScrollToTop>
        </VideoContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
