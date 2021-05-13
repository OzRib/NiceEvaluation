import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Login } from './pages';

function App() {
  return (
    <div className="flexColumn">
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
