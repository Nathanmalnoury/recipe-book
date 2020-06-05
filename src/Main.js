import React from "react";
import { Route, NavLink, BrowserRouter } from "react-router-dom";
import FormRecipe from "./Components/FormRecipe";
import RecipeRouter from "./Components/RecipeRouter";
import "./CSS/Main.scss";

import GridImage from "./Components/GridImage";
import { Settings } from "@material-ui/icons";

export default function Main() {
  const activeNavStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    backgroundColor: "rgb(204, 75, 80)",
    height: "100%",
  };
  return (
    <BrowserRouter>
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
        <Route exact path="/">
          <GridImage />
        </Route>
      </div>
    </BrowserRouter>
  );
}
