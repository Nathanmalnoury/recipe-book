import React from "react";
import { NavLink } from "react-router-dom";

const RecipeNav = () => {
  const activeNavStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    backgroundColor: "rgb(223, 103, 108)",
    height: "100%",
  };
  return (
    <nav id="subnav">
      <ul>
        <li>
          <NavLink
            activeStyle={activeNavStyle}
            exact
            to="/recipe"
            activeClassName="selectedLink"
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeNavStyle} to="/recipe/starter">
            Starter
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeNavStyle} to={"/recipe/main"}>
            Main
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeNavStyle} to={"/recipe/dessert"}>
            Dessert
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default RecipeNav;
