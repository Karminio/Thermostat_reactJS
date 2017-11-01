import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';

import ThermoComponent from './ThermoComponent.jsx';
import setTempButton from './ThermoComponent.jsx';


class App extends React.Component {
  render() {
    return (
        <div>
          <ThermoComponent />
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

