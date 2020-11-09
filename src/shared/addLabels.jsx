import getCoordinatesForPercent from "./getCoordinatesForPercent";

export default function addLabels(labels, numberOfSlices, bigRad) {
  // const labels = this.getOptions();
  const labelPosition = [];
  // const numberOfSlices = this.getNumberOfSlices();
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
