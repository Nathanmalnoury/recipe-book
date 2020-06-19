import React from "react";
import ReactDOM from "react-dom";
import Main from "./js/Main";
import { ApiContext, initialData } from "./js/Context/ApiContext";

const mountNode = document.querySelector("#root");

ReactDOM.render(
  <React.StrictMode>
    <ApiContext.Provider value={initialData}>
      <Main />
    </ApiContext.Provider>
  </React.StrictMode>,
  mountNode
);
