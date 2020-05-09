import React, { Component } from "react";
import RecipeItem from "./RecipeItem";
import "../CSS/RecipeList.css";

export default class RecipeList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      recipe: [],
    };
    this.renderRecipe = this.renderRecipe.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_GET_ALL)
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        this.setState({ recipe: result });
      });
    console.log(this.state);
  }

  renderRecipe(item) {
    return <RecipeItem item={item} key={item._id.$oid} />;
  }

  render() {
    console.log(this.state.recipe);
    let filteredRecipe = this.state.recipe
      .filter((item) => {
        if (this.props.filter) {
          return item.type_recipe === this.props.filter;
        } else {
          return true;
        }
      })
      .map(this.renderRecipe);
    return (
      <div id="recipe-list-container">
        <h1 id="recipe-list-header">{this.props.header}</h1>
        {filteredRecipe}
      </div>
    );
  }
}
