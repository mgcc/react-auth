import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/Signup';
import Authorized from './components/Authorized';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div>
        <a href="/login">Log In</a>&nbsp;
        <a href="/signup">Sign Up</a>
        <Router>
          <div>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/authorized" component={Authorized} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
