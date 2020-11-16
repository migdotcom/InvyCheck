import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CapturePage from "./components/CapturePage";
import NavigationBar from "./components/NavigationBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.routes = [
      { path: "/", Component: Home }
    ];
  }

  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path = "/" component = {NavigationBar}/>
            <Route exact path = "/capture" component = {CapturePage}/>
        </div>
      </Router>
      
    );
  }
}

export default App;
