import React, { Component } from "react";

import "../CSS/RecipeItem.css";

export default class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openInWindow = this.openInWindow.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  openInWindow(e) {
    e.stopPropagation();
    console.log(this.props.item._id);
    // ! use Create Portal and make a modal out of it.
    let win = window.open(
      process.env.REACT_APP_API_URL + `/recipe/${this.props.item._id.$oid}/view`
    );
    win.focus();
  }
  createMarkup() {
    return { __html: this.props.item.content };
  }

  render() {
    return (
      <div className="recipe-flex" onClick={this.openInWindow}>
        <img
          className="recipe-picture"
          src={this.props.item.image_url}
          alt={this.props.item.title}
        />
        <div className="no-overflow">
          <h6 className="recipe-title">{this.props.item.title}</h6>
        </div>
      </div>
    );
  }
}
