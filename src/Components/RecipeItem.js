import React, { Component } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

export default class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      favourite: false,
    };
    this.openInWindow = this.openInWindow.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.getBackupImage = this.getBackupImage.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
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
  handleFavourite(e) {
    this.props.handleFavourite(e, this.props.item);
    this.setState((prevState) => {
      return {
        favourite: !prevState.favourite,
      };
    });
  }

  render() {
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
            {this.props.item.favorite || this.state.favourite ? (
              <StarIcon
                style={{ fontSize: 30 }}
                onClick={(e) => this.handleFavourite(e, this.props.item)}
              />
            ) : (
              <StarBorderIcon
                style={{ fontSize: 30 }}
                onClick={(e) => this.handleFavourite(e, this.props.item)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
