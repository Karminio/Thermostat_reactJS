import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';


const io = require('socket.io-client')  
var socket = getSocket();

function getSocket(){
  var s;
  if(pingLocalServer()){
      s = io.connect('http://192.168.0.110:8000');
  }
  else{
      s = io.connect('http://karminio.ddns.net:7000');
  }

  return s;
}

function pingLocalServer(){
    var serverip = "192.168.0.110:8000"

    if (serverip != "") {
        var ImageObject = new Image();
        ImageObject.src = "http://" + serverip + "/ping.bmp"; 

        if (ImageObject.height > 0)
        {
            return true;
        } 
        else {
            return false;
        }
    }
}

let sels = [];
const idGenerator = (index) => {
  return 'rTemp'+index;
}

class TempSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {rangeValue : 0};
    this.rangeMoved = this.rangeMoved.bind(this);
  }

  rangeMoved() {
      this.setState(prevState => ({
        rangeValue: (prevState.rangeValue) + 1
      }));
      console.log(this.state.rangeValue);
  }

  render(){
    sels = [];
    for(let i=0; i<24; i++){
      sels.push(<input type='range' key={idGenerator(i)} value='8' min='8' max='22' onChange={this.rangeMoved}></input>)    
    };
    return(
      <div>
        Moves: <span>{this.state.rangeValue}</span> 
        {sels}
      </div>
    )
  }
};

class SetTempButton extends React.Component {

  render() {
    return (
        <button>Set</button>
    );
  }

};

function TempDisplay(props){
  return <div>
  <PageHeader>Thermostat <small>Current temperatures</small></PageHeader>
    <Panel header="Living Room">
      <h1>{props.temp.tempSala}°C</h1>
    </Panel>
    <Panel header="Dani Room">
      <h1>{props.temp.tempDani}°C</h1>
    </Panel>
    <Panel header="Anna & Leo Room">
      <h1>{props.temp.tempAnnaLeo}°C</h1>
    </Panel>
    <Panel header="External">
      <h1>{props.temp.tempExt}°C</h1>
    </Panel>
  </div>
}


function NavbarInstance(props) {
  return <Navbar inverse fluid fixedTop collapseOnSelect>
      <Navbar.Header>
    <Navbar.Brand>
      <a href="#">React-Bootstrap</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="#">Link</NavItem>
      <NavItem eventKey={2} href="#">Link</NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Navbar>
};

class ThermoComponent extends React.Component {

  constructor(props) {
    super(props);

    socket.emit('getTemps', { });

    socket.on('temps', (data) => {
      if(data) {
          var html = '';

          html += 'Esterna: ' + data.tempExt + '°C ' + data.trendExt + '<br />';
          html += 'Dani: ' + data.tempDani + '°C ' + data.trendDani + '<br />';
          html += 'Anna & Leo: ' + data.tempAnnaLeo + '°C ' + data.trendAnnaLeo + '<br />';
          html += 'Sala: ' + data.tempSala + '°C ' + data.trendSala + '<br />';
          /*html += 'Minima int.: ' + data.min + '°C<br />';
          html += 'Massima int.: ' + data.max + '°C<br />';
          html += 'Minima ext: ' + data.minExt + '°C<br />';
          html += 'Massima est.: ' + data.maxExt + '°C<br />';*/
          html += 'U. accensione: ' + data.lastHeatingOn + '<br />';
          if(data.heating){
              html += '<b>Heating ON</b>';
          }
          if(data.manualRun){
              html += '<b>Manual run ON</b>';
          }
          if(data.paused){
              html += '<b>Paused</b>';
          }
          if(data.testMode){
              html += '<b>+++TEST+++</b>';
          }
          console.log(html);
          console.log('Temps received at ' + (new Date()).toLocaleTimeString());
      } else {
          console.log('There is a problem getting temps');
      }

      this.updateTempsFromSockets(data);
    });

    this.state = {
      currentTemps : {
        tempDani : 19.2,
        tempAnnaLeo : 21.4,
        tempSala : 11.8,
        tempExt : 12.7,
      },
      targetTemps: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      zones: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  };

  updateTempsFromSockets(data) {
    this.setState({currentTemps: data })
  }  

  render() {
    return (
      <div>
        <NavbarInstance />
        <TempDisplay temp={this.state.currentTemps} />
      </div>
    );
  }

}

export default ThermoComponent;