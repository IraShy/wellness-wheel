import React from "react";
import { improve } from "../shared/Texts.js";

class RenderTips extends React.Component {
  renderList(phrase) {
    const list = phrase.split(". ");
    return list.map((sentence) => {
      return <li key={sentence}>{sentence}</li>;
    });
  }
  renderImprove() {
    const results = this.props.results
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
    return this.renderImprove();
  }
}
export default RenderTips;
