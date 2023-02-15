import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Stateprovider } from "./Stateprovider";
import reducer, { initialState } from "./reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Stateprovider initialState={initialState} reducer={reducer}>
    <App />
  </Stateprovider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
