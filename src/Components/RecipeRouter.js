import React from "react";
import { BrowserRouter, NavLink, Route, useRouteMatch } from "react-router-dom";
import RecipeList from "./RecipeList";
export default function RecipeRouter() {
  let { path, url } = useRouteMatch();

  const activeNavStyle = {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    fontWeight: 600,
    backgroundColor: "rgb(223, 103, 108)",
    height: "100%",
  };
  return (
    <BrowserRouter>
      <nav id="subnav">
        <ul>
          <li>
            <NavLink
              activeStyle={activeNavStyle}
              exact
              to={`${url}`}
              activeClassName="selectedLink"
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeNavStyle} to={`${url}/starter`}>
              Starter
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeNavStyle} to={`${url}/main`}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeNavStyle} to={`${url}/dessert`}>
              Dessert
            </NavLink>
          </li>
          {/* <li><NavLink to='/random'>Random Suggestion</NavLink></li> */}
        </ul>
      </nav>

      <div id="sub-content">
        <Route exact path={`${path}/`}>
          <RecipeList filter="" header="All Recipes:" />
        </Route>
        <Route path={`${path}/starter`}>
          <RecipeList filter="starter" header="Starters:" />
        </Route>
        <Route path={`${path}/main`}>
          <RecipeList filter="main" header="Mains:" />
        </Route>
        <Route path={`${path}/dessert`}>
          <RecipeList filter="dessert" header="Desserts:" />
        </Route>
        {/* <Route exact path="/" component={RecipeItem} /> */}
        {/* <Route path="/random" component={<>To be built</>} /> */}
      </div>
    </BrowserRouter>
  );
}
