import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

class App extends Component {
  constructor(props) {
    super(props);
    this.routes = [{ path: "/", Component: Home }];
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Container className="container">
              {this.routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                    <div className="page">
                      <Component />
                    </div>
                  )}
                </Route>
              ))}
            </Container>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
