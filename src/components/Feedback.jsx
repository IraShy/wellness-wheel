import React from "react";
import { improve } from "./Texts.js";

class Feedback extends React.Component {
  checkResults() {
    const results = Object.values(this.props.results);
    if (results.every((num) => num < 4)) {
      return (
        <p>
          It seems that you're struggling, your answers indicate some potential
          health and well-being risks. Here are some tips how you can improve
          wellness areas:
        </p>
      );
    } else if (results.every((num) => num > 3)) {
      return <p>Awesome, you're thriving! Well done!</p>;
    } else {
      return (
        <p>
          Not bad, but there is room for improvement! Review the areas where you
          are struggling. Here are some tips how you can improve them:
        </p>
      );
    }
  }
  renderList(phrase) {
    const list = phrase.split(". ");
    console.log(list);
    console.log(phrase);
    return list.map((sentence) => {
      console.log(sentence);
      return <li key={sentence}>{sentence}</li>;
    });
  }
  renderImprove() {
    const results = Object.entries(this.props.results)
      .filter((pair) => pair[1] < 4)
      .map((el) => el[0]);
    const improvements = improve[0];
    console.log(improvements);
    return results.map((result) => {
      return (
        <div key={[`result`, result].join("")}>
          <p>{result.toUpperCase()}:</p>
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
