import React from "react";
import useFetch from "../Hooks/useFetch";
import LoaderContainer from "../Misc/LoaderContainer";
import ErrorContainer from "../Misc/ErrorContainer";
import ItemEditRecipe from "./ItemEditRecipe";

const ListEditRecipe = () => {
  const { data, loading, error } = useFetch();
  const handleChange = (id, change) => {
    const index = data.findIndex((recipe) => recipe.id === id);
    const keys = Object.keys(change);
    console.log(data[index], Object.keys(change));
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      data[index][key] = change[key];
    }
    console.log(data[index]);
  };

  return loading ? (
    <LoaderContainer />
  ) : error ? (
    <ErrorContainer message={error} />
  ) : (
    <ul className="card-edit-container">
      {data.map((r) => (
        <ItemEditRecipe key={r.id} recipe={r} handleChange={handleChange} />
      ))}
    </ul>
  );
};

export default ListEditRecipe;
