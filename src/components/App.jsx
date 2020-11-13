import React from "react";
import { Route, Switch } from "react-router-dom";
import GetData from "./GetData";
import "../stylesheets/App.scss";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={GetData} />
        <Route exact path="/data" component={GetData} />
      </Switch>
    </div>
  );
}
