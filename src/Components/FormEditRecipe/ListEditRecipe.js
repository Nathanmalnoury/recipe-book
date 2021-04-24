import React from "react";
import useFetch from "../Hooks/useFetch";
import LoaderContainer from "../Misc/LoaderContainer";
import ErrorContainer from "../Misc/ErrorContainer";
import ItemEditRecipe from "./ItemEditRecipe";
import { getPostVar } from "../../utils";
const apiUrl = process.env.REACT_APP_GET_ALL;

const ListEditRecipe = () => {
  const { data, loading, error } = useFetch();
  let changes = {};
  const handleChange = (id, change) => {
    const index = data.findIndex((recipe) => recipe.id === id);
    const keys = Object.keys(change);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      data[index][key] = change[key];
      // updates Map changes
      if (id in Object.keys(changes)) {
        let val = changes.get(id);
        val[key] = change[key];
      } else {
        changes[id] = { [key]: change[key] };
      }
    }
  };

  const sendModifications = (e) => {
    e.preventDefault();
    console.log({ changes });
    let putVar = getPostVar(changes);
    putVar["method"] = "PUT";
    console.log(putVar.body);
    fetch(apiUrl, putVar);
  };
  return loading ? (
    <LoaderContainer />
  ) : error ? (
    <ErrorContainer message={error} />
  ) : (
    <div>
      <button onClick={(e) => sendModifications(e)}>Send modifications</button>
      <ul className="card-edit-container">
        {data.map((r) => (
          <ItemEditRecipe key={r.id} recipe={r} handleChange={handleChange} />
        ))}
      </ul>
    </div>
  );
};

export default ListEditRecipe;
