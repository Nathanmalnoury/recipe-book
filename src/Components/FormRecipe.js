import React, { Component } from "react";
import "../CSS/FormRecipe.css";

export default class FormRecipe extends Component {
  initialState = {
    url: "",
    typeRecipe: "",
  };
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.createRecipe = this.createRecipe.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.handleClickRadio = this.handleClickRadio.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  updateUrl(event) {
    this.setState({ url: event.target.value });
  }

  validateForm() {
    const { url, typeRecipe } = this.state;
    console.log(url, typeRecipe);
    if (typeRecipe === "") {
      console.log("Recipe type field is not selected");
      return false;
    }
    if (!url) {
      console.log("URL field is empty");
      return false;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      console.log(!url.startsWith("http://"), !url.startsWith("https://"));
      console.log("URL field is not properly formatted");
      return false;
    }
    return true;
  }

  createRecipe(event) {
    event.preventDefault();
    if (this.validateForm()) {
      const variables = {
        method: "POST",
        cors: "cors",
        credentials: "same-origin",
        referrerPolicy: "no-referrer",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: this.state.url,
          typeRecipe: this.state.typeRecipe,
        }),
      };
      console.log(variables);
      fetch(process.env.REACT_APP_CREATE_NEW, variables)
        .then((response) => {
          console.log(response);
          if (response.status !== 200) {
            console.log(
              `Error while calling API, Code error ${response.status}`
            );
            return;
          }
          return response.json();
        })
        .then((response) => {
          console.log(response);
        });
    }
  }
  handleClickRadio(event) {
    this.setState({ typeRecipe: event.target.value });
  }
  render() {
    return (
      <div className="form-holder">
        <form onSubmit={this.createRecipe}>
          <label>
            URL of the recipe to save:
            <input
              type="text"
              id="url-recipe"
              placeholder="http://best-recipe.com"
              onChange={this.updateUrl}
              value={this.props.value}
            />
          </label>

          <p>Please select your preferred contact method:</p>
          <div id="radio-choices">
            <input
              type="radio"
              id="typeRecipe1"
              name="typeRecipe"
              value="starter"
              onClick={this.handleClickRadio}
            />
            <label htmlFor="typeRecipe1">
              Starter{" "}
              <span role="img" aria-label="salad">
                🥗
              </span>
            </label>

            <input
              type="radio"
              id="typeRecipe2"
              name="typeRecipe"
              value="main"
              onClick={this.handleClickRadio}
            />
            <label htmlFor="typeRecipe2">
              Main{" "}
              <span role="img" aria-label="spaghetti">
                🍝
              </span>
            </label>

            <input
              type="radio"
              id="typeRecipe3"
              name="typeRecipe"
              value="dessert"
              onClick={this.handleClickRadio}
            />
            <label htmlFor="typeRecipe3">
              Dessert{" "}
              <span role="img" aria-label="strawberry pudding">
                🍰
              </span>
            </label>
          </div>
          <button type="Submit">Add new recipe </button>
        </form>
      </div>
    );
  }
}
