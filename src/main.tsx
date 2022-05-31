import { ThemeProvider } from "@emotion/react";
import { loadTheme } from "@fluentui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { themes } from "./themes/themes";

const root = document.getElementById("root")!;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={loadTheme(themes[0].theme)}>
      <App themes={themes} />
    </ThemeProvider>
  </React.StrictMode>,
  root
);
