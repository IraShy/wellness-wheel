import React from "react";

class WellnessWheel extends React.Component {

  state = {
    bigRad: 100,
    radiiArr: this.props.radiiArr.map((rad) => rad * 20),
    numberOfSlices: 8,
    colorArr: ['#f46464', "#fed6a8", "#53b89a", "#008080", "#38a9c7", "#445588", "#d43e8c", "#bd121b"],
  };

  drawCircle(bigRad) {
    let circles = [];
    for (let koef = 0.2; koef <= 1; koef += 0.2) {
      circles.unshift(Math.round(koef * bigRad));
    }
    return circles.map((radius, index) => {
      return (
        <circle cx="0" cy="0" r={radius} key={index} fill="#dee2e6" stroke="grey" />        
      )
    }
    );
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
    for(let i = 0; i < numberOfSlices; i++) {
      lines.push(cumulativePercent);
      cumulativePercent += 1 / numberOfSlices;
    }

    return lines.map((line) => {
      const [x1, y1] = this.getCoordinatesForPercent(line, bigRad);
      return (
        <line x1={x1} y1={y1} x2={0} y2={0} stroke="grey" key={line} />
      )
    })
  }

  addLabels() {
    const dimensions = ["financial", "emotional", "occupational", "physical", "intellectual", "social", "spiritual", "environmental"]
    return (
      <text x="20" y="35" transform="rotate(45)">text</text>
    )
  }

  slice() {
    let slices = [];
    const { radiiArr, numberOfSlices, colorArr } = this.state;
    console.log(radiiArr);
    for (let i = 0; i < numberOfSlices; i++) {
      slices.push({
        percent: 1 / numberOfSlices,
        color: colorArr[i],
        radius: radiiArr[i],
      });
    }

    let cumulativePercent = 0;

    // function getCoordinatesForPercent(percent, radius) {
    //   const x = radius * Math.cos(2 * Math.PI * percent);
    //   const y = radius * Math.sin(2 * Math.PI * percent);
    //   return [x, y];
    // }

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
          ${-bigRad - 5} ${-bigRad - 5} ${bigRad * 2 + 10} ${bigRad * 2 + 10}
        `}
        width={200}
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
