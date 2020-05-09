import React, { Component } from "react";
import "../CSS/FormRecipe.css";
import TypeRecipeInput from "./TypeRecipeInput";

export default class FormRecipe extends Component {
  initialState = {
    url: "",
    typeRecipe: "",
    errorUrl: "",
    errorType: "",
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
    let isOK = true;
    console.log(url, typeRecipe);

    if (typeRecipe === "") {
      console.log("Recipe type field is not selected");
      this.setState({ errorType: "Please select a type of recipe" });
      isOK = false;
    }
    if (!url) {
      console.log("URL field is empty");
      this.setState({ errorUrl: "Please enter the url to the recipe" });
      isOK = false;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      console.log(!url.startsWith("http://"), !url.startsWith("https://"));
      console.log("URL field is not properly formatted");
      this.setState({ errorUrl: "Url is not properly formatted." });
      isOK = false;
    }
    return isOK;
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
    console.log(event.target.value);
    this.setState({ typeRecipe: event.target.value });
  }
  render() {
    console.log(this.state);
    return (
      <div id="form-container">
        <h1>Enter a new recipe:</h1>

        <form onSubmit={this.createRecipe} className="new-recipe">
          <label>
            URL of the recipe to save:
            <input
              type="text"
              id="url-recipe"
              placeholder="http://best-recipe.com"
              onChange={this.updateUrl}
              value={this.props.value}
              className={this.state.errorUrl ? "error-url" : "ok-url"}
            />
          </label>

          <p>Please select your preferred contact method:</p>
          <div id="radio-choices">
            <TypeRecipeInput
              value="starter"
              onChange={this.handleClickRadio}
              checked={this.state.typeRecipe === "starter"}
            >
              <span role="img" aria-label="salad">
                🥗
              </span>
              Starter
            </TypeRecipeInput>
            <TypeRecipeInput
              value="main"
              onChange={this.handleClickRadio}
              checked={this.state.typeRecipe === "main"}
            >
              <span role="img" aria-label="spaghetti">
                🍝
              </span>
              Main
            </TypeRecipeInput>
            <TypeRecipeInput
              onChange={this.handleClickRadio}
              checked={this.state.typeRecipe === "dessert"}
              value="dessert"
            >
              <span role="img" aria-label="strawberry pudding">
                🍰
              </span>
              Dessert
            </TypeRecipeInput>
          </div>
          <button type="Submit">Add new recipe </button>
        </form>
      </div>
    );
  }
}
