import React, { Component } from 'react';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./styles/style.sass');

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Gym Diary</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <li><Link to="login">Login</Link></li>
              <li><Link to="register">Register</Link></li>
              <li><Link to="programs">Programs</Link></li>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.children}
        <footer className="footer">
          <div className="container">Copyright Henrik</div>
        </footer>
      </div>
    );
  }
}
