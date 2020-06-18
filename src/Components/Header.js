import React from "react";
import { Settings } from "@material-ui/icons";

const Header = () => {
  return (
    <div id="header-container">
      <a href="/" id="title-link">
        <h1 id="header-title">Cook Book</h1>
      </a>
      <div id="icon-container">
        <a href="/edit">
          <Settings style={{ fill: "rgb(226, 97, 97)" }} />
        </a>
      </div>
    </div>
  );
};

export default Header;
