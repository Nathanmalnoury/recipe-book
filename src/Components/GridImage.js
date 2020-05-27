import React, { Component } from "react";

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
              console.log(recipe);
              return { id: recipe._id.$oid, image: recipe.image_url };
            })
            .filter((recipe) => {
              return recipe.image !== undefined;
            }),
        });
      })
      .catch((error) => {
        console.log("Error occured", error);
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
    console.log(this.state);

    if (this.state.loading === true) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      );
    } else if (this.state.error === true) {
      return (
        <div className="error-container">
          <p>An error occured while calling the API.</p>
        </div>
      );
    } else if (this.state.images.length === 0) {
      return <>Empty</>;
    } else {
      const imgTiles = this.state.images.map((recipe) => {
        return (
          <img
            src={recipe.image}
            key={recipe.image}
            alt=""
            onClick={(e) => this.openRecipe(e, recipe.id)}
          ></img>
        );
      });
      return <div className="recipe-pic-grid">{imgTiles}</div>;
    }
  }
}
