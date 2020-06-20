import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import FormRecipe from "../FormAddRecipe/FormRecipe";
import RecipeRouter from "./RouterListRecipe";
import ListEditRecipe from "../FormEditRecipe/ListEditRecipe";
import MainNav from "../Navs/MainNav";
import Header from "../Navs/Header";
import GridImage from "../HomePage/GridImage";
import "../../CSS/Main.scss";

const RouterMain = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainNav />
      <div id="content">
        <Route exact path="/">
          <GridImage />
        </Route>
        <Route path="/recipe">
          <RecipeRouter />
        </Route>
        <Route path="/new">
          <FormRecipe />
        </Route>
        <Route path="/edit">
          <ListEditRecipe />
        </Route>
      </div>
    </BrowserRouter>
  );
};

export default RouterMain;
