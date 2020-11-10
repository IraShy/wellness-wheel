import React from "react";

class CheckResults extends React.Component {
  render() {
    const results = this.props.results;
    if (results.every((num) => num < 4)) {
      return (
        <p id="general-feedback">
          It seems that you're struggling, your answers indicate potential
          health and well-being risks. Here are some tips how to improve your
          wellness dimensions:
        </p>
      );
    } else if (results.every((num) => num > 3)) {
      return <p id="general-feedback">Awesome, you're thriving! Well done!</p>;
    } else {
      return (
        <p id="general-feedback">
          Not bad, but there is room for improvement! Review the areas where you
          are struggling. Here are some tips how you can improve them:
        </p>
      );
    }
  }
}

export default CheckResults;
