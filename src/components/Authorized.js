import React, { Component } from 'react';
import Auth from './../modules/Auth';

export default class Authorized extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ''
    }

    console.log(Auth.getToken());

    fetch(
      'http://localhost:3001/authorized',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Auth.getToken()}`
        },
      })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({ data: result });
      })
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h3>This page needs authorization</h3>
        {this.state.data}
      </div>
    );
  }
}