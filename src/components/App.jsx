import React from "react";
import WellnessWheel from "./WellnessWheel";
import { Route, Switch } from "react-router-dom";
// import "../style.css";

export default function App() {
  return (
    <div>
      <Switch>
        {/* this works but not the best practice: */}
        {/* <Route exact path='/wheel' component={() => <WellnessWheel radiiArr={[4, 2, 3, 5, 1, 4, 3, 1]} />} /> */}{" "}
        <Route
          exact
          path="/wheel"
          render={(props) => (
            <WellnessWheel {...props} radiiArr={[4, 2, 3, 5, 1, 4, 3, 1]} />
          )}
        />
      </Switch>
    </div>
  );
}
