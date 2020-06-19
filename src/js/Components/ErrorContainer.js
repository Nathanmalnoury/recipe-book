import React from "react";

const ErrorContainer = (props) => {
  console.log("ErrorContainer", props.message);
  return (
    <div className="error-container">
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorContainer;
