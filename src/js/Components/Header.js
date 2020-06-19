import React from "react";
import { Settings } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div id="header-container">
      <NavLink to="/">
        <div id="title-link">
          <h1 id="header-title">Cook Book</h1>
        </div>
      </NavLink>
      <NavLink to="/edit">
        <div id="icon-container">
          <Settings style={{ fill: "rgb(226, 97, 97)" }} />
        </div>
      </NavLink>
    </div>
  );
};

export default Header;
