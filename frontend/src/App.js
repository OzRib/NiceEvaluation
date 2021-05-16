import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { Login, AdminChoice, ManageUsers } from './pages';

function App() {
  return (
    <div className="flexColumn">
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/admin-choice' component={AdminChoice}/>
          <Route exact path='/manage-users' component={ManageUsers}/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
