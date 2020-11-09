export default function drawCircle(bigRad) {
  // const bigRad = this.props.bigRad;
  let circles = [];
  for (let koef = 0.2; koef < 1; koef += 0.2) {
    circles.unshift(Math.round(koef * bigRad));
  }
  return circles.map((radius, index) => {
    return <circle cx="0" cy="0" r={radius} key={index + radius} />;
  });
}
