import React, { Component } from "react";
import "../CSS/TypeRecipeInput.css";
export default class TypeRecipeInput extends Component {
  render() {
    return (
      <div className="label-radio">
        <label>
          <input
            type="radio"
            value={this.props.value}
            onChange={this.props.onChange}
            checked={this.props.checked}
          />
          {this.props.children}
        </label>
      </div>
    );
  }
}
