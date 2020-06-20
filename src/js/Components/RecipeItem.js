import React, { useState, useContext } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { ApiContext } from "../Context/ApiContext";
import { openRecipeInBrowser } from "../utils";
const publicImageUrl = process.env.PUBLIC_URL + "/img";

const RecipeItem = (props) => {
  const [favourite, setFavourite] = useState(props.item.favorite);
  const dataSaved = useContext(ApiContext);
  const getImageTag = () => {
    const defaultTag = (filename) => (
      <img src={`${publicImageUrl}/${filename}`} alt={filename}></img>
    );
    if (props.item.image) {
      return (
        <img
          src={`data:${props.item.image["content-type"]};base64,${props.item.image.content}`}
          alt={props.item.title}
        />
      );
    } else {
      switch (props.item.type_recipe) {
        case "starter":
          return defaultTag("starter.jpg");
        case "main":
          return defaultTag("main.jpeg");
        case "dessert":
          return defaultTag("dessert.jpg");
        default:
          return defaultTag("default.jpg");
      }
    }
  };
  const handleFavourite = (e) => {
    props.handleFavourite(e, props.item);
    setFavourite(!favourite);
    dataSaved.shouldUpdate = true;
  };

  return (
    <div
      className="recipe-flex"
      onClick={(e) => openRecipeInBrowser(e, props.id)}
    >
      {getImageTag()}
      <div id="flex-col-title">
        <div id="no-overflow">
          <p className="recipe-title">{props.item.title}</p>
        </div>
        <div className="img-container">
          {favourite ? (
            <StarIcon style={{ fontSize: 30 }} onClick={handleFavourite} />
          ) : (
            <StarBorderIcon
              style={{ fontSize: 30 }}
              onClick={handleFavourite}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
