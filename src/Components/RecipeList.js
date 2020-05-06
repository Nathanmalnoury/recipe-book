import React, { Component } from "react";
import RecipeItem from "./RecipeItem";
import "../CSS/RecipeList.css";
import { Grid, Box } from "@material-ui/core";

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
  }

  renderRecipe(item) {
    return (
      <Grid item xs={12} sm={6} md={6} lg={4} key={item._id.$oid}>
        <RecipeItem item={item} key={item._id.$oid} />
      </Grid>
    );
  }

  render() {
    let listRecipe = this.state.recipe.map(this.renderRecipe);
    return (
      <Box className="recipe-list">
        <Grid m={10} container justify="flex-start" spacing={2} margin={15}>
          {listRecipe}
        </Grid>
      </Box>
    );
  }
}
