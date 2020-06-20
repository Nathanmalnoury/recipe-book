import React from "react";
import { BrowserRouter, Route, useRouteMatch } from "react-router-dom";
import RecipeList from "../RecipeList/RecipeList";
import RecipeNav from "../Navs/RecipeNav";

const RouterListRecipe = () => {
  const { path } = useRouteMatch();

  return (
    <BrowserRouter>
      <RecipeNav />
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
      </div>
    </BrowserRouter>
  );
};

export default RouterListRecipe;
