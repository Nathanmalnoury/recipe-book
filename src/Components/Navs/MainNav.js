import React from "react";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  const activeNavStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    backgroundColor: "rgb(204, 75, 80)",
    height: "100%",
  };
  return (
    <nav id="main-nav">
      <ul>
        <li>
          <NavLink
            activeStyle={activeNavStyle}
            to="/recipe"
            activeClassName="selectedLink"
          >
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={activeNavStyle}
            to="/new"
            activeClassName="selectedLink"
          >
            Add New Recipe
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default MainNav;
