import React, { Component } from "react";
import RecipeItem from "./RecipeItem";
import LoaderContainer from "./LoaderContainer";
import ErrorContainer from "./ErrorContainer";

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
        key={item.id}
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
        id: item.id,
        favourite: !item.favorite,
      }),
    };
    fetch(process.env.REACT_APP_POST_FAVOURITE, varPost).then((resp) => {
      console.log(resp);
    });
  }

  render() {
    if (this.state.loading) {
      return <LoaderContainer />;
    } else if (this.state.error) {
      return (
        <ErrorContainer message="An error occured while calling the API." />
      );
    } else {
      return (
        <div className="recipe-list-container">
          <h1 id="recipe-list-header">{this.props.header}</h1>
          {this.getRecipe()
            .map(this.renderRecipe)
            .sort((a, b) => {
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
