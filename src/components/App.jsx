import React from "react";
import { Route, Switch } from "react-router-dom";
// import WellnessWheel from "./WellnessWheel";
import GetData from "./GetData";
import "../stylesheets/App.scss";

export default function App() {

  return (
    <div>
      <Switch>
        <Route exact path="/" component={GetData} />
        {/* this works but not the best practice: */}
        {/* <Route exact path='/wheel' component={() => <WellnessWheel radiiArr={[4, 2, 3, 5, 1, 4, 3, 1]} />} /> */}{" "}
        {/* <Route
          exact
          path="/wheel"
          render={(props) => (
            <WellnessWheel {...props} radiiArr={[1, 2, 3, 5, 1, 4, 3, 1]} />
          )}
        /> */}
        <Route exact path="/data" component={GetData} />
      </Switch>
    </div>
  );
}
