import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/Router/RouterMain";
import { ApiContext, initialData } from "./Components/Context/ApiContext";

const mountNode = document.querySelector("#root");

ReactDOM.render(
  <React.StrictMode>
    <ApiContext.Provider value={initialData}>
      <Main />
    </ApiContext.Provider>
  </React.StrictMode>,
  mountNode
);
