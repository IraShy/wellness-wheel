import getCoordinatesForPercent from "./getCoordinatesForPercent";

export default function drawLines(numberOfSlices, bigRad) {
  let lines = [];
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
