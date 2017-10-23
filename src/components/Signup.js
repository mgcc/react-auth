import React, { Component } from 'react';

export default class SignUp extends Component {

  constructor(props) {
    super(props);

    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      name: document.getElementById('name').value
    }

    fetch(
      'http://localhost:3001/signup',
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

      })

  }

  render() {
    return (
      <div>
        <input id="email" type="email" placeholder="E-Mail" />
        <input id="password" type="password" placeholder="Password" />
        <input id="name" type="text" placeholder="Name" />
        <button onClick={this.signUp}>Sign Up</button>
      </div>
    );
  }
}