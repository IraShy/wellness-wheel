import React from "react";
import "../stylesheets/WellnessWheel.scss";
import drawCircle from "../shared/drawCircle";
import getCoordinatesForPercent from "../shared/getCoordinatesForPercent";

const bigRad = 100;

class WellnessWheel extends React.Component {
  getOptions() {
    const results = this.props.results;
    return Object.keys(results);
  }

  getNumberOfSlices() {
    return this.getOptions().length;
  }

  drawLines() {
    let lines = [];
    const numberOfSlices = this.getNumberOfSlices();

    let cumulativePercent = 0;
    for (let i = 0; i < numberOfSlices; i++) {
      lines.push(cumulativePercent);
      cumulativePercent += 1 / numberOfSlices;
    }

    return lines.map((line) => {
      const [x1, y1] = getCoordinatesForPercent(line, bigRad);
      return <line x1={x1} y1={y1} x2={0} y2={0} key={line} />;
    });
  }

  addLabels() {
    const labels = this.getOptions();
    const labelPosition = [];
    const numberOfSlices = this.getNumberOfSlices();
    let cumulativePercent = 0.5 / numberOfSlices;

    for (let i = 0; i < labels.length; i++) {
      labelPosition.push(cumulativePercent);
      cumulativePercent += 1 / numberOfSlices;
    }

    return labelPosition.map((position, index) => {
      let [textX, textY] = getCoordinatesForPercent(position, bigRad);

      if (textX > 0) {
        textX += 0.1 * bigRad;
      } else {
        textX -= 0.7 * bigRad;
        if (labels[index].length > 8) {
          textX -= 10;
        }
      }

      if (bigRad - textY < 10 && position < 0.5) {
        textY += 10;
      }

      textY = bigRad - textY < 10 && position < 0.5 ? textY + 10 : textY;

      return (
        <text x={textX} y={textY} key={labels[index]}>
          {labels[index]}
        </text>
      );
    });
  }

  slice() {
    let slices = [];
    const results = this.props.results;
    const numberOfSlices = this.getNumberOfSlices();
    const radiiArr = Object.values(results).map((rad) => rad * 20);
    const options = this.getOptions();

    for (let i = 0; i < numberOfSlices; i++) {
      slices.push({
        percent: 1 / numberOfSlices,
        option: options[i],
        radius: radiiArr[i],
      });
    }

    let cumulativePercent = 0;

    return slices.map((slice) => {
      const [startX, startY] = getCoordinatesForPercent(
        cumulativePercent,
        slice.radius
      );
      cumulativePercent += slice.percent;
      const [endX, endY] = getCoordinatesForPercent(
        cumulativePercent,
        slice.radius
      );
      const largeArcFlag = slice.percent > 0.5 ? 1 : 0;
      const pathData = [
        `M ${startX} ${startY}`,
        `A ${slice.radius} ${slice.radius} 0  ${largeArcFlag} 1 ${endX} ${endY}`,
        "L 0 0",
      ].join(" ");
      return (
        <>
          <path d={pathData} className={slice.option} key={pathData} />
        </>
      );
    });
  }

  render() {
    window.scrollTo(0, 0);
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
        {this.slice()}
        {drawCircle(bigRad)}
        {this.drawLines()}
        {this.addLabels()}
      </svg>
    );
  }
}

export default WellnessWheel;
