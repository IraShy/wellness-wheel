import React from "react";
import "../stylesheets/WellnessWheel.scss";

class WellnessWheel extends React.Component {
  state = {
    bigRad: 100,
    radiiArr: this.props.radiiArr.map((rad) => rad * 20),
    numberOfSlices: this.props.radiiArr.length,
  };

  drawCircle(bigRad) {
    let circles = [];
    for (let koef = 0.2; koef < 1; koef += 0.2) {
      circles.unshift(Math.round(koef * bigRad));
    }
    return circles.map((radius, index) => {
      return (
        <circle
          cx="0"
          cy="0"
          r={radius}
          key={index + radius}
          // fill="transparent"
        />
      );
    });
  }

  getCoordinatesForPercent(percent, radius) {
    const x = radius * Math.cos(2 * Math.PI * percent);
    const y = radius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  }

  drawLines() {
    let lines = [];
    const { bigRad, numberOfSlices } = this.state;

    let cumulativePercent = 0;
    for (let i = 0; i < numberOfSlices; i++) {
      lines.push(cumulativePercent);
      cumulativePercent += 1 / numberOfSlices;
    }

    return lines.map((line) => {
      const [x1, y1] = this.getCoordinatesForPercent(line, bigRad);
      return <line x1={x1} y1={y1} x2={0} y2={0} key={line} />;
    });
  }

  options() {
    return [
      "financial",
      "emotional",
      "occupational",
      "physical",
      "intellectual",
      "social",
      "spiritual",
      "environmental",
    ];
  }

  addLabels() {
    const labels = this.options();
    const labelPosition = [];
    const { numberOfSlices, bigRad } = this.state;
    let cumulativePercent = 0.5 / numberOfSlices;

    for (let i = 0; i < labels.length; i++) {
      labelPosition.push(cumulativePercent);
      cumulativePercent += 1 / numberOfSlices;
    }

    return labelPosition.map((position, index) => {
      let [textX, textY] = this.getCoordinatesForPercent(position, bigRad);

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
        // if (labels[index].length > 8) {
        //   textX -= 10;
        // }
      }

      // textX = textX > 0 ? textX + 0.1 * bigRad : textX - 0.7 * bigRad;
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
    const options = this.options();
    const { radiiArr, numberOfSlices } = this.state;

    for (let i = 0; i < numberOfSlices; i++) {
      slices.push({
        percent: 1 / numberOfSlices,
        option: options[i],
        radius: radiiArr[i],
      });
    }

    let cumulativePercent = 0;

    return slices.map((slice) => {
      const [startX, startY] = this.getCoordinatesForPercent(
        cumulativePercent,
        slice.radius
      );
      cumulativePercent += slice.percent;
      const [endX, endY] = this.getCoordinatesForPercent(
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
    const { bigRad } = this.state;
    return (
      // <svg viewBox="-105 -105 210 210">
      <svg
        viewBox={`
          ${-bigRad - 100} ${-bigRad - 100} ${bigRad * 2 + 220} ${
          bigRad * 2 + 130
        }
        `}
        // preserveAspectRatio="xMidYMid meet"
        // width={400}
        width={window.screen.width > 500 ? 500 : `100%`}
      >
        <circle cx="0" cy="0" r={bigRad} id="big" />
        {this.slice()}
        {this.drawCircle(bigRad)}
        {this.drawLines()}
        {this.addLabels()}
      </svg>
    );
  }
}

export default WellnessWheel;
