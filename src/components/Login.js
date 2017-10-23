import React, { Component } from 'react';
import Auth from '../modules/Auth';

export default class LogIn extends Component {


  login() {
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }

    fetch(
      'http://localhost:3001/login',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    )
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          Auth.authenticateUser(result.token);
        }
      })
  }

  render() {
    return (
      <div>
        <input id="email" type="email" placeholder="E-Mail" />
        <input id="password" type="password" placeholder="Password" />
        <button onClick={this.login}>Sign Up</button>
      </div>
    );
  }
}