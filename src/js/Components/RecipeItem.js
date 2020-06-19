import React, { useState, useContext } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { ApiContext } from "../Context/ApiContext";

const apiUrl = process.env.REACT_APP_API_URL;
const publicImageUrl = process.env.PUBLIC_URL + "/img";

const RecipeItem = (props) => {
  const [favourite, setFavourite] = useState(false);
  const dataSaved = useContext(ApiContext);
  const openInWindow = (e) => {
    e.stopPropagation();
    // ! use Create Portal and make a modal out of it.
    let win = window.open(`${apiUrl}/recipe/${props.item.id}/view`);
    win.focus();
  };
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
    <div className="recipe-flex" onClick={openInWindow}>
      {getImageTag()}
      <div id="flex-col-title">
        <div id="no-overflow">
          <p className="recipe-title">{props.item.title}</p>
        </div>
        <div className="img-container">
          {props.item.favorite || favourite ? (
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

//   render() {
//     let imageTag = this.getImageTag(this.props.item.image, this.props.title);
//     return (
//
//     );
//   }
// }
