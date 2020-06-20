import React, { useContext, useState } from "react";
import TypeRecipeInput from "./TypeRecipeInput";
import ButtonSubmit from "../Misc/ButtonSubmit";
import { getPostVar } from "../../utils";
import { ApiContext } from "../Context/ApiContext";

const apiUrlCreateRecipe = process.env.REACT_APP_CREATE_NEW;

const FormRecipe = () => {
  const [url, setUrl] = useState("");
  const [typeRecipe, setTypeRecipe] = useState("");
  const [loading, setLoading] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [errorUrl, setErrorUrl] = useState("");
  const [errorType, setErrorType] = useState("");
  const [message, setMessage] = useState("");
  const savedData = useContext(ApiContext);

  function validateForm() {
    setErrorType("");
    setErrorUrl("");
    let isOK = true;
    if (typeRecipe === "") {
      setErrorType("Please select a type of recipe");
      isOK = false;
    }
    if (url.length < 8) {
      setErrorUrl("Please enter the url to the recipe");
      isOK = false;
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setErrorUrl("Url is not properly formatted.");
      isOK = false;
    }
    return isOK;
  }

  function createRecipe(event) {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      fetch(
        apiUrlCreateRecipe,
        getPostVar({ url: url, typeRecipe: typeRecipe })
      )
        .then((response) => {
          if (response.ok) {
            setSuccess(true);
            setMessage("Recipe added !");
            savedData.shouldUpdate = true;
            // restores the initials values of fields:
            setUrl("");
            setTypeRecipe("");
          } else {
            setSuccess(false);
            setMessage("API error");
            console.log(response);
          }
          return response.json();
        })
        .then((response) => {
          if (response.message) {
            setMessage(response.message);
          }
        })
        .catch((e) => {
          console.log(e);
          setSuccess(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }
  const handleRadioChange = (e) => setTypeRecipe(e.target.value);
  return (
    <div id="container">
      <div id="form-container">
        <h1>Enter a new recipe:</h1>
        <hr />

        <form onSubmit={createRecipe} className="new-recipe">
          <div id="url-form-container">
            <h3>Recipe's URL</h3>
            <input
              type="text"
              className={`url-recipe${errorUrl ? "-error" : ""}`}
              placeholder="http://best-recipe.com"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
            />
            {errorUrl !== "" && <p id="error-msg">{errorUrl}</p>}
          </div>

          <div id="dish-radio-choices">
            <h3>Type of dish</h3>
            <div id="inputs">
              <div id={`inputs-choices${errorType ? "-error" : ""}`}>
                <TypeRecipeInput
                  value="starter"
                  onChange={handleRadioChange}
                  checked={typeRecipe === "starter"}
                >
                  <span role="img" aria-label="salad">
                    🥗
                  </span>
                  Starter
                </TypeRecipeInput>
                <TypeRecipeInput
                  value="main"
                  onChange={handleRadioChange}
                  checked={typeRecipe === "main"}
                >
                  <span role="img" aria-label="spaghetti">
                    🍝
                  </span>
                  Main
                </TypeRecipeInput>
                <TypeRecipeInput
                  onChange={handleRadioChange}
                  checked={typeRecipe === "dessert"}
                  value="dessert"
                >
                  <span role="img" aria-label="strawberry pudding">
                    🍰
                  </span>
                  Dessert
                </TypeRecipeInput>
              </div>
              {errorType !== "" && (
                <div>
                  <p id="error-msg">{errorType}</p>
                </div>
              )}
            </div>
          </div>
          <ButtonSubmit
            onClick={createRecipe}
            showLoading={loading}
            showSuccess={success}
            message={message}
          />
        </form>
      </div>
    </div>
  );
};

export default FormRecipe;
