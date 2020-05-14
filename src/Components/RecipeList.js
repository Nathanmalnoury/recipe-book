import React, { Component } from "react";
import RecipeItem from "./RecipeItem";

export default class RecipeList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      recipe: [],
      error: false,
    };
    this.renderRecipe = this.renderRecipe.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_GET_ALL)
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        this.setState({ recipe: result });
      })
      .catch((error) => {
        console.log("Error occured", error);
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  getRecipe() {
    return this.state.recipe.filter((item) => {
      if (this.props.filter) {
        return item.type_recipe === this.props.filter;
      } else {
        // if filter is set up to all
        return true;
      }
    });
  }

  renderRecipe(item) {
    return (
      <RecipeItem
        item={item}
        key={item._id.$oid}
        handleFavourite={this.handleFavourite.bind(this)}
      />
    );
  }

  handleFavourite(event, item) {
    event.stopPropagation();
    const varPost = {
      method: "POST",
      cors: "cors",
      credentials: "same-origin",
      referrerPolicy: "no-referrer",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item._id.$oid,
        favourite: !item.favorite,
      }),
    };
    console.log(varPost);
    fetch(process.env.REACT_APP_POST_FAVOURITE, varPost).then((resp) => {
      console.log(resp);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div className="error-container">
          <p>An error occured while calling the API.</p>
        </div>
      );
    } else {
      return (
        <div className="recipe-list-container">
          <h1 id="recipe-list-header">{this.props.header}</h1>
          {this.getRecipe()
            .map(this.renderRecipe)
            .sort((a, b) => {
              console.log(a);
              if (a.props.item.favorite && !b.props.item.favorite) {
                return -1;
              } else if (b.props.item.favorite && !a.props.item.favorite) {
                return 1;
              } else {
                return a.props.item.title > b.props.item.title;
              }
            })}
        </div>
      );
    }
  }
}
