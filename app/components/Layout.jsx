import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './Home';
import Header from './Header';
import Project from './Project';
import NoMatch from './NoMatch';
import UserDetails from './UserDetails';

export default class Layout extends Component {

  render() {
    return (
      <Router>
        <div className="layout">
          <Header />

          <Route exact path="/" component={Home} />
          <Route exact path="/:user_name" component={UserDetails} />
          <Route exact path="/:user_name/:project_name" component={Project} />
          <Route exact component={NoMatch} />
        </div>
      </Router>
    );
  }
}
