import React from 'react';
import ReactDOM from 'react-dom';

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
      <NavItem eventKey={1} href="/Thermostat" >Currents</NavItem>
      <NavItem eventKey={2} href="/stats">Stats</NavItem>
      <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Schedule</MenuItem>
        <MenuItem eventKey={3.2}>Debug</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>About</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Navbar>
};

class NavigationComp extends React.Component {

  render() {
    return (
      <div>
        <NavbarInstance />
      </div>
    );
  }

}

export default NavigationComp;