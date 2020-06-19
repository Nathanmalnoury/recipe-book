import React from "react";
import LoaderContainer from "./LoaderContainer";
import useFetch from "../Hooks/useFetch";
import ErrorContainer from "./ErrorContainer";
import GridTile from "./GridTile";
import { openRecipeInBrowser } from "../utils";

const GridImage = () => {
  const { data, loading, error } = useFetch();
  const getImageTiles = (data) => {
    return data
      .filter((recipe) => recipe.image !== undefined)
      .map((recipe) => (
        <GridTile
          key={recipe.id}
          image={recipe.image}
          handleClick={(e) => openRecipeInBrowser(e, recipe.id)}
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
