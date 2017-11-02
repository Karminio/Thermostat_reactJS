import React from 'react';
import ReactDOM from 'react-dom';

// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'

// import LinkContainer from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

function NavbarInstance(props) {
  return <Navbar inverse fluid fixedTop collapseOnSelect>
        <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Thermostat</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} onClick={() => this.setState({currPage: 'main'})}>Currents</NavItem>  
        <NavItem eventKey={2} onClick={() => this.setState({currPage: 'stats'})}>Stats</NavItem>
        <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick={() => this.setState({currPage: 'schedule'})}>Schedule</MenuItem>
          <MenuItem eventKey={3.2} onClick={() => this.setState({currPage: 'debug'})}>Debug</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3} onClick={() => this.setState({currPage: 'about'})}>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
};

class NavigationComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 'main',
    };
  }

  handleClick(page) {
    this.props.setPage(page);
  }

  render() {
    return (
      <div>
        <Navbar inverse fluid fixedTop collapseOnSelect>
        <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Thermostat</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} onClick={() => this.handleClick('main')}>Currents</NavItem>  
        <NavItem eventKey={2} onClick={() => this.handleClick('stats')}>Stats</NavItem>
        <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick={() => this.setState({currPage: 'schedule'})}>Schedule</MenuItem>
          <MenuItem eventKey={3.2} onClick={() => this.setState({currPage: 'debug'})}>Debug</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3} onClick={() => this.setState({currPage: 'about'})}>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
      </div>
    );
  }

}

export default NavigationComp;