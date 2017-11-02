import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

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

function StatDisplay(props){
  return <div>
    <Panel header="Average External">
      <h1>{props.temp.avgExt}°C</h1>
    </Panel>
    <Panel header="Minimum External">
      <h1>{props.temp.minExt}°C</h1>
    </Panel>
    <Panel header="Maximum External">
      <h1>{props.temp.maxExt}°C</h1>
    </Panel>
  </div>
}

class StatsComponent extends React.Component {
    constructor(props) {
        super(props);

        socket.on('statsReceived', (data) => {
            if(data) {
                this.updateDataFromSockets(data);
            } else {
                console.log('There is a problem getting temps');
            }
             
        });

        this.state = {
            stats : {
                avgExt : 15,
                minExt : 15,
                maxExt : 15
            }    
        };

        socket.emit('getStats', { });    
    };

    updateDataFromSockets(data) {

        var tempStats = {};
        tempStats.avgExt = data[3].avgExt;
        tempStats.minExt = data[3].minExt;
        tempStats.maxExt = data[3].maxExt;

        this.setState({stats: tempStats})
    }  

    render() {
        return (
            <div>
                <StatDisplay temp={this.state.stats} />
            </div>
        );
    }

}

export default StatsComponent;