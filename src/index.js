import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

const mountNode = document.querySelector("#root");

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  mountNode
);
