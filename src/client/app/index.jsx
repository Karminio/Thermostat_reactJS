import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';

import NavigationComp from  './NavigationComp.jsx'
import ThermoComponent from './ThermoComponent.jsx';
import setTempButton from './ThermoComponent.jsx';
import StatsComponent from  './stats.jsx';


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

function PageSelector(props){
    if(props.page == 'currTemps'){
    return <div>
                <NavigationComp />
                <ThermoComponent />
            </div>
        }
    else if(props.page == 'stats'){
    return <div>
                <NavigationComp />
                <StatsComponent />
            </div>
        }
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currPage: 'stats' };
    }

    render() {
    return (
            <div>
                <PageSelector page={this.state.currPage} />
            </div>
    );
    }
}

render(<App/>, document.getElementById('app'));

