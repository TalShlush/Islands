import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import Randomize from './components/Random/Randomize';
import { Segment } from 'semantic-ui-react';
import './App.css';
import Bonus from './components/Bonus/Bonus';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Segment inverted>Island Project</Segment>
        <div className="app-container">
          <Switch>
            <Route exact path='/' component={Menu} />
            <Route exact path='/random/:size' component={Randomize} />
            <Route exact path='/bonus/:size' component={Bonus} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
