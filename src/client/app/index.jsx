import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';

// import {Router,Route,IndexRoute,browserHistory,hashHistory} from 'react-router';

// import { createMemoryHistory  } from 'history';

// const history = createMemoryHistory('/');

import NavigationComp from  './NavigationComp.jsx'
import ThermoComponent from './ThermoComponent.jsx';
import StatsComponent from  './Stats.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { currPage: 'main' };
  }

  setPageCBK(selectedPage){
        this.setState({ currPage: selectedPage });
  }

  loadSelectedPage(){
    if(this.state.currPage == 'main'){
      return <ThermoComponent />
    }
    else if(this.state.currPage == 'stats'){
      return <StatsComponent />
    }
  }

  render() {
    const page = this.loadSelectedPage();
    return (
      <div>
      <NavigationComp setPage={this.setPageCBK.bind(this)} />
        {page}
      </div>
      );
  }
}

// render((
// <Router history={hashHistory}>
//     <App>
//         <Route path="/" component={App} />
//         <IndexRoute component={ThermoComponent} />
//         <Route path="/stats" component={StatsComponent} />
//    </App>
// </Router>
// ), document.getElementById('root'))

render(<App/>, document.getElementById('app'));

