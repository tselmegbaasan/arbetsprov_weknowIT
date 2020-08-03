import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import ResultPopulation from "./components/ResultPopulation";
import ResultCountry from "./components/ResultCountry";
import SearchByCity from "./components/SearchByCity";
import SearchByCountry from "./components/SearchByCountry";
import Menu from "./components/Menu";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="header">
            Citypop
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Menu} />
              <Route path="/searchbycity/result/:cityName" component={ResultPopulation} />
              <Route path="/searchbycountry/result/:countryName" component={ResultCountry} />
              <Route exact path="/searchbycity" component={SearchByCity} />
              <Route exact path="/searchbycountry" component={SearchByCountry} />
            </Switch>
          </div>
        </div>
      </Router >
    )
  }
}
export default App;
