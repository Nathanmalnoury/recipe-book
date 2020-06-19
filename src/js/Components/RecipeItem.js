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
    this.handleFavourite = this.handleFavourite.bind(this);
  }

  openInWindow(e) {
    e.stopPropagation();
    console.log(this.props.item._id);
    // ! use Create Portal and make a modal out of it.
    let win = window.open(
      process.env.REACT_APP_API_URL + `/recipe/${this.props.item.id}/view`
    );
    win.focus();
  }
  createMarkup() {
    return { __html: this.props.item.content };
  }

  getImageTag(image, alt) {
    if (image) {
      return (
        <img
          src={`data:${this.props.item.image["content-type"]};base64,${this.props.item.image.content}`}
          alt={this.props.item.title}
        />
      );
    } else {
      switch (this.props.item.type_recipe) {
        case "starter":
          return (
            <img
              src={process.env.PUBLIC_URL + "/img/starter.jpg"}
              alt={alt}
            ></img>
          );
        case "main":
          return (
            <img
              src={process.env.PUBLIC_URL + "/img/main.jpeg"}
              alt={alt}
            ></img>
          );
        case "dessert":
          return (
            <img
              src={process.env.PUBLIC_URL + "/img/dessert.jpg"}
              alt={alt}
            ></img>
          );
        default:
          return (
            <img
              src={process.env.PUBLIC_URL + "/img/default.jpg"}
              alt={alt}
            ></img>
          );
      }
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
    let imageTag = this.getImageTag(this.props.item.image, this.props.title);
    return (
      <div className="recipe-flex" onClick={this.openInWindow}>
        {imageTag}
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
