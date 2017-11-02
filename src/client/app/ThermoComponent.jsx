import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import PageHeader from 'react-bootstrap/lib/PageHeader';


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

class ThermoComponent extends React.Component {

  constructor(props) {
    super(props);

    socket.emit('getTemps', { });

    socket.on('temps', (data) => {
      if(data) {
          this.updateTempsFromSockets(data);
      } else {
          console.log('There is a problem getting temps');
      }
  
    });

    this.state = {
      currentTemps : {
        tempDani : 0,
        tempAnnaLeo : 0,
        tempSala : 0,
        tempExt : 0,
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
        <TempDisplay temp={this.state.currentTemps} />
      </div>
    );
  }

}

export default ThermoComponent;