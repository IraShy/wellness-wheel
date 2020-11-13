import React from "react";
import "../stylesheets/WellnessWheel.scss";
import drawCircle from "./drawCircle";
import drawLines from "./drawLines";
import addLabels from "./addLabels";
import slice from "./slice";
import scrollToTop from "./scrollToTop";

const bigRad = 100;

class WellnessWheel extends React.Component {
  render() {
    const results = this.props.results;
    const options = Object.keys(results);
    const numberOfSlices = options.length;

    scrollToTop();
    return (
      <svg
        viewBox={`
          ${-bigRad - 100} ${-bigRad - 100} ${bigRad * 2 + 220} ${
          bigRad * 2 + 130
        }
        `}
        width={window.screen.width > 500 ? 500 : `100%`}
      >
        <circle cx="0" cy="0" r={bigRad} id="big" />
        {slice(results)}
        {drawCircle(bigRad)}
        {drawLines(numberOfSlices, bigRad)}
        {addLabels(options, bigRad)}
      </svg>
    );
  }
}

export default WellnessWheel;
