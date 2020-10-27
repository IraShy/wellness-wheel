import React from "react";

class WellnessWheel extends React.Component {

  state = {
    bigRad: 100,
    radiiArr: this.props.radiiArr.map((rad) => rad * 20),
    numberOfSlices: 8,
    colorArr: ["red", "orange", "yellow", "green", "white", "blue", "crimson", "violet"],
  };

  drawCircle(bigRad) {
    let circles = [];
    for (let koef = 0.2; koef <= 1; koef += 0.2) {
      circles.unshift(Math.round(koef * bigRad));
    }
    return circles.map((radius, index) => {
      return (
        <circle cx="0" cy="0" r={radius} key={index} fill="lightgrey" stroke="grey" />        
      )
    }
    );
  }

  slice() {
    let slices = [];
    const { radiiArr, numberOfSlices, colorArr, bigRad } = this.state;
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

    return slices.map((slice) => {
      let radKoef = 1 / slice.radius * bigRad;
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
      return (
        <>
          <path d={pathData} fill={slice.color} key={pathData} />
          <line x1={endX * radKoef} y1={endY * radKoef} x2={-endX * radKoef} y2={-endY * radKoef} stroke="grey" key={endX + endY} />
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
          ${-bigRad - 5} ${-bigRad - 5} ${bigRad * 2 + 10} ${bigRad * 2 + 10}
        `}
        width={200}
      >
        {this.drawCircle(bigRad)}
        {this.slice()}
      </svg>
    );
  }
}

export default WellnessWheel;
