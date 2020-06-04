import React, { PureComponent } from "react";

export default class ButtonSubmit extends PureComponent {
  render() {
    let message, idButton;
    if (this.props.showLoading === undefined) {
      message = "Save recipe !";
    } else if (this.props.showLoading === true) {
      message = (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      );
    } else {
      if (this.props.showSuccess) {
        idButton = "success-button";
        message = this.props.message ? this.props.message : "Success!";
      } else {
        idButton = "error-button";
        message = this.props.message ? this.props.message : "API Error";
      }
    }

    return (
      <button onClick={this.props.onClick} id={idButton}>
        {message}
      </button>
    );

    // if (loading === undefined) {
    //   return <Button>"Save Recipe"</Button>;
    // } else if (loading === true) {
    //   return <Button>"Loading..."</Button>;
    // } else {
    //   if (success === false) {
    //     return <Button>"Error with API"</Button>;
    //   } else {
    //     return <Button>"Recipe Added !"</Button>;
    //   }
    // }
  }
}
