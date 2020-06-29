import React from "react";
import { getImageSrc } from "../../utils";

const GridTile = (props) => {
  const { image, id, handleClick } = props;
  return (
    <img
      src={getImageSrc(image)}
      alt=""
      onClick={(e) => handleClick(e, id)}
    ></img>
  );
};

export default GridTile;
