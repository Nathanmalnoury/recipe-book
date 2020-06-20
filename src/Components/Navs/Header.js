import React from "react";
import { Settings } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div id="header-container">
      <div id="title-link">
        <NavLink to="/" activeStyle={{ textDecoration: "none" }}>
          <h1 id="header-title">Cook Book</h1>
        </NavLink>
      </div>
      <div id="icon-container">
        <NavLink to="/edit" activeStyle={{ textDecoration: "none" }}>
          <Settings style={{ fill: "rgb(226, 97, 97)" }} />
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
