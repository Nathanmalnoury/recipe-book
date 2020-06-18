import React from "react";

const TypeRecipeInput = (props) => {
  const { value, onChange, checked, children } = props;
  return (
    <div className="label-radio">
      <label>
        <input
          type="radio"
          value={value}
          onChange={onChange}
          checked={checked}
        />
        {children}
      </label>
    </div>
  );
};

export default TypeRecipeInput;
