import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import SearchBar from "./components/SearchBar";
class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="main-container">
          <Route exact path="/" component={LandingPage} />
          <SearchBar />
          <Route path="/:user" component={Profile} />
        </div>
      </div>
    );
  }
}

export default App;
