import React from "react";
import useFetch from "../Hooks/useFetch";
import LoaderContainer from "./LoaderContainer";
import ErrorContainer from "./ErrorContainer";

const ListEditRecipe = () => {
  const { data, loading, error } = useFetch();
  return loading ? (
    <LoaderContainer />
  ) : error ? (
    <ErrorContainer message={error} />
  ) : (
    <ul>
      {data.map((r) => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
};

export default ListEditRecipe;
