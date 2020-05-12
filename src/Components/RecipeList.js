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
    return <RecipeItem item={item} key={item._id.$oid} />;
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
          {this.getRecipe().map(this.renderRecipe)}
        </div>
      );
    }
  }
}
