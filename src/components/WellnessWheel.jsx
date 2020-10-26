import React from "react";

class WellnessWheel extends React.Component {

  state = {
    bigRad: 100,
    radiiArr: this.props.radiiArr.map((rad) => rad * 20),
    numberOfSlices: 8,
    colorArr: ["red", "orange", "yellow", "green", "white", "blue", "crimson", "violet"],
  };

  drawCircle() {
    const { bigRad } = this.state;
    return (
      <>
        <circle cx="0" cy="0" r={bigRad} fill="lightgrey" stroke="grey" />
        <circle
          cx="0"
          cy="0"
          r={0.8 * bigRad}
          fill="transparent"
          stroke="grey"
        />
        <circle
          cx="0"
          cy="0"
          r={0.6 * bigRad}
          fill="transparent"
          stroke="grey"
        />
        <circle
          cx="0"
          cy="0"
          r={0.4 * bigRad}
          fill="transparent"
          stroke="grey"
        />
        <circle
          cx="0"
          cy="0"
          r={0.2 * bigRad}
          fill="transparent"
          stroke="grey"
        />

        <line x1="-100" y1="0" x2="100" y2="0" stroke="grey" />
      </>
    );
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

    function getCoordinatesForPercent(percent, radius) {
      const x = radius * Math.cos(2 * Math.PI * percent);
      const y = radius * Math.sin(2 * Math.PI * percent);
      return [x, y];
    }

    let arr = [];
    arr = slices.map((slice) => {
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
        `M ${startX} ${startY}`, // Move
        `A ${slice.radius} ${slice.radius} 0  ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        "L 0 0", // Line
      ].join(" ");
      return <path d={pathData} fill={slice.color} key={pathData} />;
    });
    return arr;
  }

  render() {
    const { bigRad } = this.state;
    return (
      // <svg viewBox="-105 -105 210 210">
      <svg
        viewBox={`
          ${-bigRad - 5} ${-bigRad - 5} ${bigRad * 2 + 10} ${bigRad * 2 + 10}
        `}
        width={200}
      >
        {this.drawCircle()}
        {this.slice()}
      </svg>
    );
  }
}

export default WellnessWheel;
