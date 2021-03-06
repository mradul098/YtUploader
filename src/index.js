import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./components/App";
import Success from "./components/Success";
// import "./style.css";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/success" component={Success} />
    </Switch>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Routes />, rootElement);
