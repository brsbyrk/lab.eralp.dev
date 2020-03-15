/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import OtherPage from "./pages/other-page";

const App: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route path="/other">
        <OtherPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
);

export default App;
