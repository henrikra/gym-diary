import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./styles/style.sass');

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Gym Diary</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Login</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
