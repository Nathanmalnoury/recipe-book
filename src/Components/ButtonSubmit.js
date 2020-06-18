import React from "react";
import LoaderContainer from "./LoaderContainer";

const ButtonSubmit = (props) => {
  const getMessage = (showLoading, showSuccess, message) => {
    if (showLoading === undefined) {
      return message ? message : "Save Recipe !";
    } else if (showLoading) {
      return message ? message : <LoaderContainer />;
    } else {
      if (showSuccess) {
        return message ? message : "Success";
      } else {
        return message ? message : "API Error";
      }
    }
  };
  const getId = (showLoading, showSuccess) => {
    if (showLoading === false) {
      // can be undefined
      return showSuccess ? "success-button" : "error-button";
    } else {
      return "waiting-button";
    }
  };
  let { showLoading, showSuccess, message } = props;
  return (
    <button onClick={props.onClick} id={getId(showLoading, showSuccess)}>
      {getMessage(showLoading, showSuccess, message)}
    </button>
  );
};

export default React.memo(ButtonSubmit);
