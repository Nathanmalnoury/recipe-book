import React from "react";
import { getImageSrc } from "../../utils";
import SelectTypeRecipe from "./SelectTypeRecipe";

const ItemEditRecipe = (props) => {
  const handleChange = props.handleChange;
  const { title, type_recipe, image, id } = props.recipe;
  const handleChangeImage = (e) => {
    const onLoadEnd = (e) => {
      const newImage = { content: e.target.result, "content-type": file.type };
      handleChange(id, { image: newImage });
    };
    const fileReader = new FileReader();
    const file = e.target.files[0];
    fileReader.onloadend = onLoadEnd;
    fileReader.readAsText(file);
  };
  
  return (
    <div className="card-edit-recipe">
      {image && image["content-type"] && (
        <img src={getImageSrc(props.recipe.image)} />
      )}
      <input type="file" onChange={handleChangeImage} />
      <div className="card-edit-body">
        <input
          type="text"
          defaultValue={title}
          onBlur={(e) => handleChange(id, { title: e.target.value })}
        ></input>
        <SelectTypeRecipe
          typeRecipe={type_recipe}
          id={id}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ItemEditRecipe;
