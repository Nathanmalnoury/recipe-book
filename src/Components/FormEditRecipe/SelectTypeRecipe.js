import React from "react";

const SelectTypeRecipe = (props) => {
  return (
    <select
      defaultValue={props.typeRecipe}
      onChange={(e) =>
        props.handleChange(props.id, {
          type_recipe: e.target.value.toLocaleLowerCase(),
        })
      }
    >
      <option value="starter">Starter</option>
      <option value="main">Main</option>
      <option value="dessert">Dessert</option>
    </select>
  );
};

export default SelectTypeRecipe;
