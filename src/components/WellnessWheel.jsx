import React from "react";

class WellnessWheel extends React.Component {
  state = {
    bigRad: 100,
    radiiArr: this.props.radiiArr.map((rad) => rad * 20),
    numberOfSlices: this.props.radiiArr.length,
    colorArr: [
      "#f46464",
      "#fed6a8",
      "#53b89a",
      "#008080",
      "#38a9c7",
      "#445588",
      "#d43e8c",
      "#bd121b",
    ],
  };

  drawCircle(bigRad) {
    let circles = [];
    for (let koef = 0.2; koef <= 1; koef += 0.2) {
      circles.unshift(Math.round(koef * bigRad));
    }
    return circles.map((radius, index) => {
      return (
        <circle
          cx="0"
          cy="0"
          r={radius}
          key={index}
          fill="#dee2e6"
          stroke="grey"
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
      return <line x1={x1} y1={y1} x2={0} y2={0} stroke="grey" key={line} />;
    });
  }

  addLabels() {
    const labels = [
      "financial",
      "emotional",
      "occupational",
      "physical",
      "intellectual",
      "social",
      "spiritual",
      "environmental",
    ];
    const labelPosition = [];
    const { numberOfSlices, bigRad } = this.state;
    let cumulativePercent = 0.5 / numberOfSlices;

    for (let i = 0; i < labels.length; i++) {
      labelPosition.push(cumulativePercent);
      cumulativePercent += 1 / numberOfSlices;
    }

    return labelPosition.map((position, index) => {
      console.log(position);
      let [textX, textY] = this.getCoordinatesForPercent(position, bigRad);

      if (textX > 0) {
        textX += 0.1 * bigRad
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
      console.log([textX, textY]);

      return (
        <text x={textX} y={textY} key={labels[index]}>
          {labels[index]}
        </text>
      );
    });
  }

  slice() {
    let slices = [];
    const { radiiArr, numberOfSlices, colorArr } = this.state;

    for (let i = 0; i < numberOfSlices; i++) {
      slices.push({
        percent: 1 / numberOfSlices,
        color: colorArr[i],
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
        `M ${startX} ${startY}`, // Move
        `A ${slice.radius} ${slice.radius} 0  ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        "L 0 0", // Line
      ].join(" ");
      return (
        <>
          <path d={pathData} fill={slice.color} key={pathData} />
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
          ${-bigRad - 100} ${-bigRad - 100} ${bigRad * 2 + 200} ${
          bigRad * 2 + 200
        }
        `}
        width={400}
      >
        {this.drawCircle(bigRad)}
        {this.slice()}
        {this.drawLines()}
        {this.addLabels()}
      </svg>
    );
  }
}

export default WellnessWheel;
