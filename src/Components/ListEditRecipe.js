import React, { Component } from "react";

export default class ListEditRecipe extends Component {
  constructor() {
    super();
    this.state = { loading: true };
    this.getRecipes = this.getRecipes.bind(this);
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
  getRecipes() {
    if (this.state.loading === false) {
      return this.state.recipe.map((rec) => {
        // TODO : Needs a card component to modify each recipe.

        return <li>{rec.title}</li>;
      });
    }
  }
  render() {
    return <ul>{this.getRecipes()}</ul>;
  }
}
