import React, { Component } from "react";

export default class GridImage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      images: [],
      error: false,
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_GET_ALL)
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        this.setState({
          images: result
            .map((recipe) => {
              return recipe.image_url;
            })
            .filter((url) => {
              return url !== undefined;
            }),
        });
      })
      .catch((error) => {
        console.log("Error occured", error);
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    console.log(this.state);

    if (this.state.loading === true) {
      return (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      );
    } else if (this.state.error === true) {
      return (
        <div className="error-container">
          <p>An error occured while calling the API.</p>
        </div>
      );
    } else if (this.state.images.length === 0) {
      return <>Empty</>;
    } else {
      const imgTiles = this.state.images.map((url) => {
        return <img src={url} key={url} alt=""></img>;
      });
      return <div className="recipe-pic-grid">{imgTiles}</div>;
    }
  }
}
