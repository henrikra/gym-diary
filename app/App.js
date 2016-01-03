import React, { Component } from 'react';

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <nav>
          <div className="container">navigation</div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
        <footer>
          <div className="container">Copyright Henrik</div>
        </footer>
      </div>
    );
  }
}
