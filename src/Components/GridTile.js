import React from "react";

const GridTile = (props) => {
  const { image, id, handleClick } = props;
  return (
    <img
      src={`data:${image["content-type"]};base64,${image.content}`}
      key={id}
      alt=""
      onClick={(e) => handleClick(e, id)}
    ></img>
  );
};

export default GridTile;
