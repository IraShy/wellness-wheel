import React from "react";
import { improve } from "./Texts.js";

class Feedback extends React.Component {
  checkResults() {
    const results = Object.values(this.props.results);
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
  renderList(phrase) {
    const list = phrase.split(". ");
    return list.map((sentence) => {
      return <li key={sentence}>{sentence}</li>;
    });
  }
  renderImprove() {
    const results = Object.entries(this.props.results)
      .filter((pair) => pair[1] < 4)
      .map((el) => el[0]);
    const improvements = improve[0];
    return results.map((result) => {
      return (
        <div
          className={["tips", result].join(" ")}
          key={[`result`, result].join("")}
        >
          <p className="option-name">{result.toUpperCase()}:</p>
          <ul>{this.renderList(improvements[result])}</ul>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="feedback">
        {this.checkResults()}
        {this.renderImprove()}
      </div>
    );
  }
}

export default Feedback;
