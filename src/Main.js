import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import FormRecipe from "./Components/FormRecipe";
import RecipeRouter from "./Components/RecipeRouter";
import ListEditRecipe from "./Components/ListEditRecipe";
import MainNav from "./Components/MainNav";
import Header from "./Components/Header";
import GridImage from "./Components/GridImage";
import "./CSS/Main.scss";

const Main = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainNav />
      <div id="content">
        <Route path="/recipe">
          <RecipeRouter />
        </Route>
        <Route path="/new" component={FormRecipe} />
        <Route exact path="/">
          <GridImage />
        </Route>
        <Route path="/edit">
          <ListEditRecipe />
        </Route>
      </div>
    </BrowserRouter>
  );
};

export default Main;
