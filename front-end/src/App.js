import React, { Component } from 'react';
import './Styles/App.scss';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Component/Navbar';
import AsiansnackList from'./Component/AsiansnackList';
import AsiansnackDetail from'./Component/AsiansnackDetail';
import NAsnackList from'./Component/NAsanckList';
import NAsnackDetail from'./Component/NAsnackDetail';
import SAsnackList from'./Component/SAsnackList';
import SAsnackDetail from'./Component/SAsnackDetail';
import AfricasnackList from'./Component/AfricansnackList';
import AfricasnackDetail from'./Component/AfricansnackDetail';
import EuropesnackList from'./Component/EuropeansnackList';
import EuropesnackDetail from'./Component/EuropeansnackDetail';
import OceansnackList from'./Component/OceansnackList';
import OceansnackDetail from'./Component/OceansnackDetail';
import Map from './Component/Map';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          
          <Switch>
              <Route path="/" exact render={props => <div>
                                                        <Navbar {...props}/>
                                                        <Map {...props} />
                                                     </div> } /> 
              <Route path="/asia" exact render={props => (<AsiansnackList {...props}/>)} />
              <Route path="/asia/:id" exact render={props => (<AsiansnackDetail {...props}/>)} />
              <Route path="/na" exact render={props => (<NAsnackList {...props}/>)} />
              <Route path="/na/:id" exact render={props => (<NAsnackDetail {...props}/>)} />
              <Route path="/sa" exact render={props => (<SAsnackList {...props}/>)} />
              <Route path="/sa/:id"  exact render={props => (<SAsnackDetail {...props}/>)} />
              <Route path="/africa" exact render={props => (<AfricasnackList {...props}/>)} />
              <Route path="/africa/:id" exact render={props => (<AfricasnackDetail {...props}/>)} />
              <Route path="/europe" exact render={props => (<EuropesnackList {...props}/>)} />
              <Route path="/europe/:id"  exact render={props => (<EuropesnackDetail {...props}/>)} />
              <Route path="/ocean" exact render={props => (<OceansnackList {...props}/>)} />
              <Route path="/ocean/:id"  exact render={props => (<OceansnackDetail {...props}/>)} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
