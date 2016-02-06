import React, { Component } from 'react';
import { Navbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import auth from '../auth';

export default class Navigation extends Component {
	state = {
    menuOpen: false
  };
  logout = () => {
    auth.logout(() => {
      this.props.history.push('/');
    });
  }
  closeMenu = () => {
    this.setState({menuOpen: false});
  }
  handleToggle = () => {
    this.setState({menuOpen: !this.state.menuOpen});
  }
	render() {
    const loggedInLinks = [
      <li><Link to="programs" onClick={this.closeMenu}>Programs</Link></li>,
      <NavDropdown eventKey={3} title={auth.getUserEmail()} id="user-dropdown">
        <MenuItem onClick={this.logout}>Logout</MenuItem>
      </NavDropdown>
    ];
    const notLoggedInLinks = [
      <li><Link to="login" onClick={this.closeMenu}>Login</Link></li>,
      <li><Link to="register" onClick={this.closeMenu}>Register</Link></li>
    ];
    const navLinks = auth.loggedIn() ? loggedInLinks : notLoggedInLinks;
		return (
			<Navbar staticTop expanded={this.state.menuOpen} onToggle={this.handleToggle}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" onClick={this.closeMenu}>Gym Diary</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {navLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
		);
	}
}