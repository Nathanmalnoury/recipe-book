import React, { Component } from "react";
import TypeRecipeInput from "./TypeRecipeInput";
import ButtonSubmit from "./ButtonSubmit";

export default class FormRecipe extends Component {
  initialState = {
    url: "",
    typeRecipe: "",
    errorUrl: "",
    errorType: "",
    addingRecipe: undefined,
    recipeAdded: undefined,
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
    this.setState({ errorType: "", errorUrl: "" });
    let isOK = true;

    if (typeRecipe === "") {
      this.setState({ errorType: "Please select a type of recipe" });
      isOK = false;
    }
    if (url === "") {
      this.setState({ errorUrl: "Please enter the url to the recipe" });
      isOK = false;
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      this.setState({ errorUrl: "Url is not properly formatted." });
      isOK = false;
    }
    return isOK;
  }

  getPostVariables() {
    return {
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
  }

  createRecipe(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ addingRecipe: true });
      fetch(process.env.REACT_APP_CREATE_NEW, this.getPostVariables())
        .then((response) => {
          let newState;
          if (response.ok) {
            newState = {
              recipeAdded: true,
              message: "Recipe added !",
            };
          } else {
            newState = { recipeAdded: false, message: "API Error" };
          }
          this.setState({ ...this.initialState, ...newState });
          return response.json();
        })
        .then((response) => {
          if (response.message) {
            this.setState({ message: response.message });
          }
        })
        .catch(() => {
          this.setState({
            recipeAdded: false,
          });
        })
        .finally(() => {
          this.setState({ addingRecipe: false });
        });
    }
  }
  handleClickRadio(event) {
    this.setState({ typeRecipe: event.target.value });
  }
  render() {
    return (
      <div id="container">
        <div id="form-container">
          <h1>Enter a new recipe:</h1>
          <hr />

          <form onSubmit={this.createRecipe} className="new-recipe">
            <div id="url-form-container">
              <h3>Recipe's URL</h3>
              <input
                type="text"
                className={`url-recipe${this.state.errorUrl ? "-error" : ""}`}
                placeholder="http://best-recipe.com "
                onChange={this.updateUrl}
                value={this.state.url}
              />
              {this.state.errorUrl !== "" && (
                <p id="error-msg">{this.state.errorUrl}</p>
              )}
            </div>

            <div id="dish-radio-choices">
              <h3>Type of dish</h3>
              <div id="inputs">
                <div
                  id={`inputs-choices${this.state.errorType ? "-error" : ""}`}
                >
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
                {this.state.errorType !== "" && (
                  <div>
                    <p id="error-msg">{this.state.errorType}</p>
                  </div>
                )}
              </div>
            </div>
            <ButtonSubmit
              onClick={this.createRecipe}
              showLoading={this.state.addingRecipe}
              showSuccess={this.state.recipeAdded}
              message={this.state.message}
            />
          </form>
        </div>
      </div>
    );
  }
}
