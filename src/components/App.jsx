import React from "react";
import WellnessWheel from "./WellnessWheel";
// import "../style.css";

export default function App() {
  return (
    <div>
      {/*<CanvasShape width={300} height={300} /> */}
      <WellnessWheel radiiArr={[4, 2, 3, 5, 1, 4, 3, 1]} />
    </div>
  );
}
