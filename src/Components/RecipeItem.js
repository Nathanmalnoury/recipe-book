import React, { Component } from "react";
import outlineStar from "../images/star_outline-24px.svg";

export default class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.openInWindow = this.openInWindow.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.getBackupImage = this.getBackupImage.bind(this);
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
  getBackupImage() {
    switch (this.props.item.type_recipe) {
      case "starter":
        return process.env.REACT_APP_MISSING_IMG_STARTER;
      case "main":
        return process.env.REACT_APP_MISSING_IMG_MAIN;
      case "dessert":
        return process.env.REACT_APP_MISSING_IMG_DESSERT;
      default:
        return process.env.REACT_APP_MISSING_IMAGE;
    }
  }

  render() {
    console.log();
    let image_url = this.props.item.image_url
      ? this.props.item.image_url
      : this.getBackupImage();
    return (
      <div className="recipe-flex" onClick={this.openInWindow}>
        <img src={image_url} alt={this.props.item.title} />
        <div id="flex-col-title">
          <div id="no-overflow">
            <p className="recipe-title">{this.props.item.title}</p>
          </div>
          <div className="img-container">
            <img src={outlineStar}></img>
          </div>
        </div>
      </div>
    );
  }
}
