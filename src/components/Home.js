import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super()

    this.state = {
      data: ''
    }

    fetch('http://localhost:3001/no-auth')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        console.log(result);
        this.setState({data: result.message });
      })

  }

  render() {
    return (
      <div>
        Data: {this.state.data}
      </div>
    )
  }
}