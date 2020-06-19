import React from "react";
import RecipeItem from "./RecipeItem";
import LoaderContainer from "./LoaderContainer";
import ErrorContainer from "./ErrorContainer";
import useFetch from "../Hooks/useFetch";
import { getPostVar, recipeSorter } from "../utils";

const urlPostRecipe = process.env.REACT_APP_POST_FAVOURITE;

const RecipeList = (props) => {
  const { data, loading, error } = useFetch();

  const handleFavourite = (event, item) => {
    event.stopPropagation();
    fetch(
      urlPostRecipe,
      getPostVar({ id: item.id, favourite: !item.favorite })
    );
  };

  const renderRecipe = (data, filter) => {
    return data
      .filter((item) => {
        if (filter) {
          return item.type_recipe === filter;
        } else {
          return true;
        }
      })
      .map((item) => (
        <RecipeItem
          item={item}
          key={item.id}
          handleFavourite={handleFavourite}
        />
      ));
  };

  return loading ? (
    <LoaderContainer />
  ) : error ? (
    <ErrorContainer message="Error while calling API" />
  ) : (
    <div className="recipe-list-container">
      <h1 id="recipe-list-header">{props.header}</h1>
      {renderRecipe(data, props.filter).sort((a, b) => recipeSorter(a, b))}
    </div>
  );
};

export default RecipeList;
