import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { themes } from "./themes/themes";

const root = document.getElementById("root")!;

ReactDOM.render(
  <React.StrictMode>
    <App themes={themes} />
  </React.StrictMode>,
  root
);
