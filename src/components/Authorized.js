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
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${Auth.getToken()}`
        }
      })
      .then(response => {
        console.log(response);
        return response.json()
      })
      .then(result => {
        console.log(result);
        this.setState({ data: result.data });
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