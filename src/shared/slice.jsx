import getCoordinatesForPercent from "./getCoordinatesForPercent";

export default function slice(results) {
  let slices = [];
  const radiiArr = Object.values(results).map((rad) => rad * 20);
  const numberOfSlices = radiiArr.length;
  const options = Object.keys(results);

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
