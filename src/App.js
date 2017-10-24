import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Authorized from './components/Authorized';
import Home from './components/Home';

import MainLayout from './containers/MainLayout';

export default class App extends Component {

  render() {
    return (
      <MainLayout>
        <Router>
          <div>
            <Route path="/" exact={true} component={Home} />
            <Route path="/admin" exact={true} component={Authorized} />
          </div>
        </Router>
      </MainLayout>
    );
  }
}
