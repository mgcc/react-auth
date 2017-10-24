import React, { Component } from 'react';
import Header from '../components/layout/Header';

export default class MainLayout extends Component {

  render() {

    return (
      <div>
        <Header />

        <div id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
