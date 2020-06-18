import React from "react";
import LoaderContainer from "./LoaderContainer";
import useFetch from "./hooks/useFetch";
import ErrorContainer from "./ErrorContainer";
import GridTile from "./GridTile";

const GridImage = () => {
  const { data, loading, error } = useFetch();

  const openRecipe = (e, idRecipe) => {
    e.stopPropagation();
    // ! use Create Portal and make a modal out of it.
    // ! replicate from RecipeItem

    let win = window.open(
      process.env.REACT_APP_API_URL + `/recipe/${idRecipe}/view`
    );
    win.focus();
  };

  const getImageTiles = (data) => {
    return data
      .filter((recipe) => recipe.image !== undefined)
      .map((recipe) => (
        <GridTile
          image={recipe.image}
          id={recipe.id}
          handleClick={openRecipe}
        />
      ));
  };

  return loading ? (
    <LoaderContainer />
  ) : error ? (
    <ErrorContainer message="Error while calling API." />
  ) : data.length === 0 ? (
    <ErrorContainer message="Add your first recipe." />
  ) : (
    <div className="recipe-pic-grid">{getImageTiles(data)}</div>
  );
};
export default GridImage;
