import React, { Component } from 'react';

export default class Cookies extends Component {

  constructor() {
    super();

    this.state = {
      data: ''
    }

    fetch('http://localhost:3001/cookies')
      .then(response => response.text())
      .then(result => {
        console.log(`Result: ${result}`);
        this.setState({ data: result });
      })
  }

  render() {
    return (
      <div>
        {this.state.data}
      </div>
    );

  }
}