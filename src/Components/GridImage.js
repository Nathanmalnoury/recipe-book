import React, { Component } from "react";
import LoaderContainer from "./LoaderContainer";

export default class GridImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      images: [],
      error: false,
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_GET_ALL)
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        this.setState({
          images: result
            .map((recipe) => {
              return { id: recipe.id, image: recipe.image };
            })
            .filter((recipe) => {
              return recipe.image !== undefined;
            }),
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  openRecipe(e, id) {
    e.stopPropagation();
    // ! use Create Portal and make a modal out of it.
    // ! replicate from RecipeItem

    let win = window.open(process.env.REACT_APP_API_URL + `/recipe/${id}/view`);
    win.focus();
  }
  render() {
    if (this.state.loading === true) {
      return <LoaderContainer />;
    } else if (this.state.error === true) {
      return (
        <div className="error-container">
          <p>An error occurred while calling the API.</p>
        </div>
      );
    } else if (this.state.images.length === 0) {
      return (
        <div className="error-container">
          <p>Please add a first recipe !</p>
        </div>
      );
    } else {
      const imgTiles = this.state.images.map((recipe) => {
        return (
          <img
            src={`data:${recipe.image["content-type"]};base64,${recipe.image.content}`}
            key={recipe.id}
            alt=""
            onClick={(e) => this.openRecipe(e, recipe.id)}
          ></img>
        );
      });
      return <div className="recipe-pic-grid">{imgTiles}</div>;
    }
  }
}
