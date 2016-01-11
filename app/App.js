import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import auth from './auth';

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./styles/style.sass');

export default class App extends Component {
  logout = () => {
    auth.logout(() => {
      this.props.history.push('/');
    });
  }
  render() {
    var navLinks = [];
    if (auth.loggedIn()) {
      navLinks.push(<li><Link to="programs">Programs</Link></li>);
      navLinks.push(
        <NavDropdown eventKey={3} title={auth.getUserEmail()}>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </NavDropdown>
      );
    } else {
      navLinks.push(<li><Link to="login">Login</Link></li>);
      navLinks.push(<li><Link to="register">Register</Link></li>);
    }
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
              {navLinks}
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
