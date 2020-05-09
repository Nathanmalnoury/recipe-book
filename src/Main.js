import React from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import FormRecipe from "./Components/FormRecipe";
import "./CSS/Main.css";
import RecipeRouter from "./Components/RecipeRouter";

export default function Main() {
  const activeNavStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    fontWeight: 500,
    backgroundColor: "rgb(204, 75, 80)",
    height: "100%",
  };
  return (
    <BrowserRouter>
      <h1 id="header-title">Cook Book</h1>

      <nav id="main-nav">
        <ul className="main-nav-links">
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
            <NavLink activeStyle={activeNavStyle} to="/new">
              Add New Recipe
            </NavLink>
          </li>

          {/* <li><NavLink to='/random'>Random Suggestion</NavLink></li> */}
        </ul>
      </nav>

      <div id="content">
        <Route path="/recipe">
          <RecipeRouter />
        </Route>
        <Route path="/new" component={FormRecipe} />
      </div>
    </BrowserRouter>
  );
}
